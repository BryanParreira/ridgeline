"use client";

import "maplibre-gl/dist/maplibre-gl.css";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { GeoJSONSource, Map as MlMap, Marker } from "maplibre-gl";
import { ArrowRight, ChevronLeft, ChevronRight, Crosshair, Expand, MapPin, Search, X } from "lucide-react";
import { formatMonth, projectAlt, type Project } from "@/lib/projects";

const STYLE = "https://tiles.openfreemap.org/styles/positron";
const SATELLITE = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
const ACCENT = "#c2471e";
const HOUSE_ZOOM = 18.6;

const SWATCH: Record<string, string> = {
  "moire black": "#2b2b2d",
  "georgetown gray": "#6d6e70",
  "georgetown grey": "#6d6e70",
  "weathered wood": "#6b5d50",
  driftwood: "#7b6f62",
  "resawn shake": "#6e5440",
  "heather blend": "#6b5552",
  pewter: "#7c7f80",
  "burnt sienna": "#7a4a35",
  "cobblestone gray": "#8a8a86",
  "coastal blue": "#4d5a66",
  "colonial slate": "#575c63",
  barkwood: "#5a4536",
  shenandoah: "#6a6455",
};
const swatchFor = (color: string | null) => SWATCH[(color ?? "").toLowerCase().replace(/^max def /, "")] ?? "#8a8b8d";
const shortProduct = (p: string | null) => (p ? p.replace(/^CertainTeed /, "") : "Other");
// Compact chip labels so every shingle line fits in the sidebar.
const chipLabel = (name: string) =>
  name
    .replace(/^Landmark (ClimateFlex)/, "$1")
    .replace(/^Northgate ClimateFlex$/, "Northgate")
    .replace(/^GAF Timberline HDZ$/, "GAF Timberline");

type View = "map" | "satellite";

function toGeoJSON(items: Project[]) {
  return {
    type: "FeatureCollection" as const,
    features: items.map((p) => ({
      type: "Feature" as const,
      properties: { id: p.id },
      geometry: { type: "Point" as const, coordinates: [p.lng, p.lat] },
    })),
  };
}

export default function ProjectMap({ projects }: { projects: Project[] }) {
  const el = useRef<HTMLDivElement>(null);
  const map = useRef<MlMap | null>(null);
  const markers = useRef(new Map<string, Marker>());
  const listRef = useRef<HTMLDivElement>(null);
  const userPickedView = useRef(false);
  const [ready, setReady] = useState(false);
  const [view, setView] = useState<View>("map");
  const [query, setQuery] = useState("");
  const [product, setProduct] = useState("All");
  const [city, setCity] = useState("All");
  const [selected, setSelected] = useState<Project | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const [photo, setPhoto] = useState(0);
  const [, setMarkerTick] = useState(0);
  // Wheel scrolls the page until the user engages the map, so the page never feels "stuck".
  const [active, setActive] = useState(false);
  const [hint, setHint] = useState(false);
  const hintTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const byId = useMemo(() => new Map(projects.map((p) => [p.id, p])), [projects]);
  const byIdRef = useRef(byId);
  byIdRef.current = byId;

  const products = useMemo(() => {
    const m = new Map<string, number>();
    projects.forEach((p) => m.set(shortProduct(p.product), (m.get(shortProduct(p.product)) ?? 0) + 1));
    return [...m.entries()].sort((a, b) => (a[0] === "Other" ? 1 : b[0] === "Other" ? -1 : b[1] - a[1]));
  }, [projects]);
  const citiesList = useMemo(() => [...new Set(projects.map((p) => p.city))].sort(), [projects]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter(
      (p) =>
        (product === "All" || shortProduct(p.product) === product) &&
        (city === "All" || p.city === city) &&
        (!q || `${p.street} ${p.city} ${p.color} ${p.product}`.toLowerCase().includes(q))
    );
  }, [projects, query, product, city]);

  const applyView = useCallback((v: View) => {
    setView(v);
    const m = map.current;
    if (m?.getLayer("sat")) m.setLayoutProperty("sat", "visibility", v === "satellite" ? "visible" : "none");
  }, []);

  const flyToHouse = useCallback(
    (p: Project) => {
      const m = map.current;
      if (!m) return;
      if (!userPickedView.current) applyView("satellite");
      const small = m.getContainer().clientWidth < 860;
      m.flyTo({
        center: [p.lng, p.lat],
        zoom: HOUSE_ZOOM,
        offset: small ? [0, -70] : [-150, 0],
        speed: 1.6,
        curve: 1.5,
        essential: true,
      });
    },
    [applyView]
  );

  const select = useCallback(
    (p: Project | null, fly = true) => {
      setSelected(p);
      setPhoto(0);
      if (p && fly) flyToHouse(p);
      const url = new URL(window.location.href);
      if (p) url.searchParams.set("p", p.id);
      else url.searchParams.delete("p");
      window.history.replaceState(null, "", url);
    },
    [flyToHouse]
  );
  const selectRef = useRef(select);
  selectRef.current = select;

  const showAll = useCallback(() => {
    setSelected(null);
    if (!userPickedView.current) applyView("map");
    if (map.current) fit(map.current, filtered, true);
  }, [applyView, filtered]);

  // Init map once.
  useEffect(() => {
    let cancelled = false;
    const markerMap = markers.current;
    (async () => {
      const maplibre = (await import("maplibre-gl")).default;
      if (cancelled || !el.current) return;
      const m = new maplibre.Map({
        container: el.current,
        style: STYLE,
        center: [-93.0, 43.67],
        zoom: 10,
        maxZoom: 19.5,
        attributionControl: { compact: true },
        // Touch: one finger scrolls the page, two fingers move the map.
        cooperativeGestures: window.matchMedia("(pointer: coarse)").matches,
      });
      m.addControl(new maplibre.NavigationControl({ showCompass: false }), "bottom-right");
      m.scrollZoom.setWheelZoomRate(1 / 450);
      if (!window.matchMedia("(pointer: coarse)").matches) m.scrollZoom.disable();
      map.current = m;

      // Photo pins for every unclustered house in view.
      const syncMarkers = () => {
        if (!m.getSource("projects") || !m.isSourceLoaded("projects")) return;
        const seen = new Set<string>();
        for (const f of m.querySourceFeatures("projects", { filter: ["!", ["has", "point_count"]] })) {
          const id = f.properties?.id as string;
          if (!id || seen.has(id)) continue;
          seen.add(id);
          if (markerMap.has(id)) continue;
          const p = byIdRef.current.get(id);
          if (!p) continue;
          const btn = document.createElement("button");
          btn.className = "pin";
          btn.dataset.id = id;
          btn.setAttribute("aria-label", `${p.color ?? "Roof"} roof on ${p.street}, ${p.city}`);
          btn.innerHTML = `<span class="pin-img"><img src="${p.photos[0]?.s ?? ""}" alt="" loading="lazy"/></span><i class="pin-tail"></i>`;
          btn.addEventListener("click", (e) => {
            e.stopPropagation();
            selectRef.current(byIdRef.current.get(id) ?? null);
          });
          btn.addEventListener("mouseenter", () => setHover(id));
          btn.addEventListener("mouseleave", () => setHover(null));
          markerMap.set(id, new maplibre.Marker({ element: btn, anchor: "bottom" }).setLngLat([p.lng, p.lat]).addTo(m));
        }
        for (const [id, mk] of markerMap) {
          if (!seen.has(id)) {
            mk.remove();
            markerMap.delete(id);
          }
        }
        setMarkerTick((n) => n + 1);
      };

      m.on("load", () => {
        m.addSource("sat", { type: "raster", tiles: [SATELLITE], tileSize: 256, maxzoom: 19, attribution: "Imagery © Esri" });
        m.addLayer({ id: "sat", type: "raster", source: "sat", layout: { visibility: "none" } });
        m.addSource("projects", {
          type: "geojson",
          data: toGeoJSON(projects),
          cluster: true,
          clusterRadius: 48,
          clusterMaxZoom: 14,
        });
        m.addLayer({
          id: "clusters",
          type: "circle",
          source: "projects",
          filter: ["has", "point_count"],
          paint: {
            "circle-color": ACCENT,
            "circle-radius": ["step", ["get", "point_count"], 18, 10, 22, 30, 28],
            "circle-stroke-width": 5,
            "circle-stroke-color": "rgba(194,71,30,0.25)",
          },
        });
        m.addLayer({
          id: "cluster-count",
          type: "symbol",
          source: "projects",
          filter: ["has", "point_count"],
          layout: { "text-field": ["get", "point_count_abbreviated"], "text-size": 13, "text-font": ["Noto Sans Bold"] },
          paint: { "text-color": "#ffffff" },
        });

        m.on("click", "clusters", async (e) => {
          const f = m.queryRenderedFeatures(e.point, { layers: ["clusters"] })[0];
          if (!f) return;
          const zoom = await (m.getSource("projects") as GeoJSONSource).getClusterExpansionZoom(f.properties.cluster_id);
          m.easeTo({ center: (f.geometry as GeoJSON.Point).coordinates as [number, number], zoom: zoom + 0.3, duration: 600 });
        });
        m.on("mouseenter", "clusters", () => (m.getCanvas().style.cursor = "pointer"));
        m.on("mouseleave", "clusters", () => (m.getCanvas().style.cursor = ""));
        m.on("data", (e) => {
          if ((e as { sourceId?: string }).sourceId === "projects") syncMarkers();
        });
        m.on("moveend", syncMarkers);

        fit(m, projects, false);
        setReady(true);

        const initial = new URLSearchParams(window.location.search).get("p");
        const p = initial ? byIdRef.current.get(initial) : null;
        if (p) setTimeout(() => selectRef.current(p), 500);
      });
    })();
    return () => {
      cancelled = true;
      markerMap.forEach((mk) => mk.remove());
      markerMap.clear();
      map.current?.remove();
      map.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Filters → map data.
  useEffect(() => {
    const m = map.current;
    if (!ready || !m) return;
    (m.getSource("projects") as GeoJSONSource).setData(toGeoJSON(filtered));
    if (filtered.length && !selected) fit(m, filtered, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtered, ready]);

  // Selected / hovered pin styling.
  useEffect(() => {
    markers.current.forEach((mk, id) => {
      const node = mk.getElement();
      node.classList.toggle("on", id === selected?.id);
      node.classList.toggle("hot", id === hover);
      node.style.zIndex = id === selected?.id ? "3" : id === hover ? "2" : "";
    });
  });

  // Keep the list in sync with the selection.
  useEffect(() => {
    const list = listRef.current;
    if (!selected || !list) return;
    const item = list.querySelector<HTMLElement>(`[data-id="${selected.id}"]`);
    if (!item) return;
    const top = item.offsetTop - list.offsetTop;
    if (top < list.scrollTop || top + item.offsetHeight > list.scrollTop + list.clientHeight) {
      list.scrollTo({ top: top - list.clientHeight / 2 + item.offsetHeight / 2, behavior: "smooth" });
    }
  }, [selected]);

  const engage = useCallback(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    map.current?.scrollZoom.enable();
    setActive(true);
    setHint(false);
  }, []);
  const disengage = useCallback(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    map.current?.scrollZoom.disable();
    setActive(false);
  }, []);
  const onStageWheel = useCallback(() => {
    if (active || window.matchMedia("(pointer: coarse)").matches) return;
    setHint(true);
    clearTimeout(hintTimer.current);
    hintTimer.current = setTimeout(() => setHint(false), 1400);
  }, [active]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && select(null, false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [select]);

  const photos = selected?.photos ?? [];

  return (
    <div className="pmap">
      <aside className="pmap-side">
        <div className="pmap-controls">
          <label className="pmap-search">
            <Search size={16} />
            <input
              placeholder="Search street, city or color"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search projects"
            />
            {query && (
              <button className="pmap-clear" onClick={() => setQuery("")} aria-label="Clear search">
                <X size={14} />
              </button>
            )}
          </label>
          <div className="pmap-filter">
            <span className="pmap-label">Shingle line</span>
            <div className="pmap-chips" role="group" aria-label="Filter by shingle line">
              {[["All", projects.length] as const, ...products].map(([name, n]) => (
                <button
                  key={name}
                  className={`chip ${product === name ? "on" : ""}`}
                  aria-pressed={product === name}
                  title={name === "All" || name === "Other" ? undefined : name}
                  onClick={() => setProduct(name)}
                >
                  {chipLabel(name)} <span>{n}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="pmap-row">
            <select className="pmap-select" value={city} onChange={(e) => setCity(e.target.value)} aria-label="Filter by city">
              <option value="All">All cities</option>
              {citiesList.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <p className="pmap-count">
              <strong>{filtered.length}</strong> of {projects.length}
            </p>
          </div>
        </div>
        <div className="pmap-list" ref={listRef} data-lenis-prevent>
          {filtered.map((p) => (
            <button
              key={p.id}
              data-id={p.id}
              className={`pmap-item ${selected?.id === p.id ? "on" : ""} ${hover === p.id ? "hot" : ""}`}
              onClick={() => select(p)}
              onMouseEnter={() => setHover(p.id)}
              onMouseLeave={() => setHover(null)}
            >
              <img src={p.photos[0]?.s} alt="" loading="lazy" />
              <span className="pmap-item-body">
                <strong>
                  <i className="dot-swatch" style={{ background: swatchFor(p.color) }} />
                  <span>{p.color ?? "Roof replacement"}</span>
                </strong>
                <small>{p.product ? shortProduct(p.product) : "Architectural shingles"}</small>
                <small className="muted">
                  {p.street}, {p.city} · {formatMonth(p.date)}
                </small>
              </span>
            </button>
          ))}
          {filtered.length === 0 && <p className="pmap-empty">No projects match those filters.</p>}
        </div>
      </aside>

      <div
        className={`pmap-stage ${active ? "is-active" : ""}`}
        data-lenis-prevent={active ? "" : undefined}
        onMouseDown={engage}
        onMouseDownCapture={(e) => {
          // Keep keyboard focus on the map without the browser jumping the page to it.
          const t = e.target as HTMLElement;
          if (t.classList.contains("maplibregl-canvas")) {
            e.preventDefault();
            t.focus({ preventScroll: true });
          }
        }}
        onMouseLeave={disengage}
        onWheel={onStageWheel}
      >
        <div ref={el} className="pmap-canvas" />
        <AnimatePresence>
          {hint && (
            <motion.div
              className="pmap-hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <span>Click the map to zoom with scroll</span>
            </motion.div>
          )}
        </AnimatePresence>
        {!ready && <div className="pmap-loading">Loading map…</div>}

        <div className="pmap-toolbar">
          <div className="seg" role="group" aria-label="Map style">
            {(["map", "satellite"] as View[]).map((v) => (
              <button
                key={v}
                className={view === v ? "on" : ""}
                onClick={() => {
                  userPickedView.current = true;
                  applyView(v);
                }}
              >
                {view === v && <motion.span layoutId="seg-bg" className="seg-bg" transition={{ type: "spring", stiffness: 500, damping: 38 }} />}
                <span>{v === "map" ? "Map" : "Satellite"}</span>
              </button>
            ))}
          </div>
          <button className="tool-btn" onClick={showAll}>
            <Expand size={15} /> Show all
          </button>
        </div>

        <AnimatePresence>
          {selected && (
            <motion.div
              key={selected.id}
              className="pmap-drawer"
              data-lenis-prevent
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <button className="pmap-close" onClick={() => select(null, false)} aria-label="Close project">
                <X size={18} />
              </button>
              <div className="pmap-photo">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.img
                    key={photos[photo]?.l}
                    src={photos[photo]?.l}
                    alt={projectAlt(selected, photo)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                </AnimatePresence>
                {photos.length > 1 && (
                  <>
                    <button className="pmap-nav l" onClick={() => setPhoto((photo - 1 + photos.length) % photos.length)} aria-label="Previous photo">
                      <ChevronLeft size={18} />
                    </button>
                    <button className="pmap-nav r" onClick={() => setPhoto((photo + 1) % photos.length)} aria-label="Next photo">
                      <ChevronRight size={18} />
                    </button>
                    <span className="pmap-counter">
                      {photo + 1} / {photos.length}
                    </span>
                  </>
                )}
              </div>
              <div className="pmap-info">
                <span className="work-meta">
                  <span>
                    <MapPin size={13} /> {selected.street}, {selected.city}, {selected.state}
                  </span>
                  <span>{formatMonth(selected.date)}</span>
                </span>
                <h3>
                  <i className="dot-swatch" style={{ background: swatchFor(selected.color) }} />
                  {selected.color ?? "Roof replacement"}
                </h3>
                <p>{selected.product ?? "Architectural shingles"} · Full roof replacement</p>
                <div className="pmap-actions">
                  <Link href="/contact-us" className="btn btn-primary">
                    Get a quote <ArrowRight size={16} />
                  </Link>
                  <button className="btn btn-outline" onClick={() => flyToHouse(selected)}>
                    <Crosshair size={16} /> Zoom to house
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function fit(m: MlMap, items: Project[], animate: boolean) {
  if (!items.length) return;
  let [w, s, e, n] = [180, 90, -180, -90];
  for (const p of items) {
    w = Math.min(w, p.lng);
    e = Math.max(e, p.lng);
    s = Math.min(s, p.lat);
    n = Math.max(n, p.lat);
  }
  const small = m.getContainer().clientWidth < 600;
  m.fitBounds(
    [
      [w, s],
      [e, n],
    ],
    { padding: small ? 40 : 80, maxZoom: 15, duration: animate ? 900 : 0 }
  );
}

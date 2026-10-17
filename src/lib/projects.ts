import data from "@/data/projects.json";
import { distanceKm } from "./cities";

export type Photo = { s: string; l: string; w: number; h: number };
export type Project = {
  id: string;
  city: string;
  state: string;
  zip: string;
  street: string;
  lat: number;
  lng: number;
  date: string;
  product: string | null;
  color: string | null;
  photos: Photo[];
};

export const projects = data as Project[];

export const projectTitle = (p: Project) =>
  `${p.product ? p.product.replace(/^CertainTeed /, "") : "Roof replacement"}${p.color ? ` · ${p.color}` : ""}`;

export const projectAlt = (p: Project, i = 0) =>
  `${p.color ?? "New"} ${p.product ?? "shingle"} roof replacement on ${p.street}, ${p.city}, ${p.state} by RidgeLine Roofing${i ? ` (photo ${i + 1})` : ""}`;

export const formatMonth = (iso: string) =>
  new Date(iso + "T12:00:00").toLocaleDateString("en-US", { month: "short", year: "numeric" });

export function projectsNear(point: { lat: number; lng: number }, limit = 6) {
  return [...projects]
    .map((p) => ({ p, d: distanceKm(point, p) }))
    .sort((a, b) => a.d - b.d)
    .slice(0, limit)
    .map(({ p, d }) => ({ ...p, km: d }));
}

export const projectCities = () => {
  const m = new Map<string, number>();
  projects.forEach((p) => m.set(p.city, (m.get(p.city) ?? 0) + 1));
  return [...m.entries()].sort((a, b) => b[1] - a[1]);
};

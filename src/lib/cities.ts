export type Region = "home" | "iowa" | "metro";

export type City = {
  slug: string;
  name: string;
  state: "MN" | "IA";
  county: string;
  region: Region;
  lat: number;
  lng: number;
  drive: string; // approx. drive from the Austin shop
};

// Slugs match the existing /areas-we-serve/* URLs (the old "albert-lee-mn"
// typo is 301-redirected to "albert-lea-mn" in next.config / .htaccess).
export const cities: City[] = [
  { slug: "austin-mn", name: "Austin", state: "MN", county: "Mower County", region: "home", lat: 43.667, lng: -92.975, drive: "Home base" },
  { slug: "albert-lea-mn", name: "Albert Lea", state: "MN", county: "Freeborn County", region: "home", lat: 43.648, lng: -93.368, drive: "25 min" },
  { slug: "rochester-mn", name: "Rochester", state: "MN", county: "Olmsted County", region: "home", lat: 44.012, lng: -92.48, drive: "45 min" },
  { slug: "owatonna-mn", name: "Owatonna", state: "MN", county: "Steele County", region: "home", lat: 44.084, lng: -93.226, drive: "45 min" },
  { slug: "waseca-mn", name: "Waseca", state: "MN", county: "Waseca County", region: "home", lat: 44.078, lng: -93.507, drive: "1 hr" },
  { slug: "kasson-mn", name: "Kasson", state: "MN", county: "Dodge County", region: "home", lat: 44.03, lng: -92.751, drive: "50 min" },
  { slug: "faribault-mn", name: "Faribault", state: "MN", county: "Rice County", region: "home", lat: 44.295, lng: -93.269, drive: "1 hr" },
  { slug: "mankato-mn", name: "Mankato", state: "MN", county: "Blue Earth County", region: "home", lat: 44.164, lng: -93.999, drive: "1.5 hr" },
  { slug: "red-wing-mn", name: "Red Wing", state: "MN", county: "Goodhue County", region: "home", lat: 44.563, lng: -92.534, drive: "1.5 hr" },
  { slug: "osage-ia", name: "Osage", state: "IA", county: "Mitchell County", region: "iowa", lat: 43.284, lng: -92.811, drive: "45 min" },
  { slug: "lake-mills-ia", name: "Lake Mills", state: "IA", county: "Winnebago County", region: "iowa", lat: 43.419, lng: -93.533, drive: "50 min" },
  { slug: "mason-city-ia", name: "Mason City", state: "IA", county: "Cerro Gordo County", region: "iowa", lat: 43.154, lng: -93.201, drive: "50 min" },
  { slug: "clear-lake-ia", name: "Clear Lake", state: "IA", county: "Cerro Gordo County", region: "iowa", lat: 43.138, lng: -93.379, drive: "1 hr" },
  { slug: "forest-city-ia", name: "Forest City", state: "IA", county: "Winnebago County", region: "iowa", lat: 43.263, lng: -93.637, drive: "1 hr" },
  { slug: "lakeville-mn", name: "Lakeville", state: "MN", county: "Dakota County", region: "metro", lat: 44.65, lng: -93.243, drive: "1 hr 20 min" },
  { slug: "apple-valley-mn", name: "Apple Valley", state: "MN", county: "Dakota County", region: "metro", lat: 44.732, lng: -93.218, drive: "1 hr 25 min" },
  { slug: "rosemount-mn", name: "Rosemount", state: "MN", county: "Dakota County", region: "metro", lat: 44.739, lng: -93.126, drive: "1 hr 25 min" },
  { slug: "burnsville-mn", name: "Burnsville", state: "MN", county: "Dakota County", region: "metro", lat: 44.768, lng: -93.278, drive: "1 hr 30 min" },
  { slug: "eagan-mn", name: "Eagan", state: "MN", county: "Dakota County", region: "metro", lat: 44.804, lng: -93.167, drive: "1 hr 30 min" },
  { slug: "prior-lake-mn", name: "Prior Lake", state: "MN", county: "Scott County", region: "metro", lat: 44.713, lng: -93.423, drive: "1 hr 30 min" },
  { slug: "bloomington-mn", name: "Bloomington", state: "MN", county: "Hennepin County", region: "metro", lat: 44.841, lng: -93.298, drive: "1 hr 35 min" },
  { slug: "shakopee-mn", name: "Shakopee", state: "MN", county: "Scott County", region: "metro", lat: 44.798, lng: -93.527, drive: "1 hr 40 min" },
  { slug: "edina-mn", name: "Edina", state: "MN", county: "Hennepin County", region: "metro", lat: 44.89, lng: -93.35, drive: "1 hr 40 min" },
  { slug: "woodbury-mn", name: "Woodbury", state: "MN", county: "Washington County", region: "metro", lat: 44.924, lng: -92.959, drive: "1 hr 40 min" },
  { slug: "minneapolis-mn", name: "Minneapolis", state: "MN", county: "Hennepin County", region: "metro", lat: 44.978, lng: -93.265, drive: "1 hr 45 min" },
  { slug: "plymouth-mn", name: "Plymouth", state: "MN", county: "Hennepin County", region: "metro", lat: 45.011, lng: -93.456, drive: "1 hr 50 min" },
  { slug: "maple-grove-mn", name: "Maple Grove", state: "MN", county: "Hennepin County", region: "metro", lat: 45.072, lng: -93.456, drive: "1 hr 55 min" },
];

export const regionInfo: Record<Region, { title: string; intro: (c: City) => string; weather: (c: City) => string }> = {
  home: {
    title: "Southern Minnesota",
    intro: (c) =>
      c.slug === "austin-mn"
        ? "Austin is home. Our shop is right downtown at 209 Main St S, and most of the roofs on our project map are here in Mower County, from tidy ramblers in the southwest neighborhoods to two-story homes near the lakes."
        : `${c.name} is part of our core southern Minnesota service area, about ${c.drive} from our Austin shop. We serve homeowners and businesses throughout ${c.county} with the same crew, materials and attention to detail we bring to every job.`,
    weather: (c) =>
      `Southern Minnesota sits in one of the most active hail corridors in the Upper Midwest. Spring and summer storms regularly bring hail and straight-line winds through ${c.county}, while winters bring heavy snow loads and ice dams. Every roof we build in ${c.name} is designed for both.`,
  },
  iowa: {
    title: "North Iowa",
    intro: (c) =>
      `Just across the state line, ${c.name}, Iowa is an easy ${c.drive} drive from our Austin shop. We provide roof replacements, inspections and storm repairs for homes and businesses throughout ${c.county}.`,
    weather: (c) =>
      `North Iowa sees frequent severe thunderstorms with large hail and damaging winds from spring through late summer. If your ${c.name} roof took a hit, we'll document the damage and work directly with your insurance company.`,
  },
  metro: {
    title: "Twin Cities Metro",
    intro: (c) =>
      `RidgeLine Roofing serves ${c.name} and the south metro with residential and commercial roofing, storm restoration and insurance claim assistance. You get a locally owned Minnesota contractor, not an out-of-state storm chaser.`,
    weather: (c) =>
      `The Twin Cities metro has seen repeated severe hail events in recent years, and ${c.county} homeowners know how quickly a single storm can total a roof. We inspect, document and restore storm-damaged roofs in ${c.name} from start to finish.`,
  },
};

export const getCity = (slug: string) => cities.find((c) => c.slug === slug);

export function distanceKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((a.lat * Math.PI) / 180) * Math.cos((b.lat * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}

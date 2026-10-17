// Central content store — edit business details here.

export const company = {
  name: "RidgeLine Roofing",
  phone: "(507) 440-8756",
  phoneHref: "tel:+15074408756",
  address: "209 Main St S, Austin, MN 55912",
  mapsHref: "https://maps.google.com/?q=209+Main+St+S+Austin+MN+55912",
  years: 20,
  social: {
    facebook: "https://www.facebook.com/ridgelineroofing101",
    google: "https://www.google.com/maps/search/?api=1&query=RidgeLine+Roofing+Austin+MN",
    googleReview: "https://search.google.com/local/writereview?placeid=ChIJ80DXVivf82kRPksIFGDi10M",
    bbb: "https://www.bbb.org/us/mn/austin/profile/roofing-contractors/ridgeline-roofing-llc-0704-1000051243",
  },
};

const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const images = {
  // Owner-supplied RidgeLine job photos (optimized copies of /pictures).
  hero: "/images/new-roof-cape-cod-austin-mn.jpg",
  residential: "/images/crew-installing-shingle-roof.jpg",
  commercial: "/images/commercial-tpo-roof-downtown.jpg",
  commercialCrew: "/images/commercial-flat-roof-installation.jpg",
  crane: "/images/commercial-roof-crane-lift.jpg",
  shingleAerial: "/images/shingle-roof-aerial-fall.jpg",
  hipAerial: "/images/hip-roof-aerial-inspection.jpg",
  // Stock fallbacks where no job photo exists yet.
  roofer: u("1632759145351-1d592919f522"),
  storm: u("1605727216801-e27ce1d0cc28", 2000),
  metal: u("1592595896551-12b371d546d5"),
};

export const nav = [
  { label: "Residential", href: "/residential-roofing" },
  { label: "Commercial", href: "/commercial-roofing" },
  { label: "Storm Repairs", href: "/storm-repairs" },
  { label: "Project Map", href: "/portfolio" },
  { label: "Service Area", href: "/service-area" },
  { label: "FAQ", href: "/faqs" },
];

export const towns = [
  { name: "Austin", hq: true, x: 360, y: 381 },
  { name: "Albert Lea", x: 150, y: 394 },
  { name: "Rochester", x: 624, y: 134 },
  { name: "Owatonna", x: 226, y: 83 },
  { name: "Waseca", x: 76, y: 87 },
];

export const services = [
  {
    key: "residential",
    title: "Residential Roofing",
    blurb:
      "Shingle and metal roof replacements, new installs, and detailed inspections that protect the place you call home.",
    points: ["Full replacements", "Roof inspections", "Asphalt shingle", "Standing-seam metal"],
    image: images.residential,
  },
  {
    key: "commercial",
    title: "Commercial Roofing",
    blurb:
      "Rubber (EPDM) and TPO systems installed and repaired to keep your business dry, efficient, and open.",
    points: ["TPO installation", "EPDM rubber", "Flat-roof repairs", "Maintenance plans"],
    image: images.commercial,
  },
  {
    key: "storm",
    title: "Storm Repairs",
    blurb:
      "24/7 emergency response for hail and wind damage. We work directly with your insurance company so you don't have to.",
    points: ["24/7 emergency tarping", "Hail & wind damage", "Insurance claim help", "Fast turnaround"],
    image: images.roofer,
  },
];

export type Material = {
  key: string;
  name: string;
  tag: string;
  lifespan: [number, number];
  bestFor: string;
  desc: string;
  traits: { label: string; value: number }[];
  pattern: "shingle" | "metal" | "tpo" | "epdm";
};

// Lifespans are typical industry ranges, not warranties.
export const materials: Material[] = [
  {
    key: "shingle",
    name: "Architectural Shingle",
    tag: "Most popular",
    lifespan: [25, 30],
    bestFor: "Homes",
    desc: "Dimensional asphalt shingles with deep shadow lines. Great curb appeal, broad color choice, and the best value per square foot.",
    traits: [
      { label: "Curb appeal", value: 85 },
      { label: "Hail resistance", value: 65 },
      { label: "Value", value: 95 },
    ],
    pattern: "shingle",
  },
  {
    key: "metal",
    name: "Standing-Seam Metal",
    tag: "Built for winters",
    lifespan: [40, 70],
    bestFor: "Homes & barns",
    desc: "Concealed-fastener steel panels that shed snow and ice fast. Expect a roof that may outlast the mortgage.",
    traits: [
      { label: "Curb appeal", value: 90 },
      { label: "Hail resistance", value: 90 },
      { label: "Value", value: 75 },
    ],
    pattern: "metal",
  },
  {
    key: "tpo",
    name: "TPO Membrane",
    tag: "Energy efficient",
    lifespan: [20, 30],
    bestFor: "Commercial flat roofs",
    desc: "Heat-welded, bright-white single-ply membrane that reflects sun and cuts cooling costs on low-slope buildings.",
    traits: [
      { label: "Efficiency", value: 95 },
      { label: "Durability", value: 80 },
      { label: "Value", value: 85 },
    ],
    pattern: "tpo",
  },
  {
    key: "epdm",
    name: "EPDM Rubber",
    tag: "Proven & flexible",
    lifespan: [25, 30],
    bestFor: "Commercial & low-slope",
    desc: "Synthetic rubber that stays flexible through Minnesota freeze-thaw cycles. A reliable, repair-friendly workhorse.",
    traits: [
      { label: "Cold flexibility", value: 95 },
      { label: "Durability", value: 85 },
      { label: "Value", value: 88 },
    ],
    pattern: "epdm",
  },
];

export const steps = [
  {
    n: "01",
    title: "Inspect",
    body: "We climb up, document everything with photos, and walk you through exactly what we found. No pressure, no jargon.",
  },
  {
    n: "02",
    title: "Insurance",
    body: "Storm damage? We meet your adjuster on site and handle the paperwork so your claim covers what it should.",
  },
  {
    n: "03",
    title: "Choose",
    body: "Pick your system and color with real samples in hand. You get a clear, written scope and price up front.",
  },
  {
    n: "04",
    title: "Install",
    body: "Our crew protects your landscaping, tears off, installs, and magnet-sweeps every nail, usually in a single day.",
  },
  {
    n: "05",
    title: "Walkthrough",
    body: "We inspect the finished roof together and leave you with photos and paperwork for your records.",
  },
];

export const hotspots = [
  {
    id: "ridge",
    x: 300,
    y: 70,
    title: "Ridge & Ventilation",
    body: "Poor attic airflow is the #1 cause of Minnesota ice dams. We check ridge vents and intake balance.",
  },
  {
    id: "flashing",
    x: 420,
    y: 120,
    title: "Chimney Flashing",
    body: "Cracked or lifted flashing lets water in long before you see a stain. We reseal or replace it.",
  },
  {
    id: "shingles",
    x: 190,
    y: 165,
    title: "Shingles & Hail Hits",
    body: "We look for bruising, granule loss, and lifted tabs: the evidence insurance adjusters need.",
  },
  {
    id: "ice",
    x: 110,
    y: 225,
    title: "Eaves & Ice Shield",
    body: "Ice & water shield along the eaves stops meltwater backing up under shingles every spring.",
  },
  {
    id: "gutters",
    x: 470,
    y: 232,
    title: "Gutters & Drip Edge",
    body: "Proper drip edge and clear gutters keep water off your fascia and out of your foundation.",
  },
];

// PLACEHOLDER reviews for the design demo — replace with real Google reviews before launch.
export const reviews = [
  {
    quote:
      "Hail tore up our roof in June. RidgeLine met the adjuster, handled the claim, and had a new roof on in one day. The yard was cleaner than before they came.",
    name: "Homeowner",
    town: "Austin, MN",
  },
  {
    quote:
      "They replaced the TPO on our shop building without us closing a single day. Clear quote, on time, zero surprises.",
    name: "Business owner",
    town: "Owatonna, MN",
  },
  {
    quote:
      "Honest inspection. They told us we had a few more years left instead of selling us a roof. Guess who we called when it was time.",
    name: "Homeowner",
    town: "Albert Lea, MN",
  },
  {
    quote:
      "Switched to a standing-seam metal roof. Snow slides right off now and it looks incredible. Great crew from start to finish.",
    name: "Homeowner",
    town: "Rochester, MN",
  },
];

export const faqs = [
  {
    q: "How do I know if I need a repair or a full replacement?",
    a: "It depends on age, the extent of damage, and how many layers you already have. We'll inspect, show you photos, and give you an honest recommendation. Sometimes a repair is all you need.",
  },
  {
    q: "Will you work with my insurance company?",
    a: "Yes. For storm and hail damage we document everything, meet your adjuster on site, and work directly with your insurance company to keep the process low-stress.",
  },
  {
    q: "Do you offer emergency service?",
    a: "We offer 24/7 emergency service for storm damage, including tarping to prevent further water intrusion until permanent repairs can be made.",
  },
  {
    q: "How long does a roof replacement take?",
    a: "Most residential replacements are completed in one to two days depending on size, pitch, and weather. Commercial projects are scheduled around your operations.",
  },
  {
    q: "Which areas do you serve?",
    a: "We're based in Austin and serve Albert Lea, Rochester, Owatonna, Waseca, and the surrounding southern Minnesota communities.",
  },
  {
    q: "Shingle or metal: which is right for me?",
    a: "Shingles offer great value and curb appeal; metal costs more up front but lasts decades longer and sheds snow beautifully. We'll walk you through both with real samples.",
  },
];

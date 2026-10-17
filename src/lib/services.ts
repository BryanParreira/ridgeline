import { images } from "./content";

export type ServicePage = {
  slug: string;
  group: "residential" | "commercial" | "storm";
  label: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  image: string;
  intro: string;
  sections: { h2: string; body: string[] }[];
  checks: string[];
  faqs: { q: string; a: string }[];
  related: string[];
};

// Slugs intentionally match the existing ridgelineroofingmn.com URLs so
// search rankings carry over on launch.
export const servicePages: ServicePage[] = [
  {
    slug: "residential-roofing",
    group: "residential",
    label: "Residential Roofing",
    metaTitle: "Residential Roofing in Austin & Southern MN | RidgeLine Roofing",
    metaDescription:
      "Shingle and metal roof replacements, inspections, and repairs for southern Minnesota homes. 20+ years experience. Call (507) 440-8756.",
    eyebrow: "Residential",
    h1: "Residential roofing built for Minnesota winters",
    image: images.residential,
    intro:
      "Your roof takes everything a Minnesota year can throw at it — heavy snow loads, ice dams, spring hail and summer straight-line winds. RidgeLine Roofing has spent more than 20 years installing and repairing residential roofs across Austin, Albert Lea, Rochester, Owatonna and Waseca, and we build every one to handle the next storm.",
    sections: [
      {
        h2: "Complete residential roofing services",
        body: [
          "From a single leak to a full tear-off, we handle the whole job with our own crew. We install architectural asphalt shingles — including CertainTeed Landmark and Landmark PRO lines — and standing-seam metal systems, plus all of the underlayment, ice & water shield, flashing and ventilation that make a roof actually last.",
          "Every project starts with an honest inspection and photos of what we find, so you can make a decision based on facts instead of a sales pitch.",
        ],
      },
      {
        h2: "Why southern Minnesota homeowners choose RidgeLine",
        body: [
          "We're a local, Austin-based company — not a storm chaser who disappears after the season. We answer the phone, we stand behind our work, and we'll still be here when you need us next.",
          "Our crews protect your landscaping, keep a clean site, and magnet-sweep for nails before we leave. Most residential replacements are finished in a day or two.",
        ],
      },
    ],
    checks: [
      "Full roof replacements",
      "Roof inspections with photos",
      "Architectural shingles",
      "Standing-seam metal",
      "Ice & water shield",
      "Ridge & attic ventilation",
    ],
    faqs: [
      {
        q: "How long does a residential roof replacement take?",
        a: "Most homes are completed in one to two days depending on size, pitch, layers to remove, and weather.",
      },
      {
        q: "What shingles do you install?",
        a: "We primarily install CertainTeed Landmark, Landmark PRO and ClimateFlex architectural shingles, and we can source other major brands on request.",
      },
    ],
    related: ["residential-roofing-replacement", "residential-roofing-inspections", "shingle-roofing", "metal-roofing"],
  },
  {
    slug: "residential-roofing-replacement",
    group: "residential",
    label: "Roof Replacement",
    metaTitle: "Roof Replacement in Austin, MN & Nearby | RidgeLine Roofing",
    metaDescription:
      "Full residential roof replacement with clean tear-off, premium shingles or metal, and a one-to-two day install. Serving southern MN. Call (507) 440-8756.",
    eyebrow: "Residential · Replacement",
    h1: "Roof replacement done right the first time",
    image: images.suburb,
    intro:
      "When repairs stop making sense, a full replacement protects your home for decades. We tear off down to the deck, fix what's underneath, and install a complete roofing system — not just new shingles on top.",
    sections: [
      {
        h2: "Signs it's time to replace your roof",
        body: [
          "Curling or missing shingles, granules piling up in your gutters, daylight in the attic, repeated leaks, or a roof that's simply past 20–25 years old are all signals worth a professional look.",
          "After a hail or wind event, damage isn't always visible from the ground. We'll climb up, document everything, and tell you honestly whether you need a repair or a replacement.",
        ],
      },
      {
        h2: "Our replacement process",
        body: [
          "We start with a detailed inspection and a clear written scope. On install day we protect your landscaping, tear off old materials, inspect and replace any soft decking, and install ice & water shield, synthetic underlayment, drip edge, flashing, ventilation and your new shingles or metal panels.",
          "Before we leave, we clean up, run magnets across your yard and driveway, and do a final walkthrough with you.",
        ],
      },
    ],
    checks: [
      "Complete tear-off",
      "Deck inspection & repair",
      "Ice & water shield",
      "Synthetic underlayment",
      "New flashing & drip edge",
      "Magnetic nail sweep",
    ],
    faqs: [
      {
        q: "Can you install new shingles over my old roof?",
        a: "Minnesota code allows limited overlays in some cases, but we almost always recommend a full tear-off so we can inspect the deck and install proper ice & water protection.",
      },
      {
        q: "Will insurance pay for my roof replacement?",
        a: "If your roof was damaged by hail or wind, your policy may cover it. We document the damage and work directly with your insurance company and adjuster.",
      },
    ],
    related: ["residential-roofing-inspections", "shingle-roofing", "metal-roofing", "storm-repairs"],
  },
  {
    slug: "residential-roofing-inspections",
    group: "residential",
    label: "Roof Inspections",
    metaTitle: "Roof Inspections in Austin & Southern MN | RidgeLine Roofing",
    metaDescription:
      "Thorough residential roof inspections with photo documentation for storm damage, insurance claims, and home sales. Call RidgeLine Roofing at (507) 440-8756.",
    eyebrow: "Residential · Inspections",
    h1: "Honest roof inspections with photo proof",
    image: images.roofer,
    intro:
      "A roof inspection should give you answers, not a sales pitch. We get on your roof, photograph everything, and walk you through what's fine, what needs attention, and what can wait.",
    sections: [
      {
        h2: "What we check",
        body: [
          "Shingle condition and hail bruising, granule loss, flashing around chimneys, vents and skylights, ridge and soffit ventilation, gutters and drip edge, signs of ice damming, and evidence of leaks in the attic when accessible.",
        ],
      },
      {
        h2: "When to schedule an inspection",
        body: [
          "After any significant hail or wind storm, before buying or selling a home, when you notice stains on ceilings, or every few years once a roof passes 15 years old. Catching problems early is always cheaper than fixing water damage later.",
        ],
      },
    ],
    checks: [
      "Hail & wind damage",
      "Flashing & penetrations",
      "Ventilation balance",
      "Ice-dam risk",
      "Gutters & drip edge",
      "Photo report",
    ],
    faqs: [
      {
        q: "How long does an inspection take?",
        a: "Most residential inspections take under an hour. We'll review the photos with you on the spot.",
      },
      {
        q: "Do you provide documentation for insurance?",
        a: "Yes. We photograph and document storm damage in a way that supports your insurance claim.",
      },
    ],
    related: ["residential-roofing-replacement", "storm-repairs", "residential-roofing"],
  },
  {
    slug: "shingle-roofing",
    group: "residential",
    label: "Shingle Roofing",
    metaTitle: "Shingle Roofing Installation in Southern MN | RidgeLine Roofing",
    metaDescription:
      "CertainTeed Landmark architectural shingle installation and replacement in Austin, Albert Lea, Rochester & Owatonna, MN. Call (507) 440-8756.",
    eyebrow: "Residential · Shingle",
    h1: "Architectural shingle roofs with real curb appeal",
    image: images.homeSunset,
    intro:
      "Architectural asphalt shingles are the most popular roofing choice in Minnesota for good reason: dimensional good looks, dozens of colors, strong wind ratings, and outstanding value.",
    sections: [
      {
        h2: "The shingles we install",
        body: [
          "Most of our recent projects use CertainTeed Landmark, Landmark PRO and ClimateFlex shingles in colors like Moire Black, Georgetown Gray, Weathered Wood, Driftwood and Resawn Shake. ClimateFlex lines add impact resistance that's well suited to hail-prone southern Minnesota.",
          "Browse our project map to see real RidgeLine roofs in each color near you.",
        ],
      },
      {
        h2: "A complete shingle system",
        body: [
          "Shingles are only as good as what's under them. Every install includes ice & water shield at the eaves and valleys, synthetic underlayment, starter strips, proper ventilation and matching hip & ridge caps.",
        ],
      },
    ],
    checks: [
      "CertainTeed Landmark",
      "Landmark PRO",
      "ClimateFlex impact-resistant",
      "Dozens of colors",
      "Matching ridge caps",
      "Full system install",
    ],
    faqs: [
      {
        q: "How long do architectural shingles last?",
        a: "Properly installed and ventilated architectural shingles typically last 25–30 years in Minnesota.",
      },
      {
        q: "Are impact-resistant shingles worth it?",
        a: "In hail-prone areas they can reduce damage and may qualify for insurance discounts — ask your agent and we'll help you compare.",
      },
    ],
    related: ["metal-roofing", "residential-roofing-replacement", "residential-roofing"],
  },
  {
    slug: "metal-roofing",
    group: "residential",
    label: "Metal Roofing",
    metaTitle: "Metal Roofing Installation in Southern MN | RidgeLine Roofing",
    metaDescription:
      "Standing-seam and exposed-fastener metal roofs for homes, barns and outbuildings across southern Minnesota. Long-lasting and snow-shedding. Call (507) 440-8756.",
    eyebrow: "Residential · Metal",
    h1: "Metal roofs that shrug off Minnesota winters",
    image: images.suburb,
    intro:
      "A metal roof is a once-in-a-lifetime investment. It sheds snow and ice quickly, stands up to wind and hail, and can last 40 to 70 years with minimal maintenance.",
    sections: [
      {
        h2: "Metal roofing options",
        body: [
          "We install standing-seam systems with concealed fasteners for a clean, modern look on homes, and durable exposed-fastener panels for barns, garages and outbuildings. Dozens of colors and finishes are available.",
        ],
      },
      {
        h2: "Is metal right for your home?",
        body: [
          "Metal costs more up front than shingles, but its lifespan, energy efficiency and snow-shedding performance often make it the better long-term value — especially if you plan to stay in your home.",
        ],
      },
    ],
    checks: ["Standing-seam", "Exposed-fastener", "Snow guards", "Homes & barns", "40–70 yr lifespan", "Energy efficient"],
    faqs: [
      {
        q: "Is a metal roof loud in the rain?",
        a: "Over solid decking and underlayment, a modern metal roof is no louder than shingles inside the home.",
      },
      {
        q: "Will snow slide off a metal roof?",
        a: "Yes — that's a major benefit. We can add snow guards over entries and walkways to control it.",
      },
    ],
    related: ["shingle-roofing", "residential-roofing-replacement", "residential-roofing"],
  },
  {
    slug: "commercial-roofing",
    group: "commercial",
    label: "Commercial Roofing",
    metaTitle: "Commercial Roofing in Southern MN | TPO & EPDM | RidgeLine",
    metaDescription:
      "Commercial TPO and EPDM rubber roof installation and repair for southern Minnesota businesses. Minimal disruption, clear pricing. Call (507) 440-8756.",
    eyebrow: "Commercial",
    h1: "Commercial roofing that keeps your business open",
    image: images.commercial,
    intro:
      "A leaking roof costs a business more than repairs — it costs inventory, equipment and customers. We install and repair low-slope commercial roofing systems with minimal disruption to your operations.",
    sections: [
      {
        h2: "Commercial roofing systems",
        body: [
          "We specialize in single-ply membranes: TPO for energy efficiency and heat-welded seams, and EPDM rubber for proven, flexible performance through Minnesota freeze-thaw cycles.",
          "We also handle repairs, recovers and maintenance to extend the life of the roof you already have.",
        ],
      },
      {
        h2: "Built around your schedule",
        body: [
          "We plan work around your business hours, keep the site safe and clean, and communicate clearly about timing so you can keep serving customers.",
        ],
      },
    ],
    checks: ["TPO membrane", "EPDM rubber", "Leak repairs", "Roof recovers", "Maintenance plans", "Minimal disruption"],
    faqs: [
      {
        q: "TPO or EPDM — which is better?",
        a: "TPO is bright white and energy efficient with heat-welded seams; EPDM is extremely flexible in cold weather and repair-friendly. We'll recommend the best fit for your building.",
      },
      {
        q: "Can you work while we're open?",
        a: "In most cases, yes. We schedule and stage work to minimize disruption to your operations.",
      },
    ],
    related: ["commercial-tpo-roofing-installation", "commercial-rubber-roofing-installation", "commercial-roofing-repairs"],
  },
  {
    slug: "commercial-tpo-roofing-installation",
    group: "commercial",
    label: "TPO Installation",
    metaTitle: "Commercial TPO Roofing Installation in MN | RidgeLine Roofing",
    metaDescription:
      "Energy-efficient TPO roof installation for commercial and low-slope buildings in southern Minnesota. Heat-welded seams, reflective membrane. Call (507) 440-8756.",
    eyebrow: "Commercial · TPO",
    h1: "TPO roofing for efficient, watertight buildings",
    image: images.commercial,
    intro:
      "TPO (thermoplastic polyolefin) is a bright-white single-ply membrane with heat-welded seams. It reflects sunlight, lowers cooling costs, and creates a continuous watertight surface on low-slope roofs.",
    sections: [
      {
        h2: "Benefits of TPO",
        body: [
          "Heat-welded seams are stronger than taped or glued seams. The reflective surface reduces heat gain in summer, and TPO resists punctures, tears and dirt buildup.",
        ],
      },
      {
        h2: "Our TPO installation",
        body: [
          "We evaluate your existing roof, address any wet insulation or deck issues, install tapered insulation where needed for drainage, then mechanically fasten or adhere the membrane and hot-air weld every seam and detail.",
        ],
      },
    ],
    checks: ["Heat-welded seams", "Reflective membrane", "Tapered insulation", "Puncture resistant", "Lower cooling costs", "Low-slope experts"],
    faqs: [
      { q: "How long does a TPO roof last?", a: "A properly installed TPO roof typically lasts 20–30 years." },
      {
        q: "Can TPO go over my existing roof?",
        a: "Sometimes. If the existing roof is dry and sound, a recover may be an option — we'll test and advise.",
      },
    ],
    related: ["commercial-rubber-roofing-installation", "commercial-roofing-repairs", "commercial-roofing"],
  },
  {
    slug: "commercial-rubber-roofing-installation",
    group: "commercial",
    label: "Rubber (EPDM) Installation",
    metaTitle: "Commercial Rubber (EPDM) Roofing in MN | RidgeLine Roofing",
    metaDescription:
      "EPDM rubber roof installation for commercial and low-slope buildings across southern Minnesota. Flexible, durable, cold-weather proven. Call (507) 440-8756.",
    eyebrow: "Commercial · EPDM",
    h1: "EPDM rubber roofing, proven in the cold",
    image: images.commercial,
    intro:
      "EPDM is a synthetic rubber membrane that has protected low-slope roofs for decades. It stays flexible through brutal Minnesota winters and is simple to maintain and repair.",
    sections: [
      {
        h2: "Why EPDM works in Minnesota",
        body: [
          "Rubber membranes expand and contract with temperature swings without cracking, making them ideal for freeze-thaw climates. Large sheets mean fewer seams and fewer potential leak points.",
        ],
      },
      {
        h2: "Installation & repairs",
        body: [
          "We install fully adhered or mechanically attached EPDM systems with proper flashing at walls, curbs and penetrations, and we repair and maintain existing rubber roofs.",
        ],
      },
    ],
    checks: ["Cold-weather flexible", "Fewer seams", "Fully adhered", "Repair friendly", "25–30 yr lifespan", "Low maintenance"],
    faqs: [
      { q: "How long does EPDM last?", a: "EPDM roofs commonly last 25–30 years with basic maintenance." },
      { q: "Can a rubber roof be repaired?", a: "Yes — EPDM is very repair-friendly. Most punctures and seam issues can be patched." },
    ],
    related: ["commercial-tpo-roofing-installation", "commercial-roofing-repairs", "commercial-roofing"],
  },
  {
    slug: "commercial-roofing-repairs",
    group: "commercial",
    label: "Commercial Repairs",
    metaTitle: "Commercial Roof Repair in Southern MN | RidgeLine Roofing",
    metaDescription:
      "Fast commercial roof leak repair for TPO, EPDM and flat roofs in Austin, Rochester, Albert Lea & Owatonna, MN. Call RidgeLine at (507) 440-8756.",
    eyebrow: "Commercial · Repairs",
    h1: "Commercial roof repairs, fast",
    image: images.commercial,
    intro:
      "Leaks on a commercial building rarely wait for a convenient time. We locate the source, make a lasting repair, and help you plan for the long-term life of your roof.",
    sections: [
      {
        h2: "Common commercial roof problems",
        body: [
          "Open seams, failed flashing at curbs and walls, ponding water, punctures from foot traffic or HVAC work, and storm damage are the most common causes of commercial leaks — all of which we repair.",
        ],
      },
      {
        h2: "Repair or replace?",
        body: [
          "We'll give you an honest assessment. If targeted repairs will get you years more life, that's what we'll recommend.",
        ],
      },
    ],
    checks: ["Leak detection", "Seam repairs", "Flashing repairs", "Ponding solutions", "Storm damage", "Honest assessments"],
    faqs: [
      { q: "Do you offer emergency commercial repairs?", a: "Yes — we provide 24/7 emergency response for storm damage." },
      { q: "Which roof types do you repair?", a: "TPO, EPDM rubber and most low-slope commercial systems." },
    ],
    related: ["commercial-roofing", "commercial-tpo-roofing-installation", "storm-repairs"],
  },
  {
    slug: "storm-repairs",
    group: "storm",
    label: "Storm Repairs",
    metaTitle: "Storm & Hail Damage Roof Repair | 24/7 | RidgeLine Roofing MN",
    metaDescription:
      "24/7 emergency storm and hail damage roof repair in southern Minnesota. We work directly with your insurance company. Call (507) 440-8756 now.",
    eyebrow: "Storm Repairs · 24/7",
    h1: "Storm damage? We're on the way — day or night",
    image: images.storm,
    intro:
      "Hail and straight-line winds hit southern Minnesota hard. When a storm damages your roof, we respond 24/7 to stop further water damage, then guide you through the insurance process from start to finish.",
    sections: [
      {
        h2: "Emergency response",
        body: [
          "Call us any time. We'll tarp and secure your roof to prevent further damage, document everything, and get permanent repairs scheduled as quickly as possible.",
        ],
      },
      {
        h2: "We work with your insurance company",
        body: [
          "Insurance claims can be stressful. We photograph and document storm damage, meet your adjuster on site, and work directly with your insurance company to help make sure everything that was damaged is covered.",
          "Beware of out-of-state storm chasers. RidgeLine is a local Austin company that will be here long after the storm season ends.",
        ],
      },
    ],
    checks: ["24/7 emergency service", "Emergency tarping", "Hail damage", "Wind damage", "Insurance claim help", "Adjuster meetings"],
    faqs: [
      {
        q: "What should I do right after a storm?",
        a: "Stay safe, photograph any visible damage, and call us for an inspection. Don't climb on a damaged roof.",
      },
      {
        q: "How long do I have to file an insurance claim?",
        a: "Policies vary, so check with your agent — but it's always best to have the damage inspected and documented as soon as possible.",
      },
    ],
    related: ["residential-roofing-inspections", "residential-roofing-replacement", "commercial-roofing-repairs"],
  },
];

export const getService = (slug: string) => servicePages.find((s) => s.slug === slug);

/**
 * All homepage copy and data lives here so it can be edited without touching
 * layout code. Sources: KeyPMC Website Discovery Questionnaire (Oct 2026) and
 * Key Company Profile 2026 (v4).
 *
 * Confidentiality: client names and project values must never be added here.
 * Portfolio counts are as at the October 2026 profile; confirm before go-live.
 */

export const iconKeys = [
  "workflow",
  "drafting-compass",
  "hard-hat",
  "coins",
  "chart-gantt",
  "stamp",
  "drone",
  "crown",
  "user-check",
  "landmark",
  "building",
  "chart-pie",
  "shield-check",
  "layers",
  "database",
  "folder-open",
  "clipboard-check",
  "cog",
  "package",
] as const;

export type IconKey = (typeof iconKeys)[number];

/** A headline set in two tones, as in the Antra layout: `start` in brown, `accent` in gold. */
export type Heading = { start: string; accent: string };

export type ImageKey =
  | "heroSkyline"
  | "heroPalaceHall"
  | "heroAirport"
  | "palaceDome"
  | "palaceHall"
  | "corniche"
  | "planning"
  | "contracts"
  | "supervision"
  | "design"
  | "drone"
  | "airport"
  | "estateAlAin"
  | "estateAlBahia";

export type SiteImage = { src: string; alt: string; width: number; height: number };

export type Feature = { title: string; description: string; icon: IconKey };

// Placeholder photography (Unsplash License, see public/images/CREDITS.md).
// Replace with KeyPMC's own project photos when supplied.
const images: Record<ImageKey, SiteImage> = {
  heroSkyline: {
    src: "/images/hero-abu-dhabi-skyline.webp",
    alt: "Abu Dhabi coastline and skyline at sunset seen from above",
    width: 2400,
    height: 1603,
  },
  heroPalaceHall: {
    src: "/images/hero-palace-hall.webp",
    alt: "Marble arches and a gilded domed ceiling in the great hall of Qasr Al Watan, Abu Dhabi",
    width: 2400,
    height: 1600,
  },
  heroAirport: {
    src: "/images/hero-executive-airport.webp",
    alt: "Business jet on an executive airport apron under a warm evening sky",
    width: 2400,
    height: 1535,
  },
  palaceDome: {
    src: "/images/hero-qasr-al-watan.webp",
    alt: "Gilded dome and carved arches inside Qasr Al Watan, the presidential palace in Abu Dhabi",
    width: 1400,
    height: 1867,
  },
  palaceHall: {
    src: "/images/palace-hall.webp",
    alt: "Great hall of Qasr Al Watan with white marble arches and a domed ceiling",
    width: 1600,
    height: 1067,
  },
  corniche: {
    src: "/images/abu-dhabi-corniche.webp",
    alt: "Abu Dhabi towers and waterfront seen across calm turquoise water",
    width: 1600,
    height: 900,
  },
  planning: {
    src: "/images/planning-review.webp",
    alt: "Two professionals marking up architectural floor plans beside a calculator",
    width: 1600,
    height: 2307,
  },
  contracts: {
    src: "/images/contract-review.webp",
    alt: "Two people reviewing contract documents together at a meeting table",
    width: 1600,
    height: 1067,
  },
  supervision: {
    src: "/images/site-supervision.webp",
    alt: "Site worker in a hard hat and safety vest checking reinforcement on a building under construction",
    width: 1600,
    height: 1067,
  },
  design: {
    src: "/images/design-review.webp",
    alt: "Architectural floor plans and drawings laid out on a marble desk for review",
    width: 1600,
    height: 2399,
  },
  drone: {
    src: "/images/drone-survey.webp",
    alt: "Top-down drone view of earthworks and vehicle tracks on a desert construction site",
    width: 1400,
    height: 1400,
  },
  airport: {
    src: "/images/executive-airport.webp",
    alt: "Business jet parked on an airport apron at sunset",
    width: 1600,
    height: 1023,
  },
  estateAlAin: {
    src: "/images/estate-al-ain.webp",
    alt: "Courtyard of a desert estate with a reflecting pool, sand-coloured walls and date palms",
    width: 1600,
    height: 1067,
  },
  estateAlBahia: {
    src: "/images/estate-al-bahia.webp",
    alt: "Arched walls and palm trees around a pool in a traditional-style estate",
    width: 1600,
    height: 1067,
  },
};

const sectionIds = ["about", "services", "approach", "projects", "why", "contact"] as const;

export const home = {
  sectionIds,

  company: {
    shortName: "Key International",
    legalName: "Key International Engineering Projects Management Consultancy - L.L.C - S.P.C",
    parent: "United National Holding (UNH)",
    licence: "CN-5872131",
    licenceLabel: "Abu Dhabi Economic Licence",
    established: "2025, Abu Dhabi",
    copyrightYear: 2026,
  },

  contactDetails: {
    office: ["EOM Offices, Umm Yifenah", "Abu Dhabi, United Arab Emirates"],
    poBox: "P.O. Box 112120, Abu Dhabi",
    hours: "Monday to Friday, with a half day on Friday",
    hoursShort: "Mon–Fri, Friday half day",
    // Not yet supplied by KeyPMC. Shown automatically once filled in.
    phone: null as string | null,
    email: null as string | null,
  },

  nav: [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Approach", href: "#approach" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ],

  cta: { label: "Discuss a project", href: "#contact" },

  hero: {
    label: "Project management consultancy, Abu Dhabi",
    title: "We protect your investment from concept to handover.",
    lead: "The client’s representative across the whole project life cycle, with one accountable team for time, cost and quality.",
    primary: { label: "Discuss a project", href: "#contact" },
    /** Sectors the slideshow cycles through, in order. */
    slides: [
      { image: "heroSkyline", caption: "Abu Dhabi and beyond" },
      { image: "heroPalaceHall", caption: "Royal & government" },
      { image: "heroAirport", caption: "Aviation & infrastructure" },
    ] satisfies { image: ImageKey; caption: string }[],
    card: {
      value: 15,
      label: "Projects in portfolio",
      points: ["Project management", "Construction supervision", "Cost & contract control"],
    },
  },

  intro: {
    label: "Who we are",
    title: { start: "One accountable team", accent: "for the whole project." } satisfies Heading,
    body: "Key International brings project management, design management, construction supervision, and cost and contract control under one team, across aviation infrastructure, royal and government developments, hospitality, sports and leisure, and private estates.",
    divisions: [
      {
        title: "Project Management Consultancy",
        description: "Project management, engineering supervision, QA/QC and HSE oversight.",
        icon: "clipboard-check",
      },
      {
        title: "Project Support Services",
        description: "Project controls, finance and budget, resource management and cybersecurity.",
        icon: "cog",
      },
      {
        title: "Operations & Project Delivery",
        description: "Civil and architecture, MEP operations, site coordination and field supervision.",
        icon: "hard-hat",
      },
      {
        title: "Commercial & Supply Chain",
        description: "Procurement, vendor management, logistics and inventory.",
        icon: "package",
      },
    ] satisfies Feature[],
  },

  band: {
    label: "Established 2025, Abu Dhabi",
    title: { start: "Protecting investments", accent: "of national significance." } satisfies Heading,
    checklist: [
      "100% Emirati company",
      "Member of United National Holding",
      "Royal & government experience",
      "QHSE in every phase",
    ],
    body: "Our mission is to plan, manage and deliver projects safely, on time, within budget and to the highest quality, through disciplined governance and an experienced multidisciplinary team.",
    values: "Integrity, Excellence, Accountability, Collaboration and Sustainability.",
    button: { label: "Discuss a project", href: "#contact" },
    image: "palaceDome" as ImageKey,
    watermark: "KEY",
  },

  services: {
    label: "Our services",
    title: { start: "Integrated capabilities across", accent: "the project life cycle." } satisfies Heading,
    lead: "From the first feasibility review to the final account, every discipline sits with one team on the client’s side.",
    items: [
      {
        title: "Project Management",
        description: "End-to-end planning, coordination and delivery on the client’s behalf.",
        icon: "workflow",
        image: "planning" as ImageKey,
      },
      {
        title: "Design Management",
        description: "Design reviews, consultant coordination, value engineering and BIM integration.",
        icon: "drafting-compass",
        image: "design" as ImageKey,
      },
      {
        title: "Construction Supervision",
        description: "Site inspection, quality assurance and progress monitoring across all disciplines.",
        icon: "hard-hat",
        image: "supervision" as ImageKey,
      },
      {
        title: "Cost & Contracts Management",
        description: "Cost planning, procurement, contract administration and change control.",
        icon: "coins",
        image: "contracts" as ImageKey,
      },
      {
        title: "Planning & Project Controls",
        description: "Scheduling, risk management, earned value and performance reporting.",
        icon: "chart-gantt",
        image: "corniche" as ImageKey,
      },
      {
        title: "Authority Approvals & Compliance",
        description: "Permits, regulatory approvals, stakeholder coordination and statutory compliance.",
        icon: "stamp",
        image: "palaceHall" as ImageKey,
      },
    ] satisfies (Feature & { image: ImageKey })[],
    specialist: {
      title: "Licensed drone surveys",
      description: "Aerial survey and photography for site mapping, progress records and as-built verification.",
      icon: "drone" as IconKey,
      image: "drone" as ImageKey,
    },
  },

  stats: {
    note: "As at October 2026",
    items: [
      { id: "portfolio", value: 15, label: "Projects in portfolio", detail: "Across aviation, royal, hospitality and estates" },
      { id: "delivery", value: 3, label: "Projects in delivery", detail: "On site today in Abu Dhabi, Al Ain and Al Bahia" },
      { id: "pipeline", value: 12, label: "Secured pipeline projects", detail: "From concept design to mobilisation" },
      { id: "emirates", value: 3, label: "Emirates served", detail: "Abu Dhabi, Dubai and Fujairah" },
    ],
  },

  approach: {
    label: "How we work",
    title: { start: "Adding value", accent: "at every stage." } satisfies Heading,
    lead: "Acting as the client’s extended arm: accountable for time, cost and quality.",
    stages: [
      { title: "Initiation", activities: ["Client objectives", "Feasibility review", "Stakeholder mapping"], image: "planning" as ImageKey },
      { title: "Concept & Design", activities: ["Option analysis", "Design reviews", "Cost plan"], image: "design" as ImageKey },
      { title: "Procurement", activities: ["Tender strategy", "Bid evaluation", "Contract award"], image: "contracts" as ImageKey },
      { title: "Execution", activities: ["Supervision", "Quality control", "Change management"], image: "supervision" as ImageKey },
      { title: "Monitoring", activities: ["Schedule & cost control", "Risk management", "Reporting"], image: "drone" as ImageKey },
      { title: "Close-Out", activities: ["Testing & handover", "Final accounts", "Lessons learned"], image: "palaceHall" as ImageKey },
    ],
    toolsTitle: "Tools we work with",
    tools: [
      { title: "Primavera P6 & MS Project", description: "Baselines, critical path and look-ahead programmes", icon: "chart-gantt" },
      { title: "BIM coordination", description: "Model-based design review, clash detection and quantity checks", icon: "layers" },
      { title: "Power BI dashboards", description: "Progress, cost and risk reporting in real time", icon: "chart-pie" },
      { title: "ERP-integrated controls", description: "Cost, procurement and document control linked to group systems", icon: "database" },
      { title: "Drone surveys", description: "Licensed aerial survey for progress and as-built records", icon: "drone" },
      { title: "Document control", description: "Structured correspondence, submittal and RFI management", icon: "folder-open" },
    ] satisfies Feature[],
  },

  portfolio: {
    label: "Our projects",
    title: { start: "Projects in delivery", accent: "across the UAE." } satisfies Heading,
    confidentialityNote: "Client names and project values are kept confidential. Photos are representative.",
    inDelivery: [
      {
        name: "Al Bateen Executive Airport – Fuel Farm Relocation",
        location: "Abu Dhabi",
        sector: "Aviation Infrastructure",
        status: "Target completion May 2027",
        image: "airport" as ImageKey,
      },
      {
        name: "Al Ain Private Farm Estate",
        location: "Al Ain",
        sector: "Private Estates",
        status: "Target completion Feb 2027",
        image: "estateAlAin" as ImageKey,
      },
      {
        name: "Al Bahia Private Farm Estate",
        location: "Al Bahia, Abu Dhabi",
        sector: "Private Estates",
        status: "Target completion Feb 2027",
        image: "estateAlBahia" as ImageKey,
      },
    ],
    pipeline: {
      count: 12,
      title: "Secured pipeline",
      description: "Royal palace developments, a Fujairah beach resort, Khalifa Sports Complex, estate programmes and more, from concept design to mobilisation.",
    },
    watermark: "Projects",
  },

  sectors: [
    "Royal & Government",
    "Aviation & Infrastructure",
    "Hospitality & Leisure",
    "Sports & Public Realm",
    "Residential & Estates",
    "Group Companies",
  ],

  advantages: {
    label: "Why Key International",
    title: { start: "Trusted on projects", accent: "that demand discretion." } satisfies Heading,
    items: [
      {
        title: "100% Emirati company",
        description: "Wholly owned by United National Holding and led by UAE nationals.",
        icon: "crown",
        image: "heroSkyline" as ImageKey,
      },
      {
        title: "Single point of accountability",
        description: "One team for management, design, supervision and cost, with no gaps between providers.",
        icon: "user-check",
        image: "planning" as ImageKey,
      },
      {
        title: "Royal & government experience",
        description: "Sensitive, high-profile projects that demand discretion and protocol.",
        icon: "landmark",
        image: "palaceDome" as ImageKey,
      },
      {
        title: "Group strength",
        description: "Access to the resources, systems and specialist companies of UNH.",
        icon: "building",
        image: "corniche" as ImageKey,
      },
      {
        title: "Commercial discipline",
        description: "Rigorous cost planning, change control and contract administration.",
        icon: "coins",
        image: "contracts" as ImageKey,
      },
      {
        title: "Data-driven controls",
        description: "Integrated planning and dashboards give clients real-time visibility.",
        icon: "chart-pie",
        image: "design" as ImageKey,
      },
      {
        title: "Safety & quality first",
        description: "QHSE built into every phase, aligned with UAE authority requirements.",
        icon: "shield-check",
        image: "supervision" as ImageKey,
      },
    ] satisfies (Feature & { image: ImageKey })[],
  },

  videoCta: {
    title: "Tell us about your project.",
    text: "From a private estate to a project of national significance, we act for you from the first brief to the final handover.",
    button: { label: "Discuss a project", href: "#contact" },
    // Mixkit Stock Video Free License, see public/images/CREDITS.md.
    video: { src: "/video/site-aerial.mp4", poster: "/video/site-aerial-poster.webp" },
  },

  contact: {
    label: "Contact",
    title: { start: "Let’s talk about", accent: "your project." } satisfies Heading,
    lead: "Share a few details and our team will get back to you.",
    form: {
      fields: {
        name: { label: "Full name", placeholder: "Your name" },
        organisation: { label: "Organisation", placeholder: "Optional" },
        email: { label: "Email", placeholder: "name@company.com" },
        message: { label: "Project details", placeholder: "Location, type of project and current stage" },
      },
      submit: "Send enquiry",
      errors: {
        name: "Enter your name.",
        email: "Enter a valid email address, like name@company.com.",
        message: "Tell us a little about the project (at least 20 characters).",
      },
      // TODO(go-live): connect to KeyPMC's enquiry inbox, then replace this notice.
      notConnected:
        "Your enquiry is valid, but online enquiries are not connected yet. Please visit our office in Umm Yifenah while we set this up.",
    },
  },

  footer: {
    descriptor: "Project management consultancy in Abu Dhabi. A member of United National Holding.",
    wordmark: "Key International",
    background: "corniche" as ImageKey,
  },

  images,
} as const;

export type HomeContent = typeof home;

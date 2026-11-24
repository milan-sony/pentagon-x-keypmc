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
] as const;

export type IconKey = (typeof iconKeys)[number];

export type ImageKey =
  | "hero"
  | "palaceHall"
  | "skyline"
  | "corniche"
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
  hero: {
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
  skyline: {
    src: "/images/abu-dhabi-skyline.webp",
    alt: "Abu Dhabi coastline and skyline at sunset seen from above",
    width: 1600,
    height: 1069,
  },
  corniche: {
    src: "/images/abu-dhabi-corniche.webp",
    alt: "Abu Dhabi towers and waterfront seen across calm turquoise water",
    width: 1600,
    height: 900,
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

const sectionIds = ["about", "services", "why", "approach", "projects", "contact"] as const;

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
    title: "We protect your investment from concept to handover.",
    lead: "An Abu Dhabi project management consultancy that acts as the client’s representative across the whole project life cycle.",
    primary: { label: "Discuss a project", href: "#contact" },
    secondary: { label: "Our services", href: "#services" },
    highlights: [
      { value: "100%", label: "Emirati company" },
      { value: "15", label: "Projects in portfolio" },
      { value: "3", label: "Emirates served" },
    ],
    image: "hero" as ImageKey,
  },

  sectors: [
    "Royal & Government",
    "Aviation & Infrastructure",
    "Hospitality & Leisure",
    "Sports & Public Realm",
    "Residential & Estates",
    "Group Companies",
  ],

  about: {
    label: "Who we are",
    title: "One accountable team for the whole project.",
    body: "Key International brings project management, design management, construction supervision, and cost and contract control under one team. We work on aviation infrastructure, royal and government developments, hospitality, sports and leisure, and private estates across the UAE.",
    pillars: [
      {
        title: "Vision",
        text: "To be the UAE’s most trusted project management partner, recognised for technical excellence, integrity and consistent delivery of projects of national significance.",
        image: "skyline" as ImageKey,
      },
      {
        title: "Mission",
        text: "To plan, manage and deliver projects safely, on time, within budget and to the highest quality, through disciplined governance and an experienced multidisciplinary team.",
        image: "supervision" as ImageKey,
      },
    ],
    values: [
      { title: "Integrity", text: "Transparent advice and honest reporting" },
      { title: "Excellence", text: "High standards in every deliverable" },
      { title: "Accountability", text: "Clear ownership of outcomes" },
      { title: "Collaboration", text: "One team with clients and partners" },
      { title: "Sustainability", text: "Responsible use of resources" },
    ],
  },

  services: {
    label: "Our services",
    title: "Integrated capabilities across the project life cycle.",
    items: [
      {
        title: "Project Management",
        description: "End-to-end planning, coordination and delivery on the client’s behalf.",
        icon: "workflow",
        image: "skyline" as ImageKey,
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
        image: "corniche" as ImageKey,
      },
      {
        title: "Planning & Project Controls",
        description: "Scheduling, risk management, earned value and performance reporting.",
        icon: "chart-gantt",
        image: "airport" as ImageKey,
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

  advantages: {
    label: "Why Key International",
    title: "Trusted on projects that demand discretion.",
    featured: {
      value: "100%",
      title: "Emirati company",
      description: "Wholly owned by United National Holding and led by UAE nationals: a trusted local partner for government, royal and private clients.",
      icon: "crown" as IconKey,
    },
    items: [
      {
        title: "Single point of accountability",
        description: "One team for management, design, supervision and cost control, with no gaps between providers.",
        icon: "user-check",
      },
      {
        title: "Royal & government experience",
        description: "Sensitive, high-profile projects that demand discretion and protocol.",
        icon: "landmark",
      },
      {
        title: "Group strength",
        description: "Access to the resources, systems and specialist companies of United National Holding.",
        icon: "building",
      },
      {
        title: "Commercial discipline",
        description: "Rigorous cost planning, change control and contract administration that protect value.",
        icon: "coins",
      },
      {
        title: "Data-driven controls",
        description: "Integrated planning and dashboards give clients real-time visibility.",
        icon: "chart-pie",
      },
      {
        title: "Safety & quality first",
        description: "QHSE built into every phase, aligned with UAE authority requirements.",
        icon: "shield-check",
      },
    ] satisfies Feature[],
  },

  approach: {
    label: "Delivery approach",
    title: "Adding value at every stage.",
    lead: "Acting as the client’s extended arm: accountable for time, cost and quality.",
    stages: [
      { title: "Initiation", activities: ["Client objectives", "Feasibility review", "Stakeholder mapping"] },
      { title: "Concept & Design", activities: ["Option analysis", "Design reviews", "Cost plan"] },
      { title: "Procurement", activities: ["Tender strategy", "Bid evaluation", "Contract award"] },
      { title: "Execution", activities: ["Supervision", "Quality control", "Change management"] },
      { title: "Monitoring", activities: ["Schedule & cost control", "Risk management", "Reporting"] },
      { title: "Close-Out", activities: ["Testing & handover", "Final accounts", "Lessons learned"] },
    ],
    toolsTitle: "Tools we work with",
    tools: [
      { title: "Planning & scheduling", description: "Primavera P6 and MS Project baselines and look-ahead programmes", icon: "chart-gantt" },
      { title: "BIM coordination", description: "Model-based design review, clash detection and quantity checks", icon: "layers" },
      { title: "Dashboards", description: "Power BI reporting on progress, cost and risk in real time", icon: "chart-pie" },
      { title: "ERP-integrated controls", description: "Cost, procurement and document control linked to group systems", icon: "database" },
      { title: "Drone surveys", description: "Licensed aerial survey for progress and as-built records", icon: "drone" },
      { title: "Document control", description: "Structured correspondence, submittal and RFI management", icon: "folder-open" },
    ] satisfies Feature[],
  },

  stats: {
    title: "Our portfolio at a glance",
    note: "As at October 2026",
    items: [
      { id: "portfolio", value: 15, label: "Projects in portfolio" },
      { id: "delivery", value: 3, label: "Projects in delivery" },
      { id: "pipeline", value: 12, label: "Secured pipeline projects" },
      { id: "emirates", value: 3, label: "Emirates served" },
    ],
  },

  portfolio: {
    label: "Projects",
    title: "Projects in delivery across the UAE.",
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
  },

  contact: {
    label: "Contact",
    title: "Tell us about your project.",
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
  },

  images,
} as const;

export type HomeContent = typeof home;

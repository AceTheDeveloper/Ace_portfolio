export type ServiceId = "websites" | "pos" | "mobile" | "ai";

export interface Service {
  id: ServiceId;
  /** Two-digit number shown on the card. */
  number: string;
  title: string;
  /** One line, no prices or promises. */
  summary: string;
  /**
   * Slugs from data/projects.ts that are named and linked as "Real work".
   * A slug that is missing or hidden there is dropped automatically.
   */
  projectSlugs: string[];
  /**
   * Shown instead of project names when the work behind a service should not
   * be named, e.g. client systems.
   */
  features?: string[];
  /**
   * Slugs whose real stack feeds the chips. Defaults to `projectSlugs`; set it
   * separately when the projects are not named on the card.
   */
  stackFrom?: string[];
}

export const services: Service[] = [
  {
    id: "websites",
    number: "01",
    title: "Business websites",
    summary: "Fast, mobile-friendly sites: menu, offers, location, contact.",
    projectSlugs: ["h-website"],
  },
  {
    id: "pos",
    number: "02",
    title: "POS & business systems",
    summary: "Checkout, inventory, staff and sales reports in one system.",
    // Client systems: described by what they do, not named or linked here.
    projectSlugs: [],
    features: ["Checkout", "Inventory", "Staff", "Reports"],
    stackFrom: ["h-carwash-pos", "beboys-final"],
  },
  {
    id: "mobile",
    number: "03",
    title: "Mobile apps",
    summary: "iOS and Android apps with sign-in, ordering and profiles.",
    projectSlugs: ["beboys-mobile-app", "proply"],
  },
  {
    id: "ai",
    number: "04",
    title: "AI-powered features",
    summary: "Smart matching and AI tools built into your product.",
    projectSlugs: ["innovex2026"],
  },
];

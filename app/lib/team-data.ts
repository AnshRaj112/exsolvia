export type TeamStat = { value: string; label: string };

export type TeamProjectCard = {
  title: string;
  blurb: string;
  href: string;
};

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  img: string;
  bio: string;
  longBio?: string;
  linkedin?: string;
  github?: string;
  /** Shown directly under the bio */
  stats?: TeamStat[];
  /** Up to two cards, rendered below Operational Focus */
  projectCards?: TeamProjectCard[];
  /** Single line, shown after project cards */
  philosophy?: string;
  /** Bullet list under Operational Focus — unique per member */
  operationalFocus: string[];
};

export const TEAM: TeamMember[] = [
  {
    slug: "ansh-raj",
    name: "Ansh Raj",
    role: "Founding Architect",
    img: "https://res.cloudinary.com/dt45pu5mx/image/upload/v1767445097/photo_2026-01-02_12-19-43_cj9q29.jpg",
    bio: "Specializing in scalable full-stack systems, intelligent automation workflows, and data-driven product engineering.",
    longBio:
      "Architects the core intelligence layer of EXSOLVIA systems, driving recursive resilience and deterministic scaling at every layer.",
    linkedin: "https://www.linkedin.com/in/ansh-raj112",
    github: "https://github.com/anshraj112",
    stats: [
      { value: "2+", label: "Years building" },
      { value: "2", label: "Live products" },
      { value: "∞", label: "Problems to solve" },
    ],
    projectCards: [
      {
        title: "KAMPYN",
        blurb: "Campus dining, inventory, and ordering—unified for universities.",
        href: "/products/kampyn",
      },
      {
        title: "EXSOLVIA platform",
        blurb: "The intelligence and automation backbone behind our product line.",
        href: "/products",
      },
    ],
    philosophy: "Ship systems that stay honest when everything else moves fast.",
    operationalFocus: [
      "Building and scaling core products from zero to production",
      "Owning end-to-end development across backend, frontend, and infrastructure",
      "Driving reliability, automation, and performance across every release",
    ],
  },
  // {
  //   slug: "elena-vance",
  //   name: "Elena Vance",
  //   role: "System Strategist",
  //   img: "https://res.cloudinary.com/dt45pu5mx/image/upload/v1767445097/photo_2026-01-02_12-19-43_cj9q29.jpg",
  //   bio: "Pioneering global orchestration protocols and high-frequency deployment optimization for enterprise machines.",
  //   longBio:
  //     "Elena orchestrates global deployment strategies across enterprise clusters with zero tolerance for latency drift.",
  // },
  // {
  //   slug: "marcus-kross",
  //   name: "Marcus Kross",
  //   role: "Lead Intelligence",
  //   img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDG3TNTC9xRwgXpKmRZkvkKs7nnUxAJoiW-ndm8q4bESOIZQfP435xZfDvqUXcmTS95tC6NpqmMunrv1TKEAuqtkvz65Yoq59jWpy1E053mGVVuOXXQyveB2fw_hIdeCm5ectc0UpcMB8JitrsUEWwg9sOjWPx2ZbBZcLnxVMAYZavNYjZS7iqVMYDIYoSt9C4poOhWW_ZC2Rvm9K8Od_ILORu2_ipUuz-SNG2U-5PcCEArxQQjn4QuNrAGHpkzo1ZVRngl_obK0NY",
  //   bio: "Engineering the semantic layers of the EXSOLVIA core, focusing on hyper-efficient data retrieval.",
  //   longBio:
  //     "Marcus drives semantic intelligence layers and retrieval performance for the EXSOLVIA core platform.",
  // },
];

export function getMember(slug: string) {
  return TEAM.find((m) => m.slug === slug);
}

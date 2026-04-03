export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  img: string;
  bio: string;
  longBio?: string;
};

export const TEAM: TeamMember[] = [
  {
    slug: "elias-thorne",
    name: "Elias Thorne",
    role: "Founding Architect",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAJHDRETC3EKHlTJjgjhs0mNRQtNjrEWdWEAk9qjgFhR0OO7-N-lMmHYQae7nIO4K0kfwo69rr_f_c9gJ9ItGguP3eHsxUWWFW4EXmT44OKk7lWpamUhqWEaTaHV5Q7_0OgjrloMX-tGa44P7BTnZHMkFqpe9aofWqajN1okv_FuIIqvdKZipbJIBCmcASTbQYq9f3YSyA-t2waxQl5wanvsP-gXYtaTCL2cfouD6Bth7ekqOwBiPqlOlb9FkEYEADd2UUMAd0cQBs",
    bio: "Specializing in recursive neural architectures and the implementation of obsidian monolith data structures.",
    longBio:
      "Elias leads the foundational architecture of EXSOLVIA neural systems, prioritizing recursive resilience and deterministic scaling.",
  },
  {
    slug: "elena-vance",
    name: "Elena Vance",
    role: "System Strategist",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBobiAN1vrqW6zLIhqMMgojeVdQHnEBLN5t73v69rj1fwebijw2NJcyLcYT6gJz_suD2SVTee_2yvdpIidOQZgf8OX-DOBXZj4Mn50fJGlvu8zptTTMb1ptqEy-0iIqHFc3vPMVCZMGbfIpfxSKCowYe8mnsdhQtbgVW1Oa3UMhMglbaocRLs63wkMPGt_m6YebmAYZzS2Hr4egBtKAXs63UzRf4Zayrxga_dnfVuYTxCzQcPRp6yxp_y6tHKZy4tlIplotu4kHnYE",
    bio: "Pioneering global orchestration protocols and high-frequency deployment optimization for enterprise machines.",
    longBio:
      "Elena orchestrates global deployment strategies across enterprise clusters with zero tolerance for latency drift.",
  },
  {
    slug: "marcus-kross",
    name: "Marcus Kross",
    role: "Lead Intelligence",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDG3TNTC9xRwgXpKmRZkvkKs7nnUxAJoiW-ndm8q4bESOIZQfP435xZfDvqUXcmTS95tC6NpqmMunrv1TKEAuqtkvz65Yoq59jWpy1E053mGVVuOXXQyveB2fw_hIdeCm5ectc0UpcMB8JitrsUEWwg9sOjWPx2ZbBZcLnxVMAYZavNYjZS7iqVMYDIYoSt9C4poOhWW_ZC2Rvm9K8Od_ILORu2_ipUuz-SNG2U-5PcCEArxQQjn4QuNrAGHpkzo1ZVRngl_obK0NY",
    bio: "Engineering the semantic layers of the EXSOLVIA core, focusing on hyper-efficient data retrieval.",
    longBio:
      "Marcus drives semantic intelligence layers and retrieval performance for the EXSOLVIA core platform.",
  },
];

export function getMember(slug: string) {
  return TEAM.find((m) => m.slug === slug);
}

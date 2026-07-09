export type ProjectsPageContent = {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    image: string;
  };
  intro: {
    eyebrow: string;
    title: string;
    description: string;
  };
  filters: string[];
  projects: Array<{
    title: string;
    location: string;
    year: string;
    type: string;
    status: string;
    image: string;
  }>;
  process: {
    eyebrow: string;
    title: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
};

export const defaultProjectsPageContent: ProjectsPageContent = {
  hero: {
    eyebrow: "Projects",
    title: "Spaces planned for value, utility, and long-term trust",
    description:
      "Explore selected residential and commercial work from Biswas Builders Limited.",
    image: "/bbl/project-banner.jpg",
  },
  intro: {
    eyebrow: "Project Portfolio",
    title: "A focused collection of BBL developments",
    description:
      "BBL works across residential apartments, commercial buildings, landowner partnerships, and construction delivery with a consistent focus on planning, quality, and handover accountability.",
  },
  filters: ["All", "Residential", "Commercial", "Ongoing", "Completed"],
  projects: [
    { title: "Biswas Tower", location: "New Market, Dhaka", year: "2024", type: "Commercial", status: "Ongoing", image: "/bbl/project-1.jpg" },
    { title: "Biswas Credence", location: "Dhaka", year: "2023", type: "Residential", status: "Completed", image: "/bbl/project-2.jpg" },
    { title: "Biswas Moyeen Tower", location: "Dhaka", year: "2022", type: "Commercial", status: "Completed", image: "/bbl/project-3.jpg" },
    { title: "Saiham Future Complex", location: "Dhaka", year: "2021", type: "Commercial", status: "Completed", image: "/bbl/project-banner.jpg" },
  ],
  process: {
    eyebrow: "Delivery Method",
    title: "From land and design to construction and handover",
    items: [
      { title: "Planning", description: "Project feasibility, location value, utility, and approvals are coordinated before execution." },
      { title: "Construction", description: "Engineering, procurement, site supervision, and quality checks keep each project accountable." },
      { title: "Handover", description: "Sales, documentation, customer care, and after-sales support continue through completion." },
    ],
  },
};

export function mergeProjectsPageContent(content?: Partial<ProjectsPageContent>): ProjectsPageContent {
  return {
    ...defaultProjectsPageContent,
    ...content,
    hero: { ...defaultProjectsPageContent.hero, ...content?.hero },
    intro: { ...defaultProjectsPageContent.intro, ...content?.intro },
    process: {
      ...defaultProjectsPageContent.process,
      ...content?.process,
      items: content?.process?.items?.length ? content.process.items : defaultProjectsPageContent.process.items,
    },
    filters: content?.filters?.length ? content.filters : defaultProjectsPageContent.filters,
    projects: content?.projects?.length ? content.projects : defaultProjectsPageContent.projects,
  };
}

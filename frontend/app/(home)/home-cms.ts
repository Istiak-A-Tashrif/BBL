export type HomeContent = {
  hero: {
    eyebrow: string;
    title: string;
    highlight: string;
    buttonText: string;
    secondaryButtonText: string;
    image: string;
  };
  stats: {
    since: string;
    sinceLabel: string;
    team: string;
    teamLabel: string;
    projects: string;
    projectsLabel: string;
  };
  features: Array<{
    title: string;
    description: string;
  }>;
  about: {
    eyebrow: string;
    title: string;
    description: string;
    quote: string;
    image: string;
  };
  mission: {
    title: string;
    highlightPrefix: string;
    highlight: string;
    images: string[];
  };
  services: Array<{
    title: string;
    description: string;
    image: string;
  }>;
  projects: Array<{
    title: string;
    location: string;
    year: string;
    image: string;
  }>;
  testimonials: Array<{
    quote: string;
    author: string;
    image: string;
  }>;
  choose: {
    eyebrow: string;
    title: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
  team: Array<{
    name: string;
    role: string;
    image: string;
  }>;
  updates: Array<{
    category: string;
    date: string;
    title: string;
    author: string;
    role: string;
    image: string;
  }>;
  sections: {
    services: {
      eyebrow: string;
      title: string;
      description: string;
    };
    projects: {
      eyebrow: string;
      title: string;
      buttonText: string;
    };
    mission: {
      eyebrow: string;
    };
    testimonials: {
      eyebrow: string;
      title: string;
    };
    team: {
      eyebrow: string;
      title: string;
    };
    updates: {
      eyebrow: string;
      title: string;
    };
  };
};

export const defaultHomeContent: HomeContent = {
  hero: {
    eyebrow: "Biswas Builders Limited",
    title: "We believe in quality not quantity",
    highlight: "since 1994",
    buttonText: "Explore Projects",
    secondaryButtonText: "Talk to sales",
    image: "/bbl/hero.jpg",
  },
  stats: {
    since: "1994",
    sinceLabel: "Established",
    team: "800+",
    teamLabel: "Team and workers",
    projects: "4+",
    projectsLabel: "Highlighted projects",
  },
  features: [
    {
      title: "Quality materials",
      description:
        "Our teams support clients before, during, and after handover with clear information, documentation, and responsive service.",
    },
    {
      title: "Engineering strength",
      description:
        "Our service approach is built on integrity, professionalism, timeliness, confidentiality, credibility, honesty, and respect.",
    },
    {
      title: "Client-first service",
      description:
        "With about 300 regular employees and more than 500 daily workers, BBL is equipped for complex real estate and construction work.",
    },
  ],
  about: {
    eyebrow: "About BBL",
    title: "We build residential, commercial, and infrastructure projects with quality and accountability",
    description:
      "Biswas Builders Limited has grown from apartment construction in Uttara into a prominent Bangladeshi real estate and construction company. The company delivers residential and commercial buildings, civil engineering works, land development, and infrastructure projects with a customer-first service philosophy.",
    quote: "Build with a trusted name since 1994.",
    image: "/bbl/about-home.png",
  },
  mission: {
    title: "We strive to deliver safe, lasting spaces with",
    highlightPrefix: "quality",
    highlight: "construction",
    images: ["/bbl/project-1.jpg", "/bbl/project-2.jpg", "/bbl/project-3.jpg", "/bbl/gallery-1.jpg"],
  },
  services: [
    {
      title: "Real estate and construction",
      description:
        "We develop residential and commercial spaces with practical planning, quality materials, and dependable execution.",
      image: "/bbl/project-1.jpg",
    },
    {
      title: "Sales and customer care",
      description:
        "Our customer care process keeps buyers informed from first inquiry through handover and after-sales support.",
      image: "/bbl/project-2.jpg",
    },
    {
      title: "Construction quality",
      description:
        "BBL coordinates engineering, procurement, supervision, and site teams to maintain consistent construction standards.",
      image: "/bbl/project-3.jpg",
    },
    {
      title: "Landowner partnership",
      description:
        "We work with landowners through transparent development partnerships focused on long-term value.",
      image: "/bbl/value.jpg",
    },
  ],
  projects: [
    { title: "Biswas Tower", location: "New Market, Dhaka", year: "2024", image: "/bbl/project-1.jpg" },
    { title: "Biswas Credence", location: "Dhaka", year: "2023", image: "/bbl/project-2.jpg" },
    { title: "Biswas Moyeen Tower", location: "Dhaka", year: "2022", image: "/bbl/project-3.jpg" },
    { title: "Saiham Future Complex", location: "Dhaka", year: "2021", image: "/bbl/project-banner.jpg" },
  ],
  testimonials: [
    {
      quote:
        "BBL gave us clear guidance, dependable communication, and confidence through every stage of the project.",
      author: "A BBL Client",
      image: "/bbl/gallery-1.jpg",
    },
    {
      quote:
        "Their professionalism and construction quality made the entire property journey smooth and reassuring.",
      author: "Apartment Owner",
      image: "/bbl/gallery-2.jpg",
    },
    {
      quote:
        "We valued the team's honesty, timely updates, and commitment to delivering what was promised.",
      author: "Landowner Partner",
      image: "/bbl/gallery-3.jpg",
    },
  ],
  choose: {
    eyebrow: "Why choose BBL",
    title: "A trusted quality you can rely on",
    items: [
      {
        title: "Clear communication",
        description: "We keep clients informed with practical guidance and responsive communication.",
      },
      {
        title: "Practical planning",
        description: "Each project is planned around location, utility, value, and long-term durability.",
      },
      {
        title: "Professional delivery",
        description: "Our engineering and site teams coordinate closely to keep work accountable.",
      },
      {
        title: "Design coordination",
        description: "We align planning, architecture, construction, and customer needs from the start.",
      },
    ],
  },
  team: [
    { name: "Nazrul Islam", role: "Leadership Team", image: "/bbl/certificate.jpg" },
    { name: "Engineering Team", role: "Project Delivery", image: "/bbl/project-1.jpg" },
    { name: "Sales Team", role: "Customer Care", image: "/bbl/project-2.jpg" },
  ],
  updates: [
    {
      category: "Real estate",
      date: "Project Update",
      title: "Transforming Dhaka spaces with dependable construction",
      author: "Leadership Team",
      role: "Project Team",
      image: "/bbl/gallery-1.jpg",
    },
    {
      category: "Real estate",
      date: "Project Update",
      title: "Quality construction starts with a trusted developer.",
      author: "Nazrul Islam",
      role: "Project Team",
      image: "/bbl/gallery-2.jpg",
    },
    {
      category: "Real estate",
      date: "Project Update",
      title: "From Uttara to Dhanmondi, BBL builds residential and commercial landmarks",
      author: "BBL Management",
      role: "Project Team",
      image: "/bbl/gallery-3.jpg",
    },
  ],
  sections: {
    services: {
      eyebrow: "Services",
      title: "Built around delivery",
      description: "Core capabilities for landowners, buyers, and real estate partners.",
    },
    projects: {
      eyebrow: "Selected Projects",
      title: "Spaces with lasting value",
      buttonText: "View all projects",
    },
    mission: {
      eyebrow: "Mission",
    },
    testimonials: {
      eyebrow: "Testimonials",
      title: "Project owners and partners",
    },
    team: {
      eyebrow: "Team",
      title: "People behind delivery",
    },
    updates: {
      eyebrow: "Updates",
      title: "Latest from BBL",
    },
  },
};

export function mergeHomeContent(content?: Partial<HomeContent>): HomeContent {
  return {
    ...defaultHomeContent,
    ...content,
    hero: { ...defaultHomeContent.hero, ...content?.hero },
    stats: { ...defaultHomeContent.stats, ...content?.stats },
    about: { ...defaultHomeContent.about, ...content?.about },
    mission: { ...defaultHomeContent.mission, ...content?.mission },
    sections: {
      ...defaultHomeContent.sections,
      ...content?.sections,
      services: { ...defaultHomeContent.sections.services, ...content?.sections?.services },
      projects: { ...defaultHomeContent.sections.projects, ...content?.sections?.projects },
      mission: { ...defaultHomeContent.sections.mission, ...content?.sections?.mission },
      testimonials: { ...defaultHomeContent.sections.testimonials, ...content?.sections?.testimonials },
      team: { ...defaultHomeContent.sections.team, ...content?.sections?.team },
      updates: { ...defaultHomeContent.sections.updates, ...content?.sections?.updates },
    },
    choose: {
      ...defaultHomeContent.choose,
      ...content?.choose,
      items: content?.choose?.items?.length ? content.choose.items : defaultHomeContent.choose.items,
    },
    features: content?.features?.length ? content.features : defaultHomeContent.features,
    services: content?.services?.length ? content.services : defaultHomeContent.services,
    projects: content?.projects?.length ? content.projects : defaultHomeContent.projects,
    testimonials: content?.testimonials?.length ? content.testimonials : defaultHomeContent.testimonials,
    team: content?.team?.length ? content.team : defaultHomeContent.team,
    updates: content?.updates?.length ? content.updates : defaultHomeContent.updates,
  };
}

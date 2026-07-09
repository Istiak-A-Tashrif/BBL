export type AboutContent = {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    image: string;
  };
  stats: Array<{
    value: string;
    label: string;
  }>;
  intro: {
    eyebrow: string;
    title: string;
    description: string;
    quote: string;
  };
  features: Array<{
    title: string;
    description: string;
  }>;
  journey: {
    eyebrow: string;
    title: string;
    description: string;
    items: Array<{
      year: string;
      title: string;
      description: string;
    }>;
  };
  values: {
    eyebrow: string;
    title: string;
    description: string;
    images: string[];
  };
};

export const defaultAboutContent: AboutContent = {
  hero: {
    eyebrow: "About BBL",
    title: "A developer shaped by discipline, delivery, and trust",
    description:
      "Biswas Builders Limited works across real estate, construction, land development, and customer care with a practical focus on lasting value.",
    image: "/bbl/block-about.png",
  },
  stats: [
    { value: "1994", label: "Established" },
    { value: "800+", label: "Team and workers" },
    { value: "4+", label: "Highlighted projects" },
  ],
  intro: {
    eyebrow: "Company Profile",
    title: "From apartment construction to multi-sector real estate delivery",
    description:
      "BBL began its journey with apartment construction and gradually expanded into residential buildings, commercial spaces, civil engineering works, and landowner partnerships. The company coordinates planning, construction, sales, documentation, and after-sales support under one accountable delivery process.",
    quote: "A company profile built on delivery, not decoration.",
  },
  features: [
    {
      title: "Development management",
      description:
        "BBL manages project planning, approvals, construction coordination, sales communication, and handover documentation.",
    },
    {
      title: "Landowner partnership",
      description:
        "The company works with landowners through transparent development arrangements focused on utility, value, and long-term trust.",
    },
    {
      title: "Customer care",
      description:
        "Buyer support continues from first inquiry through booking, documentation, construction updates, handover, and after-sales service.",
    },
  ],
  journey: {
    eyebrow: "Our Journey",
    title: "A steady path from apartment construction to landmark delivery",
    description:
      "The company's growth has stayed close to the same core promise: practical planning, reliable construction, and responsive service after handover.",
    items: [
      {
        year: "1994",
        title: "Started with a clear promise",
        description: "BBL began with apartment construction and a practical belief in accountable delivery.",
      },
      {
        year: "2000s",
        title: "Expanded project capability",
        description: "The company grew across residential, commercial, and civil construction work.",
      },
      {
        year: "Today",
        title: "Focused on lasting value",
        description: "BBL now serves buyers, landowners, and partners through planning, execution, and customer care.",
      },
    ],
  },
  values: {
    eyebrow: "Operating Principles",
    title: "The standards behind every BBL project",
    description:
      "The company runs on clear communication, documented decisions, professional coordination, and a long-term view of the spaces it creates.",
    images: ["/bbl/project-1.jpg", "/bbl/gallery-1.jpg", "/bbl/project-3.jpg", "/bbl/value.jpg"],
  },
};

export function mergeAboutContent(content?: Partial<AboutContent>): AboutContent {
  return {
    ...defaultAboutContent,
    ...content,
    hero: { ...defaultAboutContent.hero, ...content?.hero },
    intro: { ...defaultAboutContent.intro, ...content?.intro },
    journey: {
      ...defaultAboutContent.journey,
      ...content?.journey,
      items: content?.journey?.items?.length ? content.journey.items : defaultAboutContent.journey.items,
    },
    values: {
      ...defaultAboutContent.values,
      ...content?.values,
      images: content?.values?.images?.length ? content.values.images : defaultAboutContent.values.images,
    },
    stats: content?.stats?.length ? content.stats : defaultAboutContent.stats,
    features: content?.features?.length ? content.features : defaultAboutContent.features,
  };
}

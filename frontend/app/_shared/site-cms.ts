export type SiteContent = {
  site: {
    name: string;
    logoDark: string;
    phone: string;
    navHomeLabel: string;
    navAboutLabel: string;
    navProjectsLabel: string;
    navContactLabel: string;
  };
  footer: {
    eyebrow: string;
    title: string;
    description: string;
    buttonText: string;
    background: string;
  };
};

export const defaultSiteContent: SiteContent = {
  site: {
    name: "Biswas Builders Limited",
    logoDark: "/bbl/logo-blue.svg",
    phone: "+88 01678 086168",
    navHomeLabel: "Home",
    navAboutLabel: "About",
    navProjectsLabel: "Projects",
    navContactLabel: "Contact",
  },
  footer: {
    eyebrow: "Contact",
    title: "Let's work together",
    description:
      "Biswas Builders Limited is a Bangladeshi real estate and construction company established in 1994.",
    buttonText: "Contact BBL",
    background: "/bbl/sister-banner.jpg",
  },
};

export function mergeSiteContent(content?: Partial<SiteContent>): SiteContent {
  return {
    ...defaultSiteContent,
    ...content,
    site: { ...defaultSiteContent.site, ...content?.site },
    footer: { ...defaultSiteContent.footer, ...content?.footer },
  };
}

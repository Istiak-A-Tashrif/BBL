export type ContactContent = {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    image: string;
  };
  cards: Array<{
    title: string;
    value: string;
    description: string;
  }>;
  form: {
    eyebrow: string;
    title: string;
    description: string;
    submitText: string;
  };
  visit: {
    eyebrow: string;
    title: string;
    address: string;
    mapUrl: string;
  };
};

export const defaultContactContent: ContactContent = {
  hero: {
    eyebrow: "Contact",
    title: "Talk to BBL about projects, partnerships, and property needs",
    description:
      "Reach the Biswas Builders Limited team for buyer support, landowner partnership, project inquiry, or general communication.",
    image: "/bbl/sister-banner.jpg",
  },
  cards: [
    { title: "Phone", value: "+88 01678 086168", description: "Call for sales, project inquiry, or customer care." },
    { title: "Email", value: "info@bblbd.com", description: "Send documents, questions, or partnership details." },
    { title: "Office", value: "New Market, Dhaka", description: "Visit by appointment for project and landowner discussions." },
  ],
  form: {
    eyebrow: "Send Message",
    title: "Tell us what you are looking for",
    description: "This frontend form is ready for UI testing. We can connect it to backend storage or email next.",
    submitText: "Submit Inquiry",
  },
  visit: {
    eyebrow: "Visit",
    title: "Find Biswas Builders Limited",
    address: "New Market City Complex, 44/1 Rahim Square, New Market, Dhaka-1205",
    mapUrl: "https://share.google/mozevMwyHJPMdAXNA",
  },
};

export function mergeContactContent(content?: Partial<ContactContent>): ContactContent {
  return {
    ...defaultContactContent,
    ...content,
    hero: { ...defaultContactContent.hero, ...content?.hero },
    form: { ...defaultContactContent.form, ...content?.form },
    visit: { ...defaultContactContent.visit, ...content?.visit },
    cards: content?.cards?.length ? content.cards : defaultContactContent.cards,
  };
}

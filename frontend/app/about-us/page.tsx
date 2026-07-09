import { getPageContent, getPageMetadata } from "../cms-pages";
import { AboutModern } from "./AboutModern";
import { mergeAboutContent, type AboutContent } from "./about-cms";

export function generateMetadata() {
  return getPageMetadata("about-us", "About Us");
}

export default async function AboutPage() {
  const aboutContent = await getPageContent<AboutContent>("about-us");

  return <AboutModern content={mergeAboutContent(aboutContent)} />;
}

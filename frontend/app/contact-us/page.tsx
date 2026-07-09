import { getPageContent, getPageMetadata } from "../cms-pages";
import { ContactModern } from "./ContactModern";
import { mergeContactContent, type ContactContent } from "./contact-cms";

export function generateMetadata() {
  return getPageMetadata("contact-us", "Contact Us");
}

export default async function ContactPage() {
  const contactContent = await getPageContent<ContactContent>("contact-us");

  return <ContactModern content={mergeContactContent(contactContent)} />;
}

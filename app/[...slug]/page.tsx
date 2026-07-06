import fs from "node:fs/promises";
import path from "node:path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { extractBody } from "../template-html";
import { TemplatePage } from "../template-page";

type RouteConfig = {
  source: string;
  title: string;
};

const routes: Record<string, RouteConfig> = {
  "about-us": {
    source: "about.html",
    title: "About Us",
  },
  projects: {
    source: "project-grid.html",
    title: "Projects",
  },
  "projects/biswas-tower": {
    source: "project-details.html",
    title: "Project Details",
  },
  "contact-us": {
    source: "contact.html",
    title: "Contact Us",
  },
};

type PageProps = {
  params: Promise<{
    slug?: string[];
  }>;
};

function getRouteKey(slug?: string[]) {
  return slug?.join("/") ?? "";
}

async function readTemplateBody(source: string) {
  const templatePath = path.join(process.cwd(), "landover/landor-prev/landor", source);
  const html = await fs.readFile(templatePath, "utf8");
  return extractBody(html);
}

export function generateStaticParams() {
  return Object.keys(routes).map((route) => ({
    slug: route.split("/"),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const routeKey = getRouteKey((await params).slug);
  const route = routes[routeKey];

  if (!route) {
    return {};
  }

  return {
    title: `${route.title} | Biswas Builders Limited`,
  };
}

export default async function ImportedTemplatePage({ params }: PageProps) {
  const routeKey = getRouteKey((await params).slug);
  const route = routes[routeKey];

  if (!route) {
    notFound();
  }

  const html = await readTemplateBody(route.source);

  return <TemplatePage html={html} pageTitle={route.title} />;
}

import fs from "node:fs/promises";
import path from "node:path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ProjectsContent } from "../projects-cms";
import { extractBody } from "../template-html";
import { TemplatePage } from "../template-page";

type RouteConfig = {
  source: string;
  title: string;
};

type CmsPage = {
  title: string;
  content?: ProjectsContent;
  metadata?: {
    description?: string;
  };
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

async function getCmsPage(slug: string): Promise<CmsPage | undefined> {
  const apiBaseUrl = process.env.CMS_API_BASE_URL || "http://localhost:8000/api/v1";

  try {
    const response = await fetch(`${apiBaseUrl}/cms/page?slug=${encodeURIComponent(slug)}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return undefined;
    }

    return response.json();
  } catch {
    return undefined;
  }
}

function resolveUploadedAssets(value: unknown, assetBaseUrl: string): unknown {
  if (typeof value === "string") {
    return value.startsWith("/uploads/") ? `${assetBaseUrl}${value}` : value;
  }

  if (Array.isArray(value)) {
    return value.map((item) => resolveUploadedAssets(item, assetBaseUrl));
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, resolveUploadedAssets(item, assetBaseUrl)]),
    );
  }

  return value;
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

  const cmsPage = await getCmsPage(routeKey);
  const title = cmsPage?.title || route.title;

  return {
    title: `${title} | Biswas Builders Limited`,
    description: cmsPage?.metadata?.description,
  };
}

export default async function ImportedTemplatePage({ params }: PageProps) {
  const routeKey = getRouteKey((await params).slug);
  const route = routes[routeKey];

  if (!route) {
    notFound();
  }

  const [html, cmsPage] = await Promise.all([
    readTemplateBody(route.source),
    getCmsPage(routeKey),
  ]);
  const pageTitle = cmsPage?.content?.pageTitle || cmsPage?.title || route.title;
  const apiBaseUrl = process.env.CMS_API_BASE_URL || "http://localhost:8000/api/v1";
  const assetBaseUrl = process.env.CMS_ASSET_BASE_URL || apiBaseUrl.replace(/\/api\/v1\/?$/, "");
  const pageContent = resolveUploadedAssets(cmsPage?.content, assetBaseUrl) as ProjectsContent | undefined;

  return <TemplatePage html={html} pageTitle={pageTitle} routeKey={routeKey} pageContent={pageContent} />;
}

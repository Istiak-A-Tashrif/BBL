import type { Metadata } from "next";
import { cmsFetchOptions } from "./cms-cache";

type CmsPage = {
  title: string;
  content?: unknown;
  metadata?: {
    description?: string;
  };
};

export function resolveUploadedAssets(value: unknown, assetBaseUrl: string): unknown {
  if (typeof value === "string") return value.startsWith("/uploads/") ? `${assetBaseUrl}${value}` : value;
  if (Array.isArray(value)) return value.map((item) => resolveUploadedAssets(item, assetBaseUrl));
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, resolveUploadedAssets(item, assetBaseUrl)]));
  }
  return value;
}

export async function getCmsPage(slug: string): Promise<CmsPage | undefined> {
  const apiBaseUrl = process.env.CMS_API_BASE_URL || "http://localhost:8000/api/v1";

  try {
    const response = await fetch(`${apiBaseUrl}/cms/page?slug=${encodeURIComponent(slug)}`, cmsFetchOptions(slug));
    if (!response.ok) return undefined;
    return response.json();
  } catch {
    return undefined;
  }
}

export async function getPageContent<T>(slug: string): Promise<Partial<T> | undefined> {
  const apiBaseUrl = process.env.CMS_API_BASE_URL || "http://localhost:8000/api/v1";
  const assetBaseUrl = process.env.CMS_ASSET_BASE_URL || apiBaseUrl.replace(/\/api\/v1\/?$/, "");

  try {
    const response = await fetch(`${apiBaseUrl}/cms/pages/${slug}`, cmsFetchOptions(slug));
    if (!response.ok) return undefined;
    const page = await response.json();
    return resolveUploadedAssets(page.content, assetBaseUrl) as Partial<T>;
  } catch {
    return undefined;
  }
}

export async function getPageMetadata(slug: string, fallbackTitle: string): Promise<Metadata> {
  const cmsPage = await getCmsPage(slug);
  const title = cmsPage?.title || fallbackTitle;

  return {
    title: `${title} | Biswas Builders Limited`,
    description: cmsPage?.metadata?.description,
  };
}

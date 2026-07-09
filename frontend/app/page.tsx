import { HomeModern } from "./(home)/HomeModern";
import { mergeHomeContent, type HomeContent } from "./(home)/home-cms";
import { cmsFetchOptions } from "./cms-cache";

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

async function getHomeContent(): Promise<Partial<HomeContent> | undefined> {
  const apiBaseUrl = process.env.CMS_API_BASE_URL || "http://localhost:8000/api/v1";
  const assetBaseUrl =
    process.env.CMS_ASSET_BASE_URL || apiBaseUrl.replace(/\/api\/v1\/?$/, "");

  try {
    const response = await fetch(`${apiBaseUrl}/cms/pages/home`, cmsFetchOptions("home"));

    if (!response.ok) {
      return undefined;
    }

    const page = await response.json();
    return resolveUploadedAssets(page.content, assetBaseUrl) as Partial<HomeContent>;
  } catch {
    return undefined;
  }
}

export default async function Home() {
  const homeContent = await getHomeContent();

  return <HomeModern content={mergeHomeContent(homeContent)} />;
}

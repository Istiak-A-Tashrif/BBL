import type { Metadata } from "next";
import { SiteChrome } from "./_shared/SiteChrome";
import { mergeSiteContent, type SiteContent } from "./_shared/site-cms";
import { cmsFetchOptions } from "./cms-cache";
import "./globals.css";

export const metadata: Metadata = {
  title: "Biswas Builders Limited",
  description:
    "Biswas Builders Limited is a Bangladeshi real estate and construction company established in 1994.",
  icons: {
    icon: "/fav.png",
    shortcut: "/fav.png",
    apple: "/fav.png",
  },
};

function resolveUploadedAssets(value: unknown, assetBaseUrl: string): unknown {
  if (typeof value === "string") return value.startsWith("/uploads/") ? `${assetBaseUrl}${value}` : value;
  if (Array.isArray(value)) return value.map((item) => resolveUploadedAssets(item, assetBaseUrl));
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, resolveUploadedAssets(item, assetBaseUrl)]));
  }
  return value;
}

async function getSiteContent(): Promise<Partial<SiteContent> | undefined> {
  const apiBaseUrl = process.env.CMS_API_BASE_URL || "http://localhost:8000/api/v1";
  const assetBaseUrl = process.env.CMS_ASSET_BASE_URL || apiBaseUrl.replace(/\/api\/v1\/?$/, "");

  try {
    const response = await fetch(`${apiBaseUrl}/cms/pages/site-settings`, cmsFetchOptions("site-settings"));
    if (!response.ok) return undefined;
    const page = await response.json();
    return resolveUploadedAssets(page.content, assetBaseUrl) as Partial<SiteContent>;
  } catch {
    return undefined;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteContent = await getSiteContent();

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <SiteChrome content={mergeSiteContent(siteContent)}>{children}</SiteChrome>
      </body>
    </html>
  );
}

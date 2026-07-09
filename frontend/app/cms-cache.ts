export const cmsAllTag = "cms:all";

export function cmsPageTag(slug: string) {
  return `cms:page:${slug}`;
}

export function cmsFetchOptions(slug: string) {
  return {
    cache: "force-cache",
    next: {
      revalidate: false,
      tags: [cmsAllTag, cmsPageTag(slug)],
    },
  } satisfies RequestInit;
}

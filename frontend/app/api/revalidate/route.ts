import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { cmsAllTag, cmsPageTag } from "../../cms-cache";

type RevalidateBody = {
  slug?: string;
  slugs?: string[];
  tags?: string[];
  secret?: string;
};

function isAuthorized(request: Request, body: RevalidateBody) {
  const secret = process.env.NEXT_REVALIDATE_SECRET;
  if (!secret) return true;

  return request.headers.get("x-revalidate-secret") === secret || body.secret === secret;
}

function corsHeaders(request: Request) {
  const origin = request.headers.get("origin");
  const allowedOrigins = (
    process.env.NEXT_REVALIDATE_ALLOWED_ORIGINS || "http://localhost:3001,http://localhost:5173"
  )
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  const allowOrigin = origin && allowedOrigins.includes(origin) ? origin : allowedOrigins[0] || "*";

  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, x-revalidate-secret",
    Vary: "Origin",
  };
}

export async function OPTIONS(request: Request) {
  return new Response(null, { status: 204, headers: corsHeaders(request) });
}

export async function POST(request: Request) {
  let body: RevalidateBody = {};
  const headers = corsHeaders(request);

  try {
    body = await request.json();
  } catch {
    body = {};
  }

  if (!isAuthorized(request, body)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401, headers });
  }

  const tags = new Set<string>([cmsAllTag]);
  const slugs = [...(body.slug ? [body.slug] : []), ...(body.slugs || [])];

  slugs.filter(Boolean).forEach((slug) => tags.add(cmsPageTag(slug)));
  (body.tags || []).filter(Boolean).forEach((tag) => tags.add(tag));
  tags.forEach((tag) => revalidateTag(tag, "max"));

  return NextResponse.json({ revalidated: true, tags: Array.from(tags) }, { headers });
}

const frontendOrigin = String(import.meta.env.VITE_FRONTEND_BASE_URL || "http://localhost:3000").replace(/\/+$/, "");
const revalidateSecret = String(import.meta.env.VITE_NEXT_REVALIDATE_SECRET || "");

export async function revalidateCms(slugs?: string | string[]) {
  try {
    const slugList = Array.isArray(slugs) ? slugs : slugs ? [slugs] : [];

    await fetch(`${frontendOrigin}/api/revalidate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(revalidateSecret ? { "x-revalidate-secret": revalidateSecret } : {}),
      },
      body: JSON.stringify({ slugs: slugList }),
    });
  } catch (error) {
    console.warn("Next cache revalidation failed", error);
  }
}

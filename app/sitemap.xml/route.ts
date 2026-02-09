import { getOrigin } from "@/lib/origin";

export const runtime = "nodejs";

function urlset(urls: string[]) {
  const items = urls.map((u) => `<url><loc>${u}</loc></url>`).join("");
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${items}</urlset>`;
}

export function GET(req: Request) {
  const origin = getOrigin(req);
  const urls = [`${origin}/`, `${origin}/pricing`, `${origin}/tools`];
  return new Response(urlset(urls), { headers: { "content-type": "application/xml" } });
}

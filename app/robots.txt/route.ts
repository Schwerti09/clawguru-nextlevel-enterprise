export const runtime = "edge";

export function GET() {
  const body = `User-agent: *
Allow: /
Sitemap: /sitemap.xml
`;
  return new Response(body, { headers: { "content-type": "text/plain" } });
}

export function getOrigin(req: Request): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, "");
  const h = req.headers.get("x-forwarded-host") || req.headers.get("host") || "";
  const proto = req.headers.get("x-forwarded-proto") || "https";
  if (!h) return "http://localhost:3000";
  return `${proto}://${h}`.replace(/\/+$/, "");
}

import crypto from "crypto";

type Payload = { plan: "daypass" | "pro" | "team"; exp: number };

function b64url(buf: Buffer) {
  return buf.toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function b64urlJson(obj: any) {
  return b64url(Buffer.from(JSON.stringify(obj)));
}

function sign(data: string, secret: string) {
  return b64url(crypto.createHmac("sha256", secret).update(data).digest());
}

export function createAccessToken(payload: Payload, secret: string) {
  const body = b64urlJson(payload);
  const sig = sign(body, secret);
  return `${body}.${sig}`;
}

export function verifyAccessToken(token: string, secret: string): Payload | null {
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  const expected = sign(body, secret);
  // timingSafeEqual requires equal-length buffers
  if (sig.length !== expected.length) return null;
  if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
  try {
    const payload = JSON.parse(Buffer.from(body.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf-8"));
    if (!payload?.plan || !payload?.exp) return null;
    if (Date.now() > payload.exp) return null;
    return payload as Payload;
  } catch {
    return null;
  }
}

export function parseCookie(req: Request, name: string): string | null {
  const c = req.headers.get("cookie") || "";
  const parts = c.split(";").map((s) => s.trim());
  for (const p of parts) {
    if (p.startsWith(name + "=")) return decodeURIComponent(p.slice(name.length + 1));
  }
  return null;
}

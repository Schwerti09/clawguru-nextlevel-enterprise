import Stripe from "stripe";
import { createAccessToken } from "@/lib/access";

export const runtime = "nodejs";

function mustEnv(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

export async function POST(req: Request) {
  try {
    const { session_id } = (await req.json()) as { session_id?: string };
    if (!session_id) return Response.json({ error: "Missing session_id" }, { status: 400 });

    const stripe = new Stripe(mustEnv("STRIPE_SECRET_KEY"), { apiVersion: "2024-06-20" });
    const session = await stripe.checkout.sessions.retrieve(session_id);

    const plan = (session.metadata?.plan as any) || "daypass";
    const exp =
      plan === "daypass"
        ? Date.now() + 24 * 60 * 60 * 1000
        : Date.now() + 31 * 24 * 60 * 60 * 1000;

    const token = createAccessToken({ plan, exp }, mustEnv("ACCESS_TOKEN_SECRET"));

    const cookie = [
      `cg_access=${encodeURIComponent(token)}`,
      "Path=/",
      "HttpOnly",
      "SameSite=Lax",
      "Secure",
      `Max-Age=${Math.floor((exp - Date.now()) / 1000)}`,
    ].join("; ");

    return new Response(JSON.stringify({ ok: true, plan }), {
      status: 200,
      headers: {
        "content-type": "application/json",
        "set-cookie": cookie,
      },
    });
  } catch (e: any) {
    return Response.json({ error: e?.message || "Session error" }, { status: 500 });
  }
}

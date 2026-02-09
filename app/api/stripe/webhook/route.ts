import Stripe from "stripe";

export const runtime = "nodejs";

function mustEnv(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

export async function POST(req: Request) {
  try {
    const stripe = new Stripe(mustEnv("STRIPE_SECRET_KEY"), { apiVersion: "2024-06-20" });
    const sig = req.headers.get("stripe-signature");
    if (!sig) return new Response("Missing signature", { status: 400 });

    const rawBody = await req.text();
    stripe.webhooks.constructEvent(rawBody, sig, mustEnv("STRIPE_WEBHOOK_SECRET"));

    // We don't do anything server-side here because browser cookie-setting is handled on success redirect.
    return new Response("ok", { status: 200 });
  } catch (e: any) {
    return new Response(`Webhook Error: ${e?.message || "unknown"}`, { status: 400 });
  }
}

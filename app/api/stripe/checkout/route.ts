import Stripe from "stripe";
import { getOrigin } from "@/lib/origin";

export const runtime = "nodejs";

type Plan = "daypass" | "pro" | "team";

function mustEnv(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

export async function POST(req: Request) {
  try {
    const origin = getOrigin(req);
    const { plan } = (await req.json()) as { plan?: Plan };

    if (!plan || !["daypass", "pro", "team"].includes(plan)) {
      return Response.json({ error: "Invalid plan" }, { status: 400 });
    }

    const stripe = new Stripe(mustEnv("STRIPE_SECRET_KEY"), { apiVersion: "2024-06-20" });

    const priceId =
      plan === "daypass"
        ? mustEnv("STRIPE_PRICE_DAYPASS")
        : plan === "pro"
        ? mustEnv("STRIPE_PRICE_PRO")
        : mustEnv("STRIPE_PRICE_TEAM");

    const mode: Stripe.Checkout.SessionCreateParams.Mode = plan === "daypass" ? "payment" : "subscription";

    const session = await stripe.checkout.sessions.create({
      mode,
      line_items: [{ price: priceId, quantity: 1 }],
      allow_promotion_codes: true,
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancel`,
      metadata: { plan },
    });

    return Response.json({ url: session.url });
  } catch (e: any) {
    return Response.json({ error: e?.message || "Checkout error" }, { status: 500 });
  }
}

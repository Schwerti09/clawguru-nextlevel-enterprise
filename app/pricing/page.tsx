import { CheckoutButtons } from "@/components/pricing/CheckoutButtons";

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-cyber-bg text-cyber-ink">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="text-xs tracking-[0.18em] text-cyber-muted uppercase">Pricing</div>
        <h1 className="mt-2 text-3xl font-semibold">Choose your access</h1>
        <p className="mt-2 text-cyber-muted">
          Daypass is one-time. Pro/Teams are monthly subscriptions. Stripe handles payment and we grant access.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-cyber-border bg-cyber-panel/55 p-6">
            <div className="font-semibold">Day Pass</div>
            <div className="mt-2 font-mono text-2xl text-cyber-green">€7</div>
            <div className="mt-3 text-sm text-cyber-muted">24h access to Pro Kits + tools.</div>
            <div className="mt-6">
              <CheckoutButtons plan="daypass" />
            </div>
          </div>

          <div className="rounded-2xl border border-cyber-border bg-cyber-panel/55 p-6 shadow-glow">
            <div className="font-semibold">Pro</div>
            <div className="mt-2 font-mono text-2xl text-cyber-green">€14.99/mo</div>
            <div className="mt-3 text-sm text-cyber-muted">Unlimited runbook generation + monthly updates.</div>
            <div className="mt-6">
              <CheckoutButtons plan="pro" />
            </div>
          </div>

          <div className="rounded-2xl border border-cyber-border bg-cyber-panel/55 p-6">
            <div className="font-semibold">Teams</div>
            <div className="mt-2 font-mono text-2xl text-cyber-green">€29.99/mo</div>
            <div className="mt-3 text-sm text-cyber-muted">Team rollout playbooks + shared baselines.</div>
            <div className="mt-6">
              <CheckoutButtons plan="team" />
            </div>
          </div>
        </div>

        <div className="mt-10 text-sm text-cyber-muted">
          After payment, you will be redirected back and access will be finalized automatically.
        </div>
      </div>
    </main>
  );
}

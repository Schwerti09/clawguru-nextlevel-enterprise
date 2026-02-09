import { BackgroundGrid } from "@/components/landing/BackgroundGrid";
import { ThreatCounter } from "@/components/landing/ThreatCounter";
import { TrustBar } from "@/components/landing/TrustBar";
import { PricingPatchCard } from "@/components/landing/PricingPatchCard";
import { CertifiedInfrastructureTable } from "@/components/landing/CertifiedInfrastructureTable";
import { FooterDisclaimer } from "@/components/landing/FooterDisclaimer";

export default function Page() {
  return (
    <main className="relative min-h-screen bg-cyber-bg text-cyber-ink">
      <BackgroundGrid />

      <header className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl border border-cyber-border bg-black/40 shadow-glow grid place-items-center">
            <span className="font-mono text-cyber-green">CG</span>
          </div>
          <div>
            <div className="text-sm font-semibold">ClawGuru</div>
            <div className="text-xs text-cyber-muted">OpenClaw Security Hardening</div>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm text-cyber-muted">
          <a className="hover:text-cyber-ink" href="#pro-kits">Pro Kits</a>
          <a className="hover:text-cyber-ink" href="#certified-infra">Certified Infrastructure</a>
          <a className="hover:text-cyber-ink" href="/tools">Runbook Factory</a>
          <a className="hover:text-cyber-ink" href="/pricing">Pricing</a>
        </nav>

        <a
          href="/tools"
          className="rounded-xl border border-cyber-green/30 bg-black/40 px-4 py-2 text-sm font-semibold text-cyber-green hover:bg-black/55"
        >
          Run Live Audit
        </a>
      </header>

      <section className="relative mx-auto max-w-6xl px-6 pb-14 pt-10">
        <div className="grid gap-10 md:grid-cols-2 md:items-start">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyber-border bg-black/35 px-4 py-2 text-xs text-cyber-muted">
              <span className="h-2 w-2 rounded-full bg-cyber-red shadow-danger" />
              <span className="font-mono">CRITICAL</span>
              <span>RCE exposure is usually configuration, not code.</span>
            </div>

            <h1 className="mt-6 text-4xl font-semibold leading-tight md:text-5xl">
              Is Your OpenClaw Instance Exposed?{" "}
              <span className="text-cyber-green">Run a Live Security Audit</span> in 30 Seconds.
            </h1>

            <p className="mt-5 text-lg text-cyber-muted">
              Don&apos;t let RCE vulnerabilities compromise your server. Get institutional-grade protection patterns.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href="/tools"
                className="rounded-xl border border-cyber-green/35 bg-black/45 px-5 py-3 text-center font-semibold text-cyber-green hover:bg-black/60"
              >
                Run Live Audit
              </a>
              <a
                href="#pro-kits"
                className="rounded-xl border border-cyber-border bg-black/25 px-5 py-3 text-center font-semibold text-cyber-ink hover:bg-black/40"
              >
                Download Hardening Kit
              </a>
            </div>

            <div className="mt-8 grid gap-3">
              <div className="rounded-xl border border-cyber-border bg-cyber-panel/55 p-4">
                <div className="text-xs tracking-[0.18em] text-cyber-muted uppercase">What you get</div>
                <div className="mt-2 grid gap-2 text-sm text-cyber-muted">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-cyber-green">SAFE</span>
                    <span>Hardening baseline for agent runtime + network surface</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-cyber-red">CRITICAL</span>
                    <span>Identify misconfig paths that lead to RCE-style exposure</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-cyber-green">SAFE</span>
                    <span>Infrastructure patterns that reduce blast radius</span>
                  </div>
                </div>
              </div>

              <div className="font-mono text-xs text-cyber-muted">
                $ audit: <span className="text-cyber-green">clawguru</span> scan --target{" "}
                <span className="text-cyber-ink">your-node</span> --profile{" "}
                <span className="text-cyber-ink">rce</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <ThreatCounter />

            <div className="rounded-2xl border border-cyber-border bg-cyber-panel/55 p-5">
              <div className="text-xs tracking-[0.18em] text-cyber-muted uppercase">Live Risk Snapshot</div>
              <div className="mt-3 grid gap-3">
                {[
                  { label: "Control plane exposure", state: "CRITICAL", color: "text-cyber-red" },
                  { label: "Agent sandboxing", state: "WARNING", color: "text-cyber-muted" },
                  { label: "Egress restrictions", state: "SAFE", color: "text-cyber-green" },
                ].map((r) => (
                  <div
                    key={r.label}
                    className="flex items-center justify-between rounded-xl border border-cyber-border bg-black/25 px-4 py-3"
                  >
                    <div className="text-sm text-cyber-muted">{r.label}</div>
                    <div className={`font-mono text-sm font-semibold ${r.color}`}>{r.state}</div>
                  </div>
                ))}
              </div>

              <div className="mt-4 text-xs text-cyber-muted">
                Dashboard is a visualization. Run the tool for your real configuration report.
              </div>
            </div>
          </div>
        </div>

        <TrustBar />
      </section>

      <section id="pro-kits" className="relative mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs tracking-[0.18em] text-cyber-muted uppercase">The Fix</div>
            <h2 className="mt-2 text-3xl font-semibold">Pro Kits: “System Hardening Patch”</h2>
            <p className="mt-2 text-cyber-muted max-w-2xl">
              Designed to reduce RCE exposure by closing common misconfig paths and enforcing hardened defaults.
            </p>
          </div>
          <div className="text-xs text-cyber-muted">Instant digital delivery • templates + checklists</div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <PricingPatchCard
            title="Daypass Patch Kit"
            priceLabel="€7"
            status="CRITICAL"
            features={[
              "Block RCE exploit paths (baseline)",
              "Firewall templates (ports + IP allowlists)",
              "One-click config checklist (30 min)",
            ]}
            cta="Download Hardening Kit (€7)"
            href="/pricing?plan=daypass"
          />
          <PricingPatchCard
            title="Pro Kit (Monthly)"
            priceLabel="€14.99/mo"
            status="SAFE"
            highlight
            features={[
              "Advanced hardening patterns (agent runtime)",
              "Secure-by-default profiles for common stacks",
              "Priority updates for new exposure patterns",
            ]}
            cta="Activate Pro Kit (€14.99/mo)"
            href="/pricing?plan=pro"
          />
          <PricingPatchCard
            title="Teams Kit (Monthly)"
            priceLabel="€29.99/mo"
            status="SAFE"
            features={[
              "Team baseline (multi-node hardening)",
              "Shared checklists + rollout playbooks",
              "Ops-ready templates for infra-as-code",
            ]}
            cta="Activate Teams Kit (€29.99/mo)"
            href="/pricing?plan=team"
          />
        </div>
      </section>

      <section id="certified-infra" className="relative mx-auto max-w-6xl px-6 pb-16">
        <CertifiedInfrastructureTable />
      </section>

      <FooterDisclaimer />
    </main>
  );
}

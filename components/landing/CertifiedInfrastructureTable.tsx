export function CertifiedInfrastructureTable() {
  return (
    <div className="rounded-2xl border border-cyber-border bg-cyber-panel/55 p-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-xs tracking-[0.18em] text-cyber-muted uppercase">Certified Infrastructure</div>
          <h3 className="mt-2 text-xl font-semibold text-cyber-ink">
            Recommended specs for maximum security
          </h3>
          <p className="mt-2 text-sm text-cyber-muted">
            Treat infra as a control surface: clean images, locked SSH, predictable networking, and audited providers.
          </p>
        </div>
        <div className="text-xs text-cyber-muted">
          (Affiliate links) — recommendations based on common hardening baselines.
        </div>
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[780px] border-separate border-spacing-0">
          <thead>
            <tr className="text-left text-xs tracking-[0.14em] uppercase text-cyber-muted">
              <th className="border-b border-cyber-border pb-3 pr-4">Category</th>
              <th className="border-b border-cyber-border pb-3 pr-4">Standard VPS</th>
              <th className="border-b border-cyber-border pb-3 pr-4">Hardened VPS</th>
              <th className="border-b border-cyber-border pb-3">Pick</th>
            </tr>
          </thead>
          <tbody className="text-sm text-cyber-ink">
            {[
              { cat: "Image hygiene", std: "mixed images, inconsistent updates", hard: "clean images, predictable updates", href: "https://example.com/your-vps-affiliate" },
              { cat: "Network controls", std: "open ports drift over time", hard: "tight ingress + baseline fail2ban", href: "https://example.com/your-vps-affiliate" },
              { cat: "Remote access", std: "password SSH still common", hard: "key-only + 2FA + short-lived tokens", href: "https://example.com/your-vpn-affiliate" },
              { cat: "Isolation", std: "agents share host surface", hard: "separate runner / locked namespaces", href: "https://example.com/your-vps-affiliate" },
            ].map((row) => (
              <tr key={row.cat} className="align-top">
                <td className="border-b border-cyber-border py-4 pr-4 font-semibold">{row.cat}</td>
                <td className="border-b border-cyber-border py-4 pr-4 text-cyber-muted">{row.std}</td>
                <td className="border-b border-cyber-border py-4 pr-4">
                  <span className="font-mono text-cyber-green">SAFE</span>{" "}
                  <span className="text-cyber-muted">— {row.hard}</span>
                </td>
                <td className="border-b border-cyber-border py-4">
                  <a
                    href={row.href}
                    className="inline-flex items-center justify-center rounded-lg border border-cyber-green/30 bg-black/40 px-3 py-2 font-semibold text-cyber-green hover:bg-black/55"
                    rel="nofollow sponsored"
                  >
                    Recommended
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        <a href="https://example.com/your-vps-affiliate" className="rounded-xl border border-cyber-border bg-black/35 p-4 hover:bg-black/50" rel="nofollow sponsored">
          <div className="text-xs tracking-[0.18em] text-cyber-muted uppercase">VPS</div>
          <div className="mt-1 font-semibold text-cyber-ink">Hardened VPS Baseline</div>
          <div className="mt-1 text-sm text-cyber-muted">Clean images + predictable networking + audit-friendly billing.</div>
        </a>

        <a href="https://example.com/your-vpn-affiliate" className="rounded-xl border border-cyber-border bg-black/35 p-4 hover:bg-black/50" rel="nofollow sponsored">
          <div className="text-xs tracking-[0.18em] text-cyber-muted uppercase">VPN</div>
          <div className="mt-1 font-semibold text-cyber-ink">Control Plane Access</div>
          <div className="mt-1 text-sm text-cyber-muted">Lock admin endpoints behind a private network. Reduce exposure.</div>
        </a>
      </div>
    </div>
  );
}

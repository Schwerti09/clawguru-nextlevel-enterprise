import { cn } from "@/lib/cn";

type Props = {
  title: string;
  priceLabel: string;
  status: "SAFE" | "CRITICAL";
  features: string[];
  cta: string;
  href: string;
  highlight?: boolean;
};

export function PricingPatchCard({
  title,
  priceLabel,
  status,
  features,
  cta,
  href,
  highlight,
}: Props) {
  const isCritical = status === "CRITICAL";

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border bg-cyber-panel/60 p-6",
        "border-cyber-border",
        highlight ? "shadow-glow" : "shadow-[0_0_0_1px_rgba(255,255,255,0.04)]"
      )}
    >
      <div className="absolute inset-0 opacity-[0.10] scanlines" />
      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-xs tracking-[0.18em] text-cyber-muted uppercase">System Hardening Patch</div>
            <h3 className="mt-2 text-xl font-semibold text-cyber-ink">{title}</h3>
          </div>

          <div
            className={cn(
              "rounded-lg border px-3 py-2 text-right",
              isCritical ? "border-red-500/30 shadow-danger" : "border-cyber-green/30 shadow-glow"
            )}
          >
            <div className={cn("font-mono text-xs", isCritical ? "text-cyber-red" : "text-cyber-green")}>
              STATUS: {status}
            </div>
            <div className="mt-1 font-mono text-lg font-bold text-cyber-ink">{priceLabel}</div>
          </div>
        </div>

        <ul className="mt-5 space-y-2 text-sm text-cyber-muted">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-2">
              <span className="mt-[3px] inline-block h-2 w-2 rounded-full bg-cyber-green" />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <a
          href={href}
          className={cn(
            "mt-6 inline-flex w-full items-center justify-center rounded-xl border px-4 py-3 font-semibold",
            "bg-black/40 hover:bg-black/55 transition",
            highlight ? "border-cyber-green/35 text-cyber-green" : "border-cyber-border text-cyber-ink"
          )}
        >
          {cta}
        </a>

        <div className="mt-3 text-xs text-cyber-muted">
          Includes: PDF + templates + checklists. Delivered instantly.
        </div>
      </div>
    </div>
  );
}

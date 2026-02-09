export default function CancelPage() {
  return (
    <main className="min-h-screen bg-cyber-bg text-cyber-ink">
      <div className="mx-auto max-w-2xl px-6 py-16">
        <div className="text-xs tracking-[0.18em] text-cyber-muted uppercase">Checkout cancelled</div>
        <h1 className="mt-2 text-3xl font-semibold">No charge was made</h1>
        <p className="mt-3 text-cyber-muted">You can retry checkout anytime.</p>
        <div className="mt-8 flex gap-3">
          <a
            href="/pricing"
            className="rounded-xl border border-cyber-green/35 bg-black/45 px-5 py-3 font-semibold text-cyber-green hover:bg-black/60"
          >
            Back to Pricing
          </a>
          <a
            href="/"
            className="rounded-xl border border-cyber-border bg-black/25 px-5 py-3 font-semibold hover:bg-black/40"
          >
            Home
          </a>
        </div>
      </div>
    </main>
  );
}

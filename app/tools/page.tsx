"use client";

import { useState } from "react";

export default function ToolsPage() {
  const [input, setInput] = useState(
    "OpenClaw agent on Ubuntu 22.04 behind Nginx reverse proxy, exposed ports 80/443/22."
  );
  const [out, setOut] = useState("");
  const [loading, setLoading] = useState(false);

  async function generate() {
    setLoading(true);
    setOut("");
    try {
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Generation failed");
      setOut(data.text || "");
    } catch (e: any) {
      setOut(`ERROR: ${e?.message || "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-cyber-bg text-cyber-ink">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="text-xs tracking-[0.18em] text-cyber-muted uppercase">Runbook Factory</div>
        <h1 className="mt-2 text-3xl font-semibold">Generate a hardening runbook</h1>
        <p className="mt-2 text-cyber-muted">
          Uses your configured AI provider server-side. Access is gated by your purchase token.
        </p>

        <div className="mt-8 grid gap-4">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[140px] w-full rounded-2xl border border-cyber-border bg-black/40 p-4 text-sm text-cyber-ink outline-none focus:shadow-glow"
          />
          <button
            onClick={generate}
            disabled={loading}
            className="w-fit rounded-xl border border-cyber-green/35 bg-black/45 px-5 py-3 font-semibold text-cyber-green hover:bg-black/60 disabled:opacity-60"
          >
            {loading ? "Generating..." : "Generate Runbook"}
          </button>

          <pre className="whitespace-pre-wrap rounded-2xl border border-cyber-border bg-black/35 p-4 text-sm text-cyber-ink">
{out || "Output will appear here..."}
          </pre>

          <div className="text-xs text-cyber-muted">
            If you see “ACCESS_REQUIRED”, go to{" "}
            <a className="text-cyber-green underline" href="/pricing">
              /pricing
            </a>.
          </div>
        </div>
      </div>
    </main>
  );
}

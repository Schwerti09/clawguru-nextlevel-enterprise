"use client";

import { useEffect, useState } from "react";

export default function SuccessPage() {
  const [state, setState] = useState<"working" | "done" | "error">("working");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const url = new URL(window.location.href);
    const sid = url.searchParams.get("session_id");
    if (!sid) {
      setState("error");
      setMsg("Missing session id.");
      return;
    }

    (async () => {
      try {
        const res = await fetch("/api/stripe/session", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ session_id: sid }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "Failed to set access token");
        setState("done");
      } catch (e: any) {
        setState("error");
        setMsg(e?.message || "Unknown error");
      }
    })();
  }, []);

  return (
    <main className="min-h-screen bg-cyber-bg text-cyber-ink">
      <div className="mx-auto max-w-2xl px-6 py-16">
        <div className="text-xs tracking-[0.18em] text-cyber-muted uppercase">Payment confirmed</div>

        {state === "working" && (
          <>
            <h1 className="mt-2 text-3xl font-semibold">Finalizing access…</h1>
            <p className="mt-3 text-cyber-muted">Setting your access token.</p>
          </>
        )}

        {state === "done" && (
          <>
            <h1 className="mt-2 text-3xl font-semibold text-cyber-green">Access granted</h1>
            <p className="mt-3 text-cyber-muted">
              Your access token is set. You can now use the tools and download kits.
            </p>
          </>
        )}

        {state === "error" && (
          <>
            <h1 className="mt-2 text-3xl font-semibold text-cyber-red">Something went wrong</h1>
            <p className="mt-3 text-cyber-muted">{msg}</p>
            <p className="mt-3 text-cyber-muted">
              Go back to <a className="text-cyber-green underline" href="/pricing">pricing</a> and retry.
            </p>
          </>
        )}

        <div className="mt-8 flex gap-3">
          <a
            href="/tools"
            className="rounded-xl border border-cyber-green/35 bg-black/45 px-5 py-3 font-semibold text-cyber-green hover:bg-black/60"
          >
            Go to Tools
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

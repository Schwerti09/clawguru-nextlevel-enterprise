"use client";

import { useState } from "react";

type Plan = "daypass" | "pro" | "team";

export function CheckoutButtons({ plan }: { plan: Plan }) {
  const [loading, setLoading] = useState(false);
  const label =
    plan === "daypass" ? "Checkout Day Pass" : plan === "pro" ? "Checkout Pro" : "Checkout Teams";

  async function go() {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Checkout failed");
      window.location.href = data.url;
    } catch (e: any) {
      alert(e?.message || "Checkout error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={go}
      disabled={loading}
      className="w-full rounded-xl border border-cyber-green/35 bg-black/45 px-5 py-3 text-center font-semibold text-cyber-green hover:bg-black/60 disabled:opacity-60"
    >
      {loading ? "Redirecting..." : label}
    </button>
  );
}

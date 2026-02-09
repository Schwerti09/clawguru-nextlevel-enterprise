import { parseCookie, verifyAccessToken } from "@/lib/access";

export const runtime = "nodejs";

function mustEnv(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

async function callGemini(prompt: string) {
  const key = mustEnv("GEMINI_API_KEY");
  const model = process.env.GEMINI_MODEL || "gemini-1.5-flash";
  const base = (process.env.GEMINI_BASE_URL || "https://generativelanguage.googleapis.com/v1beta").replace(/\/+$/, "");
  const url = `${base}/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(key)}`;

  const body = {
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: { temperature: 0.4, maxOutputTokens: 1400 },
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = json?.error?.message || `Gemini error (${res.status})`;
    throw new Error(msg);
  }

  const text =
    json?.candidates?.[0]?.content?.parts?.map((p: any) => p?.text).filter(Boolean).join("") || "";
  return text;
}

async function callOpenAI(prompt: string) {
  const key = mustEnv("OPENAI_API_KEY");
  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
  const base = (process.env.OPENAI_BASE_URL || "https://api.openai.com/v1").replace(/\/+$/, "");

  const res = await fetch(`${base}/chat/completions`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.4,
      messages: [
        { role: "system", content: "You are a cybersecurity runbook generator. Be concise, practical, structured." },
        { role: "user", content: prompt },
      ],
    }),
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = json?.error?.message || `OpenAI error (${res.status})`;
    throw new Error(msg);
  }
  return json?.choices?.[0]?.message?.content || "";
}

export async function POST(req: Request) {
  try {
    const token = parseCookie(req, "cg_access");
    if (!token) return Response.json({ error: "ACCESS_REQUIRED" }, { status: 402 });

    const secret = mustEnv("ACCESS_TOKEN_SECRET");
    const payload = verifyAccessToken(token, secret);
    if (!payload) return Response.json({ error: "ACCESS_REQUIRED" }, { status: 402 });

    const { prompt } = (await req.json()) as { prompt?: string };
    if (!prompt || prompt.trim().length < 10) {
      return Response.json({ error: "Provide more details." }, { status: 400 });
    }

    const provider = (process.env.AI_PROVIDER || "gemini").toLowerCase();
    const text = provider === "openai" ? await callOpenAI(prompt) : await callGemini(prompt);

    return Response.json({ text, plan: payload.plan, provider });
  } catch (e: any) {
    return Response.json({ error: e?.message || "AI error" }, { status: 500 });
  }
}

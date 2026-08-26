import { NextRequest, NextResponse } from "next/server";
import { DICTIONARIES } from "@/i18n/dictionary";
import { joinWaitlist } from "@/lib/store";
import { formRateLimit, getClientIp } from "@/lib/rate-limit";
import type { Lang } from "@/lib/types";

function resolveLang(value: unknown): Lang {
  return value === "en" || value === "ru" ? value : "uk";
}

export async function POST(request: NextRequest) {
  if (!formRateLimit(getClientIp(request)).success) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: DICTIONARIES.uk.server.invalidBody }, { status: 400 });
  }

  const lang = resolveLang((body as { lang?: unknown })?.lang);
  const t = DICTIONARIES[lang].server;

  const result = joinWaitlist((body as { email?: unknown })?.email, lang);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  const message = result.alreadyJoined ? t.alreadyJoined : t.joined(result.position);

  return NextResponse.json({ message }, { status: result.alreadyJoined ? 200 : 201 });
}

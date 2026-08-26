import { NextRequest, NextResponse } from "next/server";
import { DICTIONARIES } from "@/i18n/dictionary";
import { toggleNode } from "@/lib/store";
import type { Lang } from "@/lib/types";

function resolveLang(value: unknown): Lang {
  return value === "en" || value === "ru" ? value : "uk";
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: DICTIONARIES.uk.server.invalidBody }, { status: 400 });
  }

  const lang = resolveLang((body as { lang?: unknown })?.lang);
  const t = DICTIONARIES[lang].server;

  const nodeId = (body as { nodeId?: unknown })?.nodeId;
  if (typeof nodeId !== "string") {
    return NextResponse.json({ error: t.nodeIdRequired }, { status: 400 });
  }

  const result = toggleNode(nodeId, lang);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  return NextResponse.json({ node: result.node });
}

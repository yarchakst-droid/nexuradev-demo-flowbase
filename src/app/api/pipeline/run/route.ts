import { NextResponse } from "next/server";
import { runPipeline } from "@/lib/store";

export async function POST() {
  return NextResponse.json({ steps: runPipeline() });
}

import { readFileSync } from "node:fs";
import path from "node:path";

const html = readFileSync(path.join(process.cwd(), "public", "moda.html"), "utf8");

export function GET() {
  return new Response(html, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

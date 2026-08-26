import { pipelineConnections, pipelineNodes } from "@/data/pipeline";
import { DICTIONARIES } from "@/i18n/dictionary";
import type { AutomationNode, Lang, RunStep } from "@/lib/types";

declare global {
  var __flowbaseWaitlist: Set<string> | undefined;
  var __flowbasePipeline: AutomationNode[] | undefined;
}

function waitlist(): Set<string> {
  if (!globalThis.__flowbaseWaitlist) globalThis.__flowbaseWaitlist = new Set();
  return globalThis.__flowbaseWaitlist;
}

function pipeline(): AutomationNode[] {
  if (!globalThis.__flowbasePipeline) {
    globalThis.__flowbasePipeline = pipelineNodes.map((n) => ({ ...n }));
  }
  return globalThis.__flowbasePipeline;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type JoinWaitlistResult =
  | { ok: true; alreadyJoined: boolean; position: number }
  | { ok: false; error: string; status: number };

export function joinWaitlist(email: unknown, lang: Lang = "uk"): JoinWaitlistResult {
  const t = DICTIONARIES[lang].server;
  if (typeof email !== "string" || email.trim().length === 0) {
    return { ok: false, error: t.provideEmail, status: 400 };
  }
  const normalized = email.trim().toLowerCase();
  if (!EMAIL_RE.test(normalized)) {
    return { ok: false, error: t.invalidEmail, status: 400 };
  }

  const list = waitlist();
  const alreadyJoined = list.has(normalized);
  list.add(normalized);

  return { ok: true, alreadyJoined, position: list.size };
}

export function getPipeline(): { nodes: AutomationNode[]; connections: typeof pipelineConnections } {
  return { nodes: pipeline(), connections: pipelineConnections };
}

export type ToggleNodeResult =
  | { ok: true; node: AutomationNode }
  | { ok: false; error: string; status: number };

export function toggleNode(nodeId: string, lang: Lang = "uk"): ToggleNodeResult {
  const t = DICTIONARIES[lang].server;
  const node = pipeline().find((n) => n.id === nodeId);
  if (!node) return { ok: false, error: t.automationNotFound, status: 404 };
  if (node.kind === "trigger") {
    return { ok: false, error: t.triggerAlwaysActive, status: 400 };
  }
  node.enabled = !node.enabled;
  return { ok: true, node };
}

export function runPipeline(): RunStep[] {
  const nodes = pipeline();
  const order = topologicalOrder(nodes);
  return order.map((node) => ({
    nodeId: node.id,
    status: node.enabled ? "success" : "skipped",
    durationMs: node.kind === "trigger" ? 120 : 260 + Math.round(hash(node.id) * 340),
  }));
}

function hash(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) % 977;
  return h / 977;
}

function topologicalOrder(nodes: AutomationNode[]): AutomationNode[] {
  const byId = new Map(nodes.map((n) => [n.id, n]));
  const incoming = new Map(nodes.map((n) => [n.id, 0]));
  for (const c of pipelineConnections) incoming.set(c.to, (incoming.get(c.to) ?? 0) + 1);

  const queue = nodes.filter((n) => (incoming.get(n.id) ?? 0) === 0).map((n) => n.id);
  const visited = new Set<string>();
  const order: AutomationNode[] = [];

  while (queue.length > 0) {
    const id = queue.shift()!;
    if (visited.has(id)) continue;
    visited.add(id);
    const node = byId.get(id);
    if (node) order.push(node);
    for (const c of pipelineConnections) {
      if (c.from === id && !visited.has(c.to)) queue.push(c.to);
    }
  }

  return order;
}

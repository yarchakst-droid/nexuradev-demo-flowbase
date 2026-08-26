"use client";

import { motion } from "framer-motion";
import { BoltIcon, CheckIcon, LayersIcon, SlashCircleIcon } from "@/components/shared/icons";
import { useLang } from "@/i18n/LangContext";
import type { AutomationKind, AutomationNode, RunStep } from "@/lib/types";

const KIND_META: Record<AutomationKind, { icon: typeof BoltIcon; color: string }> = {
  trigger: { icon: BoltIcon, color: "var(--color-node-trigger)" },
  logic: { icon: LayersIcon, color: "var(--color-node-logic)" },
  action: { icon: CheckIcon, color: "var(--color-node-action)" },
};

export default function AutomationCard({
  node,
  runStep,
  isRunning,
  onToggle,
}: {
  node: AutomationNode;
  runStep?: RunStep;
  isRunning: boolean;
  onToggle: (id: string) => void;
}) {
  const { t, lang } = useLang();
  const meta = KIND_META[node.kind];
  const kindLabel =
    node.kind === "trigger" ? t.workspace.kindTrigger : node.kind === "logic" ? t.workspace.kindLogic : t.workspace.kindAction;
  const canToggle = node.kind !== "trigger";

  return (
    <motion.div
      className="absolute w-56 -translate-x-1/2 -translate-y-1/2 rounded-xl border bg-surface p-4 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.6)]"
      style={{
        left: `${node.x}%`,
        top: `${node.y}%`,
        borderColor: isRunning
          ? meta.color
          : runStep
            ? runStep.status === "success"
              ? "var(--color-node-trigger)"
              : "var(--color-border)"
            : "var(--color-border)",
        opacity: node.enabled ? 1 : 0.55,
      }}
      animate={isRunning ? { scale: [1, 1.035, 1] } : { scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-start justify-between gap-2">
        <span
          className="flex size-8 shrink-0 items-center justify-center rounded-lg"
          style={{ color: meta.color, backgroundColor: `color-mix(in srgb, ${meta.color} 16%, transparent)` }}
        >
          <meta.icon className="size-4" />
        </span>

        {runStep && (
          <span
            className="flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium"
            style={{
              color: runStep.status === "success" ? "var(--color-node-trigger)" : "var(--color-text-muted)",
              backgroundColor:
                runStep.status === "success"
                  ? "color-mix(in srgb, var(--color-node-trigger) 16%, transparent)"
                  : "var(--color-ink-elevated)",
            }}
          >
            {runStep.status === "success" ? <CheckIcon className="size-2.5" /> : <SlashCircleIcon className="size-2.5" />}
            {runStep.status === "success" ? `${runStep.durationMs} ${t.workspace.msUnit}` : t.workspace.skipped}
          </span>
        )}
      </div>

      <p className="mt-3 text-xs font-medium uppercase tracking-wide text-text-muted">{kindLabel}</p>
      <p className="mt-0.5 text-sm font-medium text-text">{node.title[lang]}</p>
      <p className="mt-0.5 text-xs text-text-soft">{node.subtitle[lang]}</p>

      <div className="mt-3 flex items-center justify-between border-t border-border-soft pt-3">
        <span className="text-[11px] text-text-muted">{node.enabled ? t.workspace.enabled : t.workspace.disabled}</span>
        <button
          type="button"
          disabled={!canToggle}
          onClick={() => onToggle(node.id)}
          aria-label={node.enabled ? t.workspace.disableAria : t.workspace.enableAria}
          className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${
            canToggle ? "cursor-pointer" : "cursor-not-allowed opacity-40"
          }`}
          style={{ backgroundColor: node.enabled ? "var(--color-brand)" : "var(--color-border)" }}
        >
          <span
            className="absolute top-0.5 size-4 rounded-full bg-ink transition-all"
            style={{ left: node.enabled ? "18px" : "2px" }}
          />
        </button>
      </div>
    </motion.div>
  );
}

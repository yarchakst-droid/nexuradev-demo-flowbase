"use client";

import { BoltIcon, CheckIcon, LayersIcon, PlayIcon } from "@/components/shared/icons";
import { useLang } from "@/i18n/LangContext";
import type { RunStep } from "@/lib/types";

export default function RunBar({
  running,
  summary,
  onRun,
}: {
  running: boolean;
  summary: { steps: RunStep[] } | null;
  onRun: () => void;
}) {
  const { t } = useLang();
  const successCount = summary?.steps.filter((s) => s.status === "success").length ?? 0;
  const skippedCount = summary?.steps.filter((s) => s.status === "skipped").length ?? 0;

  const KIND_LEGEND = [
    { icon: BoltIcon, color: "var(--color-node-trigger)", label: t.workspace.kindTrigger },
    { icon: LayersIcon, color: "var(--color-node-logic)", label: t.workspace.kindLogic },
    { icon: CheckIcon, color: "var(--color-node-action)", label: t.workspace.kindAction },
  ];

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border-soft px-6 py-4">
      <div>
        <h1 className="text-lg font-semibold text-text">{t.workspace.pipelineTitle}</h1>
        <p className="text-sm text-text-soft">{t.workspace.pipelineSubtitle}</p>
      </div>

      <div className="flex items-center gap-5">
        <div className="hidden items-center gap-4 sm:flex">
          {KIND_LEGEND.map((k) => (
            <span key={k.label} className="flex items-center gap-1.5 text-xs text-text-muted">
              <span className="size-2 rounded-full" style={{ backgroundColor: k.color }} />
              {k.label}
            </span>
          ))}
        </div>

        {summary && (
          <span className="text-xs text-text-muted">
            {successCount} {t.workspace.done}
            {skippedCount > 0 ? t.workspace.skippedSummary(skippedCount) : ""}
          </span>
        )}

        <button
          type="button"
          onClick={onRun}
          disabled={running}
          className="flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-medium text-brand-ink transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70"
        >
          <PlayIcon className="size-3.5" />
          {running ? t.workspace.runningButton : t.workspace.runButton}
        </button>
      </div>
    </div>
  );
}

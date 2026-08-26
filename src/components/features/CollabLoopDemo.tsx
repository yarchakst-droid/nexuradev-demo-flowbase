"use client";

import { motion } from "framer-motion";
import { LayersIcon } from "@/components/shared/icons";

const CURSORS = [
  { name: "Ганна", color: "var(--color-node-trigger)", x: [18, 46, 46, 18, 18], y: [70, 70, 30, 30, 70], delay: 0 },
  { name: "Марк", color: "var(--color-node-action)", x: [78, 60, 60, 78, 78], y: [24, 24, 62, 62, 24], delay: 0.6 },
];

export default function CollabLoopDemo() {
  return (
    <div className="relative h-44 w-full overflow-hidden rounded-lg bg-ink-elevated">
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-3 opacity-70">
        <span className="flex size-9 items-center justify-center rounded-lg border border-border-soft bg-surface text-text-muted">
          <LayersIcon className="size-4" />
        </span>
        <div className="h-px w-10 bg-border" />
        <span className="flex size-9 items-center justify-center rounded-lg border border-border-soft bg-surface text-text-muted">
          <LayersIcon className="size-4" />
        </span>
      </div>

      {CURSORS.map((c) => (
        <motion.div
          key={c.name}
          className="absolute flex items-center gap-1.5"
          animate={{ left: c.x.map((v) => `${v}%`), top: c.y.map((v) => `${v}%`) }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: c.delay }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill={c.color}>
            <path d="M2 1.5 13.5 8 8 9l-1 5-5-12.5Z" />
          </svg>
          <span
            className="rounded-full px-2 py-0.5 text-[10px] font-medium text-ink"
            style={{ backgroundColor: c.color }}
          >
            {c.name}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

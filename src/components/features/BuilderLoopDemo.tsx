"use client";

import { motion } from "framer-motion";
import { BoltIcon, CheckIcon, LayersIcon } from "@/components/shared/icons";

const NODES = [
  { x: 14, y: 66, icon: BoltIcon, color: "var(--color-node-trigger)", label: "Trigger" },
  { x: 50, y: 26, icon: LayersIcon, color: "var(--color-node-logic)", label: "Логіка" },
  { x: 86, y: 66, icon: CheckIcon, color: "var(--color-node-action)", label: "Дія" },
];

const PATH = "M 14 66 Q 32 20 50 26 Q 68 32 86 66";

export default function BuilderLoopDemo() {
  return (
    <div className="relative h-44 w-full overflow-hidden rounded-lg bg-ink-elevated">
      <svg viewBox="0 0 100 90" className="absolute inset-0 size-full" preserveAspectRatio="none">
        <path d={PATH} fill="none" stroke="var(--color-border)" strokeWidth="0.6" />
        <motion.path
          d={PATH}
          fill="none"
          stroke="var(--color-brand)"
          strokeWidth="0.8"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1, 1, 1], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, repeatDelay: 0.5, times: [0, 0.55, 0.85, 1], ease: "easeInOut" }}
        />
        <motion.circle
          r="1.6"
          fill="var(--color-brand)"
          initial={{ opacity: 0, cx: 14, cy: 66 }}
          animate={{
            opacity: [0, 1, 1, 1, 1, 1, 1, 0],
            cx: [14, 20, 30, 42, 58, 70, 80, 86],
            cy: [66, 48, 30, 24, 24, 30, 48, 66],
          }}
          transition={{ duration: 3.2, repeat: Infinity, repeatDelay: 0.5, times: [0, 0.1, 0.24, 0.38, 0.52, 0.66, 0.8, 0.9], ease: "easeInOut" }}
        />
      </svg>

      {NODES.map((node, i) => (
        <motion.div
          key={node.label}
          className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1"
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
          initial={{ scale: 0.85, opacity: 0.7 }}
          animate={{ scale: [0.85, 1, 1, 0.85], opacity: [0.7, 1, 1, 0.7] }}
          transition={{ duration: 3.2, repeat: Infinity, repeatDelay: 0.5, delay: i * 0.15, ease: "easeInOut" }}
        >
          <span
            className="flex size-8 items-center justify-center rounded-lg border"
            style={{ borderColor: `color-mix(in srgb, ${node.color} 45%, transparent)`, backgroundColor: `color-mix(in srgb, ${node.color} 14%, transparent)`, color: node.color }}
          >
            <node.icon className="size-4" />
          </span>
        </motion.div>
      ))}
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { BoltIcon, CheckIcon, MailIcon } from "@/components/shared/icons";
import { useLang } from "@/i18n/LangContext";

const T = { duration: 2.6, repeat: Infinity, repeatDelay: 0.5, ease: "easeInOut" } as const;

export default function TriggerLoopDemo() {
  const { t } = useLang();

  return (
    <div className="relative flex h-44 w-full items-center justify-between overflow-hidden rounded-lg bg-ink-elevated px-6">
      <motion.div
        className="flex flex-col items-center gap-2"
        animate={{ scale: [1, 1.08, 1, 1], opacity: [0.75, 1, 1, 0.75] }}
        transition={{ ...T, times: [0, 0.12, 0.4, 1] }}
      >
        <span className="flex size-11 items-center justify-center rounded-full border border-border bg-surface text-text-soft">
          <MailIcon className="size-5" />
        </span>
        <span className="text-[10px] text-text-muted">{t.triggerDemo.webhook}</span>
      </motion.div>

      <div className="relative flex flex-1 items-center justify-center">
        <div className="h-px w-full bg-border" />
        <motion.span
          className="absolute flex size-7 items-center justify-center rounded-full bg-brand text-brand-ink"
          animate={{ left: ["0%", "0%", "100%", "100%"], opacity: [0, 1, 1, 0] }}
          transition={{ ...T, times: [0, 0.15, 0.55, 0.62] }}
          style={{ translateX: "-50%" }}
        >
          <BoltIcon className="size-3.5" />
        </motion.span>
      </div>

      <motion.div
        className="flex flex-col items-center gap-2"
        animate={{ scale: [1, 1, 1.1, 1], opacity: [0.5, 0.5, 1, 1] }}
        transition={{ ...T, times: [0, 0.55, 0.68, 1] }}
      >
        <motion.span
          className="flex size-11 items-center justify-center rounded-full border"
          animate={{
            borderColor: ["var(--color-border)", "var(--color-border)", "var(--color-node-trigger)", "var(--color-node-trigger)"],
            backgroundColor: ["#17171b", "#17171b", "#242c17", "#242c17"],
            color: ["var(--color-text-soft)", "var(--color-text-soft)", "var(--color-node-trigger)", "var(--color-node-trigger)"],
          }}
          transition={{ ...T, times: [0, 0.55, 0.68, 1] }}
        >
          <CheckIcon className="size-5" />
        </motion.span>
        <span className="text-[10px] text-text-muted">{t.triggerDemo.slackNotified}</span>
      </motion.div>
    </div>
  );
}

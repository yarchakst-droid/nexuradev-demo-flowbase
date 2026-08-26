"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckIcon } from "@/components/shared/icons";
import { useLang } from "@/i18n/LangContext";

export default function WaitlistForm() {
  const { t, lang } = useLang();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage(null);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, lang }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? t.waitlist.genericJoinError);
      setStatus("success");
      setMessage(data.message ?? t.waitlist.defaultSuccess);
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : t.waitlist.genericError);
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2.5 rounded-full border border-brand/30 bg-brand/10 px-5 py-3 text-sm text-brand"
      >
        <CheckIcon className="size-4" />
        {message}
      </motion.div>
    );
  }

  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-2 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t.waitlist.emailPlaceholder}
          className="w-full rounded-full border border-border bg-surface px-4 py-3 text-sm text-text placeholder:text-text-muted focus:border-brand/50 focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="flex shrink-0 items-center justify-center gap-1.5 rounded-full bg-brand px-5 py-3 text-sm font-medium text-brand-ink transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70"
        >
          {status === "loading" ? t.waitlist.joining : t.waitlist.join}
        </button>
      </form>
      {status === "error" && message && <p className="px-1 text-xs text-node-action">{message}</p>}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useLang } from "@/i18n/LangContext";

export default function SignInModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useLang();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      onClose();
      setEmail("");
      setPassword("");
      router.push("/workspace");
    }, 500);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.18 }}
            className="w-full max-w-sm rounded-2xl border border-border bg-surface p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h2 className="font-display text-lg font-medium text-text">{t.signIn.title}</h2>
                <p className="mt-1 text-xs leading-relaxed text-text-soft">{t.signIn.subtitle}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label={t.signIn.closeAria}
                className="shrink-0 rounded-md p-1 text-text-muted transition-colors hover:bg-ink-elevated hover:text-text"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-text-soft">{t.signIn.emailLabel}</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-lg border border-border bg-ink-elevated px-3 py-2.5 text-sm text-text focus:border-brand/50 focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-text-soft">{t.signIn.passwordLabel}</label>
                <input
                  type="password"
                  required
                  minLength={1}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-lg border border-border bg-ink-elevated px-3 py-2.5 text-sm text-text focus:border-brand/50 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="mt-2 rounded-full bg-brand px-4 py-2.5 text-sm font-medium text-brand-ink transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70"
              >
                {submitting ? t.signIn.submittingButton : t.signIn.submitButton}
              </button>
              <p className="text-center text-[11px] text-text-muted">{t.signIn.demoNote}</p>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

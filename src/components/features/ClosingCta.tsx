"use client";

import Link from "next/link";
import { useLang } from "@/i18n/LangContext";

export default function ClosingCta() {
  const { t } = useLang();

  return (
    <section className="mx-auto max-w-7xl px-6 pb-24">
      <div className="flex flex-col items-center gap-5 rounded-3xl border border-border bg-surface px-8 py-16 text-center">
        <h2 className="text-balance font-display text-3xl font-medium text-text sm:text-4xl">
          {t.closingCta.heading}
        </h2>
        <p className="max-w-md text-text-soft">{t.closingCta.subhead}</p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/#waitlist"
            className="rounded-full bg-brand px-6 py-3 text-sm font-medium text-brand-ink transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {t.closingCta.startFree}
          </Link>
          <Link
            href="/workspace"
            className="flex items-center gap-1.5 rounded-full border border-border px-6 py-3 text-sm text-text transition-colors hover:border-text-soft"
          >
            {t.closingCta.viewWorkspace}
          </Link>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import PricingCard from "@/components/pricing/PricingCard";
import { pricingTiers } from "@/data/pricing";
import { useLang } from "@/i18n/LangContext";

export default function PricingSection() {
  const { t } = useLang();
  const [yearly, setYearly] = useState(true);

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand">{t.pricing.eyebrow}</p>
        <h1 className="mt-3 text-balance font-display text-3xl font-medium text-text sm:text-4xl">
          {t.pricing.heading}
        </h1>
        <p className="mt-3 text-text-soft">{t.pricing.subhead}</p>
      </div>

      <div className="mx-auto mt-8 flex w-fit items-center gap-1 rounded-full border border-border bg-surface p-1">
        <button
          type="button"
          onClick={() => setYearly(false)}
          className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
            !yearly ? "bg-ink-elevated text-text" : "text-text-muted"
          }`}
        >
          {t.pricing.monthly}
        </button>
        <button
          type="button"
          onClick={() => setYearly(true)}
          className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm transition-colors ${
            yearly ? "bg-ink-elevated text-text" : "text-text-muted"
          }`}
        >
          {t.pricing.yearly}
          <span className="rounded-full bg-brand/15 px-1.5 py-0.5 text-[10px] font-medium text-brand">-20%</span>
        </button>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
        {pricingTiers.map((tier) => (
          <PricingCard key={tier.id} tier={tier} yearly={yearly} />
        ))}
      </div>
    </div>
  );
}

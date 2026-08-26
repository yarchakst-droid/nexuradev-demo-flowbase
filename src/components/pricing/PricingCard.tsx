"use client";

import Link from "next/link";
import { CheckIcon } from "@/components/shared/icons";
import { useLang } from "@/i18n/LangContext";
import type { PricingTier } from "@/data/pricing";

export default function PricingCard({ tier, yearly }: { tier: PricingTier; yearly: boolean }) {
  const { t, lang } = useLang();
  const price = yearly ? tier.yearlyPrice : tier.monthlyPrice;

  return (
    <div
      className={`flex flex-col rounded-2xl border p-6 ${
        tier.highlighted ? "border-brand/50 bg-surface shadow-[0_0_0_1px_rgba(200,243,77,0.15)]" : "border-border bg-surface"
      }`}
    >
      {tier.highlighted && (
        <span className="mb-3 w-fit rounded-full bg-brand px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-brand-ink">
          {t.pricing.popularBadge}
        </span>
      )}

      <h3 className="font-display text-xl text-text">{tier.name}</h3>
      <p className="mt-1.5 text-sm text-text-soft">{tier.tagline[lang]}</p>

      <div className="mt-5 flex items-baseline gap-1.5">
        {price === null ? (
          <span className="font-display text-3xl text-text">{t.pricing.custom}</span>
        ) : price === 0 ? (
          <span className="font-display text-3xl text-text">{t.pricing.free}</span>
        ) : (
          <>
            <span className="font-display text-3xl text-text">${price}</span>
            <span className="text-sm text-text-muted">{yearly ? t.pricing.perMonthYearly : t.pricing.perMonthMonthly}</span>
          </>
        )}
      </div>

      <Link
        href="/#waitlist"
        className={`mt-6 rounded-full px-5 py-2.5 text-center text-sm font-medium transition-transform hover:scale-[1.02] active:scale-[0.98] ${
          tier.highlighted ? "bg-brand text-brand-ink" : "border border-border text-text hover:border-text-soft"
        }`}
      >
        {tier.cta[lang]}
      </Link>

      <ul className="mt-7 flex flex-col gap-3 border-t border-border-soft pt-6">
        {tier.features.map((f) => (
          <li key={f.uk} className="flex items-start gap-2.5 text-sm text-text-soft">
            <CheckIcon className="mt-0.5 size-3.5 shrink-0 text-brand" />
            {f[lang]}
          </li>
        ))}
      </ul>
    </div>
  );
}

"use client";

import BuilderLoopDemo from "@/components/features/BuilderLoopDemo";
import CollabLoopDemo from "@/components/features/CollabLoopDemo";
import FeatureCard from "@/components/features/FeatureCard";
import TriggerLoopDemo from "@/components/features/TriggerLoopDemo";
import { useLang } from "@/i18n/LangContext";

export default function FeaturesSection() {
  const { t } = useLang();

  return (
    <section id="features" className="mx-auto max-w-7xl scroll-mt-16 px-6 py-24">
      <div className="max-w-xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand">{t.features.eyebrow}</p>
        <h2 className="mt-3 text-balance font-display text-3xl font-medium text-text sm:text-4xl">
          {t.features.heading}
        </h2>
        <p className="mt-3 text-text-soft">{t.features.subhead}</p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3">
        <FeatureCard
          eyebrow={t.features.builder.eyebrow}
          title={t.features.builder.title}
          description={t.features.builder.description}
          demo={<BuilderLoopDemo />}
        />
        <FeatureCard
          eyebrow={t.features.triggers.eyebrow}
          title={t.features.triggers.title}
          description={t.features.triggers.description}
          demo={<TriggerLoopDemo />}
        />
        <FeatureCard
          eyebrow={t.features.team.eyebrow}
          title={t.features.team.title}
          description={t.features.team.description}
          demo={<CollabLoopDemo />}
        />
      </div>
    </section>
  );
}

import type { ReactNode } from "react";

export default function FeatureCard({
  eyebrow,
  title,
  description,
  demo,
}: {
  eyebrow: string;
  title: string;
  description: string;
  demo: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-border bg-surface p-5">
      {demo}
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-brand">{eyebrow}</p>
        <h3 className="mt-1.5 font-display text-lg text-text">{title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-text-soft">{description}</p>
      </div>
    </div>
  );
}

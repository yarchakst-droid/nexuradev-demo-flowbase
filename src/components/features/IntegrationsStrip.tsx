"use client";

import { useLang } from "@/i18n/LangContext";

const INTEGRATIONS = [
  "Slack",
  "Gmail",
  "HubSpot",
  "Notion",
  "Stripe",
  "PostgreSQL",
  "Google Sheets",
  "Zendesk",
  "Airtable",
  "Salesforce",
];

export default function IntegrationsStrip() {
  const { t } = useLang();
  const doubled = [...INTEGRATIONS, ...INTEGRATIONS];

  return (
    <div className="border-y border-border-soft py-8">
      <p className="mx-auto mb-5 max-w-7xl px-6 text-center text-xs uppercase tracking-wide text-text-muted">
        {t.integrations.strip}
      </p>
      <div className="scrollbar-hidden overflow-hidden">
        <div className="marquee-track flex w-max gap-10">
          {doubled.map((name, i) => (
            <span key={`${name}-${i}`} className="font-mono text-sm text-text-muted">
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

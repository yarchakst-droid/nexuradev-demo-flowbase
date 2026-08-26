"use client";

import Link from "next/link";
import { LogoMark } from "@/components/shared/icons";
import { useLang } from "@/i18n/LangContext";

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="border-t border-border-soft">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 font-display text-text-soft">
          <LogoMark className="size-4 text-brand" />
          Flowbase
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-text-muted">
          <Link href="/#features" className="hover:text-text-soft">
            {t.nav.features}
          </Link>
          <Link href="/workspace" className="hover:text-text-soft">
            {t.nav.workspace}
          </Link>
          <Link href="/pricing" className="hover:text-text-soft">
            {t.nav.pricing}
          </Link>
        </nav>
        <p className="text-xs text-text-muted">{t.footer.tagline}</p>
      </div>
    </footer>
  );
}

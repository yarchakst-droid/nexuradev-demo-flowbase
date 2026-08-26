"use client";

import { useState } from "react";
import Link from "next/link";
import { LogoMark } from "@/components/shared/icons";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import SignInModal from "@/components/layout/SignInModal";
import { useLang } from "@/i18n/LangContext";

export default function Nav() {
  const { t } = useLang();
  const [signInOpen, setSignInOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border-soft bg-ink/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2 font-display text-lg font-medium text-text">
            <LogoMark className="size-5 text-brand" />
            Flowbase
          </Link>

          <nav className="hidden items-center gap-8 text-sm text-text-soft sm:flex">
            <Link href="/#features" className="transition-colors hover:text-text">
              {t.nav.features}
            </Link>
            <Link href="/workspace" className="transition-colors hover:text-text">
              {t.nav.workspace}
            </Link>
            <Link href="/pricing" className="transition-colors hover:text-text">
              {t.nav.pricing}
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <button
              type="button"
              onClick={() => setSignInOpen(true)}
              className="hidden text-sm text-text-soft transition-colors hover:text-text sm:inline"
            >
              {t.nav.login}
            </button>
            <Link
              href="/#waitlist"
              className="rounded-full bg-brand px-4 py-2 text-sm font-medium text-brand-ink transition-transform hover:scale-[1.03] active:scale-[0.98]"
            >
              {t.nav.startFree}
            </Link>
          </div>
        </div>
      </header>
      <SignInModal open={signInOpen} onClose={() => setSignInOpen(false)} />
    </>
  );
}

"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import WaitlistForm from "@/components/hero/WaitlistForm";
import { useLang } from "@/i18n/LangContext";

const GraphScene = dynamic(() => import("@/components/hero/GraphScene"), {
  ssr: false,
  loading: () => <div className="size-full" />,
});

export default function Hero() {
  const { t } = useLang();

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <GraphScene />
      </div>

      {/* readability scrim: dims the graph behind the text block while keeping it
          vivid at the edges, plus a soft top/bottom fade into the page */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 60% at 50% 46%, rgba(10,10,12,0.94), rgba(10,10,12,0.72) 55%, transparent 85%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink via-transparent to-ink" />

      {/*
        pointer-events-none here is load-bearing: this wrapper spans the full
        section (min-h-[86vh], max-w-7xl) so the graph's hover-to-highlight
        interaction still works over the empty space around the text — only
        the actual interactive bits (waitlist form, links) opt back in below.
      */}
      <div className="relative mx-auto flex min-h-[86vh] max-w-7xl flex-col items-center justify-center px-6 py-24 text-center pointer-events-none">
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-balance font-display text-4xl font-medium leading-[1.08] text-text sm:text-6xl"
        >
          {t.hero.headlineLine1}
          <br className="hidden sm:block" /> {t.hero.headlineLine2}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="mt-5 max-w-xl text-balance text-lg text-text-soft"
        >
          {t.hero.subhead}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          id="waitlist"
          className="pointer-events-auto mt-9 flex scroll-mt-28 flex-col items-center gap-4"
        >
          <WaitlistForm />
          <Link
            href="/workspace"
            className="flex items-center gap-1.5 text-sm text-text-soft transition-colors hover:text-text"
          >
            {t.hero.viewWorkspace}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

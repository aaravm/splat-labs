"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarDays,
  Check,
  Clapperboard,
  Music,
  Trophy,
} from "lucide-react";
import { useState } from "react";
import SectionHeading from "./SectionHeading";

const USE_CASES = [
  {
    id: "concerts",
    Icon: Music,
    name: "Live Concerts",
    headline: "Put fans inside the venue — from anywhere in the world.",
    points: [
      "360° freedom of movement through the crowd and stage",
      "Front-row view of every performance, available to every ticket",
      "Virtual ticketing tiers: pit, stage-side, and behind-the-scenes angle",
    ],
    stat: "2.3x",
    statLabel: "avg. engagement vs. traditional live stream",
    accent: "from-fuchsia-500 to-violet-500",
  },
  {
    id: "sports",
    Icon: Trophy,
    name: "Sports Broadcasting",
    headline: "Replay every moment from any angle, in volumetric 3D.",
    points: [
      "Court-side replays with full free-camera control",
      "Instant volumetric highlights streamed to phones and TV",
      "Coaching-grade spatial analysis for teams and broadcasters",
    ],
    stat: "<150ms",
    statLabel: "instant replay latency across all angles",
    accent: "from-emerald-500 to-cyan-500",
  },
  {
    id: "corporate",
    Icon: CalendarDays,
    name: "Corporate Events",
    headline: "Immersive keynotes and launches for global audiences.",
    points: [
      "Product demos viewers can walk around in real time",
      "Global hybrid events that feel physically present",
      "Reusable volumetric captures for marketing and training",
    ],
    stat: "75%",
    statLabel: "drop in drop-off for immersive sessions",
    accent: "from-blue-500 to-indigo-500",
  },
  {
    id: "vfx",
    Icon: Clapperboard,
    name: "Creative & VFX",
    headline: "Real-time volumetric capture for film, games, and XR.",
    points: [
      "Stage talent directly into game engines and virtual sets",
      "Previs and virtual production without green screen constraints",
      "Open format that plugs into any DCC or game pipeline",
    ],
    stat: "4D",
    statLabel: "full time dimension in every capture",
    accent: "from-amber-500 to-rose-500",
  },
] as const;

export default function UseCases() {
  const [active, setActive] = useState(0);
  const current = USE_CASES[active];
  const ActiveIcon = current.Icon;

  return (
    <section id="use-cases" className="relative scroll-mt-24 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Use cases"
          title={
            <>
              Built for the moments{" "}
              <span className="text-gradient">worth being there</span>
            </>
          }
          description="From packed arenas to global boardrooms — SplatLabs turns live events into shareable, walkable reality."
        />

        {/* Tabs */}
        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {USE_CASES.map(({ id, Icon, name }, i) => (
            <button
              key={id}
              type="button"
              onClick={() => setActive(i)}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                i === active
                  ? "bg-gradient-to-r from-accent to-accent-violet text-black shadow-[0_0_28px_rgba(34,211,238,0.35)]"
                  : "border border-white/10 bg-white/[0.03] text-muted hover:border-white/20 hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              {name}
            </button>
          ))}
        </div>

        {/* Panel */}
        <div className="mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="overflow-hidden rounded-3xl border border-white/[0.08] bg-surface/60"
            >
              <div className="grid lg:grid-cols-5">
                {/* Visual side */}
                <div
                  className={`relative flex flex-col justify-between bg-gradient-to-br ${current.accent} p-10 lg:col-span-2`}
                >
                  <div className="flex items-center justify-between">
                    <ActiveIcon className="h-14 w-14 text-black/40" strokeWidth={1.25} />
                    <span className="rounded-full bg-black/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-black/70 backdrop-blur-sm">
                      Live demo coming soon
                    </span>
                  </div>
                  <div className="mt-24">
                    <div className="text-5xl font-black text-white drop-shadow-lg md:text-7xl">
                      {current.stat}
                    </div>
                    <div className="mt-2 max-w-xs text-sm font-medium text-white/90">
                      {current.statLabel}
                    </div>
                  </div>
                </div>

                {/* Content side */}
                <div className="p-10 lg:col-span-3">
                  <h3 className="text-2xl font-bold leading-snug text-foreground md:text-3xl">
                    {current.headline}
                  </h3>
                  <ul className="mt-6 space-y-4">
                    {current.points.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <span className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-violet">
                          <Check className="h-3 w-3 text-black" />
                        </span>
                        <span className="text-sm leading-relaxed text-muted md:text-base">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#waitlist"
                    className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-foreground"
                  >
                    Stream this use case →
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
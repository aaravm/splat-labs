"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, Zap } from "lucide-react";
import SplatCanvas from "./SplatCanvas";

const STATS = [
  { value: "60fps", label: "Streaming" },
  { value: "<50ms", label: "Latency" },
  { value: "10M+", label: "Splats / frame" },
];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col overflow-hidden"
    >
      <SplatCanvas className="absolute inset-0 h-full w-full" density={1500} />

      {/* Gradient overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-accent/[0.07] blur-[120px]" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-6 pt-32 pb-20 text-center lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-muted backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          Now accepting founding partners
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
        >
          Live Events in{" "}
          <span className="text-gradient-shimmer">4D Gaussian Splatting</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl"
        >
          Stream immersive, photorealistic volumetric experiences of live
          events — concerts, sports, and conferences — in real time. No
          headset. No downloads. Just the browser.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <a
            href="#waitlist"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-violet px-7 py-3.5 text-base font-semibold text-black transition-all hover:shadow-[0_0_40px_rgba(34,211,238,0.45)]"
          >
            Get Early Access
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#how-it-works"
            className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-7 py-3.5 text-base font-semibold text-foreground backdrop-blur-md transition-colors hover:border-accent/40 hover:bg-white/[0.06]"
          >
            <Play className="h-4 w-4 text-accent" />
            Watch Demo
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="mt-5 flex items-center gap-1.5 text-sm text-muted/80"
        >
          <Zap className="h-3.5 w-3.5 text-accent" />
          No plugins · No downloads · Works in any browser
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-16 grid w-full max-w-2xl grid-cols-3 gap-4"
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.03] px-4 py-5 backdrop-blur-md"
            >
              <div className="text-2xl font-bold text-gradient md:text-3xl">
                {stat.value}
              </div>
              <div className="mt-1 text-xs uppercase tracking-wider text-muted md:text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex h-9 w-6 items-start justify-center rounded-full border border-white/20 p-1.5">
          <motion.span
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-2 w-1 rounded-full bg-accent"
          />
        </div>
      </motion.div>
    </section>
  );
}
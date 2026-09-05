import {
  Activity,
  CircuitBoard,
  Globe,
  Layers,
  Radio,
  Timer,
} from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const FEATURES = [
  {
    Icon: Timer,
    title: "Real-Time Capture",
    text: "Stream and encode volumetric video live at 60fps with sub-50ms end-to-end latency.",
    accent: "from-cyan-500/20 to-cyan-500/5 text-cyan-400",
  },
  {
    Icon: Layers,
    title: "4D Gaussian Splatting",
    text: "Our proprietary pipeline renders millions of splats in real time using WebGPU.",
    accent: "from-violet-500/20 to-violet-500/5 text-violet-400",
  },
  {
    Icon: Globe,
    title: "Browser-Native",
    text: "Zero plugins, zero installs. Works on any modern browser across desktop and mobile.",
    accent: "from-blue-500/20 to-blue-500/5 text-blue-400",
  },
  {
    Icon: Activity,
    title: "Scalable Streaming",
    text: "Adaptive bitrate delivery for splat data — from 10K to 10M+ splats per frame.",
    accent: "from-emerald-500/20 to-emerald-500/5 text-emerald-400",
  },
  {
    Icon: Radio,
    title: "Event-Ready",
    text: "Built for live concerts, sports, conferences, and immersive broadcasts at any scale.",
    accent: "from-fuchsia-500/20 to-fuchsia-500/5 text-fuchsia-400",
  },
  {
    Icon: CircuitBoard,
    title: "Developer API",
    text: "Embed volumetric streaming into your platform with our REST and WebSocket APIs.",
    accent: "from-indigo-500/20 to-indigo-500/5 text-indigo-400",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="relative scroll-mt-24 py-24 sm:py-28"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why SplatLabs"
          title={
            <>
              Everything you need to{" "}
              <span className="text-gradient">broadcast reality</span>
            </>
          }
          description="A complete streaming platform for 4D volumetric experiences — from capture to every viewer's screen."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ Icon, title, text, accent }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-white/[0.07] bg-surface/60 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-white/15 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/[0.03] blur-3xl transition-opacity group-hover:opacity-100" />

                <span
                  className={`relative inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${accent} transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon className="h-6 w-6" strokeWidth={1.75} />
                </span>

                <h3 className="mt-5 text-lg font-semibold text-foreground">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
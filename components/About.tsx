import { Atom, Box, CircleDot, Waves } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const SPLAT_FACTS = [
  {
    Icon: Atom,
    title: "Millions of tiny gaussians",
    text: "Each scene is millions of 3D gaussian blobs — every one with its own position, color, opacity.",
  },
  {
    Icon: Waves,
    title: "Rendered in real time",
    text: "Optimized for WebGPU, our pipeline rasterizes the full splat field at 60fps in your browser.",
  },
  {
    Icon: CircleDot,
    title: "True 4D motion",
    text: "We add a time dimension — so the scene moves, breathes, and behaves like the real event.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative scroll-mt-24 overflow-hidden py-24">
      <div className="pointer-events-none absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-accent-violet/[0.06] blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-accent/[0.05] blur-[120px]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left: copy */}
          <div>
            <SectionHeading
              align="left"
              eyebrow="The technology"
              title={
                <>
                  Millions of tiny splats.
                  <br />
                  <span className="text-gradient">One photorealistic world.</span>
                </>
              }
              description="Instead of triangles or point clouds, Gaussian Splatting represents a scene as millions of tiny 3D gaussian blobs — each with its own position, color, and opacity. The result: real-time, photorealistic rendering that runs directly in a browser."
            />

            <div className="mt-10 flex flex-col gap-5">
              {SPLAT_FACTS.map(({ Icon, title, text }, i) => (
                <Reveal key={title} delay={i * 0.1}>
                  <div className="group flex gap-4 rounded-2xl border border-white/[0.06] bg-surface/60 p-5 transition-colors hover:border-accent/25 hover:bg-surface">
                    <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent/15 to-accent-violet/15 text-accent transition-transform group-hover:scale-105">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-semibold text-foreground">{title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted">
                        {text}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right: abstract visual */}
          <Reveal delay={0.2} className="relative">
            <div className="relative mx-auto aspect-square w-full max-w-lg">
              {/* Orbiting rings */}
              <div className="absolute inset-0 rounded-full border border-white/[0.06]" />
              <div className="absolute inset-8 rounded-full border border-accent/[0.12]" />
              <div className="absolute inset-16 rounded-full border border-accent-violet/[0.15]" />
              <div className="absolute inset-24 rounded-full border border-white/[0.08]" />

              {/* Orbital dots */}
              <span className="animate-pulse-glow absolute left-1/2 top-16 h-2 w-2 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_20px_rgba(34,211,238,0.8)]" />
              <span className="animate-pulse-glow absolute bottom-16 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-accent-violet shadow-[0_0_20px_rgba(139,92,246,0.8)]" style={{ animationDelay: "1s" }} />
              <span className="animate-pulse-glow absolute right-16 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-blue-400 shadow-[0_0_20px_rgba(96,165,250,0.8)]" style={{ animationDelay: "2s" }} />

              {/* Center core */}
              <div className="glow-ring absolute left-1/2 top-1/2 flex h-40 w-40 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-accent via-accent-violet to-accent-violet/40">
                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-black/70 backdrop-blur-md">
                  <Box className="h-12 w-12 text-accent" strokeWidth={1.5} />
                </div>
              </div>

              {/* Floating splat particles */}
              <div className="pointer-events-none absolute inset-0">
                <span className="animate-float absolute left-6 top-1/4 h-3 w-3 rounded-full bg-accent/60 blur-[1px]" />
                <span className="animate-float absolute right-10 top-6 h-2 w-2 rounded-full bg-accent-violet/70 blur-[1px]" style={{ animationDelay: "1.2s" }} />
                <span className="animate-float absolute bottom-8 left-10 h-2.5 w-2.5 rounded-full bg-blue-400/60 blur-[1px]" style={{ animationDelay: "2.4s" }} />
                <span className="animate-float absolute right-6 bottom-1/4 h-3.5 w-3.5 rounded-full bg-accent/50 blur-[1px]" style={{ animationDelay: "0.6s" }} />
              </div>

              {/* Stat pill */}
              <div className="glass absolute -top-4 right-4 rounded-2xl border border-white/[0.08] px-4 py-3 shadow-xl">
                <div className="text-sm font-bold text-gradient">3ms</div>
                <div className="text-[11px] text-muted">Frame render</div>
              </div>
              <div className="glass absolute -bottom-4 left-4 rounded-2xl border border-white/[0.08] px-4 py-3 shadow-xl">
                <div className="text-sm font-bold text-gradient">4D</div>
                <div className="text-[11px] text-muted">Time dimension</div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
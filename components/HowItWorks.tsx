import { ArrowRight, CloudUpload, MonitorPlay, Video } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const STEPS = [
  {
    number: "01",
    Icon: Video,
    title: "Capture",
    text: "Use any Gaussian Splatting capture rig, multicam array, or compatible camera.",
  },
  {
    number: "02",
    Icon: CloudUpload,
    title: "Process",
    text: "Our cloud pipeline converts raw captures into optimized 4D splat streams in seconds.",
  },
  {
    number: "03",
    Icon: MonitorPlay,
    title: "Stream",
    text: "Embed the player in your platform. Viewers watch live, in-browser, with full 3D control.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative scroll-mt-24 overflow-hidden bg-surface/30 py-24 sm:py-28"
    >
      <div className="pointer-events-none absolute inset-0 dot-bg opacity-30" />
      <div className="pointer-events-none absolute -top-32 right-0 h-[400px] w-[400px] rounded-full bg-accent-violet/[0.07] blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="How it works"
          title={
            <>
              Three steps.
              <br />
              <span className="text-gradient">Zero complexity.</span>
            </>
          }
          description="From capture rig to viewer's browser in minutes — not weeks of integration."
        />

        <div className="relative mt-16 grid gap-10 md:grid-cols-3 md:gap-6">
          {/* Connector line */}
          <div className="pointer-events-none absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-accent/40 via-accent-violet/40 to-accent/40 md:block" />

          {STEPS.map(({ number, Icon, title, text }, i) => (
            <Reveal key={number} delay={i * 0.15}>
              <div className="relative">
                <div className="flex items-center gap-4">
                  <span className="relative z-10 flex h-[72px] w-[72px] items-center justify-center rounded-2xl border border-white/10 bg-surface-2 shadow-lg">
                    <Icon className="h-7 w-7 text-accent" strokeWidth={1.75} />
                  </span>
                  <span className="text-5xl font-extrabold text-white/[0.06]">
                    {number}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-semibold text-foreground">
                  {title}
                </h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">
                  {text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Embed snippet */}
        <Reveal delay={0.2} className="mt-16">
          <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0c0c0e] shadow-2xl">
            <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              <span className="ml-3 text-xs font-medium text-muted">
                index.html
              </span>
            </div>
            <div className="overflow-x-auto p-5 font-mono text-sm leading-relaxed">
              <pre className="text-zinc-300">
                <code>
                  <span className="text-[#ff7b72]">&lt;script</span>{" "}
                  <span className="text-[#79c0ff]">src</span>
                  <span className="text-zinc-500">=</span>
                  <span className="text-[#a5d6ff]">
                    {'"'}https://cdn.splatlabs.dev/player.js{'"'}
                  </span>
                  <span className="text-[#ff7b72]">&gt;&lt;/script&gt;</span>
                  {"\n"}
                  <span className="text-[#ff7b72]">&lt;div</span>{" "}
                  <span className="text-[#79c0ff]">id</span>
                  <span className="text-zinc-500">=</span>
                  <span className="text-[#a5d6ff]">{'"'}splat-player{'"'}</span>{" "}
                  <span className="text-[#79c0ff]">data-stream</span>
                  <span className="text-zinc-500">=</span>
                  <span className="text-[#a5d6ff]">
                    {'"'}event:live-stage{'"'}
                  </span>
                  <span className="text-[#ff7b72]">&gt;&lt;/div&gt;</span>
                </code>
              </pre>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.3} className="mt-10 text-center">
          <a
            href="#waitlist"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-foreground"
          >
            See the full developer docs
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
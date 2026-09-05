import { Camera, Hexagon, Map, Scan, Video } from "lucide-react";
import Reveal from "./Reveal";

const TOOLS = [
  { name: "Polycam", Icon: Camera },
  { name: "DJI Drone", Icon: Hexagon },
  { name: "Luma AI", Icon: Sparkle },
  { name: "Kiri Engine", Icon: Scan },
  { name: "Postshot", Icon: Video },
  { name: "Scaniverse", Icon: Map },
];

function Sparkle() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function TrustedBy() {
  return (
    <section className="relative border-y border-white/[0.05] bg-surface/50 py-14">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <p className="text-center text-sm font-medium uppercase tracking-widest text-muted">
            Works with splats from any modern capture tool
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
            {TOOLS.map(({ name, Icon }) => (
              <div
                key={name}
                className="group flex cursor-default items-center gap-2 text-base font-semibold text-muted/70 transition-all duration-300 hover:text-foreground"
              >
                <Icon
                  className="h-5 w-5 transition-colors group-hover:text-accent"
                  aria-hidden
                />
                {name}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.25}>
          <p className="mt-8 text-center text-xs text-muted/60">
            Bring your own capture rig or use ours — SplatLabs is format-agnostic.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
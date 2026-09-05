"use client";

import { ArrowRight, Check, Loader2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import Reveal from "./Reveal";

const PERKS = [
  "Founding partner pricing",
  "Priority capture rig access",
  "Direct line to the engineering team",
];

export default function CTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (status !== "idle") return;
    if (!email.includes("@")) return;
    setStatus("loading");
    // Simulate submit - wire to your API/email provider of choice
    setTimeout(() => setStatus("done"), 900);
  };

  return (
    <section
      id="waitlist"
      className="relative scroll-mt-24 overflow-hidden py-28"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-accent/[0.09] via-accent-violet/[0.09] to-accent/[0.09] blur-[120px]" />
        <div className="absolute inset-0 grid-bg opacity-30" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
        <Reveal>
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl">
            Ready to{" "}
            <span className="text-gradient-shimmer">
              stream the future?
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            We are onboarding our first cohort of event partners for early
            Alpha. Join the waitlist and be first in line for live 4D splat
            streaming.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          {status === "done" ? (
            <div className="mx-auto mt-10 flex max-w-md items-center justify-center gap-2 rounded-full border border-accent/30 bg-accent/[0.08] px-6 py-4 text-accent">
              <Check className="h-5 w-5" />
              <span className="font-semibold">
                You are on the list. Talk soon!
              </span>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                aria-label="Email address"
                className="h-12 flex-1 rounded-full border border-white/10 bg-white/[0.04] px-5 text-foreground placeholder:text-muted/60 backdrop-blur-md transition-colors focus:border-accent/50 focus:outline-none"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-violet px-7 text-base font-semibold text-black transition-all hover:shadow-[0_0_40px_rgba(34,211,238,0.45)] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Joining...
                  </>
                ) : (
                  <>
                    Get Early Access
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {PERKS.map((perk) => (
              <span
                key={perk}
                className="flex items-center gap-2 text-sm text-muted"
              >
                <Check className="h-4 w-4 text-accent" />
                {perk}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
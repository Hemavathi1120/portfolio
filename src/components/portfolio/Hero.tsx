import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { profile } from "@/lib/portfolio-data";
import { ArrowLink, Magnetic } from "./primitives";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yImg = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const yType = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const mx = useMotionPointer();

  return (
    <section
      id="identity"
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden paper-grid pt-24"
    >
      <motion.div style={{ opacity: fade }} className="relative mx-auto max-w-[1600px] px-5 md:px-10">
        {/* top meta row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3 label-mono text-muted-foreground"
        >
          <span>{profile.role}</span>
          <span className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
            {profile.status}
          </span>
          <span>{profile.location}</span>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 pt-8 lg:grid-cols-12 lg:gap-6 lg:pt-12">
          <div className="lg:col-span-8">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease }}
              className="label-mono text-accent"
            >
              Full Stack × Gen AI × Leadership
            </motion.p>

            <motion.h1
              style={{ y: yType, x: mx.slow }}
              className="mt-4 font-display text-[clamp(3.5rem,13.5vw,13rem)] leading-[0.82]"
            >
              {["HEMA", "VATHI", "SAIDHU"].map((line, i) => (
                <span key={line} className="block overflow-hidden">
                  <motion.span
                    initial={{ y: "105%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, delay: 0.2 + i * 0.09, ease }}
                    className={`inline-block ${i === 2 ? "text-accent" : ""}`}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, delay: 0.6, ease }}
              className="mt-6 h-px origin-left bg-foreground/30"
            />

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7, ease }}
              className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
            >
              <span className="font-serif text-foreground italic text-xl md:text-2xl">
                Crafting Digital Excellence.
              </span>{" "}
              {profile.intro}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.85, ease }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Magnetic strength={0.25}>
                <a
                  href="#work"
                  data-cursor="view"
                  className="inline-flex items-center gap-3 bg-foreground px-6 py-4 label-mono text-background transition-colors hover:bg-accent"
                >
                  View my work →
                </a>
              </Magnetic>
              <ArrowLink href="#contact" external={false} cursor="talk">
                Get in touch
              </ArrowLink>
              <ArrowLink href={profile.resume} cursor="resume">
                View resume
              </ArrowLink>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="mt-8 flex items-center gap-5 label-mono text-muted-foreground"
            >
              <span>Connect</span>
              <a href={profile.github} target="_blank" rel="noreferrer" data-cursor="link" className="hover:text-accent">
                GitHub
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" data-cursor="link" className="hover:text-accent">
                LinkedIn
              </a>
            </motion.div>
          </div>

          <div className="lg:col-span-4">
            <motion.div
              style={{ y: yImg, x: mx.fast }}
              initial={{ clipPath: "inset(100% 0 0 0)" }}
              animate={{ clipPath: "inset(0% 0 0 0)" }}
              transition={{ duration: 1.1, delay: 0.35, ease }}
              className="relative border border-border"
            >
              <img
                src={profile.avatar}
                alt="Hemavathi Saidhu"
                width={640}
                height={800}
                className="aspect-[4/5] w-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
              />
              <div className="absolute bottom-0 left-0 bg-accent px-3 py-1.5 label-mono text-accent-foreground">
                Andhra Pradesh, India
              </div>
            </motion.div>
            <div className="mt-3 grid grid-cols-3 gap-px border border-border bg-border">
              {[
                { v: "8.75", l: "B.Tech CGPA" },
                { v: "95.6%", l: "10th Grade" },
                { v: "92%", l: "Intermediate" },
              ].map((s) => (
                <div key={s.l} className="bg-background p-3 text-center">
                  <div className="font-display text-2xl">{s.v}</div>
                  <div className="label-mono text-[9px] text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <div className="mt-10 overflow-hidden border-y border-border py-3">
        <div className="marquee-track flex w-max gap-8 label-mono text-muted-foreground">
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k} className="flex gap-8">
              {[
                "CLOUDINARY",
                "FIRESTORE DATABASE",
                "LOVABLE",
                "CODE WITH AI",
                "FLOW AI",
                "GEMINI",
                "TOASTMASTERS VPPR",
                "B.TECH — AID",
              ].map((t) => (
                <span key={t} className="flex items-center gap-8">
                  {t}
                  <span className="text-accent">✦</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Pointer-driven horizontal drift for hero layers. */
function useMotionPointer() {
  const slow = useMotionValueDrift(10);
  const fast = useMotionValueDrift(-22);
  return { slow, fast };
}

import { useMotionValue, useSpring } from "motion/react";
import { useEffect } from "react";

function useMotionValueDrift(range: number) {
  const v = useMotionValue(0);
  const s = useSpring(v, { stiffness: 60, damping: 20 });
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const handler = (e: PointerEvent) => {
      v.set((e.clientX / window.innerWidth - 0.5) * range);
    };
    window.addEventListener("pointermove", handler, { passive: true });
    return () => window.removeEventListener("pointermove", handler);
  }, [v, range]);
  return s;
}

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { usePortfolio } from "@/lib/portfolio-context";
import { ArrowLink, Magnetic } from "./primitives";

const ease = [0.16, 1, 0.3, 1] as const;

const stats = [
  { v: "8.75", l: "B.Tech CGPA" },
  { v: "95.6%", l: "10th Grade" },
  { v: "92%", l: "Intermediate" },
  { v: "5", l: "Projects Shipped" },
];

export function Hero() {
  const { profile } = usePortfolio();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yImg = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const yType = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const driftSlow = useDrift(8);
  const driftFast = useDrift(-20);

  return (
    <section
      id="identity"
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden paper-grid pt-24"
    >
      {/* oversized ghost word */}
      <motion.span
        aria-hidden
        style={{ y: yType }}
        className="pointer-events-none absolute -right-6 top-[18%] hidden select-none font-display text-[22vw] leading-none text-foreground/[0.05] lg:block"
      >
        DEV
      </motion.span>

      <motion.div style={{ opacity: fade }} className="relative mx-auto max-w-[1600px] px-5 md:px-10">
        {/* meta rail */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap items-center justify-between gap-3 border-y border-border py-3 label-mono text-muted-foreground"
        >
          <span>{profile.role}</span>
          <span className="flex items-center gap-2 text-foreground">
            <motion.span
              animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              className="inline-block h-1.5 w-1.5 rounded-full bg-accent"
            />
            {profile.status}
          </span>
          <span>{profile.location}</span>
          <span className="hidden md:inline">© 2026</span>
        </motion.div>

        <div className="grid grid-cols-1 items-end gap-10 pt-10 lg:grid-cols-12 lg:gap-8 lg:pt-14">
          {/* LEFT: typographic identity */}
          <div className="lg:col-span-7">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease }}
              className="label-mono text-accent"
            >
              Full Stack × Gen AI × Leadership
            </motion.p>

            <motion.h1
              style={{ x: driftSlow }}
              className="mt-4 font-display text-[clamp(3.2rem,12.5vw,11.5rem)] leading-[0.8] tracking-[-0.01em]"
            >
              {["HEMA", "VATHI"].map((line, i) => (
                <span key={line} className="block overflow-hidden">
                  <motion.span
                    initial={{ y: "105%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, delay: 0.2 + i * 0.09, ease }}
                    className="inline-block"
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
              <span className="flex items-end gap-4 overflow-hidden">
                <motion.span
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, delay: 0.38, ease }}
                  className="inline-block text-accent"
                >
                  SAIDHU
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.7, delay: 0.8, ease }}
                  className="mb-[0.9em] hidden font-serif text-2xl italic text-muted-foreground sm:inline-block"
                >
                  ✦
                </motion.span>
              </span>
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
              <span className="font-serif text-xl italic text-foreground md:text-2xl">
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
                  className="group relative inline-flex items-center gap-3 overflow-hidden bg-foreground px-6 py-4 label-mono text-background"
                >
                  <span className="absolute inset-0 origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" />
                  <span className="relative">View my work →</span>
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
              <a href={`mailto:${profile.email}`} data-cursor="talk" className="hidden hover:text-accent sm:inline">
                Email
              </a>
            </motion.div>
          </div>

          {/* RIGHT: portrait frame */}
          <div className="lg:col-span-5">
            <motion.div style={{ y: yImg, x: driftFast }} className="relative">
              <motion.div
                aria-hidden
                animate={{ rotate: 360 }}
                transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
                className="pointer-events-none absolute -left-10 -top-10 hidden h-28 w-28 rounded-full border border-dashed border-accent/60 lg:block"
              />
              <motion.div
                initial={{ clipPath: "inset(100% 0 0 0)" }}
                animate={{ clipPath: "inset(0% 0 0 0)" }}
                transition={{ duration: 1.1, delay: 0.35, ease }}
                className="group relative overflow-hidden border border-border bg-secondary"
              >
                <motion.img
                  src={profile.avatar}
                  alt="Hemavathi Saidhu, full stack developer"
                  width={640}
                  height={800}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                  className="aspect-[4/5] w-full object-cover object-[50%_18%] transition-transform duration-[900ms] group-hover:scale-[1.04]"
                />
                <motion.div
                  aria-hidden
                  animate={{ opacity: [0, 0.3, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-accent/25 to-transparent"
                />
                <div className="absolute bottom-0 left-0 bg-accent px-3 py-1.5 label-mono text-accent-foreground">
                  Andhra Pradesh, India
                </div>
              </motion.div>


            </motion.div>
          </div>
        </div>

        {/* stats rail */}
        <div className="mt-12 grid grid-cols-2 gap-px border border-border bg-border md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.l}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 + i * 0.08, ease }}
              whileHover={{ y: -4 }}
              className="group relative bg-background p-4"
            >
              <div className="font-display text-3xl transition-colors group-hover:text-accent md:text-4xl">{s.v}</div>
              <div className="label-mono text-[9px] text-muted-foreground">{s.l}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="mt-10 overflow-hidden border-y border-border py-3">
        <div className="marquee-track flex w-max gap-8 label-mono text-muted-foreground">
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k} className="flex gap-8">
              {[
                "CLOUDINARY",
                "FIRESTORE DATABASE",
                "REACT & TYPESCRIPT",
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

/** Pointer-driven horizontal drift. */
function useDrift(range: number) {
  const v = useMotionValue(0);
  const s = useSpring(v, { stiffness: 60, damping: 20 });
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const handler = (e: PointerEvent) => v.set((e.clientX / window.innerWidth - 0.5) * range);
    window.addEventListener("pointermove", handler, { passive: true });
    return () => window.removeEventListener("pointermove", handler);
  }, [v, range]);
  return s;
}

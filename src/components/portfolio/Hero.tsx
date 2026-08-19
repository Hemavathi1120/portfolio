import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { profile } from "@/lib/portfolio-data";
import { ArrowLink, Magnetic } from "./primitives";

const ease = [0.16, 1, 0.3, 1] as const;

const STATS = [
  { v: "8.75", l: "B.Tech CGPA" },
  { v: "95.6%", l: "10th Grade" },
  { v: "92%", l: "Intermediate" },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yImg = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const yType = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const mx = useMotionPointer();

  return (
    <section
      id="identity"
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden paper-grid pt-24"
    >
      {/* accent slab behind the type */}
      <motion.div
        aria-hidden
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.1, delay: 0.2, ease }}
        className="pointer-events-none absolute right-0 top-0 hidden h-full w-[34vw] origin-top bg-secondary/70 lg:block"
      />

      <motion.div style={{ opacity: fade }} className="relative mx-auto max-w-[1600px] px-5 md:px-10">
        {/* top meta row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3 label-mono text-muted-foreground"
        >
          <span>{profile.role}</span>
          <span className="flex items-center gap-2 text-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {profile.status}
          </span>
          <span>{profile.location}</span>
        </motion.div>

        {/* eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease }}
          className="mt-6 flex flex-wrap items-center gap-3 label-mono"
        >
          <span className="bg-accent px-2 py-1 text-accent-foreground">Full Stack</span>
          <span className="bg-foreground px-2 py-1 text-background">Gen AI</span>
          <span className="border border-foreground px-2 py-1">Leadership</span>
        </motion.div>

        {/* NAME BLOCK — portrait collaged into the type */}
        <motion.div style={{ y: yType, x: mx.slow }} className="mt-4">
          <h1 className="font-display leading-[0.78]">
            <MaskLine delay={0.2} className="text-[clamp(3.4rem,15vw,14rem)]">
              HEMA
            </MaskLine>

            {/* line 2 + portrait inline */}
            <div className="flex items-end gap-4 md:gap-8">
              <MaskLine delay={0.29} className="text-[clamp(3.4rem,15vw,14rem)]">
                VATHI
              </MaskLine>

              <motion.div
                style={{ y: yImg, x: mx.fast }}
                initial={{ clipPath: "inset(100% 0 0 0)", opacity: 0 }}
                animate={{ clipPath: "inset(0% 0 0 0)", opacity: 1 }}
                transition={{ duration: 1.1, delay: 0.5, ease }}
                className="group relative -mb-2 hidden w-[clamp(9rem,17vw,17rem)] shrink-0 overflow-hidden border border-foreground bg-secondary shadow-[8px_8px_0_0_var(--vermilion)] sm:block"
              >
                <motion.img
                  src={profile.avatar}
                  alt="Hemavathi Saidhu"
                  width={640}
                  height={800}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                  className="aspect-[4/5] w-full object-cover object-[50%_18%] transition-transform duration-[900ms] group-hover:scale-[1.05]"
                />
                <motion.div
                  aria-hidden
                  animate={{ opacity: [0, 0.3, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-accent/40 to-transparent"
                />
              </motion.div>

              <RotatingBadge />
            </div>

            <div className="flex flex-wrap items-baseline gap-x-6">
              <MaskLine delay={0.38} className="text-stroke-accent text-[clamp(3.4rem,15vw,14rem)]">
                SAIDHU
              </MaskLine>
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.9, ease }}
                className="hidden font-serif text-2xl italic normal-case tracking-normal text-muted-foreground lg:block"
              >
                Crafting Digital Excellence.
              </motion.span>
            </div>
          </h1>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.6, ease }}
          className="mt-8 h-px origin-left bg-foreground/30"
        />

        {/* lower grid: intro + CTAs | stats */}
        <div className="grid grid-cols-1 gap-8 pt-7 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7, ease }}
              className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg"
            >
              <span className="font-serif text-xl italic text-foreground md:text-2xl lg:hidden">
                Crafting Digital Excellence.
              </span>{" "}
              {profile.intro}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.85, ease }}
              className="mt-7 flex flex-wrap items-center gap-3"
            >
              <Magnetic strength={0.25}>
                <a
                  href="#work"
                  data-cursor="view"
                  className="inline-flex items-center gap-3 bg-foreground px-6 py-4 label-mono text-background shadow-[5px_5px_0_0_var(--vermilion)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-accent hover:text-accent-foreground hover:shadow-none"
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
              className="mt-7 flex items-center gap-5 label-mono text-muted-foreground"
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

          <div className="lg:col-span-5">
            <div className="grid grid-cols-3 gap-px border border-border bg-border">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.l}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 + i * 0.1, ease }}
                  whileHover={{ y: -5 }}
                  className="group bg-background p-4 text-center transition-colors hover:bg-accent"
                >
                  <div className="font-display text-3xl group-hover:text-accent-foreground">{s.v}</div>
                  <div className="label-mono text-[9px] text-muted-foreground group-hover:text-accent-foreground">
                    {s.l}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.15, ease }}
              className="mt-3 flex items-center justify-between border border-border bg-background px-4 py-3 label-mono text-muted-foreground"
            >
              <span>Scroll to explore</span>
              <motion.span
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                className="text-accent"
              >
                ↓
              </motion.span>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="relative mt-10 overflow-hidden border-y border-border bg-foreground py-3">
        <div className="marquee-track flex w-max gap-8 label-mono text-background">
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

/** One masked, sliding display line. */
function MaskLine({
  children,
  delay,
  className,
}: {
  children: string;
  delay: number;
  className?: string;
}) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        initial={{ y: "105%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay, ease }}
        className={`inline-block ${className ?? ""}`}
      >
        {children}
      </motion.span>
    </span>
  );
}

/** Rotating circular seal that fills the gap beside the name. */
function RotatingBadge() {
  const text = "OPEN TO INTERNSHIPS • FULL STACK • GEN AI • ";
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.95, ease }}
      className="relative -mb-1 hidden h-28 w-28 shrink-0 xl:block"
      aria-hidden
    >
      <svg viewBox="0 0 100 100" className="spin-slow h-full w-full">
        <defs>
          <path id="hero-seal" d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" />
        </defs>
        <text className="fill-foreground" style={{ fontSize: 9.2, letterSpacing: "0.14em" }}>
          <textPath href="#hero-seal">{text}</textPath>
        </text>
      </svg>
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-accent-foreground">
          ✦
        </span>
      </span>
    </motion.div>
  );
}

/** Pointer-driven horizontal drift for hero layers. */
function useMotionPointer() {
  const slow = useMotionValueDrift(10);
  const fast = useMotionValueDrift(-22);
  return { slow, fast };
}

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

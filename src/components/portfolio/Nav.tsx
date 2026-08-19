import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { sections, profile } from "@/lib/portfolio-data";
import { Magnetic } from "./primitives";

export function Nav({
  recruiter,
  onToggleRecruiter,
}: {
  recruiter: boolean;
  onToggleRecruiter: () => void;
}) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = sections.findIndex((s) => s.id === e.target.id);
            if (i >= 0) setActive(i);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.div
        className="fixed left-0 top-0 z-50 h-[2px] w-full origin-left bg-accent"
        style={{ scaleX: progress }}
        aria-hidden
      />
      <header className="fixed inset-x-0 top-0 z-40 backdrop-blur-md bg-background/70 border-b border-border">
        <nav
          aria-label="Primary"
          className="mx-auto flex max-w-[1600px] items-center justify-between gap-6 px-5 py-3 md:px-10"
        >
          <a href="#identity" data-cursor="link" className="font-display text-lg tracking-tight">
            {profile.firstName}
            <sup className="ml-0.5 text-[0.5em] text-accent">®</sup>
          </a>

          <ul className="hidden items-center gap-6 lg:flex">
            {sections.map((s, i) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  data-cursor="link"
                  className={`label-mono transition-colors ${
                    active === i ? "text-accent" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="mr-1.5 opacity-50">{s.num}</span>
                  {s.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <span className="hidden label-mono text-muted-foreground sm:inline">
              {sections[active]?.num ?? "01"} / 07
            </span>
            <Magnetic strength={0.2}>
              <button
                type="button"
                onClick={onToggleRecruiter}
                aria-pressed={recruiter}
                data-cursor="link"
                className={`label-mono border px-3 py-2 transition-colors ${
                  recruiter
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-foreground/25 hover:border-accent hover:text-accent"
                }`}
              >
                Recruiter view
              </button>
            </Magnetic>
            <button
              type="button"
              className="label-mono border border-foreground/25 px-3 py-2 lg:hidden"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </nav>
        {open ? (
          <ul className="grid gap-1 border-t border-border px-5 py-4 lg:hidden">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-3 py-2 font-display text-2xl"
                >
                  <span className="label-mono text-accent">{s.num}</span>
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </header>
    </>
  );
}

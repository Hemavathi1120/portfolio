import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

const LABELS: Record<string, string> = {
  view: "VIEW",
  talk: "LET'S TALK",
  resume: "RESUME",
};

export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<string>("default");
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 700, damping: 40, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 700, damping: 40, mass: 0.35 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = (e.target as HTMLElement | null)?.closest?.("[data-cursor]");
      setMode(el ? (el as HTMLElement).dataset["cursor"] || "default" : "default");
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  if (!enabled) return null;
  const label = LABELS[mode];
  const isLink = mode === "link";
  const size = label ? 88 : isLink ? 40 : 10;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        animate={{ width: size, height: size }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className={`-translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center ${
          label
            ? "bg-accent text-accent-foreground"
            : isLink
              ? "border border-foreground bg-transparent"
              : "bg-foreground"
        }`}
      >
        {label ? <span className="label-mono text-[9px]">{label}</span> : null}
      </motion.div>
    </motion.div>
  );
}

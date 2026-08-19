import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Floating geometric confetti — fills the empty margins of the page.  */
/* ------------------------------------------------------------------ */

type Shape = {
  kind: "circle" | "square" | "triangle" | "star" | "cross" | "ring" | "squiggle";
  cls: string;
  size: number;
  top: string;
  left?: string;
  right?: string;
  rot: number;
  delay: number;
};

const SHAPES: Shape[] = [
  { kind: "ring", cls: "text-accent", size: 72, top: "6%", left: "10%", rot: -8, delay: 0 },
  { kind: "star", cls: "text-lemon", size: 42, top: "14%", right: "18%", rot: 12, delay: 0.6 },
  { kind: "squiggle", cls: "text-azure", size: 96, top: "26%", left: "6%", rot: 6, delay: 1.1 },
  { kind: "triangle", cls: "text-mint", size: 46, top: "36%", right: "12%", rot: -14, delay: 0.3 },
  { kind: "cross", cls: "text-accent", size: 32, top: "46%", left: "22%", rot: 10, delay: 0.9 },
  { kind: "circle", cls: "text-lemon", size: 52, top: "56%", right: "24%", rot: 0, delay: 1.4 },
  { kind: "square", cls: "text-azure", size: 40, top: "66%", left: "14%", rot: 18, delay: 0.2 },
  { kind: "star", cls: "text-mint", size: 46, top: "76%", right: "8%", rot: -6, delay: 0.8 },
  { kind: "ring", cls: "text-accent", size: 60, top: "86%", left: "18%", rot: 0, delay: 1.2 },
  { kind: "cross", cls: "text-lemon", size: 30, top: "94%", right: "26%", rot: 22, delay: 0.5 },
];


function ShapeSvg({ kind, size, className }: { kind: Shape["kind"]; size: number; className?: string }) {
  const common = { width: size, height: size, viewBox: "0 0 100 100", className, "aria-hidden": true } as const;
  switch (kind) {
    case "circle":
      return (
        <svg {...common}>
          <circle cx="50" cy="50" r="44" fill="currentColor" />
        </svg>
      );
    case "ring":
      return (
        <svg {...common}>
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="9" />
        </svg>
      );
    case "square":
      return (
        <svg {...common}>
          <rect x="10" y="10" width="80" height="80" fill="none" stroke="currentColor" strokeWidth="10" />
        </svg>
      );
    case "triangle":
      return (
        <svg {...common}>
          <path d="M50 8 L92 90 L8 90 Z" fill="currentColor" />
        </svg>
      );
    case "star":
      return (
        <svg {...common}>
          <path
            d="M50 2 C56 34 66 44 98 50 C66 56 56 66 50 98 C44 66 34 56 2 50 C34 44 44 34 50 2 Z"
            fill="currentColor"
          />
        </svg>
      );
    case "cross":
      return (
        <svg {...common}>
          <path d="M42 4h16v38h38v16H58v38H42V58H4V42h38z" fill="currentColor" />
        </svg>
      );
    case "squiggle":
    default:
      return (
        <svg {...common} viewBox="0 0 200 60">
          <path
            d="M4 40 Q28 4 52 40 T100 40 T148 40 T196 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="9"
            strokeLinecap="round"
          />
        </svg>
      );
  }
}

export function FloatingDoodles() {
  const { scrollYProgress } = useScroll();
  const drift = useTransform(scrollYProgress, [0, 1], [0, -140]);

  const gutter = "calc((100vw - 74rem) / 2)";

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 hidden overflow-hidden xl:block">
      <motion.div style={{ y: drift }} className="absolute inset-0">
        {SHAPES.map((s, i) => {
          const isLeft = Boolean(s.left);
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 0.5, scale: 1 }}
              transition={{ duration: 0.9, delay: s.delay, ease: [0.16, 1, 0.3, 1] }}
              className="absolute flex"
              style={{
                top: s.top,
                width: gutter,
                left: isLeft ? 0 : undefined,
                right: isLeft ? undefined : 0,
                paddingLeft: isLeft ? s.left : undefined,
                paddingRight: isLeft ? undefined : s.right,
                justifyContent: isLeft ? "flex-start" : "flex-end",
              }}
            >
              <div
                className="float-y"
                style={{ ["--rot" as string]: `${s.rot}deg`, animationDelay: `${s.delay}s` }}
              >
                <ShapeSvg kind={s.kind} size={s.size} className={s.cls} />
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}


/* ------------------------------------------------------------------ */
/* Mascot — a bold little ink blob whose eyes follow your cursor.      */
/* ------------------------------------------------------------------ */

export function Mascot({ className, label = "Hi!" }: { className?: string; label?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pupil, setPupil] = useState({ x: 0, y: 0 });
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const d = Math.hypot(dx, dy) || 1;
      const m = Math.min(d, 90) / 90;
      setPupil({ x: (dx / d) * 7 * m, y: (dy / d) * 7 * m });
    };
    window.addEventListener("pointermove", move);
    const t = window.setInterval(() => {
      setBlink(true);
      window.setTimeout(() => setBlink(false), 150);
    }, 4200);
    return () => {
      window.removeEventListener("pointermove", move);
      window.clearInterval(t);
    };
  }, []);

  return (
    <div ref={ref} className={cn("relative inline-block select-none", className)}>
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [-2, 2, -2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.06 }}
        className="relative"
      >
        <svg width="140" height="140" viewBox="0 0 140 140" aria-hidden>
          <path
            d="M70 8c34 0 58 24 58 56 0 34-24 60-58 60S12 98 12 64C12 32 36 8 70 8Z"
            className="fill-accent"
          />
          <g transform="translate(0,-2)">
            <circle cx="52" cy="62" r="15" className="fill-background" />
            <circle cx="90" cy="62" r="15" className="fill-background" />
            <circle cx={52 + pupil.x} cy={62 + pupil.y} r="6.5" className="fill-foreground" />
            <circle cx={90 + pupil.x} cy={62 + pupil.y} r="6.5" className="fill-foreground" />
            {blink && (
              <>
                <rect x="37" y="55" width="30" height="16" className="fill-accent" />
                <rect x="75" y="55" width="30" height="16" className="fill-accent" />
              </>
            )}
          </g>
          <path
            d="M54 92c6 8 26 8 32 0"
            fill="none"
            className="stroke-background"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <circle cx="34" cy="84" r="6" className="fill-lemon" />
          <circle cx="108" cy="84" r="6" className="fill-lemon" />
        </svg>
      </motion.div>
      <motion.span
        initial={{ opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="absolute -right-6 -top-2 rotate-6 border border-foreground bg-lemon px-2 py-1 label-mono text-ink"
      >
        {label}
      </motion.span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Ticker strip — bold moving band between sections.                   */
/* ------------------------------------------------------------------ */

export function Ticker({
  items,
  tone = "accent",
}: {
  items: string[];
  tone?: "accent" | "ink" | "lemon";
}) {
  const row = [...items, ...items];
  const toneCls =
    tone === "accent"
      ? "bg-accent text-accent-foreground"
      : tone === "lemon"
        ? "bg-lemon text-ink"
        : "bg-foreground text-background";

  return (
    <div className={cn("relative z-10 overflow-hidden border-y border-foreground/20 py-3", toneCls)}>
      <div className="marquee-track flex w-max gap-10 whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-2xl uppercase md:text-3xl">
            {t}
            <span className="inline-block h-2 w-2 rotate-45 bg-current" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Sticker — small rotated badge to fill empty corners.                */
/* ------------------------------------------------------------------ */

export function Sticker({
  children,
  className,
  rotate = -8,
  tone = "lemon",
}: {
  children: React.ReactNode;
  className?: string;
  rotate?: number;
  tone?: "lemon" | "mint" | "azure" | "accent";
}) {
  const toneCls = {
    lemon: "bg-lemon text-ink",
    mint: "bg-mint text-ink",
    azure: "bg-azure text-ink",
    accent: "bg-accent text-accent-foreground",
  }[tone];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6, rotate: rotate - 12 }}
      whileInView={{ opacity: 1, scale: 1, rotate }}
      whileHover={{ scale: 1.08, rotate: rotate * -1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ type: "spring", stiffness: 200, damping: 14 }}
      className={cn(
        "inline-block border-2 border-foreground px-4 py-2 label-mono shadow-[4px_4px_0_0_var(--ink)]",
        toneCls,
        className,
      )}
    >
      {children}
    </motion.div>
  );
}

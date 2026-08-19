import { motion, useInView } from "motion/react";
import { useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Word-by-word masked reveal for large display type. */
export function MaskedWords({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const words = text.split(" ");
  return (
    <span ref={ref} className={cn("inline-flex flex-wrap gap-x-[0.25em]", className)}>
      {words.map((w, i) => (
        <span key={`${w}-${i}`} className="overflow-hidden inline-flex">
          <motion.span
            initial={{ y: "110%" }}
            animate={inView ? { y: 0 } : undefined}
            transition={{
              duration: 0.85,
              delay: delay + i * 0.055,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block"
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function SectionLabel({ num, label }: { num: string; label: string }) {
  return (
    <Reveal>
      <div className="flex items-center gap-4 label-mono text-muted-foreground">
        <span className="text-accent">{num}</span>
        <span className="h-px w-10 bg-current opacity-40" />
        <span>{label}</span>
      </div>
    </Reveal>
  );
}

export function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  return (
    <motion.span
      ref={ref}
      className={cn("inline-block", className)}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el || e.pointerType !== "mouse") return;
        const r = el.getBoundingClientRect();
        setPos({
          x: (e.clientX - (r.left + r.width / 2)) * strength,
          y: (e.clientY - (r.top + r.height / 2)) * strength,
        });
      }}
      onPointerLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 260, damping: 18, mass: 0.4 }}
    >
      {children}
    </motion.span>
  );
}

export function ArrowLink({
  href,
  children,
  external = true,
  className,
  cursor = "link",
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
  cursor?: string;
}) {
  return (
    <Magnetic strength={0.2}>
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer noopener" : undefined}
        data-cursor={cursor}
        className={cn(
          "group inline-flex items-center gap-3 border border-foreground/25 px-5 py-3 label-mono transition-colors hover:border-accent hover:text-accent",
          className,
        )}
      >
        {children}
        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </a>
    </Magnetic>
  );
}

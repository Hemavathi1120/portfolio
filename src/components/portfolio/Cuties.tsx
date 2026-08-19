import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const bob = (d = 0) => ({
  animate: { y: [0, -7, 0], rotate: [-2, 2, -2] },
  transition: { duration: 5 + d, repeat: Infinity, ease: "easeInOut" as const, delay: d },
});

/** Cute floating star with a face. */
export function StarBuddy({ className }: { className?: string }) {
  return (
    <motion.svg
      {...bob(0.4)}
      whileHover={{ scale: 1.12, rotate: 8 }}
      viewBox="0 0 100 100"
      className={cn("h-20 w-20", className)}
      aria-hidden
    >
      <path
        d="M50 6 61 36l32 2-25 20 9 31-27-18-27 18 9-31L7 38l32-2Z"
        className="fill-lemon stroke-foreground"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <circle cx="41" cy="46" r="4" className="fill-foreground" />
      <circle cx="59" cy="46" r="4" className="fill-foreground" />
      <path d="M42 57c4 5 12 5 16 0" className="stroke-foreground" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <circle cx="33" cy="55" r="3.5" className="fill-accent/70" />
      <circle cx="67" cy="55" r="3.5" className="fill-accent/70" />
    </motion.svg>
  );
}

/** Chunky cloud character with rosy cheeks. */
export function CloudPal({ className }: { className?: string }) {
  return (
    <motion.svg
      {...bob(1.1)}
      whileHover={{ scale: 1.1, y: -6 }}
      viewBox="0 0 120 90"
      className={cn("h-20 w-28", className)}
      aria-hidden
    >
      <path
        d="M30 70c-12 0-20-8-20-18s9-18 20-17c2-14 13-24 27-24 13 0 24 8 27 20 12-2 26 6 26 20 0 11-9 19-22 19Z"
        className="fill-azure stroke-foreground"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <circle cx="47" cy="44" r="4" className="fill-foreground" />
      <circle cx="73" cy="44" r="4" className="fill-foreground" />
      <path d="M52 54c4 5 12 5 16 0" className="stroke-foreground" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <circle cx="38" cy="52" r="4" className="fill-accent/60" />
      <circle cx="82" cy="52" r="4" className="fill-accent/60" />
    </motion.svg>
  );
}

/** Mint speech-bubble buddy holding a tiny mic — nods to Toastmasters. */
export function MicPal({ className }: { className?: string }) {
  return (
    <motion.svg
      {...bob(0.8)}
      whileHover={{ rotate: -6, scale: 1.1 }}
      viewBox="0 0 110 100"
      className={cn("h-24 w-24", className)}
      aria-hidden
    >
      <path
        d="M14 12h74a8 8 0 0 1 8 8v42a8 8 0 0 1-8 8H50L30 88V70H14a8 8 0 0 1-8-8V20a8 8 0 0 1 8-8Z"
        className="fill-mint stroke-foreground"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <circle cx="40" cy="38" r="4.5" className="fill-foreground" />
      <circle cx="64" cy="38" r="4.5" className="fill-foreground" />
      <path d="M40 50c6 7 18 7 24 0" className="stroke-foreground" strokeWidth="4" fill="none" strokeLinecap="round" />
      <g className="stroke-foreground" strokeWidth="4" strokeLinecap="round" fill="none">
        <path d="M92 16v10" />
        <path d="M100 22l-6 6" />
      </g>
    </motion.svg>
  );
}

/** Bouncing heart with a wink. */
export function HeartPal({ className }: { className?: string }) {
  return (
    <motion.svg
      animate={{ scale: [1, 1.08, 1] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      viewBox="0 0 100 92"
      className={cn("h-16 w-16", className)}
      aria-hidden
    >
      <path
        d="M50 86 14 52C2 40 5 20 20 13c11-5 23 0 30 10 7-10 19-15 30-10 15 7 18 27 6 39Z"
        className="fill-accent stroke-foreground"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <circle cx="38" cy="42" r="3.5" className="fill-background" />
      <path d="M58 42h9" className="stroke-background" strokeWidth="4" strokeLinecap="round" />
      <path d="M40 55c5 5 14 5 19 0" className="stroke-background" strokeWidth="3.5" fill="none" strokeLinecap="round" />
    </motion.svg>
  );
}

/** A cute crew laid out in a bordered strip with a caption. */
export function CutieStrip({
  caption,
  className,
  variant = "a",
}: {
  caption: string;
  className?: string;
  variant?: "a" | "b" | "c";
}) {
  const crew =
    variant === "a" ? (
      <>
        <StarBuddy />
        <CloudPal />
        <HeartPal />
      </>
    ) : variant === "b" ? (
      <>
        <MicPal />
        <StarBuddy className="h-16 w-16" />
        <CloudPal className="h-16 w-24" />
      </>
    ) : (
      <>
        <CloudPal />
        <HeartPal />
        <MicPal className="h-20 w-20" />
      </>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "flex flex-wrap items-center justify-center gap-6 border border-border bg-card/60 px-6 py-6 backdrop-blur-sm",
        className,
      )}
    >
      {crew}
      <span className="label-mono text-muted-foreground">{caption}</span>
    </motion.div>
  );
}

import { useState } from "react";
import { motion } from "motion/react";
import { usePortfolio } from "@/lib/portfolio-context";
import { MaskedWords, Reveal, SectionLabel } from "./primitives";

export function Skills() {
  const { skillGroups, softSkills, profile } = usePortfolio();
  const [active, setActive] = useState<string | null>(null);

  const allSkills = skillGroups.flatMap((g) =>
    g.items.map((i) => ({ ...i, category: g.category })),
  );

  return (
    <section id="skills" className="relative border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <SectionLabel num="05" label="Technical Expertise" />

        <h2 className="mt-10 font-display text-[clamp(2.75rem,10vw,9rem)]">
          <MaskedWords text="WHAT I" />
          <br />
          <MaskedWords text="WORK WITH" delay={0.06} className="text-accent" />
        </h2>

        {/* Typographic skill cloud with category linking */}
        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ul className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
              {allSkills.map((s) => {
                const dim = active !== null && active !== s.category;
                return (
                  <li key={s.name}>
                    <button
                      type="button"
                      data-cursor="link"
                      onMouseEnter={() => setActive(s.category)}
                      onFocus={() => setActive(s.category)}
                      onMouseLeave={() => setActive(null)}
                      onBlur={() => setActive(null)}
                      className={`font-display text-[clamp(1.75rem,5.5vw,4.5rem)] leading-none transition-all duration-300 ${
                        dim
                          ? "text-foreground/35"
                          : active === s.category
                            ? "text-accent"
                            : "text-foreground"
                      }`}
                    >
                      {s.name}
                      <sup className="ml-1 label-mono text-[0.28em] text-muted-foreground">
                        {s.level}%
                      </sup>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="mt-12 space-y-8">
              {skillGroups.map((g) => (
                <Reveal key={g.category}>
                  <div
                    onMouseEnter={() => setActive(g.category)}
                    onMouseLeave={() => setActive(null)}
                  >
                    <div className="flex items-center gap-4 label-mono text-muted-foreground">
                      <span className="text-accent">{g.category}</span>
                      <span className="h-px flex-1 bg-border" />
                    </div>
                    <div className="mt-4 space-y-4">
                      {g.items.map((it) => (
                        <div key={it.name}>
                          <div className="flex items-baseline justify-between label-mono">
                            <span>{it.name}</span>
                            <span className="text-muted-foreground">{it.level}%</span>
                          </div>
                          <div className="mt-2 h-[3px] w-full bg-border">
                            <motion.div
                              initial={{ scaleX: 0 }}
                              whileInView={{ scaleX: it.level / 100 }}
                              viewport={{ once: true, amount: 0.2 }}
                              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                              className="h-full origin-left bg-accent"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Ecosystem diagram */}
          <div className="lg:col-span-5">
            <Reveal>
              <div className="relative aspect-square border border-border p-6">
                <div className="absolute inset-0 paper-grid opacity-60" aria-hidden />
                <div className="relative flex h-full flex-col items-center justify-center">
                  <div className="z-10 border border-accent bg-background px-4 py-2 text-center">
                    <div className="label-mono text-accent">Ecosystem</div>
                    <div className="font-display text-xl">{profile.firstName}</div>
                  </div>
                  <ul className="absolute inset-0">
                    {allSkills.map((s, i) => {
                      const angle = (i / allSkills.length) * Math.PI * 2 - Math.PI / 2;
                      const r = 38;
                      const dim = active !== null && active !== s.category;
                      return (
                        <li
                          key={s.name}
                          className="absolute -translate-x-1/2 -translate-y-1/2"
                          style={{
                            left: `${50 + Math.cos(angle) * r}%`,
                            top: `${50 + Math.sin(angle) * r}%`,
                          }}
                        >
                          <button
                            type="button"
                            data-cursor="link"
                            onMouseEnter={() => setActive(s.category)}
                            onMouseLeave={() => setActive(null)}
                            className={`whitespace-nowrap border bg-background px-2.5 py-1.5 label-mono text-[9px] transition-all duration-300 ${
                              dim
                                ? "border-border text-foreground/40"
                                : active === s.category
                                  ? "border-accent text-accent"
                                  : "border-foreground/25"
                            }`}
                          >
                            {s.name}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-6 border border-border p-6">
                <div className="label-mono text-accent">Professional Skills</div>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {softSkills.map((s) => (
                    <li
                      key={s}
                      className="border border-foreground/20 px-3 py-1.5 label-mono text-[10px]"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

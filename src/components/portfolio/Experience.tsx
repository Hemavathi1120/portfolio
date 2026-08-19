import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { leadership } from "@/lib/portfolio-data";
import { MaskedWords, Reveal, SectionLabel } from "./primitives";
import { CutieStrip } from "./Cuties";
import { Award } from "lucide-react";

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="relative border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <SectionLabel num="03" label="Experience / Leadership" />

        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <h2 className="font-display text-[clamp(2.75rem,7vw,6rem)]">
                <MaskedWords text="BEYOND" />
                <br />
                <MaskedWords text="CODE" delay={0.06} className="text-accent" />
              </h2>
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
                  {leadership.intro}
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="mt-8 flex items-center gap-4 border border-border p-5">
                  <img
                    src={leadership.logo}
                    alt="Toastmasters logo"
                    loading="lazy"
                    width={64}
                    height={64}
                    className="h-14 w-14 object-contain"
                  />
                  <div>
                    <div className="font-display text-xl">{leadership.org}</div>
                    <div className="label-mono text-muted-foreground">{leadership.since}</div>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
                  {leadership.orgDescription}
                </p>
              </Reveal>

              <CutieStrip variant="b" caption="Speak up · Lead kindly · Grow together" className="mt-8" />
            </div>
          </div>

          <div ref={ref} className="relative lg:col-span-7">
            <div className="absolute left-0 top-0 h-full w-px bg-border md:left-2" />
            <motion.div
              style={{ height }}
              className="absolute left-0 top-0 w-px origin-top bg-accent md:left-2"
            />

            <ol className="space-y-10 pl-8 md:pl-16">
              {leadership.roles.map((r, i) => (
                <li key={r.role}>
                  <Reveal delay={i * 0.05}>
                    <article className="border border-border bg-card p-6 md:p-8">
                      <div className="flex flex-wrap items-baseline justify-between gap-3">
                        <span className="label-mono text-accent">{r.date}</span>
                        <span className="font-display text-4xl text-foreground/10">
                          0{i + 1}
                        </span>
                      </div>
                      <h3 className="mt-3 font-display text-2xl leading-tight md:text-3xl">
                        {r.role}
                      </h3>
                      <div className="mt-2 label-mono text-muted-foreground">{r.org}</div>
                      <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                        {r.description}
                      </p>
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {["Communication", "Team Leadership", "Time Management"].map(
                          (t) => (
                            <li
                              key={t}
                              className="border border-foreground/20 px-2.5 py-1 label-mono text-[10px]"
                            >
                              {t}
                            </li>
                          ),
                        )}
                      </ul>
                    </article>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Awards showcase */}
        <div className="mt-24 md:mt-32">
          <Reveal>
            <div className="mb-10 flex items-end justify-between gap-6 border-b border-border pb-4">
              <div className="flex items-center gap-4">
                <span className="inline-flex h-10 w-10 items-center justify-center border border-accent bg-accent/10 text-accent">
                  <Award className="h-5 w-5" />
                </span>
                <h3 className="font-display text-3xl md:text-5xl">
                  AWARDS & <span className="text-accent">RECOGNITION</span>
                </h3>
              </div>
              <span className="hidden label-mono text-muted-foreground md:block">
                KIET Toastmasters Club
              </span>
            </div>
          </Reveal>

          <div className="space-y-4">
            {leadership.awards.map((award, i) => (
              <Reveal key={award.title} delay={i * 0.08}>
                <motion.article
                  whileHover={{ x: 6 }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                  className="group grid items-center gap-5 border-b border-border bg-card/40 p-4 md:grid-cols-[auto_1fr_auto] md:gap-8 md:p-6"
                >
                  {/* Thumbnail */}
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden border border-border md:h-28 md:w-28">
                    <img
                      src={award.image}
                      alt={`${award.title} award photo`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  {/* Content */}
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="label-mono text-accent">{award.event}</span>
                      <span className="hidden h-px w-8 bg-border md:block" />
                    </div>
                    <h4 className="mt-2 font-display text-2xl leading-none md:text-3xl">
                      {award.title}
                    </h4>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
                      {award.context}
                    </p>
                  </div>

                  {/* Index */}
                  <div className="hidden items-center justify-end md:flex">
                    <span className="font-display text-5xl text-foreground/10 md:text-6xl">
                      0{i + 1}
                    </span>
                  </div>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

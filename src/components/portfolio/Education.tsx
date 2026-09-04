import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { usePortfolio } from "@/lib/portfolio-context";
import { MaskedWords, Reveal, SectionLabel } from "./primitives";

export function Education() {
  const { education, about } = usePortfolio();
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 65%"] });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="education" className="relative border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <SectionLabel num="06" label="Academic Journey & Achievements" />

        <h2 className="mt-10 font-display text-[clamp(2.75rem,10vw,9rem)]">
          <MaskedWords text="ACADEMIC" />
          <br />
          <MaskedWords text="RECORD" delay={0.06} className="text-accent" />
        </h2>

        <ol ref={ref} className="relative mt-14 border-l border-border pl-6 md:pl-14">
          <motion.span
            style={{ height }}
            className="absolute -left-px top-0 w-px origin-top bg-accent"
            aria-hidden
          />
          {education.map((e, i) => (
            <li key={e.title} className="relative pb-14 last:pb-0">
              <Reveal delay={i * 0.05}>
                <div className="grid gap-4 md:grid-cols-12 md:items-start">
                  <div className="md:col-span-4">
                    <div className="font-display text-[clamp(2rem,5vw,4rem)] leading-none">
                      {e.period}
                    </div>
                    <div className="mt-2 inline-block bg-accent px-2.5 py-1 label-mono text-accent-foreground">
                      {e.result}
                    </div>
                  </div>
                  <div className="md:col-span-8">
                    <h3 className="font-display text-2xl md:text-4xl">{e.title}</h3>
                    <div className="mt-2 label-mono text-muted-foreground">{e.institution}</div>
                    <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                      {e.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        {/* Achievement archive */}
        <div className="mt-16 border-t border-border pt-10">
          <div className="label-mono text-accent">Achievement Archive</div>
          <ul className="mt-6 divide-y divide-border border-y border-border">
            {[
              {
                n: "01",
                title: "95.6% — Secondary School (10th)",
                org: "Sri Chaitanya Techno School, Eluru",
                date: "2022",
                desc: "Graduated with distinction, demonstrating academic excellence from an early age.",
              },
              {
                n: "02",
                title: "92% — Intermediate (MPC)",
                org: "Sri Chaitanya Junior College, Eluru",
                date: "2022 - 2024",
                desc: "Completed with 92% aggregate, building strong foundations in mathematics and sciences.",
              },
              {
                n: "03",
                title: `B.Tech (AID) — ${about.education.grade}`,
                org: about.education.institution,
                date: "2024 - Present",
                desc: "Pursuing Bachelor's degree with focus on full-stack development and emerging technologies.",
              },
              {
                n: "04",
                title: "Vice President Public Relations",
                org: "KIET Toastmasters Club",
                date: "Dec 2025",
                desc: "THE VPPR JOB IN THIS TOASTMASTERS THOUGHT ME SOMETHING NEW THAT I CAN CHARISH FOR LIFE TIME LIKE DESIGNING AND POSTER MAKING AND MANY OTHERS",
              },
              {
                n: "05",
                title: "Secretary",
                org: "KIET Toastmasters",
                date: "Jun 2025",
                desc: "BEING SECREATARY THE FIRST TIME IN THE EXECUTIVE COMMITEE I HAVE LEARNED SO MANY THINGS LIKE HOW THE TOASTMSATERS WORKS AND KNOW HOW TO MANAGE SOMETHING",
              },
            ].map((a, i) => (
              <li key={a.n}>
                <Reveal delay={i * 0.04}>
                  <div className="group grid gap-3 py-6 md:grid-cols-12 md:items-baseline">
                    <span className="font-display text-3xl text-foreground/20 transition-colors group-hover:text-accent md:col-span-1">
                      {a.n}
                    </span>
                    <div className="md:col-span-5">
                      <h3 className="font-display text-xl md:text-2xl">{a.title}</h3>
                      <div className="mt-1 label-mono text-muted-foreground">{a.org}</div>
                    </div>
                    <span className="label-mono text-accent md:col-span-2">{a.date}</span>
                    <p className="text-sm leading-relaxed text-muted-foreground md:col-span-4">
                      {a.desc}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

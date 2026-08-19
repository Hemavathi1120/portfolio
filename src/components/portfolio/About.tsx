import { about, profile } from "@/lib/portfolio-data";
import { MaskedWords, Reveal, SectionLabel } from "./primitives";

export function About() {
  return (
    <section id="about" className="relative border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <SectionLabel num="02" label={about.eyebrow} />

        <div className="mt-10 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="font-display text-[clamp(2.75rem,8vw,7rem)]">
              <MaskedWords text="WHO" />
              <br />
              <MaskedWords text="AM" delay={0.06} />
              <br />
              <MaskedWords text="I?" delay={0.12} className="text-accent" />
            </h2>

            <Reveal delay={0.1}>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed md:text-xl">{about.body}</p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-6 font-serif text-2xl italic text-accent md:text-3xl">
                “{about.note}”
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <h3 className="mt-10 font-display text-3xl md:text-4xl">{about.title}</h3>
            </Reveal>

            <div className="mt-10 grid grid-cols-3 gap-px border border-border bg-border">
              {about.stats.map((s, i) => (
                <Reveal key={s.label} delay={0.05 * i} className="bg-background">
                  <div className="p-5 md:p-7">
                    <div className="font-display text-[clamp(1.75rem,5vw,3.5rem)] leading-none">
                      {s.value}
                    </div>
                    <div className="mt-2 label-mono text-muted-foreground">{s.label}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <Reveal>
              <figure className="group overflow-hidden border border-border bg-secondary">
                <img
                  src={profile.avatar}
                  alt="Portrait of Hemavathi Saidhu"
                  loading="lazy"
                  width={640}
                  height={800}
                  className="aspect-[4/5] w-full object-cover object-[50%_18%] transition-transform duration-[900ms] group-hover:scale-[1.05]"
                />
                <figcaption className="flex items-center justify-between border-t border-border px-4 py-3 label-mono text-muted-foreground">
                  <span>Meet</span>
                  <span className="text-foreground">{profile.name}</span>
                </figcaption>
              </figure>
            </Reveal>


            <div className="mt-6 divide-y divide-border border border-border">
              <Reveal delay={0.05}>
                <div className="p-5">
                  <div className="label-mono text-accent">Education</div>
                  <div className="mt-3 font-display text-2xl">{about.education.degree}</div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {about.education.institution}
                  </div>
                  <div className="mt-3 flex items-center justify-between label-mono">
                    <span>{about.education.branch}</span>
                    <span className="text-accent">{about.education.grade}</span>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="p-5">
                  <div className="label-mono text-accent">Core Skills</div>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {about.coreSkills.map((s) => (
                      <li
                        key={s}
                        className="border border-foreground/20 px-2.5 py-1 label-mono text-[10px]"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="p-5">
                  <div className="label-mono text-accent">Leadership</div>
                  <div className="mt-3 font-display text-xl leading-tight">
                    {about.leadership.role}
                  </div>
                  <div className="mt-1 label-mono text-muted-foreground">
                    {about.leadership.org}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {about.leadership.description}
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

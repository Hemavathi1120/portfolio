import { AnimatePresence, motion } from "motion/react";
import { usePortfolio } from "@/lib/portfolio-context";

export function RecruiterPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { profile, about, education, skillGroups, projects, leadership } = usePortfolio();
  return (
    <AnimatePresence>
      {open ? (
        <motion.aside
          key="recruiter"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed right-0 top-0 z-[70] h-full w-[min(480px,100vw)] overflow-y-auto border-l border-border bg-background shadow-2xl"
          aria-label="Recruiter view — key information"
        >
          <div className="sticky top-0 flex items-center justify-between border-b border-border bg-background/95 px-5 py-4 backdrop-blur">
            <div>
              <div className="label-mono text-accent">Recruiter view</div>
              <div className="font-display text-2xl">30-second brief</div>
            </div>
            <button
              type="button"
              onClick={onClose}
              data-cursor="link"
              className="label-mono border border-foreground/25 px-3 py-2 hover:border-accent hover:text-accent"
            >
              Close ✕
            </button>
          </div>

          <div className="divide-y divide-border">
            <Block title="Who">
              <p className="font-display text-3xl">{profile.name}</p>
              <p className="mt-1 label-mono text-muted-foreground">
                {profile.role} — {profile.location}
              </p>
              <p className="mt-3 text-sm text-muted-foreground">{profile.intro}</p>
              <span className="mt-3 inline-block bg-accent px-2.5 py-1 label-mono text-accent-foreground">
                {profile.status}
              </span>
            </Block>

            <Block title="Education">
              {education.map((e) => (
                <div key={e.title} className="mb-3 flex items-baseline justify-between gap-3">
                  <span className="text-sm">
                    {e.title} — {e.institution}
                  </span>
                  <span className="label-mono text-accent">{e.result}</span>
                </div>
              ))}
              <div className="label-mono text-muted-foreground">
                {about.education.branch} — {about.education.grade}
              </div>
            </Block>

            <Block title="Skills">
              <ul className="flex flex-wrap gap-2">
                {skillGroups.flatMap((g) =>
                  g.items.map((i) => (
                    <li
                      key={i.name}
                      className="border border-foreground/20 px-2.5 py-1 label-mono text-[10px]"
                    >
                      {i.name} · {i.level}%
                    </li>
                  )),
                )}
              </ul>
            </Block>

            <Block title="Projects">
              <ol className="space-y-2">
                {projects.map((p) => (
                  <li key={p.id} className="flex items-baseline gap-3">
                    <span className="label-mono text-accent">{p.index}</span>
                    <a
                      href="#work"
                      onClick={onClose}
                      className="text-sm underline-offset-4 hover:underline"
                    >
                      {p.name}
                    </a>
                  </li>
                ))}
              </ol>
            </Block>

            <Block title="Leadership">
              {leadership.roles.map((r) => (
                <div key={r.role} className="mb-3">
                  <div className="text-sm font-medium">{r.role}</div>
                  <div className="label-mono text-muted-foreground">
                    {r.org} — {r.date}
                  </div>
                </div>
              ))}
            </Block>

            <Block title="Contact">
              <div className="grid gap-2">
                {[
                  { l: "Resume", h: profile.resume },
                  { l: "Email", h: `mailto:${profile.email}` },
                  { l: "LinkedIn", h: profile.linkedin },
                  { l: "GitHub", h: profile.github },
                ].map((x) => (
                  <a
                    key={x.l}
                    href={x.h}
                    target={x.h.startsWith("mailto") ? undefined : "_blank"}
                    rel="noreferrer"
                    data-cursor="link"
                    className="flex items-center justify-between border border-border px-4 py-3 label-mono transition-colors hover:border-accent hover:text-accent"
                  >
                    {x.l} <span>→</span>
                  </a>
                ))}
              </div>
            </Block>
          </div>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="px-5 py-6">
      <h3 className="label-mono text-accent">{title}</h3>
      <div className="mt-3">{children}</div>
    </section>
  );
}

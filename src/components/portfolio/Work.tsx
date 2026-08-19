import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { projects, type Project } from "@/lib/portfolio-data";
import { MaskedWords, Reveal, SectionLabel } from "./primitives";

type ViewMode = "showcase" | "grid" | "list";

export function Work() {
  const [mode, setMode] = useState<ViewMode>("showcase");
  const [open, setOpen] = useState<Project | null>(null);

  return (
    <section id="work" className="relative border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <SectionLabel num="04" label="Featured Work" />

        <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-[clamp(2.75rem,10vw,9rem)]">
            <MaskedWords text="SELECTED" />
            <br />
            <MaskedWords text="PROJECTS" delay={0.06} className="text-accent" />
          </h2>
          <div className="flex border border-border">
            {(["showcase", "grid", "list"] as ViewMode[]).map((m) => (
              <button
                key={m}
                type="button"
                data-cursor="link"
                onClick={() => setMode(m)}
                aria-pressed={mode === m}
                className={`label-mono px-4 py-3 transition-colors ${
                  mode === m
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-accent"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            A collection of projects that demonstrate my expertise in full-stack development and
            passion for creating impactful digital solutions.
          </p>
        </Reveal>

        <div className="mt-14">
          {mode === "showcase" ? <Showcase onOpen={setOpen} /> : null}
          {mode === "grid" ? <Grid onOpen={setOpen} /> : null}
          {mode === "list" ? <List onOpen={setOpen} /> : null}
        </div>
      </div>

      <ProjectDetail project={open} onClose={() => setOpen(null)} />
    </section>
  );
}

function Meta({ p }: { p: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {p.featured ? (
        <span className="bg-accent px-2.5 py-1 label-mono text-[10px] text-accent-foreground">
          Featured
        </span>
      ) : null}
      {p.tags.map((t) => (
        <span key={t} className="border border-foreground/20 px-2.5 py-1 label-mono text-[10px]">
          {t}
        </span>
      ))}
    </div>
  );
}

function Showcase({ onOpen }: { onOpen: (p: Project) => void }) {
  return (
    <div className="space-y-24 md:space-y-32">
      {projects.map((p, i) => {
        const flip = i % 2 === 1;
        return (
          <Reveal key={p.id}>
            <article
              className={`grid items-center gap-8 lg:grid-cols-12 ${flip ? "lg:[direction:rtl]" : ""}`}
            >
              <button
                type="button"
                data-cursor="view"
                onClick={() => onOpen(p)}
                className="group relative col-span-full overflow-hidden border border-border lg:col-span-7 [direction:ltr]"
                aria-label={`Open details for ${p.name}`}
              >
                <img
                  src={p.image}
                  alt={`${p.name} project preview`}
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                />
                <span className="pointer-events-none absolute inset-0 bg-foreground/0 transition-colors duration-500 group-hover:bg-foreground/10" />
                <span className="absolute left-4 top-4 font-display text-[clamp(2rem,6vw,5rem)] leading-none text-background mix-blend-difference">
                  {p.index}
                </span>
              </button>

              <div className="col-span-full lg:col-span-5 [direction:ltr]">
                <Meta p={p} />
                <h3 className="mt-4 font-display text-[clamp(2rem,5vw,4rem)] leading-none">
                  {p.name}
                </h3>
                <p className="mt-4 line-clamp-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {p.description}
                </p>
                <button
                  type="button"
                  data-cursor="link"
                  onClick={() => onOpen(p)}
                  className="group mt-6 inline-flex items-center gap-3 border border-foreground/25 px-5 py-3 label-mono transition-colors hover:border-accent hover:text-accent"
                >
                  View details
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </button>
              </div>
            </article>
          </Reveal>
        );
      })}
    </div>
  );
}

function Grid({ onOpen }: { onOpen: (p: Project) => void }) {
  return (
    <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((p, i) => (
        <Reveal key={p.id} delay={i * 0.04} className="bg-background">
          <button
            type="button"
            data-cursor="view"
            onClick={() => onOpen(p)}
            className="group block w-full p-5 text-left"
          >
            <div className="overflow-hidden">
              <img
                src={p.image}
                alt={`${p.name} project preview`}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="mt-4 flex items-baseline justify-between gap-3">
              <h3 className="font-display text-2xl">{p.name}</h3>
              <span className="label-mono text-accent">{p.index}</span>
            </div>
            <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{p.description}</p>
            <div className="mt-4">
              <Meta p={p} />
            </div>
          </button>
        </Reveal>
      ))}
    </div>
  );
}

function List({ onOpen }: { onOpen: (p: Project) => void }) {
  return (
    <ul className="border-t border-border">
      {projects.map((p) => (
        <li key={p.id} className="border-b border-border">
          <button
            type="button"
            data-cursor="view"
            onClick={() => onOpen(p)}
            className="group grid w-full grid-cols-12 items-center gap-4 py-6 text-left transition-colors hover:text-accent"
          >
            <span className="col-span-2 label-mono text-muted-foreground md:col-span-1">
              {p.index}
            </span>
            <span className="col-span-10 font-display text-2xl md:col-span-4 md:text-4xl">
              {p.name}
            </span>
            <span className="col-span-10 col-start-3 line-clamp-2 text-sm text-muted-foreground md:col-span-5 md:col-start-auto">
              {p.description}
            </span>
            <span className="col-span-2 hidden justify-self-end transition-transform duration-300 group-hover:translate-x-1 md:col-span-2 md:block">
              →
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}

function ProjectDetail({ project, onClose }: { project: Project | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] bg-foreground/60 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.name} details`}
        >
          <motion.div
            initial={{ y: "6%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "4%", opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="mx-auto mt-[6vh] h-[88vh] w-[min(1100px,94vw)] overflow-y-auto border border-border bg-background"
          >
            <div className="sticky top-0 flex items-center justify-between border-b border-border bg-background/90 px-5 py-3 backdrop-blur">
              <span className="label-mono text-accent">Project {project.index}</span>
              <button
                type="button"
                onClick={onClose}
                data-cursor="link"
                className="label-mono border border-foreground/25 px-3 py-2 hover:border-accent hover:text-accent"
              >
                Close ✕
              </button>
            </div>
            <img
              src={project.image}
              alt={`${project.name} project preview`}
              className="aspect-[16/9] w-full object-cover"
            />
            <div className="p-6 md:p-10">
              <Meta p={project} />
              <h3 className="mt-4 font-display text-[clamp(2rem,6vw,4.5rem)] leading-none">
                {project.name}
              </h3>
              <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
                {project.description}
              </p>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

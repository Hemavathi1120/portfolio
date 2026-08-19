import { createFileRoute, Link } from "@tanstack/react-router";
import {
  profile,
  about,
  education,
  skillGroups,
  softSkills,
  projects,
  leadership,
} from "@/lib/portfolio-data";

const title = "Resume — Hemavathi Saidhu, Full Stack Developer";
const description =
  "Resume of Hemavathi Saidhu: B.Tech (AID) at KIET with 8.75 CGPA, Gen AI and full stack projects, Toastmasters leadership, skills and contact details.";

export const Route = createFileRoute("/resume")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Anton&family=Instrument+Serif:ital@0;1&family=Space+Grotesk:wght@400;500;600&display=swap",
      },
    ],
  }),
  component: ResumePage,
});

function Block({ num, label, children }: { num: string; label: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-border py-8">
      <div className="flex items-center gap-3 label-mono text-accent">
        <span>{num}</span>
        <span className="text-foreground">{label}</span>
        <span className="h-px flex-1 bg-border" />
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function ResumePage() {
  return (
    <main className="mx-auto max-w-4xl px-5 py-12 md:px-10 md:py-16">
      <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
        <Link to="/" className="label-mono hover:text-accent">
          ← Back to portfolio
        </Link>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => window.print()}
            className="border border-foreground/30 px-4 py-2 label-mono transition-colors hover:border-accent hover:text-accent"
          >
            Print / Save PDF
          </button>
          <a
            href={profile.resumeFile}
            target="_blank"
            rel="noreferrer noopener"
            className="border border-accent bg-accent px-4 py-2 label-mono text-accent-foreground"
          >
            Original file
          </a>
        </div>
      </div>

      <header className="mt-10">
        <h1 className="font-display text-[clamp(2.5rem,9vw,6rem)] leading-[0.86]">
          {profile.firstName}
          <br />
          <span className="text-accent">{profile.lastName}</span>
        </h1>
        <p className="mt-4 max-w-2xl text-lg">{profile.intro}</p>
        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 label-mono text-muted-foreground">
          <li>{profile.role}</li>
          <li>{profile.location}</li>
          <li>
            <a className="hover:text-accent" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
          </li>
          <li>
            <a className="hover:text-accent" href={profile.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </li>
          <li>
            <a className="hover:text-accent" href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </li>
        </ul>
      </header>

      <div className="mt-10 grid grid-cols-3 gap-4">
        {about.stats.map((s) => (
          <div key={s.label} className="border border-border p-4">
            <div className="font-display text-3xl text-accent">{s.value}</div>
            <div className="label-mono text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      <Block num="01" label="Profile">
        <p className="max-w-3xl">{about.body}</p>
      </Block>

      <Block num="02" label="Education">
        <ul className="space-y-5">
          {education.map((e) => (
            <li key={e.title} className="grid gap-1 md:grid-cols-[9rem_1fr]">
              <div className="label-mono text-muted-foreground">{e.period}</div>
              <div>
                <div className="font-display text-2xl">
                  {e.title} <span className="text-accent">/ {e.result}</span>
                </div>
                <div className="label-mono text-muted-foreground">{e.institution}</div>
                <p className="mt-1 text-sm">{e.description}</p>
              </div>
            </li>
          ))}
          <li className="label-mono">
            {about.education.degree} · {about.education.branch} · {about.education.grade}
          </li>
        </ul>
      </Block>

      <Block num="03" label="Leadership">
        <ul className="space-y-5">
          {leadership.roles.map((r) => (
            <li key={r.role} className="grid gap-1 md:grid-cols-[9rem_1fr]">
              <div className="label-mono text-muted-foreground">{r.date}</div>
              <div>
                <div className="font-display text-2xl">{r.role}</div>
                <div className="label-mono text-muted-foreground">{r.org}</div>
                <p className="mt-1 text-sm">{r.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </Block>

      <Block num="04" label="Projects">
        <ul className="space-y-5">
          {projects.map((p) => (
            <li key={p.id} className="grid gap-1 md:grid-cols-[9rem_1fr]">
              <div className="label-mono text-accent">{p.index}</div>
              <div>
                <div className="font-display text-2xl">{p.name}</div>
                <p className="mt-1 max-w-2xl text-sm">{p.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </Block>

      <Block num="05" label="Skills">
        <div className="space-y-4">
          {skillGroups.map((g) => (
            <div key={g.category} className="grid gap-1 md:grid-cols-[9rem_1fr]">
              <div className="label-mono text-accent">{g.category}</div>
              <div className="flex flex-wrap gap-2">
                {g.items.map((i) => (
                  <span key={i.name} className="border border-foreground/25 px-2.5 py-1 label-mono text-[10px]">
                    {i.name} · {i.level}%
                  </span>
                ))}
              </div>
            </div>
          ))}
          <div className="grid gap-1 md:grid-cols-[9rem_1fr]">
            <div className="label-mono text-accent">professional</div>
            <div className="flex flex-wrap gap-2">
              {softSkills.map((s) => (
                <span key={s} className="border border-foreground/25 px-2.5 py-1 label-mono text-[10px]">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Block>

      <footer className="border-t border-border pt-6 label-mono text-muted-foreground">
        {profile.status} — {profile.email}
      </footer>
    </main>
  );
}

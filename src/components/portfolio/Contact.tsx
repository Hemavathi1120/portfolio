import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { usePortfolio } from "@/lib/portfolio-context";
import { MaskedWords, Reveal, SectionLabel, Magnetic } from "./primitives";
import { CutieStrip } from "./Cuties";

export function Contact() {
  const { profile, contact } = usePortfolio();
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const body = `Name: ${data.get("name")}\n\n${data.get("message")}`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
      `Portfolio message from ${data.get("name")}`,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
    toast.success("Opening your email client…");
  };

  const links = [
    { label: "Email", value: profile.email, href: `mailto:${profile.email}`, cursor: "talk" },
    { label: "LinkedIn", value: "saidhu-hemavathi", href: profile.linkedin, cursor: "link" },
    { label: "GitHub", value: "Hemavathi1120", href: profile.github, cursor: "link" },
    { label: "Resume", value: "View resume", href: profile.resume, cursor: "resume" },
  ];

  return (
    <section id="contact" className="relative border-t border-border pt-24 md:pt-32">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <SectionLabel num="07" label={contact.eyebrow} />

        <h2 className="mt-10 font-display text-[clamp(3rem,13vw,12rem)] leading-[0.82]">
          <MaskedWords text="LET'S" />
          <br />
          <MaskedWords text="BUILD" delay={0.05} />
          <br />
          <MaskedWords text="SOMETHING" delay={0.1} />
          <br />
          <MaskedWords text="THAT MATTERS." delay={0.15} className="text-accent" />
        </h2>

        <Reveal delay={0.1}>
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground">{contact.intro}</p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <ul className="border-t border-border">
              {links.map((l) => (
                <li key={l.label} className="border-b border-border">
                  <a
                    href={l.href}
                    target={l.href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noreferrer noopener"
                    data-cursor={l.cursor}
                    className="group flex items-baseline justify-between gap-4 py-6 transition-colors hover:text-accent"
                  >
                    <span className="font-display text-3xl md:text-5xl">{l.label}</span>
                    <span className="label-mono text-muted-foreground">{l.value}</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <Reveal delay={0.1}>
              <div className="mt-8 border border-border p-5">
                <div className="label-mono text-accent">Location</div>
                <div className="mt-2 font-display text-2xl">{profile.location}</div>
              </div>
            </Reveal>

            <CutieStrip variant="c" caption="Say hi — I reply fast!" className="mt-6" />
          </div>

          <div className="lg:col-span-6">
            <form onSubmit={onSubmit} className="border border-border p-6 md:p-8">
              <h3 className="font-display text-3xl">Send a message</h3>
              <div className="mt-6 space-y-5">
                <Field label="Name" name="name" />
                <Field label="Email" name="email" type="email" />
                <div>
                  <label htmlFor="message" className="label-mono text-muted-foreground">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="mt-2 w-full border border-input bg-transparent px-4 py-3 text-base outline-none transition-colors focus:border-accent"
                  />
                </div>
                <Magnetic strength={0.2}>
                  <button
                    type="submit"
                    data-cursor="talk"
                    className="inline-flex items-center gap-3 bg-foreground px-6 py-4 label-mono text-background transition-colors hover:bg-accent"
                  >
                    {sent ? "Message ready →" : "Send message →"}
                  </button>
                </Magnetic>
              </div>
            </form>
          </div>
        </div>
      </div>

      <footer className="mt-24 border-t border-border">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-4 px-5 py-8 label-mono text-muted-foreground md:px-10">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span>{profile.role} — {profile.status}</span>
          <span>Andhra Pradesh, India</span>
        </div>
        <div className="overflow-hidden border-t border-border">
          <div className="marquee-track flex w-max">
            {Array.from({ length: 2 }).map((_, k) => (
              <span
                key={k}
                className="flex items-center gap-10 pr-10 font-display text-[clamp(3rem,12vw,10rem)] leading-none text-foreground/10"
              >
                HEMAVATHI SAIDHU <span className="text-accent/30">✦</span> HEMAVATHI SAIDHU{" "}
                <span className="text-accent/30">✦</span>
              </span>
            ))}
          </div>
        </div>
      </footer>
    </section>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div>
      <label htmlFor={name} className="label-mono text-muted-foreground">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        className="mt-2 w-full border border-input bg-transparent px-4 py-3 text-base outline-none transition-colors focus:border-accent"
      />
    </div>
  );
}

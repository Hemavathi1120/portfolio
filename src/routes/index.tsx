import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { Cursor } from "@/components/portfolio/Cursor";
import { ScrollProgress } from "@/components/portfolio/ScrollProgress";

import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Experience } from "@/components/portfolio/Experience";
import { Work } from "@/components/portfolio/Work";
import { Skills } from "@/components/portfolio/Skills";
import { Education } from "@/components/portfolio/Education";
import { Contact } from "@/components/portfolio/Contact";
import { RecruiterPanel } from "@/components/portfolio/RecruiterPanel";
import { profile } from "@/lib/portfolio-data";

const title = "Hemavathi Saidhu — Full Stack Developer & Gen AI Builder";
const description =
  "Portfolio of Hemavathi Saidhu: B.Tech (AID) student at KIET, full stack developer, Toastmasters VPPR. Projects, skills, education, achievements and resume.";

export const Route = createFileRoute("/")({
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
      { rel: "canonical", href: "https://hemavathiportfolio.vercel.app/" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Anton&family=Instrument+Serif:ital@0;1&family=Space+Grotesk:wght@400;500;600&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Hemavathi Saidhu",
          jobTitle: "Full Stack Developer",
          email: `mailto:${profile.email}`,
          image: profile.avatar,
          address: { "@type": "PostalAddress", addressRegion: "Andhra Pradesh", addressCountry: "India" },
          alumniOf: "KIET Group of Engineering & Technology",
          sameAs: [profile.github, profile.linkedin],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [recruiter, setRecruiter] = useState(false);

  return (
    <>
      <Cursor />
      <ScrollProgress />
      <FloatingDoodles />
      <Nav recruiter={recruiter} onToggleRecruiter={() => setRecruiter((v) => !v)} />
      <RecruiterPanel open={recruiter} onClose={() => setRecruiter(false)} />

      <main className="relative z-10 md:cursor-none">
        <Hero />
        <Ticker
          items={["FULL STACK", "GEN AI", "PUBLIC SPEAKING", "PROBLEM SOLVING", "BUILD • SHIP • REPEAT"]}
        />
        <About />
        <Experience />
        <Ticker tone="ink" items={["SELECTED WORK", "2024 — 2026", "CODE + CURIOSITY", "KIET · AID"]} />
        <Work />
        <Skills />
        <Ticker tone="lemon" items={["PYTHON", "REACT", "GEN AI", "MYSQL", "PROMPT BUILDING", "TOASTMASTERS"]} />
        <Education />
        <div className="relative mx-auto flex max-w-6xl items-center justify-center gap-6 px-6 py-14">
          <Mascot label="Let's talk!" />
          <div className="hidden flex-wrap gap-3 sm:flex">
            <Sticker tone="accent" rotate={-6}>
              Open to internships
            </Sticker>
            <Sticker tone="mint" rotate={5}>
              Fast learner
            </Sticker>
            <Sticker tone="azure" rotate={-3}>
              Team player
            </Sticker>
          </div>
        </div>
        <Contact />
      </main>


      <a
        href={profile.resume}
        target="_blank"
        rel="noreferrer noopener"
        data-cursor="resume"
        className="fixed bottom-5 right-5 z-[60] hidden items-center gap-2 border border-foreground/25 bg-background/90 px-4 py-3 label-mono backdrop-blur transition-colors hover:border-accent hover:text-accent md:inline-flex"
      >
        View resume →
      </a>

      <Toaster />
    </>
  );
}

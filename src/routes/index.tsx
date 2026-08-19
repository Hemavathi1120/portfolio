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
      <Nav recruiter={recruiter} onToggleRecruiter={() => setRecruiter((v) => !v)} />
      <RecruiterPanel open={recruiter} onClose={() => setRecruiter(false)} />

      <main className="md:cursor-none">
        <Hero />
        <About />
        <Experience />
        <Work />
        <Skills />
        <Education />
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

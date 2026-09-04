import { useState, useRef, type ChangeEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { usePortfolio, type SectionVisibilityMap } from "@/lib/portfolio-context";
import { uploadToCloudinary, CLOUDINARY_CONFIG } from "@/lib/cloudinary";
import { AIResumeTailor } from "@/components/admin/AIResumeTailor";
import { toast } from "sonner";
import {
  LayoutDashboard,
  Layers,
  User,
  FolderGit2,
  Cpu,
  Award,
  GraduationCap,
  CloudUpload,
  Database,
  Eye,
  EyeOff,
  Trash2,
  Plus,
  Save,
  RotateCcw,
  Download,
  Upload,
  Lock,
  Unlock,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  Image as ImageIcon,
  ArrowUpRight,
} from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Portfolio Admin Dashboard — Hemavathi Saidhu" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminDashboard,
});

type TabType =
  | "overview"
  | "ai-resume"
  | "sections"
  | "profile"
  | "projects"
  | "skills"
  | "experience"
  | "education"
  | "cloudinary"
  | "backup";

export function AdminDashboard() {
  const portfolio = usePortfolio();
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("admin_session_auth") === "true";
    }
    return false;
  });
  const [passcode, setPasscode] = useState("");
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === "admin123" || passcode.trim() === "hema11") {
      setIsAuthenticated(true);
      sessionStorage.setItem("admin_session_auth", "true");
      toast.success("Welcome to your Admin Dashboard!");
    } else {
      toast.error("Incorrect passcode. Try 'admin123'");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("admin_session_auth");
    toast.info("Logged out from admin dashboard");
  };

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="w-full max-w-md rounded-2xl border border-border bg-card/90 p-8 shadow-2xl backdrop-blur">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-accent/40 bg-accent/10 text-accent">
            <Lock className="h-7 w-7" />
          </div>
          <h1 className="mt-6 text-center font-display text-3xl">Admin Portal</h1>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Enter passcode to manage portfolio content, sections, and Cloudinary assets.
          </p>

          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            <div>
              <label className="block label-mono text-xs text-muted-foreground mb-1.5">
                Passcode
              </label>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter passcode (default: admin123)"
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-accent py-3 font-medium text-accent-foreground transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Unlock Dashboard →
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/" className="label-mono text-xs text-muted-foreground hover:text-accent">
              ← Return to live portfolio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-border bg-card/85 px-5 py-3 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <img
              src={portfolio.profile.avatar}
              alt={portfolio.profile.name}
              className="h-9 w-9 rounded-full object-cover border border-accent/40"
            />
            <div>
              <div className="flex items-center gap-2 font-display text-lg leading-tight">
                <span>{portfolio.profile.firstName}'s Studio</span>
                <span className="rounded bg-accent/20 px-2 py-0.5 label-mono text-[10px] text-accent">
                  ADMIN
                </span>
              </div>
              <div className="label-mono text-[10px] text-muted-foreground">
                Cloudinary: {CLOUDINARY_CONFIG.cloudName} ({CLOUDINARY_CONFIG.uploadPreset})
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 label-mono text-xs text-muted-foreground hover:border-accent hover:text-accent transition-colors"
          >
            <span>Live Site</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg border border-border px-3 py-1.5 label-mono text-xs hover:border-destructive hover:text-destructive transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-border bg-card/40 p-3 space-y-1">
          {[
            { id: "overview", label: "Overview", icon: LayoutDashboard },
            { id: "ai-resume", label: "AI Resume Tailor (PDF/PNG)", icon: Sparkles, featured: true },
            { id: "sections", label: "Sections Manager", icon: Layers },
            { id: "profile", label: "Profile & Bio", icon: User },
            { id: "projects", label: "Projects (CRUD)", icon: FolderGit2 },
            { id: "skills", label: "Skills & Tools", icon: Cpu },
            { id: "experience", label: "Experience & Awards", icon: Award },
            { id: "education", label: "Education", icon: GraduationCap },
            { id: "cloudinary", label: "Cloudinary Media", icon: CloudUpload },
            { id: "backup", label: "Backup & Restore", icon: Database },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-sm font-medium transition-colors ${
                  active
                    ? "bg-accent text-accent-foreground font-semibold shadow"
                    : tab.featured
                    ? "text-accent hover:bg-accent/10 font-semibold"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{tab.label}</span>
                </div>
                {tab.featured && !active && (
                  <span className="rounded-full bg-accent/20 px-1.5 py-0.5 text-[9px] label-mono uppercase text-accent">
                    New
                  </span>
                )}
              </button>
            );
          })}
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-5 md:p-8 max-w-5xl overflow-y-auto">
          {activeTab === "overview" && <OverviewTab onNavigate={setActiveTab} />}
          {activeTab === "ai-resume" && <AIResumeTailor />}
          {activeTab === "sections" && <SectionsTab />}
          {activeTab === "profile" && <ProfileTab />}
          {activeTab === "projects" && <ProjectsTab />}
          {activeTab === "skills" && <SkillsTab />}
          {activeTab === "experience" && <ExperienceTab />}
          {activeTab === "education" && <EducationTab />}
          {activeTab === "cloudinary" && <CloudinaryTab />}
          {activeTab === "backup" && <BackupTab />}
        </main>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// TAB 1: OVERVIEW
// -------------------------------------------------------------
function OverviewTab({ onNavigate }: { onNavigate: (tab: TabType) => void }) {
  const portfolio = usePortfolio();
  const activeCount = Object.values(portfolio.sectionsVisibility).filter(Boolean).length;
  const totalSections = Object.keys(portfolio.sectionsVisibility).length;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-3xl">Dashboard Overview</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Real-time summary of your portfolio data, visible sections, and media connections.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="border border-border bg-card p-5 rounded-xl">
          <div className="label-mono text-xs text-muted-foreground">Projects</div>
          <div className="font-display text-4xl mt-2 text-accent">{portfolio.projects.length}</div>
          <button
            onClick={() => onNavigate("projects")}
            className="text-xs text-accent mt-3 inline-flex items-center gap-1 hover:underline"
          >
            Manage projects →
          </button>
        </div>

        <div className="border border-border bg-card p-5 rounded-xl">
          <div className="label-mono text-xs text-muted-foreground">Active Sections</div>
          <div className="font-display text-4xl mt-2">
            {activeCount} / {totalSections}
          </div>
          <button
            onClick={() => onNavigate("sections")}
            className="text-xs text-accent mt-3 inline-flex items-center gap-1 hover:underline"
          >
            Toggle sections →
          </button>
        </div>

        <div className="border border-border bg-card p-5 rounded-xl">
          <div className="label-mono text-xs text-muted-foreground">Skill Groups</div>
          <div className="font-display text-4xl mt-2">{portfolio.skillGroups.length}</div>
          <button
            onClick={() => onNavigate("skills")}
            className="text-xs text-accent mt-3 inline-flex items-center gap-1 hover:underline"
          >
            Edit skills →
          </button>
        </div>

        <div className="border border-border bg-card p-5 rounded-xl">
          <div className="label-mono text-xs text-muted-foreground">Awards & Roles</div>
          <div className="font-display text-4xl mt-2">
            {portfolio.leadership.roles.length + portfolio.leadership.awards.length}
          </div>
          <button
            onClick={() => onNavigate("experience")}
            className="text-xs text-accent mt-3 inline-flex items-center gap-1 hover:underline"
          >
            Manage leadership →
          </button>
        </div>
      </div>

      {/* AI Resume Tailor Spotlight Card */}
      <div className="relative overflow-hidden rounded-2xl border border-accent/40 bg-gradient-to-br from-accent/15 via-card to-card p-6 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
              <Sparkles className="h-3.5 w-3.5" />
              <span>AI Tailoring & Instant PDF / PNG Exporter</span>
            </div>
            <h3 className="font-display text-2xl mt-2">Tailor Resume for Any Job Posting</h3>
            <p className="text-sm text-muted-foreground max-w-xl">
              Paste any job offer URL or job description. The AI dynamically aligns your portfolio skills, headline, summary, and projects, generating an ATS-grade resume with instant high-res PDF and PNG downloads.
            </p>
          </div>
          <button
            onClick={() => onNavigate("ai-resume")}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 font-medium text-accent-foreground shadow-md hover:scale-[1.02] active:scale-[0.98] transition-transform whitespace-nowrap"
          >
            <Sparkles className="h-4 w-4" />
            <span>Launch Resume Tailor →</span>
          </button>
        </div>
      </div>

      <div className="border border-border bg-card/60 rounded-2xl p-6">
        <h3 className="font-display text-xl mb-4">Quick Shortcuts</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <button
            onClick={() => onNavigate("profile")}
            className="flex items-center justify-between border border-border p-4 rounded-xl hover:border-accent transition-colors text-left"
          >
            <div>
              <div className="font-medium text-sm">Update Avatar / Bio</div>
              <div className="text-xs text-muted-foreground">Edit headline & details</div>
            </div>
            <ArrowUpRight className="h-4 w-4 text-accent" />
          </button>
          <button
            onClick={() => onNavigate("projects")}
            className="flex items-center justify-between border border-border p-4 rounded-xl hover:border-accent transition-colors text-left"
          >
            <div>
              <div className="font-medium text-sm">Add New Project</div>
              <div className="text-xs text-muted-foreground">Post screenshots & tags</div>
            </div>
            <Plus className="h-4 w-4 text-accent" />
          </button>
          <button
            onClick={() => onNavigate("cloudinary")}
            className="flex items-center justify-between border border-border p-4 rounded-xl hover:border-accent transition-colors text-left"
          >
            <div>
              <div className="font-medium text-sm">Cloudinary Uploader</div>
              <div className="text-xs text-muted-foreground">Upload images directly</div>
            </div>
            <CloudUpload className="h-4 w-4 text-accent" />
          </button>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// TAB 2: SECTIONS VISIBILITY & DELETION
// -------------------------------------------------------------
function SectionsTab() {
  const { sectionsVisibility, toggleSectionVisibility, deleteSection } = usePortfolio();

  const sectionsList: { id: keyof SectionVisibilityMap; label: string; desc: string }[] = [
    { id: "identity", label: "01. Hero / Identity", desc: "Top introduction, big name typography, and floating tags." },
    { id: "about", label: "02. About Section", desc: "Who am I, bio body, stats, and profile portrait." },
    { id: "experience", label: "03. Experience / Leadership", desc: "Toastmasters leadership journey, roles, and awards showcase." },
    { id: "work", label: "04. Selected Projects", desc: "Featured projects showcase, interactive grid, and modal detail views." },
    { id: "skills", label: "05. Technical Expertise", desc: "Interactive skills cloud, level bars, ecosystem diagram, and soft skills." },
    { id: "education", label: "06. Academic Record", desc: "B.Tech, Intermediate, and 10th grade timeline." },
    { id: "contact", label: "07. Contact & Links", desc: "Get in touch form, email, LinkedIn, and GitHub links." },
    { id: "recruiter", label: "Recruiter 30s Brief", desc: "Slide-out panel for quick recruiter summary." },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-3xl">Sections Manager</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Turn any portfolio section ON or OFF, or remove sections you do not want visitors to see.
        </p>
      </div>

      <div className="space-y-3">
        {sectionsList.map((sec) => {
          const isVisible = sectionsVisibility[sec.id] !== false;
          return (
            <div
              key={sec.id}
              className={`flex items-center justify-between border p-5 rounded-xl transition-colors ${
                isVisible ? "border-border bg-card" : "border-border/40 bg-card/20 opacity-60"
              }`}
            >
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-display text-lg">{sec.label}</span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 label-mono text-[10px] ${
                      isVisible ? "bg-emerald-500/20 text-emerald-400" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {isVisible ? "VISIBLE" : "HIDDEN"}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{sec.desc}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    toggleSectionVisibility(sec.id);
                    toast.success(`${sec.label} is now ${!isVisible ? "visible" : "hidden"}`);
                  }}
                  className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
                    isVisible
                      ? "border-border hover:border-accent hover:text-accent"
                      : "border-accent bg-accent text-accent-foreground"
                  }`}
                >
                  {isVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  <span>{isVisible ? "Hide Section" : "Show Section"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    deleteSection(sec.id);
                    toast.info(`Deleted/Disabled ${sec.label}`);
                  }}
                  title="Delete/Hide section"
                  className="rounded-lg border border-border p-2 text-muted-foreground hover:border-destructive hover:text-destructive transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// TAB 3: PROFILE & BIO EDITOR
// -------------------------------------------------------------
function ProfileTab() {
  const { profile, about, updateProfile, updateAbout } = usePortfolio();
  const [formData, setFormData] = useState(profile);
  const [aboutData, setAboutData] = useState(about);
  const [isUploading, setIsUploading] = useState(false);

  const handleAvatarUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      toast.loading("Uploading photo to Cloudinary...", { id: "upload" });
      const result = await uploadToCloudinary(file);
      if (result.secure_url) {
        setFormData((prev) => ({ ...prev, avatar: result.secure_url }));
        updateProfile({ avatar: result.secure_url });
        toast.success("Avatar uploaded & saved to Cloudinary!", { id: "upload" });
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to upload avatar", { id: "upload" });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    updateAbout(aboutData);
    toast.success("Profile & About details saved successfully!");
  };

  return (
    <form onSubmit={handleSave} className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-3xl">Profile & Identity</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Edit your personal details, status, headline, and avatar.
          </p>
        </div>
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 font-medium text-accent-foreground hover:scale-[1.02] active:scale-[0.98] transition-transform"
        >
          <Save className="h-4 w-4" />
          <span>Save Changes</span>
        </button>
      </div>

      {/* Avatar Image Uploader */}
      <div className="border border-border bg-card p-6 rounded-2xl flex flex-col sm:flex-row items-center gap-6">
        <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl border-2 border-accent/40 shadow-xl">
          <img
            src={formData.avatar}
            alt="Current avatar"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex-1 space-y-2 text-center sm:text-left">
          <div className="font-display text-lg">Profile Avatar</div>
          <p className="text-xs text-muted-foreground">
            Directly upload a new portrait to Cloudinary (Preset: {CLOUDINARY_CONFIG.uploadPreset}).
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <label className="cursor-pointer inline-flex items-center gap-2 rounded-lg border border-accent bg-accent/10 px-4 py-2 label-mono text-xs text-accent hover:bg-accent hover:text-accent-foreground transition-colors">
              <CloudUpload className="h-4 w-4" />
              <span>{isUploading ? "Uploading..." : "Upload New Photo"}</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                disabled={isUploading}
                className="hidden"
              />
            </label>
            <input
              type="text"
              value={formData.avatar}
              onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
              placeholder="Or paste direct image URL"
              className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-xs"
            />
          </div>
        </div>
      </div>

      {/* Profile Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 border border-border bg-card p-6 rounded-2xl">
        <div>
          <label className="block label-mono text-xs text-muted-foreground mb-1">Full Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full rounded-lg border border-border bg-background px-3.5 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block label-mono text-xs text-muted-foreground mb-1">Role / Title</label>
          <input
            type="text"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full rounded-lg border border-border bg-background px-3.5 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block label-mono text-xs text-muted-foreground mb-1">Location</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full rounded-lg border border-border bg-background px-3.5 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block label-mono text-xs text-muted-foreground mb-1">Status Badge</label>
          <input
            type="text"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="w-full rounded-lg border border-border bg-background px-3.5 py-2 text-sm"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block label-mono text-xs text-muted-foreground mb-1">Short Intro</label>
          <textarea
            rows={2}
            value={formData.intro}
            onChange={(e) => setFormData({ ...formData, intro: e.target.value })}
            className="w-full rounded-lg border border-border bg-background px-3.5 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block label-mono text-xs text-muted-foreground mb-1">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full rounded-lg border border-border bg-background px-3.5 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block label-mono text-xs text-muted-foreground mb-1">LinkedIn URL</label>
          <input
            type="url"
            value={formData.linkedin}
            onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
            className="w-full rounded-lg border border-border bg-background px-3.5 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block label-mono text-xs text-muted-foreground mb-1">GitHub URL</label>
          <input
            type="url"
            value={formData.github}
            onChange={(e) => setFormData({ ...formData, github: e.target.value })}
            className="w-full rounded-lg border border-border bg-background px-3.5 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block label-mono text-xs text-muted-foreground mb-1">Resume Cloudinary URL</label>
          <input
            type="text"
            value={formData.resumeFile}
            onChange={(e) => setFormData({ ...formData, resumeFile: e.target.value })}
            className="w-full rounded-lg border border-border bg-background px-3.5 py-2 text-sm"
          />
        </div>
      </div>

      {/* About Section Bio */}
      <div className="border border-border bg-card p-6 rounded-2xl space-y-4">
        <h3 className="font-display text-xl">About Me Section Content</h3>
        <div>
          <label className="block label-mono text-xs text-muted-foreground mb-1">Headline Note</label>
          <input
            type="text"
            value={aboutData.note}
            onChange={(e) => setAboutData({ ...aboutData, note: e.target.value })}
            className="w-full rounded-lg border border-border bg-background px-3.5 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block label-mono text-xs text-muted-foreground mb-1">Full About Body</label>
          <textarea
            rows={4}
            value={aboutData.body}
            onChange={(e) => setAboutData({ ...aboutData, body: e.target.value })}
            className="w-full rounded-lg border border-border bg-background px-3.5 py-2 text-sm"
          />
        </div>
      </div>
    </form>
  );
}

// -------------------------------------------------------------
// TAB 4: PROJECTS MANAGER (FULL CRUD)
// -------------------------------------------------------------
function ProjectsTab() {
  const { projects, addProject, updateProject, deleteProject } = usePortfolio();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const [newProject, setNewProject] = useState({
    id: "",
    index: "0" + (projects.length + 1),
    name: "",
    description: "",
    image: "",
    featured: true,
    tags: "",
  });

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>, forNew: boolean, id?: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      toast.loading("Uploading project image to Cloudinary...", { id: "proj-img" });
      const result = await uploadToCloudinary(file);
      if (result.secure_url) {
        if (forNew) {
          setNewProject((p) => ({ ...p, image: result.secure_url }));
        } else if (id) {
          updateProject(id, { image: result.secure_url });
        }
        toast.success("Project screenshot uploaded to Cloudinary!", { id: "proj-img" });
      }
    } catch (err: any) {
      toast.error(err.message || "Upload failed", { id: "proj-img" });
    } finally {
      setIsUploading(false);
    }
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.name.trim()) {
      toast.error("Please enter a project name");
      return;
    }

    const id = newProject.id.trim() || newProject.name.toLowerCase().replace(/[^a-z0-9]/g, "-");
    addProject({
      id,
      index: newProject.index || "0" + (projects.length + 1),
      name: newProject.name,
      description: newProject.description,
      image: newProject.image || "https://res.cloudinary.com/dobktsnix/image/upload/v1788505817/rt2mqgz7xzqer57wiiwe.jpg",
      featured: newProject.featured,
      tags: newProject.tags ? newProject.tags.split(",").map((t) => t.trim()) : [],
    });

    setNewProject({
      id: "",
      index: "0" + (projects.length + 2),
      name: "",
      description: "",
      image: "",
      featured: true,
      tags: "",
    });
    toast.success("New project added successfully!");
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-3xl">Projects Manager</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Add, edit, reorder, or delete projects displayed in the Featured Work section.
        </p>
      </div>

      {/* Add Project Form */}
      <form onSubmit={handleCreate} className="border border-border bg-card p-6 rounded-2xl space-y-4">
        <h3 className="font-display text-xl flex items-center gap-2">
          <Plus className="h-5 w-5 text-accent" />
          <span>Add New Project</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block label-mono text-xs text-muted-foreground mb-1">Index (e.g. 06)</label>
            <input
              type="text"
              value={newProject.index}
              onChange={(e) => setNewProject({ ...newProject, index: e.target.value })}
              className="w-full rounded-lg border border-border bg-background px-3.5 py-2 text-sm"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block label-mono text-xs text-muted-foreground mb-1">Project Name</label>
            <input
              type="text"
              placeholder="e.g. AI Healthcare Assistant"
              value={newProject.name}
              onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
              className="w-full rounded-lg border border-border bg-background px-3.5 py-2 text-sm"
              required
            />
          </div>
        </div>

        <div>
          <label className="block label-mono text-xs text-muted-foreground mb-1">Description</label>
          <textarea
            rows={3}
            placeholder="Detailed overview of what the application does, tech stack used, impact..."
            value={newProject.description}
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            className="w-full rounded-lg border border-border bg-background px-3.5 py-2 text-sm"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block label-mono text-xs text-muted-foreground mb-1">Tags (comma separated)</label>
            <input
              type="text"
              placeholder="React, TypeScript, Gen AI, Firebase"
              value={newProject.tags}
              onChange={(e) => setNewProject({ ...newProject, tags: e.target.value })}
              className="w-full rounded-lg border border-border bg-background px-3.5 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block label-mono text-xs text-muted-foreground mb-1">Screenshot / Image URL</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Cloudinary image URL"
                value={newProject.image}
                onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                className="flex-1 rounded-lg border border-border bg-background px-3.5 py-2 text-sm"
              />
              <label className="cursor-pointer inline-flex items-center gap-1 rounded-lg border border-border bg-background px-3 py-2 text-xs hover:border-accent hover:text-accent">
                <CloudUpload className="h-4 w-4" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, true)}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 font-medium text-accent-foreground hover:scale-[1.02] active:scale-[0.98] transition-transform"
        >
          <Plus className="h-4 w-4" />
          <span>Add Project</span>
        </button>
      </form>

      {/* Existing Projects List */}
      <div className="space-y-4">
        <h3 className="font-display text-xl">Existing Projects ({projects.length})</h3>
        {projects.map((p) => {
          const isEditing = editingId === p.id;
          return (
            <div key={p.id} className="border border-border bg-card p-5 rounded-2xl space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
                    <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="label-mono text-accent font-semibold">{p.index}</span>
                      <h4 className="font-display text-xl">{p.name}</h4>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {p.tags.map((t) => (
                        <span key={t} className="rounded border border-foreground/15 px-2 py-0.5 label-mono text-[10px]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setEditingId(isEditing ? null : p.id)}
                    className="rounded-lg border border-border px-3 py-1.5 label-mono text-xs hover:border-accent hover:text-accent transition-colors"
                  >
                    {isEditing ? "Close" : "Edit"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      deleteProject(p.id);
                      toast.info(`Deleted project ${p.name}`);
                    }}
                    className="rounded-lg border border-border p-2 text-muted-foreground hover:border-destructive hover:text-destructive transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {isEditing && (
                <div className="border-t border-border pt-4 space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="block label-mono text-[11px] text-muted-foreground mb-1">Name</label>
                      <input
                        type="text"
                        value={p.name}
                        onChange={(e) => updateProject(p.id, { name: e.target.value })}
                        className="w-full rounded border border-border bg-background px-3 py-1.5 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block label-mono text-[11px] text-muted-foreground mb-1">Index</label>
                      <input
                        type="text"
                        value={p.index}
                        onChange={(e) => updateProject(p.id, { index: e.target.value })}
                        className="w-full rounded border border-border bg-background px-3 py-1.5 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block label-mono text-[11px] text-muted-foreground mb-1">Image URL</label>
                      <div className="flex gap-1.5">
                        <input
                          type="text"
                          value={p.image}
                          onChange={(e) => updateProject(p.id, { image: e.target.value })}
                          className="flex-1 rounded border border-border bg-background px-3 py-1.5 text-xs"
                        />
                        <label className="cursor-pointer rounded border border-border bg-background p-1.5 text-xs hover:text-accent">
                          <CloudUpload className="h-4 w-4" />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, false, p.id)}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block label-mono text-[11px] text-muted-foreground mb-1">Description</label>
                    <textarea
                      rows={3}
                      value={p.description}
                      onChange={(e) => updateProject(p.id, { description: e.target.value })}
                      className="w-full rounded border border-border bg-background px-3 py-1.5 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block label-mono text-[11px] text-muted-foreground mb-1">Tags (comma-separated)</label>
                    <input
                      type="text"
                      value={p.tags.join(", ")}
                      onChange={(e) =>
                        updateProject(p.id, {
                          tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean),
                        })
                      }
                      className="w-full rounded border border-border bg-background px-3 py-1.5 text-sm"
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// TAB 5: SKILLS & TOOLS
// -------------------------------------------------------------
function SkillsTab() {
  const { skillGroups, softSkills, updateSkillGroups, updateSoftSkills } = usePortfolio();
  const [newSkillCategory, setNewSkillCategory] = useState("backend");
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillLevel, setNewSkillLevel] = useState(85);
  const [newSoftSkill, setNewSoftSkill] = useState("");

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    const updated = skillGroups.map((g) => {
      if (g.category.toLowerCase() === newSkillCategory.toLowerCase()) {
        return {
          ...g,
          items: [...g.items, { name: newSkillName.trim().toUpperCase(), level: Number(newSkillLevel) }],
        };
      }
      return g;
    });

    updateSkillGroups(updated);
    setNewSkillName("");
    toast.success(`Added ${newSkillName} to ${newSkillCategory}!`);
  };

  const handleDeleteSkill = (cat: string, skillName: string) => {
    const updated = skillGroups.map((g) => {
      if (g.category === cat) {
        return {
          ...g,
          items: g.items.filter((it) => it.name !== skillName),
        };
      }
      return g;
    });
    updateSkillGroups(updated);
    toast.info(`Removed skill ${skillName}`);
  };

  const handleAddSoftSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSoftSkill.trim()) return;
    updateSoftSkills([...softSkills, newSoftSkill.trim()]);
    setNewSoftSkill("");
    toast.success("Added soft skill!");
  };

  const handleDeleteSoftSkill = (skill: string) => {
    updateSoftSkills(softSkills.filter((s) => s !== skill));
    toast.info(`Removed ${skill}`);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-3xl">Skills & Technical Toolkit</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Adjust proficiency bars, add new programming tools, or edit soft skills.
        </p>
      </div>

      {/* Add Skill */}
      <form onSubmit={handleAddSkill} className="border border-border bg-card p-6 rounded-2xl space-y-4">
        <h3 className="font-display text-xl flex items-center gap-2">
          <Plus className="h-5 w-5 text-accent" />
          <span>Add New Technical Skill</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block label-mono text-xs text-muted-foreground mb-1">Category</label>
            <select
              value={newSkillCategory}
              onChange={(e) => setNewSkillCategory(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3.5 py-2 text-sm"
            >
              <option value="backend">backend</option>
              <option value="frontend">frontend</option>
              <option value="tools">tools</option>
            </select>
          </div>
          <div>
            <label className="block label-mono text-xs text-muted-foreground mb-1">Skill Name</label>
            <input
              type="text"
              placeholder="e.g. DOCKER / NEXT.JS"
              value={newSkillName}
              onChange={(e) => setNewSkillName(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3.5 py-2 text-sm"
              required
            />
          </div>
          <div>
            <label className="block label-mono text-xs text-muted-foreground mb-1">
              Proficiency ({newSkillLevel}%)
            </label>
            <input
              type="range"
              min="20"
              max="100"
              value={newSkillLevel}
              onChange={(e) => setNewSkillLevel(Number(e.target.value))}
              className="w-full accent-accent mt-2"
            />
          </div>
        </div>
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 font-medium text-accent-foreground"
        >
          <Plus className="h-4 w-4" />
          <span>Add Skill</span>
        </button>
      </form>

      {/* Skill Categories List */}
      <div className="space-y-6">
        {skillGroups.map((g) => (
          <div key={g.category} className="border border-border bg-card p-6 rounded-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <span className="label-mono text-accent text-sm uppercase tracking-wider">{g.category}</span>
              <span className="label-mono text-xs text-muted-foreground">{g.items.length} skills</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {g.items.map((it) => (
                <div key={it.name} className="flex items-center justify-between border border-border bg-background p-3 rounded-lg">
                  <div>
                    <div className="font-display text-sm">{it.name}</div>
                    <div className="label-mono text-xs text-muted-foreground">{it.level}%</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteSkill(g.category, it.name)}
                    className="p-1.5 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Soft Skills */}
      <div className="border border-border bg-card p-6 rounded-2xl space-y-4">
        <h3 className="font-display text-xl">Soft & Leadership Skills</h3>
        <form onSubmit={handleAddSoftSkill} className="flex gap-3">
          <input
            type="text"
            placeholder="e.g. Critical Thinking"
            value={newSoftSkill}
            onChange={(e) => setNewSoftSkill(e.target.value)}
            className="flex-1 rounded-lg border border-border bg-background px-3.5 py-2 text-sm"
          />
          <button
            type="submit"
            className="rounded-lg bg-accent px-4 py-2 text-xs font-medium text-accent-foreground"
          >
            Add
          </button>
        </form>

        <div className="flex flex-wrap gap-2 pt-2">
          {softSkills.map((s) => (
            <span
              key={s}
              className="inline-flex items-center gap-2 border border-foreground/20 bg-background px-3 py-1.5 label-mono text-xs rounded-lg"
            >
              <span>{s}</span>
              <button
                type="button"
                onClick={() => handleDeleteSoftSkill(s)}
                className="hover:text-destructive"
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// TAB 6: EXPERIENCE & AWARDS
// -------------------------------------------------------------
function ExperienceTab() {
  const { leadership, updateLeadership } = usePortfolio();

  const handleUpdateRole = (idx: number, field: "role" | "date" | "org" | "description", val: string) => {
    const next = leadership.roles.map((r, i) => (i === idx ? { ...r, [field]: val } : r));
    updateLeadership({ roles: next });
  };

  const handleUpdateAward = (idx: number, field: "title" | "event" | "org" | "context" | "image", val: string) => {
    const next = leadership.awards.map((a, i) => (i === idx ? { ...a, [field]: val } : a));
    updateLeadership({ awards: next });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-3xl">Leadership & Awards</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Manage Toastmasters positions, descriptions, award recognitions, and trophy images.
        </p>
      </div>

      {/* Roles Editor */}
      <div className="border border-border bg-card p-6 rounded-2xl space-y-4">
        <h3 className="font-display text-xl">Toastmasters Positions & Roles</h3>
        {leadership.roles.map((role, idx) => (
          <div key={idx} className="border border-border bg-background p-4 rounded-xl space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block label-mono text-[11px] text-muted-foreground mb-1">Role Title</label>
                <input
                  type="text"
                  value={role.role}
                  onChange={(e) => handleUpdateRole(idx, "role", e.target.value)}
                  className="w-full rounded border border-border bg-card px-3 py-1.5 text-sm"
                />
              </div>
              <div>
                <label className="block label-mono text-[11px] text-muted-foreground mb-1">Date Period</label>
                <input
                  type="text"
                  value={role.date}
                  onChange={(e) => handleUpdateRole(idx, "date", e.target.value)}
                  className="w-full rounded border border-border bg-card px-3 py-1.5 text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block label-mono text-[11px] text-muted-foreground mb-1">Description</label>
              <textarea
                rows={2}
                value={role.description}
                onChange={(e) => handleUpdateRole(idx, "description", e.target.value)}
                className="w-full rounded border border-border bg-card px-3 py-1.5 text-sm"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Awards Showcase Editor */}
      <div className="border border-border bg-card p-6 rounded-2xl space-y-4">
        <h3 className="font-display text-xl">Awards & Recognitions</h3>
        {leadership.awards.map((award, idx) => (
          <div key={idx} className="border border-border bg-background p-4 rounded-xl space-y-3">
            <div className="flex items-center gap-4">
              <img src={award.image} alt={award.title} className="h-16 w-16 object-cover rounded-lg border border-border" />
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block label-mono text-[11px] text-muted-foreground mb-1">Award Title</label>
                  <input
                    type="text"
                    value={award.title}
                    onChange={(e) => handleUpdateAward(idx, "title", e.target.value)}
                    className="w-full rounded border border-border bg-card px-3 py-1.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block label-mono text-[11px] text-muted-foreground mb-1">Event / Ceremony</label>
                  <input
                    type="text"
                    value={award.event}
                    onChange={(e) => handleUpdateAward(idx, "event", e.target.value)}
                    className="w-full rounded border border-border bg-card px-3 py-1.5 text-sm"
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block label-mono text-[11px] text-muted-foreground mb-1">Context / Citation</label>
              <textarea
                rows={2}
                value={award.context}
                onChange={(e) => handleUpdateAward(idx, "context", e.target.value)}
                className="w-full rounded border border-border bg-card px-3 py-1.5 text-sm"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// TAB 7: EDUCATION
// -------------------------------------------------------------
function EducationTab() {
  const { education, updateEducation } = usePortfolio();

  const handleUpdateEdu = (idx: number, field: "title" | "result" | "period" | "institution" | "description", val: string) => {
    const next = education.map((edu, i) => (i === idx ? { ...edu, [field]: val } : edu));
    updateEducation(next);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-3xl">Education & Academics</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Manage degrees, intermediate college, school records, and percentage marks.
        </p>
      </div>

      <div className="space-y-4">
        {education.map((edu, idx) => (
          <div key={idx} className="border border-border bg-card p-6 rounded-2xl space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block label-mono text-xs text-muted-foreground mb-1">Title / Degree</label>
                <input
                  type="text"
                  value={edu.title}
                  onChange={(e) => handleUpdateEdu(idx, "title", e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block label-mono text-xs text-muted-foreground mb-1">Result / CGPA</label>
                <input
                  type="text"
                  value={edu.result}
                  onChange={(e) => handleUpdateEdu(idx, "result", e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block label-mono text-xs text-muted-foreground mb-1">Period</label>
                <input
                  type="text"
                  value={edu.period}
                  onChange={(e) => handleUpdateEdu(idx, "period", e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block label-mono text-xs text-muted-foreground mb-1">Institution</label>
              <input
                type="text"
                value={edu.institution}
                onChange={(e) => handleUpdateEdu(idx, "institution", e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block label-mono text-xs text-muted-foreground mb-1">Description</label>
              <textarea
                rows={2}
                value={edu.description}
                onChange={(e) => handleUpdateEdu(idx, "description", e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// TAB 8: CLOUDINARY MEDIA HUB
// -------------------------------------------------------------
function CloudinaryTab() {
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      toast.loading("Uploading to Cloudinary...", { id: "media-upload" });
      const result = await uploadToCloudinary(file);
      if (result.secure_url) {
        setUploadedUrl(result.secure_url);
        toast.success("Image uploaded successfully!", { id: "media-upload" });
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to upload to Cloudinary", { id: "media-upload" });
    } finally {
      setIsUploading(false);
    }
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("URL copied to clipboard!");
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-3xl">Cloudinary Media Hub</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Upload any new project screenshots, certificates, or assets directly to your Cloudinary cloud.
        </p>
      </div>

      <div className="border border-dashed border-accent/60 bg-card p-10 rounded-2xl text-center space-y-4">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 text-accent">
          <CloudUpload className="h-8 w-8" />
        </div>
        <div>
          <div className="font-display text-xl">Upload Image to Cloudinary</div>
          <p className="text-xs text-muted-foreground mt-1">
            Cloud: <span className="text-accent font-semibold">{CLOUDINARY_CONFIG.cloudName}</span> · Upload Preset:{" "}
            <span className="text-accent font-semibold">{CLOUDINARY_CONFIG.uploadPreset}</span>
          </p>
        </div>

        <div>
          <label className="cursor-pointer inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 font-medium text-accent-foreground hover:scale-105 active:scale-95 transition-transform shadow-lg">
            <CloudUpload className="h-4 w-4" />
            <span>{isUploading ? "Uploading to Cloud..." : "Choose Image File"}</span>
            <input type="file" accept="image/*" onChange={handleUpload} disabled={isUploading} className="hidden" />
          </label>
        </div>
      </div>

      {uploadedUrl && (
        <div className="border border-border bg-card p-6 rounded-2xl space-y-4">
          <div className="flex items-center gap-2 text-emerald-400 font-medium text-sm">
            <CheckCircle2 className="h-4 w-4" />
            <span>Upload Complete!</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <img src={uploadedUrl} alt="Uploaded preview" className="h-28 w-40 object-cover rounded-xl border border-border" />
            <div className="flex-1 w-full space-y-2">
              <input
                type="text"
                readOnly
                value={uploadedUrl}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs font-mono"
              />
              <button
                type="button"
                onClick={() => copyUrl(uploadedUrl)}
                className="rounded-lg bg-accent/20 border border-accent/40 px-3 py-1.5 label-mono text-xs text-accent hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Copy URL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// TAB 9: BACKUP & RESTORE
// -------------------------------------------------------------
function BackupTab() {
  const { exportPortfolioData, importPortfolioData, resetToDefaults } = usePortfolio();
  const [jsonInput, setJsonInput] = useState("");

  const handleDownload = () => {
    const dataStr = exportPortfolioData();
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `hemavathi-portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Backup downloaded as JSON!");
  };

  const handleImport = () => {
    if (!jsonInput.trim()) {
      toast.error("Please paste valid JSON backup data");
      return;
    }
    const ok = importPortfolioData(jsonInput);
    if (ok) {
      toast.success("Portfolio data restored successfully!");
      setJsonInput("");
    } else {
      toast.error("Failed to parse JSON. Please check formatting.");
    }
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to reset all portfolio data back to default values?")) {
      resetToDefaults();
      toast.info("Portfolio reset to default values");
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-3xl">Backup & Restore</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Export your portfolio database to JSON, restore backups, or reset back to factory defaults.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Export Card */}
        <div className="border border-border bg-card p-6 rounded-2xl space-y-4">
          <div className="flex items-center gap-3">
            <Download className="h-6 w-6 text-accent" />
            <h3 className="font-display text-xl">Export Backup (JSON)</h3>
          </div>
          <p className="text-xs text-muted-foreground">
            Save a complete snapshot of all your projects, custom biography, section visibility states, and skills to a downloadable JSON file.
          </p>
          <button
            type="button"
            onClick={handleDownload}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-accent py-3 font-medium text-accent-foreground hover:scale-[1.02] active:scale-[0.98] transition-transform"
          >
            <Download className="h-4 w-4" />
            <span>Download JSON Snapshot</span>
          </button>
        </div>

        {/* Reset Card */}
        <div className="border border-border bg-card p-6 rounded-2xl space-y-4">
          <div className="flex items-center gap-3">
            <RotateCcw className="h-6 w-6 text-destructive" />
            <h3 className="font-display text-xl">Reset to Defaults</h3>
          </div>
          <p className="text-xs text-muted-foreground">
            Reverts all edits, projects, and section visibility states back to the original source defaults from code.
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-destructive/50 py-3 font-medium text-destructive hover:bg-destructive hover:text-white transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Reset Factory Defaults</span>
          </button>
        </div>
      </div>

      {/* Import JSON */}
      <div className="border border-border bg-card p-6 rounded-2xl space-y-4">
        <h3 className="font-display text-xl flex items-center gap-2">
          <Upload className="h-5 w-5 text-accent" />
          <span>Restore from JSON</span>
        </h3>
        <textarea
          rows={5}
          placeholder="Paste exported portfolio JSON content here..."
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          className="w-full rounded-xl border border-border bg-background p-4 text-xs font-mono"
        />
        <button
          type="button"
          onClick={handleImport}
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 font-medium text-accent-foreground hover:scale-105 active:scale-95 transition-transform"
        >
          <Upload className="h-4 w-4" />
          <span>Restore Portfolio Data</span>
        </button>
      </div>
    </div>
  );
}

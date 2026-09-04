import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { usePortfolio } from "@/lib/portfolio-context";
import { cloudinaryAssets } from "@/lib/cloudinary";
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  ExternalLink,
  ChevronRight,
  RotateCcw,
  Volume2,
  VolumeX,
} from "lucide-react";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  time: string;
  actions?: { label: string; href?: string; actionId?: string }[] | undefined;
}

const QUICK_PROMPTS = [
  "Tell me about yourself 👩‍💻",
  "What are your top projects? 🚀",
  "What is your tech stack? ⚡",
  "Tell me about Toastmasters & awards 🏆",
  "How can I contact or hire you? 📬",
];

export function Chatbot() {
  const { profile, about, education, skillGroups, softSkills, projects, leadership } = usePortfolio();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-1",
      sender: "bot",
      text: `Hi there! 👋 I'm **Hemavathi's AI Assistant**. Ask me anything about my projects, technical skills, leadership experience, or education!`,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      actions: [
        { label: "View Projects", href: "#work" },
        { label: "Check Resume", href: "/resume" },
        { label: "Contact Info", href: "#contact" },
      ],
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, messages, isTyping]);

  const speakText = (text: string) => {
    if (!soundEnabled || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*#_`]/g, "");
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const generateAIResponse = async (userQuery: string): Promise<{ text: string; actions?: Message["actions"] }> => {
    const q = userQuery.toLowerCase().trim();

    // 1. Check if Gemini API key exists in env
    const geminiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY;
    if (geminiKey) {
      try {
        const systemPrompt = `You are Hemavathi Saidhu's official AI Portfolio Assistant.
Speak in first person as Hemavathi's friendly, sharp, and enthusiastic representative.
Key facts about Hemavathi:
- Name: Hemavathi Saidhu (Full Stack Developer, Gen AI enthusiast)
- Location: Andhra Pradesh, India
- Education: B.Tech in Artificial Intelligence & Data (AID) at KIET Group of Engineering & Technology (Grade: 8.75 CGPA). 12th: 92% at Sri Chaitanya Junior College, 10th: 95.6% at Sri Chaitanya Techno School.
- Skills: Cloudinary, Firestore Database, Flow AI, Gemini & AI Studio, Prompt Engineering, React, TypeScript, Python, Tailwind CSS, GitHub.
- Projects:
  1. Hospital (MediCare+ Healthcare Platform - React, Vite, Tailwind CSS, Firebase)
  2. Expense Manager (Personal budget tracking application)
  3. Sahayak (AI-powered teaching assistant for lesson planning)
  4. Real-Estate (DreamHouse One property showcase)
  5. My Portfolio (Personal portfolio web application)
- Leadership: Vice President Public Relations (VPPR) & former Secretary at KIET Toastmasters Club. Won "PR Maestro" and "PR Stalwart" awards.
- Contact: saidhuhema11@gmail.com, GitHub (github.com/Hemavathi1120), LinkedIn (linkedin.com/in/saidhu-hemavathi-ba0b0631b).
- Motto: "Passionate to build wonders with AI".
Keep answers concise, engaging, and professional.`;

        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    { text: systemPrompt },
                    { text: `User Question: ${userQuery}` },
                  ],
                },
              ],
            }),
          }
        );

        if (res.ok) {
          const data = await res.json();
          const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (reply) {
            return {
              text: reply,
              actions: [
                { label: "View Projects", href: "#work" },
                { label: "Get in Touch", href: "#contact" },
              ],
            };
          }
        }
      } catch (err) {
        console.warn("Gemini API call fallback to local knowledge engine:", err);
      }
    }

    // 2. Local Knowledge Base Engine (High accuracy offline/direct response)
    if (q.includes("who") || q.includes("yourself") || q.includes("about") || q.includes("intro")) {
      return {
        text: `I'm **${profile.name}**, a ${profile.role} based in ${profile.location}. I'm pursuing my B.Tech in Artificial Intelligence & Data (AID) at KIET with an **8.75 CGPA**. \n\nMy motto is *“${about.note}”* — I love crafting performant full-stack apps and exploring Generative AI solutions!`,
        actions: [
          { label: "Read full About section", href: "#about" },
          { label: "View Resume", href: "/resume" },
        ],
      };
    }

    if (q.includes("project") || q.includes("work") || q.includes("app") || q.includes("built") || q.includes("portfolio")) {
      return {
        text: `I've built several full-stack and AI projects:\n\n1. **🏥 Hospital (MediCare+)**: Healthcare management app built with React, Vite, Tailwind, & Firebase.\n2. **💰 Expense Manager**: Real-time personal finance and budgeting tracker.\n3. **🤖 Sahayak**: AI-powered teaching assistant for structured lesson planning.\n4. **🏡 DreamHouse One**: Modern real estate listings platform.\n5. **🌐 Expressive Portfolio**: My personal portfolio web app!`,
        actions: [
          { label: "Explore Projects Section", href: "#work" },
          { label: "View GitHub", href: profile.github },
        ],
      };
    }

    if (q.includes("skill") || q.includes("tech") || q.includes("stack") || q.includes("language") || q.includes("tool")) {
      const skillsList = skillGroups
        .flatMap((g) => g.items.map((i) => `**${i.name}** (${i.level}%)`))
        .join(", ");
      return {
        text: `My technical toolkit includes:\n\n• **Core Tech**: ${skillsList}\n• **Soft Skills**: ${softSkills.join(", ")}\n• **AI Tools**: Flow AI, Google Gemini, Google AI Studio, ChatGPT, Grok, Prompt Engineering.`,
        actions: [{ label: "View Skills Section", href: "#skills" }],
      };
    }

    if (q.includes("education") || q.includes("college") || q.includes("school") || q.includes("degree") || q.includes("grade") || q.includes("cgpa")) {
      return {
        text: `Here is my academic background 🎓:\n\n• **B.Tech (AID)**: KIET Group of Engineering & Technology (**8.75 CGPA**)\n• **Intermediate (MPC)**: Sri Chaitanya Junior College (**92%**)\n• **10th Grade**: Sri Chaitanya Techno School (**95.6%**)`,
        actions: [{ label: "View Education Section", href: "#education" }],
      };
    }

    if (q.includes("toastmaster") || q.includes("award") || q.includes("leadership") || q.includes("role") || q.includes("pr")) {
      return {
        text: `I'm an active leader at **KIET Toastmasters Club**! 🏆\n\n• **Vice President Public Relations (VPPR)** (Dec 2025 - Present)\n• **Secretary** (Jun 2025)\n• **Awards**: Won the **PR Maestro** and **PR Stalwart** awards for high-impact communications and outreach campaigns.`,
        actions: [{ label: "View Leadership & Awards", href: "#experience" }],
      };
    }

    if (q.includes("contact") || q.includes("hire") || q.includes("email") || q.includes("phone") || q.includes("reach") || q.includes("linkedin") || q.includes("github")) {
      return {
        text: `I'd love to connect! You can reach me directly via:\n\n📧 **Email**: [${profile.email}](mailto:${profile.email})\n💼 **LinkedIn**: [Saidhu Hemavathi](${profile.linkedin})\n🐙 **GitHub**: [github.com/Hemavathi1120](${profile.github})\n📍 **Location**: ${profile.location}`,
        actions: [
          { label: "Send Email", href: `mailto:${profile.email}` },
          { label: "Open LinkedIn", href: profile.linkedin },
          { label: "Jump to Contact Form", href: "#contact" },
        ],
      };
    }

    if (q.includes("resume") || q.includes("cv") || q.includes("download")) {
      return {
        text: `You can view my interactive resume directly on this site or view the original PDF document:`,
        actions: [
          { label: "Interactive Resume Page", href: "/resume" },
          { label: "Original Cloudinary PDF/Image", href: profile.resumeFile },
        ],
      };
    }

    // Default friendly conversational response
    return {
      text: `Thanks for asking! As Hemavathi's AI assistant, I can share details about her **full-stack projects**, **AI & cloud skills** (Cloudinary, Firestore, Flow AI), **academic background at KIET**, **Toastmasters leadership awards**, or help you get in touch.`,
      actions: [
        { label: "View Projects 🚀", href: "#work" },
        { label: "Contact Hemavathi 📬", href: "#contact" },
        { label: "Check Resume 📄", href: "/resume" },
      ],
    };
  };

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isTyping) return;

    const userMsg: Message = {
      id: "user-" + Date.now(),
      sender: "user",
      text: query,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate realistic typing delay
    setTimeout(async () => {
      const { text, actions } = await generateAIResponse(query);
      const botMsg: Message = {
        id: "bot-" + Date.now(),
        sender: "bot",
        text,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        actions,
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
      speakText(text);
    }, 650);
  };

  const handleActionClick = (action: { href?: string; actionId?: string }) => {
    if (action.href) {
      if (action.href.startsWith("#")) {
        const target = document.querySelector(action.href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
          setIsOpen(false);
        }
      } else if (action.href.startsWith("/")) {
        window.location.href = action.href;
      } else {
        window.open(action.href, "_blank", "noreferrer");
      }
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: "welcome-reset",
        sender: "bot",
        text: `Chat reset! How can I assist you with Hemavathi's portfolio today?`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        actions: [
          { label: "View Projects", href: "#work" },
          { label: "Check Resume", href: "/resume" },
          { label: "Contact Info", href: "#contact" },
        ],
      },
    ]);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-[65] flex items-center gap-3">
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden items-center gap-2 rounded-full border border-border bg-background/90 px-3.5 py-1.5 shadow-lg backdrop-blur-md md:flex"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="label-mono text-xs text-foreground">Chat with Hema AI</span>
          </motion.div>
        )}

        <motion.button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          className="relative flex h-14 w-14 items-center justify-center rounded-full border border-accent/40 bg-card/90 shadow-2xl backdrop-blur-md transition-shadow hover:border-accent hover:shadow-[0_0_25px_rgba(230,175,46,0.35)]"
          aria-label={isOpen ? "Close chat" : "Open chat with Hemavathi AI"}
        >
          {isOpen ? (
            <X className="h-6 w-6 text-foreground" />
          ) : (
            <div className="relative h-full w-full overflow-hidden rounded-full p-0.5">
              <img
                src={cloudinaryAssets.avatar}
                alt="Hemavathi Saidhu Avatar"
                className="h-full w-full rounded-full object-cover"
              />
              <span className="absolute bottom-0 right-0 block h-3.5 w-3.5 rounded-full border-2 border-background bg-emerald-500" />
            </div>
          )}
        </motion.button>
      </div>

      {/* Chat Window Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-4 z-[70] flex h-[min(620px,80vh)] w-[min(420px,94vw)] flex-col overflow-hidden rounded-2xl border border-border bg-background/95 shadow-2xl backdrop-blur-xl sm:right-6"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border bg-card/80 px-4 py-3 backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-full border border-accent/40">
                  <img
                    src={cloudinaryAssets.avatar}
                    alt="Hemavathi Saidhu"
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full border border-background bg-emerald-500" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 font-display text-lg leading-tight">
                    <span>Hemavathi AI</span>
                    <Sparkles className="h-3.5 w-3.5 text-accent" />
                  </div>
                  <div className="label-mono text-[10px] text-muted-foreground">
                    Online · Full Stack & AI Assistant
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 text-muted-foreground">
                <button
                  type="button"
                  onClick={() => setSoundEnabled((v) => !v)}
                  title={soundEnabled ? "Mute audio response" : "Enable voice speech"}
                  className="rounded p-1.5 hover:bg-muted hover:text-foreground"
                >
                  {soundEnabled ? <Volume2 className="h-4 w-4 text-accent" /> : <VolumeX className="h-4 w-4" />}
                </button>
                <button
                  type="button"
                  onClick={handleResetChat}
                  title="Reset conversation"
                  className="rounded p-1.5 hover:bg-muted hover:text-foreground"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  title="Close chat"
                  className="rounded p-1.5 hover:bg-muted hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 space-y-4 overflow-y-auto p-4">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex gap-2.5 ${m.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  {m.sender === "bot" ? (
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent">
                      <Bot className="h-4 w-4" />
                    </div>
                  ) : (
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-foreground/20 bg-muted text-foreground">
                      <User className="h-4 w-4" />
                    </div>
                  )}

                  <div className={`max-w-[82%] space-y-2`}>
                    <div
                      className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
                        m.sender === "user"
                          ? "rounded-tr-none bg-accent text-accent-foreground font-medium"
                          : "rounded-tl-none border border-border bg-card/90 text-foreground"
                      }`}
                    >
                      <div className="whitespace-pre-line">
                        {m.text.split("\n").map((line, idx) => {
                          // Support bold **text** and markdown-like display
                          const formatted = line.replace(
                            /\*\*(.*?)\*\*/g,
                            "<strong>$1</strong>"
                          );
                          return (
                            <span
                              key={idx}
                              dangerouslySetInnerHTML={{ __html: formatted }}
                              className="block"
                            />
                          );
                        })}
                      </div>
                    </div>

                    {/* Action chips attached to bot message */}
                    {m.actions && m.actions.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {m.actions.map((act, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => handleActionClick(act)}
                            className="inline-flex items-center gap-1 rounded-md border border-accent/40 bg-accent/10 px-2.5 py-1 label-mono text-[10px] text-accent transition-colors hover:bg-accent hover:text-accent-foreground"
                          >
                            <span>{act.label}</span>
                            <ChevronRight className="h-2.5 w-2.5" />
                          </button>
                        ))}
                      </div>
                    )}

                    <div
                      className={`label-mono text-[9px] text-muted-foreground ${
                        m.sender === "user" ? "text-right" : "text-left"
                      }`}
                    >
                      {m.time}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="rounded-2xl rounded-tl-none border border-border bg-card px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-accent [animation-delay:-0.3s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-accent [animation-delay:-0.15s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-accent" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompt Suggestions */}
            <div className="border-t border-border bg-card/40 px-3 py-2">
              <div className="no-scrollbar flex gap-1.5 overflow-x-auto pb-1">
                {QUICK_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => handleSend(prompt)}
                    className="shrink-0 rounded-full border border-foreground/15 bg-background/80 px-3 py-1 label-mono text-[11px] text-muted-foreground transition-colors hover:border-accent hover:text-accent"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2 border-t border-border bg-background p-3"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Hemavathi anything..."
                className="flex-1 rounded-lg border border-border bg-card px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-transform hover:scale-105 active:scale-95 disabled:pointer-events-none disabled:opacity-50"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

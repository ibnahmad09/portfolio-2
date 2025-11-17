"use client";
import { skills } from "@/lib/data";
import { useEffect, useMemo, useRef, useState } from "react";

const categoryTokens = {
  frontend: {
    accent: "#00B9D6",
    badge: "from-[#00B9D6] to-[#56E1FF]",
    glow: "shadow-[0_25px_55px_rgba(0,185,214,0.25)]",
    ring: "bg-gradient-to-br from-[#1F2A33] via-[#1B232A] to-[#12171B]",
    progress: "from-[#00B9D6] via-[#3CD1ED] to-[#56E1FF]",
  },
  backend: {
    accent: "#C57FFF",
    badge: "from-[#C57FFF] to-[#9B5BFF]",
    glow: "shadow-[0_25px_55px_rgba(197,127,255,0.25)]",
    ring: "bg-gradient-to-br from-[#261D33] via-[#1C1629] to-[#120F1A]",
    progress: "from-[#C57FFF] via-[#B070FF] to-[#8F4BFF]",
  },
};

const skillDetails: Record<
  string,
  { tagline: string; level: "Pemula" | "Menengah" | "Mahir" | "Ahli"; stacks: string[] }
> = {
  "HTML/CSS": {
    tagline: "UI responsif dan pixel-perfect",
    level: "Ahli",
    stacks: ["Flexbox", "Grid", "Animation"],
  },
  JavaScript: {
    tagline: "Logika interaktif dan SPA",
    level: "Mahir",
    stacks: ["ES6+", "Async", "DOM"],
  },
  React: {
    tagline: "Komponen modular & hooks",
    level: "Mahir",
    stacks: ["Hooks", "Context", "Next.js"],
  },
  Laravel: {
    tagline: "Back-end bisnis siap produksi",
    level: "Mahir",
    stacks: ["Eloquent", "API", "Blade"],
  },
  PHP: {
    tagline: "Service logic & integrasi",
    level: "Mahir",
    stacks: ["OOP", "Laravel", "REST"],
  },
  TypeScript: {
    tagline: "Kode aman dan terstruktur",
    level: "Mahir",
    stacks: ["Generics", "Types", "Interfaces"],
  },
  "Node.js": {
    tagline: "API realtime dan scalable",
    level: "Menengah",
    stacks: ["Express", "REST", "JWT"],
  },
  "Next.js": {
    tagline: "Fullstack React modern",
    level: "Menengah",
    stacks: ["SSR", "App Router", "SEO"],
  },
};

export default function Skills() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: "smooth" });
      setTimeout(checkScrollButtons, 320);
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: "smooth" });
      setTimeout(checkScrollButtons, 320);
    }
  };

  const handleScroll = () => {
    checkScrollButtons();
  };

  useEffect(() => {
    const handleResize = () => {
      checkScrollButtons();
    };

    checkScrollButtons();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cards = useMemo(
    () =>
      skills.map((skill) => {
        const detail =
          skillDetails[skill.name] ?? {
            tagline: "Solusi digital yang stabil",
            level: "Mahir" as const,
            stacks: ["Best Practice"],
          };
        const tokens = categoryTokens[skill.category as keyof typeof categoryTokens] ?? categoryTokens.frontend;

        return { skill, detail, tokens };
      }),
    []
  );

  return (
    <section
      id="skills"
      className="relative py-20 px-4 bg-gradient-to-br from-[#090B10] via-[#11141B] to-[#090B10] overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 right-0 w-72 h-72 bg-[#00B9D6]/30 blur-[140px]" />
        <div className="absolute -bottom-20 left-10 w-96 h-96 bg-[#C57FFF]/20 blur-[160px]" />
      </div>

      <div className="mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <p className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-white/10 text-xs uppercase tracking-[0.3em] text-white/60">
            STACK FAVORIT
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mt-6 mb-4 gradient-text">Skills & Expertise</h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Koleksi teknologi yang paling sering saya gunakan untuk membangun solusi digital end-to-end.
          </p>
        </div>

        <div className="relative">
          {showLeftButton && (
            <button
              onClick={scrollLeft}
              className="absolute -left-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#161B22]/80 border border-white/10 text-white/80 hover:text-white hover:bg-primary/50 transition-all duration-300 flex items-center justify-center backdrop-blur-xl"
              aria-label="Scroll kiri"
            >
              ←
            </button>
          )}

          {showRightButton && (
            <button
              onClick={scrollRight}
              className="absolute -right-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#161B22]/80 border border-white/10 text-white/80 hover:text-white hover:bg-primary/50 transition-all duration-300 flex items-center justify-center backdrop-blur-xl"
              aria-label="Scroll kanan"
            >
              →
            </button>
          )}

          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="flex gap-8 px-8" style={{ width: "max-content" }}>
              {cards.map(({ skill, detail, tokens }) => (
                <article key={skill.name} className="group relative min-w-[260px] max-w-[280px] snap-start">
                  <div
                    className={`relative overflow-hidden rounded-2xl border border-white/5 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:bg-white/5 ${tokens.glow}`}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div
                        className="absolute inset-0 blur-2xl opacity-60"
                        style={{ background: `linear-gradient(120deg, ${tokens.accent}, transparent)` }}
                      />
                    </div>

                    <div className="relative z-10 space-y-5">
                      <div className="flex items-start justify-between">
                        <div className={`w-14 h-14 rounded-2xl ${tokens.ring} flex items-center justify-center text-3xl`}>
                          {skill.icon}
                        </div>
                        <span
                          className={`px-3 py-1 text-xs rounded-full bg-gradient-to-r ${tokens.badge} text-black font-semibold`}
                        >
                          {skill.category}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-white mb-1">{skill.name}</h3>
                        <p className="text-sm text-white/70">{detail.tagline}</p>
                      </div>

                      <div className="flex items-center justify-between text-xs text-white/60 mb-2">
                        <span>Tingkat keahlian</span>
                        <span className="font-semibold text-white">{detail.level}</span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {detail.stacks.map((item) => (
                          <span
                            key={item}
                            className="px-2.5 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-white/70"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="absolute inset-x-10 -bottom-6 h-12 bg-gradient-to-r from-white/10 via-transparent to-white/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
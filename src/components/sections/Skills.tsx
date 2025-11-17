"use client";
import { skills } from "@/lib/data";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";

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

// Custom easing functions for natural movement
const easing = {
  easeOutQuart: [0.25, 0.46, 0.45, 0.94] as const,
  easeInOutCubic: [0.65, 0.05, 0.36, 1] as const,
  easeOutBack: [0.34, 1.56, 0.64, 1] as const,
  easeOutExpo: [0.16, 1, 0.3, 1] as const,
};

// Animation variants for different elements
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const headerVariants = {
  hidden: { 
    opacity: 0, 
    y: -60,
    scale: 0.8,
    rotateX: -15,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      duration: 1.2,
      ease: easing.easeOutExpo,
    },
  },
};

const cardVariants = {
  hidden: (index: number) => ({
    opacity: 0,
    y: 80,
    x: index % 2 === 0 ? -60 : 60,
    rotateY: index % 2 === 0 ? -25 : 25,
    scale: 0.7,
    filter: "blur(10px)",
  }),
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    rotateY: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease: easing.easeOutBack,
    },
  },
  hover: {
    y: -12,
    scale: 1.05,
    rotateY: 5,
    rotateX: 5,
    transition: {
      duration: 0.4,
      ease: easing.easeInOutCubic,
    },
  },
};

const iconVariants = {
  hidden: { 
    scale: 0,
    rotate: -180,
    opacity: 0,
  },
  visible: {
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: easing.easeOutBack,
      delay: 0.3,
    },
  },
  hover: {
    scale: 1.2,
    rotate: 360,
    transition: {
      duration: 0.6,
      ease: easing.easeOutBack,
    },
  },
};

const badgeVariants = {
  hidden: { 
    scale: 0,
    opacity: 0,
    rotate: -45,
  },
  visible: {
    scale: 1,
    opacity: 1,
    rotate: 0,
    transition: {
      duration: 0.6,
      ease: easing.easeOutBack,
      delay: 0.5,
    },
  },
};

const textVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: easing.easeOutQuart,
      delay: 0.6,
    },
  },
};

// Custom hook for scroll progress - simplified to avoid hydration issues
const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? scrolled / maxScroll : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Set initial value
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollProgress;
};

// Skill Card Component with 3D effects - simplified for SSR compatibility
const SkillCard = ({ skill, detail, tokens, index }: any) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { 
    once: true, 
    margin: "-100px",
    amount: 0.3 
  });
  
  const [isHovered, setIsHovered] = useState(false);
  
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <motion.article
      ref={cardRef}
      custom={index}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover="hover"
      variants={cardVariants}
      className="group relative min-w-[260px] max-w-[280px] snap-start"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
        rotateX: isHovered ? 5 : 0,
        rotateY: isHovered ? 5 : 0,
      }}
    >
      <motion.div
        className={`relative overflow-hidden rounded-2xl border border-white/5 p-6 transition-all duration-500 ${tokens.glow}`}
        style={{
          transform: "translateZ(20px)",
          background: `linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)`,
        }}
      >
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 0.6,
            rotate: 360
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        >
          <div
            className="absolute inset-0 blur-2xl"
            style={{ 
              background: `conic-gradient(from 0deg at 50% 50%, ${tokens.accent} 0%, transparent 60%, ${tokens.accent} 100%)`
            }}
          />
        </motion.div>

        <div className="relative z-10 space-y-5" style={{ transform: "translateZ(30px)" }}>
          <div className="flex items-start justify-between">
            <motion.div
              variants={iconVariants}
              className={`w-14 h-14 rounded-2xl ${tokens.ring} flex items-center justify-center text-3xl backdrop-blur-sm`}
              style={{
                boxShadow: `0 8px 32px ${tokens.accent}40`,
              }}
            >
              {skill.icon}
            </motion.div>
            <motion.span
              variants={badgeVariants}
              className={`px-3 py-1 text-xs rounded-full bg-gradient-to-r ${tokens.badge} text-black font-semibold backdrop-blur-sm`}
            >
              {skill.category}
            </motion.span>
          </div>

          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={textVariants}
          >
            <h3 className="text-xl font-semibold text-white mb-1">{skill.name}</h3>
            <p className="text-sm text-white/70">{detail.tagline}</p>
          </motion.div>

          <motion.div 
            className="flex items-center justify-between text-xs text-white/60 mb-2"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={textVariants}
            transition={{ delay: 0.7 }}
          >
            <span>Tingkat keahlian</span>
            <span className="font-semibold text-white">{detail.level}</span>
          </motion.div>

          <div className="flex flex-wrap gap-2">
            {detail.stacks.map((item: string, i: number) => (
              <motion.span
                key={item}
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ 
                  delay: 0.8 + (i * 0.1),
                  duration: 0.4,
                  ease: easing.easeOutBack
                }}
                className="px-2.5 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-white/70 backdrop-blur-sm hover:bg-white/10 transition-colors"
              >
                {item}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* 3D shadow effect */}
      <motion.div
        className="absolute inset-x-10 -bottom-6 h-12 bg-gradient-to-r from-white/10 via-transparent to-white/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ transform: "translateZ(-20px)" }}
      />
    </motion.article>
  );
};

export default function Skills() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  const scrollProgress = useScrollProgress();
  
  const isSectionInView = useInView(sectionRef, { 
    once: false, 
    margin: "-100px",
    amount: 0.2 
  });

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

  // Parallax effect for background elements (simplified)
  const parallaxY = -scrollProgress * 100;
  const parallaxX = scrollProgress * 50;

  return (
    <motion.section
      ref={sectionRef}
      id="skills"
      className="relative py-20 px-4 bg-gradient-to-br from-[#090B10] via-[#11141B] to-[#090B10] overflow-hidden"
      initial="hidden"
      animate={isSectionInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {/* Animated background elements with parallax */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y: parallaxY, x: 0 }}
      >
        <motion.div 
          className="absolute -top-32 right-0 w-72 h-72 bg-[#00B9D6]/30 blur-[140px]"
          initial={{ scale: 1, opacity: 0.3 }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute -bottom-20 left-10 w-96 h-96 bg-[#C57FFF]/20 blur-[160px]"
          style={{ x: parallaxX }}
          initial={{ scale: 1, opacity: 0.2 }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </motion.div>

      <div className="mx-auto max-w-6xl relative z-10">
        {/* Section Header with Animation */}
        <motion.div 
          className="text-center mb-16"
          variants={headerVariants}
        >
          <motion.p 
            className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-white/10 text-xs uppercase tracking-[0.3em] text-white/60"
            initial={{ scale: 0, opacity: 0 }}
            animate={isSectionInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6, ease: easing.easeOutBack }}
          >
            STACK FAVORIT
          </motion.p>
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mt-6 mb-4 gradient-text"
            initial={{ opacity: 0, y: 40, scale: 0.8 }}
            animate={isSectionInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ delay: 0.4, duration: 1, ease: easing.easeOutExpo }}
          >
            Skills & Expertise
          </motion.h2>
          <motion.p 
            className="text-lg text-muted max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={isSectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.8, ease: easing.easeOutQuart }}
          >
            Koleksi teknologi yang paling sering saya gunakan untuk membangun solusi digital end-to-end.
          </motion.p>
        </motion.div>

        <div className="relative">
          {/* Scroll Buttons with Animation */}
          <AnimatePresence>
            {showLeftButton && (
              <motion.button
                initial={{ opacity: 0, x: -20, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.8 }}
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollLeft}
                className="absolute -left-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#161B22]/80 border border-white/10 text-white/80 hover:text-white hover:bg-primary/50 transition-all duration-300 flex items-center justify-center backdrop-blur-xl"
                aria-label="Scroll kiri"
              >
                ←
              </motion.button>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showRightButton && (
              <motion.button
                initial={{ opacity: 0, x: 20, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.8 }}
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollRight}
                className="absolute -right-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#161B22]/80 border border-white/10 text-white/80 hover:text-white hover:bg-primary/50 transition-all duration-300 flex items-center justify-center backdrop-blur-xl"
                aria-label="Scroll kanan"
              >
                →
              </motion.button>
            )}
          </AnimatePresence>

          <motion.div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            initial={{ opacity: 0 }}
            animate={isSectionInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8, duration: 1 }}
          >
            <motion.div 
              className="flex gap-8 px-8" 
              style={{ width: "max-content" }}
              variants={containerVariants}
            >
              {cards.map(({ skill, detail, tokens }, index) => (
                <SkillCard
                  key={skill.name}
                  skill={skill}
                  detail={detail}
                  tokens={tokens}
                  index={index}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

    </motion.section>
  );
}

// Re-export for cleaner imports
export { Skills };
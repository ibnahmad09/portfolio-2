"use client";
import { useEffect, useRef, useState } from "react";
import { experiences } from "@/lib/data";

interface ExperienceCardProps {
  experience: typeof experiences[0];
  index: number;
  isLast: boolean;
  isVisible: boolean;
}

function ExperienceCard({ experience, index, isLast, isVisible }: ExperienceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible && cardRef.current) {
      const delay = index * 200;
      setTimeout(() => {
        cardRef.current?.classList.add("experience-card-revealed");
        // Add direction class based on index
        if (index % 2 === 0) {
          cardRef.current?.classList.add("experience-card-left");
        } else {
          cardRef.current?.classList.add("experience-card-right");
        }
        dotRef.current?.classList.add("experience-dot-revealed");
        if (lineRef.current) {
          lineRef.current.classList.add("experience-line-revealed");
        }
      }, delay);
    }
  }, [isVisible, index]);

  return (
    <div
      ref={cardRef}
      className="experience-card relative"
    >
      {/* Timeline Line - Only show if not last */}
      {!isLast && (
        <div 
          ref={lineRef}
          className="experience-line absolute left-5 md:left-6 top-16 md:top-20 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-secondary/30 to-transparent hidden md:block"
        />
      )}

      {/* Timeline Dot */}
      <div 
        ref={dotRef}
        className="experience-dot absolute left-0 top-6 w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-primary via-secondary to-accent border-4 border-background shadow-lg flex items-center justify-center z-10 transform hover:scale-110 transition-transform duration-300"
      >
        <span className="text-lg md:text-xl">{experience.icon}</span>
      </div>

      {/* Card */}
      <div className="ml-14 md:ml-20 mb-12">
        <div
          className="group relative p-6 rounded-xl bg-card/50 border border-border/30 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {/* Decorative background gradient on hover */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="relative z-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <div className="flex items-start gap-4">
                {/* Company Logo/Icon */}
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 flex items-center justify-center text-2xl flex-shrink-0">
                  {experience.logo}
                </div>

                <div>
                  <h3 className="text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-1">
                    {experience.position}
                  </h3>
                  <p className="text-base md:text-lg font-semibold text-primary/80">
                    {experience.company}
                  </p>
                </div>
              </div>

              {/* Period Badge */}
              <div className="flex items-center gap-2">
                <span className="px-3 py-1.5 md:px-4 md:py-2 rounded-lg bg-primary/10 border border-primary/30 text-primary text-xs md:text-sm font-medium">
                  {experience.period}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm md:text-base text-muted mb-4 leading-relaxed">
              {experience.description}
            </p>

            {/* Expandable Responsibilities */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                isExpanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="pt-4 border-t border-border/30">
                <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
                  Tanggung Jawab Utama:
                </h4>
                <ul className="space-y-2">
                  {experience.responsibilities.map((responsibility, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm text-muted"
                    >
                      <span className="text-primary mt-1.5 flex-shrink-0">
                        ✓
                      </span>
                      <span className="leading-relaxed">{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Toggle Button */}
            <button
              className="mt-4 flex items-center gap-2 text-primary hover:text-secondary transition-colors text-sm font-medium"
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
              aria-expanded={isExpanded}
              aria-label={isExpanded ? "Sembunyikan detail" : "Tampilkan detail"}
            >
              <span>{isExpanded ? "Sembunyikan Detail" : "Lihat Detail"}</span>
              <svg
                className={`w-4 h-4 transition-transform duration-300 ${
                  isExpanded ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            
            // Staggered animation untuk header
            setTimeout(() => {
              headerRef.current?.classList.add("experience-header-revealed");
            }, 0);
            
            setTimeout(() => {
              titleRef.current?.classList.add("experience-title-revealed");
            }, 150);
            
            setTimeout(() => {
              subtitleRef.current?.classList.add("experience-subtitle-revealed");
            }, 300);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-20 px-4 bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f] relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
      </div>

      <div className="mx-auto max-w-6xl relative z-10">
        {/* Header Section */}
        <div
          ref={headerRef}
          className="experience-header text-center mb-16"
        >
          <h2 
            ref={titleRef}
            className="experience-title text-4xl md:text-5xl font-bold mb-4 gradient-text"
          >
            Pengalaman Kerja
          </h2>
          <p 
            ref={subtitleRef}
            className="experience-subtitle text-lg md:text-xl text-muted max-w-3xl mx-auto leading-relaxed"
          >
            Perjalanan karir dan pengalaman profesional saya dalam dunia
            pengembangan web
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="relative">
          {/* Timeline Container */}
          <div className="relative">
            {experiences.map((experience, index) => (
              <ExperienceCard
                key={experience.id}
                experience={experience}
                index={index}
                isLast={index === experiences.length - 1}
                isVisible={isVisible}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


"use client";
import { skills } from "@/lib/data";
import { useRef, useState } from "react";

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
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
      setTimeout(checkScrollButtons, 300);
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
      setTimeout(checkScrollButtons, 300);
    }
  };

  const handleScroll = () => {
    checkScrollButtons();
  };

  return (
    <section id="skills" className="py-20 px-4 bg-gradient-to-br from-[#1E2126] to-[#191B1F]">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 gradient-text">Skills & Expertise</h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Technologies and tools I work with to bring ideas to life
          </p>
        </div>

        <div className="relative">
          {/* Left scroll button */}
          {showLeftButton && (
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-[#2A2E33] border border-[#3A3E43] text-[#00B9D6] hover:bg-[#00B9D6] hover:text-white transition-all duration-300 flex items-center justify-center shadow-xl"
            >
              ←
            </button>
          )}

          {/* Right scroll button */}
          {showRightButton && (
            <button
              onClick={scrollRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-[#2A2E33] border border-[#3A3E43] text-[#00B9D6] hover:bg-[#00B9D6] hover:text-white transition-all duration-300 flex items-center justify-center shadow-xl"
            >
              →
            </button>
          )}

          {/* Scrollable container */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="overflow-x-auto scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="flex gap-6 px-12" style={{ width: 'max-content' }}>
              {skills.map((skill) => (
                <div 
                  key={skill.name} 
                  className="group relative p-6 rounded-xl bg-[#2A2E33] border border-[#3A3E43] hover:border-[#00B9D6] transition-all duration-300 hover:scale-105 hover:shadow-xl min-w-[200px] w-[200px]"
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-16 h-16 flex items-center justify-center text-3xl text-[#00B9D6] group-hover:scale-110 transition-transform duration-300">
                      {skill.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-[#00B9D6] transition-colors duration-300">
                      {skill.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
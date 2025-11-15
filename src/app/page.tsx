"use client";
import { useEffect, useState } from "react";
import { Navigation, Hero, Skills, Projects, Contact, Footer } from "@/components";

export default function Home() {
  const [active, setActive] = useState<string>("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("id");
          if (!id) return;
          if (entry.isIntersecting) {
            setActive(id);
            entry.target.classList.add("in");
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0.01 }
    );

    const ids = ["home", "skills", "projects", "contact"];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        el.classList.add("reveal");
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) {
      document.querySelectorAll<HTMLElement>(".reveal").forEach((el) => {
        el.style.transition = "none";
      });
    }
  }, []);

  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <a href="#home" className="skip-link">Skip to main content</a>

      <Navigation active={active} scrollTo={scrollTo} />
      
      <main>
        <Hero scrollTo={scrollTo} />
        <Skills />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

"use client";

import { navItems } from "@/lib/data";
import { useEffect, useState } from "react";
import type { MouseEvent } from "react";

interface NavigationProps {
  active: string;
  scrollTo: (id: string) => (e: MouseEvent) => void;
}

export default function Navigation({ active, scrollTo }: NavigationProps) {
  const contactSection = navItems.find((item) => item.id === "contact");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [active]);

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-border/50 backdrop-blur-sm supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto max-w-6xl px-4 py-3">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/50 text-background shadow-lg">
                <span className="text-lg font-semibold">AAM</span>
                <span className="absolute -right-1 -bottom-1 h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-ring ring-2 ring-background" />
              </div>
              <div>
                <p className="text-base font-semibold tracking-tight text-foreground">
                  Aditya Ahmad Mulyana
                </p>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  Portfolio 2025
                </p>
              </div>
            </div>

            <button
              type="button"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-border/60 bg-card text-foreground shadow-sm transition hover:border-primary hover:text-primary focus-ring md:hidden"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            >
              <span
                className={`relative h-4 w-4 before:absolute before:inset-x-0 before:-top-2 before:h-0.5 before:bg-current before:transition after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-current after:transition ${
                  isMobileMenuOpen ? "before:translate-y-2 after:-translate-y-2" : ""
                }`}
              >
                <span className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-current transition" />
              </span>
            </button>
          </div>

          <div className="flex flex-1 items-center justify-between gap-3">
            <div className="hidden flex-1 items-center justify-center gap-1 rounded-full border border-border/70 bg-card/60 px-2 py-1 shadow-inner md:flex">
              {navItems.map((item) => {
                const isActive = active === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={scrollTo(item.id)}
                    className={`flex-1 rounded-full px-4 py-2 text-sm font-medium transition-all focus-ring ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {contactSection && (
              <a
                href={`#${contactSection.id}`}
                onClick={scrollTo(contactSection.id)}
                className="hidden shrink-0 rounded-full border border-primary/50 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary/20 focus-ring md:inline-flex"
              >
                Let’s Talk
              </a>
            )}
          </div>

          <div
            className={`md:hidden ${isMobileMenuOpen ? "grid" : "hidden"} gap-2 rounded-2xl border border-border/60 bg-card/80 p-3 shadow-xl`}
          >
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={scrollTo(item.id)}
                  className={`w-full rounded-xl px-4 py-2.5 text-left text-sm font-medium transition focus-ring ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}

            {contactSection && (
              <a
                href={`#${contactSection.id}`}
                onClick={scrollTo(contactSection.id)}
                className="w-full rounded-xl border border-primary/60 bg-primary/10 px-4 py-2.5 text-center text-sm font-semibold text-primary transition hover:bg-primary/20 focus-ring"
              >
                Let’s Talk
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
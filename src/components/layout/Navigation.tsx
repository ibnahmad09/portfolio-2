"use client";
import { navItems } from "@/lib/data";

interface NavigationProps {
  active: string;
  scrollTo: (id: string) => (e: React.MouseEvent) => void;
}

export default function Navigation({ active, scrollTo }: NavigationProps) {
  return (
    <nav className="fixed top-0 w-full z-50 glass">
      <div className="mx-auto max-w-6xl px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
              <span className="font-semibold text-lg">Portofolio</span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={scrollTo(item.id)}
                className={`text-sm font-medium transition-colors hover:text-primary focus-ring ${
                  active === item.id ? "text-primary" : "text-muted"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
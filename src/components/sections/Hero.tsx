"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface HeroProps {
  scrollTo: (id: string) => (e: React.MouseEvent) => void;
}

export default function Hero({ scrollTo }: HeroProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const greetingRef = useRef<HTMLParagraphElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            
            // Staggered animation untuk setiap elemen
            const elements = [
              { ref: greetingRef, delay: 0 },
              { ref: nameRef, delay: 150 },
              { ref: titleRef, delay: 300 },
              { ref: descRef, delay: 450 },
              { ref: buttonsRef, delay: 600 },
              { ref: statsRef, delay: 750 },
            ];

            elements.forEach(({ ref, delay }) => {
              if (ref.current) {
                setTimeout(() => {
                  ref.current?.classList.add("hero-revealed");
                }, delay);
              }
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      icon: "💼",
      value: "1+",
      label: "Tahun Pengalaman",
    },
    {
      icon: "🚀",
      value: "3",
      label: "Proyek Selesai",
    },
    {
      icon: "💬",
      value: "24/7",
      label: "Support",
    },
  ];

  return (
    <section 
      id="home" 
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-4 py-20 bg-gradient-to-br from-background via-[#0f0f0f] to-[#1a1a1a] relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
      </div>

      <div className="mx-auto max-w-7xl w-full relative z-10">
        {/* Main Hero Content - Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Column - Text Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <p 
                ref={greetingRef}
                className="hero-greeting text-lg md:text-xl text-accent font-medium"
              >
                Hi, Saya
              </p>
              <h1 
                ref={nameRef}
                className="hero-name text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
              >
                <span className="gradient-text hero-name-gradient">Aditya Ahmad</span>
                <br />
                <span className="text-foreground">Mulyana</span>
              </h1>
              <h2 
                ref={titleRef}
                className="hero-title text-2xl md:text-3xl lg:text-4xl font-semibold text-muted"
              >
                Full Stack Developer & UI/UX Enthusiast
              </h2>
              <p 
                ref={descRef}
                className="hero-description text-base md:text-lg text-muted leading-relaxed max-w-xl"
              >
                Saya menciptakan pengalaman digital yang indah, fungsional, dan berpusat pada pengguna. 
                Passion terhadap transformasi ide menjadi kenyataan melalui kode yang bersih dan desain yang penuh pertimbangan.
              </p>
            </div>

            {/* Action Buttons */}
            <div 
              ref={buttonsRef}
              className="hero-buttons flex flex-col sm:flex-row gap-4 pt-4"
            >
              <a
                href="/cv.pdf"
                download
                className="btn-primary px-8 py-4 rounded-lg font-medium text-white focus-ring text-center inline-flex items-center justify-center"
              >
                Download CV
              </a>
              <a
                href="#contact"
                onClick={scrollTo("contact")}
                className="px-8 py-4 rounded-lg border-2 border-border hover:border-primary hover:bg-primary/10 transition-all duration-300 focus-ring text-center inline-flex items-center justify-center font-medium"
              >
                Hubungi Saya
              </a>
            </div>
          </div>

          {/* Right Column - Image/Visual */}
          <div 
            ref={imageRef}
            className="hero-image relative"
          >
            <div className="relative w-full max-w-lg mx-auto">
              {/* Decorative circle behind image - Pink/Secondary color like Dora template */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-full max-w-[500px] max-h-[500px] rounded-full bg-gradient-to-br from-secondary/30 via-primary/20 to-accent/20 blur-3xl animate-pulse"></div>
              </div>
              
              {/* Main image container */}
              <div className="relative z-10">
                {/* Profile Image */}
                <div className="relative w-full max-w-md mx-auto">
                  {/* Image container */}
                  <div className="relative z-10">
                    <div className="relative w-full max-w-[400px] md:max-w-[500px] mx-auto aspect-[3/4]">
                      <Image
                        src="/images/profile.png"
                        alt="Aditya Ahmad Mulyana"
                        width={500}
                        height={667}
                        className="w-full h-full object-contain"
                        priority
                        quality={95}
                      />
                    </div>
                  </div>
                </div>

                {/* Floating decorative elements */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-secondary/40 rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/30 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div 
          ref={statsRef}
          className="hero-stats grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="group relative p-6 rounded-xl bg-card/50 border border-border/30 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 backdrop-blur-sm"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-white/5 border-2 border-primary/30 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:border-primary transition-all duration-300">
                  {stat.icon}
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {stat.value}
                  </h3>
                  <p className="text-sm md:text-base text-muted group-hover:text-foreground/80 transition-colors">
                    {stat.label}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

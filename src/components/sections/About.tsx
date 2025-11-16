"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
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

  const features = [
    {
      icon: "💡",
      title: "Problem Solver",
      description: "Saya senang memecahkan masalah kompleks dengan solusi yang kreatif dan efisien",
    },
    {
      icon: "🎨",
      title: "Design Enthusiast",
      description: "Passion terhadap UI/UX design untuk menciptakan pengalaman pengguna yang luar biasa",
    },
    {
      icon: "⚡",
      title: "Fast Learner",
      description: "Selalu bersemangat mempelajari teknologi baru dan meningkatkan skill secara terus-menerus",
    },
    {
      icon: "🤝",
      title: "Team Player",
      description: "Berkolaborasi dengan baik dalam tim untuk mencapai tujuan bersama",
    },
  ];

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-20 px-4 bg-gradient-to-br from-background via-[#0f0f0f] to-[#1a1a1a] relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
      </div>

      <div className="mx-auto max-w-6xl relative z-10">
        {/* Header Section */}
        <div 
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Tentang Saya
          </h2>
          <p className="text-lg md:text-xl text-muted max-w-3xl mx-auto leading-relaxed">
            Seorang Full Stack Developer yang berdedikasi untuk menciptakan solusi digital yang inovatif dan user-friendly
          </p>
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          {/* Left Column - Visual/Image */}
          <div 
            className={`transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="relative">
              {/* Main Image Container */}
              <div className="relative w-full max-w-md mx-auto">
                {/* Decorative background */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full max-w-[450px] max-h-[450px] rounded-full bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 blur-3xl animate-pulse"></div>
                </div>
                
                {/* Image container with decorative frame */}
                <div className="relative z-10 transform hover:scale-105 transition-transform duration-300">
                  <div className="relative w-full max-w-[400px] md:max-w-[450px] mx-auto aspect-[3/4]">
                    {/* Decorative border/shape behind image */}
                    <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/30 blur-2xl opacity-60"></div>
                    
                    {/* Image container */}
                    <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-border/30">
                      <Image
                        src="/images/about.jpg"
                        alt="Aditya Ahmad Mulyana - About"
                        width={450}
                        height={600}
                        className="w-full h-full object-cover"
                        quality={95}
                      />
                      
                      {/* Subtle gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent"></div>
                    </div>
                  </div>
                </div>

                {/* Floating decorative elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/30 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-secondary/30 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>
          </div>

          {/* Right Column - Text Content */}
          <div 
            className={`transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <div className="space-y-6">
              <div className="prose prose-invert max-w-none">
                <p className="text-lg text-foreground/90 leading-relaxed mb-4">
                  Halo! Saya <span className="text-primary font-semibold">Aditya Ahmad Mulyana</span>, seorang Fresh Graduate yang memiliki semangat belajar yang tinggi dan passion yang mendalam terhadap pengembangan web modern dan desain antarmuka pengguna.
                </p>
                <p className="text-base text-muted leading-relaxed mb-4">
                Individu yang berdisiplin tinggi dan betanggung jawab dengan latar belakang di bidang sistem informasi yang memiliki semangat belajar yang tinggi, disiplin serta mampu bekerja dengan tim.
                </p>
                <p className="text-base text-muted leading-relaxed">
                Memiliki pengalaman dalam pembuatan website menggunakan framework Laravel. Memiliki keterampilan dalam perancangan website, serta penguasaan dalam penggunaan framework Laravel, Git, dan Github.
                </p>
              </div>

              {/* Stats or Highlights */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border/50">
                <div className="text-center p-4 rounded-lg bg-card/50 border border-border/30 hover:border-primary/50 transition-colors">
                  <div className="text-3xl font-bold text-primary mb-1">1+</div>
                  <div className="text-sm text-muted">Tahun Pengalaman</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-card/50 border border-border/30 hover:border-primary/50 transition-colors">
                  <div className="text-3xl font-bold text-secondary mb-1">3</div>
                  <div className="text-sm text-muted">Proyek Selesai</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div 
          className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-6 rounded-xl bg-card/50 border border-border/30 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


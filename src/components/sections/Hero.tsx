interface HeroProps {
  scrollTo: (id: string) => (e: React.MouseEvent) => void;
}

export default function Hero({ scrollTo }: HeroProps) {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4">
      <div className="mx-auto max-w-6xl text-center">
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center mb-6">
            <span className="text-white font-bold text-4xl">AAM</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
              Hi, Saya <span className="gradient-text">Aditya Ahmad Mulyana</span>
            </h1>
          <p className="text-xl md:text-2xl text-muted mb-8 max-w-3xl mx-auto">
            Full Stack Developer & UI/UX Enthusiast
          </p>
          <p className="text-lg text-muted mb-12 max-w-2xl mx-auto">
            I create beautiful, functional, and user-centered digital experiences. Passionate about turning ideas into reality through clean code and thoughtful design.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#projects"
              onClick={scrollTo("projects")}
              className="btn-primary px-8 py-3 rounded-lg font-medium text-white focus-ring"
            >
              View My Work
            </a>
            <a
              href="#contact"
              onClick={scrollTo("contact")}
              className="px-8 py-3 rounded-lg border border-border hover:bg-card transition-colors focus-ring"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
import Image from "next/image";
import { useEffect, useState } from "react";
import { projects } from "@/lib/data";

type Preview = { title: string; image: string };

export default function Projects() {
  const [preview, setPreview] = useState<Preview | null>(null);

  useEffect(() => {
    if (!preview) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setPreview(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [preview]);

  return (
    <section id="projects" className="py-20 px-4 bg-card/50">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 gradient-text">Project yang Dikerjakan</h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            A selection of my recent work showcasing various skills and technologies
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.title} className="bg-card rounded-xl overflow-hidden border border-border card-hover group">
              <button
                type="button"
                className="relative block w-full aspect-video min-h-[180px] overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                onClick={() => setPreview({ title: project.title, image: project.image })}
                aria-label={`Perbesar gambar ${project.title}`}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={false}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/55" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 text-black text-sm font-semibold shadow-lg">
                    <span>Lihat Detail</span>
                    <span className="text-lg">↗</span>
                  </div>
                </div>
              </button>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-muted mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={`${project.title}-${tech}-${index}`}
                      className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="text-sm text-muted">Source code tersedia berdasarkan permintaan.</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {preview && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center px-4"
          role="dialog"
          aria-modal="true"
          aria-label={`Pratinjau ${preview.title}`}
          onClick={() => setPreview(null)}
        >
          <div
            className="relative w-full max-w-5xl rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#05070D] via-[#0A0F1F] to-[#05070D] shadow-[0_45px_140px_rgba(0,0,0,0.55)]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setPreview(null)}
              aria-label="Tutup pratinjau"
              className="absolute top-4 right-4 z-10 w-11 h-11 rounded-full bg-white/10 text-white text-xl hover:bg-white/20 transition-colors backdrop-blur-sm"
            >
              ✕
            </button>
            <div className="relative w-full h-[65vh] min-h-[360px]">
              <Image src={preview.image} alt={preview.title} fill className="object-contain" sizes="100vw" priority />
              <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/70 to-transparent text-left">
                <h3 className="text-2xl font-semibold text-white">{preview.title}</h3>
                <p className="text-white/80 text-sm">Klik di luar area atau tekan Esc untuk menutup.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
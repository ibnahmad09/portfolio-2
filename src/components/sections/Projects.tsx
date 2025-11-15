import { projects } from "@/lib/data";

export default function Projects() {
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
            <div key={project.title} className="bg-card rounded-xl overflow-hidden border border-border card-hover">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <div className="w-20 h-20 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">{project.icon}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-muted mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <a
                    href={project.demo}
                    className="text-primary hover:text-primary-light transition-colors font-medium"
                  >
                    Live Demo →
                  </a>
                  <a
                    href={project.source}
                    className="text-muted hover:text-primary transition-colors font-medium"
                  >
                    Source Code →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
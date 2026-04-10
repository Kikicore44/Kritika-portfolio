import { useEffect, useRef, useState } from "react";

const projects = [
  { title: "E-Commerce Platform", tech: "React", desc: "A modern shopping experience with smooth animations and responsive design.", color: "from-purple-500/20 to-violet-500/20" },
  { title: "Weather Dashboard", tech: "TypeScript", desc: "Real-time weather data visualization with beautiful charts and maps.", color: "from-blue-500/20 to-cyan-500/20" },
  { title: "Task Manager", tech: "React", desc: "A productivity app with drag-and-drop, filters, and dark mode.", color: "from-amber-500/20 to-orange-500/20" },
  { title: "Portfolio Template", tech: "HTML/CSS", desc: "A clean, minimal portfolio template with smooth scroll animations.", color: "from-pink-500/20 to-rose-500/20" },
];

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`sticky transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
      style={{ top: `${120 + index * 40}px` }}
    >
      <div className={`bg-gradient-to-br ${project.color} bg-card border border-border rounded-2xl p-8 md:p-12 max-w-4xl mx-auto`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <h3 className="text-xl md:text-2xl font-heading font-bold text-foreground">{project.title}</h3>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30">{project.tech}</span>
        </div>
        <p className="text-muted-foreground leading-relaxed">{project.desc}</p>
      </div>
    </div>
  );
};

const ProjectsSection = () => (
  <section className="px-6 py-20">
    <h2 className="text-4xl md:text-6xl font-heading font-bold text-center text-foreground mb-4">MY WEB CREATIONS</h2>
    <div className="w-12 h-1 bg-primary mx-auto mb-20 rounded-full" />
    <div className="space-y-8 max-w-4xl mx-auto pb-40">
      {projects.map((project, i) => (
        <ProjectCard key={i} project={project} index={i} />
      ))}
    </div>
  </section>
);

export default ProjectsSection;

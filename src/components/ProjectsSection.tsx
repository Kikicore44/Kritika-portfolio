import { useEffect, useRef, useState } from "react";

const projects = [
  { title: "E-Commerce Platform", tech: "React", desc: "A modern shopping experience with smooth animations and responsive design.", color: "from-blue-600/20 to-cyan-500/20", rotate: "-2deg" },
  { title: "Weather Dashboard", tech: "TypeScript", desc: "Real-time weather data visualization with beautiful charts and maps.", color: "from-sky-600/20 to-blue-500/20", rotate: "1.5deg" },
  { title: "Task Manager", tech: "React", desc: "A productivity app with drag-and-drop, filters, and dark mode.", color: "from-indigo-600/20 to-blue-500/20", rotate: "-1deg" },
  { title: "Portfolio Template", tech: "HTML/CSS", desc: "A clean, minimal portfolio template with smooth scroll animations.", color: "from-teal-600/20 to-cyan-500/20", rotate: "2deg" },
];

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
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
      style={{
        top: `${120 + index * 40}px`,
        transform: isVisible ? `rotate(${project.rotate})` : undefined,
        zIndex: index + 1,
      }}
    >
      <div
        className={`bg-gradient-to-br ${project.color} bg-black/40 backdrop-blur-sm border border-border/30 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto relative overflow-hidden cursor-pointer transition-all duration-300 ${isHovered ? 'scale-[1.02] shadow-2xl' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="w-full h-40 md:h-56 rounded-xl bg-background/30 border border-border/50 mb-6 flex items-center justify-center overflow-hidden">
          <div className="text-6xl opacity-30">🖥️</div>
        </div>

        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <h3 className="text-xl md:text-2xl font-heading font-bold text-foreground">{project.title}</h3>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30">{project.tech}</span>
        </div>

        <div
          className={`transition-all duration-500 overflow-hidden ${isHovered ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <p className="text-muted-foreground leading-relaxed pt-2">{project.desc}</p>
        </div>
      </div>
    </div>
  );
};

const ProjectsSection = () => (
  <section className="px-6 pt-12 pb-8">
    <div className="max-w-4xl mx-auto rounded-2xl bg-black/40 backdrop-blur-sm border border-border/30 p-8 md:p-12 mb-8">
      <h2 className="text-4xl md:text-6xl font-heading font-bold text-center text-foreground mb-4">MY PROJECTS</h2>
      <div className="w-12 h-1 bg-primary mx-auto rounded-full" />
    </div>
    <div className="space-y-8 max-w-4xl mx-auto pb-[60vh]">
      {projects.map((project, i) => (
        <ProjectCard key={i} project={project} index={i} />
      ))}
    </div>
  </section>
);

export default ProjectsSection;

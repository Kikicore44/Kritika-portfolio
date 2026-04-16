import { useEffect, useRef, useState } from "react";
import { toolLogos } from "./toolLogos";

const tools = [
  { name: "HTML", desc: "Standard Markup Language" },
  { name: "CSS", desc: "Cascading Style Sheets" },
  { name: "JavaScript", desc: "Dynamic Web Scripting" },
  { name: "Python", desc: "Versatile Programming Language" },
  { name: "React", desc: "Component-based UI Library" },
  { name: "Node.js", desc: "Server-side JS Runtime" },
  { name: "MySql", desc: "Relational Database System" },
  { name: "Figma", desc: "Collaborative UI/UX Design Tool" },
  { name: "Canva", desc: "Online Graphic Design Platform" },
];

const ToolCard = ({ tool, index }: { tool: typeof tools[0]; index: number }) => {
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
      className={`flex items-center gap-4 p-4 rounded-xl bg-black/40 backdrop-blur-sm border border-border/30 hover:border-primary/30 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <img
        src={toolLogos[tool.name]}
        alt={tool.name + " logo"}
        className="w-12 h-12 object-contain rounded"
        style={{ minWidth: 48, minHeight: 48 }}
      />
      <div>
        <p className="font-heading font-bold text-foreground text-sm">{tool.name}</p>
        <p className="text-xs text-muted-foreground">{tool.desc}</p>
      </div>
    </div>
  );
};

const ToolsStack = () => (
  <section className="px-6 py-20">
    <div className="max-w-5xl mx-auto p-8 md:p-12">
      <h2 className="text-4xl md:text-6xl font-heading font-bold text-center text-foreground mb-4">TOOLS & STACK</h2>
      <div className="w-12 h-1 bg-primary mx-auto mb-16 rounded-full" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool, i) => (
          <ToolCard key={i} tool={tool} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default ToolsStack;

import { useEffect, useRef, useState } from "react";

const tools = [
  { name: "HTML", desc: "Standard Markup Language", icon: "🌐" },
  { name: "CSS", desc: "Style Sheet Language", icon: "🎨" },
  { name: "JavaScript", desc: "Web Scripting Language", icon: "⚡" },
  { name: "TypeScript", desc: "Typed JavaScript", icon: "📘" },
  { name: "React", desc: "Frontend UI Library", icon: "⚛️" },
  { name: "Node.js", desc: "JS Runtime Environment", icon: "🟢" },
  { name: "Vite", desc: "Next Generation Bundler", icon: "🔥" },
  { name: "Tailwind CSS", desc: "Utility-First CSS", icon: "💨" },
  { name: "GitHub", desc: "Version Control Platform", icon: "🐙" },
  { name: "Figma", desc: "Design Tool", icon: "🎯" },
  { name: "Next.js", desc: "React Framework", icon: "▲" },
  { name: "Framer Motion", desc: "Animation Library", icon: "✨" },
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
      className={`flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <span className="text-2xl">{tool.icon}</span>
      <div>
        <p className="font-heading font-bold text-foreground text-sm">{tool.name}</p>
        <p className="text-xs text-muted-foreground">{tool.desc}</p>
      </div>
    </div>
  );
};

const ToolsStack = () => (
  <section className="px-6 py-20">
    <h2 className="text-4xl md:text-6xl font-heading font-bold text-center text-foreground mb-4">TOOLS & STACK</h2>
    <div className="w-12 h-1 bg-primary mx-auto mb-16 rounded-full" />
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
      {tools.map((tool, i) => (
        <ToolCard key={i} tool={tool} index={i} />
      ))}
    </div>
  </section>
);

export default ToolsStack;

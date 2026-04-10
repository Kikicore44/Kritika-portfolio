import { useEffect, useRef, useState } from "react";

const timeline = [
  {
    year: "2026",
    desc: "Pushing boundaries with modern frontend frameworks and creative web experiences.",
    items: [
      { title: "Interactive Portfolio", tag: "React", tagColor: "bg-blue-500/20 text-blue-400" },
      { title: "Design System Library", tag: "TypeScript", tagColor: "bg-cyan-500/20 text-cyan-400" },
    ],
  },
  {
    year: "2025",
    desc: "Leveling up with full-stack development and production-ready web applications.",
    items: [
      { title: "E-Commerce Platform", tag: "React", tagColor: "bg-blue-500/20 text-blue-400" },
      { title: "Weather App", tag: "JavaScript", tagColor: "bg-yellow-500/20 text-yellow-400" },
      { title: "Task Manager", tag: "TypeScript", tagColor: "bg-cyan-500/20 text-cyan-400" },
    ],
  },
  {
    year: "2024",
    desc: "Started learning web development fundamentals and building first projects.",
    items: [
      { title: "First Portfolio", tag: "HTML/CSS", tagColor: "bg-orange-500/20 text-orange-400" },
      { title: "Landing Pages", tag: "HTML/CSS", tagColor: "bg-orange-500/20 text-orange-400" },
    ],
  },
];

const TimelineEntry = ({ entry, index }: { entry: typeof timeline[0]; index: number }) => {
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
      className={`flex gap-8 md:gap-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="flex flex-col items-center">
        <div className="w-3 h-3 rounded-full bg-primary glow-purple" />
        <div className="w-0.5 flex-1 bg-gradient-to-b from-primary/50 to-transparent" />
      </div>
      <div className="pb-16 flex-1">
        <h3 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">{entry.year}</h3>
        <p className="text-muted-foreground mb-6 max-w-xl">{entry.desc}</p>
        <div className="space-y-3">
          {entry.items.map((item, i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-4 hover:border-primary/30 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="font-heading font-bold text-foreground text-sm">{item.title}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${item.tagColor}`}>{item.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const TimelineSection = () => (
  <section className="px-6 py-20">
    <div className="max-w-3xl mx-auto">
      {timeline.map((entry, i) => (
        <TimelineEntry key={i} entry={entry} index={i} />
      ))}
    </div>
  </section>
);

export default TimelineSection;

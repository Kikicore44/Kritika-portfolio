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

const TimelineEntry = ({ entry, index, isActive }: { entry: typeof timeline[0]; index: number; isActive: boolean }) => {
  const [visibleItems, setVisibleItems] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive) { setVisibleItems(0); return; }
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setVisibleItems(count);
      if (count >= entry.items.length + 2) clearInterval(interval);
    }, 200);
    return () => clearInterval(interval);
  }, [isActive, entry.items.length]);

  return (
    <div
      ref={ref}
      className={`flex gap-8 md:gap-16 transition-all duration-700 ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
    >
      <div className="flex flex-col items-center relative">
        <div className={`w-4 h-4 rounded-full border-2 transition-all duration-500 ${isActive ? 'bg-primary border-primary glow-blue scale-125' : 'bg-card border-border'}`} />
        <div className="w-0.5 flex-1 bg-gradient-to-b from-primary/50 to-transparent" />
      </div>
      <div className="pb-16 flex-1">
        <h3 className={`text-4xl md:text-5xl font-heading font-bold mb-4 transition-all duration-500 ${visibleItems >= 1 ? 'text-foreground translate-x-0' : 'text-muted-foreground -translate-x-4'}`}>
          {entry.year}
        </h3>
        <p className={`text-muted-foreground mb-6 max-w-xl transition-all duration-500 delay-100 ${visibleItems >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {entry.desc}
        </p>
        <div className="space-y-3">
          {entry.items.map((item, i) => (
            <div
              key={i}
              className={`bg-card border border-border rounded-xl p-4 hover:border-primary/30 transition-all duration-500 ${visibleItems >= i + 3 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
            >
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

const TimelineSection = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      for (let i = 0; i < timeline.length; i++) {
        const el = refs.current[i];
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.6) {
          setActiveIndex(i);
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="px-6 py-20">
      <div className="max-w-3xl mx-auto">
        {timeline.map((entry, i) => (
          <div key={i} ref={(el) => { refs.current[i] = el; }}>
            <TimelineEntry entry={entry} index={i} isActive={i <= activeIndex} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default TimelineSection;

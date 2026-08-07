import { useEffect, useRef, useState } from "react";

const timeline = [
  {
    year: "2026",
    desc: "Building advanced real-world applications with modern frameworks, AI integration, and fast-paced innovation through hackathons and projects",
    items: [
      { title: "QA Engineer Intern (Websoft Technology Nepal Pvt. Ltd.,Ongoing) — Gaining practical experience in real-world web application testing and developing a stronger understanding of software quality assurance.", tag: "Internship", tagColor: "bg-green-500/20 text-green-400" },
      { title: "Gandaki Province Hackathon 2026 Winner(Code For Change) — Developed Lumo, a digital mental wellness platform focused on promoting mental well-being through interactive and engaging features.", tag: "Hackathon", tagColor: "bg-purple-500/20 text-purple-400" },
      { title: "InnoHack 2026 — Developed a Trekking Safety App under time constraints in a team, focusing on real-time decision-making and safety for trekkers.", tag: "Hackathon", tagColor: "bg-purple-500/20 text-purple-400" },
      { title: "Period Tracking App — Built a React-based application with AI integration to improve user interaction and personalized insights.", tag: "React/AI", tagColor: "bg-blue-500/20 text-blue-400" },
      { title: "Portfolio Website — Designed and developed my first modern portfolio using Tailwind CSS to showcase projects and skills.", tag: "Tailwind CSS", tagColor: "bg-cyan-500/20 text-cyan-400" },
    ],
  },
  {
    year: "2025",
    desc: "Strengthening core development skills through internships, full-stack projects, hackathons, and collaborative real-world learning experiences.",
    items: [
      { title: "Junior Developer Intern (PathSutra,8 months) — Started working on real-world web development tasks and improving frontend/backend understanding.", tag: "Internship", tagColor: "bg-green-500/20 text-green-400" },
      { title: "Nobel Learning PBC(4 months) — Gained experience in different fields, global collaboration, and pitching ideas.", tag: "Internship", tagColor: "bg-green-500/20 text-green-400" },
      { title: "Gym Management System — Built a desktop-based system to manage gym operations using Java.", tag: "Java", tagColor: "bg-yellow-700/20 text-yellow-600" },
      { title: "WeCare Skincare System — Developed a terminal-based e-commerce system for skincare product management.", tag: "Python", tagColor: "bg-blue-700/20 text-blue-600" },
      { title: "UI/UX Design — Started designing prototype websites such as e-commerce and hotel booking systems.", tag: "Figma", tagColor: "bg-pink-500/20 text-pink-400" },
      { title: "ICP Experience & ICP Elevate 2025 — Improved teamwork, leadership, and communication skills.", tag: "Volunteer", tagColor: "bg-indigo-500/20 text-indigo-400" },
      { title: "UNESCO Youth Hackathon 2025 — Participated in an international hackathon and worked in a team under pressure for the first time.", tag: "Hackathon", tagColor: "bg-purple-500/20 text-purple-400" },
    ],
  },
  {
    year: "2024",
    desc: "Exploring the fundamentals of programming, web development, and design while building first projects and gaining technical confidence.",
    items: [
      { title: "First Website — Built a smartwatch e-commerce website with a team as my first web development project.", tag: "HTML/CSS/JavaScript", tagColor: "bg-orange-500/20 text-orange-400" },
      { title: "Logo Design — Started creating branding designs for TikTok pages and presentations.", tag: "Canva", tagColor: "bg-blue-400/20 text-blue-400" },
      { title: "ING Skill Academy — Developed communication and leadership skills through volunteering activities.", tag: "Volunteer", tagColor: "bg-indigo-500/20 text-indigo-400" },
    ],
  },
];

const TimelineEntry = ({ entry, index, isActive }: { entry: typeof timeline[0]; index: number; isActive: boolean }) => {
  const [visibleItems, setVisibleItems] = useState(0);

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
      className={`flex gap-8 md:gap-16 transition-all duration-700 ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
    >
      <div className="flex flex-col items-center relative">
        <div className={`w-4 h-4 rounded-full border-2 transition-all duration-500 ${isActive ? 'bg-primary border-primary glow-blue scale-125' : 'bg-black/40 border-border'}`} />
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
              className={`bg-black/40 backdrop-blur-sm border border-border/30 rounded-xl p-4 hover:border-primary/30 transition-all duration-500 ${visibleItems >= i + 3 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="font-heading font-bold text-foreground text-sm">
                  {item.title.split('—')[0].trim()}
                </span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${item.tagColor}`}>{item.tag}</span>
              </div>
              {item.title.includes('—') && (
                <div className="text-xs text-muted-foreground mt-1 ml-6">
                  {item.title.split('—').slice(1).join('—').trim()}
                </div>
              )}
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
      <div className="max-w-3xl mx-auto p-8 md:p-12">
        <h2 className="text-4xl md:text-6xl font-heading font-bold text-center text-foreground mb-4">EXPERIENCE</h2>
        <div className="w-12 h-1 bg-primary mx-auto mb-16 rounded-full" />
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

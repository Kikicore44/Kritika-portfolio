import { useEffect, useRef, useState } from "react";

const words = "As a passionate Frontend Developer, I enjoy creating modern and visually engaging web experiences that feel smooth, interactive, and meaningful. I focus on clean design and intuitive user interaction, always trying to make things simple yet impactful. For me, every project is an opportunity to turn ideas into creative digital experiences that people can connect with. I’m constantly exploring new ways to improve and bring more creativity into my work.".split(" ");

const AboutSection = () => {
  const [activeWordIndex, setActiveWordIndex] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;

      const start = windowHeight * 0.8;
      const end = -sectionHeight * 0.3;
      const progress = Math.max(0, Math.min(1, (start - sectionTop) / (start - end)));
      setActiveWordIndex(Math.floor(progress * words.length));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="about" ref={ref} className="min-h-[80vh] flex flex-col items-center justify-center px-6 py-10">
      {/* Dark card container */}
      <div
        className="w-full max-w-4xl mx-auto rounded-2xl p-8 md:p-14"
        style={{
          background: "linear-gradient(135deg, rgba(4,10,28,0.92) 0%, rgba(6,14,36,0.88) 100%)",
          border: "1px solid rgba(59,130,246,0.18)",
          boxShadow: "0 8px 48px 0 rgba(10,42,92,0.45), 0 1.5px 0 0 rgba(59,130,246,0.10) inset",
          backdropFilter: "blur(18px)",
        }}
      >
        <h2 className="text-4xl md:text-6xl font-heading font-bold text-foreground mb-4 text-center">ABOUT ME</h2>
        <div className="w-12 h-1 bg-primary mx-auto mb-10 rounded-full" />
        <p className="text-xl md:text-3xl lg:text-4xl font-heading font-bold leading-relaxed text-center">
          {words.map((word, i) => (
            <span
              key={i}
              className="inline-block mr-2 transition-all duration-500"
              style={{
                color: i <= activeWordIndex ? "hsl(0, 0%, 95%)" : "hsl(220, 15%, 30%)",
                transform: i <= activeWordIndex ? "translateY(0)" : "translateY(4px)",
              }}
            >
              {word}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
};

export default AboutSection;

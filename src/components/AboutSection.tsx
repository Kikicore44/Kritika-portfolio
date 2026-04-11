import { useEffect, useRef, useState } from "react";

const words = "As a passionate frontend developer, I build fully functional websites with advanced effects and modern designs, focusing on creativity, usability, and a smooth user experience. I love transforming ideas into beautiful, interactive digital experiences.".split(" ");

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

      // Start revealing when section enters viewport, finish before it leaves
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
    <section id="about" ref={ref} className="min-h-[150vh] flex flex-col items-center justify-center px-6 py-16">
      <h2 className="text-4xl md:text-6xl font-heading font-bold text-foreground mb-4">ABOUT ME</h2>
      <div className="w-12 h-1 bg-primary mx-auto mb-16 rounded-full" />
      <p className="text-xl md:text-3xl lg:text-4xl font-heading font-bold leading-relaxed max-w-4xl text-center">
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
    </section>
  );
};

export default AboutSection;

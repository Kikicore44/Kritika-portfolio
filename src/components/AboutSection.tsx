import { useEffect, useRef, useState } from "react";

const words = "As a passionate frontend developer, I build fully functional websites with advanced effects and modern designs, focusing on creativity, usability, and a smooth user experience. I love transforming ideas into beautiful, interactive digital experiences.".split(" ");

const AboutSection = () => {
  const [activeWordIndex, setActiveWordIndex] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (rect.height + window.innerHeight * 0.5)));
      setActiveWordIndex(Math.floor(progress * words.length));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="about" ref={ref} className="min-h-[120vh] flex flex-col items-center justify-center px-6 py-32">
      <h2 className="text-4xl md:text-6xl font-heading font-bold text-foreground mb-4">ABOUT ME</h2>
      <div className="w-12 h-1 bg-primary mx-auto mb-16 rounded-full" />
      <p className="text-xl md:text-3xl lg:text-4xl font-heading font-bold leading-relaxed max-w-4xl text-center">
        {words.map((word, i) => (
          <span
            key={i}
            className="transition-colors duration-300 mr-2"
            style={{ color: i <= activeWordIndex ? "hsl(var(--foreground))" : "hsl(var(--text-dim))" }}
          >
            {word}
          </span>
        ))}
      </p>
    </section>
  );
};

export default AboutSection;

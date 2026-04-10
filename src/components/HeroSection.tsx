import { useEffect, useRef, useState } from "react";
import profilePhoto from "@/assets/profile-photo.jpg";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="min-h-screen flex items-center px-6 md:px-16 lg:px-24 py-20">
      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        <div className={`flex-1 transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
          <p className="text-sm md:text-base text-muted-foreground mb-2">Hello, I'm</p>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-foreground mb-4 tracking-tight">
            KRITIKA<br />GURUNG
          </h2>
          <div className="typing-animation text-xl md:text-3xl font-heading text-primary mb-6">
            Frontend Developer
          </div>
          <p className="text-muted-foreground max-w-md leading-relaxed">
            From crafting beautiful interfaces to building real-world applications.
            Passionate about turning creative ideas into functional code.
          </p>
        </div>

        <div className={`flex-shrink-0 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
          <div className="animate-swing">
            <div className="relative w-64 md:w-72 rounded-2xl bg-card border border-border overflow-hidden glow-purple">
              <div className="bg-gradient-to-b from-primary/30 to-primary/10 p-4 text-center">
                <h3 className="font-heading font-bold text-lg text-foreground">Kritika Gurung</h3>
                <p className="text-xs text-muted-foreground">Aspiring Web Developer</p>
              </div>
              <div className="p-4">
                <img
                  src={profilePhoto}
                  alt="Kritika Gurung"
                  className="w-full aspect-square object-cover rounded-xl"
                  width={512}
                  height={640}
                />
              </div>
              <div className="px-4 pb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <div>
                    <p className="text-xs font-medium text-foreground">@kritika</p>
                    <p className="text-[10px] text-muted-foreground">Online</p>
                  </div>
                </div>
                <button className="text-[10px] px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30">
                  Contact Me
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

import { useEffect, useRef, useState } from "react";
import profilePhoto from "@/assets/profile-photo.jpg";

const HeroIntro = () => {
  const [bgOpacity, setBgOpacity] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isSwinging, setIsSwinging] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setBgOpacity(1), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / (sectionHeight * 0.5)));
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCardClick = () => {
    setIsSwinging(false);
    requestAnimationFrame(() => setIsSwinging(true));
    setTimeout(() => setIsSwinging(false), 1500);
  };

  const textScale = 1 - scrollProgress * 0.5;
  const textX = -scrollProgress * 30;
  const textAlign = scrollProgress > 0.3 ? "left" : "center";
  const cardOpacity = Math.min(1, scrollProgress * 2);
  const cardX = 100 - scrollProgress * 100;
  const welcomeOpacity = 1 - scrollProgress * 3;

  return (
    <section ref={sectionRef} className="relative min-h-[200vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Background - black to blue glow transition */}
        <div className="absolute inset-0 bg-background" />
        <div
          className="absolute inset-0 transition-opacity duration-[3000ms]"
          style={{ opacity: bgOpacity }}
        >
          {/* Blue glow effect like reference */}
          <div className="absolute top-0 left-1/4 w-[600px] h-[500px] bg-primary/30 rounded-full blur-[150px]" />
          <div className="absolute top-10 left-1/3 w-[400px] h-[400px] bg-accent/20 rounded-full blur-[120px]" />
          <div className="absolute top-0 right-1/3 w-[300px] h-[300px] bg-primary/15 rounded-full blur-[100px]" />
        </div>

        {/* ID Card Lanyard - hung from top right */}
        <div
          className="absolute right-8 md:right-20 lg:right-32 top-0 z-20 flex flex-col items-center transition-all duration-500"
          style={{ opacity: cardOpacity, transform: `translateX(${cardX}px)` }}
        >
          {/* Lanyard string */}
          <div className="w-0.5 bg-gradient-to-b from-foreground/60 to-foreground/20" style={{ height: '90px' }} />
          {/* Clip */}
          <div className="w-6 h-4 rounded-b-sm bg-muted-foreground/40 border border-border/50 flex items-center justify-center">
            <div className="w-3 h-1.5 rounded-sm bg-muted-foreground/60" />
          </div>
          
          {/* ID Card */}
          <div
            onClick={handleCardClick}
            className={`cursor-pointer mt-1 ${isSwinging ? 'animate-swing-click' : 'animate-swing'}`}
            style={{ transformOrigin: 'top center' }}
          >
            <div className="relative w-48 md:w-56 rounded-xl bg-card border border-border overflow-hidden glow-blue shadow-2xl">
              {/* Card header */}
              <div className="bg-gradient-to-b from-primary/30 to-primary/10 p-3 text-center border-b border-border/30">
                <h3 className="font-heading font-bold text-sm text-foreground">Kritika Gurung</h3>
                <p className="text-[10px] text-muted-foreground">Aspiring Web Developer</p>
              </div>
              {/* Photo */}
              <div className="p-3">
                <img
                  src={profilePhoto}
                  alt="Kritika Gurung"
                  className="w-full aspect-[3/4] object-cover rounded-lg"
                  width={512}
                  height={682}
                />
              </div>
              {/* Footer */}
              <div className="px-3 pb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <div>
                    <p className="text-[10px] font-medium text-foreground">@kritika</p>
                    <p className="text-[8px] text-muted-foreground">Online</p>
                  </div>
                </div>
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30">
                  Contact Me
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main text */}
        <div
          className="relative z-10 px-6 w-full max-w-7xl mx-auto transition-all duration-300"
          style={{
            transform: `scale(${textScale}) translateX(${textX}%)`,
            textAlign: textAlign as any,
          }}
        >
          <p
            className="text-xl md:text-2xl text-muted-foreground mb-2 animate-fade-in italic"
            style={{ animationDelay: "0.5s" }}
          >
            Hello, I'm
          </p>
          <h1
            className="text-6xl md:text-8xl lg:text-[10rem] font-heading font-extrabold text-foreground mb-4 animate-fade-in leading-[0.9] tracking-tight"
            style={{ animationDelay: "1s" }}
          >
            KRITIKA<br />GURUNG
          </h1>
          {/* Welcome text - fades out on scroll */}
          <p
            className="text-lg md:text-2xl text-foreground/70 font-heading animate-fade-in transition-opacity duration-300"
            style={{ animationDelay: "1.5s", opacity: Math.max(0, welcomeOpacity) }}
          >
            Welcome to my Portfolio Website
          </p>
          
          {scrollProgress > 0.2 && (
            <div className="typing-animation text-xl md:text-3xl font-heading text-primary mb-4 mt-4">
              Frontend Developer
            </div>
          )}
          {scrollProgress > 0.4 && (
            <p className="text-muted-foreground max-w-md leading-relaxed animate-fade-in text-base md:text-lg">
              From crafting beautiful interfaces to building real-world applications.
              Passionate about turning creative ideas into functional code.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroIntro;

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
        {/* Background - black to deep navy */}
        <div className="absolute inset-0 bg-[#020810]" />
        <div
          className="absolute inset-0 transition-opacity duration-[3000ms]"
          style={{ opacity: bgOpacity }}
        >
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 40%, #0a2a5c 0%, #061535 40%, #020810 80%)'
          }} />
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(ellipse 60% 50% at 30% 30%, #0d3470 0%, transparent 60%)'
          }} />
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(ellipse 50% 40% at 70% 60%, #08204a 0%, transparent 60%)'
          }} />
        </div>

        {/* ID Card Lanyard */}
        <div
          className="absolute right-8 md:right-20 lg:right-32 top-0 z-20 flex flex-col items-center transition-all duration-500"
          style={{ opacity: cardOpacity, transform: `translateX(${cardX}px)` }}
        >
          <div className="w-0.5 bg-gradient-to-b from-foreground/60 to-foreground/20" style={{ height: '90px' }} />
          <div className="w-6 h-4 rounded-b-sm bg-muted-foreground/40 border border-border/50 flex items-center justify-center">
            <div className="w-3 h-1.5 rounded-sm bg-muted-foreground/60" />
          </div>
          <div
            onClick={handleCardClick}
            className={`cursor-pointer mt-1 ${isSwinging ? 'animate-swing-click' : 'animate-swing'}`}
            style={{ transformOrigin: 'top center' }}
          >
            <div className="relative w-48 md:w-56 rounded-xl bg-card border border-border overflow-hidden glow-blue shadow-2xl">
              <div className="bg-gradient-to-b from-primary/30 to-primary/10 p-3 text-center border-b border-border/30">
                <h3 className="font-heading font-bold text-sm text-foreground">Kritika Gurung</h3>
                <p className="text-[10px] text-muted-foreground">Aspiring Web Developer</p>
              </div>
              <div className="p-3">
                <img src={profilePhoto} alt="Kritika Gurung" className="w-full aspect-[3/4] object-cover rounded-lg" width={512} height={682} />
              </div>
              <div className="px-3 pb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <div>
                    <p className="text-[10px] font-medium text-foreground">@kritika</p>
                    <p className="text-[8px] text-muted-foreground">Online</p>
                  </div>
                </div>
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30">Contact Me</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main text - huge bold condensed like reference */}
        <div
          className="relative z-10 px-6 w-full max-w-7xl mx-auto transition-all duration-300"
          style={{
            transform: `scale(${textScale}) translateX(${textX}%)`,
            textAlign: textAlign as any,
          }}
        >
          <p
            className="text-2xl md:text-3xl lg:text-4xl text-muted-foreground mb-4 animate-fade-in"
            style={{ animationDelay: "0.5s", fontFamily: "'Outfit', sans-serif", fontWeight: 500, letterSpacing: '0.02em' }}
          >
            Hello, I'm
          </p>
          <h1
            className="font-extrabold text-foreground mb-6 animate-fade-in leading-[0.95] uppercase"
            style={{
              animationDelay: "1s",
              fontFamily: "'Bebas Neue', 'Syne', sans-serif",
              fontSize: 'clamp(5rem, 15vw, 14rem)',
              letterSpacing: '0.04em',
            }}
          >
            KRITIKA<br />GURUNG
          </h1>
          <p
            className="text-xl md:text-3xl lg:text-4xl text-foreground/70 animate-fade-in transition-opacity duration-300"
            style={{
              animationDelay: "1.5s",
              opacity: Math.max(0, welcomeOpacity),
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 400,
              letterSpacing: '0.01em',
            }}
          >
            Welcome to my portfolio website
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

import { lazy, Suspense, useEffect, useRef, useState } from "react";

const IdCard3D = lazy(() => import("@/components/IdCard3D"));

const HERO_ROLES = ["UI/UX Designer", "Frontend Developer", "Web Developer"] as const;

const HeroIntro = () => {
  const [bgOpacity, setBgOpacity] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);

  // Sequential reveal: 0=none, 1=hello, 2=name, 3=welcome
  const [revealStep, setRevealStep] = useState(0);

  const sectionRef = useRef<HTMLDivElement>(null);

  // Background fade-in
  useEffect(() => {
    const timer = setTimeout(() => setBgOpacity(1), 300);
    return () => clearTimeout(timer);
  }, []);

  // Sequential text animation timers
  useEffect(() => {
    const t1 = setTimeout(() => setRevealStep(1), 400);   // Hello, I'm
    const t2 = setTimeout(() => setRevealStep(2), 1000);  // KRITIKA GURUNG
    const t3 = setTimeout(() => setRevealStep(3), 1800);  // Welcome...
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  // Scroll progress
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight;
      if (!sectionHeight) {
        setScrollProgress(0);
        return;
      }
      const progress = Math.max(0, Math.min(1, -rect.top / (sectionHeight * 0.5)));
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Desktop detection
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();

    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", update);
      return () => mq.removeEventListener("change", update);
    }

    mq.addListener(update);
    return () => mq.removeListener(update);
  }, []);

  const showHeroRoles = scrollProgress > 0.2;

  // Cycle hero roles after scroll reveals this block
  useEffect(() => {
    if (!showHeroRoles) {
      setRoleIndex(0);
      return;
    }
    const id = window.setInterval(() => {
      setRoleIndex((i) => (i + 1) % HERO_ROLES.length);
    }, 4500);
    return () => window.clearInterval(id);
  }, [showHeroRoles]);

  // Text starts viewport-centered; shifts left modestly when ID card appears (breathing room, not a huge gap)
  const maxShiftVw = isDesktop ? 13 : 0;
  const shiftVw = isDesktop ? Math.min(scrollProgress * maxShiftVw * 2.2, maxShiftVw) : 0;
  const textAlign = isDesktop && scrollProgress > 0.28 ? "left" : "center";

  // ID card hidden at hero start; fades + slides in as user scrolls the intro section
  const cardOpacity = Math.min(1, scrollProgress * 2);
  const cardX = 100 - scrollProgress * 100;
  const cardInteractive = scrollProgress > 0.12;

  // Welcome text fades out on scroll
  const welcomeOpacity = Math.max(0, 1 - scrollProgress * 4);

  return (
    <section ref={sectionRef} className="relative min-h-[200vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-x-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-[#020810]" />
        <div
          className="absolute inset-0 transition-opacity duration-[3000ms]"
          style={{ opacity: bgOpacity }}
        >
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 40%, #0a2a5c 0%, #061535 40%, #020810 80%)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 50% at 30% 30%, #0d3470 0%, transparent 60%)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 40% at 70% 60%, #08204a 0%, transparent 60%)" }} />
        </div>

        {/* 3D ID badge: same top-right placement; wider strip = larger canvas for smoother cursor drag */}
        <div
          className="absolute top-0 right-0 h-full z-20 w-[min(96vw,580px)] sm:w-[min(680px,65vw)] md:w-[min(760px,62vw)] lg:w-[min(840px,58vw)] xl:w-[min(920px,56vw)] pointer-events-none"
          style={{ opacity: cardOpacity, transform: `translateX(${cardX}px)`, transition: "opacity 0.5s, transform 0.5s" }}
        >
          <div
            className={`h-full w-full pr-0 sm:pr-1 md:pr-2 [filter:drop-shadow(0_28px_56px_rgba(0,0,0,0.55))] ${cardInteractive ? "pointer-events-auto" : "pointer-events-none"}`}
            aria-label="3D ID badge — drag to move"
          >
            <Suspense
              fallback={<div className="h-full w-full min-h-[50vh] rounded-xl bg-white/[0.04] ring-1 ring-white/10 animate-pulse" />}
            >
              <IdCard3D className="h-full w-full" />
            </Suspense>
          </div>
        </div>

        {/* Text block — flex-centered so the name is not optically pulled right; shifts left slightly when card shows */}
        <div className="absolute inset-0 z-10 flex items-center justify-center px-6 pointer-events-none">
          <div
            className={`pointer-events-auto w-full max-w-3xl flex flex-col transition-transform duration-300 ease-out ${
              isDesktop && scrollProgress > 0.28 ? "items-start text-left" : "items-center text-center"
            }`}
            style={{
              transform: isDesktop ? `translateX(-${shiftVw}vw)` : undefined,
              textAlign: textAlign as "left" | "center",
            }}
          >

            {/* 1st: Hello, I'm */}
            <p
              className="text-2xl md:text-3xl lg:text-4xl text-muted-foreground mb-4 w-full"
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 500,
                letterSpacing: "0.02em",
                opacity: revealStep >= 1 ? 1 : 0,
                transform: revealStep >= 1 ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
              }}
            >
              Hello, I&apos;m
            </p>

            {/* 2nd: KRITIKA GURUNG — slightly smaller than before */}
            <h1
              className="font-extrabold text-foreground mb-6 leading-[0.95] uppercase w-full max-w-[min(100%,20ch)]"
              style={{
                fontFamily: "'Bebas Neue', 'Syne', sans-serif",
                fontSize: "clamp(3.25rem, 10.5vw, 11.5rem)",
                letterSpacing: "0.04em",
                opacity: revealStep >= 2 ? 1 : 0,
                transform: revealStep >= 2 ? "translateY(0)" : "translateY(30px)",
                transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
              }}
            >
              KRITIKA
              <br />
              GURUNG
            </h1>

            {/* 3rd: Welcome */}
            {scrollProgress < 0.12 && (
              <p
                className="text-xl md:text-3xl lg:text-4xl text-foreground/70 w-full"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 400,
                  letterSpacing: "0.01em",
                  opacity: revealStep >= 3 ? welcomeOpacity : 0,
                  transform: revealStep >= 3 ? "translateY(0)" : "translateY(20px)",
                  transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
                }}
              >
                Welcome to my portfolio website
              </p>
            )}

            {/* After scroll: typing-style role line (cycles; leads with UI/UX Designer) */}
            {scrollProgress > 0.2 && (
              <div
                key={HERO_ROLES[roleIndex]}
                className="typing-animation typing-animation-roles text-xl md:text-3xl font-heading text-primary mb-4 mt-4 w-full"
              >
                {HERO_ROLES[roleIndex]}
              </div>
            )}

            {/* After scroll: tagline */}
            {scrollProgress > 0.4 && (
              <p
                className={`text-muted-foreground leading-relaxed text-base md:text-lg animate-fade-in w-full ${isDesktop ? "max-w-md" : "max-w-xl mx-auto"}`}
              >
                From crafting beautiful interfaces to building real-world applications.
                Passionate about turning creative ideas into functional code.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroIntro;

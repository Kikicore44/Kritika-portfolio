import { useEffect, useState } from "react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroIntro = () => {
  const [bgOpacity, setBgOpacity] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setBgOpacity(1), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 transition-opacity duration-[3000ms]"
        style={{ opacity: bgOpacity }}
      >
        <img src={heroBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/60" />
      </div>
      <div className="relative z-10 text-center px-6">
        <p className="text-lg md:text-xl text-muted-foreground mb-4 animate-fade-in" style={{ animationDelay: "0.5s" }}>
          Hello, I'm
        </p>
        <h1 className="text-4xl md:text-7xl lg:text-8xl font-heading font-bold text-foreground mb-6 animate-fade-in" style={{ animationDelay: "1s" }}>
          KRITIKA GURUNG
        </h1>
        <p className="text-lg md:text-2xl text-muted-foreground animate-fade-in" style={{ animationDelay: "1.5s" }}>
          Welcome to my Portfolio Website
        </p>
      </div>
    </section>
  );
};

export default HeroIntro;

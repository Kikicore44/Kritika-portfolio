import Navbar from "@/components/Navbar";
import HeroIntro from "@/components/HeroIntro";
import ScrollingMarquee from "@/components/ScrollingMarquee";
import ProjectsSection from "@/components/ProjectsSection";
import AboutSection from "@/components/AboutSection";
import ToolsStack from "@/components/ToolsStack";
import TimelineSection from "@/components/TimelineSection";
import ReachOutMarquee from "@/components/ReachOutMarquee";
import ContactSection from "@/components/ContactSection";

const Index = () => (
  <div id="home" className="min-h-screen relative">
    {/* Global background matching hero */}
    <div className="fixed inset-0 z-0 bg-[#020810]">
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
    <div className="relative z-10">
      <Navbar />
      <HeroIntro />
      <ScrollingMarquee />
      <ProjectsSection />
      <AboutSection />
      <ToolsStack />
      <TimelineSection />
      <ReachOutMarquee />
      <ContactSection />
      <footer className="py-8 text-center text-muted-foreground text-sm border-t border-border/30">
        © 2026 Kritika Gurung. All rights reserved.
      </footer>
    </div>
  </div>
);

export default Index;

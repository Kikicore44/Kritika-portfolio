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
  <div id="home" className="bg-background min-h-screen">
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
);

export default Index;

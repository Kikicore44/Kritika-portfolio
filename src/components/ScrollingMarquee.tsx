const items = ["DESIGNER", "WEB DEVELOPER", "UI/UX DESIGNER", "FRONTEND DEVELOPER"];

const ScrollingMarquee = () => (
  <section className="py-12 overflow-hidden border-y border-border/30 bg-black/30 backdrop-blur-sm">
    <div className="animate-marquee flex whitespace-nowrap">
      {[...items, ...items, ...items, ...items].map((item, i) => (
        <span key={i} className="flex items-center gap-6 mx-6">
          <span className="text-2xl md:text-4xl font-heading font-bold text-foreground/80 tracking-wider">
            {item}
          </span>
          <span className="text-primary text-2xl">✦</span>
        </span>
      ))}
    </div>
  </section>
);

export default ScrollingMarquee;

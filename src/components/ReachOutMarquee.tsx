const items = ["REACH OUT TODAY", "LET'S WORK TOGETHER", "REACH OUT TODAY", "LET'S WORK TOGETHER"];

const ReachOutMarquee = () => (
  <section className="py-12 overflow-hidden">
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

export default ReachOutMarquee;

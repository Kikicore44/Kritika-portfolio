import { useState } from "react";

const socials = [
  { name: "GitHub", handle: "github.com/kritika", icon: "🐙" },
  { name: "LinkedIn", handle: "linkedin.com/in/kritika", icon: "💼" },
  { name: "Instagram", handle: "@kritika", icon: "📸" },
  { name: "Facebook", handle: "Kritika Gurung", icon: "👤" },
  { name: "Discord", handle: "kritika#0001", icon: "🎮" },
];

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  return (
    <section id="contact" className="px-6 py-20">
      <h2 className="text-4xl md:text-6xl font-heading font-bold text-center text-foreground mb-4">GET IN TOUCH</h2>
      <div className="w-12 h-1 bg-primary mx-auto mb-6 rounded-full" />
      <p className="text-center text-muted-foreground mb-16 max-w-md mx-auto">
        Have a project in mind or just want to say hi? I'd love to hear from you.
      </p>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-2 gap-4">
            <input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none transition-colors"
            />
            <input
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none transition-colors"
            />
          </div>
          <input
            placeholder="Subject"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none transition-colors"
          />
          <textarea
            placeholder="Message"
            rows={5}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none transition-colors resize-none"
          />
          <button className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-heading font-bold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
            ✈ Send Message
          </button>
        </form>

        <div className="space-y-4">
          {socials.map((social) => (
            <div
              key={social.name}
              className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors cursor-pointer"
            >
              <span className="text-2xl">{social.icon}</span>
              <div>
                <p className="font-heading font-bold text-foreground text-sm">{social.name}</p>
                <p className="text-xs text-muted-foreground">{social.handle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

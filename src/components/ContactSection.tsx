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
      {/* Dark card — same style as About Me */}
      <div
        className="max-w-5xl mx-auto rounded-2xl p-8 md:p-12"
        style={{
          background: "linear-gradient(135deg, rgba(4,10,28,0.92) 0%, rgba(6,14,36,0.88) 100%)",
          border: "1px solid rgba(59,130,246,0.18)",
          boxShadow: "0 8px 48px 0 rgba(10,42,92,0.45), 0 1.5px 0 0 rgba(59,130,246,0.10) inset",
          backdropFilter: "blur(18px)",
        }}
      >
        <h2 className="text-4xl md:text-6xl font-heading font-bold text-center text-foreground mb-4">GET IN TOUCH</h2>
        <div className="w-12 h-1 bg-primary mx-auto mb-6 rounded-full" />
        <p className="text-center text-slate-300 mb-12 max-w-md mx-auto">
          Have a project in mind or just want to say hi? I'd love to hear from you.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <input
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="bg-white/[0.12] border border-white/20 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-slate-400 focus:border-primary/60 focus:ring-1 focus:ring-primary/30 focus:outline-none transition-colors"
              />
              <input
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="bg-white/[0.12] border border-white/20 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-slate-400 focus:border-primary/60 focus:ring-1 focus:ring-primary/30 focus:outline-none transition-colors"
              />
            </div>
            <input
              placeholder="Subject"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="w-full bg-white/[0.12] border border-white/20 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-slate-400 focus:border-primary/60 focus:ring-1 focus:ring-primary/30 focus:outline-none transition-colors"
            />
            <textarea
              placeholder="Message"
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full bg-white/[0.12] border border-white/20 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-slate-400 focus:border-primary/60 focus:ring-1 focus:ring-primary/30 focus:outline-none transition-colors resize-none"
            />
            <button className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-heading font-bold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
              ✈ Send Message
            </button>
          </form>

          <div className="space-y-4">
            {socials.map((social) => (
              <div
                key={social.name}
                className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.1] border border-white/18 hover:bg-white/[0.16] hover:border-primary/40 transition-colors cursor-pointer"
              >
                <span className="text-2xl">{social.icon}</span>
                <div>
                  <p className="font-heading font-bold text-foreground text-sm">{social.name}</p>
                  <p className="text-xs text-slate-300">{social.handle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

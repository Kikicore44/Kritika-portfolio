const Navbar = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-glass rounded-full px-2 py-2 flex gap-1">
        {[
          { label: "Home", id: "home" },
          { label: "About", id: "about" },
          { label: "Contact", id: "contact" },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className="px-5 py-2 rounded-full text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-primary/20 transition-all duration-300"
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;

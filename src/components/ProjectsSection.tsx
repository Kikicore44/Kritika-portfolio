import { useEffect, useRef, useState } from "react";

const projects = [
  { title: "Watch E-commerce Website", tech: "HTML/CSS/Javascript", desc: "A responsive watch showcase website developed using HTML, CSS, and JavaScript. It presents products in a clean and organized layout with interactive elements for better user engagement. The design focuses on smooth navigation and a modern shopping experience. This project helped build a strong foundation in front-end development and UI structuring.", color: "from-indigo-600/20 to-blue-500/20", rotate: "-1.5deg", image: "src/assets/Watch website.png" },
  { title: "Gym Management System", tech: "Java", desc: "A desktop-based gym management system built using Java with an object-oriented approach. It allows managing member details, attendance, and membership status efficiently. The system is designed to reduce manual work and organize records in a structured way. This project improved understanding of classes, objects, and GUI-based application design.", color: "from-indigo-600/20 to-blue-500/20", rotate: "0deg", image: "src/assets/Gym.png" },
  { title: "Gokyo Bistro Website", tech: "Figma", desc: "A restaurant website designed in Figma with a focus on clean layout and appealing food presentation. The design highlights menu sections, branding, and user-friendly navigation. Visual consistency and modern UI elements are used throughout. This project enhanced skills in designing for real-world business scenarios.", color: "from-indigo-600/20 to-blue-500/20", rotate: "1.5deg", image: "src/assets/Gokyo Bistro.jpg" },
  { title: "Mini Basketball IOT Game", tech: "C/C++,HTML/CSS/Node.js", desc: "A mini basketball game built using IoT concepts, integrating hardware components(jumper wires[male to male, male to female and female to female], Esp-32, Leds,Lcd) and ultrasonic sensors. The system detects actions such as scoring which is shown in both led and website and interacts with the environment in real time. The Audrino IDE was used to program the code in C/C++ for the Esp-32 and the website was developed to enter the player data and to show live scoring. It demonstrates how physical devices and software can work together. This project introduced practical knowledge of embedded systems and automation.", color: "from-indigo-600/20 to-blue-500/20", rotate: "0deg", image: "src/assets/iot.jpg" },
  { title: "Cycle Track AI App", tech: "React", desc: "A web-based period tracking application developed using React with a clean and simple interface which is integrated with AI for the summary, assitant to chat and to summarize the data . It allows users to record and track cycle-related data efficiently. The design focuses on usability and smooth interaction. This project improved skills in component-based development and front-end frameworks.", color: "from-indigo-600/20 to-blue-500/20", rotate: "-1.5deg", image: "src/assets/Cycle track ai.png" },
  { title: "Trekking Safety App", tech: "Tailwind CSS", desc: "A trekking safety web application designed using Tailwind CSS with a responsive and modern UI. It focuses on helping users make safer decisions during trekking through clear information display. The layout is optimized for mobile-first usage. This project strengthened skills in responsive design and utility-first CSS.", color: "from-indigo-600/20 to-blue-500/20", rotate: "0deg", image: "src/assets/Trek safe app.png" },
  { title: "Portfolio Template", tech: "HTML/Tailwind CSS", desc: "A personal portfolio website developed using Tailwind CSS to showcase projects and skills. It features a modern design with smooth animations and responsive layout. The structure is optimized for clarity and easy navigation. This project helped in combining design and development into a professional presentation.", color: "from-indigo-600/20 to-blue-500/20", rotate: "1.5deg", image: "src/assets/Portfolio.png" },
];

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`sticky transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
      style={{
        top: `${120 + index * 40}px`,
        transform: isVisible ? `rotate(${project.rotate})` : undefined,
        zIndex: index + 1,
      }}
    >
      <div className="max-w-5xl mx-auto px-6 md:px-0">
      <div
        className={`bg-gradient-to-br ${project.color} bg-black backdrop-blur-sm border border-border/30 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${isHovered ? 'scale-[1.02] shadow-2xl' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex flex-col md:flex-row gap-0">
          {/* Image Section */}
          <div className={`w-full md:transition-all md:duration-500 md:flex-shrink-0 bg-background/30 border-r border-border/50 overflow-hidden ${isHovered ? 'md:w-2/5 h-40 md:h-72' : 'md:w-1/3 h-40 md:h-64'}`}>
            {project.image ? (
              <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-6xl opacity-30">🖥️</div>
            )}
          </div>

          {/* Content Section */}
          <div className={`flex-1 p-6 md:p-8 flex flex-col transition-all duration-500 ${isHovered ? 'justify-start' : 'justify-center items-center'} min-h-40 md:min-h-64`}>
            {/* Title Section */}
            <div className={`${isHovered ? 'text-left' : 'text-center'}`}>
              <div className={`flex ${isHovered ? 'flex-col md:flex-row' : 'flex-col'} items-center gap-3`}>
                <div className="flex-1">
                  <h3 className={`font-heading font-bold text-foreground transition-all duration-500 ${isHovered ? 'text-3xl md:text-4xl' : 'text-4xl md:text-5xl'}`}>{project.title}</h3>
                </div>
              </div>
              {isHovered && <span className="text-xs px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30 whitespace-nowrap inline-block mt-4">{project.tech}</span>}
            </div>

            {/* Description - shows on hover */}
            <div
              className={`transition-all duration-500 overflow-hidden mt-auto ${isHovered ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}
            >
              <p className="text-muted-foreground leading-relaxed text-xs md:text-sm">{project.desc}</p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

const ProjectsSection = () => (
  <section className="px-6 pt-12 pb-8">
    <div className="max-w-4xl mx-auto px-2 md:px-0 mb-8">
      <h2 className="text-4xl md:text-6xl font-heading font-bold text-center text-foreground mb-4">MY PROJECTS</h2>
      <div className="w-12 h-1 bg-primary mx-auto rounded-full" />
    </div>
    <div className="space-y-20 max-w-5xl mx-auto pb-[60vh]">
      {projects.map((project, i) => (
        <ProjectCard key={i} project={project} index={i} />
      ))}
    </div>
  </section>
);

export default ProjectsSection;

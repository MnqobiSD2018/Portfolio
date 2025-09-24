import { useState } from 'react';
import { Mail, Phone, Linkedin, Github } from 'lucide-react';
import LiquidEther from './LiquidEther';
import IMGme from '../assets/me.jpg';
import MyCV from '../assets/Mnqobi_Dube_CV.pdf';


export default function Portfolio3D() {
  const [currentSection, setCurrentSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sections = [
    { id: 'hero', title: 'Welcome' },
    { id: 'about', title: 'About Me' },
    { id: 'skills', title: 'Technical Skills' },
    { id: 'projects', title: 'Projects' },
    { id: 'experience', title: 'Experience' },
    { id: 'contact', title: 'Contact' }
  ];

  const scrollToSection = (sectionId) => {
    setCurrentSection(sectionId);
    setIsMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Liquid Background */}
      <div className="absolute inset-0 z-0">
        <LiquidEther
          colors={['#5227FF', '#FF9FFC', '#B19EEF', '#61dafb']}
          mouseForce={25}
          cursorSize={120}
          autoDemo={true}
          autoSpeed={0.3}
          autoIntensity={1.8}
          className="w-full h-full"
        />
      </div>

      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/20 border-b border-white/10">
        <div className="flex justify-between items-center p-4 md:p-2">
          <div className="text-lg md:text-2xl font-bold text-white truncate">
            Mnqobi Samuel Dube
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  currentSection === section.id
                    ? 'bg-white text-black'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                {section.title}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white focus:outline-none z-60"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="w-6 h-6 relative">
              <span
                className={`absolute block w-full h-0.5 bg-white transition-all duration-300 ${
                  isMobileMenuOpen ? 'top-3 rotate-45' : 'top-1'
                }`}
              ></span>
              <span
                className={`absolute block w-full h-0.5 bg-white transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : 'top-3'
                }`}
              ></span>
              <span
                className={`absolute block w-full h-0.5 bg-white transition-all duration-300 ${
                  isMobileMenuOpen ? 'top-3 -rotate-45' : 'top-5'
                }`}
              ></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-white/10 px-4 pb-4">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`block w-full text-left px-4 py-3 rounded-lg transition-all duration-300 mb-2 ${
                  currentSection === section.id
                    ? 'bg-white text-black'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                {section.title}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Content Sections */}
      <div className="relative z-10 h-full overflow-y-auto snap-y snap-mandatory">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </div>
    </div>
  );
}

// Hero Section Component
function HeroSection() {
  return (
    <section id="hero" className="h-screen flex items-center justify-center snap-start px-4">
      <div className="text-center text-white max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-4 animate-fade-in leading-tight">
          Mnqobi Samuel Dube 
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-6 md:mb-8 animate-fade-in-delay px-2">
          3rd Year Software Engineering Student at Harare Institute of Technology
        </p>
        <p className="text-base sm:text-lg md:text-xl mb-8 md:mb-12 max-w-3xl mx-auto animate-fade-in-delay-2 px-4 leading-relaxed">
          Passionate about creating innovative solutions through code. 
          Seeking industrial attachment opportunities to apply my skills in real-world projects.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-3 px-4">
          <button 
            onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
            className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold hover:scale-105 transition-transform text-sm sm:text-base"
          >
            View My Work
          </button>
          <button 
            onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
            className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-white rounded-full text-white font-semibold hover:bg-white hover:text-black transition-all text-sm sm:text-base"
          >
            Get In Touch
          </button>
        </div>
      </div>
    </section>
  );
}

// About Section Component
function AboutSection() {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center snap-start py-16 px-4">
      <div className="max-w-6xl mx-auto text-white">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 md:mb-12 text-center">About Me</h2>
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-4 md:space-y-6 order-2 lg:order-1">
            <p className="text-base md:text-lg leading-relaxed">
              I'm a dedicated 3rd-year Software Engineering student with a passion for 
              technology and innovation. Currently pursuing my degree while actively 
              seeking industrial attachment opportunities to gain hands-on experience 
              in the software development and Information Technology industry.
            </p>
            <p className="text-base md:text-lg leading-relaxed">
              My journey in software engineering has equipped me with strong 
              problem-solving skills and a deep understanding of various programming 
              languages and frameworks. I'm particularly interested in web development, 
              mobile applications, Dev-Ops, IT and emerging technologies.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                <h4 className="font-semibold mb-2">Education</h4>
                <p className="text-sm md:text-base">3rd Year Software Engineering</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                <h4 className="font-semibold mb-2">Status</h4>
                <p className="text-sm md:text-base">Seeking Industrial Attachment</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center order-1 lg:order-2 mb-8 lg:mb-0">
            <div className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <div className="w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 bg-black rounded-full flex items-center justify-center overflow-hidden">
                <img src={IMGme} className="w-full h-full object-cover rounded-full" alt="Mnqobi Samuel Dube" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Skills Section Component
function SkillsSection() {
  const skills = {
    'Frontend': ['React', 'JavaScript', 'HTML5', 'CSS', 'TypeScript', 'Tailwind CSS'],
    'Backend': ['Node.js', 'Python', 'Java', 'SQL', 'MongoDB'],
    'Tools & Technologies': ['Git', 'Three.js', 'REST APIs'],
    'Soft Skills': ['Problem Solving', 'Team Collaboration', 'Communication', 'Time Management']
  };

  return (
    <section id="skills" className="min-h-screen flex items-center justify-center snap-start py-16 px-4">
      <div className="max-w-6xl mx-auto text-white">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 md:mb-12 text-center">Technical Skills</h2>
        <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
          {Object.entries(skills).map(([category, skillList], index) => (
            <div 
              key={category}
              className="bg-white/10 p-4 md:p-6 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h3 className="text-xl md:text-2xl font-semibold mb-4 text-center">{category}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {skillList.map((skill, skillIndex) => (
                  <div 
                    key={skill}
                    className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-3 py-2 rounded-lg text-center hover:scale-105 transition-transform text-sm md:text-base"
                    style={{ animationDelay: `${(index * 0.1) + (skillIndex * 0.05)}s` }}
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Projects Section Component
function ProjectsSection() {
  const projects = [
    {
      title: "3D Liquid Portfolio",
      description: "Interactive 3D portfolio with fluid simulation using Three.js and React. Features real-time physics and responsive design.",
      tech: ["React", "Three.js", "WebGL", "JavaScript"],
      status: "Current Project"
    },
    {
      title: "AI Meeting Summerizer",
      description: "An Application that uses Ollama whisper and Ollama 3.2 models to get an audio of a meeting then convert it into a meeting transcurpt and meeting minutes summery",
      tech: ["Uvicorn", "Python", "Whisper", "Ollama 3.2"],
      status: "Completed"
    },
    {
      title: "Health Care Booking System",
      description: "A booking system that has real time doctor avaialability",
      tech: ["Next.js", "Twilio", "MongoDB"],
      status: "Academic Project"
    },
    {
      title: "Ecommerce Website",
      description: "A simple sneaker e-commerce website",
      tech: ["PHP", "MYSQL", "HTML", "CSS"],
      status: "Academic Project"
    }
  ];

  return (
    <section id="projects" className="min-h-screen flex items-center justify-center snap-start py-16 px-4">
      <div className="max-w-6xl mx-auto text-white">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 md:mb-12 text-center">Featured Projects</h2>
        <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <div 
              key={project.title}
              className="bg-white/10 p-4 md:p-6 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:scale-105"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-2">
                <h3 className="text-lg md:text-2xl font-semibold">{project.title}</h3>
                <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-xs md:text-sm whitespace-nowrap">
                  {project.status}
                </span>
              </div>
              <p className="text-gray-300 mb-4 text-sm md:text-base leading-relaxed">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span 
                    key={tech}
                    className="px-3 py-1 bg-white/20 rounded-full text-xs md:text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Experience Section Component
function ExperienceSection() {
  const experiences = [
    {
      title: "Software Engineering Student",
      organization: "Harare Institute of Technology",
      period: "2023 - Present",
      description: "Pursuing Bachelor's degree in Software Engineering. Maintaining strong academic performance while working on various projects and assignments.",
      achievements: [
        "Led multiple group projects",
        "Active in coding competitions (HACKATHON 2025)"
      ]
    },
    {
      title: "Web Developement Intern",
      organization: "Patsimeredu Edutainment Trust",
      period: "July 2025 - September 2025",
      description: "Developed responsive websites and web applications for institution.",
      achievements: [
        "Worked on intergrating payment methods such as Paynow",
        "Specialized in React and modern web technologies",
        "Intergrated React based projects with Laravel",
        "Managed the Institutions website in C-Panel"
      ]
    }
  ];

  return (
    <section id="experience" className="min-h-screen flex items-center justify-center snap-start py-16 px-4">
      <div className="max-w-4xl mx-auto text-white">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 md:mb-12 text-center">Experience</h2>
        <div className="space-y-6 md:space-y-8">
          {experiences.map((exp, index) => (
            <div 
              key={exp.title}
              className="bg-white/10 p-6 md:p-8 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-2">
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold">{exp.title}</h3>
                  <p className="text-lg md:text-xl text-purple-300">{exp.organization}</p>
                </div>
                <span className="text-gray-300 text-sm md:text-base">{exp.period}</span>
              </div>
              <p className="text-gray-300 mb-4 text-sm md:text-base leading-relaxed">{exp.description}</p>
              <ul className="space-y-2">
                {exp.achievements.map((achievement, i) => (
                  <li key={i} className="flex items-start">
                    <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                    <span className="text-sm md:text-base">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Contact Section Component
function ContactSection() {
  const onButtonClick = () => {
    const pdfUrl = MyCV;
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "Mnqobi_Dube_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="contact" className="min-h-screen flex items-center justify-center snap-start py-16 px-4">
      <div className="max-w-4xl mx-auto text-white text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 md:mb-12">Let's Connect</h2>
        <p className="text-base md:text-xl mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed">
          I'm actively seeking industrial attachment opportunities and would love to hear from you. 
          Let's discuss how I can contribute to your team!
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
          <div className="bg-white/10 p-6 md:p-8 rounded-xl backdrop-blur-sm">
            <h3 className="text-xl md:text-2xl font-semibold mb-4">Contact Information</h3>
            <div className="space-y-3 md:space-y-4 text-left">
              <div className="flex items-center flex-wrap">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-4 flex-shrink-0 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm md:text-base break-all">samueldube123@gmail.com</span>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-4 flex-shrink-0 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm md:text-base">+263 78 807 7462</span>
              </div>
              <div className="flex items-center flex-wrap">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-4 flex-shrink-0 flex items-center justify-center">
                  <Linkedin className="w-5 h-5 text-white" />
                </div>
                <a 
                  href="https://linkedin.com/in/msamueldube" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm md:text-base break-all hover:text-purple-300 transition-colors"
                >
                  linkedin.com/in/msamueldube
                </a>
              </div>
              <div className="flex items-center flex-wrap">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-4 flex-shrink-0 flex items-center justify-center">
                  <Github className="w-5 h-5 text-white" />
                </div>
                <a 
                  href="https://github.com/MnqobiSD2018" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm md:text-base break-all hover:text-purple-300 transition-colors"
                >
                  github.com/MnqobiSD2018
                </a>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 p-6 md:p-8 rounded-xl backdrop-blur-sm">
            <h3 className="text-xl md:text-2xl font-semibold mb-4">What I'm Looking For</h3>
            <ul className="space-y-3 text-left">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                <span className="text-sm md:text-base">Industrial attachment positions</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                <span className="text-sm md:text-base">Software development internships</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-3 mt-2"></span>
                <span className="text-sm md:text-base">Web development opportunities</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                <span className="text-sm md:text-base">Tech startup collaborations</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                <span className="text-sm md:text-base">IT and ICT Internships</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href={MyCV} download="Mnqobi_Dube_CV.pdf">
            <button onClick={onButtonClick} className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold hover:scale-105 transition-transform text-sm md:text-base">
              Download Resume
            </button>
          </a>

          <a href="mailto:samueldube123@gmail.com?cc=h230585g@hit.ac.zw">
            <button className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 border-2 border-white rounded-full text-white font-semibold hover:bg-white hover:text-black transition-all text-sm md:text-base">
              Send Message
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}
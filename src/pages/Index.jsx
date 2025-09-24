import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import LiquidEther from '../pages/Index';

export default function Portfolio3D() {
  const [currentSection, setCurrentSection] = useState('hero');
  const containerRef = useRef();

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
      <nav className="absolute top-0 left-0 right-0 z-50 p-6">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-white">
            Samuel Mqobi Dube
          </div>
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
        </div>
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
    <section id="hero" className="h-screen flex items-center justify-center snap-start">
      <div className="text-center text-white px-6">
        <h1 className="text-6xl md:text-8xl font-bold mb-4 animate-fade-in">
          Samuel Mqobi Dube
        </h1>
        <p className="text-xl md:text-2xl mb-8 animate-fade-in-delay">
          3rd Year Software Engineering Student
        </p>
        <p className="text-lg md:text-xl mb-12 max-w-3xl mx-auto animate-fade-in-delay-2">
          Passionate about creating innovative solutions through code. 
          Seeking industrial attachment opportunities to apply my skills in real-world projects.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-3">
          <button 
            onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold hover:scale-105 transition-transform"
          >
            View My Work
          </button>
          <button 
            onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 border-2 border-white rounded-full text-white font-semibold hover:bg-white hover:text-black transition-all"
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
    <section id="about" className="h-screen flex items-center justify-center snap-start">
      <div className="max-w-6xl mx-auto px-6 text-white">
        <h2 className="text-5xl font-bold mb-12 text-center">About Me</h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg leading-relaxed">
              I'm a dedicated 3rd-year Software Engineering student with a passion for 
              technology and innovation. Currently pursuing my degree while actively 
              seeking industrial attachment opportunities to gain hands-on experience 
              in the software development industry.
            </p>
            <p className="text-lg leading-relaxed">
              My journey in software engineering has equipped me with strong 
              problem-solving skills and a deep understanding of various programming 
              languages and frameworks. I'm particularly interested in web development, 
              mobile applications, and emerging technologies.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                <h4 className="font-semibold mb-2">Education</h4>
                <p>3rd Year Software Engineering</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                <h4 className="font-semibold mb-2">Status</h4>
                <p>Seeking Industrial Attachment</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-80 h-80 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <div className="w-72 h-72 bg-black rounded-full flex items-center justify-center">
                <span className="text-6xl">👨‍💻</span>
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
    'Frontend': ['React', 'JavaScript', 'HTML5', 'CSS3', 'TypeScript', 'Tailwind CSS'],
    'Backend': ['Node.js', 'Python', 'Java', 'C++', 'SQL', 'MongoDB'],
    'Tools & Technologies': ['Git', 'Docker', 'AWS', 'Firebase', 'Three.js', 'REST APIs'],
    'Soft Skills': ['Problem Solving', 'Team Collaboration', 'Communication', 'Time Management']
  };

  return (
    <section id="skills" className="h-screen flex items-center justify-center snap-start">
      <div className="max-w-6xl mx-auto px-6 text-white">
        <h2 className="text-5xl font-bold mb-12 text-center">Technical Skills</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {Object.entries(skills).map(([category, skillList], index) => (
            <div 
              key={category}
              className="bg-white/10 p-6 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h3 className="text-2xl font-semibold mb-4 text-center">{category}</h3>
              <div className="grid grid-cols-2 gap-3">
                {skillList.map((skill, skillIndex) => (
                  <div 
                    key={skill}
                    className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-3 py-2 rounded-lg text-center hover:scale-105 transition-transform"
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
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce application with user authentication, payment integration, and admin dashboard.",
      tech: ["Node.js", "MongoDB", "React", "Stripe API"],
      status: "Completed"
    },
    {
      title: "Mobile Task Manager",
      description: "Cross-platform mobile application for task management with offline capabilities and cloud synchronization.",
      tech: ["React Native", "Firebase", "Redux"],
      status: "In Development"
    },
    {
      title: "Machine Learning Predictor",
      description: "Data analysis and prediction system using machine learning algorithms for academic research project.",
      tech: ["Python", "TensorFlow", "Pandas", "Scikit-learn"],
      status: "Academic Project"
    }
  ];

  return (
    <section id="projects" className="h-screen flex items-center justify-center snap-start">
      <div className="max-w-6xl mx-auto px-6 text-white">
        <h2 className="text-5xl font-bold mb-12 text-center">Featured Projects</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div 
              key={project.title}
              className="bg-white/10 p-6 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:scale-105"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-semibold">{project.title}</h3>
                <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-sm">
                  {project.status}
                </span>
              </div>
              <p className="text-gray-300 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span 
                    key={tech}
                    className="px-3 py-1 bg-white/20 rounded-full text-sm"
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
      organization: "University",
      period: "2022 - Present",
      description: "Pursuing Bachelor's degree in Software Engineering. Maintaining strong academic performance while working on various projects and assignments.",
      achievements: [
        "Consistent Dean's List performance",
        "Led multiple group projects",
        "Active in coding competitions"
      ]
    },
    {
      title: "Freelance Web Developer",
      organization: "Self-Employed",
      period: "2023 - Present",
      description: "Developed responsive websites and web applications for local businesses and personal clients.",
      achievements: [
        "Completed 5+ client projects",
        "100% client satisfaction rate",
        "Specialized in React and modern web technologies"
      ]
    }
  ];

  return (
    <section id="experience" className="h-screen flex items-center justify-center snap-start">
      <div className="max-w-4xl mx-auto px-6 text-white">
        <h2 className="text-5xl font-bold mb-12 text-center">Experience</h2>
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div 
              key={exp.title}
              className="bg-white/10 p-8 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                <div>
                  <h3 className="text-2xl font-semibold">{exp.title}</h3>
                  <p className="text-xl text-purple-300">{exp.organization}</p>
                </div>
                <span className="text-gray-300 mt-2 md:mt-0">{exp.period}</span>
              </div>
              <p className="text-gray-300 mb-4">{exp.description}</p>
              <ul className="space-y-2">
                {exp.achievements.map((achievement, i) => (
                  <li key={i} className="flex items-center">
                    <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-3"></span>
                    {achievement}
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
  return (
    <section id="contact" className="h-screen flex items-center justify-center snap-start">
      <div className="max-w-4xl mx-auto px-6 text-white text-center">
        <h2 className="text-5xl font-bold mb-12">Let's Connect</h2>
        <p className="text-xl mb-12 max-w-2xl mx-auto">
          I'm actively seeking industrial attachment opportunities and would love to hear from you. 
          Let's discuss how I can contribute to your team!
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white/10 p-8 rounded-xl backdrop-blur-sm">
            <h3 className="text-2xl font-semibold mb-4">Contact Information</h3>
            <div className="space-y-4 text-left">
              <div className="flex items-center">
                <span className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-4"></span>
                <span>samuel.dube@email.com</span>
              </div>
              <div className="flex items-center">
                <span className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-4"></span>
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <span className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-4"></span>
                <span>linkedin.com/in/samueldube</span>
              </div>
              <div className="flex items-center">
                <span className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-4"></span>
                <span>github.com/samueldube</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 p-8 rounded-xl backdrop-blur-sm">
            <h3 className="text-2xl font-semibold mb-4">What I'm Looking For</h3>
            <ul className="space-y-3 text-left">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-3 mt-2"></span>
                Industrial attachment positions
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-3 mt-2"></span>
                Software development internships
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-3 mt-2"></span>
                Web development opportunities
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-3 mt-2"></span>
                Tech startup collaborations
              </li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold hover:scale-105 transition-transform">
            Download Resume
          </button>
          <button className="px-8 py-4 border-2 border-white rounded-full text-white font-semibold hover:bg-white hover:text-black transition-all">
            Send Message
          </button>
        </div>
      </div>
    </section>
  );
}
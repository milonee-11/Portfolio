import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaSass,
  FaBootstrap,
  FaFigma,
  FaLinkedin,
  FaGithub,
  FaAward,
  FaUserTie,
  FaEnvelope,
  FaPhone,
  FaPython,
  FaJava,
  FaDownload,
  FaFilePdf,
  FaGraduationCap,
  FaArrowUp
} from "react-icons/fa";
import { SiTailwindcss, SiThreedotjs, SiCanva, SiMongodb, SiExpress } from "react-icons/si";
import { Link } from "react-router-dom";
import pic from './profile.jpg';

const Hero = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  // Array of cubes with random positions for hero section
  const heroCubes = Array.from({ length: 10 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`, // random horizontal position
    delay: Math.random() * 5, // random delay
    size: Math.random() * 40 + 20, // cube size between 20px - 60px
  }));

  // About section data
  const skills = [
    { name: "React", icon: <FaReact className="text-cyan-400 text-4xl" />, level: 90 },
    { name: "Node.js", icon: <FaNodeJs className="text-green-500 text-4xl" />, level: 75 },
    { name: "Python", icon: <FaPython className="text-yellow-400 text-4xl" />, level: 80 },
    { name: "Java", icon: <FaJava className="text-red-500 text-4xl" />, level: 70 },
    { name: "MongoDB", icon: <SiMongodb className="text-green-600 text-4xl" />, level: 75 },
    { name: "Express.js", icon: <SiExpress className="text-gray-300 text-4xl" />, level: 70 },
    { name: "CSS", icon: <span className="text-blue-400 font-bold text-2xl">CSS</span>, level: 95 },
    { name: "Bootstrap", icon: <FaBootstrap className="text-purple-500 text-4xl" />, level: 85 },
    { name: "Tailwind", icon: <SiTailwindcss className="text-cyan-500 text-4xl" />, level: 90 },
    { name: "Sass", icon: <FaSass className="text-pink-400 text-4xl" />, level: 70 },
    { name: "Figma", icon: <FaFigma className="text-pink-600 text-4xl" />, level: 80 },
    { name: "Canva", icon: <SiCanva className="text-indigo-400 text-4xl" />, level: 75 },
    { name: "Three.js", icon: <SiThreedotjs className="text-white text-4xl" />, level: 65 },
  ];

  const achievements = [
    { icon: <FaAward className="text-yellow-400 text-2xl" />, label: "Certifications", value: "5+" },
    { icon: <FaUserTie className="text-blue-400 text-2xl" />, label: "Projects Completed", value: "10+" },
  ];

  const projects = [
    {
      title: "FoodTrends (Cafe Web App – Frontend Clone)",
      description:
        "Developed a responsive cafe app clone with unique UI, carousels, accordions, and smooth navigation.",
      technologies: ["HTML", "CSS", "Bootstrap", "JavaScript"],
      github: "https://github.com/milonee-11/FoodTrends"
    },
    {
      title: "Travel Bliss (Travel & Booking Web App)",
      description:
        "Built a travel booking app with video search (e.g., Manali videos) and hotel booking functionality.",
      technologies: ["HTML", "CSS", "Bootstrap", "Tailwind", "JavaScript"],
      github: "https://github.com/milonee-11/TravelBliss",
      linkedin: "https://www.linkedin.com/feed/update/urn:li:activity:7307481884265963520/?originTrackingId=vqd61UeuRQqIvbFRjm9Tbg%3D%3D"
    },
    {
      title: "Trip Scheduler (Full-Stack Web App)",
      description:
        "Designed a MERN stack trip scheduling app with Python APIs for smart itinerary planning, weather, and recommendations.",
      technologies: ["MongoDB", "Express", "React", "Node.js", "Python", "APIs"],
      github: "https://github.com/milonee-11/Trip-Scheduler",
      linkedin: "https://www.linkedin.com/feed/update/urn:li:activity:7369372056817274881/?originTrackingId=I5kxRG%2FgS82yMvBUgckFHQ%3D%3D"
    },
    {
      title: "Portfolio Website",
      description:
        "Created a personal portfolio showcasing smooth animations, 3D effects, and seamless navigation.",
      technologies: ["React", "Next.js", "Vite", "Tailwind", "Bootstrap", "Three.js", "Framer Motion"],
      github: "https://github.com/yourusername/portfolio"
    }
  ];

  // Create falling cubes for about section background
  useEffect(() => {
    const aboutSection = document.getElementById("about");
    if (!aboutSection) return;
    
    const cubes: HTMLDivElement[] = [];
    
    for (let i = 0; i < 15; i++) {
      const cube = document.createElement('div');
      cube.className = 'absolute w-3 h-3 bg-gradient-to-br from-cyan-400/10 to-purple-500/10 rotate-45';
      cube.style.left = `${Math.random() * 100}%`;
      cube.style.top = `${Math.random() * 100}%`;
      cube.style.animation = `fallingCube ${15 + Math.random() * 10}s linear infinite`;
      cube.style.animationDelay = `${Math.random() * 5}s`;
      aboutSection.appendChild(cube);
      cubes.push(cube);
    }
    
    return () => {
      cubes.forEach(cube => {
        if (aboutSection.contains(cube)) {
          aboutSection.removeChild(cube);
        }
      });
    };
  }, []);

  // Handle scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle click outside popup to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setShowPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Auto-dismiss popup after 3 seconds
  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  // Download resume function
  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = '/Milonee_Patel_Resume.pdf';
    link.download = 'Milonee_Patel_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open email client with pre-filled data
  const openEmailClient = () => {
    const subject = "Contact Inquiry";
    const body = "Hello Milonee,\n\nI'm interested in discussing potential opportunities with you.\n\nBest regards,\n[Your Name]";
    window.open(`https://mail.google.com/mail/u/0/?view=cm&fs=1&to=miloneep@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
  };

  return (
    <>
      {/* Hero Section */}
      <section
        id="home"
        className="relative flex items-center justify-center h-screen 
                   bg-gradient-to-r from-gray-900 via-gray-800 to-black
                   dark:bg-gradient-to-r dark:from-gray-900 dark:via-gray-800 dark:to-black
                   light:bg-gradient-to-r light:from-slate-100 light:via-slate-200 light:to-slate-300
                   text-white dark:text-white light:text-gray-800 overflow-hidden"
      >
        {/* Animated Blobs Background */}
        <motion.div
          className="absolute w-72 h-72 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-30
                     dark:opacity-30 light:opacity-20"
          animate={{
            x: [0, 100, -100, 0],
            y: [0, -50, 50, 0],
          }}
          transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-20
                     dark:opacity-20 light:opacity-15"
          animate={{
            x: [0, -120, 120, 0],
            y: [0, 60, -60, 0],
          }}
          transition={{ repeat: Infinity, duration: 14, ease: "easeInOut" }}
        />

        {/* Falling Cubes Background */}
        {heroCubes.map((cube) => (
          <motion.div
            key={cube.id}
            className="absolute bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-20
                       dark:opacity-20 light:opacity-15"
            style={{
              left: cube.left,
              width: cube.size,
              height: cube.size,
            }}
            initial={{ y: -200, rotate: 0 }}
            animate={{ y: "110vh", rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 8 + cube.delay,
              delay: cube.delay,
              ease: "linear",
            }}
          />
        ))}

        {/* Content */}
        <div className="relative z-10 text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-extrabold 
                       text-transparent bg-clip-text 
                       bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500"
          >
            Hi, I'm <span className="text-white dark:text-white light:text-gray-800">Milonee Patel</span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-4 text-xl md:text-2xl font-medium text-gray-300 dark:text-gray-300 light:text-gray-600"
          >
            Frontend Designer & Developer
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-6 max-w-2xl mx-auto text-gray-400 dark:text-gray-400 light:text-gray-500 text-lg"
          >
            Crafting modern, responsive, and immersive digital experiences.
          </motion.p>

          {/* Call to Action */}
          <motion.a
            href="#about"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="mt-8 inline-block relative px-8 py-3 rounded-3xl font-semibold
                       text-white
                       bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500
                       shadow-lg hover:shadow-cyan-500/50 transition duration-300
                       overflow-hidden group cursor-pointer"
          >
            <span className="relative z-10">Learn More About Me</span>
            {/* Shine effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent 
                             -translate-x-full group-hover:translate-x-full 
                             transition-transform duration-700 ease-in-out"></span>
          </motion.a>
        </div>
      </section>

      {/* About Section */}
      <section 
        id="about"
        className="relative flex flex-col items-center justify-center min-h-screen 
                   bg-gradient-to-br from-gray-900 via-gray-800 to-black
                   dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black
                   light:bg-gradient-to-br light:from-slate-100 light:via-slate-200 light:to-slate-300
                   text-white dark:text-white light:text-gray-800 px-6 py-16 overflow-hidden"
      >
        {/* Hero-style background for about section */}
        <motion.div
          className="absolute w-72 h-72 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-30
                     dark:opacity-30 light:opacity-20"
          animate={{
            x: [0, 100, -100, 0],
            y: [0, -50, 50, 0],
          }}
          transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-20
                     dark:opacity-20 light:opacity-15"
          animate={{
            x: [0, -120, 120, 0],
            y: [0, 60, -60, 0],
          }}
          transition={{ repeat: Infinity, duration: 14, ease: "easeInOut" }}
        />

        {/* Add CSS for falling cubes */}
        <style>
          {`
            @keyframes fallingCube {
              0% {
                transform: translateY(-100vh) rotate(0deg);
                opacity: 0;
              }
              10% {
                opacity: 0.5;
              }
              90% {
                opacity: 0.5;
              }
              100% {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
              }
            }
          `}
        </style>

        {/* Main Content Container */}
        <div className="relative z-10 w-full max-w-6xl mx-auto">
          {/* Heading with Text Shine Animation */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="text-center mb-16 relative"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-3 relative inline-block">
              <span className="relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 relative inline-block overflow-hidden">
                  About Me
                  {/* Shine effect directly on the text letters */}
                  <motion.span 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent transform -skew-x-12"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    style={{ 
                      mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      maskComposite: "exclude",
                      WebkitMaskComposite: "xor",
                      padding: "2px" 
                    }}
                  />
                </span>
              </span>
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-teal-400 to-purple-500 mx-auto rounded-full"></div>
          </motion.div>

          {/* Image + Bio */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-20">
            {/* Image with Enhanced Animation */}
            <motion.div
              className="relative flex-shrink-0 mx-auto lg:mx-0"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                {/* Continuous glowing border animation - behind photo */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-cyan-500/70 z-50"
                  animate={{ 
                    rotate: 360,
                    boxShadow: [
                      "0 0 15px rgba(6, 182, 212, 0.7)",
                      "0 0 25px rgba(6, 182, 212, 0.9)",
                      "0 0 35px rgba(6, 182, 212, 0.7)",
                      "0 0 15px rgba(6, 182, 212, 0.5)"
                    ]
                  }}
                  transition={{
                    rotate: {
                      repeat: Infinity,
                      duration: 20,
                      ease: "linear"
                    },
                    boxShadow: {
                      repeat: Infinity,
                      duration: 2.5,
                      ease: "easeInOut"
                    }
                  }}
                />
                
                {/* Corner darkening container */}
                <div className="absolute inset-0 rounded-full z-10 overflow-hidden">
                  {/* Individual corner darkening effects */}
                  <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-transparent via-transparent to-black/20" />
                  <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-transparent via-transparent to-black/20" />
                  <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-transparent via-transparent to-black/20" />
                  <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-transparent via-transparent to-black/20" />
                </div>
                
                {/* Improved secondary effect - dotted ring with glow */}
                <motion.div
                  className="absolute inset-0 rounded-full z-50"
                  animate={{
                    rotate: -360,
                  }}
                  transition={{
                    rotate: {
                      repeat: Infinity,
                      duration: 25,
                      ease: "linear"
                    }
                  }}
                >
                  {/* Dotted ring with pulsing glow */}
                  <motion.div
                    className="z-50 absolute inset-0 rounded-full border-[3px] border-dotted border-purple-500/60"
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0.7, 0.9, 0.7]
                    }}
                    transition={{
                      scale: {
                        repeat: Infinity,
                        duration: 4,
                        ease: "easeInOut"
                      },
                      opacity: {
                        repeat: Infinity,
                        duration: 3,
                        ease: "easeInOut"
                      }
                    }}
                    style={{
                      filter: "drop-shadow(0 0 8px rgba(168, 85, 247, 0.6))"
                    }}
                  />
                  
                  {/* Floating glow particles */}
                  <motion.div
                    className="absolute top-0 left-1/2 w-2 h-2 bg-purple-400 rounded-full z-50"
                    animate={{
                      y: [0, -15, 0],
                      x: ["-50%", "-50%", "-50%"],
                      scale: [1, 1.5, 1],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <motion.div
                    className="absolute bottom-0 left-1/2 w-2 h-2 bg-cyan-400 rounded-full z-50"
                    animate={{
                      y: [0, 15, 0],
                      x: ["-50%", "-50%", "-50%"],
                      scale: [1, 1.5, 1],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                  />
                </motion.div>
                
                {/* Main Image container - Clean center with bright photo */}
                <motion.div
                  className="w-full h-full rounded-2xl overflow-hidden border-4 border-gray-200 relative z-30 bg-white"
                  whileHover={{ 
                    scale: 1.03
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.img
                    src={pic}
                    alt="Milonee Patel"
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />
                </motion.div>

                
              </div>
            </motion.div>

            {/* Bio with scrolling effect */}
            <motion.div
              className="max-w-xl"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.h3 
                className="text-2xl font-semibold mb-4 text-cyan-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                Frontend Designer & Developer
              </motion.h3>
              <motion.p 
                className="text-gray-300 dark:text-gray-300 light:text-gray-600 text-lg leading-relaxed mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                I'm <span className="font-semibold text-white dark:text-white light:text-gray-800 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 px-1 rounded">Milonee Patel</span>, a passionate{" "}
                <span className="text-cyan-400 font-medium">Frontend Designer & Developer</span> crafting modern, responsive, and immersive digital experiences.  
              </motion.p>
              <motion.p 
                className="text-gray-300 dark:text-gray-300 light:text-gray-600 text-lg leading-relaxed mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                I've mastered <span className="highlight-text">CSS, Bootstrap, Tailwind, React, and Node.js</span> and am currently expanding my expertise in{" "}
                <span className="highlight-text">Sass, Canva, and Three.js</span> to elevate my design and 3D web capabilities.
              </motion.p>
              <motion.p 
                className="text-gray-400 dark:text-gray-400 light:text-gray-500 text-md mb-6 border-l-4 border-teal-500 pl-4 py-2 italic"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                My goal is to master frontend design — from elegant UI/UX to performance-driven applications — 
                delivering visually stunning, user-focused experiences that make an impact.
              </motion.p>
              
              {/* Education Button - Now links to Education page */}
              <Link to="/edu" >
                <motion.button
               
                  className="mt-8 w-full py-4 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-xl font-semibold text-white shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 relative overflow-hidden group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                >
                  <span className="relative z-10 flex items-center justify-center" id="">
                    <FaGraduationCap className="mr-2" />
                    View My Education
                  </span>
                  
                  {/* Animated book emoji */}
                  <motion.span
                    className="absolute text-2xl"
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ 
                      x: [0, 320, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{ 
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    style={{ right: '10%' }}
                  >
                    📚
                  </motion.span>
                  
                  {/* Shine effect */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                </motion.button>
              </Link>

              {/* Achievements */}
              <motion.div
                className="grid grid-cols-2 gap-4 mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
              >
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center p-4 bg-gray-800/40 dark:bg-gray-800/40 light:bg-slate-200/60 rounded-lg border border-gray-700/30 dark:border-gray-700/30 light:border-slate-300/30 hover:bg-gray-700/40 transition-colors"
                    whileHover={{ 
                      scale: 1.03,
                      boxShadow: "0 5px 15px rgba(0,0,0,0.2)"
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 + index * 0.1 }}
                  >
                    <div className="mr-3">
                      {achievement.icon}
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-cyan-400">{achievement.value}</p>
                      <p className="text-sm text-gray-400 dark:text-gray-400 light:text-gray-500">{achievement.label}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Skills Section */}
          <motion.div
            id="skills"
            className="relative py-16 overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {/* <div className="absolute -top-40 -left-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
               */}
              {/* Grid pattern */}
              <div className="absolute inset-0 opacity-10 bg-grid-white/30 bg-[size:50px_50px]"></div>
            </div>

            <div className="text-center relative z-10">
              <motion.h3
                className="text-5xl font-bold mb-3 relative inline-block"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 relative inline-block overflow-hidden">
                  Skills
                  <motion.span 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent transform -skew-x-12"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    style={{ 
                      mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      maskComposite: "exclude",
                      WebkitMaskComposite: "xor",
                      padding: "2px" 
                    }}
                  />
                </span>
              </motion.h3>
              
              <motion.div 
                className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full mb-12"
                initial={{ width: 0 }}
                whileInView={{ width: 80 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-5xl mx-auto px-4">
                {skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    whileHover={{ 
                      scale: 1.08,
                      y: -8,
                      transition: { type: "spring", stiffness: 300, damping: 15 }
                    }}
                    className="relative group"
                  >
                    {/* Hover effect background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl blur-md group-hover:blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                    
                    {/* Main skill card */}
                    <div className="relative flex flex-col items-center justify-center p-5 bg-gray-800/70 backdrop-blur-md rounded-2xl border border-gray-700/30 transition-all duration-500 group-hover:border-cyan-400/40 group-hover:bg-gray-800/90 skill-card overflow-hidden">
                      
                      {/* Animated border on hover */}
                      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 animate-gradient-x"></div>
                      </div>
                      
                      {/* Icon with hover effect */}
                      <motion.div 
                        className="mb-4 text-3xl transition-all duration-500 group-hover:scale-110 group-hover:text-cyan-400"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.7 }}
                      >
                        {skill.icon}
                      </motion.div>
                      
                      {/* Skill name */}
                      <span className="text-md font-medium text-gray-300 mb-3 transition-colors duration-500 group-hover:text-white z-10">
                        {skill.name}
                      </span>
                      
                      {/* Progress bar container */}
                      <div className="w-full bg-gray-700/70 rounded-full h-2.5 mt-2 overflow-hidden backdrop-blur-sm">
                        {/* Animated progress bar */}
                        <motion.div 
                          className="h-2.5 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 relative overflow-hidden"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, delay: index * 0.1 + 0.5, ease: "easeOut" }}
                        >
                          {/* Shimmer effect on progress bar */}
                          <motion.div 
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                            animate={{ x: ["-100%", "100%"] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: 1.5 + index * 0.1 }}
                          />
                        </motion.div>
                      </div>
                      
                      {/* Percentage indicator */}
                      <motion.span 
                        className="text-xs text-cyan-300/80 mt-2 font-medium"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + 1.2 }}
                      >
                       
                      </motion.span>
                      
                      {/* Hover effect particles */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-1 h-1 rounded-full bg-cyan-400/60"
                            initial={{ 
                              scale: 0,
                              x: "50%",
                              y: "50%"
                            }}
                            whileHover={{ 
                              scale: [0, 1, 0],
                              x: [`50%`, `${Math.random() * 40 + 30}%`, `50%`],
                              y: [`50%`, `${Math.random() * 40 + 30}%`, `50%`],
                            }}
                            transition={{ 
                              duration: 1.5,
                              times: [0, 0.5, 1],
                              repeat: Infinity,
                              delay: i * 0.3
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Floating particles in background */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-cyan-400/20"
                  animate={{
                    y: [0, -20, 0],
                    x: [0, Math.random() * 10 - 5, 0],
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: Math.random() * 5 + 3,
                    repeat: Infinity,
                    delay: Math.random() * 2
                  }}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Projects Section */}
          <motion.div
            id="projects"
            className="text-center mb-0"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <h3 className="text-5xl font-bold mb-3 relative inline-block mt-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 relative inline-block overflow-hidden">
                Projects
                <motion.span 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent transform -skew-x-12"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  style={{ 
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    maskComposite: "exclude",
                    WebkitMaskComposite: "xor",
                    padding: "2px" 
                  }}
                />
              </span>
            </h3>
            <div className="h-1 w-20 bg-gradient-to-r from-teal-400 to-purple-500 mx-auto rounded-full mb-8"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  whileHover={{ 
                    scale: 1.03,
                    boxShadow: "0 10px 25px rgba(6, 182, 212, 0.2)"
                  }}
                  className="bg-gray-800/50 dark:bg-gray-800/50 light:bg-slate-200/60 rounded-2xl backdrop-blur-sm border border-gray-700/30 dark:border-gray-700/30 light:border-slate-300/30 p-6 text-left relative group"
                >
                  <h4 className="text-xl font-semibold text-cyan-300 mb-3">{project.title}</h4>
                  <p className="text-gray-300 dark:text-gray-300 light:text-gray-600 mb-2">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-2">
                    {project.technologies.map((tech, techIndex) => (
                      <motion.span 
                        key={techIndex}
                        className="px-3 py-1 bg-cyan-900/30 dark:bg-cyan-900/30 light:bg-cyan-200 text-cyan-300 dark:text-cyan-300 light:text-cyan-700 rounded-full text-sm cursor-default relative overflow-hidden border border-cyan-500/20"
                        whileHover={{ 
                          scale: 1.08,
                          backgroundColor: "rgba(8, 145, 178, 0.5)",
                          boxShadow: "0 0 15px rgba(6, 182, 212, 0.4)"
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Multi-layered continuous animations */}
                        
                        {/* Layer 1: Pulsing background glow */}
                        <motion.span
                          className="absolute inset-0 rounded-full bg-cyan-500/20"
                          animate={{
                            opacity: [0.3, 0.6, 0.3],
                            scale: [1, 1.1, 1]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: techIndex * 0.4
                          }}
                        />
                        
                        {/* Layer 2: Rotating gradient border */}
                        <motion.span
                          className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/30 via-purple-400/30 to-cyan-400/30"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "linear",
                            delay: techIndex * 0.2
                          }}
                          style={{ 
                            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                            maskComposite: "exclude",
                            WebkitMaskComposite: "xor",
                            padding: "1.5px"
                          }}
                        />
                        
                        {/* Layer 4: Subtle floating animation */}
                        <motion.span
                          className="absolute inset-0"
                          animate={{ y: [0, -2, 0] }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: techIndex * 0.3
                          }}
                        />
                        
                        {/* Text content with glow */}
                        <motion.span 
                          className="relative z-10 font-medium"
                          animate={{
                            textShadow: [
                              "0 0 0px rgba(6, 182, 212, 0)",
                              "0 0 8px rgba(6, 182, 212, 0.6)",
                              "0 0 0px rgba(6, 182, 212, 0)"
                            ]
                          }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: techIndex * 0.5
                          }}
                        >
                          {tech}
                        </motion.span>
                        
                        {/* Floating particles around tech tags */}
                        {[0, 1].map(particle => (
                          <motion.span
                            key={particle}
                            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                            animate={{
                              y: [0, -8, 0],
                              x: [0, particle ? 6 : -6, 0],
                              opacity: [0, 1, 0]
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: techIndex * 0.7 + particle * 0.5
                            }}
                            style={{
                              left: particle ? '20%' : '80%',
                              bottom: '0%'
                            }}
                          />
                        ))}
                      </motion.span>
                    ))}
                  </div>

                  {/* Icons */}
                  <div className="flex gap-4 mt-2">
                    {/* GitHub - every project */}
                    <motion.a
                      href={project.github || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-cyan-400 transition-colors text-2xl"
                      title="View on GitHub"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaGithub />
                    </motion.a>

                    {/* LinkedIn - only for Travel Bliss & Trip Scheduler */}
                    {(project.title === "Travel Bliss (Travel & Booking Web App)" ||
                      project.title === "Trip Scheduler (Full-Stack Web App)") && (
                      <motion.a
                        href={project.linkedin || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-400 transition-colors text-2xl"
                        title="View on LinkedIn"
                        whileHover={{ scale: 1.2, rotate: -5 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FaLinkedin />
                      </motion.a>
                    )}
                  </div>

                  {/* Project card background glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 pointer-events-none"
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

         {/* Contact Section */}
        <motion.section
          id="contact"
          
          className="relative flex flex-col items-center justify-center min-h-screen 
                      light:text-gray-800 px-6 py-16 overflow-hidden section-3d mt-0"
         
        >
          {/* Background Effects */}
          <motion.div
            className="absolute w-96 h-96 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-15 floating-3d"
            animate={{
              x: [0, -100, 100, 0],
              y: [0, 50, -50, 0],
            }}
            transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
          />

          <div className="relative z-10 w-full max-w-4xl mx-auto content-3d">
            {/* Section Header */}
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
             <h1 className="text-5xl font-bold mb-3 relative inline-block mt-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 relative inline-block overflow-hidden">
                Get In Touch
                <motion.span 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent transform -skew-x-12"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  style={{ 
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    maskComposite: "exclude",
                    WebkitMaskComposite: "xor",
                    padding: "2px" 
                  }}
                />
              </span>
            </h1>
              <p className="text-xl text-gray-400 dark:text-gray-400 light:text-gray-600 max-w-2xl mx-auto depth-effect">
                Let's connect and discuss how we can bring your ideas to life!
              </p>
            </motion.div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* Contact Info */}
              <motion.div
                className="space-y-6 content-3d"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h3 className="text-2xl font-bold text-cyan-400 mb-6 depth-effect">Contact Information</h3>
                
                <motion.div
                  className="flex items-center gap-4 p-4 bg-gray-800/30 dark:bg-gray-800/30 light:bg-slate-200/50 
                             rounded-xl border border-gray-700/30 dark:border-gray-700/30 light:border-slate-300/30
                             hover:border-cyan-500/50 transition-all duration-300 depth-effect-sm"
                  whileHover={{ x: 5, scale: 1.02 }}
                >
                  <div className="p-3 bg-cyan-500/20 rounded-lg">
                    <FaEnvelope className="text-cyan-400 text-xl" />
                  </div>
                  <div>
                    <p className="text-gray-400 dark:text-gray-400 light:text-gray-500 text-sm">Email</p>
                    <p className="text-white dark:text-white light:text-gray-800 font-medium">miloneep@gmail.com</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center gap-4 p-4 bg-gray-800/30 dark:bg-gray-800/30 light:bg-slate-200/50 
                             rounded-xl border border-gray-700/30 dark:border-gray-700/30 light:border-slate-300/30
                             hover:border-purple-500/50 transition-all duration-300 depth-effect-sm"
                  whileHover={{ x: 5, scale: 1.02 }}
                >
                  <div className="p-3 bg-purple-500/20 rounded-lg">
                    <FaPhone className="text-purple-400 text-xl" />
                  </div>
                  <div>
                    <p className="text-gray-400 dark:text-gray-400 light:text-gray-500 text-sm">Phone</p>
                    <p className="text-white dark:text-white light:text-gray-800 font-medium">+919727781100</p>
                  </div>
                </motion.div>

                
              </motion.div>

              {/* Contact Form */}
              <motion.div
                className="content-3d"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <motion.button
                  onClick={openEmailClient}
                  className="w-full h-full min-h-[200px] bg-gradient-to-br from-cyan-500/10 to-purple-500/10 
                             hover:from-cyan-500/20 hover:to-purple-500/20 rounded-2xl border-2 border-dashed 
                             border-cyan-500/30 hover:border-cyan-500/50 transition-all duration-300 
                             flex flex-col items-center justify-center gap-4 group depth-effect-lg"
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaEnvelope className="text-cyan-400 text-4xl group-hover:text-cyan-300 transition-colors" />
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-cyan-400 mb-2">Send me an Email</h3>
                    <p className="text-gray-400 dark:text-gray-400 light:text-gray-600">
                      Click here to open your email client and get in touch!
                    </p>
                  </div>
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.section>

          {/* Resume Section */}
          <motion.div
            id="resume"
            className="text-center mb-16"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.8 }}
          >
            <h3 className="text-5xl font-bold mb-3 relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 relative inline-block overflow-hidden">
                My Resume
                <motion.span 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent transform -skew-x-12"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  style={{ 
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    maskComposite: "exclude",
                    WebkitMaskComposite: "xor",
                    padding: "2px" 
                  }}
                />
              </span>
            </h3>
            <div className="h-1 w-20 bg-gradient-to-r from-teal-400 to-purple-500 mx-auto rounded-full mb-8"></div>

            <motion.div
              className="bg-gray-800/50 dark:bg-gray-800/50 light:bg-slate-200/60 rounded-2xl backdrop-blur-sm border border-gray-700/30 dark:border-gray-700/30 light:border-slate-300/30 p-8 max-w-2xl mx-auto"
              whileHover={{ scale: 1.02 }}
            >
              <FaFilePdf className="text-cyan-400 text-5xl mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-cyan-300 mb-2">Download My Resume</h4>
              <p className="text-gray-300 dark:text-gray-300 light:text-gray-600 mb-6">
                📄Explore my skills and experience in this PDF.  <br></br>
                I'm committed to giving my 100% while learning and contributing with you.
              </p>

              <motion.button
                onClick={downloadResume}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 5px 15px rgba(6, 182, 212, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-medium text-white shadow-lg"
              >
                <FaDownload className="inline mr-2" />
                Download PDF
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex justify-center gap-6 mt-8"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 2 }}
          >
            <motion.a
              href="https://www.linkedin.com/in/milonee-patel-6637922b2/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ 
                scale: 1.2,
                y: -5,
                color: "#0A66C2"
              }}
              className="text-3xl text-gray-400 dark:text-gray-400 light:text-gray-600 hover:text-cyan-400 transition-colors"
            >
              <FaLinkedin />
            </motion.a>
            <motion.a
              href="https://github.com/milonee-11"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ 
                scale: 1.2,
                y: -5,
                color: "#ffffff"
              }}
              className="text-3xl text-gray-400 dark:text-gray-400 light:text-gray-600 hover:text-cyan-400 transition-colors"
            >
              <FaGithub />
            </motion.a>
          </motion.div>
        </div>
      </section>

       {/* Scroll to Top Button */}
      {showScrollTop && (
        <motion.button
          onClick={scrollToTop}
          className="fixed z-40 bottom-4 left-1/2 transform -translate-x-1/2 md:bottom-8 md:right-8 md:left-auto md:transform-none bg-gradient-to-r from-purple-500 to-blue-500 text-white p-3 rounded-full shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaArrowUp className="text-xl" />
        </motion.button>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-900 light:bg-slate-200 text-gray-400 dark:text-gray-400 light:text-gray-600 py-8 text-center">
        <div className="container mx-auto px-6">
          <p className="text-sm">
            © {new Date().getFullYear()} Milonee Patel. All rights reserved.
          </p>
          <p className="text-xs mt-2">
            Designed and developed with ❤️ using React and Framer Motion
          </p>
        </div>
      </footer>

      {/* Custom CSS for additional styling */}
      <style>
        {`
           html, body {
            overflow-x: hidden;
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          
          html::-webkit-scrollbar, body::-webkit-scrollbar {
            display: none;
          }
          
          .skill-card:hover {
            box-shadow: 0 0 20px rgba(168, 85, 247, 0.3);
            transform: translateY(-5px);
          }
          
          .highlight-text {
            background: linear-gradient(90deg, #a855f7, #84cc16);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-weight: 600;
          }
          
          /* Smooth scrolling for the entire page */
          html {
            scroll-behavior: smooth;
          }

          /* Mobile scroll to top button */
          @media (max-width: 768px) {
            .fixed.bottom-4 {
              bottom: 20px;
              left: 50%;
              transform: translateX(-50%);
            }
          }
          
          @media (min-width: 769px) {
            .fixed.bottom-4 {
              bottom: 2rem;
              right: 2rem;
              left: auto;
              transform: none;
            }
          }
          
        `}
      </style>
    </>
  );
};

export default Hero;
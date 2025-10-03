// src/components/About.tsx
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Loader from "./Loader";
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
  FaCode,
} from "react-icons/fa";
import { SiTailwindcss, SiThreedotjs, SiCanva } from "react-icons/si";
import pic from './profile.jpg';

const skills = [
  { name: "React", icon: <FaReact className="text-cyan-400 text-4xl" />, level: 90 },
  { name: "Node.js", icon: <FaNodeJs className="text-green-500 text-4xl" />, level: 75 },
  { name: "CSS", icon: <span className="text-blue-400 font-bold text-2xl">CSS</span>, level: 95 },
  { name: "Bootstrap", icon: <FaBootstrap className="text-purple-500 text-4xl" />, level: 85 },
  { name: "Tailwind", icon: <SiTailwindcss className="text-cyan-500 text-4xl" />, level: 90 },
  { name: "Sass", icon: <FaSass className="text-pink-400 text-4xl" />, level: 70 },
  { name: "Figma", icon: <FaFigma className="text-pink-600 text-4xl" />, level: 80 },
  { name: "Canva", icon: <SiCanva className="text-indigo-400 text-4xl" />, level: 75 },
  { name: "Three.js", icon: <SiThreedotjs className="text-white text-4xl" />, level: 65 },
];

const facts = [
  { icon: <FaAward className="text-yellow-400 text-2xl" />, label: "Projects Completed", value: "25+" },
  { icon: <FaUserTie className="text-blue-400 text-2xl" />, label: "Happy Clients", value: "15+" },
  { icon: <FaCode className="text-green-400 text-2xl" />, label: "Experience", value: "2 Years" },
];

const About = () => {
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  // Create falling cubes in background
  useEffect(() => {
    if (!sectionRef.current || loading) return;
    
    const section = sectionRef.current;
    const cubes: HTMLDivElement[] = [];
    
    for (let i = 0; i < 15; i++) {
      const cube = document.createElement('div');
      cube.className = 'absolute w-3 h-3 bg-gradient-to-br from-cyan-400/10 to-purple-500/10 rotate-45';
      cube.style.left = `${Math.random() * 100}%`;
      cube.style.top = `${Math.random() * 100}%`;
      cube.style.animation = `fallingCube ${15 + Math.random() * 10}s linear infinite`;
      cube.style.animationDelay = `${Math.random() * 5}s`;
      section.appendChild(cube);
      cubes.push(cube);
    }
    
    return () => {
      cubes.forEach(cube => {
        if (section.contains(cube)) {
          section.removeChild(cube);
        }
      });
    };
  }, [loading]);

  if (loading) return <Loader />;

  return (
    <section 
      ref={sectionRef}
      className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-6 py-16 overflow-hidden"
      style={{ marginTop: '4rem' }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-900 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-cyan-900 rounded-full opacity-10 blur-3xl"></div>
      </div>

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
    About{" "}
      Me
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
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 mb-20">
          {/* Image with Enhanced Animation */}
          <motion.div
            className="relative flex-shrink-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative w-80 h-80 md:w-96 md:h-96">
              {/* Orbiting elements */}
              <motion.div
                className="absolute inset-0 rounded-full border border-cyan-500/30"
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  duration: 20,
                  ease: "linear",
                }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border border-purple-500/20"
                animate={{ rotate: -360 }}
                transition={{
                  repeat: Infinity,
                  duration: 25,
                  ease: "linear",
                }}
              />
              
              {/* Main Image with enhanced animation */}
              <motion.div
                className="w-full h-full rounded-2xl overflow-hidden shadow-2xl border-4 border-gray-700"
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: "0 0 25px rgba(6, 182, 212, 0.5)"
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

              {/* Floating elements with enhanced animation */}
              <motion.div
                className="absolute -top-4 -right-4 w-8 h-8 bg-cyan-500 rounded-full opacity-80"
                animate={{ 
                  y: [0, -10, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-500 rounded-full opacity-80"
                animate={{ 
                  y: [0, 10, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
              />
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
              className="text-gray-300 text-lg leading-relaxed mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              I'm <span className="font-semibold text-white bg-gradient-to-r from-cyan-500/20 to-purple-500/20 px-1 rounded">Milonee Patel</span>, a passionate{" "}
              <span className="text-cyan-400 font-medium">Frontend Designer & Developer</span> crafting modern, responsive, and immersive digital experiences.  
            </motion.p>
            <motion.p 
              className="text-gray-300 text-lg leading-relaxed mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              I've mastered <span className="highlight-text">CSS, Bootstrap, Tailwind, React, and Node.js</span> and am currently expanding my expertise in{" "}
              <span className="highlight-text">Sass, Canva, and Three.js</span> to elevate my design and 3D web capabilities.
            </motion.p>
            <motion.p 
              className="text-gray-400 text-md mb-6 border-l-4 border-teal-500 pl-4 py-2 italic"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              My goal is to master frontend design — from elegant UI/UX to performance-driven applications — 
              delivering visually stunning, user-focused experiences that make an impact.
            </motion.p>
            {/* Fun Facts */}
            <motion.div
              className="grid grid-cols-2 gap-4 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {facts.map((fact, index) => (
                <motion.div
                  key={index}
                  className="flex items-center p-4 bg-gray-800/40 rounded-lg border border-gray-700/30 hover:bg-gray-700/40 transition-colors"
                  whileHover={{ 
                    scale: 1.03,
                    boxShadow: "0 5px 15px rgba(0,0,0,0.2)"
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 + index * 0.1 }}
                >
                  <div className="mr-3">
                    {fact.icon}
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-cyan-400">{fact.value}</p>
                    <p className="text-sm text-gray-400">{fact.label}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
            
        </div>

        {/* Skills Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
         <h3 className="text-4xl font-bold mb-3 relative inline-block">
  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 relative inline-block overflow-hidden">
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
</h3>
          <div className="h-1 w-20 bg-gradient-to-r from-teal-400 to-purple-500 mx-auto rounded-full mb-8"></div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-4xl mx-auto">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.08,
                  z: 10,
                  transition: { type: "spring", stiffness: 300, damping: 15 }
                }}
                className="flex flex-col items-center justify-center p-5 bg-gray-800/50 rounded-2xl backdrop-blur-sm border border-gray-700/30 skill-card"
              >
                <div className="mb-3">{skill.icon}</div>
                <span className="text-md font-medium text-gray-300 mb-2">{skill.name}</span>
                <div className="w-full bg-gray-700 rounded-full h-2.5 mt-2">
                  <motion.div 
                    className="h-2.5 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1.5, delay: index * 0.1 + 0.5, ease: "easeOut" }}
                  />
                </div>
                {/* <span className="text-xs text-gray-400 mt-1">{skill.level}%</span> */}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <p className="text-gray-400 mb-6 text-lg">Interested in working together?</p>
          <motion.button
            whileHover={{ 
              scale: 1.05,
              background: "linear-gradient(to right, #06b6d4, #8b5cf6)",
              boxShadow: "0 5px 15px rgba(6, 182, 212, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-medium text-white shadow-lg text-lg"
          >
            Get In Touch
          </motion.button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="flex justify-center gap-6 mt-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.7 }}
        >
          <motion.a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ y: -5, scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            className="p-4 bg-gray-800/50 rounded-full backdrop-blur-sm border border-gray-700/30 social-link"
          >
            <FaGithub className="text-2xl hover:text-white transition" />
          </motion.a>
          <motion.a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ y: -5, scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            className="p-4 bg-gray-800/50 rounded-full backdrop-blur-sm border border-gray-700/30 social-link"
          >
            <FaLinkedin className="text-2xl hover:text-blue-400 transition" />
          </motion.a>
        </motion.div>
      </div>

      {/* Add CSS for text highlighting */}
      <style>
        {`
          .highlight-text {
            background: linear-gradient(to right, #06b6d4, #8b5cf6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-weight: 600;
            padding: 0 2px;
          }
          
          .skill-card {
            transition: all 0.3s ease;
          }
          
          .skill-card:hover {
            box-shadow: 0 10px 25px rgba(6, 182, 212, 0.2);
            transform: translateY(-5px);
          }
          
          .social-link {
            transition: all 0.3s ease;
          }
          
          .social-link:hover {
            box-shadow: 0 5px 15px rgba(255, 255, 255, 0.1);
          }
             .text-shine {
    position: relative;
    display: inline-block;
    background: linear-gradient(to right, #0ce8eb, #2a7fff, #8b5cf6);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    overflow: hidden;
  }
  
  .text-shine::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent);
    animation: textShine 3s infinite;
    mask: linear-gradient(#fff 0 0) text;
    -webkit-mask: linear-gradient(#fff 0 0) text;
  }
  
  @keyframes textShine {
    0% { transform: translateX(-100%) skewX(-15deg); }
    100% { transform: translateX(200%) skewX(-15deg); }
  }
  
        `}
      </style>
    </section>
  );
};

export default About;
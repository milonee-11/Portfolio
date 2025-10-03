import { useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
// All necessary icons are imported
import { FaGraduationCap, FaArrowUp, FaArrowLeft } from "react-icons/fa";
// Link is correctly imported for navigation
import { Link } from "react-router-dom";
// Assuming you have a separate Loader.tsx file
import Loader from "./Loader";

// Define a type for the education data for better TypeScript practice
interface EducationItem {
  title: string;
  icon: string;
  details: string;
}

const educationData: EducationItem[] = [
  {
    title: "Schooling",
    icon: "🏫",
    details:
      "I completed my 10th at SKUM School, Ahmedabad, securing 89%, and pursued my 12th at The National High School, specializing in the Science stream with a focus on Mathematics and Computer Science, where I achieved a 93 percentile in Science.",
  },
  {
    title: "College",
    icon: "🎓",
    details:
      "Currently, I am pursuing a Bachelor of Engineering in Information Technology (2023–2027) at LJ University (Lok Jagruti Kendra University). My academic journey here is shaping my technical foundation, enhancing problem-solving skills, and preparing me for real-world challenges in the IT field.",
  },
  {
    title: "Online Courses",
    icon: "💻",
    details:
      "To strengthen my knowledge beyond academics, I have completed several online certifications, including IBM Exploratory Data Analysis for Machine Learning (IBM, Coursera), TCS iON Career Edge – Young Professional Program, and Introduction to HTML, CSS, and JavaScript. These courses have broadened my expertise and given me hands-on exposure to both technical and professional skills.",
  },
];

const Education = () => {
  const [, setShowScrollTop] = useState(false);
  const [loading, setLoading] = useState(true); // State for loader

  const { scrollYProgress } = useScroll(); // Scroll tracking for the timeline effect
  // Maps scroll progress (0 to 1) to the scaleY property (0 to 1).
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Handle scroll and loading
  useEffect(() => {
    // Simulate loading time for the content
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // 1.5 seconds loading time

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Create falling cubes for background
  useEffect(() => {
    const educationSection = document.getElementById("education");
    if (!educationSection) return;

    const cubes: HTMLDivElement[] = [];

    for (let i = 0; i < 15; i++) {
      const cube = document.createElement("div");
      cube.className =
        "absolute w-3 h-3 bg-gradient-to-br from-cyan-400/10 to-purple-500/10 rotate-45 z-0";
      cube.style.left = `${Math.random() * 100}%`;
      cube.style.top = `${Math.random() * 100}%`;
      cube.style.animation = `fallingCube ${
        15 + Math.random() * 10
      }s linear infinite`;
      cube.style.animationDelay = `${Math.random() * 5}s`;
      educationSection.appendChild(cube);
      cubes.push(cube);
    }

    return () => {
      cubes.forEach((cube) => {
        if (educationSection.contains(cube)) {
          educationSection.removeChild(cube);
        }
      });
    };
  }, []);

  return (
    <>
      {/* Loader Component */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900"
          >
            <Loader />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {/* Education Section - FIX: Consolidated the className string to remove irregular whitespace */}
          <section
            id="education"
            className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black text-white dark:text-white light:text-gray-800 px-6 py-16 overflow-hidden mt-0"
          >
            {/* Animated Background Blobs and Cubes CSS (kept as is) */}
            <motion.div
              className="absolute top-10 left-1/4 w-72 h-72 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-30 z-0"
              animate={{
                x: [0, 100, -100, 0],
                y: [0, -50, 50, 0],
                rotate: [0, 360],
              }}
              transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-10 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 z-0"
              animate={{
                x: [0, -120, 120, 0],
                y: [0, 60, -60, 0],
                rotate: [360, 0],
              }}
              transition={{ repeat: Infinity, duration: 14, ease: "easeInOut" }}
            />
            <style>
              {`
                @keyframes fallingCube {
                  0% { transform: translateY(-100vh) rotate(0deg); opacity: 0; }
                  10% { opacity: 0.5; }
                  90% { opacity: 0.5; }
                  100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
                }
              `}
            </style>

            {/* Main Content */}
            <div className="relative z-10 w-full max-w-6xl mx-auto mb-0">
              {/* Header */}
              <motion.div
                initial={{ y: -50, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
                className="text-center mb-16 relative"
              >
                <motion.div
                  className="inline-block mb-4"
                  animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <FaGraduationCap className="text-6xl text-cyan-400" />
                </motion.div>
                <h1 className="text-5xl md:text-7xl font-bold mb-3 relative inline-block">
                  <span className="mt-7 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 relative inline-block overflow-hidden">
                    Education Journey
                    
                  </span>
                </h1>
                <div className="h-1 w-32 bg-gradient-to-r from-teal-400 to-purple-500 mx-auto rounded-full mb-4"></div>
              </motion.div>

              {/* Timeline Section */}
              <div className="relative">
                {/* Dynamic Timeline Line - Scroll-based Growth Effect */}
                <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-1 h-full">
                  <motion.div
                    className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-cyan-500 via-purple-500 to-cyan-500 rounded-full origin-top"
                    style={{ scaleY }} // Applies the scroll-based growth effect
                  />
                </div>

                {/* Animated Glow Effect on Timeline (kept for visual flair) */}
                <motion.div
                  className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-2 h-full bg-cyan-400 opacity-20 rounded-full"
                  animate={{ opacity: [0.1, 0.3, 0.1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Education Items */}
                <div className="space-y-16 relative z-10">
                  {educationData.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false, amount: 0.3 }}
                      transition={{
                        duration: 0.7,
                        delay: index * 0.15,
                        type: "spring",
                        stiffness: 100,
                      }}
                      className={`relative flex items-center ${
                        // On desktop (md+), alternate the content left/right.
                        // On mobile, force all content to be aligned left (default flex-row).
                        index % 2 === 0
                          ? "flex-row"
                          : "md:flex-row-reverse flex-row"
                      }`}
                    >
                      {/* Content Card */}
                      <div
                        className={`w-full md:w-1/2 ${
                          // Desktop: Right padding for left items, left padding for right items.
                          // Mobile: Left padding to create space for the timeline line and node.
                          index % 2 === 0 ? "md:pr-8 pl-16" : "md:pl-8 pl-16"
                        }`}
                      >
                        <motion.div
                          className="bg-gray-800/70 backdrop-blur-sm p-6 md:p-8 shadow-xl hover:shadow-cyan-500/30 transition-all duration-500 group relative overflow-hidden"
                          whileHover={{
                            scale: 1.02,
                            boxShadow: "0 20px 40px rgba(6, 182, 212, 0.2)",
                          }}
                        >
                          {/* Background Gradient on Hover */}
                          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                          {/* Header */}
                          <div className="flex items-center gap-4 mb-4 md:mb-6 relative z-10">
                            <motion.div
                              className="text-3xl md:text-4xl"
                              whileHover={{ scale: 1.2, rotate: 360 }}
                              transition={{ duration: 0.5 }}
                            >
                              {item.icon}
                            </motion.div>
                            <h3 className="text-xl md:text-2xl font-bold text-cyan-300 group-hover:text-cyan-200 transition-colors duration-300">
                              {item.title}
                            </h3>
                          </div>

                          {/* Details - Adjusted font size for mobile readability */}
                          <p className="text-gray-300 leading-relaxed text-base md:text-lg relative z-10 group-hover:text-gray-200 transition-colors duration-300">
                            {item.details}
                          </p>

                          {/* Floating Particles (Kept as is) */}
                          
                        </motion.div>
                      </div>

                      {/* Timeline Node - Position adjusted for Mobile/Desktop */}
                      <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-16 h-16 flex items-center justify-center">
                        <motion.div
                          className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full border-4 border-gray-900 shadow-lg relative"
                          whileHover={{
                            scale: 1.3,
                            boxShadow: "0 0 20px rgba(6, 182, 212, 0.8)",
                          }}
                          animate={{
                            scale: [1, 1.1, 1],
                            boxShadow: [
                              "0 0 0px rgba(6, 182, 212, 0.4)",
                              "0 0 20px rgba(6, 182, 212, 0.8)",
                              "0 0 0px rgba(6, 182, 212, 0.4)",
                            ],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: index * 0.5,
                          }}
                        >
                          <motion.div
                            className="absolute inset-0 border-2 border-cyan-400 rounded-full"
                            animate={{
                              scale: [1, 2, 1],
                              opacity: [0.7, 0, 0.7],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: index * 0.5,
                            }}
                          />
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="h-16"></div> {/* Reduced spacer height */}

              {/* Additional Info Section - My Learning Philosophy */}
              <motion.div
                initial={{ opacity: 0, y: 30, rotateX: 15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1, type: "spring", stiffness: 50 }}
                className="mt-16 text-center perspective-1000"
              >
                <div className="relative p-8 md:p-10 max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl shadow-cyan-500/10 bg-gray-900/80 backdrop-blur-sm transition-shadow duration-500 hover:shadow-purple-500/20">
                  {/* Internal Gradient Glow (no border) */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-70"></div>

                  <div className="relative z-10">
                    <h3 className="text-2xl md:text-3xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 drop-shadow-lg ">
                    My Learning Philosophy
                    </h3>
                    <p className="text-gray-200 text-base md:text-lg leading-relaxed font-light">
                      I believe in{" "}
                      <span className="text-cyan-400 font-bold">
                        continuous learning
                      </span>{" "}
                      and
                      <span className="text-purple-400 font-bold">
                        {" "}
                        hands-on practice
                      </span>
                      . Every course, project, and certification is a step
                      toward mastering the art of creating exceptional digital
                      experiences. I'm committed to staying updated with the
                      latest technologies and best practices in frontend
                      development.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* NEW: Back to Home Button */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mt-12 mb-20 text-center"
              >
                <Link to="/">
                  <motion.button
                    className="flex items-center justify-center mx-auto py-3 px-8 text-lg font-semibold rounded-full relative overflow-hidden group
                                
                                 shadow-lg hover:shadow-cyan-400/50 transition-all duration-300 "
                    whileHover={{ scale: 1.05}}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaArrowLeft className="mr-3 " />
                    Back to Home
                    {/* Shine Effect on Hover */}
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent   "></span>
                  </motion.button>
                </Link>
              </motion.div>
              {/* END NEW: Back to Home Button */}
            </div>
          </section>

         <motion.button
  onClick={scrollToTop}
  className="scroll-top-btn fixed z-40 bottom-4 right-4 md:bottom-8 md:right-4 
             justify-center bg-gradient-to-r from-cyan-500 to-purple-500 text-white p-3 rounded-full shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
>
  <FaArrowUp className="text-xl" />
</motion.button>



          {/* Footer (Kept as is) */}
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
        </motion.div>
      )}


       <style>
        {`
          .skill-card:hover {
            box-shadow: 0 0 20px rgba(6, 182, 212, 0.3);
            transform: translateY(-5px);
          }
          
          .highlight-text {
            background: linear-gradient(90deg, #06b6d4, #8b5cf6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-weight: 600;
          }
          
          /* Smooth scrolling for the entire page */
          html {
            scroll-behavior: smooth;
          }
          
          /* Custom scrollbar */
          ::-webkit-scrollbar {
            width: 8px;
          }
          
          ::-webkit-scrollbar-track {
            background: #1f2937;
          }
          
          ::-webkit-scrollbar-thumb {
            background: linear-gradient(to bottom, #06b6d4, #8b5cf6);
            border-radius: 4px;
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(to bottom, #0891b2, #7c3aed);
          }

         /* center button only on mobile */
@media (max-width: 768px) {
  .scroll-top-btn {
    left: 50%;
    right: auto;
    transform: translateX(-50%);
    bottom: 20px;
  }
}

        `}
      </style>
    </>
  );
};

export default Education;
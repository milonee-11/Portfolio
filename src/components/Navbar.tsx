import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [activeSection, setActiveSection] = useState("Home");

  const navLinks = ["Home", "About", "Skills", "Projects", "Contact", "Education"];

  // Theme sync with system and localStorage
  useEffect(() => {
    // Check localStorage for saved theme or use system preference
    const savedTheme = localStorage.getItem("theme");
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    
    const initialTheme = savedTheme || systemTheme;
    setTheme(initialTheme);
    
    // Apply theme to document
    if (initialTheme === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  }, []);

  // Update theme when it changes
  useEffect(() => {
    // Save theme preference
    localStorage.setItem("theme", theme);
    
    // Apply theme to document
    if (theme === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  }, [theme]);

  // Scroll spy for active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => {
        const section = document.getElementById(link.toLowerCase());
        return {
          name: link,
          element: section,
          offset: section ? Math.abs(section.getBoundingClientRect().top) : Infinity
        };
      });

      // Find the section closest to the top
      const nearest = sections.reduce((prev, curr) => 
        curr.offset < prev.offset ? curr : prev
      );
      
      setActiveSection(nearest.name);
    };

    window.addEventListener("scroll", handleScroll);
    // Call once on mount to set initial active section
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Function to open Gmail compose window
  const handleHireMeClick = () => {
    const email = "miloneep@gmail.com";
    const subject = "Job Opportunity";
    const body = "Hello Milonee,\n\nI would like to discuss a potential opportunity with you.";
    
    window.open(`https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, "_blank");
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 w-full z-50 shadow-lg 
                   bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm
                   light:bg-white/90 dark:bg-gray-900/90"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center relative">
          {/* Mobile Menu Button - Left */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 dark:text-gray-200 focus:outline-none z-10"
            aria-label="Toggle menu"
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Logo - Hidden on mobile, visible on desktop */}
          <motion.a
            whileHover={{ scale: 1.1 }}
            className="
              relative text-2xl font-extrabold tracking-wide 
              text-transparent bg-clip-text 
              bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500
              cursor-pointer overflow-hidden group
              hidden md:block
            "
            href="#home"
          >
            Portfolio
          </motion.a>

          {/* Desktop Nav */}
          <ul className="hidden md:flex space-x-8 font-medium">
            {navLinks.map((link, idx) => (
              <motion.li
                key={idx}
                whileHover={{ scale: 1.15 }}
                className={`cursor-pointer relative group ${
                  activeSection === link ? "text-cyan-400" : ""
                }`}
              >
                <a
                  href={`#${link.toLowerCase()}`}
                  className={`transition duration-300 ${
                    activeSection === link
                      ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500"
                      : "text-gray-700 dark:text-gray-200 hover:text-cyan-400"
                  }`}
                >
                  {link}
                </a>

                {/* Hover underline glow */}
                {activeSection !== link && (
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 transition-all group-hover:w-full" />
                )}
              </motion.li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            {/* Hire Me Button with Continuous Border Animation */}
            <motion.button
              onClick={handleHireMeClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative px-5 py-2 rounded-3xl font-semibold
                         text-white
                         bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500
                         shadow-lg hover:shadow-cyan-500/50 transition duration-300
                         overflow-hidden group hire-me-btn"
            >
              <span className="relative z-10">Hire Me</span>
              {/* Continuous border animation */}
              <span className="absolute inset-0 rounded-3xl p-[2px] hire-me-border"></span>
              {/* Shine sweep */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent
                             -translate-x-full group-hover:translate-x-full 
                             transition-transform duration-700 ease-in-out"></span>
            </motion.button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isOpen && (
            <motion.ul
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="md:hidden px-6 py-4 space-y-4 font-medium 
                         bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm mt-4"
            >
              {navLinks.map((link, idx) => (
                <li
                  key={idx}
                  className={`cursor-pointer transition duration-300 ${
                    activeSection === link
                      ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500"
                      : "text-gray-700 dark:text-gray-200 hover:text-cyan-400"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <a href={`#${link.toLowerCase()}`}>{link}</a>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Add styles for the continuous border animation */}
      <style>{`
          .hire-me-border{
          background: linear-gradient(90deg, #22d3ee, #3b82f6, #8b5cf6, #3b82f6, #22d3ee);
          background-size: 300% 100%;
          animation: gradientMove 3s linear infinite;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;}
        
        @keyframes gradientMove {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 300% 50%;
          }
        }
        
        .hire-me-btn:hover .hire-me-border {
          animation: gradientMove 1s linear infinite;
        }
      `}
      </style>
    </>
  );
};

export default Navbar;
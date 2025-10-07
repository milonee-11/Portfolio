import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const navLinks = ["Home", "About", "Skills", "Projects", "Contact", "Education"];

  // Theme sync with system
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    const updateTheme = () => {
      const systemIsDark = mediaQuery.matches;
      setIsDarkTheme(systemIsDark);
      
      // Apply theme to document
      if (systemIsDark) {
        document.documentElement.classList.remove("light");
      } else {
        document.documentElement.classList.add("light");
      }
    };

    // Set initial theme
    updateTheme();
    
    // Listen for theme changes
    const handleThemeChange = (e: MediaQueryListEvent) => {
      setIsDarkTheme(e.matches);
      if (e.matches) {
        document.documentElement.classList.remove("light");
      } else {
        document.documentElement.classList.add("light");
      }
    };

    mediaQuery.addEventListener("change", handleThemeChange);
    
    return () => {
      mediaQuery.removeEventListener("change", handleThemeChange);
    };
  }, []);

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

  // Function to open email client (works on both mobile and desktop)
  const handleHireMeClick = () => {
    const email = "miloneep@gmail.com";
    const subject = "Job Opportunity";
    const body = "Hello Milonee,\n\nI would like to discuss a potential opportunity with you.";
    
    // Check if it's a mobile device
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) {
      // For mobile devices, use mailto link
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    } else {
      // For desktop, use Gmail web interface
      window.open(`https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, "_blank");
    }
  };

  // Theme-based background colors
  const getNavbarBackground = () => {
    return isDarkTheme 
      ? "bg-gray-900/90 backdrop-blur-sm" 
      : "bg-white/90 backdrop-blur-sm";
  };

  const getMobileNavBackground = () => {
    return isDarkTheme 
      ? "bg-gray-900/95 backdrop-blur-sm" 
      : "bg-white/95 backdrop-blur-sm";
  };

  // Theme-based text colors
  const getTextColor = (type: 'default' | 'hover' | 'active' = 'default') => {
    if (type === 'default') {
      return isDarkTheme ? "text-gray-200" : "text-gray-700";
    }
    if (type === 'hover') {
      return "hover:text-cyan-400";
    }
    if (type === 'active') {
      return "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500";
    }
    return "";
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-50 shadow-lg ${getNavbarBackground()}`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center relative">
          {/* Mobile Menu Button - Left */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden focus:outline-none z-10 ${getTextColor()}`}
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
                      ? getTextColor('active')
                      : `${getTextColor()} ${getTextColor('hover')}`
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
              className={`md:hidden px-6 py-4 space-y-4 font-medium ${getMobileNavBackground()} mt-4`}
            >
              {navLinks.map((link, idx) => (
                <li
                  key={idx}
                  className={`cursor-pointer transition duration-300 ${
                    activeSection === link
                      ? getTextColor('active')
                      : `${getTextColor()} ${getTextColor('hover')}`
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
          mask-composite: exclude;
        }
        
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

        /* Theme transition for smooth color changes */
        * {
          transition: background-color 0.3s ease, color 0.3s ease;
        }
      `}
      </style>
    </>
  );
};

export default Navbar;
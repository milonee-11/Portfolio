import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const Loader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  // Detect system theme
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkTheme(mediaQuery.matches);
    
    const handleThemeChange = (e: MediaQueryListEvent) => {
      setIsDarkTheme(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleThemeChange);
    return () => mediaQuery.removeEventListener('change', handleThemeChange);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000); // Loader duration
    return () => clearTimeout(timer);
  }, []);

  // Theme-based background color
  const getBackgroundColor = () => {
    return isDarkTheme ? "bg-black" : "bg-white";
  };

  // Theme-based inner cube background
  const getCubeBackground = () => {
    return isDarkTheme ? "bg-black" : "bg-white";
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className={`fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden ${getBackgroundColor()}`}
        >
          {/* Expanding Gradient Fill */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 20 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className={`absolute w-40 h-40 rounded-full bg-gradient-to-r from-teal-400 via-cyan-500 to-purple-600 ${
              isDarkTheme ? "" : "opacity-80"
            }`}
          />

          {/* Glow Effect */}
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className={`absolute w-60 h-60 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 blur-3xl ${
              isDarkTheme ? "opacity-70" : "opacity-50"
            }`}
          />

          {/* 🔹 Center Cube Animation */}
          <motion.div
            className="relative w-20 h-20"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          >
            {/* Glowing cube layers */}
            <motion.div
              className={`absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 blur-lg ${
                isDarkTheme ? "opacity-70" : "opacity-90"
              }`}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut",
              }}
            />
            <motion.div className={`absolute inset-0 rounded-xl ${getCubeBackground()}`}></motion.div>
          </motion.div>

          {/* Additional theme-adaptive elements */}
          {!isDarkTheme && (
            <>
              {/* Light theme additional glow */}
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-80 h-80 rounded-full bg-cyan-200 blur-2xl opacity-40"
              />
              
              {/* Light theme particles */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-cyan-400 rounded-full"
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                    x: [0, Math.random() * 100 - 50],
                    y: [0, Math.random() * 100 - 50],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeOut",
                  }}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                />
              ))}
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
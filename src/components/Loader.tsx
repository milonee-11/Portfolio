import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const Loader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000); // Loader duration
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-black"
        >
          {/* Expanding Gradient Fill */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 20 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute w-40 h-40 rounded-full bg-gradient-to-r from-teal-400 via-cyan-500 to-purple-600
"
          />

          {/* Glow Effect */}
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-60 h-60 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 blur-3xl opacity-70"
          />

          {/* 🔹 Center Cube Animation (your code inserted here) */}
          <motion.div
            className="relative w-20 h-20"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          >
            {/* Glowing cube layers */}
            <motion.div
              className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 blur-lg opacity-70"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut",
              }}
            />
            <motion.div className="absolute inset-0 rounded-xl bg-black"></motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;

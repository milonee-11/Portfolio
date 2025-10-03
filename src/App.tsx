// src/App.tsx
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Education from "./components/Education";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // simulate loading for 3 seconds
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/about" element={<About />} />
        <Route path="/edu" element={<Education />} />
      </Routes>
    </>
  );
}

export default App;

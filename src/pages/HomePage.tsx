import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Leaf, BrainCircuit, Bot, ChevronDown } from 'lucide-react';
import CarbonCalculator from '../components/CarbonCalculator'; // Assuming this component is used elsewhere or will be.

// Import video + fallback image
import forestVideo from '../assets/forest.mp4';
import forestVideoMobile from '../assets/forest1.mp4';
import forestVideoMobile2 from '../assets/forest2.mp4';
import forestBackground from '../assets/forest.jpg';

// Import the HeroFloraCarbonAI (tree viz) component
import HeroFloraCarbonAI from '../components/HeroFloraCarbonAI';
import VideoCard from '../components/VideoCard';

const HomePage: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [shouldPlayVideo, setShouldPlayVideo] = useState(false);

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      const mobile = window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(mobile);
      
      // Show video on both mobile and desktop
      setShouldPlayVideo(true);
      
      // Debug logging
      console.log('Mobile detected:', mobile);
      console.log('Should play video:', true);
      console.log('Video URL:', mobile ? forestVideoMobile : forestVideo);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="bg-black text-white">
      {/* --- Hero Section --- */}
      <div className="relative h-screen flex flex-col justify-center items-center text-center overflow-hidden">
        {/* Background video for desktop only */}
        {!isMobile && shouldPlayVideo ? (
        <video
          src={forestVideo}
          autoPlay
          loop
          muted
          playsInline
            webkit-playsinline="true"
          className="absolute inset-0 w-full h-full object-cover"
            poster={forestBackground}
            preload="auto"
            style={{ zIndex: 1 }}
            onError={() => {
              console.log('Desktop video failed to load, falling back to image');
              setShouldPlayVideo(false);
            }}
            onLoadStart={() => {
              console.log('Desktop video started loading');
            }}
            onCanPlay={() => {
              console.log('Desktop video can play');
            }}
            onPlay={() => {
              console.log('Desktop video is playing');
            }}
          />
        ) : (
          <div 
            className="absolute inset-0 w-full h-full bg-white"
            style={{ 
              zIndex: 1
            }}
          />
        )}

        {/* Dark overlay (now spans the entire hero section, directly over the video) */}
        <div className="absolute inset-0"></div>

        {/* Mobile Layout: Text above, Video Card below */}
        {isMobile ? (
          <div className="relative z-10 flex flex-col h-full w-full px-6 pt-16">
            {/* Upper Half: Text Content */}
            <div className="flex-1 flex flex-col justify-center items-center text-center mb-8">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="text-2xl sm:text-3xl font-bold mb-6 text-black drop-shadow-lg"
              >
                We plant trees. <br />Monitor tree growth. <br />Calculate and verify<br /> carbon credits.
              </motion.h1>
            
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="mt-8"
              >
                <Link to="/services" className="btn-primary text-sm sm:text-base">Our Technology</Link>
              </motion.div>
            </div>

            {/* Lower Half: Video Card */}
            <div className="flex-1 flex items-center justify-center pb-8">
              <VideoCard 
                videoSrc={forestVideoMobile2}
                className="w-full max-w-lg mx-auto"
              />
            </div>
          </div>
        ) : (
          /* Desktop Layout: Side by side */
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center max-w-7xl mx-auto px-6">
          
          {/* Left: Text Content */}
            <div className="text-center lg:text-left mb-8 lg:mb-0 px-4 lg:px-0">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-6 text-black drop-shadow-lg"
              >
                We plant trees. <br />Monitor tree growth. <br />Calculate and verify<br /> carbon credits.
              </motion.h1>
          
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
                className="mt-8"
            >
                <Link to="/services" className="btn-primary text-sm sm:text-base">Our Technology</Link>
            </motion.div>
          </div>

          {/* Right: Tree Growth Visualization */}
            <div className="hidden lg:block">
            <HeroFloraCarbonAI />
          </div>
        </div>
        )}

        {/* Bounce Arrow */}
        <motion.div
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-8 h-8 text-white animate-bounce" />
        </motion.div>
      </div>

      {/* --- START: GPT Tool Box (No changes below this line) --- */}
      <section className="py-16 px-6 md:px-12 bg-gradient-to-b from-black via-emerald-950 to-black">
        <div className="max-w-7xl mx-auto p-8 rounded-2xl bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 border border-emerald-800 backdrop-blur-sm text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-emerald-200 mb-6">
            Try Flora Carbon GPT!
          </h2>
          <p className="text-lg text-gray-300 max-w-lg mx-auto mb-8 leading-relaxed">
            The world’s smartest assistant for answering any question on Carbon Standards and Project requirements.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Link
              to="/auth"
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg"
            >
              <Bot className="h-5 w-5 group-hover:animate-pulse" />
              Start Chatting with Flora Carbon GPT
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            </Link>
            <p className="text-sm text-gray-400 mt-4">Free to use • Powered by AI</p>
          </motion.div>
        </div>
      
      {/* --- END: GPT Tool Box --- */}

      {/* --- START: Carbon Calculator Box --- */}
      
        <div className="max-w-7xl mx-auto p-8 rounded-2xl bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 border border-emerald-800 backdrop-blur-sm text-center mt-8">
          <h2 className="text-3xl md:text-5xl font-bold text-emerald-200 mb-6">
            Try Carbon Credit Calculator!
          </h2>
          <p className="text-lg text-gray-300 max-w-lg mx-auto mb-8 leading-relaxed">
            Quickly estimate the potential carbon credits of a forestry project with our intelligent calculator.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <a
              href="http://3.110.136.40:5001/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg"
            >
              <Bot className="h-5 w-5 group-hover:animate-pulse" />
              Launch Calculator
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            </a>
            <p className="text-sm text-gray-400 mt-4">Free to use • No registration required</p>
          </motion.div>
        </div>
      </section>
      {/* --- END: Carbon Calculator Box --- */}
      
      <section className="py-16 px-6 md:px-12 bg-gradient-to-b from-black via-emerald-950 to-black">
        <h2 className="text-center text-3xl md:text-4xl font-bold text-emerald-200 mb-12">
          An Integrated Climate Intelligence Platform
        </h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl shadow-lg transition duration-300 bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 border border-emerald-800 hover:scale-[1.02] p-8 flex flex-col items-center text-center space-y-4"
          >
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-emerald-800/60 border border-emerald-600">
              <Bot className="h-8 w-8 text-emerald-300" />
            </div>
            <h3 className="font-bold text-lg text-emerald-100">Flora Carbon GPT</h3>
            <p className="text-sm text-emerald-300">
              Your AI climate expert for instant, data-driven insights and project analysis.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl shadow-lg transition duration-300 bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 border border-emerald-800 hover:scale-[1.02] p-8 flex flex-col items-center text-center space-y-4"
          >
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-emerald-800/60 border border-emerald-600">
              <Leaf className="h-8 w-8 text-emerald-300" />
            </div>
            <h3 className="font-bold text-lg text-emerald-100">AI-Powered MRV</h3>
            <p className="text-sm text-emerald-300">
              Cutting-edge AI for precise Measurement, Reporting, and Verification.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="rounded-2xl shadow-lg transition duration-300 bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 border border-emerald-800 hover:scale-[1.02] p-8 flex flex-col items-center text-center space-y-4"
          >
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-emerald-800/60 border border-emerald-600">
              <Leaf className="h-8 w-8 text-emerald-300" />
            </div>
            <h3 className="font-bold text-lg text-emerald-100">Carbon Project Consultation</h3>
            <p className="text-sm text-emerald-300">
              End-to-end consultation to develop high-integrity, impactful carbon projects.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="rounded-2xl shadow-lg transition duration-300 bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 border border-emerald-800 hover:scale-[1.02] p-8 flex flex-col items-center text-center space-y-4"
          >
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-emerald-800/60 border border-emerald-600">
              <BrainCircuit className="h-8 w-8 text-emerald-300" />
            </div>
            <h3 className="font-bold text-lg text-emerald-100">Climate Education & Training</h3>
            <p className="text-sm text-emerald-300">
              Empowering organizations with the knowledge to lead in the green economy.
            </p>
          </motion.div>
        </div>

        <div className="container-padding mx-auto text-center relative z-10 mt-[50px]">
          <Link to="/contact" className="btn-primary">Partner With Us</Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Leaf, BrainCircuit, Bot } from 'lucide-react';
import CarbonCalculator from '../components/CarbonCalculator'; // Assuming this component is used elsewhere or will be.
import { redirectToGPT } from '../utils/auth';
import { useAuth } from '../contexts/AuthContext';
import UpgradePrompt from '../components/UpgradePrompt';
import heroFooterImg from "../assets/herosectionfooter.png";
import cuttingEdgeImgright from "../assets/cuttingedgetechnologyright.png";
import cuttingEdgeImgleft from "../assets/cuttingedgetechnologyleft.png";
import brand1Img from "../assets/brand1.png";
import backyard_botanistImg from "../assets/Backyard_Botanists.png";
import XpandfoundationImg from "../assets/XpandFoundation.png";
import group200Img from "../assets/Group200.png";
import group205Img from "../assets/Group205.png";
import grofoundationImg from "../assets/gro_foundation_logo.png";

// Import video + fallback image
import forestVideo from '../assets/fright.mp4';
import forestVideoMobile from '../assets/forest1.mp4';
import forestVideoMobile2 from '../assets/fcenter.mp4';

// Import the HeroFloraCarbonAI (tree viz) component
import HeroFloraCarbonAI from '../components/HeroFloraCarbonAI';
import VideoCard from '../components/VideoCard';

const HomePage: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [shouldPlayVideo, setShouldPlayVideo] = useState(false);
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);
  const desktopVideoRef = React.useRef<HTMLVideoElement>(null);
  const { isAuthenticated, checkGptAccess, trialStatus } = useAuth();

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
    <div className="bg-[#fdfdfd] text-white">
      {/* --- Hero Section --- */}
      <section className="relative flex flex-col justify-center items-center text-center overflow-hidden">
        {isMobile ? (
          // Mobile Layout: Text above, Video Card below
          <div className="relative z-10 flex flex-col h-full w-full px-6 pt-16">
            {/* Upper Half: Text Content */}
            <div className="flex-1 flex flex-col justify-start items-center text-center mb-8">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="text-2xl sm:text-3xl font-bold mb-6 text-black drop-shadow-lg"
              >
                We Plant Trees. <br />Monitor tree growth. <br />Calculate and verify<br /> carbon credits.
              </motion.h1>
            
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="mt-8"
              >
                <Link to="/services" className="btn-primary text-sm sm:text-base mr-4">Our Technology</Link>
                <Link to="/pricing" className="btn-secondary text-sm sm:text-base">View Pricing</Link>
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
          /* Desktop Layout: Side by side using two separate divs (flex-based) */
          <div className="container relative z-10 flex flex-row items-start gap-8 w-full lg:pt-[10rem] xl:pt-[7rem] 2xl:pt-[10rem]">
            <div className="basis-[80%] shrink-0 text-left mb-8 px-4 lg:px-0 z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="lg:text-3xl xl:text-4xl 2xl:text-6xl font-bold  text-black drop-shadow-lg"
              >
                We Plant Trees.
              </motion.div>

              <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="lg:text-2xl xl:text-3xl 2xl:text-5xl font-light text-black drop-shadow-lg"
              >
                <br />Monitor tree growth. Calculate and <br />verify carbon credits.
              </motion.div>
            
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="mt-14"
              >
                  <Link to="/pricing" className="btn-grey-border text-sm sm:text-base rounded-full px-5 py-2 mr-4">View Pricing</Link>
                  <Link to="/services" className="btn-primary text-sm sm:text-base rounded-full px-5 py-2">Our Technology</Link>
              </motion.div>

               <div>
                <HeroFloraCarbonAI videoRef={desktopVideoRef} />
              </div>
            </div>

            <div className="basis-[20%]">
              {/* Background video for desktop only */}
              {!isMobile && shouldPlayVideo ? (
              <video
                ref={desktopVideoRef}
                src={forestVideo}
                autoPlay
                loop
                muted
                playsInline
                webkit-playsinline="true"
                className="absolute inset-0 w-full h-full object-cover lg:pt-[10rem] xl:pt-[7rem] 2xl:pt-[10rem]"
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
            </div>
        </div>
        )}

        {/* Centered inline box*/}
        <div className="container flex justify-center mx-auto pt-10 pb-10 z-10">
          <div className="relative rounded-xl border border-gray-200 shadow-sm overflow-hidden h-[120px] w-full">
            <img 
              src={heroFooterImg} 
              alt="herofooter" 
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>
            {/* Content */}
            <div className="relative h-full flex flex-col items-center justify-center px-5 text-center">
              <h2 className="text-white text-2xl sm:text-3xl font-medium mb-3 font-outfit">
                Leading the way in sustainable<br />
                technology for a greener future.
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* --- START: GPT Tool Box (No changes below this line) --- */}
      <section className="bg-[#1B281B]">
        <div className="container py-16">
          <div className="text-center mb-12 ">
            <h2 className="text-4xl md:text-5xl font-bold text-white font-outfit">Try Our Services</h2>
            <p className="text-[#50B354] text-3xl font-semibold mt-2 font-outfit">For Free</p>
          </div>
          <div className="flex flex-col md:flex-row gap-8 px-4 md:px-0 justify-center items-stretch">

            {/* --- Flora Carbon GPT --- */}
            <div className="relative flex-1 p-8 rounded-2xl bg-[#1B281B] border border-emerald-800 backdrop-blur-sm text-left overflow-hidden">
              {/* Left white accent stripe */}
              <div className="absolute left-0 top-0 bottom-0 w-2 bg-white shadow-md" />
              {/* Decorative right circle (glossy) */}
              <img
                src={group205Img}     // <-- Replace with your image
                alt="multiple overlapping circles"
                aria-hidden
                className="absolute top-0 bottom-0 right-0 h-full object-cover"
              />
              {/* Content — add left padding so it doesn't overlap the stripe */}
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-bold text-emerald-200 mb-3">Flora Carbon GPT</h3>
                <p className="text-sm md:text-base text-gray-300 max-w-lg mb-6 leading-relaxed">
                  The world’s smartest assistant for answering any question on Carbon Standards and Project requirements.
                </p>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}>
                  <button
                    type="button"
                    onClick={async () => {
                      if (!isAuthenticated) {
                        window.location.href = '/auth';
                        return;
                      }
                      try {
                        const accessCheck = await checkGptAccess();
                        if (accessCheck.hasAccess) {
                          const { VITE_CARBONGPT_URL } = import.meta.env;
                          await redirectToGPT(VITE_CARBONGPT_URL || 'https://gpt.floracarbon.ai/', checkGptAccess);
                        } else {
                          setShowUpgradePrompt(true);
                        }
                      } catch (error: any) {
                        if (error?.message) setShowUpgradePrompt(true);
                        else alert('Unable to access GPT. Please try again.');
                      }
                    }}
                    className="group inline-flex items-center gap-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-5 py-2 rounded-full font-semibold transition-all duration-200"
                  >
                    <Bot className="h-4 w-4 group-hover:animate-pulse" />
                    Start Chatting
                  </button>

                  <p className="text-xs text-gray-400 mt-3">Free to use • Powered by AI</p>
                </motion.div>
              </div>
            </div>

            {/* --- Carbon Credit Calculator --- */}
            <div className="relative flex-1 p-8 rounded-2xl bg-[#1B281B] border border-emerald-800 backdrop-blur-sm text-left overflow-hidden">
              {/* Left white accent stripe */}
              <div className="absolute left-0 top-0 bottom-0 w-2 bg-white shadow-md" />
              {/* Right decorative spiral-like circle (bigger & offset) */}
              <img
                src={group200Img}     // <-- Replace with your image
                alt="Spiral circle"
                aria-hidden
                className="absolute bottom-0 right-0 w-48 h-48 object-contain pointer-events-none select-none"
              />
              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-bold text-emerald-200 mb-3">Carbon Credit Calculator</h3>
                <p className="text-sm md:text-base text-gray-300 max-w-lg mb-6 leading-relaxed">
                  Quickly estimate the potential carbon credits of a forestry project with our intelligent calculator.
                </p>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}>
                  <a
                    href="https://carbon-calculator.floracarbon.ai/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-5 py-2 rounded-full font-semibold transition-all duration-200"
                  >
                    <Bot className="h-4 w-4 group-hover:animate-pulse" />
                    Launch Calculator
                  </a>

                  <p className="text-xs text-gray-400 mt-3">Free to use • No registration required</p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------- Replace this entire section -------------------- */}
      <section className="bg-white">
        <div className="container py-16">
          <h2 className="text-center text-3xl md:text-4xl font-bold text-black mb-12 font-outfit">
            Cutting-edge Technology
          </h2>
          {/* ---------------- TOP GROUP (2 cards) ---------------- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 ">

            {/* TOP LEFT (large card) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="md:col-span-2 bg-white rounded-2xl  overflow-hidden shadow-sm flex border border-gray-200 h-[315px]"
              style={{ minHeight: 200 }}
            >
              {/* Left text column */}
              <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
                <h3 className="text-xl md:text-2xl font-bold text-zinc-900 mb-3">Flora Carbon GPT</h3>
                <p className="text-sm text-zinc-600 mb-6">
                  Your AI climate expert for instant, data-driven insights and project analysis.
                </p>
                {/* <div className="mt-auto">
                  <button className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-md text-sm font-semibold">
                    <Bot className="h-4 w-4" /> Learn More
                  </button>
                </div> */}
              </div>

              {/* Right image column */}
              <div className="hidden md:block md:w-1/2 h-full h-[290px]">
                <img
                  src={cuttingEdgeImgleft}
                  alt="Flora Carbon preview"
                  className="object-cover w-full h-full"
                  style={{ objectPosition: "center right" }}
                />
              </div>
            </motion.div>

            {/* TOP RIGHT (small card) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="bg-white rounded-2xl  overflow-hidden shadow-sm flex flex-col border border-gray-200 h-[315px]"
            >
              <div className="p-6">
                <h3 className="text-lg font-bold text-zinc-900 mb-2">AI-Powered MRV</h3>
                <p className="text-sm text-zinc-600">
                  Cutting-edge AI for precise Measurement, Reporting, and Verification.
                </p>
              </div>
              <div className="w-full h-40 md:h-48">
                <img src={cuttingEdgeImgright} alt="MRV preview" className="w-full h-full object-cover" />
              </div>
            </motion.div>
          </div>

          {/* ---------------- BOTTOM GROUP (2 cards) ---------------- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[330px]">

            {/* BOTTOM LEFT */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm p-8 border border-gray-200"
            >
              <h3 className="text-lg font-bold text-zinc-900 mb-3">Carbon Project Consultation</h3>
              <p className="text-sm text-zinc-600">
                End-to-end consultation to develop high-integrity, impactful carbon projects.
              </p>
            </motion.div>

            {/* BOTTOM RIGHT */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm p-8 border border-gray-200"
            >
              <h3 className="text-lg font-bold text-zinc-900 mb-3">Climate Education & Training</h3>
              <p className="text-sm text-zinc-600">
                Empowering organizations with the knowledge to lead in the green economy.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ---------------- Impact Metrics (paste this BELOW the Cutting-edge section) ---------------- */}
      <section className="bg-white">
        <div className="container py-16">
          <h2 className="text-center text-3xl md:text-4xl font-bold text-[#113522] mb-8 font-outfit">
            Impact Metrics
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 items-stretch">
            {/* Card 1 */}
            <div className="relative rounded-xl p-6 bg-[#EAF9EA] border border-[#D7F0D9] shadow-sm overflow-hidden">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-black font-medium font-outfit">Trees Planted</p>
                  <div className="mt-3">
                    <p className="text-2xl md:text-3xl font-orbitron text-black">12.4k</p>
                    <p className="text-xs md:text-sm text-[#2a7a4b] mt-1 font-outfit">+10% this year</p>
                  </div>
                </div>

                {/* faint icon */}
                <div className="opacity-10 text-[#0F5A33] scale-125">
                  <Leaf className="w-16 h-16" />
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="relative rounded-xl p-6 bg-[#EAF9EA] border border-[#D7F0D9] shadow-sm overflow-hidden">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-black font-medium font-outfit">Number of Farmers</p>
                  <div className="mt-3">
                    <p className="text-2xl md:text-3xl font-orbitron text-black">12.4k</p>
                    <p className="text-xs md:text-sm text-[#2a7a4b] mt-1 font-outfit">+10% this year</p>
                  </div>
                </div>

                {/* faint icon (using Bot as placeholder tractor) */}
                <div className="opacity-10 text-[#0F5A33] scale-125">
                  <Bot className="w-16 h-16" />
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="relative rounded-xl p-6 bg-[#EAF9EA] border border-[#D7F0D9] shadow-sm overflow-hidden">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-black font-outfit font-medium">Water Conservation</p>
                  <div className="mt-3">
                    <p className="text-2xl md:text-3xl font-orbitron text-black">50%</p>
                    <p className="text-xs md:text-sm text-[#2a7a4b] font-outfit mt-1">+8% this year</p>
                  </div>
                </div>

                {/* faint icon */}
                <div className="opacity-10 text-[#0F5A33] scale-125">
                  <BrainCircuit className="w-16 h-16" />
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="relative rounded-xl p-6 bg-[#EAF9EA] border border-[#D7F0D9] shadow-sm overflow-hidden">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-black font-outfit font-medium">Waste Management</p>
                  <div className="mt-3">
                    <p className="text-2xl md:text-3xl font-orbitron text-black">60%</p>
                    <p className="text-xs md:text-sm text-[#2a7a4b] font-outfit mt-1">+12% this year</p>
                  </div>
                </div>

                {/* faint icon (reuse Leaf for bin placeholder) */}
                <div className="opacity-10 text-[#0F5A33] scale-125">
                  <Leaf className="w-16 h-16" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Our Supporters ---------------- */}
      <section className="py-10 md:py-12 px-6 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#113522] mb-6 font-outfit">
            Our Supporters
          </h2>

          {/* Row of brand logos / placeholders */}
          <div className="flex flex-wrap justify-evenly items-center gap-x-10 gap-y-4 text-base md:text-lg font-semibold">
            {/* Brand 1 */}
            <div className="flex items-center gap-2 text-[#1E7A33]">
              <img src={brand1Img} alt="Brand 1" className="h-[3rem] md:h-[3.5rem] object-contain" />
            </div>

            {/* Brand 2 */}
            <div className="flex items-center gap-2 text-[#1F5F9F]">
              <img src={backyard_botanistImg} alt="Brand 1" className="h-[4rem] md:h-[5rem] object-contain" />
            </div>

            {/* Brand 3 */}
            <div className="flex items-center gap-2 text-[#7A3BB5]">
              <img src={XpandfoundationImg} alt="Brand 1" className="h-[4rem] md:h-[5.5rem] object-contain" />
            </div>

            {/* Brand 4 */}
            <div className="flex items-center gap-2 text-[#A4532E]">
              <img src={grofoundationImg} alt="Brand 1" className="h-[4rem] md:h-[4rem] object-contain" />
            </div>

          </div>
        </div>
      </section>

      {/* Upgrade Prompt */}
      <UpgradePrompt
        isOpen={showUpgradePrompt}
        onClose={() => setShowUpgradePrompt(false)}
        daysRemaining={trialStatus?.daysRemaining || 0}
        hasUsedTrial={trialStatus?.hasUsedTrial || false}
      />
    </div>
  );
};

export default HomePage;
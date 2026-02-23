// ✨ Updated HomePage Component — Fixed Mobile Visibility & Spacing

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Leaf, BrainCircuit, Bot } from 'lucide-react';
import CarbonCalculator from '../components/CarbonCalculator';
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

import forestVideo from '../assets/fright.mp4';
import forestVideoMobile from '../assets/forest1.mp4';
import forestVideoMobile2 from '../assets/fcenter.mp4';

import HeroFloraCarbonAI from '../components/HeroFloraCarbonAI';
import VideoCard from '../components/VideoCard';

import AfforestationImg from '../assets/Afforestation1.png';
import AgroforestoryImg from '../assets/Agroforestory1.png';
import CarbonProject1Img from '../assets/CarbonProject1.png';
import ClimateEducation1Img from '../assets/ClimateEducation1.png';
import Mangrove1Img from '../assets/Mangrove1.png';

const CDN = import.meta.env.VITE_CDN_BASE_URL;

const AFFORESTATION_IMG = `${CDN}/Afforestation1.webp`;
const AGROFORESTRY_IMG = `${CDN}/Agroforestory1.webp`;
const CARBON_PROJECT_IMG = `${CDN}/CarbonProject1.webp`;
const CLIMATE_EDUCATION_IMG = `${CDN}/ClimateEducation1.webp`;
const MANGROVE_IMG = `${CDN}/Mangrove1.webp`;

const HomePage: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [shouldPlayVideo, setShouldPlayVideo] = useState(false);
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);
  const desktopVideoRef = React.useRef<HTMLVideoElement>(null);
  const { isAuthenticated, checkGptAccess, trialStatus } = useAuth();

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(mobile);
      setShouldPlayVideo(true);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="bg-[#fdfdfd] text-white">

      {/* ---------------- HERO SECTION ---------------- */}
      <section className="relative flex flex-col justify-center items-center text-center overflow-hidden">
        {isMobile ? (
          /* ⭐ CHANGED pt-16 to pt-32 to clear the Navbar ⭐ */
          <div className="relative z-10 flex flex-col h-full w-full px-6 pt-32">

            {/* ⭐ FIXED MOBILE TEXT SECTION ⭐ */}
            <div className="flex-1 flex flex-col justify-start items-center text-center mb-8">
              
              {/* Line 1: Bold */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="text-xl sm:text-2xl font-normal  text-black drop-shadow-lg"                
              >
              </motion.h1>

              {/* Lines 2 & 3: Normal weight + 1.7 Spacing */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="text-xl sm:text-2xl font-normal  mb-6 text-black drop-shadow-lg"
              >
                We plant and track trees.<br />
                We develop nature-based carbon projects.<br />
                We build AI-powered dMRV tool.
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="mt-4"
              >
                <Link to="/services" className="btn-primary text-sm sm:text-base mr-4">Our Technology</Link>
                <Link to="/pricing" className="btn-secondary text-sm sm:text-base">View Pricing</Link>
              </motion.div>
            </div>

            {/* Video */}
            <div className="flex-1 flex items-center justify-center pb-8">
              <VideoCard
                videoSrc={forestVideoMobile2}
                className="w-full max-w-lg mx-auto"
              />
            </div>
          </div>
        ) : (
          <div className="container relative z-10 flex flex-row items-start gap-8 w-full lg:pt-[10rem] xl:pt-[7rem] 2xl:pt-[10rem]">

            {/* ⭐ DESKTOP TEXT SECTION ⭐ */}
            <div className="basis-[80%] shrink-0 text-left mb-8 px-4 lg:px-0 z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="lg:text-2xl xl:text-3xl 2xl:text-5xl font-light leading-[1.7] text-black drop-shadow-lg"
              >
                We plant and track trees.
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="lg:text-2xl xl:text-3xl 2xl:text-5xl font-light leading-[1.7] text-black drop-shadow-lg"
              >
                We develop nature-based carbon projects.<br />
                We build AI-powered dMRV tool.
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="mt-14"
              >
                <Link to="/pricing" className="btn-grey-border rounded-full px-5 py-2 mr-4">View Pricing</Link>
                <Link to="/services" className="btn-primary rounded-full px-5 py-2">Our Technology</Link>
              </motion.div>

              <div>
                <HeroFloraCarbonAI videoRef={desktopVideoRef} />
              </div>
            </div>

            {/* Background Video */}
            <div className="basis-[20%]">
              {!isMobile && shouldPlayVideo ? (
                <video
                  ref={desktopVideoRef}
                  src={forestVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover lg:pt-[10rem] xl:pt-[7rem] 2xl:pt-[10rem]"
                />
              ) : (
                <div className="absolute inset-0 w-full h-full bg-white" />
              )}
            </div>
          </div>
        )}

        {/* Footer Banner */}
        <div className="container flex justify-center mx-auto pt-10 pb-10 z-10">
          <div className="relative rounded-xl border border-gray-200 shadow-sm overflow-hidden h-[120px] w-full">
            <img
              src={heroFooterImg}
              alt="herofooter"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="relative h-full flex flex-col items-center justify-center px-5 text-center">
              <h2 className="text-white text-2xl sm:text-3xl font-medium mb-3 font-outfit">
                Leading the way in sustainable<br />
                technology for a greener future.
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- SERVICES TOOL CARDS ---------------- */}
      <section className="bg-[#1B281B]">
        <div className="container py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white font-outfit">Try Our dMRV Tool</h2>
            <p className="text-[#50B354] text-3xl font-semibold mt-2 font-outfit">For Free</p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 px-4 md:px-0 justify-center items-stretch">

            {/* GPT Card */}
            <div className="relative flex-1 p-8 rounded-2xl bg-[#1B281B] border border-emerald-800 overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-2 bg-white" />
              <img src={group205Img} className="absolute top-0 bottom-0 right-0 h-full object-cover" />

              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-bold text-emerald-200 mb-3">Flora GPT</h3>
                <p className="text-sm md:text-base text-gray-300 max-w-lg mb-6 leading-relaxed">
                  The world’s smartest assistant for answering any question on Carbon Standards and Project requirements.
                </p>

                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
                  <button
                    type="button"
                    onClick={async () => {
                      if (!isAuthenticated) return (window.location.href = '/auth');
                      try {
                        const accessCheck = await checkGptAccess();
                        if (accessCheck.hasAccess) {
                          const { VITE_CARBONGPT_URL } = import.meta.env;
                          await redirectToGPT(VITE_CARBONGPT_URL || 'https://gpt.floracarbon.ai/', checkGptAccess);
                        } else setShowUpgradePrompt(true);
                      } catch {
                        setShowUpgradePrompt(true);
                      }
                    }}
                    className="group inline-flex items-center gap-3 bg-gradient-to-r from-primary-500 to-primary-700 text-white px-5 py-2 rounded-full"
                  >
                    <Bot className="h-4 w-4" />
                    Start Chatting
                  </button>

                  <p className="text-xs text-gray-400 mt-3">Free to use • Powered by AI</p>
                </motion.div>
              </div>
            </div>

            {/* Calculator Card */}
            <div className="relative flex-1 p-8 rounded-2xl bg-[#1B281B] border border-emerald-800 overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-2 bg-white" />
              <img src={group200Img} className="absolute bottom-0 right-0 w-48 h-48 object-contain" />

              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-bold text-emerald-200 mb-3">Carbon Credit Calculator</h3>
                <p className="text-sm md:text-base text-gray-300 max-w-lg mb-6">
                  Quickly estimate the potential carbon credits of a forestry project with our calculator.
                </p>

                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
                  <a
                    href="https://carbon-calculatorv2.0.floracarbon.ai/"
                    target="_blank"
                    className="group inline-flex items-center gap-3 bg-gradient-to-r from-primary-500 to-primary-700 text-white px-5 py-2 rounded-full"
                  >
                    <Bot className="h-4 w-4" />
                    Launch Calculator
                  </a>

                  <p className="text-xs text-gray-400 mt-3">Free to use • No registration required</p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- CUTTING EDGE TECHNOLOGY ---------------- */}
      <section className="bg-white">
        <div className="container py-16">
          <h2 className="text-center text-3xl md:text-4xl font-bold text-black mb-12 font-outfit">
            Our Services
          </h2>

          {/* Top group */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">

            {/* Large left card */}
            <motion.div className="md:col-span-2 bg-white rounded-2xl border h-auto md:h-[315px] flex flex-col md:flex-row overflow-hidden shadow-sm">
              <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
                <h3 className="text-xl md:text-2xl font-bold text-zinc-900 mb-3">Afforestation/Reforestation</h3>
                <p className="text-sm text-zinc-600 mb-6">
                  We develop all types of large-scale afforestation and reforestation projects, as well as urban afforestation and Miyawaki plantations.
                </p>
              </div>

              <div className="w-full h-48 md:w-1/2 md:h-full">
                <img
                  src={AFFORESTATION_IMG}
                  alt="Flora Carbon preview"
                  className="object-cover w-full h-full"
                  loading="lazy"
                />
              </div>
            </motion.div>

            {/* Small right card */}
            <motion.div className="bg-white rounded-2xl border overflow-hidden shadow-sm flex flex-col h-auto md:h-[315px]">
              <div className="p-6">
                <h3 className="text-lg font-bold text-zinc-900 mb-2">Agroforestory</h3>
                <p className="text-sm text-zinc-600">
                  We develop agroforestry projects with smallholder farmers and help them improve their livelihoods and access long-term economic opportunities.
                </p>
              </div>

              <div className="w-full h-48 flex-grow">
                <img src={AGROFORESTRY_IMG} alt="" className="object-cover w-full h-full"
                  loading="lazy"
                />

              </div>
            </motion.div>
          </div>

          {/* Bottom group */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-auto md:h-[234px]">

            {/* Carbon Project */}
            <motion.div className="bg-white rounded-2xl border shadow-sm overflow-hidden flex flex-col md:flex-row">

              {/* Text Section */}
              <div className="p-8 w-full md:w-1/2 flex flex-col justify-center">
                <h3 className="text-lg font-bold text-zinc-900 mb-3">Carbon Project</h3>
                <p className="text-sm text-zinc-600">
                  We develop high-quality, transparent forestry carbon projects with smallholder farmers, directly providing them incentives from carbon finance and supporting their livelihoods.
                </p>
              </div>

              {/* Image Section */}
              <div className="w-full h-48 md:w-1/2 md:h-full">
                <img
                  src={CARBON_PROJECT_IMG}
                  alt="Carbon Project"
                  className="object-contain w-full h-full"
                  loading="lazy"
                />
              </div>
            </motion.div>

            {/* Climate Education */}
            <motion.div className="bg-white rounded-2xl border shadow-sm overflow-hidden flex flex-col md:flex-row">

              {/* Text Section */}
              <div className="p-8 w-full md:w-1/2 flex flex-col justify-center">
                <h3 className="text-lg font-bold text-zinc-900 mb-3">Mangrove Reforestation</h3>
                <p className="text-sm text-zinc-600">
                  We restore degraded mangrove habitats in the Sundarbans by planting a wide variety of native mangrove species to protect the coastline and support coastal communities.
                </p>
              </div>

              {/* Image Section */}
              <div className="w-full h-48 md:w-1/2 md:h-full">
                <img
                  src={MANGROVE_IMG}
                  alt="Climate education"
                  className="object-cover w-full h-full"
                  loading="lazy"
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ---------------- SUPPORTERS ---------------- */}
      <section className="py-10 md:py-12 px-6 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#113522] mb-6 font-outfit">
            Our Supporters
          </h2>

          <div className="flex flex-wrap justify-evenly items-center gap-x-10 gap-y-4">
            <img src={brand1Img} className="h-[3rem] md:h-[3.5rem]" />
            <img src={backyard_botanistImg} className="h-[5rem]" />
            <img src={XpandfoundationImg} className="h-[5.5rem]" />
            <img src={grofoundationImg} className="h-[4rem]" />
          </div>
        </div>
      </section>

      <UpgradePrompt
        isOpen={showUpgradePrompt}
        onClose={() => setShowUpgradePrompt(false)}
        daysRemaining={trialStatus?.daysRemaining || 0}
        hasUsedTrial={trialStatus?.hasUsedTrial || false}
      />
    </div>
  );
};

export default HomePage;
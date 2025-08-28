import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Leaf, BarChart, BrainCircuit, Bot, Sparkles, ChevronDown, MessageCircle } from 'lucide-react';
import CarbonCalculator from '../components/CarbonCalculator'; // Import the CarbonCalculator component

// Step 1: Import the image from your assets folder.
import forestBackground from '../assets/forest.jpg'; 

const HomePage: React.FC = () => {
  return (
    <div className="bg-black text-white">
      {/* --- Hero Section --- */}
      <div className="relative h-screen flex flex-col justify-center items-center text-center overflow-hidden">
        <motion.div
          style={{
            backgroundImage: `url(${forestBackground})`,
          }}
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          initial={{ scale: 1.1, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 p-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-4"
          >
            Nature's Solution to <span className="text-primary-200">Climate Change</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Flora Carbon is committed to fighting climate change through nature-based solutions. 
            We develop carbon projects, offer expert consultations, and utilize AI technology 
            to improve monitoring and trust in the carbon market.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-10"
          >
            <Link to="/services" className="btn-primary">Our Technology</Link>
          </motion.div>
        </div>
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <ChevronDown className="w-8 h-8 text-white animate-bounce" />
        </motion.div>
      </div>

      {/* --- START: GPT Tool Box --- */}
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
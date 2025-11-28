import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';  // Icons for expand/collapse only
import { Link } from 'react-router-dom';
import UpgradePrompt from '../components/UpgradePrompt';

// Local images
import AfforestationImg from '../assets/Afforestation1.png';
import AgroforestoryImg from '../assets/Agroforestory1.png';
import CarbonProjectImg from '../assets/CarbonProject1.png';
import ClimateEducationImg from '../assets/ClimateEducation1.png';
import MangroveImg from '../assets/Mangrove1.png';

// Services data
const services = [
  {
    title: "Carbon Project Development",
    content:
      "End-to-end guidance to design, validate, and structure high-quality carbon projects aligned with leading standards.",
    images: [CarbonProjectImg],
  },
  {
    title: "Afforestation and Reforestation",
    content:
      "Science-backed species selection and carbon yield estimation to support large-scale restoration initiatives.",
    images: [AfforestationImg],
  },
  {
    title: "Mangrove Reforestation",
    content:
      "Comprehensive support for designing resilient, high-impact mangrove restoration and blue carbon projects.",
    images: [MangroveImg],
  },
  {
    title: "Agroforestry",
    content:
      "Integrated agroforestry solutions that enhance productivity, biodiversity, and long-term carbon benefits.",
    images: [AgroforestoryImg],
  },
  {
    title: "Climate Education and Training",
    content:
      "Expert-led training programs that build capacity in climate action, carbon markets, and sustainability practices.",
    images: [ClimateEducationImg],
  },
];

const ServicesPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);

  return (
    <div className="bg-gradient-to-b from-emerald-950 to-black text-white min-h-screen">

      {/* Header */}
      <div className="pt-40 pb-20 container-padding mx-auto max-w-4xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-3xl md:text-6xl font-bold text-emerald-200 mb-6"
        >
          Our Services
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-xl text-gray-300"
        >
          An integrated suite of solutions designed to de-risk and accelerate investment in nature.
        </motion.p>
      </div>

      {/* Services */}
      <div className="container-padding mx-auto max-w-4xl pb-32">

        {services.map((service, index) => {
          const isOpen = openIndex === index;

          return (
            <div key={index} className="border-b border-emerald-800">

              {/* Accordion Button WITHOUT ICON */}
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex justify-between items-center py-8 text-left"
                aria-expanded={isOpen}
                aria-controls={`service-panel-${index}`}
              >
                <span className="text-2xl md:text-3xl font-semibold text-emerald-100">
                  {service.title}
                </span>

                {isOpen ? (
                  <Minus className="h-6 w-6 text-emerald-200" />
                ) : (
                  <Plus className="h-6 w-6 text-gray-500" />
                )}
              </button>

              {/* Collapse Section */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`service-panel-${index}`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pb-8 pl-4 md:pl-16">

                      {/* Content */}
                      <p className="text-gray-300 text-lg leading-relaxed mb-6">
                        {service.content}
                      </p>

                      {/* Image Gallery */}
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      >
                        {service.images?.map((src, i) => (
                          <motion.div
                            key={i}
                            whileHover={{ scale: 1.03 }}
                            className="rounded-lg overflow-hidden shadow-lg"
                          >
                            <img
                              src={src}
                              alt={`${service.title} ${i + 1}`}
                              className="w-full h-72 md:h-96 object-cover"
                              loading="lazy"
                            />
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}

      </div>

      {/* Upgrade Prompt */}
      <UpgradePrompt
        isOpen={showUpgradePrompt}
        onClose={() => setShowUpgradePrompt(false)}
        daysRemaining={0}
        hasUsedTrial={false}
      />
    </div>
  );
};

export default ServicesPage;

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, BarChart3, GraduationCap, Plus, Minus, Bot } from 'lucide-react';
import { Link } from 'react-router-dom';
import { redirectToGPT } from '../utils/auth';
import { useAuth } from '../contexts/AuthContext';
import UpgradePrompt from '../components/UpgradePrompt';

type Service = {
  icon?: React.ComponentType<any>;
  title: string;
  content: string;
  images?: string[]; // optional if you add images later
};

const services: Service[] = [
  {
    icon: Leaf,
    title: 'Carbon Project Development',
    content:
      'Get instant, expert answers on Forestry Carbon project requirements across VCS, Gold Standard, Plan Vivo, and ICR - powered by our Custom GPT trained on real project data and the standards requirements.',
  },
  {
    icon: BarChart3,
    title: 'Afforestation and Reforestation',
    content:
      'Estimate species-specific biomass and carbon credits with validated allometric equations - use the tool to plan which species to plant for higher carbon yield and to calculate credits for trees you’ve already planted.',
  },
  {
    icon: Leaf,
    title: 'Mangrove Reforestation',
    content:
      'The process begins with initial assessment and feasibility studies, followed by careful project design and methodology selection. Financial modeling and ROI analysis help ensure the project’s economic viability, while implementation support and guidance facilitate smooth execution. Verification and certification assistance ensures compliance with standards, and long-term sustainability planning secures ongoing project success and impact.',
  },
  {
    icon: GraduationCap,
    title: 'Agroforestry',
    content:
      'We offer comprehensive workshops on nature-based climate solutions and training on carbon market fundamentals. Participants gain insights into sustainable land management practices, community engagement strategies, and the relevant policy and regulatory frameworks. Additionally, we provide custom corporate training programs tailored to meet the specific needs of organizations.',
  },
  {
    icon: GraduationCap,
    title: 'Climate Education and Training',
    content:
      'We offer comprehensive workshops on nature-based climate solutions and training on carbon market fundamentals. Participants gain insights into sustainable land management practices, community engagement strategies, and the relevant policy and regulatory frameworks. Additionally, we provide custom corporate training programs tailored to meet the specific needs of organizations.',
  },
];

const ServicesPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);
  const { isAuthenticated, checkGptAccess, trialStatus } = useAuth();

  return (
    <div className="bg-gradient-to-b from-emerald-950 to-black text-white">
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

      <div className="container-padding mx-auto max-w-4xl pb-32">
        {services.map((service, index) => {
          const isOpen = openIndex === index;
          const Icon = service.icon;

          return (
            <div key={index} className="border-b border-emerald-800">
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex justify-between items-center py-8 text-left"
                aria-expanded={isOpen}
                aria-controls={`service-panel-${index}`}
              >
                <div className="flex items-center">
                  {Icon && <Icon className="h-8 w-8 text-emerald-300 mr-6" />}
                  <span className="text-2xl md:text-3xl font-semibold text-emerald-100">
                    {service.title}
                  </span>
                </div>

                {isOpen ? (
                  <Minus className="h-6 w-6 text-emerald-200" />
                ) : (
                  <Plus className="h-6 w-6 text-gray-500" />
                )}
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`service-panel-${index}`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="pb-8 pl-16">
                      <p className="text-gray-300 text-lg leading-relaxed mb-8">{service.content}</p>

                      {/* Example: if you later add images per service, render them here */}
                      {service.images && service.images.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {service.images.map((src, i) => (
                            <div key={i} className="rounded-lg overflow-hidden shadow-lg">
                              <img src={src} alt={`${service.title} ${i + 1}`} className="w-full h-40 md:h-56 object-cover" />
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Optional GPT button block (only shown when title matches) */}
                      {service.title === 'Flora Carbon GPT' && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: 0.5 }}
                        >
                          <button
                            onClick={async () => {
                              if (!isAuthenticated) {
                                window.location.href = '/auth';
                                return;
                              }

                              try {
                                const accessCheck = await checkGptAccess();
                                if (accessCheck?.hasAccess) {
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
                            className="group inline-flex items-center gap-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg"
                          >
                            <Bot className="h-5 w-5 group-hover:animate-pulse" />
                            Start Chatting with Flora Carbon GPT
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                          </button>
                        </motion.div>
                      )}
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
        daysRemaining={trialStatus?.daysRemaining || 0}
        hasUsedTrial={trialStatus?.hasUsedTrial || false}
      />
    </div>
  );
};

export default ServicesPage;

import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Import images
import manirImage from '../assets/manir.jpeg';
import saifImage from '../assets/saif.jpg';
import harishImage from '../assets/harish.jpeg';
import rajendarImage from '../assets/Dr. Rajendra.jpeg';

const teamMembers = [
  {
    name: "Manir Dhabak",
    role: "Founder & CEO",
    imageUrl: manirImage,
    location: "India",
    profileUrl: "https://www.linkedin.com/in/manirdhabak/",
    description:
      "Manir holds a Master’s in Botany, has contributed to planting 10+ million trees over the past 7 years, has hands-on experience in both developing and auditing forestry carbon projects, and is passionate about AI.",
  },
  {
    name: "Dr. Rajendra Shinde",
    role: "Advisor, Community Agroforestry & Stakeholder Engagement",
    imageUrl: rajendarImage,
    location: "India",
    profileUrl: "https://www.linkedin.com/in/dr-rajendra-shinde/",
    description:
      "Dr. Rajendra Shinde is a renowned botanist and former Principal of St. Xavier’s College, Mumbai. He brings decades of scientific leadership across botany and afforestation/reforestation (A/R) programs.",
  },
  {
    name: "Saif Saleem",
    role: "AI & Tech, IIT Ropar",
    imageUrl: saifImage,
    location: "India",
    profileUrl: "https://www.linkedin.com/in/saifsaleem01/",
    description:
      "Saif holds a B.Tech and is completing a Data Science and Management program at IIT Ropar & IIT Amritsar, he’s passionate about AI and loves building new AI tools for MRV.",
  },
  {
    name: "Harish Pandey",
    role: "Lead GIS Consultant",
    imageUrl: harishImage,
    location: "Germany",
    profileUrl: "https://www.linkedin.com/in/harish-pandey/",
    description:
      "Harish has completed a Post Graduate Diploma from IIRS in Forest Resources & Ecosystem Analysis and has over 5 years’ experience working in forestry and carbon projects.",
  },
];

const TeamPage: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleDescription = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="bg-gradient-to-b from-emerald-950 to-black text-white">
      <div className="pt-40 pb-20 container-padding mx-auto max-w-5xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-3xl md:text-6xl font-bold text-emerald-200 mb-6"
        >
          The Minds Behind the Mission
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-xl text-gray-300"
        >
          A fusion of ecological passion and technological expertise.
        </motion.p>
      </div>

      <div className="container-padding mx-auto max-w-5xl pb-32 space-y-10">
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="relative flex flex-col sm:flex-row items-center sm:items-start gap-8 p-8 rounded-2xl bg-black/25 border border-emerald-800 backdrop-blur-md shadow-lg hover:shadow-emerald-900/40 transition-all duration-300"
          >
            {/* Left side image */}
            <div className="w-full sm:w-56 sm:h-64 flex-shrink-0 overflow-hidden rounded-xl border border-emerald-700">
              <img
                src={member.imageUrl}
                alt={member.name}
                loading="lazy"
                className="w-full h-full object-cover rounded-xl transition-opacity duration-300"
                onLoad={(e) => ((e.target as HTMLImageElement).style.opacity = '1')}
                style={{ opacity: 0 }}
              />
            </div>

            {/* Right side content */}
            <div className="flex-1 text-center sm:text-left">
              <motion.h3
                className="text-2xl md:text-3xl font-bold text-emerald-100"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {member.name}
              </motion.h3>

              <motion.a
                // href={member.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-300 hover:underline block text-lg"
              >
                {member.role}
              </motion.a>

              <p className="text-sm font-bold text-gray-100 mb-3">{member.location}</p>

              {/* View More Button - smaller & refined */}
              <button
                onClick={() => toggleDescription(index)}
                className="mt-2 px-3 py-1 text-sm rounded-md bg-emerald-700 hover:bg-emerald-600 transition text-white font-medium"
              >
                {expandedIndex === index ? "Hide" : "View More"}
              </button>

              {/* Collapsible description */}
              {expandedIndex === index && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mt-4 text-gray-300 leading-relaxed text-sm md:text-base"
                >
                  {member.description}
                </motion.p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TeamPage;

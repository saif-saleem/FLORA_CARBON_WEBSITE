import React from 'react';
import { motion } from 'framer-motion';

// 1. Import the images from your assets folder
import manirImage from '../assets/manir.jpeg';
import saifImage from '../assets/saif.jpg';
import harishImage from '../assets/harish.jpeg';
import anjumaraImage from '../assets/anju.jpeg';

const teamMembers = [
  // 2. Add an imageUrl property to each team member
  { name: "Manir Dhabak", role: "Founder & CEO", imageUrl: manirImage, location: "India" },
  { name: "Harish Pandey", role: "Lead GIS Consultant", imageUrl: harishImage, location: "Germany" },
  { name: "Saif Saleem", role: "AI & Tech, IIT Ropar", imageUrl: saifImage, location: "India" },
  { name: "Anjumanara Dhabak", role: "Design and Digital Media Lead", imageUrl: anjumaraImage, location: "India" },
];

const TeamPage: React.FC = () => {
  return (
    // The background gradient is applied here
    <div className="bg-gradient-to-b from-emerald-950 to-black text-white">
      <div className="pt-40 pb-20 container-padding mx-auto max-w-4xl text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="text-3xl md:text-6xl font-bold text-emerald-200 mb-6"
        >
          The Minds Behind the Mission
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
          className="text-xl text-gray-300"
        >
          A fusion of ecological passion and technological expertise.
        </motion.p>
      </div>

      <div className="container-padding mx-auto max-w-4xl pb-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover="hover"
              style={{ perspective: 800 }}
              className="relative p-6 rounded-2xl bg-black/20 border border-emerald-800 backdrop-blur-sm"
            >
              <motion.div style={{ transformStyle: 'preserve-3d' }}>
                {/* 3. Display the image if it exists, otherwise show the placeholder */}
                {member.imageUrl ? (
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="w-full h-64 object-cover rounded-lg mb-4"
                  />
                ) : (
                  <div className="bg-emerald-900/30 h-64 rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-gray-400">Photo</span>
                  </div>
                )}
                
                <motion.h3
                  style={{ y: -5, x: 5, z: 50, rotateX: -10 }}
                  variants={{ hover: { y: 0, x: 0, z: 0, rotateX: 0 } }}
                  transition={{ type: 'spring' }}
                  className="text-2xl font-bold text-emerald-100"
                >
                  {member.name}
                </motion.h3>
                <motion.p
                  style={{ y: -5, x: 5, z: 40, rotateX: -10 }}
                  variants={{ hover: { y: 0, x: 0, z: 0, rotateX: 0 } }}
                  transition={{ type: 'spring', delay: 0.05 }}
                  className="text-emerald-300"
                >
                  {member.role}
                </motion.p>
                <motion.p
                  style={{ y: -5, x: 5, z: 30, rotateX: -10 }}
                  variants={{ hover: { y: 0, x: 0, z: 0, rotateX: 0 } }}
                  transition={{ type: 'spring', delay: 0.1 }}
                  className="text-3xl font-bold text-gray-100 text-sm"
                >
                  {member.location}
                </motion.p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamPage;

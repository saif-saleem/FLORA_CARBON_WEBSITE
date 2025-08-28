import React from 'react';
import { motion } from 'framer-motion';

interface TeamMemberProps {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  delay?: number;
}

const TeamMember: React.FC<TeamMemberProps> = ({
  name,
  role,
  bio,
  imageUrl,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: delay * 0.1 }}
      className="bg-white rounded-lg shadow-md overflow-hidden group"
    >
      <div className="overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-1 text-gray-900">{name}</h3>
        <p className="text-primary-600 font-medium mb-4">{role}</p>
        <p className="text-gray-600 leading-relaxed">{bio}</p>
      </div>
    </motion.div>
  );
};

export default TeamMember;
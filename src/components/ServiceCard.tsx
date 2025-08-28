import React from 'react';
import { type LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  delay?: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon: Icon,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, delay: delay * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.3 } }}
      className="bg-white rounded-xl shadow-md p-8 text-center h-full border border-transparent hover:border-primary-200 hover:shadow-xl transition-all duration-300"
    >
      <div className="inline-block p-4 bg-primary-100 rounded-full mb-5">
        <Icon className="h-8 w-8 text-primary-600" />
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </motion.div>
  );
};

export default ServiceCard;
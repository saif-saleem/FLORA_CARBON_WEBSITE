import React from 'react';
import floraCarbonLogo from './flora_carbon_logo.png';
import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <motion.img
        src={floraCarbonLogo}
        alt="Flora Carbon Logo"
        className="h-16 md:h-20 w-auto mr-2 rounded-lg"
        // Use whileHover to handle the animation directly
        whileHover={{ rotateY: 360 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      />
      <span className="font-serif text-2xl md:text-3xl font-semibold tracking-tight text-white">
        Flora <span className="text-primary-600">Carbon</span>
      </span>
    </div>
  );
};

export default Logo;
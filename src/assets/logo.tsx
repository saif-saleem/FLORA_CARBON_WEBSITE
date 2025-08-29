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
        className="w-auto mr-2 rounded-lg"
        style={{ height: '6rem' }}   // 🔥 set fixed height = 6rem
        whileHover={{ rotateY: 360 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      />
    </div>
  );
};

export default Logo;

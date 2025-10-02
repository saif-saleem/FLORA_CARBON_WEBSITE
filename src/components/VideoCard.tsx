import React from 'react';
import { motion } from 'framer-motion';

interface VideoCardProps {
  videoSrc: string;
  className?: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ videoSrc, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`
        relative overflow-hidden rounded-xl border border-gray-200/20 
        bg-white/10 backdrop-blur-sm shadow-lg w-full max-w-lg
        ${className}
      `}
    >
      {/* Video Section */}
      <div className="relative aspect-video overflow-hidden py-4">
        <video
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          webkit-playsinline="true"
          className="w-full h-full object-cover scale-150 origin-center"
          preload="auto"
          onError={() => {
            console.log('Card video failed to load');
          }}
          onLoadStart={() => {
            console.log('Card video started loading');
          }}
          onCanPlay={() => {
            console.log('Card video can play');
          }}
          onPlay={() => {
            console.log('Card video is playing');
          }}
        />
        
        {/* Video Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
      
      {/* Tree Data Cards */}
      <div className="p-4">
        <div className="grid grid-cols-3 gap-3 mb-4">
          {/* AGE Card */}
          <div className="bg-gray-800/80 rounded-lg p-3 text-center">
            <div className="text-xs uppercase text-gray-300 mb-1">AGE</div>
            <div className="text-lg font-bold text-white">9.00 yrs</div>
          </div>
          
          {/* DBH Card */}
          <div className="bg-gray-800/80 rounded-lg p-3 text-center">
            <div className="text-xs uppercase text-gray-300 mb-1">DBH</div>
            <div className="text-lg font-bold text-white">17.98 cm</div>
          </div>
          
          {/* CO₂E Card */}
          <div className="bg-gray-800/80 rounded-lg p-3 text-center">
            <div className="text-xs uppercase text-gray-300 mb-1">CO₂E</div>
            <div className="text-lg font-bold text-white">0.27 t</div>
          </div>
        </div>
        
        {/* Pause Button */}
        <button className="w-full bg-gray-800/80 hover:bg-gray-700/80 text-white font-medium py-3 px-4 rounded-lg transition-colors">
          Pause
        </button>
      </div>
    </motion.div>
  );
};

export default VideoCard;

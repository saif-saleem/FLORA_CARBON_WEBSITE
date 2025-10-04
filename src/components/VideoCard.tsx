import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Dataset - same as HeroFloraCarbonAI
const GROWTH_DATA = [
  { age: 1, dbh: 0, co2e: 0 },
  { age: 2, dbh: 0, co2e: 0 },
  { age: 3, dbh: 7.827175, co2e: 0.029512064 },
  { age: 4, dbh: 9.817931, co2e: 0.054169096 },
  { age: 5, dbh: 11.66343, co2e: 0.085947387 },
  { age: 6, dbh: 13.38804, co2e: 0.124376915 },
  { age: 7, dbh: 15.00822, co2e: 0.168927414 },
  { age: 8, dbh: 16.536, co2e: 0.219044131 },
  { age: 9, dbh: 17.98069, co2e: 0.27416933 },
  { age: 10, dbh: 19.34976, co2e: 0.333755727 },
  { age: 20, dbh: 29.90914, co2e: 1.072240853 },
  { age: 30, dbh: 36.6478, co2e: 1.848359696 },
  { age: 40, dbh: 41.06907, co2e: 2.50817497 },
];

interface VideoCardProps {
  videoSrc: string;
  className?: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ videoSrc, className = '' }) => {
  const [data, setData] = useState<any[]>([]);
  const [index, setIndex] = useState(1);
  const [autoplay, setAutoplay] = useState(true);
  const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!autoplay) return;

    const id = setInterval(() => {
      if (index >= GROWTH_DATA.length) {
        setData([GROWTH_DATA[0]]);
        setIndex(1);
      } else {
        setData(GROWTH_DATA.slice(0, index + 1));
        setIndex((i) => i + 1);
      }
    }, 600);

    return () => clearInterval(id);
  }, [index, autoplay]);

  // Sync video playback with animation
  useEffect(() => {
    if (videoRef) {
      if (autoplay) {
        videoRef.play();
      } else {
        videoRef.pause();
      }
    }
  }, [autoplay, videoRef]);

  const latest = data.length > 0 ? data[data.length - 1] : GROWTH_DATA[0];

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
          ref={setVideoRef}
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
        {/* Dynamic Text */}
        <div className="text-center mb-4">
          <span className="text-sm font-semibold text-black">
            One mahogany tree absorbs ~{latest.co2e.toFixed(2)} tonnes<br />of tCO₂e in {latest.age} years.
          </span>
        </div>
        
        <div className="grid grid-cols-3 gap-3 mb-4">
          {/* AGE Card */}
          <div className="bg-gray-800/80 rounded-lg p-3 text-center">
            <div className="text-xs uppercase text-gray-300 mb-1">AGE</div>
            <div className="text-lg font-bold text-white">{latest.age.toFixed(2)} yrs</div>
          </div>
          
          {/* DBH Card */}
          <div className="bg-gray-800/80 rounded-lg p-3 text-center">
            <div className="text-xs uppercase text-gray-300 mb-1">DBH</div>
            <div className="text-lg font-bold text-white">{latest.dbh.toFixed(2)} cm</div>
          </div>
          
          {/* CO₂E Card */}
          <div className="bg-gray-800/80 rounded-lg p-3 text-center">
            <div className="text-xs uppercase text-gray-300 mb-1">CO₂E</div>
            <div className="text-lg font-bold text-white">{latest.co2e.toFixed(2)} t</div>
          </div>
        </div>
        
        {/* Pause Button */}
        <button 
          onClick={() => setAutoplay((a) => !a)}
          className="w-full bg-gray-800/80 hover:bg-gray-700/80 text-white font-medium py-3 px-4 rounded-lg transition-colors"
        >
          {autoplay ? "Pause" : "Play"}
        </button>
      </div>
    </motion.div>
  );
};

export default VideoCard;
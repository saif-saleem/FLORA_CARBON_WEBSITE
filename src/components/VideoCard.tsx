// VideoCard.tsx
import React, { useState, useEffect, useRef } from 'react';
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

const SPEED_MULTIPLIER = 2; // 👈 Adjust this to control how fast growth data updates

interface VideoCardProps {
  videoSrc: string;
  className?: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ videoSrc, className = '' }) => {
  const [data, setData] = useState<any[]>([]);
  const [index, setIndex] = useState(1);
  const [autoplay, setAutoplay] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoDuration, setVideoDuration] = useState(10);

  // Keep videoDuration up-to-date
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onLoaded = () => {
      if (!isNaN(v.duration) && v.duration > 0) setVideoDuration(v.duration);
    };
    v.addEventListener('loadedmetadata', onLoaded);
    if (v.readyState >= 1 && !isNaN(v.duration) && v.duration > 0) setVideoDuration(v.duration);
    return () => v.removeEventListener('loadedmetadata', onLoaded);
  }, []);

  // Core: rAF loop that polls currentTime and updates state reliably
  useEffect(() => {
    let rafId = 0;

    const tick = () => {
      const v = videoRef.current;
      if (v && autoplay && !v.paused) {
        const duration = (!isNaN(v.duration) && v.duration > 0) ? v.duration : videoDuration || 1;
        const currentTime = Math.max(0, v.currentTime || 0);

        // 👇 Modified: Use speed multiplier for faster data animation
        const progress = Math.min((currentTime / duration) * SPEED_MULTIPLIER, 1);

        const targetIndex = Math.min(
          GROWTH_DATA.length,
          Math.max(1, Math.floor(progress * (GROWTH_DATA.length - 1)) + 1)
        );

        setIndex((prev) => {
          if (prev !== targetIndex) {
            setData(GROWTH_DATA.slice(0, targetIndex));
            return targetIndex;
          }
          return prev;
        });
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [autoplay, videoDuration]);

  // Sync video element play/pause with autoplay state
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (autoplay) {
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [autoplay]);

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
          ref={videoRef}
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          webkit-playsinline="true"
          className="w-full h-full object-cover scale-150 origin-center"
          preload="auto"
          onPlay={() => {
            const v = videoRef.current;
            if (!v) return;
            const duration = (!isNaN(v.duration) && v.duration > 0) ? v.duration : videoDuration || 1;
            const progress = Math.min((v.currentTime / duration) * SPEED_MULTIPLIER, 1);
            const targetIndex = Math.min(
              GROWTH_DATA.length,
              Math.max(1, Math.floor(progress * (GROWTH_DATA.length - 1)) + 1)
            );
            setIndex((prev) => {
              if (prev !== targetIndex) {
                setData(GROWTH_DATA.slice(0, targetIndex));
                return targetIndex;
              }
              return prev;
            });
          }}
        />

        {/* Video Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Tree Data Cards */}
      <div className="p-4">
        {/* Static Text */}
        <div className="text-center mb-4">
          <span className="text-sm font-semibold text-black">
            One mahogany tree absorbs ~2.54 tonnes<br />of tCO₂e in 40 years.
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
          {/* AGE Card */}
          <div className="bg-gray-800/80 rounded-lg p-2 sm:p-3 text-center">
            <div className="text-[10px] sm:text-xs uppercase text-gray-300 mb-1">AGE</div>
            <div className="text-sm sm:text-lg font-bold text-white">{latest.age.toFixed(2)} yrs</div>
          </div>

          {/* DBH Card */}
          <div className="bg-gray-800/80 rounded-lg p-2 sm:p-3 text-center">
            <div className="text-[10px] sm:text-xs uppercase text-gray-300 mb-1">DBH</div>
            <div className="text-sm sm:text-lg font-bold text-white">{latest.dbh.toFixed(2)} cm</div>
          </div>

          {/* CO₂E Card */}
          <div className="bg-gray-800/80 rounded-lg p-2 sm:p-3 text-center">
            <div className="text-[10px] sm:text-xs uppercase text-gray-300 mb-1">CO₂E</div>
            <div className="text-sm sm:text-lg font-bold text-white">{latest.co2e.toFixed(2)} t</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default VideoCard;

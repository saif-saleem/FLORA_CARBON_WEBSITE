import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Dataset
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

// Small metric box component
function MetricBox({ label, value, unit }: { label: string; value: number; unit: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl bg-black/40 px-4 py-2 text-center ring-1 ring-white/10 backdrop-blur-sm w-28">
      <span className="text-[10px] uppercase tracking-wide text-black-100">{label}</span>
      <span className="text-sm font-semibold text-black-100">
        {value.toFixed(2)} {unit}
      </span>
    </div>
  );
}

interface HeroFloraCarbonAIProps {
  videoRef?: React.RefObject<HTMLVideoElement>;
}

export default function HeroFloraCarbonAI({ videoRef }: HeroFloraCarbonAIProps = {}) {
  const [data, setData] = useState<any[]>([]);
  const [index, setIndex] = useState(1);
  const [autoplay, setAutoplay] = useState(true);
  // Video-synchronized animation
  useEffect(() => {
    const videoElement = videoRef?.current;
    if (!videoElement || !autoplay) return;

    const updateDataFromVideo = () => {
      if (!videoElement) return;
      
      const currentTime = videoElement.currentTime;
      const duration = videoElement.duration || 10; // Default duration if not available
      
      // Map video time to data index (0 to GROWTH_DATA.length-1)
      const progress = Math.min(currentTime / duration, 1);
      const targetIndex = Math.floor(progress * (GROWTH_DATA.length - 1)) + 1;
      
      if (targetIndex !== index) {
        setIndex(targetIndex);
        setData(GROWTH_DATA.slice(0, targetIndex));
      }
    };

    const handleTimeUpdate = () => updateDataFromVideo();
    
    videoElement.addEventListener('timeupdate', handleTimeUpdate);
    
    // Initial update
    updateDataFromVideo();

    return () => {
      if (videoElement) {
        videoElement.removeEventListener('timeupdate', handleTimeUpdate);
      }
    };
  }, [videoRef, autoplay, index]);

  // Sync video playback with animation state
  useEffect(() => {
    const videoElement = videoRef?.current;
    if (videoElement) {
      if (autoplay) {
        videoElement.play();
      } else {
        videoElement.pause();
      }
    }
  }, [autoplay, videoRef]);

  const latest = data.length > 0 ? data[data.length - 1] : GROWTH_DATA[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="flex flex-col items-center"
    >
      {/* 1. This container for the tree creates the positioning boundary. */}
      <div className="relative w-full h-80">
        {/* The Tree Image */}
        <div
          className="w-full h-full bg-contain bg-no-repeat bg-center"
          style={{ backgroundImage: "url('/tree-image.png')" }}
        />
      </div>

      {/* 2. This container holds the UI elements */}
      <div className="w-full flex flex-col items-center gap-4 mt-4 mt-[155px] mr-[200px]">
        <span className="text-s font-semibold text-black mb-1">
              One mahogany tree absorbs ~2.54 tonnes<br />of tCO₂e in 40 years.
            </span>
        {/* Metric Boxes */}
        <div className="grid grid-cols-3 gap-3">
          <MetricBox label="Age" value={latest.age} unit="yrs" />
          <MetricBox label="DBH" value={latest.dbh} unit="cm" />
          <div className="flex flex-col items-center">
            {/* Added species name above CO₂ box */}
            
            <MetricBox label="CO₂e" value={latest.co2e} unit="t" />
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setAutoplay((a) => !a)}
            className="rounded-lg border border-white/20 bg-black/40 backdrop-blur-sm px-3 py-1 text-xs text-white/90 hover:bg-white/20"
          >
            {autoplay ? "Pause" : "Play"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

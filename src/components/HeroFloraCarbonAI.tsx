// HeroFloraCarbonAI.tsx
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

// Small metric box component (unchanged)
function MetricBox({ label, value, unit }: { label: string; value: number; unit: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl bg-black/40 px-2 sm:px-4 py-2 text-center ring-1 ring-white/10 backdrop-blur-sm w-20 sm:w-28">
      <span className="text-[8px] sm:text-[10px] uppercase tracking-wide text-black-100">{label}</span>
      <span className="text-xs sm:text-sm font-semibold text-black-100">
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
  const [index, setIndex] = useState<number>(1);
  const [autoplay, setAutoplay] = useState<boolean>(true);
  const [videoDuration, setVideoDuration] = useState(10);

  // Keep duration in sync
  useEffect(() => {
    const v = videoRef?.current;
    if (!v) return;
    const onLoaded = () => {
      if (!isNaN(v.duration) && v.duration > 0) setVideoDuration(v.duration);
    };
    v.addEventListener('loadedmetadata', onLoaded);
    if (v.readyState >= 1 && !isNaN(v.duration) && v.duration > 0) setVideoDuration(v.duration);
    return () => v.removeEventListener('loadedmetadata', onLoaded);
  }, [videoRef]);

  // rAF loop polling the passed videoRef
  useEffect(() => {
    let rafId = 0;

    const tick = () => {
      const v = videoRef?.current;
      if (v && autoplay && !v.paused) {
        const duration = (!isNaN(v.duration) && v.duration > 0) ? v.duration : videoDuration || 1;
        const currentTime = Math.max(0, v.currentTime || 0);
        const progress = Math.min(currentTime / duration, 1);
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
  }, [videoRef, autoplay, videoDuration]);

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
        <div
          className="w-full h-full bg-contain bg-no-repeat bg-center"
          style={{ backgroundImage: "url('/tree-image.png')" }}
        />
      </div>

      {/* 2. UI elements */}
      <div className="w-full flex flex-col items-center gap-4 mt-4 mt-[50px] mr-[200px]">
        <span className="text-s font-semibold text-black mb-1">
          One mahogany tree absorbs<br />~2.54 tonnes of tCO₂e in 40 years.
        </span>
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          <MetricBox label="Age" value={latest.age} unit="yrs" />
          <MetricBox label="DBH" value={latest.dbh} unit="cm" />
          <div className="flex flex-col items-center">
            <MetricBox label="CO₂e" value={latest.co2e} unit="t" />
          </div>
        </div>

      </div>
    </motion.div>
  );
}
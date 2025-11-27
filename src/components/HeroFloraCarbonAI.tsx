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

const SPEED_MULTIPLIER = 2; // 👈 Faster data animation

function MetricCell({
  label,
  value,
  unit,
  decimals = 2,
}: {
  label: string;
  value: number;
  unit: string;
  decimals?: number;
}) {
  const formatted =
    decimals === 0 ? Math.round(value).toString() : value.toFixed(decimals);

  return (
    <div className="flex flex-col items-center justify-center px-8 py-2 min-w-[100px]">
      {/* 🔹 Smaller Label */}
      <span className="text-[8px] sm:text-[10px] italic text-green-800 font-semibold tracking-wide">
        {label}
      </span>
      {/* 🔹 Smaller Number */}
      <span className="mt-1 text-lg sm:text-xl font-bold text-black leading-tight font-orbitron">
        {formatted}
        {/* 🔹 Smaller Unit */}
        <span className="ml-0.5 text-[8px] sm:text-[10px] font-medium ">
          {unit}
        </span>
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

  useEffect(() => {
    let rafId = 0;
    const tick = () => {
      const v = videoRef?.current;
      if (v && autoplay && !v.paused) {
        const duration = (!isNaN(v.duration) && v.duration > 0) ? v.duration : videoDuration || 1;
        const currentTime = Math.max(0, v.currentTime || 0);

        // 👇 Faster data progression
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
  }, [videoRef, autoplay, videoDuration]);

  const latest = data.length > 0 ? data[data.length - 1] : GROWTH_DATA[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="flex items-center justify-end mt-20 mr-20 pr-20"
    >
      <div className="flex flex-col gap-4">
        <span className="text-right text-s font-semibold text-black mb-1">
          One mahogany tree absorbs<br />~2.50 tonnes of tCO₂e in 40 years.
        </span>

        <div className="bg-[#E9FBEA] border border-green-200 rounded-lg shadow-sm max-w-xs mx-0 px-2">
          {/* Inner cells */}
          <div className="flex items-stretch justify-between">
            <MetricCell label="Age" value={latest.age ?? 60} unit="yrs" decimals={0} />
            <MetricCell label="DBH" value={latest.dbh ?? 41.07} unit="cm" decimals={2} />
            <MetricCell label="CO₂e" value={latest.co2e ?? 2.51} unit="t" decimals={2} />
          </div>

        </div>

      </div>
    </motion.div>
  );
}

import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface BentoGridItemProps {
  title: string;
  description: React.ReactNode;
  icon: LucideIcon;
  className?: string;
}

export const BentoGrid: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => {
  return (
    <div className={`grid md:grid-cols-3 gap-6 auto-rows-[22rem] ${className}`}>
      {children}
    </div>
  );
};

export const BentoGridItem: React.FC<BentoGridItemProps> = ({
  title,
  description,
  icon: Icon,
  className = "",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      // FIX: Added `row-span-1` here to set the default height for all items.
      className={`row-span-1 rounded-2xl shadow-lg transition duration-300
        bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950
        border border-emerald-800 hover:scale-[1.02]
        p-6 flex flex-col items-center text-center space-y-4 ${className}`}
    >
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-emerald-800/60 border border-emerald-600">
        <Icon className="h-8 w-8 text-emerald-300" />
      </div>

      <h3 className="font-bold text-lg text-emerald-100">{title}</h3>
      <p className="text-sm text-emerald-300">{description}</p>
    </motion.div>
  );
};
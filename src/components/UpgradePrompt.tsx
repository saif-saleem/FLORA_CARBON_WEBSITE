import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Crown, ArrowRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

interface UpgradePromptProps {
  isOpen: boolean;
  onClose: () => void;
  daysRemaining?: number;
  hasUsedTrial?: boolean;
}

const UpgradePrompt: React.FC<UpgradePromptProps> = ({ 
  isOpen, 
  onClose, 
  daysRemaining = 0,
  hasUsedTrial = false 
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Popup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 z-10"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>

          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full">
              <Crown size={32} className="text-white" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">
            {hasUsedTrial && daysRemaining === 0
              ? 'Your Free Trial Has Ended'
              : daysRemaining > 0
              ? `Trial Ending Soon - ${daysRemaining} Day${daysRemaining > 1 ? 's' : ''} Left`
              : 'Upgrade Required'}
          </h2>

          {/* Message */}
          <p className="text-gray-600 text-center mb-6">
            {hasUsedTrial && daysRemaining === 0
              ? "Your 7-day free trial has ended. Upgrade to a paid plan to continue accessing Flora Carbon GPT and unlock all premium features."
              : daysRemaining > 0
              ? `Your free trial ends in ${daysRemaining} day${daysRemaining > 1 ? 's' : ''}. Upgrade now to continue enjoying unlimited access.`
              : 'Upgrade to a paid plan to access Flora Carbon GPT and unlock all premium features.'}
          </p>

          {/* Features */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm font-semibold text-gray-900 mb-2">Upgrade to get:</p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full" />
                Unlimited AI queries
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full" />
                Priority support
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full" />
                Advanced features
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full" />
                No usage limits
              </li>
            </ul>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-lg font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              Maybe Later
            </button>
            <Link
              to="/pricing"
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-lg font-medium text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 transition-all flex items-center justify-center gap-2"
            >
              View Plans
              <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default UpgradePrompt;


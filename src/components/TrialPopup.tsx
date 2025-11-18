import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Calendar, CheckCircle } from 'lucide-react';

interface TrialPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

const TrialPopup: React.FC<TrialPopupProps> = ({ isOpen, onClose, onConfirm, isLoading = false }) => {
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
            disabled={isLoading}
          >
            <X size={20} className="text-gray-500" />
          </button>

          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full">
              <Sparkles size={32} className="text-white" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">
            Start Your Free Trial
          </h2>

          {/* Subtitle */}
          <p className="text-gray-600 text-center mb-6">
            Get 7 days of full access to Flora Carbon GPT - no credit card required!
          </p>

          {/* Features */}
          <div className="space-y-3 mb-8">
            <div className="flex items-start gap-3">
              <CheckCircle size={20} className="text-emerald-600 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-700">Full access to all AI features</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle size={20} className="text-emerald-600 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-700">Unlimited queries during trial</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle size={20} className="text-emerald-600 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-700">
                <Calendar size={16} className="inline mr-1" />
                7 days of premium access
              </span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle size={20} className="text-emerald-600 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-700">Cancel anytime, no commitment</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 py-3 px-4 rounded-lg font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className="flex-1 py-3 px-4 rounded-lg font-medium text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Starting...
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  Start Free Trial
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default TrialPopup;


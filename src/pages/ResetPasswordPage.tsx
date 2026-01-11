import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, ArrowLeft, CheckCircle } from 'lucide-react';
import axios from 'axios';

const { VITE_BACKEND_URL } = import.meta.env;

const ResetPasswordPage: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const BACKEND_URL = VITE_BACKEND_URL || 'http://localhost:5000';

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await axios.post(`${BACKEND_URL}/api/auth/reset-password/${token}`, { password });
      setIsSubmitted(true);
      setTimeout(() => {
        navigate('/auth'); // Redirect to login after 3 seconds
      }, 3000);
    } catch (err: any) {
      alert(err.response?.data?.msg || "Token is invalid or has expired.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-950 to-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        <motion.div
          className="bg-black/20 p-8 rounded-2xl border border-emerald-800 backdrop-blur-sm shadow-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {isSubmitted ? (
            <div className="text-center space-y-4">
              <CheckCircle className="mx-auto text-emerald-400" size={64} />
              <h2 className="text-3xl font-bold text-emerald-200">Success!</h2>
              <p className="text-gray-300">Your password has been updated. Redirecting you to sign in...</p>
            </div>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-center text-emerald-200 mb-2">New Password</h2>
              <p className="text-center text-gray-300 mb-8">Enter your new secure password below.</p>

              <form onSubmit={handleResetSubmit} className="space-y-6">
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400" size={20} />
                  <input
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full bg-emerald-900/30 p-3 pl-10 rounded-lg border border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-gray-400"
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400" size={20} />
                  <input
                    type="password"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full bg-emerald-900/30 p-3 pl-10 rounded-lg border border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-gray-400"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full btn-primary !bg-emerald-600 hover:!bg-emerald-500 !py-3"
                >
                  Update Password
                </button>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
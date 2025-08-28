import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Lock, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import.meta.env.VITE_BACKEND_URL;



const { VITE_BACKEND_URL } = import.meta.env;
const AuthPage: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const { name, email, password } = formData;
  const BACKEND_URL = VITE_BACKEND_URL || 'http://localhost:5000';
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSignUp) {
      // Sign Up Logic
      try {
        await axios.post(`${BACKEND_URL}/api/auth/signup`, { name, email, password });
        alert('Registration successful! Please sign in.');
        setIsSignUp(false); // Switch to sign-in form
      } catch (err) {
        alert('Error: User may already exist or server is down.');
      }
    } else {
      // Sign In Logic
      try {
        const res = await axios.post(`${BACKEND_URL}/api/auth/signin`, { email, password });
        localStorage.setItem('token', res.data.token); // Save the token
        
        // --- THIS IS THE CHANGED LINE ---
        // Redirect to the external GPT application URL
        window.location.href = 'http://15.206.166.70:8501/';
        
      } catch (err) {
        alert('Error: Invalid credentials.');
      }
    }
  };

  const toggleAuthMode = () => setIsSignUp(!isSignUp);

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-950 to-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        <motion.div
          className="bg-black/20 p-8 rounded-2xl border border-emerald-800 backdrop-blur-sm shadow-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <h2 className="text-4xl font-bold text-center text-emerald-200 mb-2">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p className="text-center text-gray-300 mb-8">
            {isSignUp ? 'Join to access our AI tools.' : 'Sign in to continue.'}
          </p>

          <AnimatePresence mode="wait">
            <motion.div
              key={isSignUp ? 'signup' : 'signin'}
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <form onSubmit={onSubmit} className="space-y-6">
                {isSignUp && (
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400" size={20} />
                    <input
                      type="text"
                      placeholder="Full Name"
                      name="name"
                      value={name}
                      onChange={onChange}
                      required
                      className="w-full bg-emerald-900/30 p-3 pl-10 rounded-lg border border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-gray-400"
                    />
                  </div>
                )}
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400" size={20} />
                  <input
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    value={email}
                    onChange={onChange}
                    required
                    className="w-full bg-emerald-900/30 p-3 pl-10 rounded-lg border border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-gray-400"
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400" size={20} />
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    required
                    minLength={6}
                    className="w-full bg-emerald-900/30 p-3 pl-10 rounded-lg border border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-gray-400"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full btn-primary !bg-emerald-600 hover:!bg-emerald-500 !py-3"
                >
                  {isSignUp ? 'Sign Up' : 'Sign In'}
                </button>
              </form>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 text-center">
            <p className="text-gray-400">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
              <button
                onClick={toggleAuthMode}
                className="font-semibold text-emerald-400 hover:text-emerald-300 ml-2"
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;
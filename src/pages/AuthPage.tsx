import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Lock, Mail, ArrowLeft } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { GoogleLogin } from '@react-oauth/google';

// Correct way to read Vite env vars
const { VITE_BACKEND_URL, VITE_CARBONGPT_URL } = import.meta.env;

interface SignInResponse {
  token: string;
  name: string;
}

interface GetUserResponse {
  name: string;
  email: string;
}

const AuthPage: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const { login } = useAuth();

  const { name, email, password } = formData;
  const BACKEND_URL = VITE_BACKEND_URL || 'http://localhost:5000';

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${BACKEND_URL}/api/auth/forgot-password`, { email: recoveryEmail });
      alert("Check your email for the reset link!");
      setIsForgotPassword(false);
      setRecoveryEmail('');
    } catch (err: any) {
      alert(err.response?.data?.msg || "Error sending email.");
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSignUp) {
      try {
        await axios.post(`${BACKEND_URL}/api/auth/signup`, { name, email, password });
        alert('Registration successful! Please sign in.');
        setIsSignUp(false);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          alert(err.response?.data?.msg || err.response?.data?.message || 'Server error');
        } else {
          alert('Error: User may already exist or server is down.');
        }
      }
    } else {
      try {
        const res = await axios.post<SignInResponse>(`${BACKEND_URL}/api/auth/signin`, { email, password });
        const token = res.data.token;

        let userName = res.data.name;
        let userEmail = email; 
        
        try {
          const userRes = await axios.get<GetUserResponse>(`${BACKEND_URL}/api/auth/get`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          userName = userRes.data.name;
          userEmail = userRes.data.email;

          console.log('✅ User details fetched successfully!');
          console.log('👤 Username:', userName);
          console.log('📧 Email:', userEmail);
          console.log('📦 Full user data:', { name: userName, email: userEmail });
        } catch (getErr: unknown) {
          console.error('❌ Error fetching user details:', getErr);
          console.log('⚠️ Using fallback username from signin response');
          console.log('👤 Username:', userName);
        }

        login(token, userName, userEmail);

        await new Promise(resolve => setTimeout(resolve, 500));
        window.location.href = '/';
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          alert(err.response?.data?.msg || err.response?.data?.message || 'Invalid credentials');
        } else {
          alert('Error: Invalid credentials.');
        }
      }
    }
  };

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
    setIsForgotPassword(false);
  };

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
            {isForgotPassword ? 'Reset Password' : (isSignUp ? 'Create Account' : 'Welcome Back')}
          </h2>
          <p className="text-center text-gray-300 mb-8">
            {isForgotPassword ? 'Enter your email to receive a reset link.' : (isSignUp ? 'Join to access our AI tools.' : 'Sign in to continue.')}
          </p>

          <AnimatePresence mode="wait">
            {isForgotPassword ? (
              <motion.div
                key="forgot"
                variants={formVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <form onSubmit={handleForgotSubmit} className="space-y-6">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400" size={20} />
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={recoveryEmail}
                      onChange={(e) => setRecoveryEmail(e.target.value)}
                      required
                      className="w-full bg-emerald-900/30 p-3 pl-10 rounded-lg border border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-gray-400"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full btn-primary !bg-emerald-600 hover:!bg-emerald-500 !py-3"
                  >
                    Send Reset Link
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsForgotPassword(false)}
                    className="flex items-center justify-center w-full text-sm text-gray-400 hover:text-white mt-4"
                  >
                    <ArrowLeft size={16} className="mr-2" /> Back to Sign In
                  </button>
                </form>
              </motion.div>
            ) : (
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
                  
                  {!isSignUp && (
                    <button 
                      type="button"
                      onClick={() => setIsForgotPassword(true)}
                      className="text-sm text-emerald-400 hover:text-emerald-300 float-right mb-2 transition-colors"
                    >
                      Forgot Password?
                    </button>
                  )}

                  <button
                    type="submit"
                    className="w-full btn-primary !bg-emerald-600 hover:!bg-emerald-500 !py-3 mt-4"
                  >
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                  </button>
                </form>

                {/* Google Login Integration */}
                <div className="mt-6 flex flex-col items-center">
                  <div className="w-full border-t border-emerald-800 mb-6 flex items-center">
                    <span className="bg-black/20 px-2 text-gray-500 text-sm mx-auto">OR</span>
                  </div>

                  <GoogleLogin
                    onSuccess={async (credentialResponse) => {
                      try {
                        const res = await axios.post(`${BACKEND_URL}/api/auth/google-login`, {
                          token: credentialResponse.credential,
                        });
                        login(res.data.token, res.data.name, res.data.email);
                        window.location.href = '/'; 
                      } catch (err) {
                        alert("Google Login Failed. Please try again.");
                      }
                    }}
                    onError={() => console.log('Login Failed')}
                    theme="filled_black"
                    shape="pill"
                  />
                </div>
              </motion.div>
            )}
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
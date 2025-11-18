import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { isAuthenticated, getUserData, logout as authLogout, getAuthToken } from '../utils/auth';
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

interface TrialStatus {
  trialStartDate: string | null;
  trialEndDate: string | null;
  isTrialActive: boolean;
  hasPaidPlan: boolean;
  planType: string;
  daysRemaining: number;
  hasUsedTrial: boolean;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: { name: string | null; email: string | null } | null;
  trialStatus: TrialStatus | null;
  login: (token: string, name: string, email: string) => void;
  logout: () => void;
  checkAuth: () => void;
  refreshTrialStatus: () => Promise<void>;
  startTrial: () => Promise<{ success: boolean; message: string }>;
  checkGptAccess: () => Promise<{ hasAccess: boolean; message?: string }>;
  createPaymentOrder: (planType: string, billingCycle: string) => Promise<any>;
  verifyPayment: (paymentData: any) => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState<{ name: string | null; email: string | null } | null>(null);
  const [trialStatus, setTrialStatus] = useState<TrialStatus | null>(null);

  const checkAuth = () => {
    const authStatus = isAuthenticated();
    if (authStatus) {
      const userData = getUserData();
      setAuthenticated(true);
      setUser(userData);
    } else {
      setAuthenticated(false);
      setUser(null);
      setTrialStatus(null);
    }
  };

  const refreshTrialStatus = async () => {
    if (!isAuthenticated()) {
      setTrialStatus(null);
      return;
    }

    try {
      const token = getAuthToken();
      if (!token) return;

      const res = await axios.get(`${BACKEND_URL}/api/auth/trial-status`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTrialStatus(res.data);
    } catch (err) {
      console.error('Error fetching trial status:', err);
      setTrialStatus(null);
    }
  };

  const startTrial = async (): Promise<{ success: boolean; message: string }> => {
    if (!isAuthenticated()) {
      return { success: false, message: 'Please sign in first' };
    }

    try {
      const token = getAuthToken();
      if (!token) {
        return { success: false, message: 'Please sign in first' };
      }

      const res = await axios.post(
        `${BACKEND_URL}/api/auth/start-trial`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      await refreshTrialStatus();
      return { success: true, message: res.data.msg || 'Trial started successfully' };
    } catch (err: any) {
      const message = err.response?.data?.msg || 'Failed to start trial';
      return { success: false, message };
    }
  };

  const checkGptAccess = async (): Promise<{ hasAccess: boolean; message?: string }> => {
    if (!isAuthenticated()) {
      return { hasAccess: false, message: 'Please sign in first' };
    }

    try {
      const token = getAuthToken();
      if (!token) {
        return { hasAccess: false, message: 'Please sign in first' };
      }

      const res = await axios.get(`${BACKEND_URL}/api/auth/check-gpt-access`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.data.hasAccess) {
        if (res.data.hasPaidPlan) {
          return { hasAccess: false, message: 'Your subscription has expired' };
        } else if (res.data.isTrialActive === false) {
          return { hasAccess: false, message: 'Your trial has ended. Please upgrade to continue.' };
        } else {
          return { hasAccess: false, message: 'Please start a free trial or upgrade to a paid plan' };
        }
      }

      return { hasAccess: true };
    } catch (err: any) {
      return { hasAccess: false, message: 'Unable to verify access. Please try again.' };
    }
  };

  const createPaymentOrder = async (planType: string, billingCycle: string) => {
    if (!isAuthenticated()) {
      throw new Error('Please sign in first');
    }

    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error('Please sign in first');
      }

      const res = await axios.post(
        `${BACKEND_URL}/api/payment/create-order`,
        { planType, billingCycle },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return res.data;
    } catch (err: any) {
      throw err;
    }
  };

  const verifyPayment = async (paymentData: any) => {
    if (!isAuthenticated()) {
      throw new Error('Please sign in first');
    }

    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error('Please sign in first');
      }

      const res = await axios.post(
        `${BACKEND_URL}/api/payment/verify-payment`,
        paymentData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Refresh trial status after successful payment
      await refreshTrialStatus();
      return res.data;
    } catch (err: any) {
      throw err;
    }
  };

  const login = (token: string, name: string, email: string) => {
    // Store token and set expiration (1 hour from now)
    const expirationTime = Date.now() + 60 * 60 * 1000; // 1 hour in milliseconds
    localStorage.setItem('token', token);
    localStorage.setItem('tokenExpiration', expirationTime.toString());
    localStorage.setItem('userName', name);
    localStorage.setItem('userEmail', email);
    
    setAuthenticated(true);
    setUser({ name, email });
    // Refresh trial status after login
    refreshTrialStatus();
  };

  const logout = () => {
    authLogout();
    setAuthenticated(false);
    setUser(null);
    setTrialStatus(null);
  };

  // Check authentication status on mount and periodically
  useEffect(() => {
    checkAuth();
    
    // Check auth status every minute to catch expiration
    const interval = setInterval(() => {
      checkAuth();
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  // Refresh trial status when authenticated
  useEffect(() => {
    if (authenticated) {
      refreshTrialStatus();
      // Refresh trial status every 5 minutes
      const interval = setInterval(() => {
        refreshTrialStatus();
      }, 5 * 60000); // Every 5 minutes

      return () => clearInterval(interval);
    }
  }, [authenticated]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: authenticated,
        user,
        trialStatus,
        login,
        logout,
        checkAuth,
        refreshTrialStatus,
        startTrial,
        checkGptAccess,
        createPaymentOrder,
        verifyPayment,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


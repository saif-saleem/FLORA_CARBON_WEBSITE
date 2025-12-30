import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import TeamPage from './pages/TeamPage';
import ContactPage from './pages/ContactPage';
import AuthPage from './pages/AuthPage';
import PricingPage from './pages/PricingPage';
// import BlogsPage from './pages/BlogsPage'; // Commented out as per your original file
import AnimatedCursor from './components/AnimatedCursor';
import { AuthProvider } from './contexts/AuthContext';

/**
 * Helper component to ensure the page scrolls to the top on every route change.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

/**
 * Connection Tester:
 * This function attempts to ping your backend's signin route.
 * Check your backend terminal for a "POST /api/auth/signin 400" log.
 */
const testBackendConnection = async () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  try {
    console.log("🚀 Testing connection to:", backendUrl);
    
    const response = await fetch(`${backendUrl}/api/auth/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        email: 'test@connection.com', 
        password: 'password123' 
      })
    });

    const data = await response.json();
    console.log("✅ Backend reached! Response:", data);
  } catch (error) {
    console.error("❌ Connection failed! Ensure your backend is running on port 5000 and .env is correct.", error);
  }
};

function App() {
  // Trigger the backend test when the application mounts
  useEffect(() => {
    testBackendConnection();
  }, []);

  return (
    <AuthProvider>
      <Router>
        <AnimatedCursor />
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            {/* <Route path="/blogs" element={<BlogsPage />} /> */}
            <Route path="/auth" element={<AuthPage />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
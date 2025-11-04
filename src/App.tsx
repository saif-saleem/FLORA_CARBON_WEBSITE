import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import TeamPage from './pages/TeamPage';
import ContactPage from './pages/ContactPage';
import AuthPage from './pages/AuthPage';
import PricingPage from './pages/PricingPage';
// import BlogsPage from './pages/BlogsPage';
import AnimatedCursor from './components/AnimatedCursor';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Main App component with updated routing
function App() {
  return (
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
          {/* The /auth route is now inside the main Layout */}
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
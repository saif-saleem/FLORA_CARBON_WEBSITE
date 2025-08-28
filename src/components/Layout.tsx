import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Linkedin, Twitter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../assets/logo.tsx';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Team', path: '/team' },
  { name: 'Contact', path: '/contact' },
];

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const headerVariants = {
    top: { backgroundColor: 'rgba(17, 24, 39, 0)', backdropFilter: 'blur(0px)' },
    scrolled: { backgroundColor: 'rgba(17, 24, 39, 0.8)', backdropFilter: 'blur(12px)' },
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <motion.header
        initial="top"
        animate={isScrolled ? 'scrolled' : 'top'}
        variants={headerVariants}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="fixed w-full z-50"
      >
        <div className="container-padding mx-auto flex justify-between items-center py-4 text-white">
          <Link to="/" aria-label="Flora Carbon Home"><Logo /></Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link key={item.name} to={item.path} className="relative font-medium hover:text-primary-300 transition-colors duration-300 group">
                {item.name}
                <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-primary-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out ${location.pathname === item.path ? 'scale-x-100' : ''}`} />
              </Link>
            ))}

            {/* --- Sign In Button - Desktop --- */}
            <Link 
              to="/auth" 
              className="text-sm font-semibold border border-emerald-400 rounded-full px-4 py-1.5 hover:bg-emerald-400/20 transition-colors duration-300"
            >
              Sign In
            </Link>
          </nav>

          <button className="md:hidden z-50" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-900 z-40 pt-24 px-8 md:hidden"
          >
            <nav className="flex flex-col items-center space-y-8">
              {navItems.map((item) => (
                <Link key={item.name} to={item.path} className="text-2xl font-semibold text-white">
                  {item.name}
                </Link>
              ))}

              {/* --- Sign In Button - Mobile --- */}
              <Link 
                to="/auth" 
                className="text-2xl font-semibold text-white bg-emerald-600 px-8 py-3 rounded-lg mt-4"
              >
                Sign In
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow">{children}</main>

      <footer className="bg-secondary-600 text-white">
        <div className="container-padding mx-auto py-12 text-center">
          <p className="font-semibold text-lg mb-4">Flora Carbon</p>
          <div className="flex justify-center space-x-6 mb-6">
            {/* <a href="#" aria-label="LinkedIn" className="hover:text-primary-300"><Linkedin /></a> */}
            {/* <a href="#" aria-label="Twitter" className="hover:text-primary-300"><Twitter /></a> */}
          </div>
          <p className="text-gray-400">&copy; {new Date().getFullYear()} Flora Carbon. Pioneering a sustainable future.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import Logo from '../assets/logo.tsx';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'Team', path: '/team' },
  { name: 'Contact', path: '/contact' },
];

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setIsMenuOpen(false), [location.pathname]);

  // Handle keyboard navigation for mobile menu
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isMenuOpen && event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const headerVariants = {
    top: {
      backgroundColor: '#fdfdfd',
      backdropFilter: 'blur(0px)',
    },
    scrolled: {
      backgroundColor: 'rgba(255,255,255,0.85)',
      backdropFilter: 'blur(16px)',
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Scroll progress bar (cinematic touch) */}
      <motion.div
        className="fixed top-0 left-0 h-[2px] origin-left z-[60] bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400"
        style={{ scaleX: scrollYProgress, right: 0 }}
      />

      <motion.header
        initial="top"
        animate={isScrolled ? 'scrolled' : 'top'}
        variants={headerVariants}
        transition={{ duration: 0.45, ease: 'easeInOut' }}
        className={`fixed w-full z-50 transition-all duration-500 
          ${isScrolled ? "ring-1 ring-black/5 shadow-[0_8px_30px_rgba(0,0,0,0.06)]" : ""}
        `}
      >
        {/* subtle gradient glow behind header (only when scrolled) */}
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: isScrolled ? 1 : 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_120%_at_50%_-30%,rgba(16,185,129,0.12),transparent)]"
        />

        {/* animated sheen pass (only when scrolled) */}
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: isScrolled ? 1 : 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="pointer-events-none absolute inset-x-0 top-0 h-px overflow-hidden"
        >
          <div className="h-full w-1/3 translate-x-[-100%] animate-sheen bg-gradient-to-r from-transparent via-white/50 to-transparent" />
        </motion.div>

        <div className="container-padding mx-auto ">
          <div className="flex items-center gap-4  text-gray-900">
            {/* Left: Logo (unchanged usage) */}
            <Link to="/" aria-label="Flora Carbon Home" className="shrink-0">
              <Logo />
            </Link>

            {/* Center: Nav */}
            <nav className="hidden md:flex mx-auto items-center gap-5 lg:gap-12">
              {navItems.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="relative group font-medium text-gray-800 hover:text-gray-900 transition-colors duration-200"
                  >
                    {/* slight pill highlight for active route */}
                    {active && (
                      <span className="absolute inset-x-[-8px] -inset-y-1 rounded-full bg-emerald-500/6 ring-1 ring-emerald-500/10" />
                    )}
                    <span className="relative z-10">{item.name}</span>
                    {/* animated underline */}
                    <motion.span
                      layoutId="nav-underline"
                      className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400`}
                      initial={false}
                      animate={{ width: active ? '100%' : '0%' }}
                      transition={{ duration: 0.25 }}
                    />
                    {/* hover underline for inactive */}
                    {!active && (
                      <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-emerald-400 group-hover:w-full transition-all duration-300" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right: CTA */}
            <div className="hidden md:flex shrink-0">
              <Link
                to="/auth"
                className="relative inline-flex items-center justify-center rounded-full px-4 py-1.5 text-sm font-semibold text-white
                           bg-gradient-to-r from-emerald-500 to-teal-500
                           shadow-md hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-200
                           ring-1 ring-emerald-600/30"
              >
                <span className="relative z-10">Sign In</span>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden ml-auto z-50 p-2 rounded-lg hover:bg-gray-100/10 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-900/70 backdrop-blur-md z-40 pt-24 px-8 md:hidden"
            onClick={() => setIsMenuOpen(false)} // Close on backdrop click
          >
            <nav 
              id="mobile-menu"
              className="flex flex-col items-center space-y-8"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking nav items
            >
              {navItems.map((item, index) => (
                <Link 
                  key={item.name} 
                  to={item.path} 
                  className="text-2xl font-semibold text-white hover:text-emerald-300 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-lg px-4 py-2"
                  tabIndex={isMenuOpen ? 0 : -1}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/auth"
                className="text-2xl font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 px-8 py-3 rounded-full mt-4 shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-gray-900"
                tabIndex={isMenuOpen ? 0 : -1}
              >
                Sign In
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* add top padding so content doesn't hide under fixed header */}
      <main className="flex-grow pt-16">
        {children}
      </main>

      <footer className="bg-secondary-600 text-white">
        <div className="container-padding mx-auto py-12 text-center">
          <p className="font-semibold text-lg mb-4">Flora Carbon</p>
          <p className="text-gray-400">&copy; {new Date().getFullYear()} Flora Carbon. Pioneering a sustainable future.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

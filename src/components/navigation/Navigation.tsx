import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Command } from 'lucide-react';
import Magnetic from '../ui/Magnetic';

const navLinks = [
  { name: 'HOME', href: '#home' },
  { name: 'ABOUT', href: '#about' },
  { name: 'JOURNEY', href: '#journey' },
  { name: 'SKILLS', href: '#skills' },
  { name: 'PROJECTS', href: '#projects' },
  { name: 'GITHUB', href: '#github' },
  { name: 'VISION', href: '#vision' },
  { name: 'CONTACT', href: '#contact' },
];

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = navLinks.map(link => link.href.substring(1));
      let current = '';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= (element.offsetTop - 300)) {
          current = section;
        }
      }
      
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 transition-all duration-700 ${
          isScrolled ? 'py-4 glass-panel hover:translate-y-0 hover:bg-white/5 border-b-0 border-b-transparent shadow-glass' : 'py-8'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {/* Logo */}
        <div className="text-2xl font-display font-bold tracking-tighter cursor-pointer z-50 hover:text-glow transition-all">
          SK<span className="text-accent-violet">.</span>
        </div>

        {/* Desktop Navigation */}
        <motion.nav 
          className="hidden md:flex items-center gap-8"
          layout
        >
          {navLinks.map((link) => (
            <Magnetic intensity={0.3} key={link.name}>
              <li className="list-none">
                <a
                  href={link.href}
                  onClick={(e) => scrollTo(e, link.href)}
                  className="relative text-xs font-medium tracking-widest text-primary-dim hover:text-primary transition-colors"
                >
                  {link.name}
                  {activeSection === link.href.substring(1) && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-accent-violet rounded-full shadow-glow-violet"
                    />
                  )}
                </a>
              </li>
            </Magnetic>
          ))}
        </motion.nav>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-4 z-50">

          <Magnetic intensity={0.4}>
            <button 
              className="flex items-center gap-2 text-xs font-mono tracking-widest text-primary-dim hover:text-primary transition-colors glass-panel px-3 py-1.5 rounded-full"
              onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
            >
              <Command size={14} /> 
              <span className="opacity-50">CMD+K</span>
            </button>
          </Magnetic>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden z-50 p-2 text-primary"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.header>

      {/* Mobile Fullscreen Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ type: 'tween', duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center px-6"
          >
            <div className="flex flex-col gap-6 w-full max-w-sm">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollTo(e, link.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i }}
                  className="text-4xl font-display font-light flex items-center gap-4 group"
                >
                  <span className="text-sm font-mono text-primary-dim group-hover:text-accent-violet transition-colors">
                    0{i + 1}
                  </span>
                  <span className={activeSection === link.href.substring(1) ? 'text-primary text-glow' : 'text-primary-dim group-hover:text-primary transition-colors'}>
                    {link.name}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;

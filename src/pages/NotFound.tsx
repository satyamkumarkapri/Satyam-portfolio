import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
      {/* Subtle floating digital object in background */}
      <motion.div 
        className="absolute w-[40vw] h-[40vw] rounded-full border border-border/10 border-dashed"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
      
      <div className="z-10 flex flex-col items-center">
        <h1 className="text-[12rem] font-display font-bold leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10 opacity-80 relative group cursor-default">
          <span className="relative inline-block hover:animate-pulse">404</span>
        </h1>
        <h2 className="text-2xl tracking-[0.2em] text-accent-magenta mt-4 font-mono text-glow">SIGNAL LOST.</h2>
        <p className="text-primary-dim mt-6 max-w-md">
          You've reached an unexplored part of Satyam's digital universe.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-12">
          <Link 
            to="/" 
            className="px-8 py-3 bg-gradient-to-r from-accent-violet via-accent-blue to-accent-magenta text-white font-medium rounded-full shadow-glow-violet transition-all transform hover:scale-105 hover:shadow-glow-blue"
          >
            RETURN HOME
          </Link>
          <button 
            onClick={() => {
              // Trigger command palette later
              window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));
            }}
            className="px-8 py-3 glass-panel text-primary font-medium rounded-full transition-all transform hover:scale-105 flex items-center justify-center gap-2"
          >
            <Terminal size={18} />
            OPEN COMMAND PALETTE
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

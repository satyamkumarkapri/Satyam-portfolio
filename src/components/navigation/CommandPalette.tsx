import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, ArrowRight, User, Briefcase, Code, Brain, Mail } from 'lucide-react';

const commands = [
  { id: 'home', title: 'Go Home', icon: <Command size={16} />, action: () => scrollTo('#home') },
  { id: 'about', title: 'Explore About', icon: <User size={16} />, action: () => scrollTo('#about') },
  { id: 'projects', title: 'View Projects', icon: <Briefcase size={16} />, action: () => scrollTo('#projects') },
  { id: 'skills', title: 'View Skills', icon: <Code size={16} />, action: () => scrollTo('#skills') },
  { id: 'github', title: 'Open GitHub', icon: <Code size={16} />, action: () => scrollTo('#github') },
  { id: 'vision', title: 'View Vision', icon: <Brain size={16} />, action: () => scrollTo('#vision') },
  { id: 'contact', title: 'Contact Satyam', icon: <Mail size={16} />, action: () => scrollTo('#contact') },
];

const scrollTo = (selector: string) => {
  const el = document.querySelector(selector);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

const CommandPalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredCommands = commands.filter(c => 
    c.title.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle palette: Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      
      // Close on escape
      if (e.key === 'Escape') {
        setIsOpen(false);
      }

      if (isOpen) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIndex(prev => (prev < filteredCommands.length - 1 ? prev + 1 : prev));
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
        }
        if (e.key === 'Enter' && filteredCommands[selectedIndex]) {
          e.preventDefault();
          filteredCommands[selectedIndex].action();
          setIsOpen(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex]);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  // Reset selection when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-start justify-center pt-[15vh] px-4">
          <motion.div 
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
          
          <motion.div 
            className="relative w-full max-w-xl glass-panel rounded-2xl overflow-hidden shadow-2xl shadow-black/80"
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", bounce: 0, duration: 0.3 }}
          >
            <div className="flex items-center px-4 py-4 border-b border-border bg-background/20">
              <Search size={20} className="text-primary-dim mr-3" />
              <input
                ref={inputRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Type a command or search..."
                className="w-full bg-transparent text-primary outline-none placeholder:text-primary-dim font-mono"
              />
              <div className="text-[10px] font-mono text-primary-dim px-2 py-1 bg-surface rounded ml-3">
                ESC
              </div>
            </div>

            <div className="max-h-[60vh] overflow-y-auto py-2">
              {filteredCommands.length === 0 ? (
                <div className="px-6 py-8 text-center text-primary-dim font-mono text-sm">
                  No commands found.
                </div>
              ) : (
                <ul className="px-2">
                  {filteredCommands.map((command, idx) => (
                    <li key={command.id}>
                      <button
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all ${
                          idx === selectedIndex ? 'bg-accent-violet text-white shadow-glow-violet' : 'text-primary-dim hover:bg-surface-hover hover:text-primary'
                        }`}
                        onClick={() => {
                          command.action();
                          setIsOpen(false);
                        }}
                        onMouseEnter={() => setSelectedIndex(idx)}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-1.5 rounded-md ${idx === selectedIndex ? 'bg-primary/20' : 'bg-background'}`}>
                            {command.icon}
                          </div>
                          <span className="font-mono text-sm tracking-wide">{command.title}</span>
                        </div>
                        {idx === selectedIndex && <ArrowRight size={16} />}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;

import React, { useEffect, useState } from 'react';

import { personalData } from '../data/personal';

const Footer: React.FC = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' IST');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="relative py-20 px-6 md:px-12 bg-transparent overflow-hidden">
      
      {/* Massive Background Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center pointer-events-none opacity-[0.02] z-0 overflow-hidden">
        <h1 className="text-[25vw] font-display font-bold whitespace-nowrap select-none leading-none">
          {personalData.firstName.toUpperCase()}
        </h1>
      </div>

      <div className="container mx-auto relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="lg:col-span-2">
            <h3 className="text-2xl md:text-3xl font-display font-bold text-primary mb-2 uppercase tracking-tighter">
              {personalData.name}
            </h3>
            <p className="text-accent-cyan font-mono text-sm tracking-widest mb-6">
              Computer Science × Artificial Intelligence × Business
            </p>
            <p className="text-primary-dim max-w-sm">
              "Learning. Building. Exploring what's possible."
            </p>
          </div>

          <div>
            <h4 className="text-primary font-mono text-sm tracking-widest mb-6 uppercase">Navigation</h4>
            <ul className="space-y-4">
              {['Home', 'About', 'Projects', 'GitHub', 'Contact'].map(link => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-primary-dim hover:text-primary transition-colors text-sm uppercase tracking-widest">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-primary font-mono text-sm tracking-widest mb-6 uppercase">Connect</h4>
            <ul className="space-y-4">
              <li>
                <a href={personalData.socials.linkedin} target="_blank" rel="noreferrer" className="text-primary-dim hover:text-primary transition-colors text-sm uppercase tracking-widest">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={personalData.socials.github} target="_blank" rel="noreferrer" className="text-primary-dim hover:text-primary transition-colors text-sm uppercase tracking-widest">
                  GitHub
                </a>
              </li>
              <li>
                <a href={personalData.socials.huggingface} target="_blank" rel="noreferrer" className="text-primary-dim hover:text-primary transition-colors text-sm uppercase tracking-widest">
                  Hugging Face
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border/50 gap-6 text-xs font-mono tracking-widest text-primary-dim">
          <div className="flex items-center gap-2 uppercase text-center md:text-left">
            DESIGNED & BUILT BY {personalData.name} © {new Date().getFullYear()}
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden md:block">MADE WITH CURIOSITY AND CODE</div>
            <div className="flex items-center gap-2 border border-border/50 px-3 py-1.5 rounded-full bg-surface">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              SYSTEM ONLINE — {time}
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

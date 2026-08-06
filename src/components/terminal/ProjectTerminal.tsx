import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, X } from 'lucide-react';
import { personalData } from '../../data/personal';

const ProjectTerminal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<{ type: 'input' | 'output'; content: React.ReactNode }[]>([
    { 
      type: 'output', 
      content: (
        <div className="mb-4 mt-2">
          <pre className="text-transparent bg-clip-text bg-gradient-to-r from-accent-violet via-accent-blue to-accent-cyan font-bold text-[10px] leading-tight mb-4 select-none">
{`   _____       _______     __          __  __ 
  / ____|   /\\|__   __\\ \\ / /    /\\   |  \\/  |
 | (___    /  \\  | |   \\ V /    /  \\  | \\  / |
  \\___ \\  / /\\ \\ | |    > <    / /\\ \\ | |\\/| |
  ____) |/ ____ \\| |   / . \\  / ____ \\| |  | |
 |_____//_/    \\_\\_|  /_/ \\_\\/_/    \\_\\_|  |_|`}
          </pre>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 bg-accent-blue/20 text-accent-blue text-[10px] rounded border border-accent-blue/30">SYSTEM</span>
            <span className="text-primary font-bold">Welcome to Satyam OS v2.0.0</span>
          </div>
          <div className="text-primary-dim text-xs">Type <span className="text-accent-cyan font-bold">"help"</span> to see available commands.</div>
        </div>
      )
    }
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, isOpen]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    
    if (!cmd) return;

    setHistory(prev => [...prev, { type: 'input', content: input }]);
    setInput('');

    let output: React.ReactNode = '';

    switch (cmd) {
      case 'help':
        output = (
          <div className="grid grid-cols-2 gap-2 max-w-sm mt-1">
            {['about', 'skills', 'projects', 'education', 'github', 'vision', 'contact', 'whoami', 'sudo', 'clear'].map(c => (
              <div key={c} className="flex items-center gap-2">
                <span className="text-accent-cyan font-bold">›</span>
                <span className="text-primary-dim hover:text-primary transition-colors">{c}</span>
              </div>
            ))}
          </div>
        );
        break;
      case 'about':
        output = <div className="border-l-2 border-accent-blue pl-3 py-1 my-1 italic">{personalData.headline}</div>;
        break;
      case 'skills':
        output = (
          <div className="flex flex-wrap gap-2 my-1">
            {['AI', 'Machine Learning', 'Full Stack', 'Java', 'Python', 'React', 'Business Strategy'].map((s, i) => (
              <span key={i} className="px-2 py-1 bg-surface border border-border rounded text-[10px] font-bold text-primary">
                {s}
              </span>
            ))}
          </div>
        );
        break;
      case 'projects':
        output = (
          <div className="space-y-2 my-1">
            {[
              { n: 'HealthNet', c: 'text-accent-cyan' }, 
              { n: 'Hospital Navigation System', c: 'text-accent-blue' }, 
              { n: 'COVID-19 Data Analysis', c: 'text-accent-violet' }
            ].map(p => (
              <div key={p.n} className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full bg-current ${p.c}`} />
                <span className="text-primary-dim">{p.n}</span>
              </div>
            ))}
          </div>
        );
        break;
      case 'education':
        output = <div className="text-primary-dim">B.Tech in Computer Science & Engineering <span className="text-accent-cyan font-bold">@ KL University</span></div>;
        break;
      case 'github':
        output = <div>Opening GitHub... <a href={personalData.socials.github} target="_blank" rel="noreferrer" className="text-accent-blue underline block mt-1">{personalData.socials.github}</a></div>;
        break;
      case 'vision':
        output = <div className="text-transparent bg-clip-text bg-gradient-to-r from-accent-violet to-accent-cyan font-bold">My vision is to combine technology, intelligence, and business knowledge to build solutions that create real value.</div>;
        break;
      case 'contact':
        output = <div>Initiating contact protocol... <a href={`mailto:${personalData.email}`} className="text-accent-blue underline">{personalData.email}</a></div>;
        break;
      case 'whoami':
        output = <div className="font-bold text-primary">Curious engineer. <span className="text-accent-blue">Builder.</span> AI explorer. <span className="text-accent-violet">Future entrepreneur.</span></div>;
        break;
      case 'sudo':
        output = <div className="text-red-500 font-bold animate-pulse">Permission denied. You are not Satyam.</div>;
        break;
      case 'clear':
        setHistory([]);
        return;
      default:
        output = <div className="text-primary-dim">Command not found: <span className="text-red-400">{cmd}</span>. Type "help" for available commands.</div>;
    }

    // Simulate thinking delay
    setTimeout(() => {
      setHistory(prev => [...prev, { type: 'output', content: output }]);
    }, 300);
  };

  return (
    <>
      {/* Terminal Trigger Button */}
      <motion.button
        className="fixed bottom-6 left-6 z-40 px-4 py-2 glass-panel border border-border text-primary-dim hover:text-primary rounded-full flex items-center gap-2 font-mono text-xs tracking-widest transition-colors shadow-lg"
        onClick={() => setIsOpen(true)}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 4.5, duration: 1 }}
      >
        <span className="text-accent-cyan">&gt;_</span> OPEN TERMINAL
      </motion.button>

      {/* Terminal Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-x-4 bottom-4 md:inset-auto md:bottom-6 md:left-6 md:w-[500px] h-[400px] z-[100] bg-background/95 backdrop-blur-xl border border-border rounded-lg overflow-hidden flex flex-col shadow-2xl"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
          >
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-surface border-b border-border">
              <div className="flex items-center gap-2 text-xs font-mono text-primary-dim">
                <TerminalIcon size={14} />
                <span>visitor@satyam:~$</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-primary-dim hover:text-primary">
                <X size={14} />
              </button>
            </div>

            {/* Terminal Body */}
            <div className="flex-1 overflow-y-auto p-4 font-mono text-sm hide-scrollbar" onClick={() => inputRef.current?.focus()}>
              {history.map((line, i) => (
                <div key={i} className="mb-2">
                  {line.type === 'input' ? (
                    <div className="flex gap-2 text-primary">
                      <span className="text-accent-cyan">visitor@satyam:~$</span>
                      <span>{line.content}</span>
                    </div>
                  ) : (
                    <div className="text-primary-dim ml-4 leading-relaxed">{line.content}</div>
                  )}
                </div>
              ))}
              
              <form onSubmit={handleCommand} className="flex gap-2 text-primary mt-2">
                <span className="text-accent-cyan">visitor@satyam:~$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 bg-transparent outline-none caret-accent-blue text-primary placeholder:text-primary-dim/30"
                    placeholder="Enter command..."
                    autoComplete="off"
                    spellCheck="false"
                  />
              </form>
              <div ref={bottomRef} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </>
  );
};

export default ProjectTerminal;

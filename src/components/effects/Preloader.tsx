import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalData } from '../../data/personal';

interface PreloaderProps {
  onComplete: () => void;
}

const messages = [
  "INITIALIZING DIGITAL IDENTITY",
  "LOADING PROFILE",
  "CONNECTING PROJECTS",
  "ANALYZING SKILLS",
  "SYNCING VISION",
  "SYSTEM READY"
];

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [isRevealing, setIsRevealing] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Prevent scrolling while preloader is active
    document.body.style.overflow = 'hidden';

    let currentProgress = 0;
    const progressInterval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 3) + 1;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(progressInterval);
        setIsRevealing(true);
        
        // Wait for reveal animation before completing
        setTimeout(() => {
          setIsVisible(false);
          document.body.style.overflow = '';
          onComplete();
        }, 800);
      }
      setProgress(currentProgress);
      
      // Update message based on progress
      if (currentProgress < 20) setMessageIndex(0);
      else if (currentProgress < 40) setMessageIndex(1);
      else if (currentProgress < 60) setMessageIndex(2);
      else if (currentProgress < 80) setMessageIndex(3);
      else if (currentProgress < 100) setMessageIndex(4);
      else setMessageIndex(5);
      
    }, 15);

    return () => {
      clearInterval(progressInterval);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center font-mono text-sm"
          exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
        >
          {!isRevealing ? (
            <div className="flex flex-col items-center">
              <motion.div 
                className="w-2 h-2 bg-primary rounded-full mb-8 shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                animate={{ scale: [1, 2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <div className="h-6 flex items-center justify-center overflow-hidden mb-2">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={messageIndex}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-primary-dim tracking-widest"
                  >
                    {messages[messageIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>
              <p className="text-primary font-medium text-lg">
                {progress.toString().padStart(2, '0')}%
              </p>
            </div>
          ) : (
            <motion.div 
              className="flex flex-col items-center justify-center text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-6xl md:text-8xl font-display font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 mb-4">
                SK
              </h1>
              <p className="text-xl md:text-2xl tracking-[0.2em] font-light text-primary mb-2">
                {personalData.name.toUpperCase()}
              </p>
              <p className="text-primary-dim tracking-widest text-xs md:text-sm mt-4">
                WELCOME TO MY DIGITAL UNIVERSE
              </p>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;

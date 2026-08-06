import React, { useState } from 'react';
import { motion } from 'framer-motion';

import CustomCursor from '../components/ui/CustomCursor';
import Navigation from '../components/navigation/Navigation';
import CommandPalette from '../components/navigation/CommandPalette';
import AskSatyamAI from '../components/ai/AskSatyamAI';
import ProjectTerminal from '../components/terminal/ProjectTerminal';
import Hero from '../sections/Hero';
import IdentityStrip from '../sections/IdentityStrip';
import About from '../sections/About';
import Metrics from '../sections/Metrics';
import Journey from '../sections/Journey';
import Skills from '../sections/Skills';
import Projects from '../sections/Projects';
import GitHubSection from '../sections/GitHubSection';
import Business from '../sections/Business';
import Vision from '../sections/Vision';
import Contact from '../sections/Contact';
import Footer from '../sections/Footer';
import { useEasterEggs } from '../hooks/useEasterEggs';

const Home: React.FC = () => {
  useEasterEggs();

  return (
    <>
      <CustomCursor />
      
        <main className="relative w-full">
          {/* Animated Mesh Gradient Background with Noise */}
          <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-background">
            <motion.div 
              animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vh] bg-accent-violet/10 rounded-full blur-3xl opacity-50" 
            />
            <motion.div 
              animate={{ x: [0, -100, 0], y: [0, 100, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute top-[20%] right-[-10%] w-[40vw] h-[60vh] bg-accent-blue/10 rounded-full blur-3xl opacity-50" 
            />
            <motion.div 
              animate={{ x: [0, 50, 0], y: [0, 50, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-[-10%] left-[20%] w-[50vw] h-[50vh] bg-accent-magenta/5 rounded-full blur-3xl opacity-50" 
            />
          </div>

          <div className="relative z-10">
            <CommandPalette />
            <Navigation />
            
            <Hero />
            <IdentityStrip />
            <About />
            <Metrics />
            <Journey />
            <Skills />
            <Projects />
            <GitHubSection />
            <Business />
            <Vision />
            <Contact />
            <Footer />
            
            <AskSatyamAI />
            <ProjectTerminal />
          </div>
        </main>

      <style>{`
        .future-mode {
          filter: hue-rotate(90deg) saturate(2);
          transition: filter 0.5s ease;
        }
      `}</style>
    </>
  );
};

export default Home;

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skillsData } from '../data/skills';
import SpotlightCard from '../components/ui/SpotlightCard';
import SectionHeader from '../components/ui/SectionHeader';
import { Canvas } from '@react-three/fiber';
import HologramRing from '../components/effects/HologramRing';

type CategoryType = keyof typeof skillsData | null;

const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>(null);
  
  const categories = Object.keys(skillsData) as (keyof typeof skillsData)[];

  // Helper to generate circular positions
  const getOrbitPosition = (index: number, total: number, radius: number) => {
    const angle = (index / total) * Math.PI * 2 - Math.PI / 2; // Start from top
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    };
  };

  return (
    <section id="skills" className="relative py-32 px-6 md:px-12 bg-transparent min-h-screen overflow-hidden border-b border-border/50">
      <div className="container mx-auto">
          <SectionHeader 
            number="03"
            category="SKILLS"
            titleTop={<>MY TECHNOLOGY</>}
            titleBottom={<>CONSTELLATION.</>}
            align="left"
            className="md:text-left text-center"
          />

        {/* Desktop Interactive Constellation */}
        <div className="hidden lg:flex relative w-full h-[600px] items-center justify-center mt-12 perspective-1000">
          
          {/* 3D Hologram Background */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
            <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
              <ambientLight intensity={0.5} />
              <HologramRing />
            </Canvas>
          </div>

          {/* Central Node */}
          <motion.div 
            className="absolute z-30 w-32 h-32 rounded-full cursor-pointer"
            onClick={() => setActiveCategory(null)}
            animate={{ 
              scale: activeCategory ? 0.8 : 1,
            }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <SpotlightCard className="glass-panel w-full h-full rounded-full border border-primary/20 flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.1)]">
              <div className="text-xl font-display font-bold tracking-widest">SATYAM</div>
              
              {/* Pulsing rings */}
              {!activeCategory && (
                <>
                  <div className="absolute inset-0 rounded-full border border-primary/30 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]" />
                  <div className="absolute inset-0 rounded-full border border-primary/20 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite_1s]" />
                </>
              )}
            </SpotlightCard>
          </motion.div>

          {/* Category Nodes (Orbiting when activeCategory is null) */}
          <AnimatePresence>
            {!activeCategory && categories.map((category, idx) => {
              const pos = getOrbitPosition(idx, categories.length, 220);
              return (
                <motion.button
                  key={`cat-${category}`}
                  onClick={() => setActiveCategory(category)}
                  className="absolute z-20 px-6 py-3 rounded-full glass-panel text-sm font-mono tracking-widest hover:border-accent-violet hover:shadow-glow-violet transition-all"
                  initial={{ opacity: 0, x: 0, y: 0 }}
                  animate={{ 
                    opacity: 1, 
                    x: pos.x, 
                    y: pos.y,
                  }}
                  exit={{ opacity: 0, x: 0, y: 0, transition: { duration: 0.3 } }}
                  transition={{ duration: 0.8, type: "spring", delay: idx * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {category}
                </motion.button>
              );
            })}
          </AnimatePresence>

          {/* Expanded Skill Nodes (When category is selected) */}
          <AnimatePresence>
            {activeCategory && (
              <>
                <motion.div 
                  className="absolute z-20 top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-4"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <button 
                    onClick={() => setActiveCategory(null)}
                    className="text-primary-dim hover:text-primary text-xs font-mono tracking-widest px-4 py-2 glass-panel rounded-full"
                  >
                    ← BACK
                  </button>
                  <span className="text-xl font-display font-bold text-accent-violet text-glow-violet tracking-widest">
                    {activeCategory}
                  </span>
                </motion.div>
                
                {skillsData[activeCategory].map((skill, idx) => {
                  const pos = getOrbitPosition(idx, skillsData[activeCategory].length, 250);
                  // Add slight random offset to make it look organic
                  const randomOffsetX = (Math.random() - 0.5) * 30;
                  const randomOffsetY = (Math.random() - 0.5) * 30;
                  
                  return (
                    <motion.div
                      key={`skill-${skill}`}
                      className="absolute z-20 px-5 py-3 rounded-2xl glass-panel text-sm font-medium whitespace-nowrap cursor-default hover:border-accent-blue/50 transition-colors"
                      initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                      animate={{ 
                        opacity: 1, 
                        x: pos.x + randomOffsetX, 
                        y: pos.y + randomOffsetY,
                        scale: 1
                      }}
                      exit={{ opacity: 0, scale: 0, transition: { duration: 0.2 } }}
                      transition={{ 
                        duration: 0.6, 
                        type: "spring", 
                        bounce: 0.4,
                        delay: idx * 0.05 
                      }}
                      whileHover={{ scale: 1.1, zIndex: 30 }}
                    >
                      <div className="text-primary">{skill}</div>
                    </motion.div>
                  );
                })}
              </>
            )}
          </AnimatePresence>
          
          {/* Subtle connecting lines (visual only) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
             <circle cx="50%" cy="50%" r="220" fill="none" stroke="white" strokeWidth="1" strokeDasharray="4 8" />
             {activeCategory && (
               <motion.circle 
                 cx="50%" cy="50%" r="250" 
                 fill="none" stroke="#7000ff" strokeWidth="1" strokeDasharray="2 6" 
                 initial={{ opacity: 0, r: 200 }}
                 animate={{ opacity: 0.5, r: 250 }}
                 exit={{ opacity: 0 }}
               />
             )}
          </svg>
        </div>

        {/* Mobile Accordion View */}
        <div className="lg:hidden mt-12 flex flex-col gap-4">
          {categories.map((category) => (
            <div key={category} className="glass-panel rounded-2xl overflow-hidden border border-border">
              <button 
                className="w-full px-6 py-4 flex justify-between items-center text-left"
                onClick={() => setActiveCategory(activeCategory === category ? null : category)}
              >
                <span className="font-mono tracking-widest font-bold text-sm md:text-base">{category}</span>
                <span className={`transform transition-transform ${activeCategory === category ? 'rotate-180' : ''}`}>
                  ↓
                </span>
              </button>
              
              <AnimatePresence>
                {activeCategory === category && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-6"
                  >
                    <div className="flex flex-wrap gap-3 mt-2">
                      {skillsData[category].map(skill => (
                        <span key={skill} className="px-4 py-2 glass-panel rounded-full text-xs md:text-sm text-primary-dim shadow-none">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;

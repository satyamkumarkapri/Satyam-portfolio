import React from 'react';
import { motion } from 'framer-motion';
import SplitText from '../components/ui/SplitText';
import SectionHeader from '../components/ui/SectionHeader';

const Business: React.FC = () => {
  return (
    <section id="business" className="relative py-32 px-6 md:px-12 bg-transparent min-h-screen flex items-center justify-center border-b border-border/50 overflow-hidden">
      
      {/* Strategic design transition background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-graphite/20 to-background pointer-events-none" />

      <div className="container mx-auto relative z-10">
        
        <SectionHeader 
          number="06"
          category="BUSINESS"
          titleTop={<>BEYOND THE</>}
          titleBottom={<>CODE.</>}
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl md:text-3xl font-light text-primary leading-relaxed border-l-2 border-accent-violet pl-6 italic">
              "I believe powerful technology becomes truly impactful when combined with strong business understanding."
            </h3>
            
            <div className="space-y-6 text-lg text-primary-dim leading-relaxed glass-panel p-8 rounded-3xl hover:border-accent-violet/30 transition-colors">
              <p>
                Beyond engineering, I have a strong interest in business, entrepreneurship, and technology-driven growth.
              </p>
              <p>
                My goal is to understand both how intelligent systems are built and how ideas become scalable businesses.
              </p>
              <p>
                In the future, I plan to pursue an MBA, combine my engineering background with business strategy, contribute to the growth of my family's businesses, and explore technology-driven ventures.
              </p>
            </div>
          </motion.div>

          {/* Interactive Strategic Concepts Grid */}
          <div className="relative h-[400px] md:h-[500px] w-full flex items-center justify-center">
            
            {/* Center Impact Node */}
            <motion.div 
              className="absolute z-20 w-32 h-32 md:w-40 md:h-40 bg-gradient-to-r from-accent-violet via-accent-blue to-accent-magenta text-white rounded-full flex items-center justify-center shadow-glow-violet hover:shadow-glow-blue transition-shadow duration-500 cursor-default"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8, type: "spring" }}
            >
              <span className="text-xl font-display font-bold tracking-widest uppercase">Impact</span>
            </motion.div>

            {/* Connecting lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
              <motion.line x1="20%" y1="20%" x2="50%" y2="50%" stroke="#00f0ff" strokeOpacity="0.4" strokeWidth="1" strokeDasharray="4 4" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1, delay: 1 }} />
              <motion.line x1="80%" y1="20%" x2="50%" y2="50%" stroke="#7000ff" strokeOpacity="0.4" strokeWidth="1" strokeDasharray="4 4" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1, delay: 1 }} />
              <motion.line x1="20%" y1="80%" x2="50%" y2="50%" stroke="#ff0055" strokeOpacity="0.4" strokeWidth="1" strokeDasharray="4 4" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1, delay: 1 }} />
              <motion.line x1="80%" y1="80%" x2="50%" y2="50%" stroke="#00f0ff" strokeOpacity="0.4" strokeWidth="1" strokeDasharray="4 4" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1, delay: 1 }} />
            </svg>

            {/* 4 Corners */}
            {[
              { label: "INNOVATION", pos: "top-0 left-0 md:top-[10%] md:left-[10%]" },
              { label: "STRATEGY", pos: "top-0 right-0 md:top-[10%] md:right-[10%]" },
              { label: "TECHNOLOGY", pos: "bottom-0 left-0 md:bottom-[10%] md:left-[10%]" },
              { label: "GROWTH", pos: "bottom-0 right-0 md:bottom-[10%] md:right-[10%]" },
            ].map((node, i) => (
              <motion.div
                key={node.label}
                className={`absolute z-10 px-6 py-3 glass-panel rounded-full border border-border text-sm font-mono tracking-widest hover:border-accent-violet hover:text-white hover:shadow-glow-violet transition-all cursor-default ${node.pos}`}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 + (i * 0.1), type: "spring" }}
                whileHover={{ scale: 1.1 }}
              >
                {node.label}
              </motion.div>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
};

export default Business;

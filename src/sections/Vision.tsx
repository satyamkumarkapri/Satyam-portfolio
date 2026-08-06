import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SplitText from '../components/ui/SplitText';
import SectionHeader from '../components/ui/SectionHeader';
import SpotlightCard from '../components/ui/SpotlightCard';

const Vision: React.FC = () => {
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <section id="vision" className="relative py-32 bg-transparent min-h-screen overflow-hidden border-b border-border/50" ref={containerRef}>
      <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
        
          <SectionHeader 
            number="07"
            category="VISION"
            titleTop={<SplitText text="I'M BUILDING" className="text-5xl md:text-7xl font-display font-bold text-primary mb-6 tracking-tighter" />}
            titleBottom={<>TOWARD SOMETHING BIGGER.</>}
            align="center"
          />

        {/* Future Map - Path Visualization */}
        <div className="max-w-5xl mx-auto relative py-20 flex flex-col md:flex-row justify-between items-center gap-12 md:gap-4">
          
          {/* Paths wrapper */}
          <div className="w-full flex flex-col md:flex-row justify-between items-start gap-8 md:gap-4">
            
            {/* Path 1 */}
            <motion.div style={{ y: y1 }} className="w-full md:w-1/3 flex flex-col items-center gap-6">
              <SpotlightCard className="w-full rounded-2xl">
                <div className="w-full glass-panel p-8 rounded-2xl text-center">
                  <h4 className="text-accent-cyan font-mono tracking-widest text-xs mb-3">PATH 01</h4>
                  <p className="text-primary text-xl font-bold mb-4">Artificial Intelligence</p>
                  <div className="w-[1px] h-8 bg-gradient-to-b from-border to-transparent mx-auto my-3" />
                  <p className="text-primary-dim text-sm">Intelligent Systems</p>
                  <div className="w-[1px] h-8 bg-gradient-to-b from-transparent via-border to-transparent mx-auto my-3" />
                  <p className="text-primary-dim text-sm">Real-world Solutions</p>
                </div>
              </SpotlightCard>
            </motion.div>

            {/* Path 2 */}
            <motion.div className="w-full md:w-1/3 flex flex-col items-center gap-6 md:translate-y-12">
              <SpotlightCard className="w-full rounded-2xl">
                <div className="w-full glass-panel p-8 rounded-2xl text-center">
                  <h4 className="text-accent-blue font-mono tracking-widest text-xs mb-3">PATH 02</h4>
                  <p className="text-primary text-xl font-bold mb-4">Software Engineering</p>
                  <div className="w-[1px] h-8 bg-gradient-to-b from-border to-transparent mx-auto my-3" />
                  <p className="text-primary-dim text-sm">Scalable Products</p>
                  <div className="w-[1px] h-8 bg-gradient-to-b from-transparent via-border to-transparent mx-auto my-3" />
                  <p className="text-primary-dim text-sm">Digital Innovation</p>
                </div>
              </SpotlightCard>
            </motion.div>

            {/* Path 3 */}
            <motion.div style={{ y: y2 }} className="w-full md:w-1/3 flex flex-col items-center gap-6 md:-translate-y-12">
              <SpotlightCard className="w-full rounded-2xl">
                <div className="w-full glass-panel p-8 rounded-2xl text-center">
                  <h4 className="text-accent-violet font-mono tracking-widest text-xs mb-3">PATH 03</h4>
                  <p className="text-primary text-xl font-bold mb-4">Business</p>
                  <div className="w-[1px] h-8 bg-gradient-to-b from-border to-transparent mx-auto my-3" />
                  <p className="text-primary-dim text-sm">MBA Strategy</p>
                  <div className="w-[1px] h-8 bg-gradient-to-b from-transparent via-border to-transparent mx-auto my-3" />
                  <p className="text-primary-dim text-sm">Growth & Scale</p>
                </div>
              </SpotlightCard>
            </motion.div>

          </div>
        </div>

        {/* Convergence Point */}
        <motion.div 
          className="mt-32 max-w-4xl mx-auto flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-12 relative">
             <motion.div 
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full shadow-[0_0_20px_rgba(var(--foreground),0.5)]"
               animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
               transition={{ duration: 2, repeat: Infinity }}
             />
          </div>
          
          <h3 className="text-3xl md:text-5xl font-display font-bold text-primary mb-6 uppercase tracking-widest">
            TECHNOLOGY-DRIVEN VENTURES
          </h3>
          
          <p className="text-xl md:text-3xl font-light text-primary-dim italic max-w-3xl mb-12">
            "My vision is to combine technology, intelligence, and business knowledge to build solutions that create real value."
          </p>

          <div className="px-8 py-4 bg-surface border border-white/10 rounded-full inline-block text-primary font-bold tracking-widest text-sm shadow-glass backdrop-blur-md">
            MEANINGFUL IMPACT
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Vision;

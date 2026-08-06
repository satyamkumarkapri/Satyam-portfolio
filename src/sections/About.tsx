import React from 'react';
import { motion } from 'framer-motion';
import { personalData } from '../data/personal';
import TiltCard from '../components/ui/TiltCard';

const About: React.FC = () => {
  // Highlight helper
  const highlightText = (text: string) => {
    const highlights = [
      "Artificial Intelligence",
      "Machine Learning",
      "Business",
      "Entrepreneurship",
      "Technology-driven ventures"
    ];

    let result = text;
    highlights.forEach(phrase => {
      // Very basic highlighting logic, in a real scenario we'd parse components
      const regex = new RegExp(`(${phrase})`, 'gi');
      result = result.replace(regex, `<span class="text-primary font-medium relative group inline-block cursor-default">
        $1
        <span class="absolute -bottom-1 left-0 w-full h-[2px] bg-accent-cyan scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
      </span>`);
    });
    
    return <span dangerouslySetInnerHTML={{ __html: result }} />;
  };

  return (
    <section id="about" className="relative pt-32 pb-24 px-6 md:px-12 bg-transparent min-h-screen">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent-violet/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      
      <div className="container mx-auto max-w-7xl">
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-mono tracking-widest text-primary-dim uppercase">01 / ABOUT</span>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-start">
          
          {/* Left Column - Editorial Text, Quote & Profile */}
          <motion.div 
            className="w-full lg:w-5/12 flex flex-col gap-12 lg:sticky lg:top-32"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div>
              <h2 className="text-5xl md:text-7xl font-display font-bold leading-[0.9] tracking-tighter mb-8">
                BEYOND <br />
                <span className="text-accent-blue">THE CODE.</span>
              </h2>
              
              <p className="text-xl md:text-2xl font-light leading-relaxed text-primary-dim border-l-2 border-accent-blue pl-6 italic">
                "{personalData.shortBio}"
              </p>
            </div>

            {/* Profile Image Experience */}
            <motion.div 
              className="relative w-full max-w-md aspect-square md:aspect-auto md:h-[400px] mt-8 mx-auto lg:mx-0"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <TiltCard className="w-full h-full">
                {/* Animated Gradient Border */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-violet via-accent-blue to-accent-cyan rounded-[2rem] blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse-glow" />
                
                <div className="relative w-full h-full rounded-3xl overflow-hidden group border border-white/10 dark:border-white/5 shadow-2xl bg-surface">
                  {/* The actual profile image */}
                  <img 
                    src="/satyam.png" 
                    alt="Satyam Kumar Kapri"
                    className="absolute inset-0 z-20 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Fallback pattern if image is missing */}
                  <div className="hidden absolute inset-0 z-0 flex flex-col items-center justify-center text-primary-dim">
                    <div className="w-24 h-24 mb-4 border border-border rounded-full flex items-center justify-center bg-transparent/50 shadow-sm">
                      <span className="font-display font-bold text-2xl">SK</span>
                    </div>
                    <span className="font-mono text-xs tracking-widest font-semibold">ADD PROFILE IMAGE</span>
                  </div>

                  {/* Overlays on top of the image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent z-10 pointer-events-none" />
                  <div className="absolute inset-0 bg-accent-blue/10 mix-blend-overlay z-10 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />

                  {/* Scanning line effect */}
                  <div className="absolute inset-0 z-20 pointer-events-none opacity-20">
                    <div className="w-full h-[1px] bg-accent-cyan shadow-[0_0_15px_#00f0ff] animate-[scan_3s_ease-in-out_infinite]" />
                  </div>
                </div>

                {/* Floating Tags have been removed */}
              </TiltCard>
            </motion.div>
          </motion.div>

          {/* Right Column - Interactive Biography */}
          <div className="w-full lg:w-7/12 flex flex-col gap-12">
            
            <motion.div 
              className="glass-panel p-8 md:p-12 rounded-3xl relative overflow-hidden group w-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {/* Subtle hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div className="space-y-6 text-lg text-primary-dim leading-relaxed relative z-10">
                {personalData.longBio.split('\n\n').map((paragraph, idx) => (
                  <p key={idx}>{highlightText(paragraph)}</p>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes scan {
          0% { top: 0; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default About;

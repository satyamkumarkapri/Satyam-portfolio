import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import EducationCard from '../components/ui/EducationCard';

const timelineEvents = [
  {
    title: "FOUNDATION",
    description: "Started exploring programming, computer science, and problem-solving.",
  },
  {
    title: "ENGINEERING",
    description: "Pursuing B.Tech in Computer Science & Engineering at KL University.",
  },
  {
    title: "BUILDING",
    description: "Started developing practical projects using Java, Python, JavaScript, React, and modern development tools.",
  },
  {
    title: "INTELLIGENCE",
    description: "Exploring Artificial Intelligence, Machine Learning, search algorithms, and intelligent systems.",
  },
  {
    title: "BEYOND TECHNOLOGY",
    description: "Developing an interest in entrepreneurship, business strategy, and technology-driven growth.",
  },
  {
    title: "THE FUTURE",
    description: "MBA. Technology. Business. Intelligent ventures. Meaningful impact.",
    highlight: true
  }
];

const Journey: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="journey" className="relative py-32 px-6 md:px-12 bg-transparent min-h-screen" ref={containerRef}>
      <div className="container mx-auto">
        
        <motion.div 
          className="mb-24 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-mono tracking-widest text-primary-dim uppercase mb-6 block">02 / JOURNEY</span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight tracking-tighter max-w-4xl mx-auto">
            MY JOURNEY <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white/60 to-white/10">IS JUST GETTING STARTED.</span>
          </h2>
        </motion.div>

        <div className="relative max-w-4xl mx-auto mb-32">
          {/* Central Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-border -translate-x-1/2" />
          
          {/* Animated Line Progress */}
          <motion.div 
            className="absolute left-4 md:left-1/2 top-0 w-[2px] bg-gradient-to-b from-accent-cyan via-accent-blue to-accent-violet -translate-x-1/2"
            style={{ height: lineHeight }}
          />

          {timelineEvents.map((event, index) => (
            <div key={index} className="relative flex flex-col md:flex-row justify-between items-center mb-16 md:mb-24 last:mb-0 group">
              
              {/* Timeline Node */}
              <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-transparent border border-border -translate-x-1/2 z-10 transition-colors duration-500 group-hover:border-accent-cyan group-hover:shadow-[0_0_15px_rgba(0,240,255,0.5)]">
                <motion.div 
                  className="absolute inset-1 rounded-full bg-accent-cyan opacity-0"
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: false, margin: "-200px" }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              {/* Content (Alternating sides on desktop) */}
              <div className={`w-full pl-12 md:pl-0 md:w-5/12 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:order-last md:pl-12 md:text-left'}`}>
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className={`p-6 rounded-2xl transition-all duration-300 ${event.highlight ? 'glass-panel border-accent-blue/30' : 'hover:bg-surface'}`}
                >
                  <h4 className={`text-xl font-display font-bold mb-3 ${event.highlight ? 'text-accent-cyan' : 'text-primary'}`}>
                    {event.title}
                  </h4>
                  <p className="text-primary-dim leading-relaxed text-sm md:text-base">
                    {event.description}
                  </p>
                </motion.div>
              </div>
              
              {/* Spacer for the other side */}
              <div className="hidden md:block md:w-5/12" />
            </div>
          ))}
        </div>

        {/* Education Experience Integration */}
        <div className="max-w-5xl mx-auto mt-24">
          <EducationCard />
        </div>

      </div>
    </section>
  );
};

export default Journey;

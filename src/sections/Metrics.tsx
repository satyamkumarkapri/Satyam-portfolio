import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const AnimatedNumber = ({ value, duration = 2 }: { value: string | number; duration?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(typeof value === 'number' ? 0 : value);

  useEffect(() => {
    if (isInView && typeof value === 'number') {
      let startTime: number;
      const animate = (time: number) => {
        if (!startTime) startTime = time;
        const progress = (time - startTime) / (duration * 1000);
        
        if (progress < 1) {
          setDisplayValue(Math.floor(value * progress));
          requestAnimationFrame(animate);
        } else {
          setDisplayValue(value);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{displayValue}</span>;
};

const Metrics: React.FC = () => {
  const metrics = [
    { value: 12, suffix: "+", label: "PROJECTS BUILT" },
    { value: 10, suffix: "+", label: "TECHNOLOGIES EXPLORED" },
    { value: 3, suffix: "", label: "CORE INTEREST AREAS" },
    { value: "∞", suffix: "", label: "CURIOSITY", isString: true }
  ];

  return (
    <section className="relative py-24 px-6 md:px-12 bg-transparent z-10 border-b border-border/50">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-12">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              className="glass-panel rounded-2xl p-8 flex flex-col items-center justify-center text-center relative overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              {/* Depth lighting */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[40px] group-hover:bg-accent-blue/20 transition-colors duration-500" />
              
              <h3 className="text-5xl md:text-6xl font-display font-bold text-primary mb-2 tracking-tighter">
                {metric.isString ? (
                  metric.value
                ) : (
                  <AnimatedNumber value={metric.value as number} />
                )}
                {metric.suffix}
              </h3>
              <p className="text-xs md:text-sm font-mono tracking-widest text-primary-dim uppercase">
                {metric.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Metrics;

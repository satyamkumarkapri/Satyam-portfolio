import React from 'react';
import { motion } from 'framer-motion';
import { educationData } from '../../data/education';

const EducationCard: React.FC = () => {
  return (
    <motion.div
      className="glass-panel p-8 md:p-10 rounded-3xl relative overflow-hidden group"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
    >
      {/* Background digital grid effect */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
      
      {/* Light sweep */}
      <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 group-hover:left-[200%] transition-all duration-1000 ease-in-out pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-8">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 bg-accent-blue rounded-full shadow-[0_0_10px_rgba(0,82,255,0.8)]" />
            <h4 className="text-sm font-mono tracking-widest text-primary-dim uppercase">University Identity</h4>
          </div>
          
          <h3 className="text-3xl md:text-5xl font-display font-bold text-primary mb-2 uppercase tracking-tighter">
            {educationData.university}
          </h3>
          <p className="text-xl md:text-2xl text-accent-cyan font-light mb-1">
            {educationData.degree}
          </p>
          <p className="text-lg text-primary-dim mb-8">
            {educationData.major}
          </p>

          <div className="flex flex-wrap gap-6 mb-8">
            <div>
              <p className="text-xs font-mono tracking-widest text-primary-dim mb-1 uppercase">Class Of</p>
              <p className="text-primary font-medium">{educationData.currentYear}</p>
            </div>
            <div>
              <p className="text-xs font-mono tracking-widest text-primary-dim mb-1 uppercase">Status</p>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                <span className="text-primary font-medium">Currently Learning</span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-auto p-6 bg-background/50 rounded-2xl border border-border">
          <p className="text-xs font-mono tracking-widest text-primary-dim mb-4 uppercase">Academic Focus</p>
          <ul className="space-y-3">
            {educationData.focus.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-accent-blue mt-1">▹</span>
                <span className="text-sm text-primary-dim leading-tight">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default EducationCard;

import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  number?: string;
  category?: string;
  titleTop: React.ReactNode;
  titleBottom?: React.ReactNode;
  description?: string;
  accentColor?: 'blue' | 'cyan' | 'violet';
  align?: 'left' | 'center';
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  number,
  category,
  titleTop,
  titleBottom,
  description,
  accentColor = 'cyan',
  align = 'left',
  className = ''
}) => {
  const alignClass = align === 'center' ? 'text-center' : 'text-left';
  const flexClass = align === 'center' 
    ? 'flex-col items-center justify-center' 
    : 'flex-col md:flex-row md:items-end justify-between';

  const accentBorderMap = {
    blue: 'border-accent-blue',
    cyan: 'border-accent-cyan',
    violet: 'border-accent-violet'
  };

  return (
    <motion.div 
      className={`mb-12 ${alignClass} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      {(number || category) && (
        <span className="text-sm font-mono tracking-widest text-primary-dim uppercase mb-6 block">
          {number && `${number} / `}{category}
        </span>
      )}
      
      <div className={`flex gap-8 ${flexClass}`}>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-[0.9] tracking-tighter relative inline-block">
          {titleTop}
          {titleBottom && (
            <>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-violet via-accent-blue to-accent-magenta drop-shadow-sm">
                {titleBottom}
              </span>
            </>
          )}
          {/* Animated Glow Line beneath the title */}
          <motion.div 
            className={`absolute -bottom-4 ${align === 'center' ? 'left-1/2 -translate-x-1/2' : 'left-0'} h-[2px] bg-gradient-to-r from-accent-violet via-accent-blue to-accent-magenta rounded-full`}
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: '80px', opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          />
        </h2>
        
        {description && (
          <p className={`text-primary-dim text-lg italic border-l-2 ${accentBorderMap[accentColor]} pl-4 ${align === 'center' ? 'max-w-2xl mt-6' : ''}`}>
            "{description}"
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default SectionHeader;

import React from 'react';


const items = [
  "AI", "MACHINE LEARNING", "FULL STACK", "JAVA", "PYTHON", "REACT", "BUSINESS", "ENTREPRENEURSHIP", "INTELLIGENT SYSTEMS"
];

const IdentityStrip: React.FC = () => {
  return (
    <div className="relative py-10 overflow-hidden border-y border-white/10 bg-black/20 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.5)]">
      {/* Subtle glass reflection & Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent-violet/10 via-transparent to-accent-cyan/10 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
      
      <div className="flex whitespace-nowrap group">
        {/* Double the items to create seamless loop */}
        <div className="animate-marquee group-hover:[animation-play-state:paused] flex items-center">
          {[...items, ...items, ...items].map((item, index) => (
            <React.Fragment key={index}>
              <span className="text-4xl md:text-6xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 uppercase px-8 transition-all duration-300 hover:text-white hover:text-glow cursor-default">
                {item}
              </span>
              <span className="text-accent-cyan opacity-80 px-2 drop-shadow-[0_0_10px_rgba(0,240,255,0.8)]">✦</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IdentityStrip;

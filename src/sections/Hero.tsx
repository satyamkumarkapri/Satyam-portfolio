import React from 'react';
import { motion } from 'framer-motion';
import { personalData } from '../data/personal';
import Magnetic from '../components/ui/Magnetic';
import SplitText from '../components/ui/SplitText';
import { Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import profilePic from '../assets/satyam.png';

const Hero: React.FC = () => {
  const [currentRoleIndex, setCurrentRoleIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % personalData.roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative w-full h-screen flex flex-col justify-center overflow-hidden">
      {/* Massive Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        <h1 className="text-[20vw] font-display font-bold text-primary opacity-5 whitespace-nowrap select-none">
          {personalData.firstName.toUpperCase()}
        </h1>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 pt-20">
        <div className="flex flex-col lg:flex-row items-center lg:items-center justify-between gap-12 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex-1 w-full"
          >
            <p className="text-accent-cyan font-mono text-sm md:text-base tracking-widest mb-6 opacity-80">
              HELLO, WORLD. I'M
            </p>

            <h1 className="text-[12vw] sm:text-6xl md:text-8xl lg:text-9xl font-display font-bold leading-[0.85] tracking-tighter mb-10 flex flex-col">
              <SplitText 
                text={personalData.firstName.toUpperCase()}
                className="text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-white/30 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" 
                delay={0}
                splitBy="char"
              />
              <SplitText 
                text={personalData.lastName.toUpperCase()}
                className="text-transparent bg-clip-text bg-gradient-to-r from-accent-violet via-accent-cyan to-accent-blue drop-shadow-[0_0_15px_rgba(0,240,255,0.2)] mt-2" 
                delay={0.2}
                splitBy="char"
              />
            </h1>

            <div className="flex items-center gap-4 mb-10 text-xl md:text-2xl font-light bg-white/5 inline-flex px-6 py-3 rounded-full border border-white/10 backdrop-blur-md">
              <span className="text-primary-dim tracking-widest text-sm md:text-base font-mono">I BUILD</span>
              <div className="relative h-[1.2em] overflow-hidden w-[160px] sm:w-[200px] md:w-[300px]">
                <motion.div
                  key={currentRoleIndex}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -40, opacity: 0 }}
                  transition={{ duration: 0.5, type: "spring" }}
                  className="absolute inset-0 font-medium text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-white tracking-wide"
                >
                  {personalData.roles[currentRoleIndex]}
                </motion.div>
              </div>
            </div>

            <p className="max-w-2xl text-primary-dim/80 text-lg md:text-xl leading-relaxed mb-12 font-light">
              {personalData.headline}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 mt-4">
              <a 
                href="#projects"
                data-cursor-text="EXPLORE"
                className="relative group px-8 py-4 bg-background text-white font-bold rounded-full shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all transform hover:scale-105 overflow-hidden w-full sm:w-auto text-center"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-accent-violet via-accent-cyan to-accent-blue opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-[2px] bg-background rounded-full transition-all group-hover:bg-background/80" />
                <span className="relative z-10 flex items-center justify-center tracking-wider text-sm">EXPLORE MY WORK</span>
              </a>
              <a 
                href="#contact"
                className="px-8 py-4 glass-panel text-primary font-medium rounded-full transition-all transform hover:scale-105 tracking-wider text-sm w-full sm:w-auto text-center"
              >
                LET'S CONNECT
              </a>
            </div>

            <div className="mt-16 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="flex items-center gap-3 px-5 py-2 glass-panel border-white/20 rounded-full shadow-glass">
                <div className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-cyan opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-cyan shadow-[0_0_10px_#00f0ff]"></span>
                </div>
                <span className="text-xs font-mono tracking-widest text-primary font-medium">
                  {personalData.availabilityStatus}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <Magnetic>
                  <a href={personalData.socials.github} target="_blank" rel="noreferrer" className="text-primary-dim hover:text-primary transition-colors p-2">
                    <FaGithub size={20} />
                  </a>
                </Magnetic>
                <Magnetic>
                  <a href={personalData.socials.linkedin} target="_blank" rel="noreferrer" className="text-primary-dim hover:text-primary transition-colors p-2">
                    <FaLinkedin size={20} />
                  </a>
                </Magnetic>
                <Magnetic>
                  <a href={`mailto:${personalData.email}`} className="text-primary-dim hover:text-primary transition-colors p-2">
                    <Mail size={20} />
                  </a>
                </Magnetic>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex-shrink-0 w-full max-w-sm sm:max-w-md lg:w-[400px] xl:w-[480px] mt-12 lg:mt-0 mx-auto lg:mx-0"
          >
            <div className="relative w-full aspect-square lg:aspect-[4/5] rounded-[32px] overflow-hidden p-[3px] bg-gradient-to-br from-accent-violet via-accent-cyan to-[#00ff88] shadow-[0_0_40px_rgba(0,240,255,0.2)] group hover:shadow-[0_0_60px_rgba(0,240,255,0.4)] transition-shadow duration-500">
              <div className="absolute inset-0 bg-background rounded-[30px]" />
              
              {/* Profile Image */}
              <img 
                src={profilePic}
                alt="Satyam Kumar Kapri" 
                className="relative z-10 w-full h-full object-cover object-top rounded-[29px] transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Subtle overlay on the image */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent z-20 pointer-events-none rounded-[29px]" />
              <div className="absolute inset-0 bg-accent-blue/5 mix-blend-overlay z-20 group-hover:bg-transparent transition-colors duration-500 pointer-events-none rounded-[29px]" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <span className="text-[10px] font-mono tracking-widest text-primary-dim uppercase">Scroll to explore</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/20 to-transparent relative overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 w-full h-1/2 bg-primary"
            animate={{ top: ['-50%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;

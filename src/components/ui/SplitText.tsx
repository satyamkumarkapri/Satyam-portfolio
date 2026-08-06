import React from 'react';
import { motion } from 'framer-motion';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  splitBy?: 'word' | 'char';
}

const SplitText: React.FC<SplitTextProps> = ({ text, className = "", delay = 0, splitBy = 'word' }) => {
  const elements = splitBy === 'word' ? text.split(" ") : text.split("");

  const container = {
    hidden: { opacity: 0 },
    visible: (i: number = 1) => ({
      opacity: 1,
      transition: { staggerChildren: splitBy === 'char' ? 0.03 : 0.1, delayChildren: delay * i },
    }),
  };

  const child: any = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      className={`flex flex-wrap ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {elements.map((element, index) => (
        <motion.span
          variants={child}
          className={`${splitBy === 'word' ? 'mr-[0.25em]' : ''} pb-1`}
          key={index}
        >
          {element === " " ? "\u00A0" : element}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default SplitText;

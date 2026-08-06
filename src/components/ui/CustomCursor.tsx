import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if device supports hover
    const matchMedia = window.matchMedia('(pointer:fine)');
    if (!matchMedia.matches) return;

    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check if hovering over clickable elements
      if (
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button'
      ) {
        setIsPointer(true);
        
        // Custom text based on data attribute
        const text = target.getAttribute('data-cursor-text');
        if (text) {
          setCursorText(text);
        } else {
          setCursorText("");
        }
      } else {
        setIsPointer(false);
        setCursorText("");
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[9999] bg-accent-cyan shadow-[0_0_15px_#22d3ee]"
        animate={{
          x: position.x - 8,
          y: position.y - 8,
          scale: isPointer && !cursorText ? 0.5 : 1,
          opacity: cursorText ? 0 : 1
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
      />
      
      {/* Outer trailing ring / Text container */}
      <motion.div
        className="fixed top-0 left-0 flex items-center justify-center rounded-full pointer-events-none z-[9998]"
        style={{
          width: 60,
          height: 60,
          backgroundColor: cursorText ? 'rgba(34, 211, 238, 0.15)' : 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(2px)',
          border: cursorText ? '1px solid rgba(34,211,238,0.8)' : '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: cursorText ? '0 0 20px rgba(34,211,238,0.4)' : '0 0 15px rgba(0,0,0,0.1)',
        }}
        animate={{
          x: position.x - 30,
          y: position.y - 30,
          scale: cursorText ? 1.5 : (isPointer ? 1.2 : 1),
          opacity: 1
        }}
        transition={{ type: "spring", stiffness: 120, damping: 20, mass: 0.6 }}
      >
        <span className="text-[10px] font-bold tracking-widest text-accent-cyan whitespace-nowrap drop-shadow-md">
          {cursorText}
        </span>
      </motion.div>
    </>
  );
};

export default CustomCursor;

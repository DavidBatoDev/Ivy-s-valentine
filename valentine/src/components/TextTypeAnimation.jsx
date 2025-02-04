import React from 'react';
import { motion } from 'framer-motion';

const TextTypeAnimation = ({ text, className }) => {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        delayChildren: 0.3, 
        staggerChildren: 0.05 
      }
    }
  };

  const letter = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'tween', damping: 12, stiffness: 200 }
    }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className={`text-center text-2xl font-bold font-secondary ${className}`}
    >
      {text.split("").map((char, index) => (
        <motion.span key={index} variants={letter}>
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default TextTypeAnimation;
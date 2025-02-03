import React from 'react';
import { motion } from 'framer-motion';

const BottomToCenterAnimation = ({ 
    noCloseButton = true,
  children, 
  onClose, 
  isOpen = true, 
  className = '' 
}) => {
  if (!isOpen) return null;

  return (
    <div className='absolute h-screen w-screen'>
        <div className='flex justify-center items-center h-full w-full'>
            <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ 
                type: 'tween', 
                stiffness: 120, 
                damping: 10,
                duration: 0.8
            }}
            className={`rounded-lg flex items-center justify-center text-white ${className}`}
            >
            {!noCloseButton && (
                <button 
                onClick={onClose} 
                className="absolute top-2 right-2 text-white hover:text-gray-200"
                >
                ✕
                </button>
            )}
            {children}
            </motion.div>
        </div>
    </div>


  );
};

export default BottomToCenterAnimation;
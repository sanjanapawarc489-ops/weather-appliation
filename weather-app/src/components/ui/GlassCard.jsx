import React from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({ 
  children, 
  className = '', 
  hover = true, 
  onClick,
  ...props 
}) => {
  const baseClasses = 'glass-card';
  const hoverClasses = hover ? 'hover:scale-105 hover:shadow-2xl' : '';
  const clickableClasses = onClick ? 'cursor-pointer' : '';
  
  return (
    <motion.div
      className={`${baseClasses} ${hoverClasses} ${clickableClasses} ${className}`}
      whileHover={hover ? { y: -2 } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
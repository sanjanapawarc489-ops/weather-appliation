import React from 'react';
import { motion } from 'framer-motion';

const GlassButton = ({ 
  children, 
  className = '', 
  variant = 'primary', 
  size = 'md',
  disabled = false,
  onClick,
  ...props 
}) => {
  const baseClasses = 'glass-button font-medium transition-all duration-300';
  
  const variantClasses = {
    primary: 'bg-purple-500/20 text-purple-100 hover:bg-purple-500/30 hover:text-white',
    secondary: 'bg-white/10 text-white hover:bg-white/20',
    danger: 'bg-red-500/20 text-red-100 hover:bg-red-500/30 hover:text-white',
    success: 'bg-green-500/20 text-green-100 hover:bg-green-500/30 hover:text-white'
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };
  
  const disabledClasses = disabled 
    ? 'opacity-50 cursor-not-allowed hover:scale-100' 
    : 'hover:scale-105 active:scale-95';
  
  return (
    <motion.button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`}
      whileHover={!disabled ? { y: -1 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default GlassButton;
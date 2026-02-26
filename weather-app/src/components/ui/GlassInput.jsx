import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';

const GlassInput = forwardRef(({ 
  className = '', 
  placeholder = '',
  type = 'text',
  disabled = false,
  error = false,
  icon: Icon,
  onIconClick,
  ...props 
}, ref) => {
  const baseClasses = 'glass-input transition-all duration-300';
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';
  const errorClasses = error ? 'border-red-400 focus:ring-red-400' : '';
  
  return (
    <div className="relative">
      <motion.input
        ref={ref}
        type={type}
        className={`${baseClasses} ${disabledClasses} ${errorClasses} ${className}`}
        placeholder={placeholder}
        disabled={disabled}
        whileFocus={{ scale: 1.02 }}
        {...props}
      />
      {Icon && (
        <motion.div
          className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-300 hover:text-white"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onIconClick}
        >
          <Icon className="w-5 h-5" />
        </motion.div>
      )}
    </div>
  );
});

GlassInput.displayName = 'GlassInput';

export default GlassInput;
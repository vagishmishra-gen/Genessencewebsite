import React from 'react';
import { cn } from '../../utils/cn';

const TealDot = ({ 
  className, 
  size = 'default',
  animated = false,
  ...props 
}) => {
  const sizeClasses = {
    sm: 'w-2 h-2',
    default: 'w-2 h-2', // 8px = 2 * 4px (Tailwind's default spacing)
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  };

  return (
    <div
      className={cn(
        'bg-teal-500 rounded-full',
        sizeClasses[size],
        animated && 'animate-pulse',
        className
      )}
      {...props}
    />
  );
};

export default TealDot;

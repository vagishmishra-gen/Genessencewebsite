import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { cn } from '../../utils/cn';

const Logo = ({ 
  size = 'md', 
  className = '', 
  onClick = null,
  showText = true,
  animated = false 
}) => {
  const { theme } = useTheme();
  
  const sizeClasses = {
    sm: 'h-10 w-auto',
    md: 'h-12 w-auto', 
    lg: 'h-16 w-auto',
    xl: 'h-20 w-auto'
  };

  const textSizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl'
  };

  const logoPath = theme === 'dark' ? '/dark.svg' : '/light.svg';
  
  const LogoElement = (
    <div className={cn('flex items-center space-x-3 group transition-fast hover:opacity-80', className)}>
      <img
        src={logoPath}
        alt="Genessence Logo"
        className={cn(
          sizeClasses[size],
          'transition-all duration-300',
          animated && 'group-hover:scale-105',
          'scale-[3.5]'
        )}
        onError={(e) => {
          // Fallback to icon if logo fails to load
          e.target.style.display = 'none';
          e.target.nextSibling.style.display = 'flex';
        }}
      />
      <div 
        className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center hidden"
        style={{ display: 'none' }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
        </svg>
      </div>
      {showText && (
        <span className={cn('font-headline text-foreground', textSizeClasses[size])}>
          <span className={theme === 'dark' ? 'text-[#00d1ff]' : 'text-[#004aad]'}>Gen</span>essence
        </span>
      )}
    </div>
  );

  if (onClick) {
    return (
      <button onClick={onClick} className="focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-lg">
        {LogoElement}
      </button>
    );
  }

  return LogoElement;
};

export default Logo;

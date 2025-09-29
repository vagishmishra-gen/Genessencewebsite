import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import Icon from '../AppIcon';
import { cn } from '../../utils/cn';

const ThemeToggle = ({ className, ...props }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/10 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        className
      )}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      {...props}
    >
      <div className="relative w-6 h-6 flex items-center justify-center">
        {/* Sun Icon (shown in dark mode) */}
        <Icon
          name="Sun"
          size={20}
          className={cn(
            'absolute transition-all duration-300 transform',
            isDark 
              ? 'opacity-100 rotate-0 scale-100' 
              : 'opacity-0 rotate-90 scale-75'
          )}
        />
        {/* Moon Icon (shown in light mode) */}
        <Icon
          name="Moon"
          size={20}
          className={cn(
            'absolute transition-all duration-300 transform',
            !isDark 
              ? 'opacity-100 rotate-0 scale-100' 
              : 'opacity-0 -rotate-90 scale-75'
          )}
        />
      </div>
      
      {/* Hover effect ring */}
      <div className="absolute inset-0 rounded-lg ring-0 group-hover:ring-2 group-hover:ring-primary/20 transition-all duration-300" />
    </button>
  );
};

export default ThemeToggle;

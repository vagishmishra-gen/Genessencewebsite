import React, { useState, useEffect } from 'react';

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const calculateScrollProgress = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement?.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScrollProgress(Math.min(scrollPercent, 100));
    };

    const throttledScrollHandler = () => {
      requestAnimationFrame(calculateScrollProgress);
    };

    window.addEventListener('scroll', throttledScrollHandler);
    calculateScrollProgress(); // Initial calculation

    return () => {
      window.removeEventListener('scroll', throttledScrollHandler);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-navigation pointer-events-none">
      <div className="h-1 bg-muted/20">
        <div 
          className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </div>
  );
};

export default ScrollProgress;
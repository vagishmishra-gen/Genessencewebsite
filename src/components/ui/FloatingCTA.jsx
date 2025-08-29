import React, { useState, useEffect } from 'react';
import Button from './Button';

const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const heroHeight = window.innerHeight * 0.8; // Show after hero section
      const contactSection = document.getElementById('contact');
      
      if (contactSection) {
        const contactTop = contactSection?.offsetTop - window.innerHeight;
        setIsVisible(scrollTop > heroHeight && scrollTop < contactTop);
      } else {
        setIsVisible(scrollTop > heroHeight);
      }
    };

    const throttledScrollHandler = () => {
      requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', throttledScrollHandler);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', throttledScrollHandler);
    };
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      const headerHeight = 80;
      const elementPosition = element?.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-floating">
      <div className="relative">
        {/* Pulse animation ring */}
        <div className={`absolute inset-0 rounded-full bg-primary/20 animate-ping ${isHovered ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`} />
        
        {/* Main CTA Button */}
        <Button
          variant="default"
          size="lg"
          onClick={scrollToContact}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`
            relative cta-shadow font-cta text-base px-6 py-3
            transform transition-all duration-300 ease-out
            ${isHovered ? 'scale-105 shadow-xl' : 'scale-100'}
            hover:shadow-[0_8px_30px_rgba(0,123,255,0.3)]
            active:scale-95
          `}
          iconName="MessageCircle"
          iconPosition="left"
          iconSize={20}
        >
          Get AI Strategy
        </Button>

        {/* Mobile version - repositioned */}
        <div className="sm:hidden absolute -top-16 left-1/2 transform -translate-x-1/2">
          <div className={`
            bg-card/90 backdrop-blur-sm border border-border rounded-lg px-3 py-2 text-xs text-muted-foreground
            transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
          `}>
            Free consultation
          </div>
        </div>

        {/* Desktop tooltip */}
        <div className="hidden sm:block absolute right-full top-1/2 transform -translate-y-1/2 mr-4">
          <div className={`
            bg-card/90 backdrop-blur-sm border border-border rounded-lg px-4 py-2 text-sm text-muted-foreground whitespace-nowrap
            transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'}
          `}>
            Start your AI transformation today
            <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-border border-y-4 border-y-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingCTA;
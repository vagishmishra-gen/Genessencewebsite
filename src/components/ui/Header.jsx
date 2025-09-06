import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import SlidingCTA from './SlidingCTA';
import TealDot from './TealDot';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('services');

  const navigationItems = [
    { label: 'Services', anchor: 'services', description: 'AI automation solutions' },
    { label: 'Process', anchor: 'process', description: 'Implementation methodology' },
    { label: 'Results', anchor: 'results', description: 'Proven ROI metrics' },
    { label: 'Team', anchor: 'team', description: 'Expert credentials' },
    { label: 'Contact', anchor: 'lead-capture', description: 'Get started today' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -80% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries?.forEach((entry) => {
        if (entry?.isIntersecting) {
          setActiveSection(entry?.target?.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    navigationItems?.forEach(item => {
      const element = document.getElementById(item?.anchor);
      if (element) observer?.observe(element);
    });

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer?.disconnect();
    };
  }, []);

  const scrollToSection = (anchor) => {
    const element = document.getElementById(anchor);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element?.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header 
        className={`sticky top-0 z-navigation transition-all duration-300 ${
          isScrolled ? 'glassmorphism border-b border-border' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <button
                onClick={() => scrollToSection('hero')}
                className="flex items-center space-x-3 group transition-fast hover:opacity-80"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Icon name="Zap" size={24} color="white" strokeWidth={2.5} />
                </div>
                <span className="text-2xl font-headline text-foreground">
                  Genessence
                </span>
                <TealDot className="ml-2" animated />
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigationItems?.map((item) => (
                <button
                  key={item?.anchor}
                  onClick={() => scrollToSection(item?.anchor)}
                  className={`relative px-4 py-2 text-sm font-medium transition-fast group ${
                    activeSection === item?.anchor
                      ? 'text-primary' :'text-muted-foreground hover:text-foreground'
                  }`}
                  title={item?.description}
                >
                  {item?.label}
                  {activeSection === item?.anchor && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                  )}
                </button>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center space-x-4">
              <ThemeToggle />
              <Button
                variant="outline"
                size="sm"
                onClick={() => scrollToSection('lead-capture')}
                className="border-primary/20 text-primary hover:text-secondary hover:bg-primary/10 hover:border-primary/30 transition-all duration-300"
              >
                Get Quote
              </Button>
              <div className="hidden xl:block">
                <SlidingCTA label="Start Project" onClick={() => scrollToSection('lead-capture')} size="md" />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/10 transition-fast"
              aria-label="Toggle mobile menu"
            >
              <Icon 
                name={isMobileMenuOpen ? "X" : "Menu"} 
                size={24} 
                strokeWidth={2} 
              />
            </button>
          </div>
        </div>
      </header>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-overlay lg:hidden">
          <div 
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
            onClick={toggleMobileMenu}
          />
          <div className="relative bg-card border-r border-border w-full max-w-sm h-full shadow-xl">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Icon name="Zap" size={20} color="white" strokeWidth={2.5} />
                </div>
                <span className="text-xl font-headline text-foreground">
                  Genessence
                </span>
              </div>
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/10 transition-fast"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
            
            <nav className="p-6 space-y-2">
              {navigationItems?.map((item) => (
                <button
                  key={item?.anchor}
                  onClick={() => scrollToSection(item?.anchor)}
                  className={`w-full flex items-center justify-between p-4 rounded-lg text-left transition-fast ${
                    activeSection === item?.anchor
                      ? 'bg-primary/10 text-primary border border-primary/20' :'text-muted-foreground hover:text-foreground hover:bg-muted/10'
                  }`}
                >
                  <div>
                    <div className="font-medium">{item?.label}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {item?.description}
                    </div>
                  </div>
                  <Icon name="ChevronRight" size={16} />
                </button>
              ))}
            </nav>

            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-border bg-card/50">
              <div className="space-y-3">
                <div className="flex items-center justify-center">
                  <ThemeToggle />
                </div>
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => scrollToSection('lead-capture')}
                  className="border-primary/20 text-primary hover:text-secondary hover:bg-primary/10 hover:border-primary/30 transition-all duration-300"
                >
                  Get Quote
                </Button>
                <Button
                  variant="default"
                  fullWidth
                  onClick={() => scrollToSection('lead-capture')}
                  className="cta-shadow font-cta"
                  iconName="ArrowRight"
                  iconPosition="right"
                  iconSize={16}
                >
                  Start Project
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
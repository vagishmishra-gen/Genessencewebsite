import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import SlidingCTA from './SlidingCTA';
import TealDot from './TealDot';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';
import useSmartNavigation from '../../hooks/useSmartNavigation';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('services');
  const location = useLocation();
  
  const {
    navigateToSection,
    navigateToPage,
    handleLogoClick,
    handleStartProject,
    isLandingPage
  } = useSmartNavigation();

  const navigationItems = [
    { label: 'Services', id: 'services', type: 'section', description: 'AI automation solutions' },
    { label: 'Process', id: 'process', type: 'section', description: 'Implementation methodology' },
    { label: 'Results', id: 'results', type: 'section', description: 'Proven ROI metrics' },
    { label: 'Team', id: 'team', type: 'section', description: 'Expert credentials' },
    { label: 'Contact', id: 'lead-capture', type: 'section', description: 'Get started today' },
    { label: 'Case Studies', path: '/case-studies', type: 'page', description: 'Success stories and insights' },
    { label: 'Blog', path: '/blog', type: 'page', description: 'AI insights and industry updates' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Section observer for landing page only
  useEffect(() => {
    if (!isLandingPage) return;

    const sections = ['services', 'process', 'results', 'team', 'lead-capture'];
    const observers = sections.map(sectionId => {
      const element = document.getElementById(sectionId);
      if (!element) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(sectionId);
          }
        },
        { threshold: 0.3, rootMargin: '-50px 0px' }
      );

      observer.observe(element);
      return observer;
    });

    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, [isLandingPage]);

  const handleNavigation = (item) => {
    if (item.type === 'section') {
      navigateToSection(item.id);
    } else if (item.type === 'page') {
      navigateToPage(item.path);
    }
    setIsMobileMenuOpen(false);
  };

  const getActiveState = (item) => {
    if (item.type === 'page') {
      return location.pathname === item.path;
    } else if (item.type === 'section' && isLandingPage) {
      return activeSection === item.id;
    }
    return false;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header 
        className={`sticky top-0 z-navigation transition-all duration-300 ${
          isScrolled ? 'bg-white/95 dark:glassmorphism border-b border-border' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 -ml-12 lg:-ml-16">
              <Logo 
                size="md" 
                onClick={handleLogoClick}
                animated={false}
                className="hover:opacity-80"
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8 flex-1 justify-center">
              {navigationItems?.map((item) => (
                item.type === 'page' ? (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    className={`relative px-4 py-2 text-sm font-medium whitespace-nowrap transition-fast group ${
                      getActiveState(item)
                        ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                    }`}
                    title={item?.description}
                  >
                    {item?.label}
                    {getActiveState(item) && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                    )}
                  </Link>
                ) : (
                  <button
                    key={item?.id}
                    onClick={() => handleNavigation(item)}
                    className={`relative px-4 py-2 text-sm font-medium whitespace-nowrap transition-fast group ${
                      getActiveState(item)
                        ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                    }`}
                    title={item?.description}
                  >
                    {item?.label}
                    {getActiveState(item) && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                    )}
                  </button>
                )
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center space-x-6">
              <ThemeToggle />
              <div className="hidden xl:block min-w-48">
                <SlidingCTA label="Start Project" onClick={handleStartProject} size="md" className="w-full" />
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
              <Logo size="sm" showText={true} />
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/10 transition-fast"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
            
            <nav className="p-6 space-y-2">
              {navigationItems?.map((item) => (
                item.type === 'page' ? (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    className={`w-full flex items-center justify-between p-4 rounded-lg text-left transition-fast ${
                      getActiveState(item)
                        ? 'bg-primary/10 text-primary border border-primary/20' : 'text-muted-foreground hover:text-foreground hover:bg-muted/10'
                    }`}
                  >
                    <div>
                      <div className="font-medium">{item?.label}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {item?.description}
                      </div>
                    </div>
                    <Icon name="ChevronRight" size={16} />
                  </Link>
                ) : (
                  <button
                    key={item?.id}
                    onClick={() => handleNavigation(item)}
                    className={`w-full flex items-center justify-between p-4 rounded-lg text-left transition-fast ${
                      getActiveState(item)
                        ? 'bg-primary/10 text-primary border border-primary/20' : 'text-muted-foreground hover:text-foreground hover:bg-muted/10'
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
                )
              ))}
            </nav>

            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-border bg-card/50">
              <div className="space-y-3">
                <div className="flex items-center justify-center">
                  <ThemeToggle />
                </div>
                <Button
                  variant="default"
                  fullWidth
                  onClick={handleStartProject}
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
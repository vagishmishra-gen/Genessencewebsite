import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import HeroParticles from './HeroParticles';
import SlidingCTA from '../../../components/ui/SlidingCTA';

const HeroSection = () => {
  const [currentMetric, setCurrentMetric] = useState(0);
  const [particles, setParticles] = useState([]);

  const metrics = [
    { value: "300%", label: "Average ROI" },
    { value: "85%", label: "Process Efficiency" },
    { value: "4+", label: "Enterprise Clients" },
    { value: "95%", label: "Client Satisfaction" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMetric((prev) => (prev + 1) % metrics?.length);
    }, 3000);

    // Generate particles
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 10
    }));
    setParticles(newParticles);

    return () => clearInterval(interval);
  }, []);

  const scrollToAssessment = () => {
    const element = document.getElementById('lead-capture');
    if (element) {
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToResults = () => {
    const element = document.getElementById('results');
    if (element) {
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Background Layers */}
      <div className="absolute inset-0">
        {/* <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/10" /> */}
      </div>
      {/* WebGL Particles */}
      <HeroParticles intensity={1} />
      {/* Overlay to hide stray white square */}
      <div className="absolute left-1/2 top-1/2 w-6 h-6 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none bg-white dark:bg-[#0a0a0a] z-10" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Main Headline */}
          <div className="space-y-4">
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-headline-bold text-foreground leading-tight break-words px-2 max-w-[90vw] mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Fuel Your Growth With{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Genessence
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-base sm:text-lg md:text-2xl text-muted-foreground max-w-[90vw] sm:max-w-3xl mx-auto leading-relaxed break-words px-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Transform Traditional Operations Into Intelligent Systems That Deliver{' '}
              <span className="text-primary font-semibold">Proven ROI</span>
            </motion.p>
          </div>

          {/* Animated Metrics */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center justify-center space-x-2 text-secondary"
          >
            <Icon name="TrendingUp" size={24} />
            <span className="text-2xl font-bold">
              {metrics?.[currentMetric]?.value}
            </span>
            <span className="text-muted-foreground">
              {metrics?.[currentMetric]?.label}
            </span>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
          >
            <SlidingCTA label="Get Free AI Assessment" onClick={scrollToAssessment} size="lg" />
            
            <Button
              variant="outline"
              size="xl"
              onClick={scrollToResults}
              className="border-primary/30 text-primary hover:bg-primary/10 text-lg px-8 py-4"
              iconName="PlayCircle"
              iconPosition="left"
              iconSize={20}
            >
              View Success Stories
            </Button>
          </motion.div>

          {/* Trust Indicator - Company logos in motion */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="pt-12"
          >
            <p className="text-sm text-muted-foreground mb-4">
              Trusted by 4+ companies worldwide
            </p>
            <div className="relative overflow-hidden">
              <div className="flex items-center gap-12 md:gap-16 animate-marquee shrink-0">
                {[
                  '/assets/images/amber.png',
                  '/assets/images/autoliv.png',
                  '/assets/images/camana.png',
                  '/assets/images/iljin.png',
                  '/assets/images/mars.png',
                  '/assets/images/picl.png',
                  '/assets/images/power-one.png',
                  '/assets/images/sidwal.png',
                ]
                  .concat([
                    '/assets/images/amber.png',
                    '/assets/images/autoliv.png',
                    '/assets/images/camana.png',
                    '/assets/images/iljin.png',
                    '/assets/images/mars.png',
                    '/assets/images/picl.png',
                    '/assets/images/power-one.png',
                    '/assets/images/sidwal.png',
                  ])
                  ?.map((src, index) => (
                    <div
                      key={`${src}-${index}`}
                      className="flex items-center justify-center shrink-0"
                    >
                      <img
                        src={src}
                        alt="Company logo"
                        className="h-8 md:h-10 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
                      />
                    </div>
                  ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center space-y-2 text-muted-foreground"
        >
          <span className="text-sm">Scroll to explore</span>
          <Icon name="ChevronDown" size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
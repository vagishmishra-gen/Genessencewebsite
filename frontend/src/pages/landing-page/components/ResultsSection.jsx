import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';


const ResultsSection = () => {
  const [animatedStats, setAnimatedStats] = useState({
    roi: 0,
    efficiency: 0,
    satisfaction: 0,
    clients: 0
  });

  const finalStats = {
    roi: 300,
    efficiency: 85,
    satisfaction: 95,
    clients: 4
  };



  useEffect(() => {
    const animateStats = () => {
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const interval = setInterval(() => {
        const progress = currentStep / steps;
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);

        setAnimatedStats({
          roi: Math.round(finalStats?.roi * easeOutQuart),
          efficiency: Math.round(finalStats?.efficiency * easeOutQuart),
          satisfaction: Math.round(finalStats?.satisfaction * easeOutQuart),
          clients: Math.round(finalStats?.clients * easeOutQuart)
        });

        currentStep++;
        if (currentStep > steps) {
          clearInterval(interval);
        }
      }, stepDuration);

      return () => clearInterval(interval);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateStats();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById('results-stats');
    if (element) {
      observer?.observe(element);
    }

    return () => observer?.disconnect();
  }, []);

  const scrollToTeam = () => {
    const element = document.getElementById('team');
    if (element) {
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="results" className="py-20 bg-card/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-headline text-foreground mb-6">
            Proven{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Results & Impact
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real metrics from real clients who transformed their business with our AI solutions
          </p>
        </motion.div>

        {/* Animated Statistics */}
        <div id="results-stats" className="grid md:grid-cols-4 gap-8 mb-16">
          {[
            { 
              key: 'roi', 
              value: animatedStats?.roi, 
              suffix: '%', 
              label: 'Average ROI', 
              icon: 'TrendingUp',
              color: 'text-primary'
            },
            { 
              key: 'efficiency', 
              value: animatedStats?.efficiency, 
              suffix: '%', 
              label: 'Process Efficiency', 
              icon: 'Zap',
              color: 'text-secondary'
            },
            { 
              key: 'satisfaction', 
              value: animatedStats?.satisfaction, 
              suffix: '%', 
              label: 'Client Satisfaction', 
              icon: 'Heart',
              color: 'text-success'
            },
            { 
              key: 'clients', 
              value: animatedStats?.clients, 
              suffix: '+', 
              label: 'Enterprise Clients', 
              icon: 'Users',
              color: 'text-warning'
            }
          ]?.map((stat, index) => (
            <motion.div
              key={stat?.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card border border-border rounded-2xl p-8 text-center hover:border-primary/30 transition-colors"
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center`}>
                <Icon name={stat?.icon} size={32} className={stat?.color} />
              </div>
              <div className="text-4xl font-bold text-foreground mb-2">
                {stat?.value}{stat?.suffix}
              </div>
              <div className="text-muted-foreground">
                {stat?.label}
              </div>
            </motion.div>
          ))}
        </div>



        {/* Success Stories Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 border border-primary/20 text-center"
        >
          <h3 className="text-2xl font-semibold text-foreground mb-4">
            Ready to Achieve Similar Results?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Meet the expert team behind these transformations and discover how we can help your business
          </p>
          <button onClick={scrollToTeam} className="mt-2">
            <div className="inline-block">
              <div className="hidden" />
            </div>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ResultsSection;
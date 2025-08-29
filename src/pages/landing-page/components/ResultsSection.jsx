import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

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
    clients: 100
  };

  const revenueData = [
    { month: 'Jan', before: 100, after: 180 },
    { month: 'Feb', before: 105, after: 195 },
    { month: 'Mar', before: 110, after: 220 },
    { month: 'Apr', before: 108, after: 245 },
    { month: 'May', before: 115, after: 280 },
    { month: 'Jun', before: 120, after: 320 }
  ];

  const efficiencyData = [
    { process: 'Data Entry', improvement: 75 },
    { process: 'Customer Support', improvement: 80 },
    { process: 'Sales Process', improvement: 65 },
    { process: 'Inventory Mgmt', improvement: 90 },
    { process: 'Reporting', improvement: 85 }
  ];

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

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Revenue Growth Chart */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-card border border-border rounded-2xl p-8"
          >
            <h3 className="text-2xl font-semibold text-foreground mb-6">
              Revenue Growth Impact
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="month" stroke="#b8c5d1" />
                  <YAxis stroke="#b8c5d1" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1a1f2e', 
                      border: '1px solid rgba(0, 212, 255, 0.2)',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="before" 
                    stroke="#ff4757" 
                    strokeWidth={2}
                    name="Before AI"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="after" 
                    stroke="#007bff" 
                    strokeWidth={3}
                    name="After AI"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Average revenue increase of 180% within 6 months of AI implementation
            </p>
          </motion.div>

          {/* Efficiency Improvements */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-card border border-border rounded-2xl p-8"
          >
            <h3 className="text-2xl font-semibold text-foreground mb-6">
              Process Efficiency Gains
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={efficiencyData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis type="number" stroke="#b8c5d1" />
                  <YAxis dataKey="process" type="category" stroke="#b8c5d1" width={100} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1a1f2e', 
                      border: '1px solid rgba(0, 212, 255, 0.2)',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar 
                    dataKey="improvement" 
                    fill="url(#gradient)"
                    radius={[0, 4, 4, 0]}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#007bff" />
                      <stop offset="100%" stopColor="#00d4ff" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Efficiency improvements across key business processes
            </p>
          </motion.div>
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
          <button
            onClick={scrollToTeam}
            className="inline-flex items-center space-x-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors cta-shadow"
          >
            <span>Meet Our Team</span>
            <Icon name="ArrowRight" size={16} />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ResultsSection;
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProblemSection = () => {
  const [manualHours, setManualHours] = useState(40);
  const [calculatedLoss, setCalculatedLoss] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);

  const problems = [
    {
      icon: "Clock",
      title: "Manual Process Bottlenecks",
      description: "Teams waste 60% of their time on repetitive tasks that could be automated",
      impact: "$2.5M annual productivity loss"
    },
    {
      icon: "TrendingDown",
      title: "Competitive Disadvantage",
      description: "Competitors using AI are capturing market share while you're stuck with legacy processes",
      impact: "15% revenue decline risk"
    },
    {
      icon: "AlertTriangle",
      title: "Scaling Limitations",
      description: "Growth stalls when manual processes can\'t keep up with demand",
      impact: "50% slower growth rate"
    }
  ];

  useEffect(() => {
    const calculateLoss = () => {
      setIsCalculating(true);
      setTimeout(() => {
        // Average hourly cost for enterprise employees: $75
        // Weeks per year: 50 (accounting for vacation)
        const annualLoss = manualHours * 75 * 50;
        setCalculatedLoss(annualLoss);
        setIsCalculating(false);
      }, 500);
    };

    calculateLoss();
  }, [manualHours]);

  const scrollToSolution = () => {
    const element = document.getElementById('services');
    if (element) {
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="problem" className="py-20 bg-card/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-headline text-foreground mb-6">
            The Hidden Cost of{' '}
            <span className="text-error">Manual Processes</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            While you're managing operations manually, your competitors are scaling with AI automation
          </p>
        </motion.div>

        {/* Interactive Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-card border border-border rounded-2xl p-8 mb-16 max-w-4xl mx-auto"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-headline text-foreground mb-4">
              Calculate Your Revenue Loss
            </h3>
            <p className="text-muted-foreground">
              See how much manual processes are costing your business annually
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Weekly hours spent on manual processes
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    min="10"
                    max="80"
                    value={manualHours}
                    onChange={(e) => setManualHours(parseInt(e?.target?.value))}
                    className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
                  />
                  <span className="text-2xl font-bold text-primary w-16 text-center">
                    {manualHours}h
                  </span>
                </div>
              </div>

              <div className="bg-muted/20 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-muted-foreground">Annual productivity loss:</span>
                  <span className="text-2xl font-bold text-error">
                    {isCalculating ? (
                      <Icon name="Loader2" size={24} className="animate-spin" />
                    ) : (
                      `$${calculatedLoss?.toLocaleString()}`
                    )}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Based on $75/hour average enterprise employee cost
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-error/20 to-error/10 rounded-full w-48 h-48 mx-auto flex items-center justify-center mb-4">
                <div className="text-center">
                  <Icon name="TrendingDown" size={48} className="text-error mx-auto mb-2" />
                  <div className="text-3xl font-bold text-error">
                    ${Math.round(calculatedLoss / 1000)}K
                  </div>
                  <div className="text-sm text-muted-foreground">Lost annually</div>
                </div>
              </div>
              <Button
                variant="default"
                onClick={scrollToSolution}
                className="cta-shadow"
                iconName="ArrowRight"
                iconPosition="right"
              >
                See AI Solution
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Problem Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {problems?.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-colors"
            >
              <div className="w-12 h-12 bg-error/20 rounded-lg flex items-center justify-center mb-4">
                <Icon name={problem?.icon} size={24} className="text-error" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {problem?.title}
              </h3>
              <p className="text-muted-foreground mb-4">
                {problem?.description}
              </p>
              <div className="text-error font-semibold">
                {problem?.impact}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
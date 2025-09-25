import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import SlidingCTA from '../../../components/ui/SlidingCTA';

const ProblemSection = () => {
  const [manualHours, setManualHours] = useState(40);
  const [hourlyRate, setHourlyRate] = useState(75);
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
        // Weeks per year: 50 (accounting for vacation)
        const annualLoss = manualHours * hourlyRate * 50;
        setCalculatedLoss(annualLoss);
        setIsCalculating(false);
      }, 500);
    };

    calculateLoss();
  }, [manualHours, hourlyRate]);

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

        {/* Interactive Calculator - Progressive Flow Layout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="max-w-7xl mx-auto px-8 py-8 bg-card border border-border rounded-2xl">
            {/* Header */}
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-foreground">Calculate Your Revenue Loss</h3>
              <p className="text-muted-foreground mt-2">See how much manual processes are costing your business annually</p>
            </div>

            {/* Progressive Flow Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {/* Step 1: Input */}
              <div className="rounded-xl bg-muted/20 border border-border p-5">
                <div className="text-lg font-semibold text-foreground mb-2">1. Weekly Manual Hours</div>
                <div className="flex items-center space-x-3">
                  <input
                    aria-label="Weekly hours spent on manual processes"
                    type="range"
                    min="10"
                    max="80"
                    value={manualHours}
                    onChange={(e) => setManualHours(parseInt(e?.target?.value))}
                    className="flex-1 h-2 rounded-lg cursor-pointer transition-all duration-200"
                    style={{ accentColor: '#06b6d4' }}
                  />
                  <motion.span
                    key={manualHours}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="text-lg font-medium text-teal-400"
                  >
                    {manualHours}h
                  </motion.span>
                </div>
                <div className="text-sm text-muted-foreground mt-2">Adjust based on your team's current manual workload</div>
              </div>

              {/* Step 2: Rate */}
              <div className="rounded-xl bg-muted/20 border border-border p-5">
                <div className="text-lg font-semibold text-foreground mb-2">2. Enterprise Cost Rate</div>
                <div className="flex items-center space-x-3">
                  <input
                    aria-label="Hourly rate for enterprise employee"
                    type="range"
                    min="25"
                    max="150"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(parseInt(e?.target?.value))}
                    className="flex-1 h-2 rounded-lg cursor-pointer transition-all duration-200"
                    style={{ accentColor: '#06b6d4' }}
                  />
                  <motion.span
                    key={hourlyRate}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="text-lg font-medium text-teal-400"
                  >
                    ${hourlyRate}/h
                  </motion.span>
                </div>
                <div className="text-sm text-muted-foreground mt-2">Adjust based on your team's hourly cost</div>
              </div>

              {/* Step 3: Calculation */}
              <div className="rounded-xl bg-muted/20 border border-border p-5 flex flex-col">
                <div className="text-lg font-semibold text-foreground mb-2">3. Annual Productivity Loss</div>
                <div className="flex items-center justify-start space-x-2 text-3xl font-bold text-red-500">
                  {isCalculating ? (
                    <Icon name="Loader2" size={24} className="animate-spin inline-block" />
                  ) : (
                    <>
                      <Icon name="TrendingDown" size={32} className="text-red-500" />
                      <motion.span
                        key={calculatedLoss}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        ${calculatedLoss?.toLocaleString()}
                      </motion.span>
                    </>
                  )}
                </div>
                <div className="text-sm text-muted-foreground mt-2">Calculated from hours × rate × 50 weeks</div>
                <div className="mt-auto pt-4">
                  <SlidingCTA label="See AI Solution" onClick={scrollToSolution} size="md" />
                </div>
              </div>
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
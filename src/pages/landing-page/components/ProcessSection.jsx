import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ProcessSection = () => {
  const [activeStep, setActiveStep] = useState(0);

  const processSteps = [
    {
      number: "01",
      title: "Discovery & Assessment",
      duration: "Week 1-2",
      description: "Comprehensive analysis of your current processes and identification of automation opportunities",
      deliverables: [
        "Process mapping and documentation",
        "ROI potential assessment",
        "Technology stack evaluation",
        "Implementation roadmap"
      ],
      icon: "Search",
      color: "primary"
    },
    {
      number: "02",
      title: "Solution Design",
      duration: "Week 3-4",
      description: "Custom AI solution architecture tailored to your specific business requirements",
      deliverables: [
        "Technical architecture design",
        "Integration specifications",
        "User experience mockups",
        "Performance benchmarks"
      ],
      icon: "Lightbulb",
      color: "secondary"
    },
    {
      number: "03",
      title: "Development & Testing",
      duration: "Week 5-8",
      description: "Agile development with continuous testing and validation to ensure optimal performance",
      deliverables: [
        "AI model development",
        "System integration",
        "Quality assurance testing",
        "User acceptance testing"
      ],
      icon: "Code",
      color: "accent"
    },
    {
      number: "04",
      title: "Deployment & Optimization",
      duration: "Week 9-12",
      description: "Seamless deployment with ongoing monitoring and optimization for maximum ROI",
      deliverables: [
        "Production deployment",
        "Team training sessions",
        "Performance monitoring",
        "Continuous optimization"
      ],
      icon: "Rocket",
      color: "success"
    }
  ];

  return (
    <section id="process" className="py-20 bg-card/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-headline text-foreground mb-6">
            Our Proven{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Implementation Process
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A systematic approach that ensures successful AI transformation with guaranteed results
          </p>
        </motion.div>

        {/* Timeline Navigation */}
        <div className="flex justify-center mb-12">
          <div className="flex space-x-4 bg-card border border-border rounded-full p-2">
            {processSteps?.map((step, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeStep === index
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {step?.number}
              </button>
            ))}
          </div>
        </div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-4 gap-8 mb-16 items-stretch">
          {processSteps?.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative cursor-pointer transition-all duration-300 h-full ${
                activeStep === index ? 'scale-105' : 'hover:scale-102'
              }`}
              onClick={() => setActiveStep(index)}
            >
              {/* Connection Line */}
              {index < processSteps?.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-primary/30 to-transparent z-0" />
              )}

              <div className={`relative bg-card border rounded-2xl p-8 z-10 transition-all h-full flex flex-col ${
                activeStep === index 
                  ? 'border-primary shadow-lg' 
                  : 'border-border hover:border-primary/30'
              }`}>
                {/* Step Number */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`text-2xl font-bold ${
                    activeStep === index ? 'text-primary' : 'text-muted-foreground'
                  }`}>
                    {step?.number}
                  </div>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    activeStep === index 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    <Icon name={step?.icon} size={24} />
                  </div>
                </div>

                {/* Step Content */}
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {step?.title}
                </h3>
                <div className="text-sm text-primary font-medium mb-3">
                  {step?.duration}
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  {step?.description}
                </p>

                {/* Progress Indicator */}
                <div className="w-full bg-muted/30 rounded-full h-1 mt-auto">
                  <motion.div
                    className="h-1 bg-gradient-to-r from-primary to-secondary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: activeStep >= index ? '100%' : '0%' }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Active Step Details */}
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-card border border-border rounded-2xl p-8"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                {processSteps?.[activeStep]?.title} Deliverables
              </h3>
              <p className="text-muted-foreground mb-6">
                {processSteps?.[activeStep]?.description}
              </p>
              <ul className="space-y-3">
                {processSteps?.[activeStep]?.deliverables?.map((deliverable, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center text-muted-foreground"
                  >
                    <Icon name="CheckCircle" size={20} className="text-primary mr-3 flex-shrink-0" />
                    {deliverable}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="text-center">
              <div className="w-48 h-48 mx-auto bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mb-6">
                <Icon 
                  name={processSteps?.[activeStep]?.icon} 
                  size={80} 
                  className="text-primary" 
                />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">
                {processSteps?.[activeStep]?.duration}
              </div>
              <div className="text-muted-foreground">
                Typical completion time
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;
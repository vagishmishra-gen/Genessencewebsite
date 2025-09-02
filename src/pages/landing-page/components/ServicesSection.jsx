import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import SlidingCTA from '../../../components/ui/SlidingCTA';

const ServicesSection = () => {
  const [activeService, setActiveService] = useState(0);

  const services = [
    {
      icon: "Cog",
      title: "Operations Automation",
      description: "Transform manual workflows into intelligent, self-managing systems",
      features: [
        "Process Mining & Analysis",
        "Workflow Automation Design",
        "Integration with Existing Systems",
        "Performance Monitoring"
      ],
      caseStudy: {
        client: "TechCorp Manufacturing",
        result: "Reduced processing time by 75%",
        roi: "300% ROI in 6 months"
      },
      gradient: "from-primary to-primary/70"
    },
    {
      icon: "Users",
      title: "Sales Intelligence",
      description: "AI-powered lead scoring, forecasting, and customer insights",
      features: [
        "Predictive Lead Scoring",
        "Sales Forecasting Models",
        "Customer Behavior Analysis",
        "Automated Follow-up Systems"
      ],
      caseStudy: {
        client: "SalesForce Pro",
        result: "Increased conversion rates by 45%",
        roi: "250% ROI in 4 months"
      },
      gradient: "from-secondary to-secondary/70"
    },
    {
      icon: "MessageSquare",
      title: "Customer Service AI",
      description: "Intelligent chatbots and automated support systems",
      features: [
        "Natural Language Processing",
        "Multi-channel Integration",
        "Sentiment Analysis",
        "Escalation Management"
      ],
      caseStudy: {
        client: "ServiceMax Inc",
        result: "Reduced response time by 80%",
        roi: "400% ROI in 8 months"
      },
      gradient: "from-accent to-accent/70"
    }
  ];

  const scrollToProcess = () => {
    const element = document.getElementById('process');
    if (element) {
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-headline text-foreground mb-6">
            AI Solutions That{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Transform Business
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our proven AI automation services deliver measurable results across every aspect of your operations
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {services?.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative bg-card border border-border rounded-2xl p-8 cursor-pointer transition-all duration-300 hover:border-primary/30 hover:shadow-xl ${
                activeService === index ? 'border-primary/50 shadow-lg' : ''
              }`}
              onMouseEnter={() => setActiveService(index)}
            >
              {/* Service Icon */}
              <div className={`w-16 h-16 bg-gradient-to-br ${service?.gradient} rounded-xl flex items-center justify-center mb-6`}>
                <Icon name={service?.icon} size={32} color="white" />
              </div>

              {/* Service Content */}
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                {service?.title}
              </h3>
              <p className="text-muted-foreground mb-6">
                {service?.description}
              </p>

              {/* Features List */}
              <ul className="space-y-2 mb-8">
                {service?.features?.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                    <Icon name="Check" size={16} className="text-primary mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Case Study Preview */}
              <div className="bg-muted/20 rounded-lg p-4 mb-6">
                <div className="text-xs text-muted-foreground mb-1">Case Study</div>
                <div className="font-semibold text-foreground text-sm mb-1">
                  {service?.caseStudy?.client}
                </div>
                <div className="text-primary text-sm font-medium mb-1">
                  {service?.caseStudy?.result}
                </div>
                <div className="text-secondary text-sm font-bold">
                  {service?.caseStudy?.roi}
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl opacity-0 pointer-events-none"
                animate={{ opacity: activeService === index ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 border border-primary/20">
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Ready to Transform Your Operations?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Our proven methodology ensures successful AI implementation with guaranteed ROI
            </p>
            <SlidingCTA label="See Our Process" onClick={scrollToProcess} size="lg" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
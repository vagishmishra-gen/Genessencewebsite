import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ComparisonSection = () => {
  const comparisonData = [
    {
      category: "Implementation Time",
      typical: "6-12 months",
      genessence: "4-8 weeks",
      advantage: "75% faster delivery"
    },
    {
      category: "ROI Timeline",
      typical: "12-18 months",
      genessence: "3-6 months",
      advantage: "3x faster ROI"
    },
    {
      category: "Success Rate",
      typical: "45-60%",
      genessence: "95%+",
      advantage: "Guaranteed results"
    },
    {
      category: "Ongoing Support",
      typical: "Limited",
      genessence: "24/7 monitoring",
      advantage: "Continuous optimization"
    },
    {
      category: "Integration Complexity",
      typical: "High disruption",
      genessence: "Seamless integration",
      advantage: "Zero downtime"
    },
    {
      category: "Cost Structure",
      typical: "High upfront costs",
      genessence: "Performance-based pricing",
      advantage: "Pay for results"
    }
  ];

  return (
    <section id="comparison" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-headline text-foreground mb-6">
            Why Choose{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Genessence
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See how our proven approach delivers superior results compared to traditional AI agencies
          </p>
        </motion.div>

        <div className="bg-card border border-border rounded-2xl overflow-x-auto">
          <div className="min-w-[720px]">
          {/* Table Header */}
          <div className="grid grid-cols-4 bg-muted/20 border-b border-border text-sm md:text-base">
            <div className="p-4 md:p-6">
              <h3 className="font-semibold text-foreground">Comparison Factor</h3>
            </div>
            <div className="p-4 md:p-6 border-l border-border">
              <h3 className="font-semibold text-muted-foreground">Typical Agencies</h3>
            </div>
            <div className="p-4 md:p-6 border-l border-border bg-primary/5">
              <h3 className="font-semibold text-primary">Genessence</h3>
            </div>
            <div className="p-4 md:p-6 border-l border-border">
              <h3 className="font-semibold text-secondary">Our Advantage</h3>
            </div>
          </div>

          {/* Table Rows */}
          {comparisonData?.map((row, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="grid grid-cols-4 border-b border-border last:border-b-0 hover:bg-muted/10 transition-colors text-sm md:text-base"
            >
              <div className="p-4 md:p-6">
                <div className="font-medium text-foreground">{row?.category}</div>
              </div>
              <div className="p-4 md:p-6 border-l border-border">
                <div className="flex items-center text-muted-foreground">
                  <Icon name="X" size={16} className="text-error mr-2" />
                  {row?.typical}
                </div>
              </div>
              <div className="p-4 md:p-6 border-l border-border bg-primary/5">
                <div className="flex items-center text-primary font-medium">
                  <Icon name="Check" size={16} className="text-primary mr-2" />
                  {row?.genessence}
                </div>
              </div>
              <div className="p-4 md:p-6 border-l border-border">
                <div className="flex items-center text-secondary font-medium">
                  <Icon name="TrendingUp" size={16} className="text-secondary mr-2" />
                  {row?.advantage}
                </div>
              </div>
            </motion.div>
          ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 border border-primary/20">
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Experience the Genessence Difference
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join 100+ companies that have transformed their operations with our proven AI solutions
            </p>
            
            {/* Key Benefits */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center justify-center space-x-2">
                <Icon name="Shield" size={20} className="text-primary" />
                <span className="text-foreground font-medium">95% Success Rate</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Icon name="Clock" size={20} className="text-secondary" />
                <span className="text-foreground font-medium">4-8 Week Delivery</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Icon name="TrendingUp" size={20} className="text-success" />
                <span className="text-foreground font-medium">300% Average ROI</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ComparisonSection;
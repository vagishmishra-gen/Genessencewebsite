import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import SlidingCTA from '../../../components/ui/SlidingCTA';

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState(0);

  const faqs = [
    {
      question: "How quickly can we see results from AI implementation?",
      answer: `Most clients see initial improvements within 2-4 weeks of deployment. Significant ROI typically becomes evident within 3-6 months. Our phased implementation approach ensures you start benefiting from AI automation early in the process.\n\nWe provide weekly progress reports and real-time dashboards so you can track improvements in efficiency, cost savings, and revenue generation from day one.`
    },
    {
      question: "What makes Genessence different from other AI agencies?",
      answer: `Unlike agencies that over-promise and under-deliver, we guarantee results with our performance-based pricing model. Our 95% success rate comes from our proven methodology:\n\n• Comprehensive discovery and assessment phase\n• Custom solution design tailored to your business\n• Agile development with continuous testing\n• 24/7 monitoring and optimization post-deployment\n\nWe also provide complete transparency with regular updates and measurable KPIs throughout the entire process.`
    },
    {
      question: "How do you ensure AI solutions integrate with our existing systems?",
      answer: `Our integration specialists conduct a thorough audit of your current technology stack during the discovery phase. We design solutions that work seamlessly with your existing systems using:\n\n• API-first architecture for easy integration\n• Gradual rollout to minimize disruption\n• Comprehensive testing in staging environments\n• Zero-downtime deployment strategies\n\nWe've successfully integrated with 4+ different enterprise systems including SAP, Salesforce, Oracle, and custom-built solutions.`
    },
    {
      question: "What level of support do you provide after implementation?",
      answer: `We provide comprehensive ongoing support to ensure your AI solutions continue delivering optimal results:\n\n• 24/7 system monitoring and maintenance\n• Monthly performance optimization reviews\n• Quarterly strategy sessions for scaling opportunities\n• Dedicated customer success manager\n• Priority technical support with 2-hour response time\n• Regular updates and feature enhancements\n\nOur goal is to be your long-term AI transformation partner, not just a one-time vendor.`
    },
    {
      question: "How do you handle data security and compliance?",
      answer: `Data security is our top priority. We maintain enterprise-grade security standards:\n\n• SOC 2 Type II certified infrastructure\n• End-to-end encryption for all data transmission\n• GDPR, HIPAA, and industry-specific compliance\n• Regular security audits and penetration testing\n• Role-based access controls and audit trails\n• Data residency options to meet regulatory requirements\n\nWe work with your security team to ensure all implementations meet your organization's specific compliance requirements.`
    },
    {
      question: "What\'s the typical investment range for AI transformation?",
      answer: `Investment varies based on project scope and complexity. Our typical engagement ranges:\n\n• Small-scale automation: $25K - $75K\n• Department-wide transformation: $75K - $200K\n• Enterprise-wide implementation: $200K - $500K+\n\nWe offer flexible pricing models including performance-based options where you pay based on achieved results. Most clients see 3-5x ROI within the first year, making the investment highly profitable.\n\nWe provide detailed ROI projections during our free assessment to help you understand the expected return on investment.`
    }
  ];

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? -1 : index);
  };

  const scrollToLeadCapture = () => {
    const element = document.getElementById('lead-capture');
    if (element) {
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="faq" className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-headline text-foreground mb-6">
            Frequently Asked{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get answers to common questions about our AI transformation process and services
          </p>
        </motion.div>

        <div className="space-y-4 mb-12">
          {faqs?.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card border border-border rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-muted/10 transition-colors"
              >
                <h3 className="text-lg font-semibold text-foreground pr-4">
                  {faq?.question}
                </h3>
                <motion.div
                  animate={{ rotate: openFAQ === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <Icon name="ChevronDown" size={24} className="text-muted-foreground" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openFAQ === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-6 border-t border-border">
                      <div className="pt-6 text-muted-foreground leading-relaxed whitespace-pre-line">
                        {faq?.answer}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Still Have Questions CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 border border-primary/20">
            <Icon name="MessageCircle" size={48} className="text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Still Have Questions?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Our AI experts are ready to discuss your specific challenges and provide personalized recommendations for your business transformation.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <SlidingCTA label="Schedule Free Consultation" onClick={scrollToLeadCapture} size="md" iconName="Calendar" />
              <SlidingCTA label="hello@genessence.ai" href="mailto:hello@genessence.ai" size="md" iconName="Mail" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
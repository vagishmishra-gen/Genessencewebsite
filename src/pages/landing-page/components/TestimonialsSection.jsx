import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import SlidingCTA from '../../../components/ui/SlidingCTA';
import Image from '../../../components/AppImage';

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: "Jennifer Martinez",
      role: "CTO",
      company: "TechFlow Solutions",
      companySize: "$50M Revenue",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      quote: `Genessence transformed our entire operations workflow in just 6 weeks. The AI automation they implemented reduced our processing time by 75% and increased our revenue by $2.3M in the first year alone. Their team's expertise is unmatched.`,
      results: {
        timeReduction: "75%",
        revenueIncrease: "$2.3M",
        roi: "340%"
      },
      industry: "Technology Services"
    },
    {
      id: 2,
      name: "Robert Chen",
      role: "CEO",
      company: "Global Manufacturing Corp",
      companySize: "$120M Revenue",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      quote: `The predictive analytics solution Genessence built for us has revolutionized our supply chain management. We now predict demand with 94% accuracy and reduced inventory costs by $1.8M annually. Outstanding results and professional service.`,
      results: {
        accuracy: "94%",
        costSavings: "$1.8M",
        roi: "280%"
      },
      industry: "Manufacturing"
    },
    {
      id: 3,
      name: "Sarah Thompson",
      role: "VP of Operations",
      company: "FinanceFirst Bank",
      companySize: "$200M Assets",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      quote: `Genessence's AI-powered customer service solution handles 80% of our inquiries automatically while maintaining a 96% satisfaction rate. Customer response time dropped from hours to seconds. This is the future of banking operations.`,
      results: {
        automation: "80%",
        satisfaction: "96%",
        responseTime: "Seconds"
      },
      industry: "Financial Services"
    },
    {
      id: 4,
      name: "Michael Rodriguez",
      role: "Chief Digital Officer",
      company: "RetailMax Chain",
      companySize: "$80M Revenue",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      quote: `The sales intelligence platform Genessence developed increased our conversion rates by 45% and helped us identify $3.2M in new revenue opportunities. Their data-driven approach to AI implementation is exactly what we needed.`,
      results: {
        conversionIncrease: "45%",
        newRevenue: "$3.2M",
        roi: "420%"
      },
      industry: "Retail"
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials?.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials?.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials?.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials?.length) % testimonials?.length);
    setIsAutoPlaying(false);
  };

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
    setIsAutoPlaying(false);
  };

  const scrollToFAQ = () => {
    const element = document.getElementById('faq');
    if (element) {
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="testimonials" className="py-20 bg-card/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-headline text-foreground mb-6">
            What Our{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Clients Say
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real success stories from enterprise leaders who transformed their operations with our AI solutions
          </p>
        </motion.div>

        {/* Main Testimonial Display */}
        <div className="relative max-w-5xl mx-auto mb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-card border border-border rounded-2xl p-8 md:p-12"
            >
              <div className="grid md:grid-cols-3 gap-8 items-center">
                {/* Client Info */}
                <div className="text-center md:text-left">
                  <div className="w-24 h-24 mx-auto md:mx-0 rounded-full overflow-hidden border-2 border-primary/20 mb-4">
                    <Image
                      src={testimonials?.[currentTestimonial]?.image}
                      alt={testimonials?.[currentTestimonial]?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-foreground mb-1">
                    {testimonials?.[currentTestimonial]?.name}
                  </h3>
                  <p className="text-primary font-medium mb-1">
                    {testimonials?.[currentTestimonial]?.role}
                  </p>
                  <p className="text-muted-foreground text-sm mb-2">
                    {testimonials?.[currentTestimonial]?.company}
                  </p>
                  <p className="text-secondary text-xs font-medium mb-4">
                    {testimonials?.[currentTestimonial]?.companySize}
                  </p>
                  
                  {/* Rating */}
                  <div className="flex justify-center md:justify-start space-x-1 mb-4">
                    {[...Array(testimonials?.[currentTestimonial]?.rating)]?.map((_, i) => (
                      <Icon key={i} name="Star" size={16} className="text-warning fill-current" />
                    ))}
                  </div>
                  
                  <div className="text-xs text-muted-foreground bg-muted/20 rounded-lg px-3 py-1 inline-block">
                    {testimonials?.[currentTestimonial]?.industry}
                  </div>
                </div>

                {/* Quote */}
                <div className="md:col-span-2">
                  <blockquote className="text-lg md:text-xl text-foreground leading-relaxed">
                    {testimonials?.[currentTestimonial]?.quote}
                  </blockquote>
                  
                  {/* Results Metrics */}
                  <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-border">
                    {Object.entries(testimonials?.[currentTestimonial]?.results)?.map(([key, value], index) => (
                      <div key={key} className="text-center">
                        <div className="text-2xl font-bold text-primary mb-1">
                          {value}
                        </div>
                        <div className="text-xs text-muted-foreground capitalize">
                          {key?.replace(/([A-Z])/g, ' $1')?.trim()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute -left-16 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center hover:border-primary/30 transition-colors"
          >
            <Icon name="ChevronLeft" size={20} className="text-muted-foreground" />
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute -right-16 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center hover:border-primary/30 transition-colors"
          >
            <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
          </button>
        </div>

        {/* Testimonial Indicators */}
        <div className="flex justify-center space-x-2 mb-12">
          {testimonials?.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                currentTestimonial === index ? 'bg-primary' : 'bg-muted-foreground/30'
              }`}
            />
          ))}
        </div>

        {/* Client Logos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm text-muted-foreground mb-6">
            Trusted by leading companies worldwide
          </p>
          <div className="relative overflow-hidden">
            {/* Marquee track duplicated for seamless loop */}
            <div className="flex whitespace-nowrap opacity-60 animate-marquee">
              {['Microsoft', 'Amazon', 'Google', 'IBM', 'Oracle', 'Salesforce', 'Meta', 'Adobe', 'SAP', 'NVIDIA']
                .concat(['Microsoft', 'Amazon', 'Google', 'IBM', 'Oracle', 'Salesforce', 'Meta', 'Adobe', 'SAP', 'NVIDIA'])
                ?.map((company, index) => (
                <div key={index} className="mx-8 text-xl font-bold text-foreground inline-block">
                  {company}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 border border-primary/20">
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Join These Success Stories
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Ready to transform your business operations? Let's discuss your specific challenges and opportunities.
            </p>
            <SlidingCTA label="Get Started Today" onClick={scrollToFAQ} size="md" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const FooterSection = () => {
  const currentYear = new Date()?.getFullYear();

  const footerLinks = {
    services: [
      { name: 'Operations Automation', href: '#services' },
      { name: 'Sales Intelligence', href: '#services' },
      { name: 'Customer Service AI', href: '#services' },
      { name: 'Predictive Analytics', href: '#services' }
    ],
    company: [
      { name: 'About Us', href: '#team' },
      { name: 'Our Process', href: '#process' },
      { name: 'Success Stories', href: '#testimonials' },
      { name: 'Case Studies', href: '#results' }
    ],
    resources: [
      { name: 'AI Assessment', href: '#lead-capture' },
      { name: 'ROI Calculator', href: '#problem' },
      { name: 'Implementation Guide', href: '#process' },
      { name: 'FAQ', href: '#faq' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Cookie Policy', href: '#' },
      { name: 'Data Security', href: '#' }
    ]
  };

  const socialLinks = [
    { name: 'LinkedIn', icon: 'Linkedin', href: '#' },
    { name: 'Twitter', icon: 'Twitter', href: '#' },
    { name: 'YouTube', icon: 'Youtube', href: '#' },
    { name: 'GitHub', icon: 'Github', href: '#' }
  ];

  const scrollToSection = (href) => {
    if (href?.startsWith('#')) {
      const element = document.getElementById(href?.substring(1));
      if (element) {
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-6 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                    <Icon name="Zap" size={24} color="white" strokeWidth={2.5} />
                  </div>
                  <span className="text-2xl font-headline text-foreground">
                    Genessence
                  </span>
                </div>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Transforming enterprise operations through intelligent AI automation. 
                  We deliver measurable results with our proven implementation methodology 
                  and guarantee 95% success rate.
                </p>

                {/* Contact Info */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-3 text-muted-foreground">
                    <Icon name="Mail" size={16} className="text-primary" />
                    <a href="mailto:hello@genessence.com" className="hover:text-primary transition-colors">
                      hello@genessence.com
                    </a>
                  </div>
                  <div className="flex items-center space-x-3 text-muted-foreground">
                    <Icon name="Phone" size={16} className="text-primary" />
                    <a href="tel:+1-555-123-4567" className="hover:text-primary transition-colors">
                      +1 (555) 123-4567
                    </a>
                  </div>
                  <div className="flex items-center space-x-3 text-muted-foreground">
                    <Icon name="MapPin" size={16} className="text-primary" />
                    <span>San Francisco, CA & Remote</span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex space-x-4">
                  {socialLinks?.map((social) => (
                    <a
                      key={social?.name}
                      href={social?.href}
                      className="w-10 h-10 bg-muted/20 rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                      aria-label={social?.name}
                    >
                      <Icon name={social?.icon} size={18} />
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Services */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold text-foreground mb-4">Services</h3>
                <ul className="space-y-3">
                  {footerLinks?.services?.map((link) => (
                    <li key={link?.name}>
                      <button
                        onClick={() => scrollToSection(link?.href)}
                        className="text-muted-foreground hover:text-primary transition-colors text-left"
                      >
                        {link?.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Company */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold text-foreground mb-4">Company</h3>
                <ul className="space-y-3">
                  {footerLinks?.company?.map((link) => (
                    <li key={link?.name}>
                      <button
                        onClick={() => scrollToSection(link?.href)}
                        className="text-muted-foreground hover:text-primary transition-colors text-left"
                      >
                        {link?.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Resources */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold text-foreground mb-4">Resources</h3>
                <ul className="space-y-3">
                  {footerLinks?.resources?.map((link) => (
                    <li key={link?.name}>
                      <button
                        onClick={() => scrollToSection(link?.href)}
                        className="text-muted-foreground hover:text-primary transition-colors text-left"
                      >
                        {link?.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Legal */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold text-foreground mb-4">Legal</h3>
                <ul className="space-y-3">
                  {footerLinks?.legal?.map((link) => (
                    <li key={link?.name}>
                      <a
                        href={link?.href}
                        className="text-muted-foreground hover:text-teal-500 transition-colors"
                      >
                        {link?.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="py-8 border-t border-border"
        >
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Stay Updated on AI Trends
            </h3>
            <p className="text-muted-foreground mb-4">
              Get weekly insights on AI automation and business transformation
            </p>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>

        {/* Teal Accent Bar */}
        <div className="h-0.5 bg-primary"></div>
        
        {/* Bottom Bar */}
        <div className="py-6 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-muted-foreground text-sm">
              © {currentYear} Genessence. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Shield" size={16} className="text-primary" />
                <span>SOC 2 Certified</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Award" size={16} className="text-secondary" />
                <span>95% Success Rate</span>
              </div>
              <button
                onClick={scrollToTop}
                className="flex items-center space-x-2 text-sm text-primary hover:text-primary/80 transition-colors"
              >
                <span>Back to top</span>
                <Icon name="ArrowUp" size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
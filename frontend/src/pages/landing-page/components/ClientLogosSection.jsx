import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../../utils/cn';

const clients = [
  { src: '/assets/images/amber.png', name: 'Amber', lightLogo: false },
  { src: '/assets/images/autoliv.png', name: 'Autoliv', lightLogo: false },
  { src: '/assets/images/camana.png', name: 'Camana', lightLogo: false },
  { src: '/assets/images/iljin.png', name: 'Iljin', lightLogo: false },
  { src: '/assets/images/mars.png', name: 'Mars', lightLogo: false },
  { src: '/assets/images/picl.png', name: 'PICL', lightLogo: false },
  { src: '/assets/images/power-one.png', name: 'Power One', lightLogo: true },
  { src: '/assets/images/sidwal.png', name: 'Sidwal', lightLogo: false },
];

const ClientLogosSection = () => {
  const logoItems = [...clients, ...clients];

  return (
    <section className="py-12 md:py-16 bg-card/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sm text-muted-foreground mb-6 text-center"
        >
          Trusted by 4+ companies worldwide
        </motion.p>
        <div className="relative overflow-hidden">
          <div className="flex items-center gap-12 md:gap-16 animate-marquee shrink-0">
            {logoItems?.map(({ src, name, lightLogo }, index) => (
              <div
                key={`${src}-${index}`}
                className={cn(
                  'flex flex-col items-center justify-center shrink-0 gap-2 p-3 rounded-lg min-w-[100px]',
                  lightLogo && 'bg-foreground/10',
                )}
              >
                <img
                  src={src}
                  alt={name}
                  className="h-8 md:h-10 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
                />
                <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientLogosSection;

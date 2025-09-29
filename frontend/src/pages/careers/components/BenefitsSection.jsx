import React from 'react';
import Icon from '../../../components/AppIcon';

const BenefitsSection = ({ benefits }) => {
  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-headline-bold text-foreground mb-8">Why Join Us</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, i) => (
            <div key={i} className="rounded-xl border border-border bg-card p-5 hover:shadow-lg transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-3">
                <Icon name={b.icon} size={18} className="text-primary" />
              </div>
              <div className="font-semibold text-foreground mb-1">{b.title}</div>
              <div className="text-sm text-muted-foreground leading-relaxed">{b.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;

import React from 'react';
import Button from '../../../components/ui/Button';

const NewsletterSubscription = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 to-secondary/10 p-8 md:p-10">
      <div className="relative z-10">
        <h3 className="text-2xl md:text-3xl font-headline-bold text-foreground mb-2">Subscribe to our newsletter</h3>
        <p className="text-muted-foreground mb-6">Get the latest AI insights and case studies straight to your inbox.</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <input type="email" placeholder="you@company.com" className="flex-1 px-4 py-3 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary" />
          <Button size="default">Subscribe</Button>
        </div>
      </div>
      <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-primary/20 blur-3xl" />
    </div>
  );
};

export default NewsletterSubscription;

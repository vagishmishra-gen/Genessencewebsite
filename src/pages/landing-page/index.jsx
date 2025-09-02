import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import ScrollProgress from '../../components/ui/ScrollProgress';
import FloatingCTA from '../../components/ui/FloatingCTA';
import HeroSection from './components/HeroSection';
import ProblemSection from './components/ProblemSection';
import ServicesSection from './components/ServicesSection';
import ProcessSection from './components/ProcessSection';
import ComparisonSection from './components/ComparisonSection';
import ResultsSection from './components/ResultsSection';
import TeamSection from './components/TeamSection';
import TestimonialsSection from './components/TestimonialsSection';
import FAQSection from './components/FAQSection';
import LeadCaptureSection from './components/LeadCaptureSection';
import FooterSection from './components/FooterSection';

const LandingPage = () => {
  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Cleanup on unmount
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Genessence - Transform Your Business with AI Automation | 300% ROI Guaranteed</title>
        <meta 
          name="description" 
          content="Fuel your growth with AI automation solutions that deliver proven results. 95% success rate, 4-8 week implementation, 300% average ROI. Transform operations, sales, and customer service with enterprise-grade AI." 
        />
        <meta name="keywords" content="AI automation, business transformation, enterprise AI, process automation, sales intelligence, customer service AI, predictive analytics, ROI, digital transformation" />
        <meta name="author" content="Genessence" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://genessence.com/landing-page" />
        <meta property="og:title" content="Genessence - Transform Your Business with AI Automation" />
        <meta property="og:description" content="Fuel your growth with AI automation solutions that deliver proven results. 95% success rate, 300% average ROI." />
        <meta property="og:image" content="https://genessence.com/og-image.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://genessence.com/landing-page" />
        <meta property="twitter:title" content="Genessence - Transform Your Business with AI Automation" />
        <meta property="twitter:description" content="Fuel your growth with AI automation solutions that deliver proven results. 95% success rate, 300% average ROI." />
        <meta property="twitter:image" content="https://genessence.com/og-image.jpg" />

        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://genessence.com/landing-page" />
        
        {/* Schema.org structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Genessence",
            "description": "AI automation solutions for enterprise business transformation",
            "url": "https://genessence.com",
            "logo": "https://genessence.com/logo.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+1-555-123-4567",
              "contactType": "customer service",
              "email": "hello@genessence.com"
            },
            "sameAs": [
              "https://linkedin.com/company/genessence",
              "https://twitter.com/genessence"
            ],
            "offers": {
              "@type": "Service",
              "name": "AI Business Transformation",
              "description": "Enterprise AI automation with guaranteed ROI"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background bg-teal-accent text-foreground">
        {/* Navigation & Progress */}
        <Header />
        <ScrollProgress />
        <FloatingCTA />

        {/* Main Content Sections */}
        <main>
          <HeroSection />
          <ProblemSection />
          <ServicesSection />
          <ProcessSection />
          <ComparisonSection />
          <ResultsSection />
          <TeamSection />
          <TestimonialsSection />
          <FAQSection />
          <LeadCaptureSection />
        </main>

        {/* Footer */}
        <FooterSection />
      </div>
    </>
  );
};

export default LandingPage;
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import SlidingCTA from '../../components/ui/SlidingCTA';
import Breadcrumb from '../../components/ui/Breadcrumb';
import BenefitsSection from './components/BenefitsSection';
import JobOpenings from './components/JobOpenings';
import ApplicationForm from './components/ApplicationForm';
import { benefits, jobOpenings } from './data/jobOpenings';

const CareersPage = () => {
  const openingsRef = useRef(null);
  const scrollToOpenings = () => openingsRef.current?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Breadcrumb currentPage="Careers" />
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline-bold text-foreground leading-tight mb-6">
              Join Our AI Innovation{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Team
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Help shape the future of enterprise automation in Noida & remotely.
            </p>
            <SlidingCTA label="Explore Open Positions" onClick={scrollToOpenings} size="lg" />
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <BenefitsSection benefits={benefits} />

      {/* Openings */}
      <div ref={openingsRef}>
        <JobOpenings jobs={jobOpenings} onApply={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })} />
      </div>

      {/* Application Form */}
      <ApplicationForm positions={jobOpenings} />

      {/* Contact */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="text-sm text-muted-foreground">Questions? Contact HR: <a className="text-primary hover:underline" href="mailto:sagar.maurya@genessence.ai">sagar.maurya@genessence.ai</a></div>
        </div>
      </section>
    </div>
  );
};

export default CareersPage;

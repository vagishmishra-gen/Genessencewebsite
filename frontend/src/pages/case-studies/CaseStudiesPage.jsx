import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import SlidingCTA from '../../components/ui/SlidingCTA';
import Breadcrumb from '../../components/ui/Breadcrumb';
import CaseStudyCard from './components/CaseStudyCard';
import InsightCard from './components/InsightCard';
import NavigationArrows from './components/NavigationArrows';
import { caseStudies, insights } from './data/caseStudiesData';

const CaseStudiesPage = () => {
  const SHOW_INSIGHTS = false;
  const [currentCaseStudyIndex, setCurrentCaseStudyIndex] = useState(0);
  const [currentInsightIndex, setCurrentInsightIndex] = useState(0);
  const caseStudyScrollRef = useRef(null);
  const insightScrollRef = useRef(null);

  // Calculate visible items based on screen size
  const [visibleCaseStudies, setVisibleCaseStudies] = useState(2);
  const [visibleInsights, setVisibleInsights] = useState(2);

  useEffect(() => {
    const updateVisibleItems = () => {
      if (window.innerWidth < 768) {
        setVisibleCaseStudies(1);
        setVisibleInsights(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCaseStudies(2);
        setVisibleInsights(2);
      } else {
        setVisibleCaseStudies(2);
        setVisibleInsights(2);
      }
    };

    updateVisibleItems();
    window.addEventListener('resize', updateVisibleItems);
    return () => window.removeEventListener('resize', updateVisibleItems);
  }, []);

  const maxCaseStudyIndex = Math.max(0, caseStudies.length - visibleCaseStudies);
  const maxInsightIndex = Math.max(0, insights.length - visibleInsights);

  const handleCaseStudyPrevious = () => {
    setCurrentCaseStudyIndex(prev => Math.max(0, prev - 1));
  };

  const handleCaseStudyNext = () => {
    setCurrentCaseStudyIndex(prev => Math.min(maxCaseStudyIndex, prev + 1));
  };

  const handleInsightPrevious = () => {
    setCurrentInsightIndex(prev => Math.max(0, prev - 1));
  };

  const handleInsightNext = () => {
    setCurrentInsightIndex(prev => Math.min(maxInsightIndex, prev + 1));
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Case Studies - Genessence AI Solutions</title>
        <meta name="description" content="Explore our success stories and insights from real AI automation implementations. See how we've helped companies achieve 300% ROI and transform their operations." />
        <meta name="keywords" content="AI case studies, automation success stories, ROI examples, digital transformation" />
      </Helmet>

      <div className="min-h-screen bg-background text-foreground">
        <Header />
        
        {/* Hero Section */}
        <section className="pt-20 pb-16 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <Breadcrumb currentPage="Case Studies" />
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline-bold text-foreground mb-6">
                Success Stories &{' '}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Insights
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Discover how leading companies have transformed their operations with our AI solutions, 
                achieving remarkable results and measurable ROI.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <SlidingCTA label="View Case Studies" onClick={() => scrollToSection('case-studies')} size="lg" />
                {/* Read Insights button hidden for now */}
                <div className="hidden">
                  <Button
                    onClick={() => scrollToSection('insights')}
                    variant="outline"
                    size="lg"
                    iconName="BookOpen"
                    iconPosition="left"
                    iconSize={20}
                    className="border-primary/30 text-primary hover:bg-primary/10"
                  >
                    Read Insights
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Case Studies Section */}
        <section id="case-studies" className="py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-headline-bold text-foreground mb-4">
                Real Results, Real Impact
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Our case studies showcase the tangible benefits of AI automation across various industries, 
                with detailed metrics and implementation insights.
              </p>
            </motion.div>

            {/* Case Studies Grid */}
            <div className="relative">
              <div className="overflow-hidden">
                <motion.div
                  ref={caseStudyScrollRef}
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(-${currentCaseStudyIndex * (100 / visibleCaseStudies)}%)`
                  }}
                >
                  {caseStudies.map((caseStudy, index) => (
                    <div
                      key={caseStudy.id}
                      className="flex-shrink-0 px-4"
                      style={{ width: `${100 / visibleCaseStudies}%` }}
                    >
                      <CaseStudyCard caseStudy={caseStudy} index={index} />
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Navigation Arrows */}
              <div className="flex justify-center mt-8">
                <NavigationArrows
                  onPrevious={handleCaseStudyPrevious}
                  onNext={handleCaseStudyNext}
                  canGoPrevious={currentCaseStudyIndex > 0}
                  canGoNext={currentCaseStudyIndex < maxCaseStudyIndex}
                />
              </div>
            </div>

            {/* Case Study Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              <div className="text-center p-6 bg-card border border-border rounded-xl">
                <div className="text-3xl font-bold text-primary mb-2">300%</div>
                <div className="text-muted-foreground">Average ROI</div>
              </div>
              <div className="text-center p-6 bg-card border border-border rounded-xl">
                <div className="text-3xl font-bold text-secondary mb-2">75%</div>
                <div className="text-muted-foreground">Time Reduction</div>
              </div>
              <div className="text-center p-6 bg-card border border-border rounded-xl">
                <div className="text-3xl font-bold text-accent mb-2">10+</div>
                <div className="text-muted-foreground">Successful Projects</div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Insights Section (hidden for now) */}
        {SHOW_INSIGHTS && (
          <section id="insights" className="py-20 bg-muted/30">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-4xl font-headline-bold text-foreground mb-4">
                  Industry Insights & Trends
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Stay ahead with our latest insights on AI automation, digital transformation, 
                  and industry best practices from our expert team.
                </p>
              </motion.div>

              {/* Insights Grid */}
              <div className="relative">
                <div className="overflow-hidden">
                  <motion.div
                    ref={insightScrollRef}
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{
                      transform: `translateX(-${currentInsightIndex * (100 / visibleInsights)}%)`
                    }}
                  >
                    {insights.map((insight, index) => (
                      <div
                        key={insight.id}
                        className="flex-shrink-0 px-4"
                        style={{ width: `${100 / visibleInsights}%` }}
                      >
                        <InsightCard insight={insight} index={index} />
                      </div>
                    ))}
                  </motion.div>
                </div>

                {/* Navigation Arrows */}
                <div className="flex justify-center mt-8">
                  <NavigationArrows
                    onPrevious={handleInsightPrevious}
                    onNext={handleInsightNext}
                    canGoPrevious={currentInsightIndex > 0}
                    canGoNext={currentInsightIndex < maxInsightIndex}
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-12 border border-primary/20"
            >
              <h3 className="text-3xl font-headline-bold text-foreground mb-4">
                Ready to Create Your Success Story?
              </h3>
              <p className="text-lg text-muted-foreground mb-8">
                Let's discuss how our AI solutions can transform your business operations 
                and deliver measurable results like our featured case studies.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <SlidingCTA label="Start Your Project" onClick={() => window.location.href = '/#lead-capture'} size="lg" />
                <Button
                  onClick={() => window.location.href = '/#contact'}
                  variant="outline"
                  size="lg"
                  iconName="MessageCircle"
                  iconPosition="left"
                  iconSize={20}
                  className="border-primary/30 text-primary hover:bg-primary/10"
                >
                  Contact Us
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CaseStudiesPage;

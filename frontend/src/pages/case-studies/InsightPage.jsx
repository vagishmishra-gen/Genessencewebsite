import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import NotFound from '../NotFound';
import { insights } from './data/caseStudiesData';

const InsightPage = () => {
  const { id } = useParams();
  const insight = useMemo(() => insights.find(i => i.id === parseInt(id)), [id]);

  if (!insight) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <div className="max-w-4xl mx-auto px-6 lg:px-8 pt-24 text-center">
          <h1 className="text-2xl font-headline-bold mb-3">Insight not found</h1>
          <p className="text-muted-foreground mb-6">The insight you are looking for does not exist.</p>
          <Link to="/case-studies" className="text-primary hover:underline">Back to Case Studies</Link>
        </div>
      </div>
    );
  }

  // Get related insights from the same category
  const relatedInsights = insights
    .filter(i => i.id !== insight.id && i.category === insight.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero */}
      <section className="pt-20 pb-8 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <Breadcrumb currentPage="Case Studies" currentSection={insight.title} />
          <div className="mb-4 text-xs font-medium px-3 py-1 rounded-full inline-block bg-primary/20 text-primary">
            {insight.category}
          </div>
          <h1 className="text-3xl md:text-4xl font-headline-bold text-foreground mb-3">
            {insight.title}
          </h1>
          <div className="text-sm text-muted-foreground mb-6">
            By {insight.author} • {insight.readTime} • {insight.date}
          </div>
          <div className="h-64 w-full rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20">
            <img 
              src={insight.image} 
              alt={insight.title} 
              className="w-full h-full object-cover" 
              onError={(e) => { e.currentTarget.style.display = 'none'; }} 
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-10">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="prose prose-lg dark:prose-invert max-w-none"
          >
            <h2 className="text-2xl font-semibold text-foreground mb-4">Overview</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {insight.description}
            </p>
            
            <h2 className="text-2xl font-semibold text-foreground mb-4">Key Insights</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {insight.excerpt}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {insight.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-secondary/10 text-secondary text-sm rounded-full border border-secondary/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Insights */}
      {relatedInsights.length > 0 && (
        <section className="py-12 bg-muted/30">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <h3 className="text-xl font-semibold mb-6">Related Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedInsights.map((relatedInsight) => (
                <Link
                  key={relatedInsight.id}
                  to={`/insights/${relatedInsight.id}`}
                  className="group bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-40 bg-gradient-to-br from-secondary/10 to-accent/10 overflow-hidden">
                    <img
                      src={relatedInsight.image}
                      alt={relatedInsight.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-secondary/90 text-secondary-foreground text-xs font-medium rounded-full">
                        {relatedInsight.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {relatedInsight.title}
                    </h4>
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                      {relatedInsight.description}
                    </p>
                    <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                      <span>By {relatedInsight.author}</span>
                      <span>{relatedInsight.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back to Case Studies */}
      <section className="py-8">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <Link
            to="/case-studies"
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Case Studies
          </Link>
        </div>
      </section>
    </div>
  );
};

export default InsightPage;

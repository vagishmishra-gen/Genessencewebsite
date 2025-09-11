import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CaseStudyCard = ({ caseStudy, index }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      // Create a temporary link to download the PDF
      const link = document.createElement('a');
      link.href = caseStudy.pdfFile;
      link.download = `${caseStudy.title.replace(/\s+/g, '-').toLowerCase()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Analytics tracking (console.log for now)
      console.log(`Downloaded case study: ${caseStudy.title}`);
    } catch (error) {
      console.error('Error downloading PDF:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-card border border-primary/20 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group"
    >
      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-primary/10 to-secondary/10 overflow-hidden">
        <img
          src={caseStudy.image}
          alt={caseStudy.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end p-4" style={{ display: 'none' }}>
          <div className="flex items-center space-x-2">
            <Icon name="FileText" size={20} className="text-primary" />
            <span className="text-sm font-medium text-foreground">Case Study</span>
          </div>
        </div>
        
        {/* Industry Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-medium rounded-full">
            {caseStudy.industry}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
          {caseStudy.title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground text-sm leading-relaxed mb-4" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {caseStudy.description}
        </p>

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-3 bg-primary/5 rounded-lg">
            <div className="text-2xl font-bold text-primary">{caseStudy.metrics.timeReduction}</div>
            <div className="text-xs text-muted-foreground">Time Reduction</div>
          </div>
          <div className="text-center p-3 bg-secondary/5 rounded-lg">
            <div className="text-2xl font-bold text-secondary">{caseStudy.metrics.roi}</div>
            <div className="text-xs text-muted-foreground">ROI</div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {caseStudy.tags.map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className="px-2 py-1 bg-muted/50 text-muted-foreground text-xs rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Button */}
        <Button
          onClick={handleDownload}
          disabled={isDownloading}
          className="w-full"
          variant="outline"
          iconName={isDownloading ? "Loader2" : "Download"}
          iconPosition="left"
          iconSize={16}
        >
          {isDownloading ? 'Downloading...' : 'View Case Study'}
        </Button>
      </div>
    </motion.div>
  );
};

export default CaseStudyCard;

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const InsightCard = ({ insight, index }) => {

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-card border border-secondary/20 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
    >
      {/* Image */}
      <div className="relative h-40 bg-gradient-to-br from-secondary/10 to-accent/10 overflow-hidden">
        <img
          src={insight.image}
          alt={insight.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end p-4" style={{ display: 'none' }}>
          <div className="flex items-center space-x-2">
            <Icon name="BookOpen" size={20} className="text-secondary" />
            <span className="text-sm font-medium text-foreground">Insight</span>
          </div>
        </div>
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-secondary/90 text-secondary-foreground text-xs font-medium rounded-full">
            {insight.category}
          </span>
        </div>

        {/* Read Time */}
        <div className="absolute top-4 right-4">
          <span className="px-2 py-1 bg-background/80 text-muted-foreground text-xs font-medium rounded-md">
            {insight.readTime}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-secondary transition-colors" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {insight.title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground text-sm leading-relaxed mb-4" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {insight.description}
        </p>

        {/* Excerpt */}
        <p className="text-muted-foreground text-xs leading-relaxed mb-4" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {insight.excerpt}
        </p>

        {/* Author and Date */}
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
          <span>By {insight.author}</span>
          <span>{insight.date}</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {insight.tags.map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className="px-2 py-1 bg-secondary/10 text-secondary text-xs rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Button */}
        <Link
          to={`/insights/${insight.id}`}
          className="w-full"
        >
          <Button
            className="w-full border-primary/30 text-primary hover:bg-primary/10"
            variant="outline"
            iconName="ArrowRight"
            iconPosition="right"
            iconSize={16}
          >
            Read More
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};

export default InsightCard;

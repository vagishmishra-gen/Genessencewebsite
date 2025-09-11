import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = ({ currentPage, currentSection = null }) => {
  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
      <Link 
        to="/" 
        className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors"
      >
        <Icon name="Home" size={16} />
        <span>Home</span>
      </Link>
      
      <Icon name="ChevronRight" size={16} />
      
      <span className="text-foreground font-medium">
        {currentPage}
      </span>
      
      {currentSection && (
        <>
          <Icon name="ChevronRight" size={16} />
          <span className="text-muted-foreground">
            {currentSection}
          </span>
        </>
      )}
    </nav>
  );
};

export default Breadcrumb;

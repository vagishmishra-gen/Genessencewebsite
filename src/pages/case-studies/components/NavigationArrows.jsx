import React from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const NavigationArrows = ({ 
  onPrevious, 
  onNext, 
  canGoPrevious, 
  canGoNext, 
  className = "" 
}) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* Previous Button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={onPrevious}
          disabled={!canGoPrevious}
          variant="outline"
          size="sm"
          className={`w-10 h-10 p-0 ${
            canGoPrevious 
              ? 'hover:bg-primary/10 hover:border-primary/30' 
              : 'opacity-50 cursor-not-allowed'
          }`}
          aria-label="Previous items"
        >
          <Icon 
            name="ChevronLeft" 
            size={20} 
            className={canGoPrevious ? 'text-primary' : 'text-muted-foreground'} 
          />
        </Button>
      </motion.div>

      {/* Next Button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={onNext}
          disabled={!canGoNext}
          variant="outline"
          size="sm"
          className={`w-10 h-10 p-0 ${
            canGoNext 
              ? 'hover:bg-primary/10 hover:border-primary/30' 
              : 'opacity-50 cursor-not-allowed'
          }`}
          aria-label="Next items"
        >
          <Icon 
            name="ChevronRight" 
            size={20} 
            className={canGoNext ? 'text-primary' : 'text-muted-foreground'} 
          />
        </Button>
      </motion.div>
    </div>
  );
};

export default NavigationArrows;

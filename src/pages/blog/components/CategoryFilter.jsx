import React from 'react';

const CategoryFilter = ({ categories, active, onChange }) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
            active === cat
              ? 'bg-primary/10 text-primary border-primary/20 shadow-sm'
              : 'bg-muted/40 text-muted-foreground border-border hover:text-foreground hover:bg-muted/60'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;

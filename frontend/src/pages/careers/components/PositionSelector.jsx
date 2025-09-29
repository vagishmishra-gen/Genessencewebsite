import React from 'react';

const PositionSelector = ({ departments = [], active, onChange }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {['All', ...departments].map((dep) => (
        <button
          key={dep}
          onClick={() => onChange(dep)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
            active === dep
              ? 'bg-primary/10 text-primary border-primary/20'
              : 'bg-muted/40 text-muted-foreground border-border hover:text-foreground hover:bg-muted/60'
          }`}
        >
          {dep}
        </button>
      ))}
    </div>
  );
};

export default PositionSelector;

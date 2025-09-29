import React, { useEffect, useMemo, useState } from 'react';
import Icon from '../../../components/AppIcon';

const SearchBar = ({ value, onChange, suggestions = [] }) => {
  const [input, setInput] = useState(value || '');
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => setInput(value || ''), [value]);

  useEffect(() => {
    const id = setTimeout(() => onChange?.(input), 250);
    return () => clearTimeout(id);
  }, [input]);

  const hasSuggestions = useMemo(() => isFocused && !input && suggestions?.length > 0, [isFocused, input, suggestions]);

  return (
    <div className="relative max-w-md mx-auto w-full">
      <div className="relative">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search articles, topics, authors..."
          className="w-full px-4 py-3 pl-12 pr-4 rounded-xl border border-border/50 bg-background/80 backdrop-blur-sm focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground/60 transition-all duration-200 text-foreground"
          aria-label="Search blog posts"
        />
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/60">
          <Icon name="Search" size={16} />
        </div>
      </div>

      {hasSuggestions && (
        <div className="absolute left-0 right-0 mt-2 bg-card border border-border rounded-xl p-3 text-sm text-muted-foreground shadow-sm">
          <div className="mb-2 font-medium text-foreground">Popular topics</div>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((s, i) => (
              <button key={i} onClick={() => setInput(s)} className="px-2 py-1 rounded-md bg-muted/50 hover:bg-muted/70 text-foreground transition-colors">
                {s}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;

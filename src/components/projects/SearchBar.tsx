import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search projects...',
  className,
}) => {
  const [localVal, setLocalVal] = useState(value);

  // Sync internal state when external value changes (e.g., cleared by parent)
  useEffect(() => {
    setLocalVal(value);
  }, [value]);

  // Debounced notification to parent
  useEffect(() => {
    const handler = setTimeout(() => {
      if (localVal !== value) {
        onChange(localVal);
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [localVal, onChange, value]);

  const handleClear = () => {
    setLocalVal('');
    onChange('');
  };

  return (
    <div className={cn('relative w-full', className)}>
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground">
        <Search className="w-4 h-4" />
      </div>

      <input
        type="text"
        value={localVal}
        onChange={(e) => setLocalVal(e.target.value)}
        placeholder={placeholder}
        aria-label="Search projects by title, summary or tags"
        className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-border bg-card text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm"
      />

      {localVal && (
        <button
          onClick={handleClear}
          type="button"
          aria-label="Clear search query"
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

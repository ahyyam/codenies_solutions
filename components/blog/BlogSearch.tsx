'use client';

import { useState, useEffect, useRef } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@/lib/hooks/useDebounce";

interface BlogSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  debounceMs?: number;
  isLoading?: boolean;
  className?: string;
}

export function BlogSearch({
  onSearch,
  placeholder = "Search articles, authors, tags...",
  debounceMs = 300,
  isLoading = false,
  className = ""
}: BlogSearchProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Debounce the search query
  const debouncedQuery = useDebounce(query, debounceMs);

  // Call onSearch when debounced query changes
  useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery, onSearch]);

  const handleClear = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClear();
      inputRef.current?.blur();
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className={`relative transition-all duration-200 ${
        isFocused ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''
      }`}>
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
            className="w-full px-4 py-3 pl-12 pr-12 border border-border rounded-lg focus:outline-none focus:ring-0 focus:border-primary transition-all duration-200 bg-background text-foreground placeholder:text-muted-foreground"
            disabled={isLoading}
          />
          
          {/* Search Icon */}
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            {isLoading ? (
              <Loader2 className="w-4 h-4 text-muted-foreground animate-spin" />
            ) : (
              <Search className="w-4 h-4 text-muted-foreground" />
            )}
          </div>
          
          {/* Clear Button */}
          {query && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-muted text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
      
      {/* Search Suggestions/Results Count */}
      {query && debouncedQuery && (
        <div className="absolute top-full left-0 right-0 mt-2 p-3 bg-card border border-border rounded-lg shadow-lg z-10">
          <div className="text-sm text-muted-foreground">
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Searching...
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <span>Searching for "{debouncedQuery}"</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClear}
                  className="h-6 px-2 text-xs"
                >
                  Clear
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Advanced search component with filters
interface AdvancedSearchProps extends BlogSearchProps {
  showAdvanced?: boolean;
  onAdvancedToggle?: () => void;
  searchHistory?: string[];
  onHistorySelect?: (query: string) => void;
  popularSearches?: string[];
}

export function AdvancedBlogSearch({
  showAdvanced = false,
  onAdvancedToggle,
  searchHistory = [],
  onHistorySelect,
  popularSearches = [],
  ...searchProps
}: AdvancedSearchProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);

  return (
    <div className="space-y-4">
      <BlogSearch 
        {...searchProps}
        className={`${searchProps.className} ${showSuggestions ? 'z-20' : ''}`}
      />
      
      {/* Advanced Search Toggle */}
      {onAdvancedToggle && (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={onAdvancedToggle}
            className="text-muted-foreground hover:text-foreground"
          >
            {showAdvanced ? 'Hide' : 'Show'} advanced search
          </Button>
        </div>
      )}
      
      {/* Search Suggestions */}
      {(searchHistory.length > 0 || popularSearches.length > 0) && (
        <div className="space-y-4">
          {/* Search History */}
          {searchHistory.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Recent Searches</h4>
              <div className="flex flex-wrap gap-2">
                {searchHistory.slice(0, 5).map((query, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => onHistorySelect?.(query)}
                    className="text-xs border-border text-muted-foreground hover:text-foreground hover:border-primary"
                  >
                    {query}
                  </Button>
                ))}
              </div>
            </div>
          )}
          
          {/* Popular Searches */}
          {popularSearches.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Popular Searches</h4>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((query, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => onHistorySelect?.(query)}
                    className="text-xs border-border text-muted-foreground hover:text-foreground hover:border-primary"
                  >
                    {query}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
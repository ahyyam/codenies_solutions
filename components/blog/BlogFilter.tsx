'use client';

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Filter, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Category, Tag } from "@/lib/types/common";

interface BlogFilterProps {
  categories: Category[];
  tags: Tag[];
  selectedCategories: string[];
  selectedTags: string[];
  onCategoryChange: (categoryIds: string[]) => void;
  onTagChange: (tagIds: string[]) => void;
  onClearAll: () => void;
  className?: string;
}

export function BlogFilter({
  categories,
  tags,
  selectedCategories,
  selectedTags,
  onCategoryChange,
  onTagChange,
  onClearAll,
  className = ""
}: BlogFilterProps) {
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showAllTags, setShowAllTags] = useState(false);

  const displayCategories = showAllCategories ? categories : categories.slice(0, 6);
  const displayTags = showAllTags ? tags : tags.slice(0, 8);

  const hasActiveFilters = selectedCategories.length > 0 || selectedTags.length > 0;

  const handleCategoryToggle = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      onCategoryChange(selectedCategories.filter(id => id !== categoryId));
    } else {
      onCategoryChange([...selectedCategories, categoryId]);
    }
  };

  const handleTagToggle = (tagId: string) => {
    if (selectedTags.includes(tagId)) {
      onTagChange(selectedTags.filter(id => id !== tagId));
    } else {
      onTagChange([...selectedTags, tagId]);
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-muted-foreground" />
          <h3 className="font-semibold text-foreground">Filters</h3>
          {hasActiveFilters && (
            <Badge variant="secondary" className="ml-2">
              {selectedCategories.length + selectedTags.length}
            </Badge>
          )}
        </div>
        
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4 mr-1" />
            Clear all
          </Button>
        )}
      </div>

      {/* Categories Filter */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-foreground">Categories</h4>
        <div className="flex flex-wrap gap-2">
          {displayCategories.map((category) => {
            const isSelected = selectedCategories.includes(category.id);
            return (
              <Button
                key={category.id}
                variant={isSelected ? "default" : "outline"}
                size="sm"
                onClick={() => handleCategoryToggle(category.id)}
                className={`transition-all duration-200 ${
                  isSelected
                    ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                    : "border-border text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary"
                }`}
              >
                {category.name}
                {category.count !== undefined && (
                  <Badge 
                    variant="secondary" 
                    className={`ml-2 text-xs ${
                      isSelected ? "bg-primary-foreground/20 text-primary-foreground" : ""
                    }`}
                  >
                    {category.count}
                  </Badge>
                )}
              </Button>
            );
          })}
          
          {categories.length > 6 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAllCategories(!showAllCategories)}
              className="text-muted-foreground hover:text-foreground"
            >
              {showAllCategories ? "Show less" : `+${categories.length - 6} more`}
              <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${
                showAllCategories ? "rotate-180" : ""
              }`} />
            </Button>
          )}
        </div>
      </div>

      {/* Tags Filter */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-foreground">Tags</h4>
        <div className="flex flex-wrap gap-2">
          {displayTags.map((tag) => {
            const isSelected = selectedTags.includes(tag.id);
            return (
              <Badge
                key={tag.id}
                variant={isSelected ? "default" : "outline"}
                className={`cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                    : "border-border text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary"
                }`}
                onClick={() => handleTagToggle(tag.id)}
              >
                {tag.name}
                {tag.count !== undefined && (
                  <span className={`ml-1 text-xs ${
                    isSelected ? "text-primary-foreground/80" : "text-muted-foreground"
                  }`}>
                    ({tag.count})
                  </span>
                )}
              </Badge>
            );
          })}
          
          {tags.length > 8 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAllTags(!showAllTags)}
              className="text-muted-foreground hover:text-foreground h-6 px-2 text-xs"
            >
              {showAllTags ? "Show less" : `+${tags.length - 8} more`}
              <ChevronDown className={`w-3 h-3 ml-1 transition-transform ${
                showAllTags ? "rotate-180" : ""
              }`} />
            </Button>
          )}
        </div>
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="pt-4 border-t border-border">
          <h4 className="text-sm font-medium text-foreground mb-3">Active Filters</h4>
          <div className="space-y-2">
            {selectedCategories.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {selectedCategories.map((categoryId) => {
                  const category = categories.find(c => c.id === categoryId);
                  if (!category) return null;
                  
                  return (
                    <Badge
                      key={categoryId}
                      variant="secondary"
                      className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                      onClick={() => handleCategoryToggle(categoryId)}
                    >
                      {category.name}
                      <X className="w-3 h-3 ml-1" />
                    </Badge>
                  );
                })}
              </div>
            )}
            
            {selectedTags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {selectedTags.map((tagId) => {
                  const tag = tags.find(t => t.id === tagId);
                  if (!tag) return null;
                  
                  return (
                    <Badge
                      key={tagId}
                      variant="outline"
                      className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground hover:border-destructive"
                      onClick={() => handleTagToggle(tagId)}
                    >
                      {tag.name}
                      <X className="w-3 h-3 ml-1" />
                    </Badge>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
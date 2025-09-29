'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Filter, 
  X, 
  ChevronDown, 
  Search,
  Grid,
  List
} from 'lucide-react';
import { ProjectCategory } from '@/lib/types/project';
import { Technology, ProjectStatus } from '@/lib/types/common';

interface ProjectFilterProps {
  categories: ProjectCategory[];
  technologies: Technology[];
  selectedCategories: string[];
  selectedTechnologies: string[];
  selectedStatus?: ProjectStatus[];
  searchQuery: string;
  viewMode: 'grid' | 'list';
  onCategoryChange: (categoryIds: string[]) => void;
  onTechnologyChange: (technologyIds: string[]) => void;
  onStatusChange: (statuses: ProjectStatus[]) => void;
  onSearchChange: (query: string) => void;
  onViewModeChange: (mode: 'grid' | 'list') => void;
  onClearAll: () => void;
  className?: string;
}

export function ProjectFilter({
  categories,
  technologies,
  selectedCategories,
  selectedTechnologies,
  selectedStatus = [],
  searchQuery,
  viewMode,
  onCategoryChange,
  onTechnologyChange,
  onStatusChange,
  onSearchChange,
  onViewModeChange,
  onClearAll,
  className = ''
}: ProjectFilterProps) {
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showAllTechnologies, setShowAllTechnologies] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const visibleCategories = showAllCategories ? categories : categories.slice(0, 6);
  const visibleTechnologies = showAllTechnologies ? technologies : technologies.slice(0, 8);

  const hasActiveFilters = selectedCategories.length > 0 || 
                          selectedTechnologies.length > 0 || 
                          selectedStatus.length > 0 ||
                          searchQuery.length > 0;

  const handleCategoryToggle = (categoryId: string) => {
    const newSelection = selectedCategories.includes(categoryId)
      ? selectedCategories.filter(id => id !== categoryId)
      : [...selectedCategories, categoryId];
    onCategoryChange(newSelection);
  };

  const handleTechnologyToggle = (technologyId: string) => {
    const newSelection = selectedTechnologies.includes(technologyId)
      ? selectedTechnologies.filter(id => id !== technologyId)
      : [...selectedTechnologies, technologyId];
    onTechnologyChange(newSelection);
  };

  const handleStatusToggle = (status: ProjectStatus) => {
    const newSelection = selectedStatus.includes(status)
      ? selectedStatus.filter(s => s !== status)
      : [...selectedStatus, status];
    onStatusChange(newSelection);
  };

  const statusOptions: { value: ProjectStatus; label: string; color: string }[] = [
    { value: 'active', label: 'Active', color: 'bg-green-100 text-green-800' },
    { value: 'completed', label: 'Completed', color: 'bg-blue-100 text-blue-800' },
    { value: 'maintenance', label: 'Maintenance', color: 'bg-yellow-100 text-yellow-800' }
  ];

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Search and View Mode Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* View Mode and Filter Toggle */}
        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <div className="flex border border-border rounded-lg overflow-hidden">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('grid')}
              className="rounded-none"
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('list')}
              className="rounded-none"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>

          {/* Filter Toggle */}
          <Button
            variant={isFilterOpen ? 'default' : 'outline'}
            size="sm"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="relative"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
            {hasActiveFilters && (
              <Badge className="ml-2 bg-primary text-primary-foreground text-xs">
                {selectedCategories.length + selectedTechnologies.length + selectedStatus.length}
              </Badge>
            )}
          </Button>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          
          {/* Category filters */}
          {selectedCategories.map((categoryId, index) => {
            const category = categories.find(c => c.id === categoryId);
            return category ? (
              <Badge
                key={category.id || `selected-category-${index}`}
                variant="secondary"
                className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                onClick={() => handleCategoryToggle(categoryId)}
              >
                {category.name}
                <X className="w-3 h-3 ml-1" />
              </Badge>
            ) : null;
          })}

          {/* Technology filters */}
          {selectedTechnologies.map((techId, index) => {
            const tech = technologies.find(t => t.id === techId);
            return tech ? (
              <Badge
                key={tech.id || `selected-tech-${index}`}
                variant="secondary"
                className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                onClick={() => handleTechnologyToggle(techId)}
              >
                {tech.name}
                <X className="w-3 h-3 ml-1" />
              </Badge>
            ) : null;
          })}

          {/* Status filters */}
          {selectedStatus.map((status, index) => (
            <Badge
              key={`selected-status-${status}-${index}`}
              variant="secondary"
              className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
              onClick={() => handleStatusToggle(status)}
            >
              {status}
              <X className="w-3 h-3 ml-1" />
            </Badge>
          ))}

          {/* Clear all button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className="text-muted-foreground hover:text-foreground"
          >
            Clear all
          </Button>
        </div>
      )}

      {/* Filter Panel */}
      {isFilterOpen && (
        <div className="border border-border rounded-lg p-4 bg-card space-y-6">
          {/* Categories */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {visibleCategories.map((category, index) => {
                const isSelected = selectedCategories.includes(category.id);
                return (
                  <Button
                    key={category.id || `category-${index}`}
                    variant="outline"
                    size="sm"
                    onClick={() => handleCategoryToggle(category.id)}
                    className={`transition-colors ${
                      isSelected
                        ? "bg-primary hover:bg-primary/90 text-primary-foreground border-primary"
                        : "border-border text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary"
                    }`}
                  >
                    {category.name}
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
                  {showAllCategories ? 'Show less' : `+${categories.length - 6} more`}
                  <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${showAllCategories ? 'rotate-180' : ''}`} />
                </Button>
              )}
            </div>
          </div>

          {/* Technologies */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {visibleTechnologies.map((tech, index) => {
                const isSelected = selectedTechnologies.includes(tech.id);
                return (
                  <Button
                    key={tech.id || `tech-${index}`}
                    variant="outline"
                    size="sm"
                    onClick={() => handleTechnologyToggle(tech.id)}
                    className={`transition-colors ${
                      isSelected
                        ? "bg-primary hover:bg-primary/90 text-primary-foreground border-primary"
                        : "border-border text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary"
                    }`}
                  >
                    {tech.name}
                  </Button>
                );
              })}
              {technologies.length > 8 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAllTechnologies(!showAllTechnologies)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {showAllTechnologies ? 'Show less' : `+${technologies.length - 8} more`}
                  <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${showAllTechnologies ? 'rotate-180' : ''}`} />
                </Button>
              )}
            </div>
          </div>

          {/* Project Status */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Status</h3>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map(({ value, label, color }, index) => {
                const isSelected = selectedStatus.includes(value);
                return (
                  <Button
                    key={`status-${value}-${index}`}
                    variant="outline"
                    size="sm"
                    onClick={() => handleStatusToggle(value)}
                    className={`transition-colors ${
                      isSelected
                        ? "bg-primary hover:bg-primary/90 text-primary-foreground border-primary"
                        : "border-border text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary"
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full mr-2 ${color.split(' ')[0]}`} />
                    {label}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
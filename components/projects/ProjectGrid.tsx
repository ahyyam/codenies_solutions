'use client';

import { useState, useEffect, useMemo } from 'react';
import { ProjectCard } from './ProjectCard';
import { Project } from '@/lib/types/project';

interface ProjectGridProps {
  projects: Project[];
  onProjectSelect?: (project: Project) => void;
  loading?: boolean;
  className?: string;
}

export function ProjectGrid({ 
  projects, 
  onProjectSelect, 
  loading = false, 
  className = '' 
}: ProjectGridProps) {
  const [columns, setColumns] = useState(3);

  // Responsive column calculation
  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setColumns(1); // Mobile: 1 column
      } else if (width < 1024) {
        setColumns(2); // Tablet: 2 columns
      } else if (width < 1536) {
        setColumns(3); // Desktop: 3 columns
      } else {
        setColumns(4); // Large desktop: 4 columns
      }
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  // Distribute projects across columns for masonry layout
  const columnProjects = useMemo(() => {
    const cols: Project[][] = Array.from({ length: columns }, () => []);
    
    projects.forEach((project, index) => {
      const columnIndex = index % columns;
      cols[columnIndex].push(project);
    });
    
    return cols;
  }, [projects, columns]);

  if (loading) {
    return (
      <div className={`grid gap-6 ${className}`} 
           style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {Array.from({ length: columns }).map((_, colIndex) => (
          <div key={`skeleton-col-${colIndex}`} className="space-y-6">
            {Array.from({ length: Math.ceil(6 / columns) }).map((_, cardIndex) => (
              <ProjectCardSkeleton key={`skeleton-${colIndex}-${cardIndex}`} />
            ))}
          </div>
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-lg flex items-center justify-center">
          <svg
            className="w-8 h-8 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No Projects Found</h3>
        <p className="text-muted-foreground">
          No projects match your current filters. Try adjusting your search criteria.
        </p>
      </div>
    );
  }

  return (
    <div 
      className={`grid gap-6 ${className}`}
      style={{ 
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        alignItems: 'start'
      }}
    >
      {columnProjects.map((columnProjects, colIndex) => (
        <div key={`column-${colIndex}`} className="space-y-6">
          {columnProjects.map((project, projectIndex) => (
            <ProjectCard
              key={project.id || `project-${colIndex}-${projectIndex}`}
              project={project}
              onViewDetails={onProjectSelect}
              className="w-full"
            />
          ))}
        </div>
      ))}
    </div>
  );
}

// Skeleton component for loading state
function ProjectCardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="aspect-video bg-muted" />
      
      <div className="p-4 space-y-4">
        {/* Category and status badges */}
        <div className="flex justify-between">
          <div className="h-5 bg-muted rounded w-20" />
          <div className="h-5 bg-muted rounded w-16" />
        </div>
        
        {/* Title */}
        <div className="h-6 bg-muted rounded w-3/4" />
        
        {/* Description */}
        <div className="space-y-2">
          <div className="h-4 bg-muted rounded w-full" />
          <div className="h-4 bg-muted rounded w-2/3" />
        </div>
        
        {/* Technologies */}
        <div className="flex gap-2">
          <div className="h-5 bg-muted rounded w-16" />
          <div className="h-5 bg-muted rounded w-20" />
          <div className="h-5 bg-muted rounded w-14" />
        </div>
        
        {/* Meta info */}
        <div className="flex justify-between">
          <div className="h-4 bg-muted rounded w-20" />
          <div className="h-4 bg-muted rounded w-24" />
        </div>
        
        {/* Button */}
        <div className="h-9 bg-muted rounded w-full" />
      </div>
    </div>
  );
}

// Responsive grid classes for different breakpoints
export const gridResponsiveClasses = {
  mobile: 'grid-cols-1',
  tablet: 'sm:grid-cols-2',
  desktop: 'lg:grid-cols-3',
  large: 'xl:grid-cols-4'
};
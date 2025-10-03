'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { ProjectImage } from '@/components/common/OptimizedImage';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  ExternalLink, 
  Github as GitHubIcon, 
  Calendar, 
  Users, 
  ArrowRight,
  Eye,
  Star
} from 'lucide-react';
import { Project } from '@/lib/types/project';

interface ProjectCardProps {
  project: Project;
  onViewDetails?: (project: Project) => void;
  className?: string;
}

export function ProjectCard({ project, onViewDetails, className = '' }: ProjectCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const primaryImage = project.images?.[0]?.url || '/placeholder.jpg';
  const hasLiveLink = project.links?.live && project.links.live !== '#';
  const hasGithubLink = project.links?.github && project.links.github !== '#';

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(project);
    }
  };

  return (
    <div 
      className={`project-card group relative ${className}`}
    >
      {/* Featured Badge */}
      {project.featured && (
        <div className="absolute top-3 left-3 z-10">
          <Badge className="bg-primary text-primary-foreground">
            <Star className="w-3 h-3 mr-1" />
            Featured
          </Badge>
        </div>
      )}

      {/* Project Image */}
      <div className="project-card-image bg-muted">
        {!imageError ? (
          <ProjectImage
            src={primaryImage}
            alt={project.title}
            fill
            className={`object-cover transition-all duration-500 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            lazy={true}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <div className="w-12 h-12 mx-auto mb-2 bg-primary/10 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-primary" />
              </div>
              <p className="text-sm">Preview</p>
            </div>
          </div>
        )}

        {/* Overlay with quick actions */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          {hasLiveLink && (
            <Button
              size="sm"
              variant="secondary"
              className="bg-white/90 text-black hover:bg-white"
              asChild
            >
              <Link href={project.links.live!} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-1" />
                Live
              </Link>
            </Button>
          )}
          {hasGithubLink && (
            <Button
              size="sm"
              variant="secondary"
              className="bg-white/90 text-black hover:bg-white"
              asChild
            >
              <Link href={project.links.github!} target="_blank" rel="noopener noreferrer">
                <GitHubIcon className="w-4 h-4 mr-1" />
                Code
              </Link>
            </Button>
          )}
          <Button
            size="sm"
            variant="secondary"
            className="bg-white/90 text-black hover:bg-white"
            onClick={handleViewDetails}
          >
            <Eye className="w-4 h-4 mr-1" />
            Details
          </Button>
        </div>
      </div>

      <div className="project-card-content">
        {/* Category and Status */}
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className="text-xs">
            {project.category.name}
          </Badge>
          <Badge 
            variant={project.status === 'completed' ? 'default' : 'secondary'}
            className="text-xs"
          >
            {project.status === 'completed' ? 'Completed' : 
             project.status === 'active' ? 'Active' : 'Maintenance'}
          </Badge>
        </div>

        {/* Title and Description */}
        <h3 className="project-card-title line-clamp-2 group-hover:text-accent transition-colors">
          {project.title}
        </h3>
        
        <p className="project-card-description text-sm mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-1 mb-4">
          {project.technologies.slice(0, 3).map((tech, index) => (
            <Badge 
              key={tech.id || `tech-${index}`} 
              variant="secondary" 
              className="text-xs bg-primary/10 text-primary hover:bg-primary/20"
            >
              {tech.name}
            </Badge>
          ))}
          {project.technologies.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{project.technologies.length - 3}
            </Badge>
          )}
        </div>

        {/* Project Meta */}
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{project.timeline?.duration || 'Not specified'}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            <span>{project.team?.length || 0} members</span>
          </div>
        </div>

        {/* Client */}
        {project.settings?.showClient && project.client && (
          <div className="text-xs text-muted-foreground mb-4">
            Client: <span className="text-foreground font-medium">{project.client.name}</span>
          </div>
        )}

        {/* Results Preview */}
        {project.results && project.results.length > 0 && (
          <div className="mb-4">
            <div className="text-xs text-muted-foreground mb-2">Key Results:</div>
            <div className="space-y-1">
              {project.results.slice(0, 2).map((result, index) => (
                <div key={result.id || `result-${index}`} className="text-xs">
                  <span className="font-medium text-primary">{result.value}</span>
                  <span className="text-muted-foreground ml-1">{result.metric}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* View Details Button */}
        <Button
          variant="ghost"
          size="sm"
          className="w-full group/btn hover:bg-primary/10 hover:text-primary"
          onClick={handleViewDetails}
        >
          View Case Study
          <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
}
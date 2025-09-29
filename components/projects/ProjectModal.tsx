'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  X, 
  ExternalLink, 
  Github as GitHubIcon, 
  Calendar, 
  Users, 
  Building, 
  Target,
  CheckCircle,
  ArrowRight,
  Star,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Project } from '@/lib/types/project';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!isOpen || !project) return null;

  const hasMultipleImages = project.images.length > 1;
  const hasLiveLink = project.links?.live && project.links.live !== '#';
  const hasGithubLink = project.links?.github && project.links.github !== '#';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-background rounded-lg shadow-xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[90vh]">
          {/* Header with Image Gallery */}
          <div className="relative">
            {project.images.length > 0 && (
              <div className="relative aspect-video bg-muted">
                <Image
                  src={project.images[activeImageIndex]?.url || '/placeholder.jpg'}
                  alt={project.images[activeImageIndex]?.alt || project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 800px"
                />
                
                {/* Image Navigation */}
                {hasMultipleImages && (
                  <>
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                      {project.images.map((image, index) => (
                        <button
                          key={image.id || `image-indicator-${index}`}
                          onClick={() => setActiveImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            index === activeImageIndex ? 'bg-white' : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                    
                    {/* Previous/Next buttons */}
                    <button
                      onClick={() => setActiveImageIndex(prev => 
                        prev === 0 ? project.images.length - 1 : prev - 1
                      )}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                    >
                      <ArrowRight className="w-4 h-4 rotate-180" />
                    </button>
                    <button
                      onClick={() => setActiveImageIndex(prev => 
                        prev === project.images.length - 1 ? 0 : prev + 1
                      )}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </>
                )}

                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary text-primary-foreground">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Title and Status */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">{project.title}</h2>
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="outline">{project.category.name}</Badge>
                  <Badge 
                    variant={project.status === 'completed' ? 'default' : 'secondary'}
                    className={
                      project.status === 'completed' ? 'bg-green-100 text-green-800' :
                      project.status === 'active' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }
                  >
                    {project.status === 'completed' ? 'Completed' : 
                     project.status === 'active' ? 'Active' : 'Maintenance'}
                  </Badge>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                {hasLiveLink && (
                  <Button asChild>
                    <Link href={project.links.live!} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Live
                    </Link>
                  </Button>
                )}
                {hasGithubLink && (
                  <Button variant="outline" asChild>
                    <Link href={project.links.github!} target="_blank" rel="noopener noreferrer">
                      <GitHubIcon className="w-4 h-4 mr-2" />
                      Code
                    </Link>
                  </Button>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <p className="text-muted-foreground leading-relaxed">
                {project.longDescription || project.description}
              </p>
            </div>

            {/* Project Meta Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Client */}
              {project.settings.showClient && (
                <Card>
                  <CardContent className="p-4 text-center">
                    <Building className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <div className="text-sm text-muted-foreground">Client</div>
                    <div className="font-semibold">{project.client.name}</div>
                    <div className="text-xs text-muted-foreground">{project.client.industry}</div>
                  </CardContent>
                </Card>
              )}

              {/* Timeline */}
              {project.settings.showTimeline && (
                <Card>
                  <CardContent className="p-4 text-center">
                    <Calendar className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <div className="text-sm text-muted-foreground">Duration</div>
                    <div className="font-semibold">{project.timeline?.duration || 'Not specified'}</div>
                    <div className="text-xs text-muted-foreground">
                      {project.timeline?.startDate?.toLocaleDateString() || 'No date'}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Team */}
              {project.settings.showTeam && (
                <Card>
                  <CardContent className="p-4 text-center">
                    <Users className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <div className="text-sm text-muted-foreground">Team Size</div>
                    <div className="font-semibold">{project.team.length} members</div>
                    <div className="text-xs text-muted-foreground">
                      {project.team.slice(0, 2).map(member => member.name).join(', ')}
                      {project.team.length > 2 && ` +${project.team.length - 2}`}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Status */}
              <Card>
                <CardContent className="p-4 text-center">
                  <Clock className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="text-sm text-muted-foreground">Status</div>
                  <div className="font-semibold capitalize">{project.status}</div>
                  <div className="text-xs text-muted-foreground">
                    Updated {project.updatedAt.toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Technologies */}
            <div>
              <h3 className="font-semibold text-foreground mb-3">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <Badge 
                    key={tech.id || `tech-${index}`} 
                    variant="secondary"
                    className="bg-primary/10 text-primary hover:bg-primary/20"
                  >
                    {tech.name}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Key Features */}
            {project.features.length > 0 && (
              <div>
                <h3 className="font-semibold text-foreground mb-3">Key Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {project.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Results */}
            {project.settings.showResults && project.results.length > 0 && (
              <div>
                <h3 className="font-semibold text-foreground mb-3">Results & Impact</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {project.results.map((result, index) => (
                    <Card key={result.id || `result-${index}`}>
                      <CardContent className="p-4 text-center">
                        <Target className="w-6 h-6 mx-auto mb-2 text-primary" />
                        <div className="text-2xl font-bold text-primary mb-1">{result.value}</div>
                        <div className="text-sm font-medium text-foreground mb-1">{result.metric}</div>
                        <div className="text-xs text-muted-foreground">{result.description}</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Challenges */}
            {project.challenges.length > 0 && (
              <div>
                <h3 className="font-semibold text-foreground mb-3">Challenges & Solutions</h3>
                <div className="space-y-4">
                  {project.challenges.map((challenge, index) => (
                    <Card key={challenge.id || `challenge-${index}`}>
                      <CardContent className="p-4">
                        <h4 className="font-medium text-foreground mb-2">{challenge.title}</h4>
                        <p className="text-sm text-muted-foreground mb-3">{challenge.description}</p>
                        <div className="bg-primary/5 p-3 rounded-lg">
                          <div className="text-sm font-medium text-primary mb-1">Solution:</div>
                          <div className="text-sm text-muted-foreground">{challenge.solution}</div>
                          {challenge.impact && (
                            <div className="text-xs text-muted-foreground mt-2 italic">
                              Impact: {challenge.impact}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Contact CTA */}
            {project.settings.allowInquiries && (
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold text-foreground mb-2">Interested in Similar Results?</h3>
                  <p className="text-muted-foreground mb-4">
                    Let's discuss how we can help your business achieve similar success.
                  </p>
                  <Button asChild>
                    <Link href="/consultation">
                      Get Free Consultation
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
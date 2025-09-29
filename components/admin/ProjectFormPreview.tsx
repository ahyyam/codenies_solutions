'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProjectStatus } from '@/lib/types/common';

interface ProjectFormData {
  title: string;
  slug: string;
  description: string;
  category: string;
  technologies: string;
  client: string;
  timeline: string;
  status: ProjectStatus;
  featured: boolean;
  images: string[];
}

interface ProjectFormPreviewProps {
  formData: ProjectFormData;
}

export function ProjectFormPreview({ formData }: ProjectFormPreviewProps) {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">{formData.title}</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <Badge variant="outline">{formData.category}</Badge>
            <span>•</span>
            <span>{formData.client || 'No client'}</span>
            <span>•</span>
            <span>{formData.timeline}</span>
            <span>•</span>
            <Badge variant={formData.status === 'completed' ? 'default' : 'secondary'}>
              {formData.status}
            </Badge>
            {formData.featured && (
              <>
                <span>•</span>
                <Badge variant="secondary">Featured</Badge>
              </>
            )}
          </div>
        </div>

        {formData.images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {formData.images.map((image, index) => (
              <img 
                key={index}
                src={image} 
                alt={`${formData.title} ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />
            ))}
          </div>
        )}

        <p className="text-lg">{formData.description}</p>

        {formData.technologies && (
          <div>
            <h3 className="font-semibold mb-2">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {formData.technologies.split(',').map((tech, index) => (
                <Badge key={index} variant="outline">{tech.trim()}</Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
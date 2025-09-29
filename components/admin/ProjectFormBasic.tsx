'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
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
}

interface ProjectFormBasicProps {
  formData: ProjectFormData;
  updateField: (field: keyof ProjectFormData, value: any) => void;
  validateField: (field: keyof ProjectFormData, value: any) => Promise<any>;
  errors: Record<string, string[]>;
  isEditing?: boolean;
}

export function ProjectFormBasic({ 
  formData, 
  updateField, 
  validateField, 
  errors, 
  isEditing = false 
}: ProjectFormBasicProps) {
  return (
    <div className="lg:col-span-2 space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          {/* Title */}
          <div>
            <Label htmlFor="title">Title *</Label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) => updateField('title', e.target.value)}
              onBlur={() => validateField('title', formData.title)}
              className="w-full px-3 py-2 border border-border rounded-md bg-background"
              placeholder="Enter project title..."
            />
            {errors.title && (
              <p className="text-sm text-red-600 mt-1">{errors.title[0]}</p>
            )}
          </div>

          {/* Slug */}
          <div>
            <Label htmlFor="slug">URL Slug</Label>
            <input
              id="slug"
              type="text"
              value={formData.slug}
              onChange={(e) => updateField('slug', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-background"
              placeholder="url-friendly-slug"
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description *</Label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => updateField('description', e.target.value)}
              onBlur={() => validateField('description', formData.description)}
              className="w-full px-3 py-2 border border-border rounded-md bg-background"
              rows={5}
              placeholder="Describe your project..."
            />
            {errors.description && (
              <p className="text-sm text-red-600 mt-1">{errors.description[0]}</p>
            )}
          </div>

          {/* Technologies */}
          <div>
            <Label htmlFor="technologies">Technologies *</Label>
            <input
              id="technologies"
              type="text"
              value={formData.technologies}
              onChange={(e) => updateField('technologies', e.target.value)}
              onBlur={() => validateField('technologies', formData.technologies)}
              className="w-full px-3 py-2 border border-border rounded-md bg-background"
              placeholder="React, Node.js, MongoDB"
            />
            {errors.technologies && (
              <p className="text-sm text-red-600 mt-1">{errors.technologies[0]}</p>
            )}
            <p className="text-sm text-muted-foreground mt-1">
              Separate technologies with commas
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
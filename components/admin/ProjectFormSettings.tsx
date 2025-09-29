'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
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
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
}

interface ProjectFormSettingsProps {
  formData: ProjectFormData;
  updateField: (field: keyof ProjectFormData, value: any) => void;
  validateField: (field: keyof ProjectFormData, value: any) => Promise<any>;
  errors: Record<string, string[]>;
  isSubmitting: boolean;
  validateAll: () => Promise<any>;
  onSubmit: (status: ProjectStatus) => void;
}

export function ProjectFormSettings({ 
  formData, 
  updateField, 
  validateField, 
  errors, 
  isSubmitting, 
  validateAll, 
  onSubmit 
}: ProjectFormSettingsProps) {
  return (
    <div className="space-y-6">
      {/* Project Settings */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Project Settings</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="status">Status</Label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) => updateField('status', e.target.value as ProjectStatus)}
              className="w-full px-3 py-2 border border-border rounded-md bg-background"
            >
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
          <div>
            <Label htmlFor="category">Category *</Label>
            <input
              id="category"
              type="text"
              value={formData.category}
              onChange={(e) => updateField('category', e.target.value)}
              onBlur={() => validateField('category', formData.category)}
              className="w-full px-3 py-2 border border-border rounded-md bg-background"
              placeholder="e.g., Web Development, Mobile App"
            />
            {errors.category && (
              <p className="text-sm text-red-600 mt-1">{errors.category[0]}</p>
            )}
          </div>
          <div>
            <Label htmlFor="client">Client</Label>
            <input
              id="client"
              type="text"
              value={formData.client}
              onChange={(e) => updateField('client', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-background"
              placeholder="Client name"
            />
          </div>
          <div>
            <Label htmlFor="timeline">Timeline</Label>
            <input
              id="timeline"
              type="text"
              value={formData.timeline}
              onChange={(e) => updateField('timeline', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-background"
              placeholder="e.g., 3 months, Q1 2024"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              id="featured"
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => updateField('featured', e.target.checked)}
              className="rounded border-border"
            />
            <Label htmlFor="featured">Featured project</Label>
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <Button
            onClick={() => onSubmit('active')}
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? 'Saving...' : 'Save Project'}
          </Button>
        </div>
      </Card>

      {/* SEO Settings */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">SEO Settings</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="seoTitle">SEO Title</Label>
            <input
              id="seoTitle"
              type="text"
              value={formData.seoTitle}
              onChange={(e) => updateField('seoTitle', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-background"
              placeholder="SEO optimized title..."
            />
          </div>
          <div>
            <Label htmlFor="seoDescription">SEO Description</Label>
            <textarea
              id="seoDescription"
              value={formData.seoDescription}
              onChange={(e) => updateField('seoDescription', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-background"
              rows={3}
              placeholder="SEO meta description..."
            />
            <p className="text-sm text-muted-foreground mt-1">
              {formData.seoDescription.length}/160 characters
            </p>
          </div>
          <div>
            <Label htmlFor="seoKeywords">SEO Keywords</Label>
            <input
              id="seoKeywords"
              type="text"
              value={formData.seoKeywords}
              onChange={(e) => updateField('seoKeywords', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-background"
              placeholder="keyword1, keyword2, keyword3"
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
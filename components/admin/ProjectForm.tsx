'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useForm } from '@/lib/hooks/useForm';
import { useAutoSave } from '@/lib/hooks/useAutoSave';
import { useValidation } from '@/lib/hooks/useValidation';
import { Project } from '@/lib/types/project';
import { ProjectStatus } from '@/lib/types/common';
import { generateUUID } from '@/lib/utils/uuid';
import { ProjectFormBasic } from './ProjectFormBasic';
import { ProjectFormImages } from './ProjectFormImages';
import { ProjectFormSettings } from './ProjectFormSettings';
import { ProjectFormPreview } from './ProjectFormPreview';

interface ProjectFormProps {
  project?: Partial<Project>;
  onSave: (project: Partial<Project>) => Promise<void>;
  onCancel: () => void;
  isEditing?: boolean;
}

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
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
}

export function ProjectForm({ project, onSave, onCancel, isEditing = false }: ProjectFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  const initialData: ProjectFormData = {
    title: project?.title || '',
    slug: project?.slug || '',
    description: project?.description || '',
    category: project?.category?.name || '',
    technologies: project?.technologies?.map(t => t.name).join(', ') || '',
    client: project?.client?.name || '',
    timeline: project?.timeline?.duration || '',
    status: project?.status || 'active',
    featured: project?.featured || false,
    images: project?.images?.map(img => img.url) || [],
    seoTitle: project?.seo?.title || '',
    seoDescription: project?.seo?.description || '',
    seoKeywords: project?.seo?.keywords?.join(', ') || '',
  };

  const { values: formData, setFieldValue: updateField, reset: resetForm, isDirty } = useForm({
    initialValues: initialData
  });

  const validationRules = [
    { field: 'title', validator: (value: string) => value.length >= 3, message: 'Title must be at least 3 characters' },
    { field: 'description', validator: (value: string) => value.length >= 10, message: 'Description must be at least 10 characters' },
    { field: 'category', validator: (value: string) => value.length > 0, message: 'Category is required' },
    { field: 'technologies', validator: (value: string) => value.length > 0, message: 'At least one technology is required' },
  ];

  const { errors, validateField, validateAll } = useValidation({
    initialValues: formData,
    validationRules: validationRules.reduce((acc, rule) => {
      acc[rule.field] = {
        required: true,
        customValidator: rule.validator
      };
      return acc;
    }, {} as any)
  });

  // Auto-save functionality
  const { lastSaved, saveStatus } = useAutoSave({
    data: formData,
    saveFunction: async (data: ProjectFormData) => {
      if (isDirty && data.title && data.description) {
        await onSave({
          ...convertFormDataToProject(data),
          status: 'active'
        });
      }
    },
    interval: 5000,
    enabled: isDirty
  });

  // Generate slug from title
  useEffect(() => {
    if (formData.title && !isEditing) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      updateField('slug', slug);
    }
  }, [formData.title, isEditing, updateField]);

  const convertFormDataToProject = (data: ProjectFormData): Partial<Project> => {
    return {
      id: project?.id || generateUUID(),
      title: data.title,
      slug: data.slug,
      description: data.description,
      category: { id: generateUUID(), name: data.category, slug: data.category.toLowerCase().replace(/\s+/g, '-') },
      technologies: data.technologies.split(',').map(tech => ({ 
        id: generateUUID(), 
        name: tech.trim(),
        category: 'other' as const,
        icon: '',
        color: ''
      })).filter(tech => tech.name),
      client: data.client ? { 
        id: generateUUID(), 
        name: data.client, 
        industry: '',
        logo: '',
        website: ''
      } : undefined,
      timeline: {
        startDate: new Date(),
        endDate: new Date(),
        duration: data.timeline,
        phases: []
      },
      team: [],
      status: data.status,
      featured: data.featured,
      images: data.images.map(url => ({ 
        id: generateUUID(), 
        url, 
        alt: data.title,
        width: 800,
        height: 600
      })),
      links: {},
      createdAt: project?.createdAt || new Date(),
      updatedAt: new Date(),
      seo: {
        title: data.seoTitle || data.title,
        description: data.seoDescription || data.description,
        keywords: data.seoKeywords.split(',').map(k => k.trim()).filter(Boolean),
        ogImage: data.images[0],
      },
      settings: {
        showClient: true,
        showTeam: true,
        showTimeline: true,
        showResults: true,
        allowInquiries: true
      },
    };
  };

  const handleSubmit = async (status: ProjectStatus) => {
    const validationResult = await validateAll();
    if (!validationResult.isValid) return;

    setIsSubmitting(true);
    try {
      const projectData = convertFormDataToProject({ ...formData, status });
      await onSave(projectData);
    } catch (error) {
      console.error('Failed to save project:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            {isEditing ? 'Edit Project' : 'Create New Project'}
          </h2>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
            {isDirty && (
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                Unsaved changes
              </span>
            )}
            {lastSaved && (
              <span>Last saved: {lastSaved.toLocaleTimeString()}</span>
            )}
            <span>Status: {saveStatus}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setPreviewMode(!previewMode)}>
            {previewMode ? 'Edit' : 'Preview'}
          </Button>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </div>

      {previewMode ? (
        <ProjectFormPreview formData={formData} />
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <ProjectFormBasic
              formData={formData}
              updateField={updateField}
              validateField={validateField}
              errors={errors}
              isEditing={isEditing}
            />
            
            <div className="lg:col-span-1">
              <ProjectFormImages
                images={formData.images}
                updateField={(field: string, value: any) => updateField(field as keyof ProjectFormData, value)}
                imageUploading={imageUploading}
                setImageUploading={setImageUploading}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2"></div>
            <ProjectFormSettings
              formData={formData}
              updateField={updateField}
              validateField={validateField}
              errors={errors}
              isSubmitting={isSubmitting}
              validateAll={validateAll}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      )}
    </div>
  );
}
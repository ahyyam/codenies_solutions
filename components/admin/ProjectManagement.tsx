'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useProjectManagement } from '@/lib/hooks/useProjectManagement';
import { useAdminLayout } from './AdminLayout';
import { ProjectForm } from './ProjectForm';
import { Project } from '@/lib/types/project';

interface ProjectManagementProps {
  onAddProject?: (project: Partial<Project>) => void;
  onRemoveProject?: (id: string) => void;
}

export function ProjectManagement({ onAddProject, onRemoveProject }: ProjectManagementProps) {
  const { setIsLoading } = useAdminLayout();
  const {
    projects,
    loading: projectLoading,
    error,
    createProject,
    deleteProject,
    clearError
  } = useProjectManagement();

  const [showForm, setShowForm] = useState(false);
  const [selectedProjects, setSelectedProjects] = useState<Set<string>>(new Set());

  useEffect(() => {
    setIsLoading(projectLoading);
  }, [projectLoading, setIsLoading]);

  const handleAddProject = async (projectData: Partial<Project>) => {
    try {
      // Convert partial project to CreateProjectInput format
      const createInput = {
        title: projectData.title || '',
        description: projectData.description || '',
        categoryId: projectData.category?.id || '',
        imageIds: projectData.images?.map(img => img.id) || [],
        technologyIds: projectData.technologies?.map(tech => tech.id) || [],
        features: [], // Add empty features array
        clientId: projectData.client?.id || '',
        timeline: projectData.timeline || { startDate: new Date(), endDate: new Date(), duration: '' },
        teamMemberIds: projectData.team?.map(member => member.id) || [],
        status: projectData.status || 'active',
        featured: projectData.featured || false,
        links: projectData.links || {},
        seo: projectData.seo,
        settings: {
          showClient: true,
          showTeam: true,
          showTimeline: true,
          showResults: true,
          allowInquiries: true
        }
      };
      
      await createProject(createInput);
      onAddProject?.(projectData);
      setShowForm(false);
    } catch (err) {
      console.error('Failed to add project:', err);
    }
  };

  const handleRemoveProject = async (id: string) => {
    if (confirm('Are you sure you want to remove this project?')) {
      try {
        await deleteProject(id);
        onRemoveProject?.(id);
      } catch (err) {
        console.error('Failed to remove project:', err);
      }
    }
  };

  const handleBulkDelete = async () => {
    if (selectedProjects.size === 0) return;
    
    if (confirm(`Are you sure you want to delete ${selectedProjects.size} projects?`)) {
      try {
        setIsLoading(true);
        for (const id of selectedProjects) {
          await deleteProject(id);
        }
        setSelectedProjects(new Set());
      } catch (err) {
        console.error('Failed to bulk delete projects:', err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const toggleProjectSelection = (id: string) => {
    const newSelection = new Set(selectedProjects);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelectedProjects(newSelection);
  };

  const selectAllProjects = () => {
    if (selectedProjects.size === projects.length) {
      setSelectedProjects(new Set());
    } else {
      setSelectedProjects(new Set(projects.map(p => p.id)));
    }
  };

  if (error) {
    return (
      <Card className="p-6">
        <div className="text-center text-red-600">
          <p>Error loading projects: {error}</p>
          <Button onClick={clearError} className="mt-2">
            Clear Error
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Projects</h2>
          <p className="text-muted-foreground">
            Manage your portfolio projects ({projects.length} projects)
          </p>
        </div>
        <div className="flex gap-2">
          {selectedProjects.size > 0 && (
            <Button variant="destructive" onClick={handleBulkDelete}>
              Delete Selected ({selectedProjects.size})
            </Button>
          )}
          <Button onClick={() => setShowForm(true)}>
            Add New Project
          </Button>
        </div>
      </div>

      {/* Bulk Actions */}
      {projects.length > 0 && (
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedProjects.size === projects.length && projects.length > 0}
                onChange={selectAllProjects}
                className="rounded border-border"
              />
              <span className="text-sm">
                Select All ({selectedProjects.size} selected)
              </span>
            </label>
            {selectedProjects.size > 0 && (
              <Badge variant="secondary">
                {selectedProjects.size} projects selected
              </Badge>
            )}
          </div>
        </Card>
      )}

      {/* Projects List */}
      <div className="grid gap-4">
        {projects.length === 0 ? (
          <Card className="p-8 text-center">
            <div className="text-muted-foreground">
              <svg
                className="w-12 h-12 mx-auto mb-4 opacity-50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14-7H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z"
                />
              </svg>
              <p className="text-lg font-medium mb-2">No projects yet</p>
              <p className="mb-4">Create your first project to get started</p>
              <Button onClick={() => setShowForm(true)}>
                Create First Project
              </Button>
            </div>
          </Card>
        ) : (
          projects.map((project) => (
            <Card key={project.id} className="p-4">
              <div className="flex items-start gap-4">
                <input
                  type="checkbox"
                  checked={selectedProjects.has(project.id)}
                  onChange={() => toggleProjectSelection(project.id)}
                  className="mt-1 rounded border-border"
                />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1 truncate">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-2 line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                        <Badge variant="outline" className="text-xs">
                          {project.category.name}
                        </Badge>
                        <span>•</span>
                        <span>{project.client?.name || 'No client'}</span>
                        <span>•</span>
                        <span>{project.timeline.duration}</span>
                        {project.featured && (
                          <>
                            <span>•</span>
                            <Badge variant="secondary" className="text-xs">
                              Featured
                            </Badge>
                          </>
                        )}
                        <span>•</span>
                        <Badge 
                          variant={project.status === 'completed' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {project.status}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <Badge key={tech.id} variant="outline" className="text-xs">
                            {tech.name}
                          </Badge>
                        ))}
                        {project.technologies.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{project.technologies.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleRemoveProject(project.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Add/Edit Project Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 overflow-y-auto">
          <div className="min-h-screen p-4">
            <Card className="w-full max-w-6xl mx-auto">
              <div className="p-6">
                <ProjectForm
                  onSave={handleAddProject}
                  onCancel={() => setShowForm(false)}
                />
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
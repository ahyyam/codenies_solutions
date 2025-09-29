'use client';

import React, { useState, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useErrorBoundary } from '@/lib/hooks/useErrorBoundary';

interface AdminLayoutProps {
  children?: ReactNode;
  onLogout: () => void;
}

export type AdminTab = 'blog' | 'projects' | 'settings';

interface AdminLayoutContextType {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const AdminLayoutContext = React.createContext<AdminLayoutContextType | null>(null);

export function AdminLayout({ children, onLogout }: AdminLayoutProps) {
  const [activeTab, setActiveTab] = useState<AdminTab>('blog');
  const [isLoading, setIsLoading] = useState(false);
  const { hasError, error, resetError } = useErrorBoundary();

  const contextValue: AdminLayoutContextType = {
    activeTab,
    setActiveTab,
    isLoading,
    setIsLoading,
  };

  if (hasError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="p-6 max-w-md">
          <h2 className="text-lg font-semibold mb-2">Something went wrong</h2>
          <p className="text-muted-foreground mb-4">
            {error?.message || 'An unexpected error occurred'}
          </p>
          <Button onClick={resetError}>Try Again</Button>
        </Card>
      </div>
    );
  }

  return (
    <AdminLayoutContext.Provider value={contextValue}>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="text-sm">
                  Admin Panel
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Content Management System
                </span>
              </div>
              <Button variant="outline" onClick={onLogout} size="sm">
                Logout
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-6">
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as AdminTab)}>
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="blog" className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                    />
                  </svg>
                  Blog Posts
                </TabsTrigger>
                <TabsTrigger value="projects" className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
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
                  Projects
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Settings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="blog" className="space-y-6">
                <div id="blog-management-content">
                  {/* Blog management content will be rendered here */}
                </div>
              </TabsContent>

              <TabsContent value="projects" className="space-y-6">
                <div id="project-management-content">
                  {/* Project management content will be rendered here */}
                </div>
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Settings</h3>
                  <p className="text-muted-foreground">
                    Settings panel will be implemented in future updates.
                  </p>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Loading Overlay */}
            {isLoading && (
              <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
                <Card className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                    <span className="text-sm">Processing...</span>
                  </div>
                </Card>
              </div>
            )}
        </main>
      </div>
    </AdminLayoutContext.Provider>
  );
}

// Hook to use admin layout context
export function useAdminLayout() {
  const context = React.useContext(AdminLayoutContext);
  if (!context) {
    throw new Error('useAdminLayout must be used within AdminLayout');
  }
  return context;
}
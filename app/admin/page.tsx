'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { BlogManagement } from '@/components/admin/BlogManagement';
import { ProjectManagement } from '@/components/admin/ProjectManagement';
import { useAuth } from '@/lib/contexts/AuthContext';
import { createPortal } from 'react-dom';

export default function AdminPage() {
  const { user, loading, signIn, signOut, error, clearError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    try {
      await signIn(email, password);
    } catch (err) {
      // Error is handled by the auth context
    }
  }

  async function handleLogout() {
    try {
      await signOut();
    } catch (err) {
      // Error is handled by the auth context
    }
  }

  // Render blog management content into the tab
  const renderBlogManagement = () => {
    if (!mounted) return null;
    const container = document.getElementById('blog-management-content');
    if (!container) return null;
    
    return createPortal(
      <BlogManagement />,
      container
    );
  };

  // Render project management content into the tab
  const renderProjectManagement = () => {
    if (!mounted) return null;
    const container = document.getElementById('project-management-content');
    if (!container) return null;
    
    return createPortal(
      <ProjectManagement />,
      container
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="w-full max-w-sm bg-card border border-border rounded-lg p-6 space-y-4 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <form onSubmit={handleLogin} className="w-full max-w-sm bg-card border border-border rounded-lg p-6 space-y-4">
          <div className="text-center">
            <Badge className="mb-2">Admin Login</Badge>
            <h1 className="text-xl font-semibold">Sign In</h1>
          </div>
          
          {error && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-md p-3">
              <p className="text-destructive text-sm">{error}</p>
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                onClick={clearError}
                className="mt-1 text-destructive hover:text-destructive"
              >
                Dismiss
              </Button>
            </div>
          )}
          
          <div>
            <Label htmlFor="email">Email</Label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-background"
              placeholder="admin@codenies.com"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="password">Password</Label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-background"
              placeholder="••••••••"
              required
            />
          </div>
          
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>
      </div>
    );
  }

  return (
    <>
      <AdminLayout onLogout={handleLogout}>
        {/* Content will be rendered via portals */}
      </AdminLayout>
      {renderBlogManagement()}
      {renderProjectManagement()}
    </>
  );
}



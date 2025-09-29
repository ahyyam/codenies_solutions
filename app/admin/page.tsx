'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { BlogManagement } from '@/components/admin/BlogManagement';
import { ProjectManagement } from '@/components/admin/ProjectManagement';
import { createPortal } from 'react-dom';

const ADMIN_PASSWORD = 'AhyamEmad@315';

export default function AdminPage() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('admin_auth');
    if (saved === '1') setIsAuthed(true);
  }, []);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthed(true);
      localStorage.setItem('admin_auth', '1');
    } else {
      alert('Incorrect password');
    }
  }

  function handleLogout() {
    localStorage.removeItem('admin_auth');
    setIsAuthed(false);
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

  if (!isAuthed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <form onSubmit={handleLogin} className="w-full max-w-sm bg-card border border-border rounded-lg p-6 space-y-4">
          <div className="text-center">
            <Badge className="mb-2">Admin</Badge>
            <h1 className="text-xl font-semibold">Enter Password</h1>
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
            />
          </div>
          <Button type="submit" className="w-full">Unlock</Button>
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



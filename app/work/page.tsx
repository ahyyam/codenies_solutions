'use client';

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Award, Zap, Star, Code, Shield, Zap as ZapIcon } from "lucide-react"
import Link from "next/link"
import { projectsData as defaultProjects } from "@/lib/projects-data"

export default function WorkPage() {
  const [projects, setProjects] = useState(defaultProjects)
  const [previewLoaded, setPreviewLoaded] = useState(false)
  const [previewBlocked, setPreviewBlocked] = useState(false)
  const blockTimerRef = useRef<number | null>(null)
  const [reloadKey, setReloadKey] = useState(0)
  useEffect(() => {
    try {
      const stored = typeof window !== 'undefined' ? localStorage.getItem('projects') : null
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) setProjects(parsed)
      }
    } catch {}
  }, [])

  const projectForPreview = projects.find(p => p.link && p.link !== '#')
  const previewUrl = projectForPreview
    ? (projectForPreview.link.startsWith('http') ? projectForPreview.link : `https://${projectForPreview.link}`)
    : ''

  // When preview URL changes, set up a timer to detect embedding blocks
  useEffect(() => {
    // reset states for new URL
    setPreviewLoaded(false)
    setPreviewBlocked(false)

    // clear any previous timer
    if (blockTimerRef.current) {
      window.clearTimeout(blockTimerRef.current)
      blockTimerRef.current = null
    }

    if (!previewUrl) return

    // If the iframe doesn't load within timeout, assume blocked
    blockTimerRef.current = window.setTimeout(() => {
      setPreviewBlocked(true)
    }, 3500)

    return () => {
      if (blockTimerRef.current) {
        window.clearTimeout(blockTimerRef.current)
        blockTimerRef.current = null
      }
    }
  }, [previewUrl, reloadKey])
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-20 lg:pt-24 pb-12 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-6 bg-primary/10 text-primary">
            <Award className="w-3 h-3 mr-2" />
            Our Portfolio
          </Badge>
          
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-6 leading-tight">
            Our Work
          </h1>
          
          <p className="text-lg lg:text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
            Our portfolio is currently private. Contact us to request access.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-8">
            <Button 
              asChild 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3"
            >
              <Link href="/consultation">
                <Zap className="w-4 h-4 mr-2" />
                Start Your Project
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-muted-foreground">
            <div className="flex items-center justify-center gap-2">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Code className="w-4 h-4 text-primary" />
              </div>
              <span>Expert Engineers</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Star className="w-4 h-4 text-primary" />
              </div>
              <span>Client Satisfaction</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 text-primary" />
              </div>
              <span>Enterprise Grade</span>
            </div>
          </div>
        </div>
      </section>

      {/* Live Preview (first available project link) */}
      {projectForPreview && (
        <section className="py-10 px-4">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-2xl font-bold text-foreground mb-3">Live Preview</h2>
            <p className="text-sm text-muted-foreground mb-4">{projectForPreview.title}</p>
          <div className="aspect-video bg-muted rounded overflow-hidden border border-border relative">
            {!previewBlocked ? (
              <>
                {!previewLoaded && (
                  <div className="absolute inset-0 bg-muted animate-pulse" />
                )}
                <iframe
                  key={reloadKey}
                  src={previewUrl}
                  title={`Preview of ${projectForPreview.title}`}
                  className={`w-full h-full ${previewLoaded ? '' : 'hidden'}`}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  allowFullScreen
                  onLoad={() => {
                    setPreviewLoaded(true)
                    setPreviewBlocked(false)
                    if (blockTimerRef.current) {
                      window.clearTimeout(blockTimerRef.current)
                      blockTimerRef.current = null
                    }
                  }}
                />
              </>
            ) : (
              <img
                src={projectForPreview.image || "/modern-saas-dashboard.png"}
                alt={`${projectForPreview.title} preview`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            )}
          </div>
          {previewBlocked && (
            <div className="mt-3 text-sm flex flex-wrap items-center gap-2">
              <span className="text-muted-foreground">Preview unavailable due to site embedding restrictions.</span>
              <a href={previewUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Open in new tab</a>
              <button
                type="button"
                onClick={() => {
                  setPreviewLoaded(false)
                  setPreviewBlocked(false)
                  if (blockTimerRef.current) {
                    window.clearTimeout(blockTimerRef.current)
                    blockTimerRef.current = null
                  }
                  setReloadKey(k => k + 1)
                }}
                className="text-muted-foreground hover:text-foreground underline"
              >
                Retry preview
              </button>
            </div>
          )}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-12 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help bring your ideas to life with our expertise in software development.
          </p>
          <Link href="/consultation">
            <Button size="lg" className="bg-background text-foreground hover:bg-background/90 px-6 py-3 text-base group hover:scale-105 transition-all duration-300">
              <ZapIcon className="w-4 h-4 mr-2" />
              Get Free Strategy Session
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

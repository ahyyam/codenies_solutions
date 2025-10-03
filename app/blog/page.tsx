"use client"
import { blogPosts } from "@/lib/blog-data"
import { useMemo, useState } from "react"
import PageHero from "@/components/common/PageHero"

export default function BlogPage() {
  const [query, setQuery] = useState("")
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return blogPosts
    return blogPosts.filter((p) =>
      [p.title, p.excerpt, p.category]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q))
    )
  }, [query])

  return (
    <div className="min-h-screen bg-background">
      <PageHero
        eyebrow="Insights"
        title="Minimal, practical software lessons"
        subtitle="Focused guidance on building modern software, product, and teams."
      />
      <section className="section-primary">
        <div className="container-responsive">
          <div className="max-w-3xl mx-auto mb-8">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full px-4 py-3 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-[var(--ring)] bg-background text-foreground placeholder:text-muted-foreground/80"
              aria-label="Search blog posts"
            />
          </div>

          {filtered.length === 0 ? (
            <div className="border border-dashed border-border rounded-lg p-10 text-center bg-card">
              <p className="text-sm text-muted-foreground">No matching articles.</p>
            </div>
          ) : (
            <div className="card-grid-2 max-w-5xl mx-auto">
              {filtered.map((post) => (
                <article key={post.id} className="blog-card">
                  <div className="blog-card-content">
                    <h2 className="subheading text-heading mb-2 line-clamp-2">{post.title}</h2>
                    <p className="body-large text-body mb-3 line-clamp-3">{post.excerpt}</p>
                    <div className="caption text-muted flex items-center gap-2">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

import type { ComponentType } from "react"

export interface BlogFrontmatter {
  slug: string
  title: string
  excerpt: string
  description: string
  date: string
  author: string
  readTime: string
  category: string
  image: string
  keywords?: string[]
}

export interface BlogPost {
  slug: string
  metadata: BlogFrontmatter
  Content: ComponentType<Record<string, unknown>>
}

export type BlogSummary = BlogFrontmatter

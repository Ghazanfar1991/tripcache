import type { ComponentType } from "react"

export interface BlogFrontmatter {
  slug: string
  title: string
  seoTitle?: string
  excerpt: string
  description: string
  date: string
  updatedAt?: string
  author: string
  readTime: string
  category: string
  image: string
  imageAlt?: string
  keywords?: string[]
}

/** A visible FAQ item. The same text renders on the page and in the FAQPage JSON-LD, so keep it plain (no markdown). */
export interface BlogFaq {
  question: string
  answer: string
}

export interface BlogPost {
  slug: string
  metadata: BlogFrontmatter
  faq?: BlogFaq[]
  Content: ComponentType<Record<string, unknown>>
}

export type BlogSummary = BlogFrontmatter

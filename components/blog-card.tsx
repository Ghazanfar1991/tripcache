import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import Image from "next/image"

interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  author: string
  readTime: string
  category: string
  image: string
}

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <Card className="group overflow-hidden border-border hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 h-full flex flex-col">
        {/* Image */}
        <div className="relative aspect-video overflow-hidden bg-muted">
          <Image
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs font-medium">
              {post.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>
                {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{post.readTime}</span>
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-3 group-hover:text-cyan-500 transition-colors text-balance">
            {post.title}
          </h3>

          <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1 text-pretty">{post.excerpt}</p>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <span className="text-sm text-muted-foreground">By {post.author}</span>
            <ArrowRight className="h-4 w-4 text-cyan-500 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Card>
    </Link>
  )
}

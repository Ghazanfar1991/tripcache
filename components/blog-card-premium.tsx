"use client"

import Link from "next/link"
import type { BlogSummary } from "@/types/blog"
import Image from "next/image"
import { motion } from "framer-motion"
import { Calendar, Clock, ArrowRight, TrendingUp } from "lucide-react"

export function BlogCardPremium({ post, featured = false }: { post: BlogSummary; featured?: boolean }) {
    if (featured) {
        return (
            <Link href={`/blog/${post.slug}`}>
                <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="group relative overflow-hidden rounded-3xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20"
                >
                    {/* Large Hero Image */}
                    <div className="relative aspect-[21/9] overflow-hidden bg-gradient-to-br from-primary/20 to-purple-500/20">
                        <Image
                            src={post.image || "/placeholder.svg"}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                        {/* Featured Badge */}
                        <div className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary to-purple-500 text-white text-sm font-semibold shadow-lg">
                            <TrendingUp className="h-4 w-4" />
                            <span>Featured Post</span>
                        </div>

                        {/* Category Badge */}
                        <div className="absolute top-6 right-6">
                            <span className="px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-sm font-medium">
                                {post.category}
                            </span>
                        </div>

                        {/* Content Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10">
                            {/* Meta Info */}
                            <div className="flex items-center gap-4 text-sm text-gray-300 mb-3">
                                <div className="flex items-center gap-1.5">
                                    <Calendar className="h-4 w-4" />
                                    <span>
                                        {new Date(post.date).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        })}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Clock className="h-4 w-4" />
                                    <span>{post.readTime}</span>
                                </div>
                            </div>

                            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-4 text-white leading-tight">
                                {post.title}
                            </h2>

                            {/* Excerpt */}
                            <p className="text-base sm:text-lg text-gray-200 mb-6 line-clamp-2 max-w-3xl">{post.excerpt}</p>

                            {/* Read More */}
                            <div className="flex items-center gap-2 text-white font-semibold group-hover:gap-4 transition-all">
                                <span>Read Full Article</span>
                                <ArrowRight className="h-5 w-5" />
                            </div>
                        </div>
                    </div>

                </motion.article>
            </Link >
        )
    }

    // Regular card (enhanced version)
    return (
        <Link href={`/blog/${post.slug}`}>
            <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group h-full flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1"
            >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-primary/10 to- purple-500/10">
                    <Image
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                        <span className="px-3 py-1.5 rounded-full bg-gradient-to-r from-primary to-purple-500 text-white text-xs font-semibold shadow-lg">
                            {post.category}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                        <div className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>
                                {new Date(post.date).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                })}
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5" />
                            <span>{post.readTime}</span>
                        </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1 line-clamp-3">
                        {post.excerpt}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                        <span className="text-sm text-muted-foreground font-medium">By {post.author}</span>
                        <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                            <span className="text-sm">Read</span>
                            <ArrowRight className="h-4 w-4" />
                        </div>
                    </div>
                </div>
            </motion.article>
        </Link>
    )
}

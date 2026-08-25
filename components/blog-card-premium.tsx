"use client"

import Link from "next/link"
import type { BlogSummary } from "@/types/blog"
import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import { Calendar, Clock, ArrowRight, TrendingUp } from "lucide-react"

export function BlogCardPremium({ post, featured = false }: { post: BlogSummary; featured?: boolean }) {
    const reducedMotion = useReducedMotion()
    const displayDate = new Date(post.updatedAt ?? post.date).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
    })

    if (featured) {
        return (
            <Link href={`/blog/${post.slug}`}>
                <motion.article
                    initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                    animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                    className="group relative overflow-hidden rounded-[2rem] bg-white/45 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.78),0_22px_60px_rgba(72,53,33,0.09)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_30px_75px_rgba(72,53,33,0.14)]"
                >
                    {/* Large Hero Image */}
                    <div className="relative min-h-[32rem] overflow-hidden rounded-[1.45rem] bg-[#e5dac7] sm:min-h-0 sm:aspect-[21/10]">
                        <Image
                            src={post.image || "/placeholder.svg"}
                            alt={post.title}
                            fill
                            sizes="(max-width: 767px) 100vw, (max-width: 1279px) 84vw, 78rem"
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                            preload
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#211d18]/95 via-[#211d18]/48 to-transparent" />

                        {/* Featured Badge */}
                        <div className="absolute start-5 top-5 flex items-center gap-2 rounded-full bg-[#b9543a] px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(91,37,23,0.25)] sm:start-6 sm:top-6">
                            <TrendingUp className="h-4 w-4" />
                            <span>Featured Post</span>
                        </div>

                        {/* Category Badge */}
                        <div className="absolute end-5 top-5 sm:end-6 sm:top-6">
                            <span className="rounded-full bg-[#29251f]/58 px-4 py-2 text-sm font-medium text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.16)] backdrop-blur-md">
                                {post.category}
                            </span>
                        </div>

                        {/* Content Overlay */}
                        <div className="absolute inset-x-0 bottom-0 p-6 lg:p-10">
                            {/* Meta Info */}
                            <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-[#d2c9bc]">
                                <div className="flex items-center gap-1.5">
                                    <Calendar className="h-4 w-4" />
                                    <span>
                                        Updated {displayDate}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Clock className="h-4 w-4" />
                                    <span>{post.readTime}</span>
                                </div>
                            </div>

                            <h2 className="mb-4 max-w-4xl text-3xl font-semibold leading-[1.02] tracking-[-0.045em] text-white sm:text-4xl lg:text-6xl">
                                {post.title}
                            </h2>

                            {/* Excerpt */}
                            <p className="mb-6 line-clamp-2 max-w-3xl text-base leading-7 text-[#e0d8cc] sm:text-lg">{post.excerpt}</p>

                            {/* Read More */}
                            <div className="flex items-center gap-2 font-semibold text-white">
                                <span>Read Full Article</span>
                                <ArrowRight className="h-5 w-5 transition-transform duration-150 group-hover:translate-x-1" />
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
                initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-white/45 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.78),0_18px_48px_rgba(72,53,33,0.07)] transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.82),0_24px_58px_rgba(72,53,33,0.12)]"
            >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden rounded-[1.2rem] bg-[#e5dac7]">
                    <Image
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        fill
                        sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.035]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#29251f]/20 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

                    {/* Category Badge */}
                    <div className="absolute start-4 top-4">
                        <span className="rounded-full bg-[#b9543a] px-3 py-1.5 text-xs font-semibold text-white shadow-[0_8px_18px_rgba(91,37,23,0.2)]">
                            {post.category}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col px-3 pb-3 pt-6">
                    {/* Meta Info */}
                    <div className="mb-4 flex flex-wrap items-center gap-4 text-xs font-medium text-[#7a7166]">
                        <div className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>
                                Updated {displayDate}
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5" />
                            <span>{post.readTime}</span>
                        </div>
                    </div>

                    {/* Title */}
                    <h3 className="mb-3 line-clamp-2 text-xl font-semibold leading-snug tracking-[-0.025em] text-[#29251f] transition-colors duration-150 group-hover:text-[#a44833]">
                        {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="mb-5 line-clamp-3 flex-1 text-sm leading-6 text-[#71695f]">
                        {post.excerpt}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between gap-4 pt-4 shadow-[inset_0_1px_0_rgba(58,48,38,0.08)]">
                        <span className="text-sm font-medium text-[#71695f]">By {post.author}</span>
                        <div className="flex items-center gap-2 font-semibold text-[#a44833]">
                            <span className="text-sm">Read</span>
                            <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1" />
                        </div>
                    </div>
                </div>
            </motion.article>
        </Link>
    )
}

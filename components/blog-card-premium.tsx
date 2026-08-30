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
                    <div className="relative aspect-video overflow-hidden rounded-[1.45rem] bg-[#353458] sm:min-h-[28rem] sm:aspect-[21/10]">
                        <Image
                            src={post.image || "/placeholder.svg"}
                            alt=""
                            fill
                            sizes="(max-width: 767px) calc(100vw - 3.25rem), (max-width: 1279px) 84vw, 78rem"
                            className="scale-110 object-cover opacity-45 blur-2xl saturate-75"
                            aria-hidden="true"
                            loading="eager"
                        />
                        <Image
                            src={post.image || "/placeholder.svg"}
                            alt={post.title}
                            fill
                            sizes="(max-width: 767px) calc(100vw - 3.25rem), (max-width: 1279px) 84vw, 78rem"
                            className="object-contain transition-transform duration-500 group-hover:scale-[1.015]"
                            preload
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/18 to-transparent sm:from-[#121212]/95 sm:via-[#211d18]/48" />

                        {/* Featured Badge */}
                        <div className="absolute start-5 top-5 flex items-center gap-2 rounded-full bg-[#602ad2] px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(58,24,135,0.25)] sm:start-6 sm:top-6">
                            <TrendingUp className="h-4 w-4" />
                            <span>Featured Post</span>
                        </div>

                        {/* Category Badge */}
                        <div className="absolute end-5 top-5 sm:end-6 sm:top-6">
                            <span className="rounded-full bg-[#121212]/58 px-4 py-2 text-sm font-medium text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.16)] backdrop-blur-md">
                                {post.category}
                            </span>
                        </div>

                    </div>

                    {/* Content sits below the image on mobile and overlays it on larger screens. */}
                    <div className="p-5 pb-6 pt-6 sm:absolute sm:inset-x-3 sm:bottom-3 sm:p-7 lg:p-10">
                        {/* Meta Info */}
                        <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-[#7a7166] sm:text-[#d2c9bc]">
                            <div className="flex items-center gap-1.5">
                                <Calendar className="h-4 w-4" aria-hidden="true" />
                                <span>
                                    Updated {displayDate}
                                </span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Clock className="h-4 w-4" aria-hidden="true" />
                                <span>{post.readTime}</span>
                            </div>
                        </div>

                        <h2 className="mb-4 max-w-4xl text-3xl font-semibold leading-[1.04] tracking-[-0.045em] text-[#121212] sm:text-4xl sm:leading-[1.02] sm:text-white lg:text-6xl">
                            {post.title}
                        </h2>

                        {/* Excerpt */}
                        <p className="mb-6 line-clamp-3 max-w-3xl text-base leading-7 text-[#666666] sm:line-clamp-2 sm:text-lg sm:text-[#e0d8cc]">{post.excerpt}</p>

                        {/* Read More */}
                        <div className="flex items-center gap-2 font-semibold text-[#4d20af] sm:text-white">
                            <span>Read Full Article</span>
                            <ArrowRight className="h-5 w-5 transition-transform duration-150 group-hover:translate-x-1" aria-hidden="true" />
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
                <div className="relative aspect-[40/21] overflow-hidden rounded-[1.2rem] bg-[#e5dac7]">
                    <Image
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        fill
                        sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.035]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/20 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

                    {/* Category Badge */}
                    <div className="absolute start-4 top-4">
                        <span className="rounded-full bg-[#602ad2] px-3 py-1.5 text-xs font-semibold text-white shadow-[0_8px_18px_rgba(58,24,135,0.2)]">
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
                    <h3 className="mb-3 line-clamp-2 text-xl font-semibold leading-snug tracking-[-0.025em] text-[#121212] transition-colors duration-150 group-hover:text-[#4d20af]">
                        {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="mb-5 line-clamp-3 flex-1 text-sm leading-6 text-[#666666]">
                        {post.excerpt}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between gap-4 pt-4 shadow-[inset_0_1px_0_rgba(58,48,38,0.08)]">
                        <span className="text-sm font-medium text-[#666666]">By {post.author}</span>
                        <div className="flex items-center gap-2 font-semibold text-[#4d20af]">
                            <span className="text-sm">Read</span>
                            <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1" />
                        </div>
                    </div>
                </div>
            </motion.article>
        </Link>
    )
}

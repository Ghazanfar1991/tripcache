"use client"

import Link from "next/link"
import type { BlogSummary } from "@/types/blog"
import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import { Calendar, Clock, ArrowRight, TrendingUp } from "lucide-react"

const EASE = [0.16, 1, 0.3, 1] as const

export function BlogCardPremium({ post, featured = false }: { post: BlogSummary; featured?: boolean }) {
    const reducedMotion = useReducedMotion()
    const displayDate = new Date(post.updatedAt ?? post.date).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
    })

    if (featured) {
        return (
            <Link href={`/blog/${post.slug}`} className="group block rounded-[30px]">
                <motion.article
                    initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                    animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: EASE }}
                    className="relative grid overflow-hidden rounded-[30px] border border-tc-line bg-white p-2.5 shadow-[0_1px_2px_rgba(14,14,14,0.04),0_30px_60px_-40px_rgba(45,27,87,0.4)] transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-[0_1px_2px_rgba(14,14,14,0.04),0_40px_80px_-44px_rgba(45,27,87,0.55)] sm:p-3 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                >
                    <span aria-hidden="true" className="tc-bloom tc-drift pointer-events-none absolute -bottom-32 -right-24 size-80 rounded-full bg-[#8b5cf6] opacity-30" />

                    {/* Large Hero Image */}
                    <div className="relative aspect-video overflow-hidden rounded-[22px] bg-[#2a1170] lg:aspect-auto lg:min-h-[26rem]">
                        <Image
                            src={post.image || "/placeholder.svg"}
                            alt=""
                            fill
                            sizes="(max-width: 1023px) calc(100vw - 3.25rem), 44rem"
                            className="scale-110 object-cover opacity-50 blur-2xl saturate-75"
                            aria-hidden="true"
                            loading="eager"
                        />
                        <Image
                            src={post.image || "/placeholder.svg"}
                            alt={post.title}
                            fill
                            sizes="(max-width: 1023px) calc(100vw - 3.25rem), 44rem"
                            className="object-contain transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                            preload
                        />
                    </div>

                    <div className="relative flex flex-col px-3 pb-4 pt-6 sm:px-5 sm:pb-6 lg:px-9 lg:py-9">
                        <div className="flex flex-wrap items-center gap-2">
                            {/* Featured Badge */}
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-tc-violet px-3 py-1 text-[12.5px] font-semibold text-white shadow-[0_8px_18px_-8px_rgba(97,43,211,0.7)]">
                                <TrendingUp className="size-3.5" aria-hidden="true" />
                                <span>Featured Post</span>
                            </span>
                            {/* Category Badge */}
                            <span className="inline-flex items-center rounded-full bg-tc-violet-soft px-3 py-1 text-[12.5px] font-semibold text-tc-violet">
                                {post.category}
                            </span>
                        </div>

                        <h2 className="mt-5 text-balance font-tc-display text-[clamp(28px,3.2vw,42px)] font-semibold leading-[1.08] tracking-[-0.02em] text-tc-ink">
                            {post.title}
                        </h2>

                        {/* Excerpt */}
                        <p className="mt-4 line-clamp-4 max-w-[52ch] text-pretty text-[16px] leading-7 text-tc-ink-2 sm:text-[17px]">{post.excerpt}</p>

                        {/* Meta Info */}
                        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13.5px] text-tc-mute tabular-nums lg:mt-auto lg:pt-8">
                            <div className="flex items-center gap-1.5">
                                <Calendar className="size-4" aria-hidden="true" />
                                <span>
                                    Updated {displayDate}
                                </span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Clock className="size-4" aria-hidden="true" />
                                <span>{post.readTime}</span>
                            </div>
                        </div>

                        {/* Read More */}
                        <div className="mt-5 inline-flex items-center gap-2 border-t border-tc-line pt-5 text-[15px] font-semibold text-tc-violet">
                            <span>Read Full Article</span>
                            <ArrowRight className="size-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true" />
                        </div>
                    </div>
                </motion.article>
            </Link>
        )
    }

    // Regular card
    return (
        <Link href={`/blog/${post.slug}`} className="group block h-full rounded-[26px]">
            <motion.article
                initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                transition={{ duration: 0.7, ease: EASE }}
                className="flex h-full flex-col overflow-hidden rounded-[26px] border border-tc-line bg-white shadow-[0_1px_2px_rgba(14,14,14,0.04),0_30px_60px_-44px_rgba(45,27,87,0.45)] transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-[0_1px_2px_rgba(14,14,14,0.04),0_36px_70px_-40px_rgba(45,27,87,0.55)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
                {/* Image */}
                <div className="p-2">
                    <div className="relative aspect-[40/21] overflow-hidden rounded-[20px] bg-tc-canvas">
                        <Image
                            src={post.image || "/placeholder.svg"}
                            alt={post.title}
                            fill
                            sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                        />

                        {/* Category Badge */}
                        <div className="absolute start-3 top-3">
                            <span className="inline-flex items-center rounded-full bg-white/92 px-2.5 py-1 text-[12px] font-semibold text-tc-violet shadow-[0_8px_18px_-10px_rgba(45,27,87,0.6)]">
                                {post.category}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col px-5 pb-5 pt-3 sm:px-6 sm:pb-6">
                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-tc-mute tabular-nums">
                        <div className="flex items-center gap-1.5">
                            <Calendar className="size-3.5" aria-hidden="true" />
                            <span>
                                Updated {displayDate}
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Clock className="size-3.5" aria-hidden="true" />
                            <span>{post.readTime}</span>
                        </div>
                    </div>

                    {/* Title */}
                    <h3 className="mt-3 line-clamp-3 text-balance font-tc-display text-[21px] font-semibold leading-[1.22] tracking-[-0.01em] text-tc-ink transition-colors duration-200 group-hover:text-tc-violet">
                        {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="mt-3 line-clamp-3 flex-1 text-[15px] leading-[1.7] text-tc-mute">
                        {post.excerpt}
                    </p>

                    {/* Footer */}
                    <div className="mt-5 flex items-center justify-between gap-4 border-t border-tc-line pt-4">
                        <span className="text-[13.5px] font-medium text-tc-mute">By {post.author}</span>
                        <div className="flex items-center gap-1.5 font-semibold text-tc-violet">
                            <span className="text-[14px]">Read</span>
                            <ArrowRight className="size-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true" />
                        </div>
                    </div>
                </div>
            </motion.article>
        </Link>
    )
}

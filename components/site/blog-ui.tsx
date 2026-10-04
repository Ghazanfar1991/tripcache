/**
 * Blog-only pieces built on the page kit (components/site/kit.tsx).
 * Kept local so the shared kit stays untouched.
 */
import type { ReactNode } from "react"
import { Bloom } from "@/components/home/category"
import { ButtonLink, Container, cx } from "@/components/site/kit"

/** The violet closing field, matching CtaBand, with a single "Download" action instead of the "Trip to" signature. */
export function BlogCta({
  title,
  text,
  href,
  label,
  as: Tag = "h2",
}: {
  title: ReactNode
  text: ReactNode
  href: string
  label: string
  as?: "h2" | "h3"
}) {
  return (
    <section className="bg-white px-3 pb-16 pt-6 sm:px-5 sm:pb-24">
      <div
        data-nav-theme="dark"
        className="relative mx-auto max-w-[1240px] overflow-hidden rounded-[30px] bg-[linear-gradient(150deg,#612bd3_0%,#4a1eac_60%,#2f137c_100%)] px-6 py-14 text-center text-white sm:rounded-[36px] sm:py-20"
      >
        <Bloom className="tc-drift -right-28 -top-32 size-[460px] opacity-50" color="#d82d7e" />
        <Bloom className="tc-drift-slow -bottom-40 -left-24 size-[420px] opacity-40" color="#6366f1" />
        <div className="relative mx-auto max-w-[720px]">
          <Tag className="text-balance font-tc-display text-[clamp(30px,4vw,50px)] font-semibold leading-[1.08] tracking-[-0.02em]">{title}</Tag>
          <p className="mx-auto mt-4 max-w-[52ch] text-pretty text-[17px] leading-8 text-[#e4dcff]">{text}</p>
          <ButtonLink href={href} variant="light" size="lg" className="mt-8">
            {label}
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}

/** Hero ground shared by the article header: the PageHero wash with two clipped blooms. */
export function BlogHeroGround({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <section className={cx("relative overflow-hidden bg-[linear-gradient(to_bottom,#f7f5ff_0%,#f0f2f4_100%)]", className)}>
      <Bloom className="tc-drift -right-40 -top-10 size-[520px] opacity-30" color="#8b5cf6" />
      <Bloom className="tc-drift-slow -left-40 bottom-[-160px] size-[440px] opacity-20" color="#ec4899" />
      <Container className="relative">{children}</Container>
    </section>
  )
}

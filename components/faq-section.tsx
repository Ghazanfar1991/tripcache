"use client"

import { motion } from "framer-motion"
import { Plus, Minus } from "lucide-react"
import { useState } from "react"
import { SectionContainer } from "./section-container"
import Script from "next/script"

interface FAQItem {
    question: string
    answer: string
}

const faqs: FAQItem[] = [
    {
        question: "Is TripCache free?",
        answer: "TripCache offers a generous Free plan that includes manual trip entry, viewing itineraries, and basic organization. Our Pro plan ($9.99/month) unlocks premium features like email-to-trip automation, automatic flight status updates, CSV expense exports, and unlimited document storage. Start free and upgrade anytime!"
    },
    {
        question: "What's included in the Free plan vs Pro plan?",
        answer: "Free plan includes: manual trip creation, view itineraries, and basic trip organization. Pro plan ($9.99/month) adds: email-to-trip automation, automatic flight updates, CSV export, unlimited document storage, calendar integration, and priority support. It's 80% cheaper than TripIt Pro!"
    },
    {
        question: "How does the email forwarding work?",
        answer: "With TripCache Pro ($9.99/month), you'll receive a unique email address like 'trips-abc123@tripcache.app'. Simply forward any booking confirmation to this address, and our AI-powered parser automatically extracts flight details, hotel reservations, and creates your trip itinerary. It works with all major airlines and booking platforms."
    },
    {
        question: "What happened to TripCase?",
        answer: "TripCase officially shut down on April 1, 2025, as part of Sabre Corporation's strategic restructuring. Millions of users were left searching for alternatives. TripCache was built specifically to fill this gap, offering all the features TripCase users loved, plus modern improvements at an affordable price."
    },
    {
        question: "Can I export my travel data?",
        answer: "Yes! TripCache Pro includes comprehensive CSV export functionality. You can generate detailed reports of your travel history, perfect for expense reimbursement, tax documentation, or personal recordkeeping. Export filters let you select specific date ranges or trip types."
    },
    {
        question: "Is my data secure and private?",
        answer: "Your privacy is our top priority. TripCache uses end-to-end encryption for all data transmission and storage. We never sell your data to third parties, and you maintain full ownership of your travel information. Our servers are hosted on secure, SOC 2 compliant infrastructure."
    },
    {
        question: "Does TripCache work on mobile devices?",
        answer: "Yes! TripCache is fully responsive and works beautifully on all devices. We're currently in beta testing for native iOS and Android apps, which will be available soon. In the meantime, you can access TripCache from any mobile browser with full functionality."
    },
    {
        question: "What airlines and booking sites are supported?",
        answer: "TripCache supports virtually all major airlines. Our AI parser is constantly learning and improving to support new booking formats."
    }
]

export function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    }

    return (
        <>
            <Script
                id="faq-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            <section className="relative py-16 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

                <SectionContainer className="relative z-10">
                    <div className="max-w-3xl mx-auto">
                        <div className="text-center mb-12 space-y-4">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium"
                            >
                                <span>Got Questions?</span>
                            </motion.div>

                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-4xl md:text-5xl font-bold tracking-tight"
                            >
                                Frequently Asked
                                <br />
                                <span className="text-gradient-primary">Questions</span>
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="text-lg text-muted-foreground"
                            >
                                Everything you need to know about TripCache
                            </motion.p>
                        </div>

                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    className="group"
                                >
                                    <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-lg dark:border-white/5 dark:bg-white/5">
                                        <button
                                            onClick={() => toggleFAQ(index)}
                                            className="w-full flex items-center justify-between p-6 text-left transition-colors"
                                            aria-expanded={openIndex === index}
                                        >
                                            <span className="text-lg font-semibold pr-8 text-foreground group-hover:text-primary transition-colors">
                                                {faq.question}
                                            </span>
                                            <div className="flex-shrink-0">
                                                {openIndex === index ? (
                                                    <Minus className="w-5 h-5 text-primary transition-transform duration-300" />
                                                ) : (
                                                    <Plus className="w-5 h-5 text-muted-foreground transition-transform duration-300 group-hover:text-primary" />
                                                )}
                                            </div>
                                        </button>

                                        <motion.div
                                            initial={false}
                                            animate={{
                                                height: openIndex === index ? "auto" : 0,
                                                opacity: openIndex === index ? 1 : 0
                                            }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 pb-6 text-muted-foreground leading-relaxed dark:text-gray-400">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mt-12 text-center p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20"
                        >
                            <h3 className="text-xl font-bold mb-2">Still have questions?</h3>
                            <p className="text-muted-foreground mb-4">
                                We're here to help! Reach out to our support team anytime.
                            </p>
                            <a
                                href="mailto:support@trip-cache.com"
                                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium transition-all hover:scale-105"
                            >
                                Contact Support
                            </a>
                        </motion.div>
                    </div>
                </SectionContainer>
            </section>
        </>
    )
}

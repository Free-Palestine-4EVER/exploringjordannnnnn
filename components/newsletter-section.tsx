"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"
import BubbleButton from "@/components/bubble-button"
import WaveBackground from "@/components/wave-background"
import { useTranslations } from "@/lib/i18n/language-context"

export default function NewsletterSection() {
  const t = useTranslations()
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    setTimeout(() => {
      toast({
        title: t.common.success,
        description: t.newsletter.successMessage,
      })
      setEmail("")
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <section className="py-10 md:py-16 lg:py-24 bg-gradient-to-r from-blue-600 to-blue-500 text-white relative overflow-hidden">
      <WaveBackground />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">{t.newsletter.title}</h2>
            <p className="text-sm md:text-base text-white/80 mb-6 md:mb-8">{t.newsletter.subtitle}</p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder={t.newsletter.placeholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus-visible:ring-white/30 h-10 md:h-auto"
              />
              <BubbleButton
                type="submit"
                variant="secondary"
                disabled={isSubmitting}
                className="px-4 md:px-8 py-2 md:py-2.5"
              >
                {isSubmitting ? t.common.subscribing : t.common.subscribe}
              </BubbleButton>
            </form>

            <p className="text-xs mt-3 md:mt-4 text-white/70">{t.newsletter.consent}</p>
          </motion.div>
        </div>
      </div>

      <div
        className="absolute top-10 left-10 w-20 h-20 rounded-full bg-blue-400/20 floating-element"
        style={{ animationDelay: "0s" }}
      ></div>
    </section>
  )
}

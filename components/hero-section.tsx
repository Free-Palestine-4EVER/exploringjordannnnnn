"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Sparkles, MapPin, Calendar } from "lucide-react"
import BubbleButton from "@/components/bubble-button"
import { useTranslations } from "@/lib/i18n/language-context"

export default function HeroSection() {
  const t = useTranslations()
  const heroImage = "/images/a156981e-d834-4c07-98a5-b77be18a7863.png"

  return (
    <section className="relative min-h-screen overflow-hidden pt-32">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/80 via-orange-900/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      </div>

      <div className="relative h-screen container mx-auto px-4 flex flex-col justify-center">
        <div className="max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 mb-8"
          >
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span className="text-white font-medium">{t.hero.badge}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight"
          >
            {t.hero.title1}
            <br />
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-pink-400 bg-clip-text text-transparent">
              {t.hero.title2}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl sm:text-2xl md:text-3xl text-white/90 mb-8 max-w-3xl font-light leading-relaxed"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap gap-6 mb-10"
          >
            <div className="flex items-center gap-2 text-white/80">
              <MapPin className="w-5 h-5 text-amber-400" />
              <span className="text-lg">{t.hero.feature1}</span>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <Calendar className="w-5 h-5 text-emerald-400" />
              <span className="text-lg">{t.hero.feature2}</span>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span className="text-lg">{t.hero.feature3}</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 items-center sm:items-start"
          >
            <Link href="/tours">
              <BubbleButton
                size="lg"
                className="text-lg px-10 py-7 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white shadow-2xl shadow-amber-500/50 border-0"
              >
                {t.hero.exploreTours}
              </BubbleButton>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

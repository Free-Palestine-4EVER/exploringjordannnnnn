"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { BookOpenCheck, Globe, Hotel, Plane, Shield, Users } from "lucide-react"
import WaveBackground from "@/components/wave-background"
import { useTranslations } from "@/lib/i18n/language-context"

export default function WhyChooseUs() {
  const t = useTranslations()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  }

  const features = [
    {
      icon: <Globe className="h-10 w-10 text-blue-500" />,
      title: t.whyChooseUs.oneStop,
      description: t.whyChooseUs.oneStopDesc,
    },
    {
      icon: <Shield className="h-10 w-10 text-blue-500" />,
      title: t.whyChooseUs.secure,
      description: t.whyChooseUs.secureDesc,
    },
    {
      icon: <Users className="h-10 w-10 text-blue-500" />,
      title: t.whyChooseUs.guides,
      description: t.whyChooseUs.guidesDesc,
    },
    {
      icon: <BookOpenCheck className="h-10 w-10 text-blue-500" />,
      title: t.whyChooseUs.customizable,
      description: t.whyChooseUs.customizableDesc,
    },
    {
      icon: <Plane className="h-10 w-10 text-blue-500" />,
      title: t.whyChooseUs.flights,
      description: t.whyChooseUs.flightsDesc,
    },
    {
      icon: <Hotel className="h-10 w-10 text-blue-500" />,
      title: t.whyChooseUs.accommodations,
      description: t.whyChooseUs.accommodationsDesc,
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <WaveBackground />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 md:mb-4 text-blue-800">
            {t.whyChooseUs.title}
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">{t.whyChooseUs.subtitle}</p>
        </div>

        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              className="bg-white p-5 md:p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow shimmer-bg"
            >
              <div className="mb-3 md:mb-4">{feature.icon}</div>
              <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2 text-blue-700">{feature.title}</h3>
              <p className="text-sm md:text-base text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div
        className="absolute top-20 right-20 w-20 h-20 rounded-full bg-blue-400/10 floating-element"
        style={{ animationDelay: "0.2s" }}
      ></div>
    </section>
  )
}

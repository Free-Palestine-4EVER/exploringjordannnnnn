"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import BubbleButton from "@/components/bubble-button"
import WaveBackground from "@/components/wave-background"
import { useState } from "react"
import { useTranslations } from "@/lib/i18n/language-context"

export default function FeaturedDestinations() {
  const t = useTranslations()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const destinations = [
    {
      name: t.destinations.petra.name,
      image: "/images/jordan-1.jpg",
      description: t.destinations.petra.description,
      link: "/destinations/petra",
    },
    {
      name: t.destinations.wadiRum.name,
      image: "/images/wadi-rum-desert.jpg",
      description: t.destinations.wadiRum.description,
      link: "/destinations/wadi-rum",
    },
    {
      name: t.destinations.deadSea.name,
      image: "/images/dead-sea.jpg",
      description: t.destinations.deadSea.description,
      link: "/destinations/dead-sea",
    },
    {
      name: t.destinations.jerash.name,
      image: "/images/jerash.jpg",
      description: t.destinations.jerash.description,
      link: "/destinations/jerash",
    },
    {
      name: t.destinations.amman.name,
      image: "/images/amman.jpg",
      description: t.destinations.amman.description,
      link: "/destinations/amman",
    },
    {
      name: t.destinations.aqaba.name,
      image: "/images/aqaba.jpg",
      description: t.destinations.aqaba.description,
      link: "/destinations/aqaba",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-b from-blue-50 to-white">
      <div className="absolute inset-0 opacity-30">
        <WaveBackground />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 md:mb-4 text-blue-800">
            {t.featuredDestinations.title}
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            {t.featuredDestinations.subtitle}
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {destinations.map((destination, index) => (
            <DestinationCard key={index} destination={destination} index={index} item={item} />
          ))}
        </motion.div>

        <div className="text-center mt-12">
          <BubbleButton asChild size="lg" className="blue-gradient-bg">
            <Link href="/destinations">{t.featuredDestinations.viewAll}</Link>
          </BubbleButton>
        </div>
      </div>

      <div
        className="absolute top-1/4 left-10 w-24 h-24 rounded-full bg-blue-400/10 floating-element"
        style={{ animationDelay: "0.5s" }}
      ></div>
    </section>
  )
}

function DestinationCard({ destination, index, item }) {
  const t = useTranslations()
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  return (
    <motion.div variants={item}>
      <Link href={destination.link} className="group block">
        <div className="relative overflow-hidden rounded-xl aspect-[4/3] shadow-lg blue-glow bg-blue-100">
          {!isImageLoaded && (
            <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100 bg-[length:400%_100%]" />
          )}

          <Image
            src={destination.image || "/placeholder.svg?height=400&width=600&query=jordan landscape"}
            alt={destination.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`object-cover transition-transform duration-500 group-hover:scale-110 ${
              isImageLoaded ? "opacity-100" : "opacity-0"
            } transition-opacity duration-300`}
            onLoad={() => setIsImageLoaded(true)}
            loading={index < 3 ? "eager" : "lazy"}
            priority={index < 3}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 via-blue-800/20 to-transparent" />
          <div className="absolute bottom-0 left-0 p-3 sm:p-4 md:p-6">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 md:mb-2">{destination.name}</h3>
            <p className="text-sm md:text-base text-white/90 mb-2 md:mb-4 line-clamp-2">{destination.description}</p>
            <span className="inline-flex items-center text-sm md:text-base text-white font-medium">
              {t.common.explore}
              <ChevronRight className="h-3 w-3 md:h-4 md:w-4 ml-1 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

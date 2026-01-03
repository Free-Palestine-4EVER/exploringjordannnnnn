"use client"

import { useState } from "react"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import TourCardEnhanced from "@/components/tour-card-enhanced"
import HeroSection from "@/components/hero-section"
import WhyChooseUs from "@/components/why-choose-us"
import TestimonialsSection from "@/components/testimonials-section"
import FeaturedDestinations from "@/components/featured-destinations"
import NewsletterSection from "@/components/newsletter-section"
import BubbleButton from "@/components/bubble-button"
import { getAllTours } from "@/lib/tour-utils"
import Image from "next/image"
import TravelTipCard from "@/components/travel-tip-card"
import SecondaryHero from "@/components/secondary-hero"

export default function Home() {
  const allTours = getAllTours()
  const [selectedTourForCustomization, setSelectedTourForCustomization] = useState<string | null>(null)

  const jordanTours = allTours.filter(
    (tour) =>
      !tour.id.includes("egypt") &&
      !tour.id.includes("nile") &&
      !tour.id.includes("cultural-grand") &&
      !tour.id.includes("saudi") &&
      !tour.id.includes("alula") &&
      !tour.id.includes("arabia"),
  )

  const handleCustomize = (tourId: string) => {
    const tour = allTours.find((t) => t.id === tourId)
    if (tour) {
      window.location.href = `/customize?tour=${tour.slug}`
    }
  }

  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <SecondaryHero />

      <section className="container mx-auto py-12 px-4 md:py-24 bg-gradient-to-b from-amber-50 to-amber-100">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-amber-600 text-white hover:bg-amber-700">Discover Jordan</Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-amber-900">Our Jordan Tour Packages</h2>
          <p className="text-amber-800 max-w-2xl mx-auto">
            Explore the wonders of Jordan with our carefully crafted tour packages. From ancient Petra to the desert
            landscapes of Wadi Rum and the healing waters of the Dead Sea.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
          {jordanTours.map((tour, index) => (
            <TourCardEnhanced
              key={tour.id}
              tour={tour}
              priority={index === 0}
              onCustomize={handleCustomize}
              colorTheme="amber"
            />
          ))}
        </div>

        <div className="text-center">
          <BubbleButton asChild size="lg" className="gap-2 bg-amber-600 hover:bg-amber-700 text-white">
            <Link href="/tours">
              View All Jordan Tours
              <ChevronRight className="h-4 w-4" />
            </Link>
          </BubbleButton>
        </div>
      </section>

      <WhyChooseUs />

      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-sky-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-sky-100 text-sky-700 hover:bg-sky-200">Explore Jordan</Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-sky-800">Discover Jordan's Rich History</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Jordan is home to some of the world's most remarkable historical sites, from ancient cities to biblical
              landmarks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl bg-blue-100">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Jordan-1-anWkISAM0IiFjTu5OGA4d8sqmvBGmv.jpg"
                alt="Historical Jordan - Petra Treasury"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="lazy"
              />
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-sky-700">A Journey Through Time</h3>
              <p className="text-lg">
                Jordan's history spans thousands of years, with influences from the Nabataeans, Romans, Byzantines, and
                Islamic empires. Each civilization has left its mark on this incredible land.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <h4 className="font-bold text-sky-600">Petra</h4>
                  <p>Ancient city carved into rose-colored rock</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <h4 className="font-bold text-sky-600">Jerash</h4>
                  <p>Well-preserved Roman provincial city</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <h4 className="font-bold text-sky-600">Mount Nebo</h4>
                  <p>Where Moses viewed the Promised Land</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <h4 className="font-bold text-sky-600">Desert Castles</h4>
                  <p>Early Islamic art and architecture</p>
                </div>
              </div>
              <BubbleButton asChild>
                <Link href="/destinations">Explore Historical Sites</Link>
              </BubbleButton>
            </div>
          </div>
        </div>
      </section>

      <FeaturedDestinations />

      <section className="py-16 md:py-24 bg-gradient-to-b from-sky-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-sky-100 text-sky-700 hover:bg-sky-200">Tour Options</Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-sky-800">Choose Your Perfect Journey</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We offer multiple tour durations to fit your schedule. Each can be customized with your preferred hotel
              class, activities, and travel dates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {jordanTours.slice(0, 3).map((tour, index) => (
              <div
                key={tour.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className={`h-32 flex items-center justify-center ${index === 0
                      ? "bg-gradient-to-r from-sky-400 to-blue-400"
                      : index === 1
                        ? "bg-gradient-to-r from-cyan-400 to-sky-400"
                        : "bg-gradient-to-r from-blue-400 to-indigo-400"
                    }`}
                >
                  <div className="text-center text-white">
                    <h3 className="text-4xl font-bold">{tour.duration.days} Days</h3>
                    <p className="text-sm opacity-90">{tour.duration.nights} Nights</p>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="font-semibold text-lg mb-2 text-sky-700">{tour.title}</h4>
                  <p className="text-muted-foreground text-sm mb-4">{tour.tagline}</p>
                  <BubbleButton asChild variant="outline" className="w-full">
                    <Link href={`/tours/${tour.slug}`}>View Details</Link>
                  </BubbleButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection />

      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-sky-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-sky-100 text-sky-700 hover:bg-sky-200">Travel Tips</Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-sky-800">Prepare for Your Jordan Adventure</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Make the most of your journey with these helpful tips and insights about traveling in Jordan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TravelTipCard
              image="/images/jordan-culture.jpg"
              title="Cultural Etiquette"
              description="Jordan is a welcoming country with rich traditions. Learn about local customs and etiquette to enhance your experience."
            />

            <TravelTipCard
              image="/images/jordan-weather.jpg"
              title="Weather & Packing"
              description="Jordan's climate varies by region and season. Find out what to pack and when to visit for ideal conditions."
            />

            <TravelTipCard
              image="/images/jordan-cuisine.jpg"
              title="Cuisine & Dining"
              description="Jordanian cuisine offers delicious flavors and unique dishes. Discover what to try during your visit."
            />
          </div>
        </div>
      </section>

      <NewsletterSection />
    </main>
  )
}

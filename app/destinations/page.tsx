"use client"

import { ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import BubbleButton from "@/components/bubble-button"
import { useState } from "react"

export default function DestinationsPage() {
  const destinations = [
    {
      name: "Petra",
      description: "Discover the ancient city carved into rose-colored rock",
      image: "/images/petra.jpg",
      slug: "petra",
    },
    {
      name: "Wadi Rum",
      description: "Experience the otherworldly desert landscapes",
      image: "/images/wadi-rum-landscape.png",
      slug: "wadi-rum",
    },
    {
      name: "Dead Sea",
      description: "Float effortlessly in the mineral-rich waters",
      image: "/images/dead-sea-float.png",
      slug: "dead-sea",
    },
    {
      name: "Jerash",
      description: "Walk through one of the best preserved Roman cities",
      image: "/images/jerash.png",
      slug: "jerash",
    },
    {
      name: "Amman",
      description: "Explore Jordan's vibrant and historic capital city",
      image: "/images/amman.png",
      slug: "amman",
    },
    {
      name: "Aqaba",
      description: "Dive into the crystal clear waters of the Red Sea",
      image: "/images/aqaba.png",
      slug: "aqaba",
    },
  ]

  return (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span>Destinations</span>
        </div>

        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 md:mb-4">Explore Jordan's Treasures</h1>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            From ancient wonders to natural marvels, Jordan offers a diverse range of unforgettable destinations.
            Discover the magic of each unique location.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <DestinationCard key={destination.slug} destination={destination} />
          ))}
        </div>

        <div className="mt-16 bg-muted rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Can't Decide Where to Go?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Let our travel experts help you plan the perfect Jordan itinerary based on your interests, time, and budget.
          </p>
          <BubbleButton asChild size="lg">
            <Link href="/contact">Contact Our Travel Experts</Link>
          </BubbleButton>
        </div>
      </div>
    </main>
  )
}

// Separate component for destination card with loading state
function DestinationCard({ destination }) {
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  return (
    <Link
      href={`/destinations/${destination.slug}`}
      className="group block rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
    >
      <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
        {!isImageLoaded && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100 bg-[length:400%_100%]" />
        )}
        <Image
          src={destination.image || "/placeholder.svg"}
          alt={destination.name}
          fill
          className={`object-cover transition-transform duration-500 group-hover:scale-110 ${isImageLoaded ? "opacity-100" : "opacity-0"
            } transition-opacity duration-300`}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          onLoad={() => setIsImageLoaded(true)}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 p-3 sm:p-4 md:p-6">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 md:mb-2">{destination.name}</h2>
          <p className="text-sm md:text-base text-white/90 mb-2 md:mb-4 line-clamp-2">{destination.description}</p>
          <span className="inline-flex items-center text-sm md:text-base text-white font-medium">
            Explore
            <ChevronRight className="h-3 w-3 md:h-4 md:w-4 ml-1 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  )
}

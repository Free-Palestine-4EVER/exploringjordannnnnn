"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Hotel } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import BubbleButton from "@/components/bubble-button"
import { useState } from "react"
import type { Tour } from "@/lib/types/tour"
import { getMinPrice, formatPrice, getTourReviews } from "@/lib/tour-utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface TourCardEnhancedProps {
  tour: Tour
  priority?: boolean
  onCustomize?: (tourId: string) => void
  colorTheme?: "blue" | "amber" | "purple"
}

export default function TourCardEnhanced({
  tour,
  priority = false,
  onCustomize,
  colorTheme = "amber",
}: TourCardEnhancedProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [selectedHotelClass, setSelectedHotelClass] = useState<"5*" | "4*" | "3*">("4*")

  const imagePath = tour.heroImage.replace(".png", ".jpg")

  const colorVariants = {
    blue: {
      badge: "bg-sky-600 hover:bg-sky-700",
      title: "text-sky-700",
      pricingBg: "bg-sky-50",
      pricingText: "text-sky-700",
      pricingSubtext: "text-sky-600",
      highlightText: "text-sky-700 border-sky-200",
      button: "bg-blue-600 text-white hover:bg-blue-700",
      imageBg: "bg-blue-100",
      gradientFrom: "from-blue-100",
      gradientVia: "via-blue-200",
      gradientTo: "to-blue-100",
    },
    amber: {
      badge: "bg-amber-600 hover:bg-amber-700",
      title: "text-amber-700",
      pricingBg: "bg-amber-50",
      pricingText: "text-amber-700",
      pricingSubtext: "text-amber-600",
      highlightText: "text-amber-700 border-amber-200",
      button: "bg-amber-600 text-white hover:bg-amber-700",
      imageBg: "bg-amber-100",
      gradientFrom: "from-amber-100",
      gradientVia: "via-amber-200",
      gradientTo: "to-amber-100",
    },
    purple: {
      badge: "bg-purple-600 hover:bg-purple-700",
      title: "text-purple-700",
      pricingBg: "bg-purple-50",
      pricingText: "text-purple-700",
      pricingSubtext: "text-purple-600",
      highlightText: "text-purple-700 border-purple-200",
      button: "bg-purple-600 text-white hover:bg-purple-700",
      imageBg: "bg-purple-100",
      gradientFrom: "from-purple-100",
      gradientVia: "via-purple-200",
      gradientTo: "to-purple-100",
    },
  }

  const colors = colorVariants[colorTheme]

  const hotelModifiers = {
    "5*": 1.2,
    "4*": 1.0,
    "3*": 0.85,
  }

  const modifier = hotelModifiers[selectedHotelClass]

  const allPrices = tour.seasonPricing.flatMap((season) =>
    Object.values(season.ppUsd)
      .filter((_, idx) => idx < 5)
      .map((price) => Math.round(price * modifier)),
  )
  const lowestPrice = Math.min(...allPrices)
  const highestPrice = Math.max(...allPrices)
  const minPrice = getMinPrice(tour, selectedHotelClass)

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
      <Card className="overflow-hidden h-full flex flex-col group border-none shadow-lg">
        <div className={`relative h-[400px] overflow-hidden ${colors.imageBg}`}>
          {tour.images && tour.images.length > 0 ? (
            <Carousel
              className="w-full h-full"
              opts={{
                align: "start",
                loop: true,
              }}
            >
              <CarouselContent>
                {tour.images.map((img, index) => (
                  <CarouselItem key={index} className="h-full">
                    <div className="relative w-full h-[400px]">
                      <Image
                        src={img || "/placeholder.svg?height=800&width=600&query=jordan landscape"}
                        alt={`${tour.title} - Image ${index + 1}`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                        loading={priority && index === 0 ? "eager" : "lazy"}
                        priority={priority && index === 0}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 text-white h-10 w-10 [&>svg]:h-6 [&>svg]:w-6" />
              <CarouselNext className="right-2 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 text-white h-10 w-10 [&>svg]:h-6 [&>svg]:w-6" />
            </Carousel>
          ) : (
            <>
              {!isImageLoaded && (
                <div
                  className={`absolute inset-0 animate-pulse bg-gradient-to-r ${colors.gradientFrom} ${colors.gradientVia} ${colors.gradientTo} bg-[length:400%_100%]`}
                />
              )}

              <Image
                src={imagePath || "/placeholder.svg?height=800&width=600&query=jordan landscape"}
                alt={tour.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className={`object-cover transition-transform duration-500 group-hover:scale-110 ${isImageLoaded ? "opacity-100" : "opacity-0"
                  } transition-opacity duration-300`}
                onLoad={() => setIsImageLoaded(true)}
                loading={priority ? "eager" : "lazy"}
                priority={priority}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </>
          )}

          <Badge className={`absolute top-4 left-4 ${colors.badge} z-10 font-medium`}>
            {tour.duration.days} Days / {tour.duration.nights} Nights
          </Badge>
        </div>

        <CardContent className="pt-4 md:pt-6 flex-grow bg-white px-4 md:px-6">
          <h3 className={`text-base md:text-xl font-bold mb-1 ${colors.title}`}>{tour.title}</h3>

          <div className="flex items-center gap-1 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 md:w-4 md:h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">({getTourReviews(tour.slug)} reviews)</span>
          </div>

          <p className="text-xs md:text-sm text-muted-foreground mb-3">{tour.tagline}</p>

          <div className="mb-4">
            <label className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
              <Hotel className="h-3 w-3" />
              Hotel Class
            </label>
            <Select
              value={selectedHotelClass}
              onValueChange={(value) => setSelectedHotelClass(value as "5*" | "4*" | "3*")}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5*">5-Star Luxury</SelectItem>
                <SelectItem value="4*">4-Star Superior</SelectItem>
                <SelectItem value="3*">3-Star Comfort</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className={`${colors.pricingBg} rounded-lg p-3 mb-4`}>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-xs text-muted-foreground">From</span>
              <span className={`text-xl md:text-2xl font-bold ${colors.pricingText}`}>{formatPrice(minPrice)}</span>
              <span className="text-xs text-muted-foreground">per person</span>
            </div>
            <p className="text-xs text-muted-foreground">Based on 6-7 people • {selectedHotelClass} hotels</p>
            <p className={`text-xs ${colors.pricingSubtext} mt-1`}>
              Price range: {formatPrice(lowestPrice)} - {formatPrice(highestPrice)}
            </p>
          </div>

          <div className="mb-4">
            <p className="text-xs font-medium text-muted-foreground mb-2">Tour Highlights:</p>
            <div className="flex flex-wrap gap-1.5">
              {tour.highlights.slice(0, 4).map((highlight, idx) => (
                <Badge key={idx} variant="outline" className={`bg-white ${colors.highlightText} text-xs`}>
                  {highlight}
                </Badge>
              ))}
              {tour.highlights.length > 4 && (
                <Badge variant="outline" className={`bg-white ${colors.highlightText} text-xs`}>
                  +{tour.highlights.length - 4} more
                </Badge>
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter className="pt-0 pb-4 px-4 md:px-6 bg-white flex flex-col gap-2">
          <BubbleButton asChild className="w-full">
            <Link href={`/tours/${tour.slug}`}>View Full Details</Link>
          </BubbleButton>
          <BubbleButton className={`w-full ${colors.button}`} onClick={() => onCustomize?.(tour.id)}>
            Book this trip
          </BubbleButton>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

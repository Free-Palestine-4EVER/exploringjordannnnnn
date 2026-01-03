"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import BubbleButton from "@/components/bubble-button"
import { useState } from "react"

interface TourCardProps {
  title: string
  days: number
  price: number
  image: string
  rating: number
  reviews: number
  slug: string
  featured?: boolean
  priority?: boolean
}

export default function TourCard({
  title,
  days,
  price,
  image,
  rating,
  reviews,
  slug,
  featured = false,
  priority = false,
}: TourCardProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  // Convert .png to .jpg for all image paths
  const imagePath = image.replace(".png", ".jpg")

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
      <Card className="overflow-hidden h-full flex flex-col group border-none shadow-lg">
        <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden bg-blue-100">
          {/* Placeholder shimmer effect while image loads */}
          {!isImageLoaded && (
            <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100 bg-[length:400%_100%]" />
          )}

          <Image
            src={imagePath || "/placeholder.svg?height=400&width=600&query=jordan landscape"}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`object-cover transition-transform duration-500 group-hover:scale-110 ${
              isImageLoaded ? "opacity-100" : "opacity-0"
            } transition-opacity duration-300`}
            onLoad={() => setIsImageLoaded(true)}
            loading={priority ? "eager" : "lazy"}
            priority={priority}
          />

          {featured && <Badge className="absolute top-4 left-4 bg-sky-600 hover:bg-sky-700 z-10">Featured</Badge>}
          <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-black/60 text-white text-sm px-2 py-1 rounded-full z-10">
            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
            <span>{rating}</span>
            <span className="text-white/70">({reviews})</span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        </div>
        <CardContent className="pt-4 md:pt-6 flex-grow bg-white px-4 md:px-6">
          <div className="flex items-center gap-2 mb-1 md:mb-2 text-muted-foreground text-xs md:text-sm">
            <Calendar className="h-3 w-3 md:h-4 md:w-4" />
            <span>{days} days</span>
            <span className="mx-1 md:mx-2">•</span>
            <MapPin className="h-3 w-3 md:h-4 md:w-4" />
            <span>Jordan</span>
          </div>
          <h3 className="text-base md:text-xl font-bold mb-1 md:mb-2 text-sky-700 line-clamp-2">{title}</h3>
          <div className="flex items-baseline gap-1 mb-2 md:mb-4">
            <span className="text-lg md:text-xl font-bold text-sky-700">${price}</span>
            <span className="text-xs md:text-sm text-muted-foreground">per person</span>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="outline" className="bg-sky-50 text-sky-700 border-sky-200">
              Petra
            </Badge>
            <Badge variant="outline" className="bg-sky-50 text-sky-700 border-sky-200">
              Dead Sea
            </Badge>
            <Badge variant="outline" className="bg-sky-50 text-sky-700 border-sky-200">
              Wadi Rum
            </Badge>
          </div>
        </CardContent>
        <CardFooter className="pt-0 pb-6 px-6 bg-white">
          <BubbleButton asChild className="w-full">
            <Link href={`/tours/${slug}`}>View Details</Link>
          </BubbleButton>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

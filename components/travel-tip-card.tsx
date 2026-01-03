"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import BubbleButton from "@/components/bubble-button"

interface TravelTipCardProps {
  image: string
  title: string
  description: string
}

export default function TravelTipCard({ image, title, description }: TravelTipCardProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  return (
    <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300">
      <div className="relative h-48 bg-blue-100">
        {!isImageLoaded && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100 bg-[length:400%_100%]" />
        )}

        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className={`object-cover ${isImageLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
          onLoad={() => setIsImageLoaded(true)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
          loading="lazy"
        />
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-2 text-sky-700">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        <BubbleButton asChild variant="outline" className="w-full">
          <Link href="/travel-tips">Read More</Link>
        </BubbleButton>
      </CardContent>
    </Card>
  )
}

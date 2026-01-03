"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight, Info } from "lucide-react"
import Link from "next/link"
import TourCardEnhanced from "@/components/tour-card-enhanced"
import { getAllTours } from "@/lib/tour-utils"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ToursPage() {
  const tours = getAllTours()
  const [selectedTourForCustomization, setSelectedTourForCustomization] = useState<string | null>(null)

  const handleCustomize = (tourId: string) => {
    // Scroll to customizer or open modal
    setSelectedTourForCustomization(tourId)
    // For now, redirect to tour detail page where customizer will be
    const tour = tours.find((t) => t.id === tourId)
    if (tour) {
      window.location.href = `/tours/${tour.slug}#customize`
    }
  }

  return (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span>Tours</span>
        </div>

        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 md:mb-4 text-sky-800">
            Our Jordan Tour Packages
          </h1>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            Choose from our three carefully crafted tour packages. Each tour can be fully customized to match your
            preferences, travel dates, and budget.
          </p>
        </div>

        <Alert className="mb-8 bg-sky-50 border-sky-200">
          <Info className="h-4 w-4 text-sky-600" />
          <AlertDescription className="text-sky-900">
            All tours can be customized! Select your preferred hotel class to see pricing, then click "Tailor this trip"
            to personalize your itinerary, add activities, and request a quote.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {tours.map((tour, index) => (
            <TourCardEnhanced key={tour.id} tour={tour} priority={index === 0} onCustomize={handleCustomize} />
          ))}
        </div>

        <Card className="bg-gradient-to-br from-sky-50 to-blue-50 border-sky-200">
          <CardContent className="p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4 text-sky-800">Why Choose Our Tours?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-sky-700 mb-2">Flexible Customization</h3>
                <p className="text-sm text-muted-foreground">
                  Every tour can be tailored to your needs. Change hotels, add activities, adjust the itinerary, or
                  modify travel dates.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-sky-700 mb-2">Transparent Pricing</h3>
                <p className="text-sm text-muted-foreground">
                  See prices for different hotel classes and group sizes. No hidden fees - what you see is what you get.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-sky-700 mb-2">Expert Local Guides</h3>
                <p className="text-sm text-muted-foreground">
                  All tours include licensed English-speaking guides who bring Jordan's history and culture to life.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-sky-700 mb-2">All-Inclusive Packages</h3>
                <p className="text-sm text-muted-foreground">
                  Transportation, accommodation, meals (half board), entrance fees, and activities are all included.
                </p>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-sky-200">
              <p className="text-sm text-muted-foreground mb-4">
                Need help choosing the right tour? Our team is here to assist you.
              </p>
              <Button asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

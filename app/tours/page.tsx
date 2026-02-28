"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight, Info } from "lucide-react"
import Link from "next/link"
import TourCardEnhanced from "@/components/tour-card-enhanced"
import { getAllTours } from "@/lib/tour-utils"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useTranslations } from "@/lib/i18n/language-context"

export default function ToursPage() {
  const t = useTranslations()
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
            {t.breadcrumb.home}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span>{t.breadcrumb.tours}</span>
        </div>

        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 md:mb-4 text-sky-800">
            {t.toursPage.title}
          </h1>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            {t.toursPage.subtitle}
          </p>
        </div>

        <Alert className="mb-8 bg-sky-50 border-sky-200">
          <Info className="h-4 w-4 text-sky-600" />
          <AlertDescription className="text-sky-900">
            {t.toursPage.alert}
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {tours.map((tour, index) => (
            <TourCardEnhanced key={tour.id} tour={tour} priority={index === 0} onCustomize={handleCustomize} />
          ))}
        </div>

        <Card className="bg-gradient-to-br from-sky-50 to-blue-50 border-sky-200">
          <CardContent className="p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4 text-sky-800">{t.toursPage.whyChoose}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-sky-700 mb-2">{t.toursPage.flexible}</h3>
                <p className="text-sm text-muted-foreground">{t.toursPage.flexibleDesc}</p>
              </div>
              <div>
                <h3 className="font-semibold text-sky-700 mb-2">{t.toursPage.transparent}</h3>
                <p className="text-sm text-muted-foreground">{t.toursPage.transparentDesc}</p>
              </div>
              <div>
                <h3 className="font-semibold text-sky-700 mb-2">{t.toursPage.expertGuides}</h3>
                <p className="text-sm text-muted-foreground">{t.toursPage.expertGuidesDesc}</p>
              </div>
              <div>
                <h3 className="font-semibold text-sky-700 mb-2">{t.toursPage.allInclusive}</h3>
                <p className="text-sm text-muted-foreground">{t.toursPage.allInclusiveDesc}</p>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-sky-200">
              <p className="text-sm text-muted-foreground mb-4">
                {t.toursPage.needHelp}
              </p>
              <Button asChild>
                <Link href="/contact">{t.common.contactUs}</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

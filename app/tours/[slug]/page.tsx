"use client"

import {
  ChevronRight,
  Calendar,
  Check,
  Clock,
  Info,
  MapPin,
  Shield,
  Users,
  Phone,
  Mail,
  Hotel,
  DollarSign,
  Star,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import Link from "next/link"
import BubbleButton from "@/components/bubble-button"
import { useState, useEffect, use } from "react"
import { getTourBySlug, formatPrice, getTourReviews } from "@/lib/tour-utils"
import toursData from "@/data/tours.json"
import { notFound } from "next/navigation"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon, Send, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import UniversalBookingForm from "@/components/universal-booking-form"


interface TourPageProps {
  params: {
    slug: string
  }
}

export default function TourPage({ params }: TourPageProps) {
  const { slug } = use(params)
  const tour = getTourBySlug(slug)

  if (!tour) {
    notFound()
  }

  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({})
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedHotelClass, setSelectedHotelClass] = useState<"5*" | "4*" | "3*">("4*")
  const [carouselApi, setCarouselApi] = useState<CarouselApi>()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slideCount, setSlideCount] = useState(0)

  // Booking form state
  const [startDate, setStartDate] = useState<Date>(new Date()) // Default to today
  const [groupSize, setGroupSize] = useState("2to3")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    specialRequests: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleImageLoad = (imageKey: string) => {
    setLoadedImages((prev) => ({
      ...prev,
      [imageKey]: true,
    }))
  }

  useEffect(() => {
    if (!carouselApi) return

    setSlideCount(carouselApi.scrollSnapList().length)
    setCurrentSlide(carouselApi.selectedScrollSnap())

    carouselApi.on("select", () => {
      setCurrentSlide(carouselApi.selectedScrollSnap())
    })
  }, [carouselApi])

  const imagePath = tour.heroImage
  const reviewCount = getTourReviews(tour.slug)

  return (
    <main className="pt-24 pb-16 bg-gradient-to-b from-amber-50 to-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Breadcrumb */}
            <div className="mb-8">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Link href="/" className="hover:underline">
                  Home
                </Link>
                <ChevronRight className="h-3 w-3" />
                <Link href="/tours" className="hover:underline">
                  Tours
                </Link>
                <ChevronRight className="h-3 w-3" />
                <span>{tour.title}</span>
              </div>

              {/* Title and Info */}
              <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-3 md:mb-4">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-900">{tour.title}</h1>
                <div className="flex items-center gap-1">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">({reviewCount} reviews)</span>
                </div>
              </div>

              <p className="text-lg text-muted-foreground mb-4">{tour.tagline}</p>

              <div className="flex flex-wrap gap-3 md:gap-4">
                <div className="flex items-center gap-1 text-muted-foreground text-sm">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {tour.duration.days} days / {tour.duration.nights} nights
                  </span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground text-sm">
                  <MapPin className="h-4 w-4" />
                  <span>Jordan</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground text-sm">
                  <Users className="h-4 w-4" />
                  <span>Private tour</span>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative aspect-[16/9] mb-4 md:mb-8 rounded-xl overflow-hidden shadow-lg">
              <div
                className={`absolute inset-0 animate-pulse bg-gradient-to-r from-amber-100 via-amber-200 to-amber-100 bg-[length:400%_100%] ${loadedImages["hero"] ? "hidden" : "block"}`}
              />
              <Image
                src={imagePath || "/placeholder.svg?height=600&width=1200&query=jordan petra"}
                alt={tour.title}
                fill
                className={`object-cover ${loadedImages["hero"] ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}
                onLoad={() => handleImageLoad("hero")}
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-4 md:p-6">
                <h2 className="text-xl md:text-2xl font-bold text-white">Experience the Magic of Jordan</h2>
              </div>
            </div>

            {/* Photo Gallery */}
            {tour.images && tour.images.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-amber-900">Tour Gallery</h2>
                <div className="relative">
                  <Carousel
                    className="w-full"
                    setApi={setCarouselApi}
                    opts={{
                      align: "start",
                      loop: true,
                    }}
                    onSelect={() => {
                      if (!carouselApi) return
                      setCurrentSlide(carouselApi.selectedScrollSnap())
                    }}
                  >
                    <CarouselContent className="-ml-2 md:-ml-4">
                      {tour.images.map((img, index) => (
                        <CarouselItem key={index} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                          <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-md">
                            <Image
                              src={img}
                              alt={`${tour.title} - Photo ${index + 1}`}
                              fill
                              className="object-cover hover:scale-105 transition-transform duration-300"
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    {/* Modern Navigation Arrows */}
                    <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/95 backdrop-blur-sm shadow-xl border-0 hover:bg-white hover:scale-110 transition-all duration-200 z-10">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-amber-700">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                      </svg>
                    </CarouselPrevious>
                    <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/95 backdrop-blur-sm shadow-xl border-0 hover:bg-white hover:scale-110 transition-all duration-200 z-10">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-amber-700">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </CarouselNext>
                  </Carousel>

                  {/* Circular Indicator Dots */}
                  <div className="flex justify-center items-center gap-3 mt-6">
                    {tour.images.map((_, index) => (
                      <div
                        key={index}
                        onClick={() => carouselApi?.scrollTo(index)}
                        className={`w-3 h-3 min-w-[12px] min-h-[12px] flex-shrink-0 rounded-full cursor-pointer transition-all duration-300 ${index === currentSlide
                          ? "bg-amber-600 shadow-lg scale-125"
                          : "bg-amber-300 hover:bg-amber-500"
                          }`}
                        role="button"
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tabs */}
            <div className="mb-8">
              <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-4 mb-6">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                  <TabsTrigger value="hotels">Hotels</TabsTrigger>
                  <TabsTrigger value="pricing">Pricing</TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="mt-0">
                  <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                    <h2 className="text-2xl font-bold mb-4 text-amber-800">Tour Highlights</h2>
                    <div className="grid md:grid-cols-2 gap-3">
                      {tour.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-start gap-2 bg-amber-50 p-3 rounded-lg">
                          <Check className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                    <h2 className="text-2xl font-bold mb-4 text-amber-800">Tour Route</h2>
                    <div className="flex flex-wrap gap-2">
                      {tour.route.map((location, index) => (
                        <Badge key={index} variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                          {location}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl shadow-md p-6">
                      <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-amber-800">
                        <Check className="h-5 w-5 text-primary" />
                        What's Included
                      </h3>
                      <ul className="space-y-2">
                        {tour.inclusions.map((item, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6">
                      <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-700">
                        <Info className="h-5 w-5 text-gray-500" />
                        What's Not Included
                      </h3>
                      <ul className="space-y-2">
                        {tour.exclusions.map((item, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                            <ChevronRight className="h-4 w-4 mt-0.5 flex-shrink-0 text-gray-400" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </TabsContent>

                {/* Itinerary Tab */}
                <TabsContent value="itinerary" className="mt-0">
                  <div className="bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-2xl font-bold mb-6 text-amber-800">Day-by-Day Itinerary</h2>
                    <div className="space-y-4">
                      {tour.dailyPlan.map((day) => (
                        <Card key={day.day} className="overflow-hidden border-none shadow-md">
                          <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-4">
                            <div className="flex items-center justify-between">
                              <h3 className="font-bold text-lg">Day {day.day}</h3>
                              <Badge variant="secondary" className="bg-white/20">
                                {day.title}
                              </Badge>
                            </div>
                          </div>
                          <CardContent className="p-4">
                            <p className="mb-3">{day.body}</p>
                            {day.activities && day.activities.length > 0 && (
                              <div className="mb-2">
                                <p className="text-sm font-medium text-muted-foreground mb-1">Activities:</p>
                                <div className="flex flex-wrap gap-1">
                                  {day.activities.map((activity, idx) => (
                                    <Badge key={idx} variant="outline" className="text-xs">
                                      {activity}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                            {day.meals && day.meals.length > 0 && (
                              <div>
                                <p className="text-sm font-medium text-muted-foreground mb-1">Meals:</p>
                                <p className="text-sm">{day.meals.join(", ")}</p>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {/* Hotels Tab */}
                <TabsContent value="hotels" className="mt-0">
                  <div className="bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-2xl font-bold mb-4 text-amber-800">Accommodation Options</h2>
                    <p className="text-muted-foreground mb-6">
                      Choose from three hotel classes. All hotels are carefully selected for quality, location, and
                      comfort. Hotels listed are examples - similar properties may be used based on availability.
                    </p>

                    <Accordion type="single" collapsible className="w-full">
                      {tour.hotelOptions.map((option, index) => (
                        <AccordionItem key={index} value={`class-${index}`}>
                          <AccordionTrigger className="text-lg font-semibold">
                            <div className="flex items-center gap-2">
                              <Hotel className="h-5 w-5 text-amber-600" />
                              {option.class} Hotels
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="grid md:grid-cols-2 gap-4 pt-2">
                              <div className="bg-amber-50 p-4 rounded-lg">
                                <p className="font-medium text-sm text-amber-700 mb-2">Amman</p>
                                <ul className="text-sm space-y-1">
                                  {option.am?.map((hotel, idx) => (
                                    <li key={idx}>• {hotel}</li>
                                  )) || <li>Not specified</li>}
                                </ul>
                              </div>
                              <div className="bg-amber-50 p-4 rounded-lg">
                                <p className="font-medium text-sm text-amber-700 mb-2">Petra</p>
                                <ul className="text-sm space-y-1">
                                  {option.pe?.map((hotel, idx) => (
                                    <li key={idx}>• {hotel}</li>
                                  )) || <li>Not specified</li>}
                                </ul>
                              </div>
                              <div className="bg-amber-50 p-4 rounded-lg">
                                <p className="font-medium text-sm text-amber-700 mb-2">Wadi Rum</p>
                                <ul className="text-sm space-y-1">
                                  {option.wr?.map((hotel, idx) => (
                                    <li key={idx}>• {hotel}</li>
                                  )) || <li>Not specified</li>}
                                </ul>
                              </div>
                              <div className="bg-amber-50 p-4 rounded-lg">
                                <p className="font-medium text-sm text-amber-700 mb-2">Dead Sea</p>
                                <ul className="text-sm space-y-1">
                                  {option.ds?.map((hotel, idx) => (
                                    <li key={idx}>• {hotel}</li>
                                  )) || <li>Not specified</li>}
                                </ul>
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground mt-3 italic">
                              * Or similar properties based on availability
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </TabsContent>

                {/* Pricing Tab */}
                <TabsContent value="pricing" className="mt-0">
                  <div className="bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-2xl font-bold mb-4 text-amber-800">Tour Pricing</h2>
                    <p className="text-muted-foreground mb-6">
                      Prices vary by season, group size, and hotel class. Select options below to see pricing details.
                    </p>

                    {tour.seasonPricing.map((season, seasonIdx) => (
                      <div key={seasonIdx} className="mb-8">
                        <div className="flex items-center gap-2 mb-4">
                          <Badge className={season.season === "High" ? "bg-orange-500" : "bg-green-500"}>
                            {season.season} Season
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {season.ranges
                              .map((range) => {
                                const [start, end] = range.split("..")
                                return `${new Date(start).toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${new Date(end).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`
                              })
                              .join(", ")}
                          </span>
                        </div>

                        <div className="overflow-x-auto">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Group Size</TableHead>
                                <TableHead className="text-right">Price per Person</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow>
                                <TableCell>2 travelers</TableCell>
                                <TableCell className="text-right font-semibold">
                                  {formatPrice(season.ppUsd["2pax"])}
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>3-5 travelers</TableCell>
                                <TableCell className="text-right font-semibold">
                                  {formatPrice(season.ppUsd["3to5"])}
                                </TableCell>
                              </TableRow>
                              <TableRow className="bg-amber-50">
                                <TableCell className="font-medium">6-7 travelers (Most Popular)</TableCell>
                                <TableCell className="text-right font-semibold text-amber-700">
                                  {formatPrice(season.ppUsd["6to7"])}
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>8-9 travelers</TableCell>
                                <TableCell className="text-right font-semibold">
                                  {formatPrice(season.ppUsd["8to9"])}
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>10-14 travelers</TableCell>
                                <TableCell className="text-right font-semibold">
                                  {formatPrice(season.ppUsd["10to14"])}
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Single Room Supplement</TableCell>
                                <TableCell className="text-right font-semibold">
                                  {formatPrice(season.ppUsd.singleSupp)}
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                    ))}

                    <div className="mt-6 bg-amber-50 p-4 rounded-lg">
                      <p className="text-sm text-amber-900">
                        <strong>Note:</strong> Prices shown are for 4-star hotels. Prices vary by hotel class selection.
                        Final pricing will be confirmed based on your specific requirements and travel dates.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Booking Form */}
              <UniversalBookingForm preSelectedTourId={tour.id} />


              {/* Contact Card */}
              <Card className="border-none shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-4">
                  <h3 className="font-bold text-xl">Need Help?</h3>
                  <p className="text-white/90 text-sm">We're here to assist you</p>
                </div>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 bg-amber-50 p-4 rounded-lg">
                      <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center shadow-sm flex-shrink-0">
                        <Phone className="h-6 w-6 text-amber-600" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Call us</div>
                        <a href="tel:+41766633924" className="font-medium hover:underline text-amber-700">
                          +41 76 663 39 24
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 bg-amber-50 p-4 rounded-lg">
                      <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center shadow-sm flex-shrink-0">
                        <Mail className="h-6 w-6 text-amber-600" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Email us</div>
                        <a
                          href="mailto:info@jordanexplorer.com"
                          className="font-medium hover:underline text-amber-700 text-sm"
                        >
                          info@jordanexplorer.com
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div >
        </div >
      </div >
    </main >
  )
}

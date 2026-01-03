"use client"

import type React from "react"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, Check, Calendar, Users, Hotel, Plus, DollarSign, Send } from "lucide-react"
import Link from "next/link"
import { getAllTours, getTourBySlug, calculateTourPrice, formatPrice } from "@/lib/tour-utils"
import type { Tour } from "@/lib/types/tour"
import { Alert, AlertDescription } from "@/components/ui/alert"

function CustomizerContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const tourSlug = searchParams.get("tour")

  const tours = getAllTours()
  const [selectedTour, setSelectedTour] = useState<Tour | null>(
    tourSlug ? getTourBySlug(tourSlug) || tours[0] : tours[0],
  )

  // Form state
  const [startDate, setStartDate] = useState("")
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [hotelClass, setHotelClass] = useState<"5*" | "4*" | "3*">("4*")
  const [arrivalFlight, setArrivalFlight] = useState("")
  const [arrivalTime, setArrivalTime] = useState("")
  const [pickupLocation, setPickupLocation] = useState("AMM Airport")
  const [dietary, setDietary] = useState("")
  const [roomingNotes, setRoomingNotes] = useState("")
  const [selectedAddons, setSelectedAddons] = useState<string[]>([])
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [whatsapp, setWhatsapp] = useState("")
  const [notes, setNotes] = useState("")
  const [currentStep, setCurrentStep] = useState(1)
  const [priceEstimate, setPriceEstimate] = useState<any>(null)

  // Calculate price when relevant fields change
  useEffect(() => {
    if (selectedTour && startDate) {
      try {
        const totalPax = adults + children
        const estimate = calculateTourPrice(
          selectedTour,
          new Date(startDate),
          totalPax,
          hotelClass,
          selectedAddons,
          false,
        )
        setPriceEstimate(estimate)
      } catch (error) {
        console.error("Price calculation error:", error)
        setPriceEstimate(null)
      }
    }
  }, [selectedTour, startDate, adults, children, hotelClass, selectedAddons])

  const handleAddonToggle = (addonCode: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonCode) ? prev.filter((code) => code !== addonCode) : [...prev, addonCode],
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const customization = {
      tourId: selectedTour?.id,
      tourTitle: selectedTour?.title,
      startDate,
      pax: { adults, children },
      hotelClass,
      arrivalFlight,
      arrivalTime,
      pickupLocation,
      dietary,
      roomingNotes,
      selectedAddons,
      contactInfo: { name, email, phone, whatsapp, notes },
      priceEstimate,
    }

    // In a real app, this would send to an API
    console.log("Customization request:", customization)

    // Redirect to thank you page
    router.push("/thank-you")
  }

  const totalPax = adults + children

  return (
    <main className="pt-24 pb-16 bg-gradient-to-b from-sky-50 to-white">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/tours" className="hover:underline">
            Tours
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span>Customize Your Trip</span>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-sky-800">Customize Your Jordan Experience</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Tailor your perfect Jordan adventure. Choose your tour, travel dates, hotel class, and add special
            experiences to create your dream trip.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2 md:gap-4">
            {[
              { num: 1, label: "Tour & Dates" },
              { num: 2, label: "Hotels & Add-ons" },
              { num: 3, label: "Contact Info" },
            ].map((step) => (
              <div key={step.num} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${
                    currentStep >= step.num ? "bg-sky-600 text-white" : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {currentStep > step.num ? <Check className="h-5 w-5" /> : step.num}
                </div>
                <span className="ml-2 text-sm font-medium hidden md:inline">{step.label}</span>
                {step.num < 3 && <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Tour & Dates */}
              {currentStep === 1 && (
                <Card className="border-none shadow-lg">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-6 text-sky-700">Select Tour & Travel Dates</h2>

                    <div className="space-y-6">
                      {/* Tour Selection */}
                      <div>
                        <Label htmlFor="tour" className="text-base font-semibold mb-3 block">
                          Choose Your Tour
                        </Label>
                        <Select
                          value={selectedTour?.id}
                          onValueChange={(value) => {
                            const tour = tours.find((t) => t.id === value)
                            setSelectedTour(tour || null)
                          }}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {tours.map((tour) => (
                              <SelectItem key={tour.id} value={tour.id}>
                                {tour.title} ({tour.duration.days} days / {tour.duration.nights} nights)
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {selectedTour && <p className="text-sm text-muted-foreground mt-2">{selectedTour.tagline}</p>}
                      </div>

                      {/* Start Date */}
                      <div>
                        <Label htmlFor="startDate" className="text-base font-semibold mb-3 block">
                          <Calendar className="h-4 w-4 inline mr-2" />
                          Start Date
                        </Label>
                        <Input
                          id="startDate"
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          min={new Date().toISOString().split("T")[0]}
                          required
                          className="w-full"
                        />
                      </div>

                      {/* Number of Travelers */}
                      <div>
                        <Label className="text-base font-semibold mb-3 block">
                          <Users className="h-4 w-4 inline mr-2" />
                          Number of Travelers
                        </Label>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="adults" className="text-sm mb-2 block">
                              Adults (18+)
                            </Label>
                            <Input
                              id="adults"
                              type="number"
                              min="1"
                              max="14"
                              value={adults}
                              onChange={(e) => setAdults(Number.parseInt(e.target.value))}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="children" className="text-sm mb-2 block">
                              Children (0-17)
                            </Label>
                            <Input
                              id="children"
                              type="number"
                              min="0"
                              max="6"
                              value={children}
                              onChange={(e) => setChildren(Number.parseInt(e.target.value))}
                            />
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">Total travelers: {totalPax}</p>
                      </div>

                      {/* Arrival Details */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="arrivalFlight" className="text-sm mb-2 block">
                            Arrival Flight (optional)
                          </Label>
                          <Input
                            id="arrivalFlight"
                            placeholder="e.g., RJ123"
                            value={arrivalFlight}
                            onChange={(e) => setArrivalFlight(e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="arrivalTime" className="text-sm mb-2 block">
                            Arrival Time (optional)
                          </Label>
                          <Input
                            id="arrivalTime"
                            type="time"
                            value={arrivalTime}
                            onChange={(e) => setArrivalTime(e.target.value)}
                          />
                        </div>
                      </div>

                      {/* Pickup Location */}
                      <div>
                        <Label htmlFor="pickup" className="text-sm mb-2 block">
                          Pickup Location
                        </Label>
                        <Select value={pickupLocation} onValueChange={setPickupLocation}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="AMM Airport">Queen Alia International Airport (AMM)</SelectItem>
                            <SelectItem value="Amman Hotel">Amman Hotel</SelectItem>
                            <SelectItem value="Aqaba">Aqaba</SelectItem>
                            <SelectItem value="Other">Other (specify in notes)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="mt-8 flex justify-end">
                      <Button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        disabled={!selectedTour || !startDate || totalPax < 1}
                        size="lg"
                      >
                        Next: Hotels & Add-ons
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 2: Hotels & Add-ons */}
              {currentStep === 2 && selectedTour && (
                <Card className="border-none shadow-lg">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-6 text-sky-700">Choose Hotels & Add-ons</h2>

                    <div className="space-y-6">
                      {/* Hotel Class Selection */}
                      <div>
                        <Label className="text-base font-semibold mb-3 block">
                          <Hotel className="h-4 w-4 inline mr-2" />
                          Hotel Class
                        </Label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {selectedTour.hotelOptions.map((option) => (
                            <div
                              key={option.class}
                              className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                                hotelClass === option.class
                                  ? "border-sky-600 bg-sky-50"
                                  : "border-gray-200 hover:border-sky-300"
                              }`}
                              onClick={() => setHotelClass(option.class)}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-bold text-lg">{option.class}</span>
                                {hotelClass === option.class && <Check className="h-5 w-5 text-sky-600" />}
                              </div>
                              <p className="text-xs text-muted-foreground mb-2">Sample hotels:</p>
                              <ul className="text-xs space-y-1">
                                <li>• {option.am[0]}</li>
                                <li>• {option.pe[0]}</li>
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Dietary Requirements */}
                      <div>
                        <Label htmlFor="dietary" className="text-sm mb-2 block">
                          Dietary Requirements (optional)
                        </Label>
                        <Input
                          id="dietary"
                          placeholder="e.g., Vegetarian, Vegan, Allergies"
                          value={dietary}
                          onChange={(e) => setDietary(e.target.value)}
                        />
                      </div>

                      {/* Rooming Notes */}
                      <div>
                        <Label htmlFor="rooming" className="text-sm mb-2 block">
                          Rooming Preferences (optional)
                        </Label>
                        <Textarea
                          id="rooming"
                          placeholder="e.g., Twin beds, connecting rooms, etc."
                          value={roomingNotes}
                          onChange={(e) => setRoomingNotes(e.target.value)}
                          rows={2}
                        />
                      </div>

                      {/* Add-ons */}
                      {selectedTour.addons.length > 0 && (
                        <div>
                          <Label className="text-base font-semibold mb-3 block">
                            <Plus className="h-4 w-4 inline mr-2" />
                            Optional Add-ons
                          </Label>
                          <div className="space-y-3">
                            {selectedTour.addons.map((addon) => (
                              <div
                                key={addon.code}
                                className="flex items-center justify-between bg-sky-50 p-4 rounded-lg"
                              >
                                <div className="flex items-center gap-3">
                                  <Checkbox
                                    id={addon.code}
                                    checked={selectedAddons.includes(addon.code)}
                                    onCheckedChange={() => handleAddonToggle(addon.code)}
                                  />
                                  <Label htmlFor={addon.code} className="cursor-pointer">
                                    {addon.label}
                                  </Label>
                                </div>
                                <span className="font-semibold text-sky-700">{formatPrice(addon.priceUsd)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mt-8 flex justify-between">
                      <Button type="button" variant="outline" onClick={() => setCurrentStep(1)}>
                        Back
                      </Button>
                      <Button type="button" onClick={() => setCurrentStep(3)} size="lg">
                        Next: Contact Info
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 3: Contact Info */}
              {currentStep === 3 && (
                <Card className="border-none shadow-lg">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-6 text-sky-700">Your Contact Information</h2>

                    <div className="space-y-6">
                      <div>
                        <Label htmlFor="name" className="text-sm mb-2 block">
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          placeholder="John Doe"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="email" className="text-sm mb-2 block">
                            Email Address *
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone" className="text-sm mb-2 block">
                            Phone Number *
                          </Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+1 234 567 8900"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="whatsapp" className="text-sm mb-2 block">
                          WhatsApp Number (optional)
                        </Label>
                        <Input
                          id="whatsapp"
                          type="tel"
                          placeholder="+1 234 567 8900"
                          value={whatsapp}
                          onChange={(e) => setWhatsapp(e.target.value)}
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          For quick communication and updates during your trip
                        </p>
                      </div>

                      <div>
                        <Label htmlFor="notes" className="text-sm mb-2 block">
                          Additional Notes or Requests (optional)
                        </Label>
                        <Textarea
                          id="notes"
                          placeholder="Any special requests, questions, or additional information..."
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          rows={4}
                        />
                      </div>

                      <div className="flex items-start gap-2 bg-blue-50 p-4 rounded-lg">
                        <Checkbox id="consent" required />
                        <Label htmlFor="consent" className="text-sm cursor-pointer">
                          I agree to receive communication about my trip inquiry and understand that my information will
                          be used according to the privacy policy.
                        </Label>
                      </div>
                    </div>

                    <div className="mt-8 flex justify-between">
                      <Button type="button" variant="outline" onClick={() => setCurrentStep(2)}>
                        Back
                      </Button>
                      <Button type="submit" size="lg" className="bg-sky-600 hover:bg-sky-700">
                        <Send className="h-4 w-4 mr-2" />
                        Submit Request
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </form>
          </div>

          {/* Sidebar - Price Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="border-none shadow-lg">
                <div className="bg-gradient-to-r from-sky-500 to-blue-500 text-white p-4">
                  <h3 className="font-bold text-xl">
                    <DollarSign className="h-5 w-5 inline mr-2" />
                    Price Estimate
                  </h3>
                </div>
                <CardContent className="p-6">
                  {selectedTour && priceEstimate ? (
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Selected Tour</p>
                        <p className="font-semibold">{selectedTour.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {selectedTour.duration.days} days / {selectedTour.duration.nights} nights
                        </p>
                      </div>

                      <div className="border-t pt-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span>Travelers:</span>
                          <span className="font-medium">{totalPax} people</span>
                        </div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Hotel Class:</span>
                          <span className="font-medium">{hotelClass}</span>
                        </div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Season:</span>
                          <Badge variant="outline">{priceEstimate.season}</Badge>
                        </div>
                      </div>

                      <div className="border-t pt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Base Price:</span>
                          <span className="font-medium">{formatPrice(priceEstimate.basePrice)}</span>
                        </div>
                        {priceEstimate.addonsPrice > 0 && (
                          <div className="flex justify-between text-sm">
                            <span>Add-ons:</span>
                            <span className="font-medium">{formatPrice(priceEstimate.addonsPrice)}</span>
                          </div>
                        )}
                        {priceEstimate.singleSupplement > 0 && (
                          <div className="flex justify-between text-sm">
                            <span>Single Supplement:</span>
                            <span className="font-medium">{formatPrice(priceEstimate.singleSupplement)}</span>
                          </div>
                        )}
                      </div>

                      <div className="border-t pt-4">
                        <div className="flex justify-between items-baseline mb-1">
                          <span className="text-lg font-bold">Total Estimate:</span>
                          <span className="text-2xl font-bold text-sky-700">
                            {formatPrice(priceEstimate.totalPrice)}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {formatPrice(priceEstimate.pricePerPerson)} per person
                        </p>
                      </div>

                      <Alert className="bg-blue-50 border-blue-200">
                        <AlertDescription className="text-xs text-blue-900">
                          This is an estimated price. Final pricing will be confirmed by our team based on availability
                          and your specific requirements.
                        </AlertDescription>
                      </Alert>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">Select a tour and start date to see pricing</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="mt-6 bg-white p-6 rounded-xl shadow-lg">
                <h3 className="font-bold text-lg mb-4 text-sky-700">What Happens Next?</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-sky-600 mt-0.5 flex-shrink-0" />
                    <span>We'll review your request within 24 hours</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-sky-600 mt-0.5 flex-shrink-0" />
                    <span>Receive a detailed quote with confirmed pricing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-sky-600 mt-0.5 flex-shrink-0" />
                    <span>Make any final adjustments to your itinerary</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-sky-600 mt-0.5 flex-shrink-0" />
                    <span>Confirm and secure your booking</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default function CustomizePage() {
  return (
    <Suspense fallback={<div className="pt-24 pb-16 text-center">Loading...</div>}>
      <CustomizerContent />
    </Suspense>
  )
}

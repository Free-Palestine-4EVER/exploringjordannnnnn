"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon, Sparkles, Send, CheckCircle2 } from "lucide-react"
import toursData from "@/data/tours.json"

export default function BookNowPage() {
  const [selectedTourId, setSelectedTourId] = useState("")
  const [startDate, setStartDate] = useState<Date>()
  const [groupSize, setGroupSize] = useState("2to3")
  const [hotelClass, setHotelClass] = useState("4*")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    specialRequests: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const allTours = toursData as any[]
  const tours = allTours.filter((tour) => {
    const title = tour.title.toLowerCase()
    return !title.includes("egypt") && !title.includes("saudi") && !title.includes("alula")
  })
  const selectedTour = tours.find((t) => t.id === selectedTourId)

  const calculatePrice = () => {
    if (!selectedTour || !startDate) return 0

    const month = startDate.getMonth() + 1
    let season = "Low"
    if ((month >= 3 && month <= 5) || (month >= 9 && month <= 11)) {
      season = "High"
    }

    const seasonPricing = selectedTour.seasonPricing.find((s: any) => s.season === season)
    if (!seasonPricing) return 0

    const pricePerPerson = seasonPricing.ppUsd[groupSize] || 0
    return pricePerPerson
  }

  const getTotalPrice = () => {
    const pricePerPerson = calculatePrice()
    const groupSizeMap: { [key: string]: number } = {
      "2to3": 2,
      "4to5": 4,
      "6to7": 6,
      "8plus": 8,
    }
    const numPeople = groupSizeMap[groupSize] || 2
    return pricePerPerson * numPeople
  }

  const getSeason = () => {
    if (!startDate) return "Low"
    const month = startDate.getMonth() + 1
    return (month >= 3 && month <= 5) || (month >= 9 && month <= 11) ? "High" : "Low"
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Booking submitted:", {
      tour: selectedTour,
      startDate,
      groupSize,
      hotelClass,
      ...formData,
    })
    setIsSubmitted(true)

    if (typeof window !== "undefined" && (window as any).gtag) {
      ;(window as any).gtag("event", "conversion", {
        send_to: "AW-17670467400/RGcgCOvy2L0bEMje9-lB",
      })
    }

    setTimeout(() => {
      setIsSubmitted(false)
    }, 5000)
  }

  const isFormValid =
    selectedTourId &&
    startDate &&
    formData.firstName &&
    formData.lastName &&
    formData.email &&
    formData.phone &&
    formData.country

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Book Your Dream Journey</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Complete Your Booking</h1>
            <p className="text-lg text-blue-100">Fill out the form below and we'll get back to you within 24 hours</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Booking Form */}
            <div className="lg:col-span-2">
              <Card className="p-8 shadow-xl border-0 bg-white">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Tour Selection */}
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">Tour Selection</h2>
                      <p className="text-gray-600 text-sm">Choose your preferred tour package</p>
                    </div>
                    <div>
                      <Label htmlFor="tour">Select Tour *</Label>
                      <Select value={selectedTourId} onValueChange={setSelectedTourId}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Choose a tour..." />
                        </SelectTrigger>
                        <SelectContent>
                          {tours.map((tour) => (
                            <SelectItem key={tour.id} value={tour.id}>
                              {tour.title} - {tour.tagline}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Travel Details */}
                  <div className="space-y-4 pt-6 border-t">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">Travel Details</h2>
                      <p className="text-gray-600 text-sm">When would you like to travel?</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="start-date">Departure Date *</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal h-12",
                                !startDate && "text-muted-foreground",
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {startDate ? format(startDate, "PPP") : "Pick a date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={startDate}
                              onSelect={setStartDate}
                              disabled={(date) => date < new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div>
                        <Label htmlFor="group-size">Group Size *</Label>
                        <Select value={groupSize} onValueChange={setGroupSize}>
                          <SelectTrigger className="h-12">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="2to3">2-3 People</SelectItem>
                            <SelectItem value="4to5">4-5 People</SelectItem>
                            <SelectItem value="6to7">6-7 People</SelectItem>
                            <SelectItem value="8plus">8+ People</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="hotel-class">Hotel Class *</Label>
                      <Select value={hotelClass} onValueChange={setHotelClass}>
                        <SelectTrigger className="h-12">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3*">3 Star - Comfortable</SelectItem>
                          <SelectItem value="4*">4 Star - Superior</SelectItem>
                          <SelectItem value="5*">5 Star - Luxury</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Personal Information */}
                  <div className="space-y-4 pt-6 border-t">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">Your Information</h2>
                      <p className="text-gray-600 text-sm">We'll use this to confirm your booking</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className="h-12"
                          placeholder="John"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className="h-12"
                          placeholder="Doe"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="h-12"
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="h-12"
                          placeholder="+1 (555) 000-0000"
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="country">Country of Residence *</Label>
                        <Input
                          id="country"
                          value={formData.country}
                          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                          className="h-12"
                          placeholder="United States"
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
                        <Textarea
                          id="specialRequests"
                          value={formData.specialRequests}
                          onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                          rows={4}
                          placeholder="Any dietary requirements, accessibility needs, or special occasions..."
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6 border-t">
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-blue-600 hover:bg-blue-700 h-14 text-lg"
                      disabled={!isFormValid || isSubmitted}
                    >
                      {isSubmitted ? (
                        <>
                          <CheckCircle2 className="w-5 h-5 mr-2" />
                          Booking Request Sent!
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Submit Booking Request
                        </>
                      )}
                    </Button>
                    {isSubmitted && (
                      <p className="text-center text-green-600 mt-4 font-medium">
                        Thank you! We'll contact you within 24 hours to confirm your booking.
                      </p>
                    )}
                  </div>
                </form>
              </Card>
            </div>

            {/* Right Column - Price Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-40">
                <Card className="p-6 shadow-xl border-0 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
                  <h3 className="text-2xl font-bold mb-6">Booking Summary</h3>

                  {selectedTour ? (
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-bold text-lg mb-1">{selectedTour.title}</h4>
                        <p className="text-blue-100 text-sm">{selectedTour.tagline}</p>
                        <p className="text-blue-200 text-sm mt-2">
                          {selectedTour.duration.days} days / {selectedTour.duration.nights} nights
                        </p>
                      </div>

                      <div className="border-t border-blue-400 pt-4 space-y-3">
                        {startDate && (
                          <>
                            <div className="flex justify-between text-sm">
                              <span className="text-blue-100">Departure:</span>
                              <span className="font-semibold">{format(startDate, "PPP")}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-blue-100">Season:</span>
                              <span className="font-semibold">{getSeason()} Season</span>
                            </div>
                          </>
                        )}
                        <div className="flex justify-between text-sm">
                          <span className="text-blue-100">Group size:</span>
                          <span className="font-semibold">{groupSize.replace("to", "-")} people</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-blue-100">Hotel class:</span>
                          <span className="font-semibold">{hotelClass}</span>
                        </div>
                        {startDate && (
                          <div className="flex justify-between text-sm">
                            <span className="text-blue-100">Price per person:</span>
                            <span className="font-semibold">${calculatePrice().toLocaleString()}</span>
                          </div>
                        )}
                      </div>

                      <div className="border-t border-blue-400 pt-4">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-semibold">Total Estimate:</span>
                          <span className="text-3xl font-bold">
                            {startDate ? `$${getTotalPrice().toLocaleString()}` : "$0"}
                          </span>
                        </div>
                        <p className="text-xs text-blue-100 mt-2">
                          *Based on {groupSize.split("to")[0]} travelers. Final price confirmed after booking.
                        </p>
                      </div>

                      <div className="bg-white/10 backdrop-blur rounded-lg p-4 mt-4">
                        <h5 className="font-semibold mb-2 flex items-center gap-2">
                          <Sparkles className="w-4 h-4" />
                          What's Included
                        </h5>
                        <ul className="text-sm space-y-1 text-blue-100">
                          <li>✓ Free eSIM with unlimited data</li>
                          <li>✓ Expert local guides</li>
                          <li>✓ All entrance fees</li>
                          <li>✓ Hotel accommodations</li>
                          <li>✓ Daily breakfast</li>
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-blue-100">Select a tour to see pricing details</p>
                    </div>
                  )}
                </Card>

                <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-900 mb-2">Cancellation Policy</h4>
                  <p className="text-sm text-green-700">Full refund if cancelled 30 days before the trip</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

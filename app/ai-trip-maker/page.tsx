"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  MapPin,
  Compass,
  Calendar,
  Users,
  DollarSign,
  Hotel,
  Check,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Send,
  Mountain,
  Waves,
  Landmark,
  Camera,
  Utensils,
  ShoppingBag,
  Tent,
  Plane,
} from "lucide-react"

const countries = [
  {
    id: "jordan",
    name: "Jordan",
    color: "blue",
    image: "/petra-treasury-jordan.jpg",
    cities: ["Amman", "Petra", "Wadi Rum", "Dead Sea", "Jerash", "Aqaba"],
  },
  {
    id: "egypt",
    name: "Egypt",
    color: "amber",
    image: "/cairo-pyramids-giza.jpg",
    cities: ["Cairo", "Luxor", "Aswan", "Alexandria", "Hurghada"],
  },
  {
    id: "saudi",
    name: "Saudi Arabia",
    color: "purple",
    image: "/alula-hegra-saudi-arabia-ancient-ruins.jpg",
    cities: ["AlUla", "Riyadh", "Jeddah", "Medina"],
  },
]

const activities = [
  { id: "jeep", name: "Jeep Tours", icon: Mountain, description: "Off-road desert adventures" },
  { id: "diving", name: "Diving & Snorkeling", icon: Waves, description: "Explore underwater wonders" },
  { id: "balloon", name: "Hot Air Balloon", icon: Plane, description: "Aerial views of landscapes" },
  { id: "sandboarding", name: "Sandboarding", icon: Mountain, description: "Surf the desert dunes" },
  { id: "history", name: "Historical Sites", icon: Landmark, description: "Ancient ruins and monuments" },
  { id: "photography", name: "Photography Tours", icon: Camera, description: "Capture stunning moments" },
  { id: "culinary", name: "Culinary Experiences", icon: Utensils, description: "Local food and cooking" },
  { id: "shopping", name: "Shopping & Souks", icon: ShoppingBag, description: "Traditional markets" },
  { id: "camping", name: "Desert Camping", icon: Tent, description: "Overnight under the stars" },
]

export default function AITripMakerPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    countries: [] as string[],
    cities: [] as string[],
    activities: [] as string[],
    duration: "",
    budget: "",
    travelDates: "",
    groupSize: "",
    accommodation: "",
    specialRequests: "",
    name: "",
    email: "",
    phone: "",
  })

  const totalSteps = 7

  const handleCountryToggle = (countryId: string) => {
    setFormData((prev) => {
      const countries = prev.countries.includes(countryId)
        ? prev.countries.filter((c) => c !== countryId)
        : prev.countries.length < 3
          ? [...prev.countries, countryId]
          : prev.countries

      // Reset cities when countries change
      const validCities = prev.cities.filter((city) =>
        countries.some((c) => countries.find((country) => country === c) && getCountryCities(c).includes(city)),
      )

      return { ...prev, countries, cities: validCities }
    })
  }

  const getCountryCities = (countryId: string) => {
    return countries.find((c) => c.id === countryId)?.cities || []
  }

  const handleCityToggle = (city: string) => {
    setFormData((prev) => ({
      ...prev,
      cities: prev.cities.includes(city) ? prev.cities.filter((c) => c !== city) : [...prev.cities, city],
    }))
  }

  const handleActivityToggle = (activityId: string) => {
    setFormData((prev) => ({
      ...prev,
      activities: prev.activities.includes(activityId)
        ? prev.activities.filter((a) => a !== activityId)
        : [...prev.activities, activityId],
    }))
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleSubmit = async () => {
    // Here you would send the data to your backend/email service
    console.log("[v0] Trip Builder Form Data:", formData)
    alert("Your custom itinerary request has been sent! We'll contact you shortly.")
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.countries.length > 0
      case 2:
        return formData.cities.length > 0
      case 3:
        return formData.activities.length > 0
      case 4:
        return formData.duration && formData.travelDates
      case 5:
        return formData.budget && formData.accommodation
      case 6:
        return formData.groupSize
      case 7:
        return formData.name && formData.email
      default:
        return false
    }
  }

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        bg: "bg-blue-500",
        hover: "hover:bg-blue-600",
        border: "border-blue-500",
        text: "text-blue-600",
        bgLight: "bg-blue-50",
      },
      amber: {
        bg: "bg-amber-500",
        hover: "hover:bg-amber-600",
        border: "border-amber-500",
        text: "text-amber-600",
        bgLight: "bg-amber-50",
      },
      purple: {
        bg: "bg-purple-500",
        hover: "hover:bg-purple-600",
        border: "border-purple-500",
        text: "text-purple-600",
        bgLight: "bg-purple-50",
      },
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-amber-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Sparkles className="h-5 w-5" />
              <span className="text-sm font-medium">Smart Trip Builder</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Create Your Perfect Journey</h1>
            <p className="text-xl text-white/90">
              Answer a few questions and we'll craft a personalized itinerary just for you
            </p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b sticky top-24 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">
                Step {currentStep} of {totalSteps}
              </span>
              <span className="text-sm text-gray-500">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-500 ease-out"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 md:p-12 shadow-xl">
            {/* Step 1: Select Countries */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-center mb-8">
                  <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h2 className="text-3xl font-bold mb-2">Where do you want to go?</h2>
                  <p className="text-gray-600">Select up to 3 countries for your adventure</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {countries.map((country) => {
                    const isSelected = formData.countries.includes(country.id)
                    const colors = getColorClasses(country.color)

                    return (
                      <button
                        key={country.id}
                        onClick={() => handleCountryToggle(country.id)}
                        disabled={!isSelected && formData.countries.length >= 3}
                        className={`relative group overflow-hidden rounded-xl transition-all duration-300 ${
                          isSelected
                            ? `ring-4 ${colors.border} scale-105`
                            : "hover:scale-105 opacity-80 hover:opacity-100"
                        } ${!isSelected && formData.countries.length >= 3 ? "opacity-40 cursor-not-allowed" : ""}`}
                      >
                        <div className="aspect-[4/5] relative">
                          <img
                            src={country.image || "/placeholder.svg"}
                            alt={country.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                          {isSelected && (
                            <div className={`absolute top-4 right-4 ${colors.bg} text-white rounded-full p-2`}>
                              <Check className="h-5 w-5" />
                            </div>
                          )}

                          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                            <h3 className="text-2xl font-bold mb-1">{country.name}</h3>
                            <p className="text-sm text-white/80">{country.cities.length} cities available</p>
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>

                {formData.countries.length > 0 && (
                  <div className="text-center text-sm text-gray-600 animate-in fade-in duration-300">
                    {formData.countries.length} {formData.countries.length === 1 ? "country" : "countries"} selected
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Select Cities */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-center mb-8">
                  <Compass className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <h2 className="text-3xl font-bold mb-2">Which cities interest you?</h2>
                  <p className="text-gray-600">Select the cities you'd like to explore</p>
                </div>

                <div className="space-y-6">
                  {formData.countries.map((countryId) => {
                    const country = countries.find((c) => c.id === countryId)
                    if (!country) return null
                    const colors = getColorClasses(country.color)

                    return (
                      <div key={countryId} className="space-y-3">
                        <h3 className={`text-xl font-semibold ${colors.text} flex items-center gap-2`}>
                          <MapPin className="h-5 w-5" />
                          {country.name}
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {country.cities.map((city) => {
                            const isSelected = formData.cities.includes(city)
                            return (
                              <button
                                key={city}
                                onClick={() => handleCityToggle(city)}
                                className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                                  isSelected
                                    ? `${colors.border} ${colors.bgLight} shadow-md`
                                    : "border-gray-200 hover:border-gray-300 hover:shadow"
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span className="font-medium">{city}</span>
                                  {isSelected && <Check className={`h-5 w-5 ${colors.text}`} />}
                                </div>
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Step 3: Select Activities */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-center mb-8">
                  <Sparkles className="h-12 w-12 text-amber-600 mx-auto mb-4" />
                  <h2 className="text-3xl font-bold mb-2">What experiences excite you?</h2>
                  <p className="text-gray-600">Choose the activities you'd love to try</p>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  {activities.map((activity) => {
                    const isSelected = formData.activities.includes(activity.id)
                    const Icon = activity.icon

                    return (
                      <button
                        key={activity.id}
                        onClick={() => handleActivityToggle(activity.id)}
                        className={`p-6 rounded-xl border-2 transition-all duration-200 text-left group ${
                          isSelected
                            ? "border-blue-500 bg-blue-50 shadow-lg scale-105"
                            : "border-gray-200 hover:border-blue-300 hover:shadow-md"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div
                            className={`p-3 rounded-lg ${isSelected ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600 group-hover:bg-blue-100"} transition-colors`}
                          >
                            <Icon className="h-6 w-6" />
                          </div>
                          {isSelected && <Check className="h-5 w-5 text-blue-600" />}
                        </div>
                        <h3 className="font-semibold mb-1">{activity.name}</h3>
                        <p className="text-sm text-gray-600">{activity.description}</p>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Step 4: Duration & Dates */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-center mb-8">
                  <Calendar className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h2 className="text-3xl font-bold mb-2">When are you traveling?</h2>
                  <p className="text-gray-600">Tell us about your trip timeline</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="duration">Trip Duration</Label>
                    <select
                      id="duration"
                      value={formData.duration}
                      onChange={(e) => setFormData((prev) => ({ ...prev, duration: e.target.value }))}
                      className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    >
                      <option value="">Select duration</option>
                      <option value="5-7">5-7 days</option>
                      <option value="8-10">8-10 days</option>
                      <option value="11-14">11-14 days</option>
                      <option value="15+">15+ days</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="travelDates">Preferred Travel Dates</Label>
                    <Input
                      id="travelDates"
                      type="text"
                      placeholder="e.g., March 2025"
                      value={formData.travelDates}
                      onChange={(e) => setFormData((prev) => ({ ...prev, travelDates: e.target.value }))}
                      className="border-2 border-gray-200 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Budget & Accommodation */}
            {currentStep === 5 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-center mb-8">
                  <DollarSign className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                  <h2 className="text-3xl font-bold mb-2">What's your budget?</h2>
                  <p className="text-gray-600">Help us tailor the perfect experience</p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget per Person (USD)</Label>
                    <select
                      id="budget"
                      value={formData.budget}
                      onChange={(e) => setFormData((prev) => ({ ...prev, budget: e.target.value }))}
                      className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    >
                      <option value="">Select budget range</option>
                      <option value="1000-2000">$1,000 - $2,000</option>
                      <option value="2000-3500">$2,000 - $3,500</option>
                      <option value="3500-5000">$3,500 - $5,000</option>
                      <option value="5000+">$5,000+</option>
                    </select>
                  </div>

                  <div className="space-y-3">
                    <Label>Accommodation Preference</Label>
                    <div className="grid md:grid-cols-3 gap-4">
                      {["3-Star", "4-Star", "5-Star"].map((level) => (
                        <button
                          key={level}
                          onClick={() => setFormData((prev) => ({ ...prev, accommodation: level }))}
                          className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                            formData.accommodation === level
                              ? "border-blue-500 bg-blue-50 shadow-lg"
                              : "border-gray-200 hover:border-blue-300"
                          }`}
                        >
                          <Hotel
                            className={`h-8 w-8 mx-auto mb-2 ${formData.accommodation === level ? "text-blue-600" : "text-gray-400"}`}
                          />
                          <div className="font-semibold text-center">{level}</div>
                          <div className="text-sm text-gray-600 text-center mt-1">
                            {level === "3-Star" && "Comfortable & Budget-friendly"}
                            {level === "4-Star" && "Superior Comfort"}
                            {level === "5-Star" && "Luxury Experience"}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 6: Group Size & Special Requests */}
            {currentStep === 6 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-center mb-8">
                  <Users className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
                  <h2 className="text-3xl font-bold mb-2">Tell us about your group</h2>
                  <p className="text-gray-600">Any special requirements or preferences?</p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="groupSize">Number of Travelers</Label>
                    <select
                      id="groupSize"
                      value={formData.groupSize}
                      onChange={(e) => setFormData((prev) => ({ ...prev, groupSize: e.target.value }))}
                      className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    >
                      <option value="">Select group size</option>
                      <option value="1">Solo Traveler</option>
                      <option value="2">2 People</option>
                      <option value="3-5">3-5 People</option>
                      <option value="6-7">6-7 People</option>
                      <option value="8+">8+ People</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialRequests">Special Requests or Preferences (Optional)</Label>
                    <Textarea
                      id="specialRequests"
                      placeholder="Tell us about dietary restrictions, accessibility needs, special occasions, or anything else we should know..."
                      value={formData.specialRequests}
                      onChange={(e) => setFormData((prev) => ({ ...prev, specialRequests: e.target.value }))}
                      className="min-h-32 border-2 border-gray-200 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 7: Contact Information */}
            {currentStep === 7 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-center mb-8">
                  <Send className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h2 className="text-3xl font-bold mb-2">Almost there!</h2>
                  <p className="text-gray-600">Where should we send your custom itinerary?</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      className="border-2 border-gray-200 focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      className="border-2 border-gray-200 focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number (Optional)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                      className="border-2 border-gray-200 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Summary */}
                <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border-2 border-blue-100">
                  <h3 className="font-semibold text-lg mb-4">Your Trip Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Countries:</span>
                      <span className="font-medium">
                        {formData.countries.map((c) => countries.find((country) => country.id === c)?.name).join(", ")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cities:</span>
                      <span className="font-medium">{formData.cities.length} selected</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Activities:</span>
                      <span className="font-medium">{formData.activities.length} selected</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">{formData.duration} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Budget:</span>
                      <span className="font-medium">${formData.budget} per person</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Accommodation:</span>
                      <span className="font-medium">{formData.accommodation}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Group Size:</span>
                      <span className="font-medium">{formData.groupSize} travelers</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-12 pt-8 border-t">
              <Button
                onClick={handleBack}
                disabled={currentStep === 1}
                variant="outline"
                size="lg"
                className="gap-2 bg-transparent"
              >
                <ChevronLeft className="h-5 w-5" />
                Back
              </Button>

              {currentStep < totalSteps ? (
                <Button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  size="lg"
                  className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Continue
                  <ChevronRight className="h-5 w-5" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!canProceed()}
                  size="lg"
                  className="gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                >
                  <Send className="h-5 w-5" />
                  Send My Itinerary
                </Button>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

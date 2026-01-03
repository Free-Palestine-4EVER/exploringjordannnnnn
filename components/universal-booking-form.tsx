"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { CheckCircle2, Send } from "lucide-react"
import toursData from "@/data/tours.json"

interface BookingFormProps {
    preSelectedTourId?: string
    destinationName?: string
}

export default function UniversalBookingForm({ preSelectedTourId, destinationName }: BookingFormProps) {
    // Filter Jordan tours only
    const jordanTours = (toursData as any[]).filter((t: any) => {
        const title = t.title.toLowerCase()
        return !title.includes("egypt") && !title.includes("saudi") && !title.includes("alula")
    })

    const [selectedTourId, setSelectedTourId] = useState(preSelectedTourId || "")
    const [startDate, setStartDate] = useState(format(new Date(), "yyyy-MM-dd"))
    const [groupSize, setGroupSize] = useState("2-3")
    const [hotelClass, setHotelClass] = useState("4-star")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [country, setCountry] = useState("")
    const [requests, setRequests] = useState("")
    const [isSubmitted, setIsSubmitted] = useState(false)

    const selectedTour = jordanTours.find((t: any) => t.id === selectedTourId)

    // Calculate price
    const calculatePrice = () => {
        const days = selectedTour?.duration?.days || 7
        let basePrice = 150 * days

        // Season
        const month = new Date(startDate).getMonth() + 1
        if ((month >= 3 && month <= 5) || (month >= 9 && month <= 11)) {
            basePrice *= 1.2
        }

        // Group size
        if (groupSize === "1") basePrice *= 1.5
        else if (groupSize === "4-5") basePrice *= 0.85
        else if (groupSize === "6-7") basePrice *= 0.75
        else if (groupSize === "8+") basePrice *= 0.65

        // Hotel
        if (hotelClass === "5-star") basePrice *= 1.3
        else if (hotelClass === "3-star") basePrice *= 0.8

        return Math.round(basePrice)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const response = await fetch('/api/booking', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: `${firstName} ${lastName}`,
                    email,
                    phone,
                    tourTitle: selectedTour?.title || destinationName || 'General Inquiry',
                    message: `
Booking Request
Tour: ${selectedTour?.title || destinationName || 'Not specified'}
Departure: ${startDate}
Group: ${groupSize} people
Hotel: ${hotelClass}
Country: ${country}
Requests: ${requests || 'None'}
                    `.trim()
                })
            })

            if (response.ok) {
                setIsSubmitted(true)
                setTimeout(() => setIsSubmitted(false), 5000)
            } else {
                alert('Failed to send. Please try again.')
            }
        } catch (error) {
            alert('Failed to send. Please try again.')
        }
    }

    const pricePerPerson = selectedTourId ? calculatePrice() : 0
    const numPeople = groupSize === "1" ? 1 : groupSize === "8+" ? 8 : parseInt(groupSize.split("-")[0])

    return (
        <Card className="border-none shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-6">
                <h3 className="font-bold text-2xl mb-1">Book Your Tour</h3>
                <p className="text-amber-100 text-sm">Get instant price estimate</p>
            </div>

            <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Tour Selection */}
                    <div>
                        <Label htmlFor="tour-select" className="text-sm font-bold text-gray-900 mb-2 block">Select Tour *</Label>
                        <select
                            id="tour-select"
                            value={selectedTourId}
                            onChange={(e) => setSelectedTourId(e.target.value)}
                            className="flex h-12 w-full rounded-md border border-gray-300 bg-amber-50 border-amber-200 px-3 py-2 text-sm"
                            required
                        >
                            <option value="">Choose a tour...</option>
                            {jordanTours.map((tour: any) => (
                                <option key={tour.id} value={tour.id}>
                                    {tour.title} - {tour.tagline}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Travel Details */}
                    <div className="space-y-4 pt-6 border-t border-gray-200">
                        <h4 className="text-lg font-bold text-gray-900 mb-1">Travel Details</h4>

                        <div>
                            <Label htmlFor="start-date" className="text-sm font-bold text-gray-900 mb-2 block">Departure Date *</Label>
                            <input
                                id="start-date"
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                min={format(new Date(), "yyyy-MM-dd")}
                                className="flex h-12 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                                style={{
                                    WebkitAppearance: 'none',
                                    MozAppearance: 'none',
                                    appearance: 'none',
                                    height: '48px',
                                    minHeight: '48px',
                                    maxHeight: '48px'
                                }}
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="group-size" className="text-sm font-bold text-gray-900 mb-2 block">Group Size *</Label>
                            <select
                                id="group-size"
                                value={groupSize}
                                onChange={(e) => setGroupSize(e.target.value)}
                                className="flex h-12 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                                required
                            >
                                <option value="1">1 Person</option>
                                <option value="2-3">2-3 People</option>
                                <option value="4-5">4-5 People</option>
                                <option value="6-7">6-7 People</option>
                                <option value="8+">8+ People</option>
                            </select>
                        </div>

                        <div>
                            <Label htmlFor="hotel-class" className="text-sm font-bold text-gray-900 mb-2 block">Hotel Class *</Label>
                            <select
                                id="hotel-class"
                                value={hotelClass}
                                onChange={(e) => setHotelClass(e.target.value)}
                                className="flex h-12 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                                required
                            >
                                <option value="3-star">⭐⭐⭐ Comfortable</option>
                                <option value="4-star">⭐⭐⭐⭐ Superior</option>
                                <option value="5-star">⭐⭐⭐⭐⭐ Luxury</option>
                            </select>
                        </div>
                    </div>

                    {/* Price Summary */}
                    {selectedTourId && (
                        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-5 space-y-3 border border-amber-200 shadow-sm">
                            <h4 className="font-semibold text-gray-900 text-sm mb-2">Price Summary</h4>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Tour:</span>
                                <span className="font-medium">{selectedTour?.title}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Duration:</span>
                                <span className="font-medium">{selectedTour?.duration?.days} days</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Season:</span>
                                <span className="font-medium">
                                    {(() => {
                                        const month = new Date(startDate).getMonth() + 1
                                        return ((month >= 3 && month <= 5) || (month >= 9 && month <= 11)) ? "High" : "Low"
                                    })()} Season
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Price per person:</span>
                                <span className="font-semibold text-amber-700">${pricePerPerson}</span>
                            </div>
                            <div className="border-t-2 border-amber-400 pt-3 flex justify-between items-center">
                                <span className="font-bold text-gray-900">Total Estimate:</span>
                                <span className="text-2xl font-bold text-amber-600">${pricePerPerson * numPeople}</span>
                            </div>
                            <p className="text-xs text-gray-500 pt-1">
                                *Based on {numPeople} traveler{numPeople > 1 ? 's' : ''}. Final price confirmed after booking.
                            </p>
                        </div>
                    )}

                    {/* Personal Information */}
                    <div className="pt-6 border-t border-gray-200">
                        <h4 className="text-lg font-bold text-gray-900 mb-4">Your Information</h4>

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <Label htmlFor="firstName" className="text-sm font-bold text-gray-900 mb-2 block">First Name *</Label>
                                    <input
                                        id="firstName"
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        placeholder="John"
                                        className="flex h-12 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="lastName" className="text-sm font-bold text-gray-900 mb-2 block">Last Name *</Label>
                                    <input
                                        id="lastName"
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        placeholder="Doe"
                                        className="flex h-12 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="email" className="text-sm font-bold text-gray-900 mb-2 block">Email *</Label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="john@example.com"
                                    className="flex h-12 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="phone" className="text-sm font-bold text-gray-900 mb-2 block">Phone *</Label>
                                <input
                                    id="phone"
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="+1 (555) 000-0000"
                                    className="flex h-12 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="country" className="text-sm font-bold text-gray-900 mb-2 block">Country *</Label>
                                <input
                                    id="country"
                                    type="text"
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    placeholder="United States"
                                    className="flex h-12 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="requests" className="text-sm font-bold text-gray-900 mb-2 block">Special Requests</Label>
                                <textarea
                                    id="requests"
                                    value={requests}
                                    onChange={(e) => setRequests(e.target.value)}
                                    rows={3}
                                    placeholder="Any special requirements or dietary restrictions..."
                                    className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm resize-none"
                                />
                            </div>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 h-14 text-lg font-bold shadow-lg hover:shadow-xl transition-all"
                        disabled={isSubmitted}
                    >
                        {isSubmitted ? (
                            <>
                                <CheckCircle2 className="w-5 h-5 mr-2" />
                                Request Sent!
                            </>
                        ) : (
                            <>
                                <Send className="w-5 h-5 mr-2" />
                                Submit Booking Request
                            </>
                        )}
                    </Button>

                    {isSubmitted && (
                        <p className="text-center text-green-600 text-sm font-medium">
                            Thank you! We'll contact you within 24 hours.
                        </p>
                    )}
                </form>
            </CardContent>
        </Card>
    )
}

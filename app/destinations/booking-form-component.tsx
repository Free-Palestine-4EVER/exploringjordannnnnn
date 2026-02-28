"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Card, CardContent } from "@/components/ui/card"
import { trackBookingSubmission } from "@/lib/gtag"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { CheckCircle2, Send } from "lucide-react"
import { useTranslations } from "@/lib/i18n/language-context"

export default function BookingFormComponent({ destinationName }: { destinationName: string }) {
    const t = useTranslations()
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

    // Calculate price
    const calculatePrice = () => {
        let basePrice = 150 * 7 // $150/day for 7 days

        // Season
        const month = new Date(startDate).getMonth() + 1
        if ((month >= 3 && month <= 5) || (month >= 9 && month <= 11)) {
            basePrice *= 1.2 // High season
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
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: `${firstName} ${lastName}`,
                    email,
                    phone,
                    tourTitle: `Destination: ${destinationName}`,
                    message: `
Booking Request for ${destinationName}
Departure: ${startDate}
Group: ${groupSize} people
Hotel: ${hotelClass}
Country: ${country}
Requests: ${requests || 'None'}
                    `.trim()
                })
            })

            if (response.ok) {
                trackBookingSubmission((pricePerPerson * numPeople) || 0)
                setIsSubmitted(true)
                setTimeout(() => setIsSubmitted(false), 5000)
            } else {
                alert('Failed to send. Please try again.')
            }
        } catch (error) {
            alert('Failed to send. Please try again.')
        }
    }

    const pricePerPerson = calculatePrice()
    const numPeople = groupSize === "1" ? 1 : groupSize === "8+" ? 8 : parseInt(groupSize.split("-")[0])

    return (
        <Card className="border-none shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-6">
                <h3 className="font-bold text-2xl mb-1">Book Your Tour</h3>
                <p className="text-amber-100 text-sm">Get instant price estimate</p>
            </div>

            <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Travel Details */}
                    <div className="space-y-4 pt-6 border-t border-gray-200">
                        <h4 className="text-lg font-bold text-gray-900 mb-1">Travel Details</h4>

                        <div>
                            <Label htmlFor="start-date" className="text-sm font-bold text-gray-900 mb-2 block">{t.bookingForm.departureDate} *</Label>
                            <input
                                id="start-date"
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                min={format(new Date(), "yyyy-MM-dd")}
                                className="flex h-12 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="group-size" className="text-sm font-bold text-gray-900 mb-2 block">{t.bookingForm.groupSize} *</Label>
                            <select
                                id="group-size"
                                value={groupSize}
                                onChange={(e) => setGroupSize(e.target.value)}
                                className="flex h-12 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                                required
                            >
                                <option value="1">{t.bookingForm.person1}</option>
                                <option value="2-3">{t.bookingForm.people2to3}</option>
                                <option value="4-5">{t.bookingForm.people4to5}</option>
                                <option value="6-7">{t.bookingForm.people6to7}</option>
                                <option value="8+">{t.bookingForm.people8plus}</option>
                            </select>
                        </div>

                        <div>
                            <Label htmlFor="hotel-class" className="text-sm font-bold text-gray-900 mb-2 block">{t.bookingForm.hotelClass} *</Label>
                            <select
                                id="hotel-class"
                                value={hotelClass}
                                onChange={(e) => setHotelClass(e.target.value)}
                                className="flex h-12 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                                required
                            >
                                <option value="3-star">{"⭐⭐⭐ "}{t.bookingForm.comfortable}</option>
                                <option value="4-star">{"⭐⭐⭐⭐ "}{t.bookingForm.superior}</option>
                                <option value="5-star">{"⭐⭐⭐⭐⭐ "}{t.bookingForm.luxury}</option>
                            </select>
                        </div>
                    </div>

                    {/* Price Summary */}
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-5 space-y-3 border border-amber-200 shadow-sm">
                        <h4 className="font-semibold text-gray-900 text-sm mb-2">{t.bookingForm.priceSummary}</h4>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">{t.bookingForm.destination}:</span>
                            <span className="font-medium">{destinationName}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">{t.bookingForm.seasonLabel}:</span>
                            <span className="font-medium">
                                {(() => {
                                    const month = new Date(startDate).getMonth() + 1
                                    return ((month >= 3 && month <= 5) || (month >= 9 && month <= 11)) ? t.bookingForm.high : t.bookingForm.low
                                })()} {t.bookingForm.seasonWord}
                            </span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">{t.bookingForm.pricePerPerson}:</span>
                            <span className="font-semibold text-amber-700">${pricePerPerson}</span>
                        </div>
                        <div className="border-t-2 border-amber-400 pt-3 flex justify-between items-center">
                            <span className="font-bold text-gray-900">{t.bookingForm.totalEstimate}:</span>
                            <span className="text-2xl font-bold text-amber-600">${pricePerPerson * numPeople}</span>
                        </div>
                        <p className="text-xs text-gray-500 pt-1">
                            {t.bookingForm.basedOnNote}
                        </p>
                    </div>

                    {/* Personal Information */}
                    <div className="pt-6 border-t border-gray-200">
                        <h4 className="text-lg font-bold text-gray-900 mb-4">{t.bookingForm.yourInfo}</h4>

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <Label htmlFor="firstName" className="text-sm font-bold text-gray-900 mb-2 block">{t.bookingForm.firstName} *</Label>
                                    <input
                                        id="firstName"
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        placeholder={t.bookingForm.firstNamePlaceholder}
                                        className="flex h-12 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="lastName" className="text-sm font-bold text-gray-900 mb-2 block">{t.bookingForm.lastName} *</Label>
                                    <input
                                        id="lastName"
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        placeholder={t.bookingForm.lastNamePlaceholder}
                                        className="flex h-12 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="email" className="text-sm font-bold text-gray-900 mb-2 block">{t.bookingForm.email} *</Label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={t.bookingForm.emailPlaceholder}
                                    className="flex h-12 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="phone" className="text-sm font-bold text-gray-900 mb-2 block">{t.bookingForm.phone} *</Label>
                                <input
                                    id="phone"
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder={t.bookingForm.phonePlaceholder}
                                    className="flex h-12 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="country" className="text-sm font-bold text-gray-900 mb-2 block">{t.bookingForm.country} *</Label>
                                <input
                                    id="country"
                                    type="text"
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    placeholder={t.bookingForm.countryPlaceholder}
                                    className="flex h-12 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="requests" className="text-sm font-bold text-gray-900 mb-2 block">{t.bookingForm.specialRequests}</Label>
                                <textarea
                                    id="requests"
                                    value={requests}
                                    onChange={(e) => setRequests(e.target.value)}
                                    rows={3}
                                    placeholder={t.bookingForm.specialReqPlaceholder}
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
                                {t.bookingForm.requestSent}
                            </>
                        ) : (
                            <>
                                <Send className="w-5 h-5 mr-2" />
                                {t.bookingForm.submitBooking}
                            </>
                        )}
                    </Button>

                    {isSubmitted && (
                        <p className="text-center text-green-600 text-sm font-medium">
                            {t.bookingForm.thankYouBooking}
                        </p>
                    )}
                </form>
            </CardContent>
        </Card>
    )
}

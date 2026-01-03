"use client"

import { MapPin, Calendar, Users, Check, X, Star, Moon, Mountain, Sunrise, Upload } from "lucide-react"
import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function LeticiaClientPage() {
  const [passportFiles, setPassportFiles] = useState<File[]>([])
  const [isUploadingPassports, setIsUploadingPassports] = useState(false)
  const [passportUploadSuccess, setPassportUploadSuccess] = useState(false)

  const [esimEmail, setEsimEmail] = useState("")
  const [isSubmittingEsim, setIsSubmittingEsim] = useState(false)
  const [esimSuccess, setEsimSuccess] = useState(false)

  const handlePassportChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      setPassportFiles(files)
    }
  }

  const handlePassportSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (passportFiles.length === 0) return

    setIsUploadingPassports(true)

    const formData = new FormData()
    passportFiles.forEach((file) => {
      formData.append("passports", file)
    })

    try {
      const response = await fetch("/api/upload-passports", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        setPassportUploadSuccess(true)
        setPassportFiles([])
      } else {
        alert("Failed to upload passports. Please try again.")
      }
    } catch (error) {
      console.error("Passport upload error:", error)
      alert("Error uploading passports. Please try again.")
    } finally {
      setIsUploadingPassports(false)
    }
  }

  const handleEsimSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!esimEmail) return

    setIsSubmittingEsim(true)

    try {
      const response = await fetch("/api/request-esim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: esimEmail, reservation: "LET-DEC-2025" }),
      })

      if (response.ok) {
        setEsimSuccess(true)
        setEsimEmail("")
      } else {
        alert("Failed to submit E-SIM request. Please try again.")
      }
    } catch (error) {
      console.error("E-SIM request error:", error)
      alert("Error submitting E-SIM request. Please try again.")
    } finally {
      setIsSubmittingEsim(false)
    }
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-amber-600/5" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-full text-sm font-medium mb-6">
            <Check className="w-4 h-4" />
            Confirmed Reservation • LET-DEC-2025
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight">
            Your Final Jordan
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-amber-600">
              Luxury Itinerary
            </span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Experience the magic of Petra by night, sleep under the stars in a luxury bubble tent, and float in the Dead
            Sea on this unforgettable 5-day luxury adventure.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-700">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span className="font-medium">December 4-8, 2025</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              <span className="font-medium">Petra • Wadi Rum • Dead Sea</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              <span className="font-medium">3 Travelers</span>
            </div>
          </div>
        </div>
      </section>

      {/* Itinerary Timeline */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Your Day-by-Day Journey</h2>
            <p className="text-lg text-slate-600">Every moment crafted for an unforgettable experience</p>
          </div>

          <div className="space-y-12">
            {/* Day 1 */}
            <div className="relative pl-8 md:pl-16 border-l-4 border-blue-600">
              <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-blue-600 border-4 border-white shadow-lg" />
              <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <Moon className="w-8 h-8 text-blue-600" />
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">Day 1</h3>
                    <p className="text-slate-600 font-medium">Amman Airport → Petra by Night</p>
                  </div>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  Your journey begins with a warm welcome at Amman Airport. Transfer to your hotel in Petra, enjoy
                  dinner, then experience the magical <strong>Petra by Night</strong> at 8:30 PM. Walk through the
                  candlelit Siq to witness the Treasury illuminated under the stars, accompanied by an enchanting light
                  and sound show that brings the ancient Nabataean legacy to life.
                </p>
                <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-sm font-medium">
                  <Star className="w-4 h-4" />H Luxury Hotel Petra (5★)
                </div>
              </div>
            </div>

            {/* Day 2 */}
            <div className="relative pl-8 md:pl-16 border-l-4 border-amber-600">
              <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-amber-600 border-4 border-white shadow-lg" />
              <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <Sunrise className="w-8 h-8 text-amber-600" />
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">Day 2</h3>
                    <p className="text-slate-600 font-medium">Full Day in Petra → Wadi Rum</p>
                  </div>
                </div>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Dedicate the entire day to exploring <strong>Petra, the Rose City</strong>. Discover where the
                  Nabataeans carved their magnificent capital into pink mountains over 2,000 years ago. Walk through the
                  Siq canyon, marvel at the iconic Treasury, explore ancient tombs and temples, and learn about the
                  sophisticated water systems that sustained this desert civilization.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  After your Petra adventure, transfer to <strong>Wadi Rum</strong> for an overnight stay in a luxurious
                  bubble tent under the stars at the exclusive Bubble Luxotel Camp.
                </p>
                <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-sm font-medium">
                  <Star className="w-4 h-4" />
                  Bubble Luxotel Camp (5★)
                </div>
              </div>
            </div>

            {/* Day 3 */}
            <div className="relative pl-8 md:pl-16 border-l-4 border-red-600">
              <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-red-600 border-4 border-white shadow-lg" />
              <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <Mountain className="w-8 h-8 text-red-600" />
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">Day 3</h3>
                    <p className="text-slate-600 font-medium">Wadi Rum 4x4 Adventure → Dead Sea</p>
                  </div>
                </div>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Embark on a thrilling <strong>2-hour 4x4 desert safari</strong> through Wadi Rum's spectacular lunar
                  landscape. Experience the same breathtaking scenery that captivated Lawrence of Arabia, with colorful
                  mountains rising dramatically from sandy plains. Your Bedouin driver will take you deep into this
                  magnificent desert.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  Transfer to the <strong>Dead Sea</strong>, the lowest point on Earth at 400 meters below sea level.
                  Check in to the luxurious Hilton Dead Sea Hotel and experience the unique sensation of floating
                  effortlessly in mineral-rich waters. Free time to relax and enjoy the world-class resort facilities.
                </p>
                <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm font-medium">
                  <Star className="w-4 h-4" />
                  Hilton Dead Sea Hotel (5★)
                </div>
              </div>
            </div>

            {/* Day 4 */}
            <div className="relative pl-8 md:pl-16 border-l-4 border-cyan-600">
              <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-cyan-600 border-4 border-white shadow-lg" />
              <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-5xl font-bold text-slate-900">$2,790</span>
                  <span className="text-slate-600">total</span>
                </div>
                <p className="text-sm text-slate-600">For 3 travelers ($930 per person)</p>
              </div>
            </div>

            {/* Day 5 */}
            <div className="relative pl-8 md:pl-16 border-l-4 border-slate-400">
              <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-slate-400 border-4 border-white shadow-lg" />
              <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-5xl font-bold text-slate-900">$2,790</span>
                  <span className="text-slate-600">total</span>
                </div>
                <p className="text-sm text-slate-600">For 3 travelers ($930 per person)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-br from-slate-900 to-blue-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Your Luxury Package</h2>
            <p className="text-lg text-blue-200">
              5-Star accommodations with all the essentials for an unforgettable journey
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-amber-400 max-w-2xl mx-auto">
            <div className="bg-gradient-to-r from-amber-600 to-amber-700 p-8 text-white relative">
              <div className="absolute top-4 right-4 bg-white text-amber-700 px-3 py-1 rounded-full text-sm font-bold">
                Premium
              </div>
              <h3 className="text-3xl font-bold mb-2">5-Star Luxury Package</h3>
              <p className="text-amber-100">Confirmed for 3 Travelers</p>
              <p className="text-amber-100 text-sm mt-2">Reservation: LET-DEC-2025</p>
            </div>
            <div className="p-8">
              <div className="mb-8">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-5xl font-bold text-slate-900">$2,790</span>
                  <span className="text-slate-600">total</span>
                </div>
                <p className="text-sm text-slate-600">For 3 travelers ($930 per person)</p>
              </div>

              <div className="space-y-4 mb-8">
                <h4 className="font-bold text-slate-900 text-lg mb-3">Your Accommodations:</h4>
                <div className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-900">H Luxury Hotel Petra</p>
                    <p className="text-sm text-slate-600">1 night • Deluxe room • Half Board</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-900">Bubble Luxotel Camp</p>
                    <p className="text-sm text-slate-600">1 night • Luxury bubble tent • Half Board</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-900">Hilton Dead Sea Hotel</p>
                    <p className="text-sm text-slate-600">2 nights • Deluxe room • Half Board</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-200 mb-8">
                <h4 className="font-bold text-slate-900 text-lg mb-3">Included Highlights:</h4>
                <ul className="space-y-2">
                  {[
                    "Private AC minivan with English-speaking driver",
                    "Petra by Night experience",
                    "2-hour guided tour in Petra",
                    "2-hour 4x4 jeep tour in Wadi Rum",
                    "All entrance fees to sites",
                    "Half board at all accommodations",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Complete Your Booking</h2>
            <p className="text-lg text-slate-600">
              Secure your reservation with payment and upload your passports for visa assistance
            </p>
          </div>

          <div className="space-y-8">
            {/* E-SIM Section - MOVED TO TOP */}
            <div id="esim-section" className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">E-SIM for Jordan</h3>
              <p className="text-slate-600 mb-6">
                Stay connected throughout your journey! After payment, your E-SIM will be sent automatically to your
                email with activation instructions.
              </p>

              {esimSuccess ? (
                <div className="p-6 bg-green-50 rounded-lg border-2 border-green-200">
                  <div className="flex items-center gap-3 mb-2">
                    <Check className="w-6 h-6 text-green-600" />
                    <h4 className="font-bold text-green-900 text-lg">E-SIM Request Received!</h4>
                  </div>
                  <p className="text-green-800">
                    We'll send your E-SIM activation instructions to your email after payment confirmation.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleEsimSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="esim-email" className="block text-sm font-medium text-slate-700 mb-2">
                      Email for E-SIM Instructions
                    </label>
                    <input
                      type="email"
                      id="esim-email"
                      value={esimEmail}
                      onChange={(e) => setEsimEmail(e.target.value)}
                      required
                      disabled={isSubmittingEsim}
                      placeholder="leticia@example.com"
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-blue-600 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={!esimEmail || isSubmittingEsim}
                    className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-6 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmittingEsim ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Submitting Request...
                      </span>
                    ) : (
                      "Request E-SIM"
                    )}
                  </Button>
                </form>
              )}

              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> Your E-SIM will be sent automatically after payment is confirmed. You'll
                  receive detailed activation instructions via email.
                </p>
              </div>
            </div>

            {/* Payment Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Payment Options</h3>

              <div className="space-y-4">
                {/* Full Itinerary Payment */}
                <div className="border-2 border-blue-600 rounded-xl p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-bold text-slate-900">Full Itinerary Payment</h4>
                      <p className="text-sm text-slate-600 mt-1">Complete 5-day luxury package for 3 travelers</p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-blue-600">$2,790</p>
                    </div>
                  </div>
                  <a
                    href="https://www.paypal.com/ncp/payment/V4ME6ZM8LFT9C"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-6">
                      Pay Full Amount via PayPal
                    </Button>
                  </a>
                </div>

                {/* Jordan Pass Payment */}
                <div className="border-2 border-amber-600 rounded-xl p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-bold text-slate-900">Jordan Pass & Visa Assistance</h4>
                      <p className="text-sm text-slate-600 mt-1">
                        We'll handle your visa and Jordan Pass for all 3 travelers
                      </p>
                    </div>
                  </div>
                  <a
                    href="https://www.paypal.com/ncp/payment/N7AXXS4C8MGWL"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white text-base py-8 px-6 h-auto whitespace-normal leading-relaxed">
                      Pay for Jordan Pass & Visa Assistance via PayPal
                    </Button>
                  </a>
                </div>
              </div>
            </div>

            {/* Passport Upload Section */}
            <div id="passport-section" className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Passport Upload for Visa Assistance</h3>
              <p className="text-slate-600 mb-6">
                Please upload clear copies of all 3 passports so we can arrange your Jordan visa. Required at least 10
                days before arrival.
              </p>

              {passportUploadSuccess ? (
                <div className="p-6 bg-green-50 rounded-lg border-2 border-green-200">
                  <div className="flex items-center gap-3 mb-2">
                    <Check className="w-6 h-6 text-green-600" />
                    <h4 className="font-bold text-green-900 text-lg">Passports Uploaded Successfully!</h4>
                  </div>
                  <p className="text-green-800">
                    We've received your passport copies and will start processing your visa immediately. You'll receive
                    confirmation at info@exploringjordan.com
                  </p>
                </div>
              ) : (
                <form onSubmit={handlePassportSubmit} className="space-y-6">
                  <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-blue-600 transition-colors">
                    <input
                      type="file"
                      id="passport-upload"
                      multiple
                      accept="image/*,.pdf"
                      onChange={handlePassportChange}
                      className="hidden"
                      disabled={isUploadingPassports}
                    />
                    <label htmlFor="passport-upload" className="cursor-pointer flex flex-col items-center gap-4">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                        <Upload className="w-8 h-8 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-lg font-medium text-slate-900">Click to upload passport copies</p>
                        <p className="text-sm text-slate-500 mt-1">Upload all 3 passports (images or PDF)</p>
                      </div>
                    </label>
                  </div>

                  {passportFiles.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="font-medium text-slate-900">Selected Files:</h4>
                      {passportFiles.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200"
                        >
                          <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-900 truncate">{file.name}</p>
                            <p className="text-xs text-slate-600">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={passportFiles.length === 0 || isUploadingPassports}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-6 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isUploadingPassports ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Uploading Passports...
                      </span>
                    ) : (
                      "Submit Passports"
                    )}
                  </Button>
                </form>
              )}

              <p className="text-sm text-slate-500 mt-4 text-center">
                Files will be sent securely to{" "}
                <span className="font-medium text-blue-600">info@exploringjordan.com</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Included */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">What's Included</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Meet & assist upon arrival and departure",
                  "Private AC minivan with English-speaking driver",
                  "Local English-speaking guide in Petra (2 hours)",
                  "All accommodation as mentioned (Half Board)",
                  "Entrance fees to all sites in itinerary",
                  "2-hour jeep 4x4 tour in Wadi Rum",
                  "Bottled water on board",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Excluded */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-slate-600 rounded-full flex items-center justify-center">
                  <X className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Not Included</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Jordan visa (we'll arrange with your passport copies)",
                  "Personal expenses",
                  "Tips for guides and drivers",
                  "Any services not mentioned in inclusions",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <X className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Validity Banner */}
      <section className="py-8 px-4 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-white">
            <Calendar className="w-6 h-6" />
            <span className="text-lg font-medium">Travel Dates: December 4-8, 2025 • Reservation: LET-DEC-2025</span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Questions About Your Booking?</h2>
          <p className="text-xl text-slate-600 mb-8">
            We're here to help make your Jordan adventure perfect. Contact us anytime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 border-2 bg-transparent">
              <Link href="/contact">Contact Support</Link>
            </Button>
          </div>
          <p className="text-sm text-slate-500 mt-6">Available 24/7 via WhatsApp or email</p>
        </div>
      </section>
    </div>
  )
}

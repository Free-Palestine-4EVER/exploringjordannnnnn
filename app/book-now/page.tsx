"use client"

import { Sparkles } from "lucide-react"
import UniversalBookingForm from "@/components/universal-booking-form"

export default function BookNowPage() {
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
        <div className="max-w-4xl mx-auto">
          <UniversalBookingForm />
        </div>
      </div>
    </div>
  )
}

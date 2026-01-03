"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)

      // Track conversion for Google Ads
      if (typeof window !== "undefined" && (window as any).gtag) {
        ; (window as any).gtag("event", "conversion", {
          send_to: "AW-17670467400/RGcgCOvy2L0bEMje9-lB",
        })
      }

      // Reset form
      setTimeout(() => setIsSuccess(false), 5000)
    }, 1000)
  }

  return (
    <div className="min-h-screen pt-32">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Mail className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Get in Touch</h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Have questions about exploring Jordan? Our travel experts are here to help you plan your perfect journey.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200">Send us a message</Badge>
              <h2 className="text-3xl font-bold mb-6">Contact Our Team</h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and we'll get back to you within 24 hours. Whether you're planning a trip to
                Jordan or have questions about our tours, we're here to help.
              </p>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" className="mt-1" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="john@example.com" className="mt-1" />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number (Optional)</Label>
                  <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" className="mt-1" />
                </div>

                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="Tour inquiry" className="mt-1" />
                </div>

                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your travel plans, questions, or special requests..."
                    rows={6}
                    className="mt-1"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting || isSuccess}>
                  <Send className="w-4 h-4 mr-2" />
                  {isSubmitting ? "Sending..." : isSuccess ? "Message Sent!" : "Send Message"}
                </Button>
                {isSuccess && (
                  <p className="text-green-600 text-sm text-center">
                    Thank you! We'll get back to you within 24 hours.
                  </p>
                )}
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200">Contact Information</Badge>
              <h2 className="text-3xl font-bold mb-6">Reach Us Directly</h2>

              <div className="space-y-6 mb-8">
                <Card className="border-2 border-blue-100">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Phone className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2">Phone & WhatsApp</h3>
                        <p className="text-gray-600 mb-2">Call or message us anytime</p>
                        <a href="tel:+41766633924" className="text-blue-600 hover:underline font-medium">
                          +41 76 663 39 24
                        </a>
                        <p className="text-sm text-gray-500 mt-1">24/7 Emergency Support Available</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-blue-100">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2">Email</h3>
                        <p className="text-gray-600 mb-2">Send us an email</p>
                        <a href="mailto:info@jordanexplorer.com" className="text-blue-600 hover:underline font-medium">
                          info@exploringjordan.com
                        </a>
                        <p className="text-sm text-gray-500 mt-1">Response within 24 hours</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-blue-100">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2">Office Location</h3>
                        <p className="text-gray-600 mb-2">Visit us in Amman</p>
                        <p className="font-medium">123 Rainbow Street</p>
                        <p className="text-gray-600">Jabal Amman, Amman 11183</p>
                        <p className="text-gray-600">Jordan</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-blue-100">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Clock className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2">Business Hours</h3>
                        <div className="space-y-1 text-gray-600">
                          <p>Sunday - Thursday: 9:00 AM - 6:00 PM</p>
                          <p>Friday: Closed</p>
                          <p>Saturday: 10:00 AM - 4:00 PM</p>
                        </div>
                        <p className="text-sm text-blue-600 mt-2 font-medium">24/7 Emergency Support</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-3">Why Choose Jordan Explorer?</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">✓</span>
                    <span>Expert local guides with deep knowledge of Jordan</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">✓</span>
                    <span>Customizable itineraries to match your interests</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">✓</span>
                    <span>24/7 support throughout your journey</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">✓</span>
                    <span>Free eSIM with unlimited data included</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Quick Links */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl font-bold mb-6">Have Questions?</h2>
          <p className="text-gray-600 mb-8">
            Check out our FAQ page for answers to common questions about traveling to Jordan, booking tours, visas, and
            more.
          </p>
          <Button asChild size="lg">
            <a href="/faq">View Frequently Asked Questions</a>
          </Button>
        </div>
      </section>
    </div>
  )
}

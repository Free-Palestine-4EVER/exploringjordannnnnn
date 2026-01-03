"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Mail, Phone, Clock, Home, Calendar } from "lucide-react"
import Link from "next/link"
import BubbleButton from "@/components/bubble-button"
import { motion } from "framer-motion"

export default function ThankYouPage() {
  return (
    <main className="pt-24 pb-16 bg-gradient-to-b from-sky-50 to-white min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
            <Check className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-sky-800">Thank You!</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your trip customization request has been received. We're excited to help you plan your perfect Jordan
            adventure!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="border-none shadow-lg mb-8">
            <div className="bg-gradient-to-r from-sky-500 to-blue-500 text-white p-6">
              <h2 className="text-2xl font-bold mb-2">What Happens Next?</h2>
              <p className="text-white/90">Here's what you can expect from our team</p>
            </div>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center">
                      <Clock className="h-6 w-6 text-sky-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1 text-sky-700">Within 24 Hours</h3>
                    <p className="text-muted-foreground">
                      Our travel specialists will review your request and send you a detailed quote with confirmed
                      pricing and availability.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center">
                      <Mail className="h-6 w-6 text-sky-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1 text-sky-700">Check Your Email</h3>
                    <p className="text-muted-foreground">
                      You'll receive a confirmation email shortly with your request details and our contact information.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-sky-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1 text-sky-700">Finalize Your Trip</h3>
                    <p className="text-muted-foreground">
                      Work with our team to make any final adjustments to your itinerary, then confirm and secure your
                      booking.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid md:grid-cols-2 gap-6 mb-8"
        >
          <Card className="border-none shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center">
                  <Phone className="h-6 w-6 text-sky-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-sky-700">Need Immediate Help?</h3>
                  <p className="text-sm text-muted-foreground">Call us anytime</p>
                </div>
              </div>
              <a href="tel:+41766633924" className="text-lg font-semibold text-sky-600 hover:underline block mb-2">
                +41 76 663 39 24
              </a>
              <p className="text-sm text-muted-foreground">Available 24/7 for your convenience</p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center">
                  <Mail className="h-6 w-6 text-sky-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-sky-700">Email Us</h3>
                  <p className="text-sm text-muted-foreground">For detailed inquiries</p>
                </div>
              </div>
              <a
                href="mailto:info@jordanexplorer.com"
                className="text-lg font-semibold text-sky-600 hover:underline block mb-2"
              >
                info@exploringjordan.com
              </a>
              <p className="text-sm text-muted-foreground">We typically respond within 2 hours</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <h3 className="font-bold text-xl mb-4 text-sky-700">While You Wait...</h3>
          <p className="text-muted-foreground mb-6">
            Explore more about Jordan and get inspired for your upcoming adventure!
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-sky-50 p-4 rounded-lg">
              <h4 className="font-semibold text-sky-700 mb-2">Travel Guide</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Learn about Jordan's culture, customs, and must-see attractions
              </p>
              <Link href="/travel-tips" className="text-sm text-sky-600 hover:underline font-medium">
                Read Guide →
              </Link>
            </div>
            <div className="bg-sky-50 p-4 rounded-lg">
              <h4 className="font-semibold text-sky-700 mb-2">Destinations</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Discover the amazing places you'll visit on your tour
              </p>
              <Link href="/destinations" className="text-sm text-sky-600 hover:underline font-medium">
                Explore →
              </Link>
            </div>
            <div className="bg-sky-50 p-4 rounded-lg">
              <h4 className="font-semibold text-sky-700 mb-2">Other Tours</h4>
              <p className="text-sm text-muted-foreground mb-3">Browse our other tour packages and options</p>
              <Link href="/tours" className="text-sm text-sky-600 hover:underline font-medium">
                View Tours →
              </Link>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center"
        >
          <BubbleButton asChild size="lg">
            <Link href="/">
              <Home className="h-4 w-4 mr-2" />
              Return to Homepage
            </Link>
          </BubbleButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="mt-12 text-center"
        >
          <Badge className="bg-green-100 text-green-700 hover:bg-green-200">
            <Check className="h-3 w-3 mr-1" />
            Request Confirmed
          </Badge>
          <p className="text-sm text-muted-foreground mt-4">
            Reference number: #{Math.random().toString(36).substring(2, 9).toUpperCase()}
          </p>
        </motion.div>
      </div>
    </main>
  )
}

import type { Metadata } from "next"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { HelpCircle, MapPin, CreditCard, Calendar, Users, Shield, Plane, FileText, Clock, Phone } from "lucide-react"

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Jordan Explorer",
  description: "Find answers to common questions about tours, visas, booking, and travel to Jordan.",
}

export default function FAQPage() {
  return (
    <div className="min-h-screen pt-32">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <HelpCircle className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Frequently Asked Questions</h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Everything you need to know about traveling with Jordan Explorer. Find answers to common questions about
              tours, visas, booking, and more.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#general"
              className="px-4 py-2 bg-white rounded-full text-sm font-medium hover:bg-blue-50 transition-colors border"
            >
              General Questions
            </a>
            <a
              href="#jordan"
              className="px-4 py-2 bg-white rounded-full text-sm font-medium hover:bg-blue-50 transition-colors border"
            >
              Jordan FAQs
            </a>
          </div>
        </div>
      </section>

      {/* General FAQs */}
      <section id="general" className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200">General Information</Badge>
            <h2 className="text-4xl font-bold mb-4">General Questions</h2>
            <p className="text-gray-600 text-lg">Common questions about booking and traveling with us</p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border rounded-lg px-6 bg-gray-50">
              <AccordionTrigger className="text-left hover:no-underline">
                <div className="flex items-start gap-3">
                  <CreditCard className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <span className="font-semibold">How do I book a tour with Jordan Explorer?</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pl-8">
                Booking is easy! Browse our tours, select your preferred package, choose your dates and hotel class,
                then click "Book Now" or "Tailor this trip" to customize. You can also contact us directly via WhatsApp,
                email, or phone for personalized assistance. We require a 30% deposit to confirm your booking, with the
                balance due 30 days before departure.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border rounded-lg px-6 bg-gray-50">
              <AccordionTrigger className="text-left hover:no-underline">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <span className="font-semibold">What is your cancellation and refund policy?</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pl-8">
                We offer a <strong>full refund if you cancel 30 days or more before your trip</strong>. Cancellations
                between 15-29 days receive a 50% refund. Cancellations within 14 days are non-refundable. We strongly
                recommend purchasing travel insurance to protect your investment. Emergency situations are handled on a
                case-by-case basis.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border rounded-lg px-6 bg-gray-50">
              <AccordionTrigger className="text-left hover:no-underline">
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <span className="font-semibold">What group sizes do you accommodate?</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pl-8">
                We cater to all group sizes! Our pricing is structured for groups of 2-15+ people. Solo travelers can
                join scheduled group tours or book a private tour. Larger groups (15+) receive special rates. Private
                tours offer maximum flexibility and personalized experiences, while group tours are great for meeting
                fellow travelers.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border rounded-lg px-6 bg-gray-50">
              <AccordionTrigger className="text-left hover:no-underline">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <span className="font-semibold">When is the best time to visit?</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pl-8">
                The best time varies by destination. Generally, spring (March-May) and fall (September-November) offer
                ideal weather across Jordan. Summer can be very hot, especially in desert areas, while winter is mild
                but can be cool in the evenings. We offer both high season (October-April) and low season
                (May-September) pricing.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border rounded-lg px-6 bg-gray-50">
              <AccordionTrigger className="text-left hover:no-underline">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <span className="font-semibold">Do you provide free eSIM with unlimited data?</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pl-8">
                <strong>Yes!</strong> All our clients receive a <strong>FREE eSIM with UNLIMITED data</strong> for the
                duration of their trip. Stay connected, share your adventures on social media, use maps, and communicate
                with your loved ones without worrying about roaming charges. The eSIM is activated upon arrival and
                works across all countries in your tour.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="border rounded-lg px-6 bg-gray-50">
              <AccordionTrigger className="text-left hover:no-underline">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <span className="font-semibold">What's included in the tour price?</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pl-8">
                Our tours include accommodation (3★/4★/5★ hotels based on your choice), all transportation in
                air-conditioned vehicles, English-speaking guides, entrance fees to all sites mentioned in the
                itinerary, meals as specified (typically breakfast daily plus some lunches/dinners), airport transfers,
                and free eSIM with unlimited data. International flights, personal expenses, tips, and travel insurance
                are not included.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7" className="border rounded-lg px-6 bg-gray-50">
              <AccordionTrigger className="text-left hover:no-underline">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <span className="font-semibold">Can I customize my tour itinerary?</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pl-8">
                We specialize in tailored experiences. Click "Tailor this trip" on any tour page to request
                modifications. You can adjust the duration, add or remove destinations, upgrade hotels, include special
                activities, or create a completely custom itinerary. Our team will work with you to design your perfect
                journey within your budget.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Jordan FAQs */}
      <section id="jordan" className="py-16 bg-gradient-to-br from-blue-50 to-sky-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-600 text-white hover:bg-blue-700">Jordan</Badge>
            <h2 className="text-4xl font-bold mb-4">Jordan Travel FAQs</h2>
            <p className="text-gray-600 text-lg">Essential information for traveling to Jordan</p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="jordan-1" className="border rounded-lg px-6 bg-white">
              <AccordionTrigger className="text-left hover:no-underline">
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <span className="font-semibold">Do I need a visa to visit Jordan?</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pl-8">
                Most nationalities can obtain a <strong>visa on arrival</strong> at Queen Alia International Airport in
                Amman or at land borders. The single-entry visa costs 40 JOD (approximately $56 USD) and is valid for 30
                days. If you purchase the <strong>Jordan Pass</strong> (which includes entry to Petra and other sites),
                the visa fee is waived if you stay at least 3 nights. We can assist with visa arrangements and Jordan
                Pass purchase.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="jordan-2" className="border rounded-lg px-6 bg-white">
              <AccordionTrigger className="text-left hover:no-underline">
                <div className="flex items-start gap-3">
                  <Plane className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <span className="font-semibold">What should I pack for Jordan?</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pl-8">
                Pack comfortable walking shoes, modest clothing (covering shoulders and knees for religious sites),
                sunscreen, sunglasses, and a hat. Layers are important as temperatures vary between day and night,
                especially in the desert. Bring a light jacket for evenings. For Wadi Rum, closed-toe shoes are
                recommended. Don't forget your camera, power adapter (Type C/D/F/G/J), and any personal medications.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="jordan-3" className="border rounded-lg px-6 bg-white">
              <AccordionTrigger className="text-left hover:no-underline">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <span className="font-semibold">Is Jordan safe for tourists?</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pl-8">
                Yes! Jordan is one of the safest countries in the Middle East and welcomes millions of tourists
                annually. The tourism industry is well-established, and locals are known for their hospitality. Standard
                travel precautions apply. Our guides are experienced professionals who ensure your safety throughout the
                journey. We monitor travel advisories and adjust itineraries if needed.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="jordan-4" className="border rounded-lg px-6 bg-white">
              <AccordionTrigger className="text-left hover:no-underline">
                <div className="flex items-start gap-3">
                  <CreditCard className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <span className="font-semibold">What currency is used in Jordan?</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pl-8">
                The Jordanian Dinar (JOD) is the official currency. 1 JOD ≈ $1.41 USD. ATMs are widely available in
                cities and tourist areas. Credit cards are accepted at hotels, restaurants, and larger shops, but carry
                cash for smaller vendors and tips. We recommend exchanging some money at the airport or using ATMs for
                the best rates.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="jordan-5" className="border rounded-lg px-6 bg-white">
              <AccordionTrigger className="text-left hover:no-underline">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <span className="font-semibold">How much time do I need to visit Petra?</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pl-8">
                We recommend at least a full day to explore Petra properly. The site is vast (264 square kilometers),
                and walking from the entrance to the Treasury takes about 30 minutes. To see the Monastery, Treasury,
                Royal Tombs, and other highlights, plan for 6-8 hours. Our tours include guided visits with optimal
                timing to avoid crowds and capture the best photos.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <Phone className="w-12 h-12 mx-auto mb-6 opacity-90" />
          <h2 className="text-4xl font-bold mb-6">Still Have Questions?</h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Our travel experts are here to help! Contact us via WhatsApp, email, or phone for personalized assistance
            with your travel plans.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 bg-transparent"
            >
              <Link href="/">Browse Tours</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

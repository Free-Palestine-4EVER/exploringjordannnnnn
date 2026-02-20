"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Building2, Globe, Handshake, MapPin, Users, CheckCircle2, ArrowRight, Star } from "lucide-react"
import Link from "next/link"

export default function PartnersPage() {
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    website: "",
    country: "",
    agencySize: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const res = await fetch("/api/partner-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setIsSubmitted(true)
        toast({
          title: "Partnership inquiry sent!",
          description: "We'll get back to you within 24 hours with our B2B rate sheet.",
        })
      } else {
        throw new Error("Failed to submit")
      }
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please email us directly at info@exploringjordan.com",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-amber-900 via-amber-800 to-amber-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/petra-bg.jpg')] bg-cover bg-center opacity-20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-6 bg-white/20 text-white border-white/30 text-sm px-4 py-1">
              B2B Partnership Program
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Your Ground Partner in Jordan
            </h1>
            <p className="text-xl md:text-2xl text-amber-100 mb-8">
              We handle everything on the ground — hotels, guides, transport, experiences.
              You sell to your clients and set your own margins.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#inquiry-form">
                <Button size="lg" className="bg-white text-amber-900 hover:bg-amber-50 text-lg px-8">
                  Become a Partner <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
              <a href="mailto:info@exploringjordan.com">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8">
                  Request Rate Sheet
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Partner With Us */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-amber-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4">Why Partner With Exploring Jordan?</h2>
            <p className="text-lg text-amber-700 max-w-2xl mx-auto">
              We're a licensed Destination Management Company based in Jordan, serving travel agencies across Europe and beyond.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: <MapPin className="h-8 w-8" />,
                title: "Local Expertise",
                description: "Based in Jordan with deep local knowledge. We know every hotel, route, and hidden gem.",
              },
              {
                icon: <Handshake className="h-8 w-8" />,
                title: "B2B Net Rates",
                description: "Competitive net rates so you set your own markup. No hidden fees, transparent pricing.",
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "White-Label Service",
                description: "We operate under your brand. Your clients never know about us — it's your tour, your reputation.",
              },
              {
                icon: <Globe className="h-8 w-8" />,
                title: "Multi-Language Guides",
                description: "Licensed guides in English, German, French, Spanish, Italian, and more.",
              },
              {
                icon: <Building2 className="h-8 w-8" />,
                title: "All Hotel Classes",
                description: "From boutique 3★ to luxury 5★. Dead Sea resorts, Wadi Rum glamping, Petra hotels — we have contracts with all.",
              },
              {
                icon: <Star className="h-8 w-8" />,
                title: "24/7 Support",
                description: "Dedicated operations team on the ground. Emergency support for your clients around the clock.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-amber-100"
              >
                <div className="text-amber-600 mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-amber-900 mb-2">{item.title}</h3>
                <p className="text-amber-700">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Provide */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-amber-900 mb-12">Our Services for Partners</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                "Private airport transfers & meet-and-greet",
                "Hotel bookings (3★ to 5★ luxury)",
                "Licensed professional guides",
                "4x4 desert jeep tours in Wadi Rum",
                "Bedouin camping & glamping experiences",
                "Dead Sea resort day-use & overnights",
                "Petra by Day & Petra by Night tours",
                "Cooking classes & cultural experiences",
                "Dana Nature Reserve trekking",
                "Aqaba diving & snorkeling",
                "Jordan Pass arrangement",
                "Custom itinerary design",
              ].map((service, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-amber-50 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
                  <span className="text-amber-900 font-medium">{service}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Popular Programs */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-amber-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-amber-900 mb-12">Most Popular Partner Programs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                days: "3 Days",
                title: "Petra & Wadi Rum Express",
                highlights: ["Petra full day", "Wadi Rum jeep tour", "Bedouin camp overnight", "All transfers included"],
                popular: false,
              },
              {
                days: "5 Days",
                title: "Classic Jordan",
                highlights: ["Amman city tour", "Jerash & Ajloun", "Petra full day", "Wadi Rum", "Dead Sea"],
                popular: true,
              },
              {
                days: "8 Days",
                title: "Full Discovery",
                highlights: ["Amman", "Jerash", "Mount Nebo", "Madaba", "Petra (2 days)", "Wadi Rum", "Dead Sea", "Aqaba"],
                popular: false,
              },
            ].map((program, index) => (
              <div
                key={index}
                className={`rounded-xl overflow-hidden shadow-lg ${
                  program.popular ? "ring-2 ring-amber-500 scale-105" : ""
                }`}
              >
                <div className={`p-6 text-white text-center ${
                  program.popular
                    ? "bg-gradient-to-r from-amber-600 to-amber-500"
                    : "bg-gradient-to-r from-amber-800 to-amber-700"
                }`}>
                  {program.popular && <Badge className="mb-2 bg-white text-amber-700">Most Requested</Badge>}
                  <h3 className="text-3xl font-bold">{program.days}</h3>
                  <p className="text-amber-100">{program.title}</p>
                </div>
                <div className="p-6 bg-white">
                  <ul className="space-y-2">
                    {program.highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                  <a href="mailto:info@exploringjordan.com?subject=B2B Rate Request - ${program.title}">
                    <Button className="w-full mt-6 bg-amber-600 hover:bg-amber-700">Request Net Rates</Button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section id="inquiry-form" className="py-16 md:py-24 bg-gradient-to-b from-amber-50 to-amber-100">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4">Become a Partner</h2>
              <p className="text-lg text-amber-700">
                Fill out the form below and we'll send you our B2B rate sheet within 24 hours.
              </p>
            </div>

            {isSubmitted ? (
              <div className="bg-white rounded-xl p-12 shadow-lg text-center">
                <CheckCircle2 className="h-16 w-16 text-green-600 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-amber-900 mb-4">Thank You!</h3>
                <p className="text-lg text-amber-700 mb-6">
                  We've received your inquiry and will send our B2B rate sheet to your email within 24 hours.
                </p>
                <Link href="/">
                  <Button className="bg-amber-600 hover:bg-amber-700">Back to Home</Button>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 shadow-lg space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="companyName">Company Name *</Label>
                    <Input
                      id="companyName"
                      required
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="Your travel agency name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactName">Contact Person *</Label>
                    <Input
                      id="contactName"
                      required
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      placeholder="Full name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="email">Business Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@agency.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone / WhatsApp</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+44 ..."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      placeholder="www.youragency.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="country">Country *</Label>
                    <Select onValueChange={(v) => setFormData({ ...formData, country: v })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="germany">Germany</SelectItem>
                        <SelectItem value="france">France</SelectItem>
                        <SelectItem value="netherlands">Netherlands</SelectItem>
                        <SelectItem value="spain">Spain</SelectItem>
                        <SelectItem value="italy">Italy</SelectItem>
                        <SelectItem value="sweden">Sweden</SelectItem>
                        <SelectItem value="norway">Norway</SelectItem>
                        <SelectItem value="denmark">Denmark</SelectItem>
                        <SelectItem value="usa">United States</SelectItem>
                        <SelectItem value="canada">Canada</SelectItem>
                        <SelectItem value="australia">Australia</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="agencySize">Annual Clients to Middle East</Label>
                  <Select onValueChange={(v) => setFormData({ ...formData, agencySize: v })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Approximate volume" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-50">1–50 clients/year</SelectItem>
                      <SelectItem value="51-200">51–200 clients/year</SelectItem>
                      <SelectItem value="201-500">201–500 clients/year</SelectItem>
                      <SelectItem value="500+">500+ clients/year</SelectItem>
                      <SelectItem value="new">New to Middle East</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message">Additional Information</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your needs — types of tours, client demographics, preferred hotel class..."
                    rows={4}
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-amber-600 hover:bg-amber-700 text-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Submit Partnership Inquiry"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Users, Globe, Heart, Shield, Star, MapPin, Calendar, CheckCircle2 } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-32">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <Image
          src="/petra-treasury-jordan-sunset-golden-hour.jpg"
          alt="Jordan Explorer"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <Badge className="mb-4 bg-blue-600 hover:bg-blue-700 text-white border-0">Est. 2015</Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
            Crafting Unforgettable
            <br />
            Jordan Adventures
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 text-balance">
            Your trusted partner in exploring the wonders of Jordan
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200">Our Story</Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Born from a passion for Jordan</h2>
              <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                <p>
                  Jordan Explorer was founded in 2015 by a group of travel enthusiasts who fell in love with the rich
                  history, stunning landscapes, and warm hospitality of Jordan.
                </p>
                <p>
                  What started as a small operation organizing tours to Petra has grown into a premier travel company
                  specializing in comprehensive tours across Jordan's most iconic destinations.
                </p>
                <p>
                  Today, we've helped over 10,000 travelers discover the magic of Jordan, creating memories that last a
                  lifetime.
                </p>
              </div>
            </div>
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/wadi-rum-desert-landscape-jordan-bedouin-camp.jpg"
                alt="Our Story"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Impact in Numbers</h2>
            <p className="text-xl text-blue-100">A decade of excellence in Jordan travel</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Users, number: "10,000+", label: "Happy Travelers" },
              { icon: MapPin, number: "50+", label: "Destinations" },
              { icon: Calendar, number: "10", label: "Years Experience" },
              { icon: Star, number: "4.9/5", label: "Average Rating" },
            ].map((stat, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 text-center p-6">
                <CardContent className="p-0">
                  <stat.icon className="w-12 h-12 mx-auto mb-4 text-blue-200" />
                  <div className="text-4xl font-bold mb-2">{stat.number}</div>
                  <div className="text-blue-100">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200">Our Mission</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">What Drives Us Forward</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to creating authentic, enriching travel experiences that connect people with the culture,
              history, and beauty of Jordan.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: "Passion for Excellence",
                description:
                  "Every tour is crafted with meticulous attention to detail, ensuring an unforgettable experience from start to finish.",
              },
              {
                icon: Shield,
                title: "Trust & Safety",
                description:
                  "Your safety and comfort are our top priorities. We work with vetted partners and maintain the highest safety standards.",
              },
              {
                icon: Globe,
                title: "Cultural Authenticity",
                description:
                  "We create genuine connections with local communities, offering authentic experiences that go beyond typical tourism.",
              },
            ].map((value, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                    <value.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200">Why Choose Us</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">The Jordan Explorer Difference</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Expert Local Guides",
                description:
                  "Our guides are passionate locals with deep knowledge of history, culture, and hidden gems.",
              },
              {
                title: "Flexible Itineraries",
                description: "Customize your tour to match your interests, pace, and travel style.",
              },
              {
                title: "Premium Accommodations",
                description: "Stay in carefully selected 3★, 4★, and 5★ hotels that offer comfort and authentic charm.",
              },
              {
                title: "Small Group Sizes",
                description: "Intimate group experiences ensure personalized attention and meaningful connections.",
              },
              {
                title: "24/7 Support",
                description: "Our team is always available to assist you before, during, and after your journey.",
              },
              {
                title: "Best Value Guarantee",
                description: "Competitive pricing with no hidden fees, plus free eSIM and flexible cancellation.",
              },
            ].map((feature, index) => (
              <Card key={index} className="border-2 border-gray-100 hover:border-blue-200 transition-colors">
                <CardContent className="p-6 flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200">Our Team</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Meet the People Behind Your Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our dedicated team of travel experts, guides, and support staff work tirelessly to make your Jordan
              adventure extraordinary.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Ahmed Al-Hassan",
                role: "Founder & CEO",
                image: "/professional-middle-eastern-man-smiling.png",
                bio: "With 15 years in tourism, Ahmed's vision transformed Jordan Explorer into a leading tour operator.",
              },
              {
                name: "Sarah Mitchell",
                role: "Head of Operations",
                image: "/professional-woman-smiling.png",
                bio: "Sarah ensures every tour runs smoothly, coordinating logistics across Jordan.",
              },
              {
                name: "Omar Khalil",
                role: "Lead Tour Guide",
                image: "/friendly-tour-guide-middle-eastern-man.jpg",
                bio: "Omar's passion for history and storytelling brings ancient sites to life for our guests.",
              },
            ].map((member, index) => (
              <Card key={index} className="border-0 shadow-lg overflow-hidden group">
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-1 text-gray-900">{member.name}</h3>
                  <p className="text-blue-600 font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <Award className="w-16 h-16 mx-auto mb-6 text-blue-200" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start Your Adventure?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied travelers who've discovered the magic of Jordan with Jordan Explorer. Your
            journey of a lifetime awaits.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8">
              <Link href="/tours">Explore Our Tours</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 text-lg px-8 bg-transparent"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

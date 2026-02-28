"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTranslations } from "@/lib/i18n/language-context"
import { Award, Users, Globe, Heart, Shield, Star, MapPin, Calendar, CheckCircle2 } from "lucide-react"

export default function AboutPage() {
  const t = useTranslations()
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
          <Badge className="mb-4 bg-blue-600 hover:bg-blue-700 text-white border-0">{t.aboutPage.badge}</Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
            {t.aboutPage.heroTitle}
            <br />
            {t.aboutPage.heroTitle2}
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 text-balance">
            {t.aboutPage.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200">{t.aboutPage.storyBadge}</Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">{t.aboutPage.storyTitle}</h2>
              <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                <p>{t.aboutPage.storyP1}</p>
                <p>{t.aboutPage.storyP2}</p>
                <p>{t.aboutPage.storyP3}</p>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.aboutPage.impactTitle}</h2>
            <p className="text-xl text-blue-100">{t.aboutPage.impactSubtitle}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Users, number: "10,000+", label: t.aboutPage.happyTravelers },
              { icon: MapPin, number: "50+", label: t.aboutPage.destinations },
              { icon: Calendar, number: "10", label: t.aboutPage.yearsExperience },
              { icon: Star, number: "4.9/5", label: t.aboutPage.averageRating },
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
            <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200">{t.aboutPage.missionBadge}</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">{t.aboutPage.missionTitle}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t.aboutPage.missionSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: t.aboutPage.passion,
                description: t.aboutPage.passionDesc,
              },
              {
                icon: Shield,
                title: t.aboutPage.trust,
                description: t.aboutPage.trustDesc,
              },
              {
                icon: Globe,
                title: t.aboutPage.cultural,
                description: t.aboutPage.culturalDesc,
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
            <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200">{t.aboutPage.whyChooseBadge}</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">{t.aboutPage.whyChooseTitle}</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: t.aboutPage.expertGuides,
                description: t.aboutPage.expertGuidesDesc,
              },
              {
                title: t.aboutPage.flexibleItineraries,
                description: t.aboutPage.flexibleItinerariesDesc,
              },
              {
                title: t.aboutPage.premiumAccommodations,
                description: t.aboutPage.premiumAccommodationsDesc,
              },
              {
                title: t.aboutPage.smallGroups,
                description: t.aboutPage.smallGroupsDesc,
              },
              {
                title: t.aboutPage.support247,
                description: t.aboutPage.support247Desc,
              },
              {
                title: t.aboutPage.bestValue,
                description: t.aboutPage.bestValueDesc,
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
            <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200">{t.aboutPage.teamBadge}</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">{t.aboutPage.teamTitle}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t.aboutPage.teamSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: t.aboutPage.founderName,
                role: t.aboutPage.founderRole,
                image: "/professional-middle-eastern-man-smiling.png",
                bio: t.aboutPage.founderBio,
              },
              {
                name: t.aboutPage.operationsName,
                role: t.aboutPage.operationsRole,
                image: "/professional-woman-smiling.png",
                bio: t.aboutPage.operationsBio,
              },
              {
                name: t.aboutPage.guideName,
                role: t.aboutPage.guideRole,
                image: "/friendly-tour-guide-middle-eastern-man.jpg",
                bio: t.aboutPage.guideBio,
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{t.aboutPage.ctaTitle}</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {t.aboutPage.ctaSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8">
              <Link href="/tours">{t.aboutPage.exploreTours}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 text-lg px-8 bg-transparent"
            >
              <Link href="/contact">{t.common.contactUs}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { HelpCircle, MapPin, CreditCard, Calendar, Users, Shield, Plane, FileText, Clock, Phone } from "lucide-react"
import { useTranslations } from "@/lib/i18n/language-context"

export default function FaqClientPage() {
  const t = useTranslations()

  return (
    <div className="min-h-screen pt-32">
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <HelpCircle className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h1 className="text-5xl md:text-6xl font-bold mb-6">{t.faqPage.heroTitle}</h1>
            <p className="text-xl text-blue-100 leading-relaxed">{t.faqPage.heroSubtitle}</p>
          </div>
        </div>
      </section>

      <section className="py-8 bg-gray-50 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#general" className="px-4 py-2 bg-white rounded-full text-sm font-medium hover:bg-blue-50 transition-colors border">{t.faqPage.generalQuestions}</a>
            <a href="#jordan" className="px-4 py-2 bg-white rounded-full text-sm font-medium hover:bg-blue-50 transition-colors border">{t.faqPage.jordanFaqs}</a>
          </div>
        </div>
      </section>

      <section id="general" className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200">{t.faqPage.generalBadge}</Badge>
            <h2 className="text-4xl font-bold mb-4">{t.faqPage.generalQuestions}</h2>
            <p className="text-gray-600 text-lg">{t.faqPage.generalSubtitle}</p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {[
              { icon: CreditCard, q: t.faqPage.q1, a: t.faqPage.a1 },
              { icon: Shield, q: t.faqPage.q2, a: t.faqPage.a2 },
              { icon: Users, q: t.faqPage.q3, a: t.faqPage.a3 },
              { icon: Calendar, q: t.faqPage.q4, a: t.faqPage.a4 },
              { icon: Phone, q: t.faqPage.q5, a: t.faqPage.a5 },
              { icon: MapPin, q: t.faqPage.q6, a: t.faqPage.a6 },
              { icon: Clock, q: t.faqPage.q7, a: t.faqPage.a7 },
            ].map((item, i) => (
              <AccordionItem key={i} value={`item-${i+1}`} className="border rounded-lg px-6 bg-gray-50">
                <AccordionTrigger className="text-left hover:no-underline">
                  <div className="flex items-start gap-3">
                    <item.icon className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <span className="font-semibold">{item.q}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pl-8">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section id="jordan" className="py-16 bg-gradient-to-br from-blue-50 to-sky-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-600 text-white hover:bg-blue-700">{t.faqPage.jordanBadge}</Badge>
            <h2 className="text-4xl font-bold mb-4">{t.faqPage.jordanFaqs}</h2>
            <p className="text-gray-600 text-lg">{t.faqPage.jordanSubtitle}</p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {[
              { icon: FileText, q: t.faqPage.jq1, a: t.faqPage.ja1 },
              { icon: Plane, q: t.faqPage.jq2, a: t.faqPage.ja2 },
              { icon: Shield, q: t.faqPage.jq3, a: t.faqPage.ja3 },
              { icon: CreditCard, q: t.faqPage.jq4, a: t.faqPage.ja4 },
              { icon: MapPin, q: t.faqPage.jq5, a: t.faqPage.ja5 },
            ].map((item, i) => (
              <AccordionItem key={i} value={`jordan-${i+1}`} className="border rounded-lg px-6 bg-white">
                <AccordionTrigger className="text-left hover:no-underline">
                  <div className="flex items-start gap-3">
                    <item.icon className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <span className="font-semibold">{item.q}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pl-8">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <Phone className="w-12 h-12 mx-auto mb-6 opacity-90" />
          <h2 className="text-4xl font-bold mb-6">{t.faqPage.stillHaveQuestions}</h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">{t.faqPage.stillHaveQuestionsDesc}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              <Link href="/contact">{t.common.contactUs}</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent">
              <Link href="/">{t.faqPage.browseTours}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

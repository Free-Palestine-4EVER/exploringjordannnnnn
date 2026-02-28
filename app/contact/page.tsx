"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { trackContactSubmission } from "@/lib/gtag"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react"
import { useTranslations } from "@/lib/i18n/language-context"

export default function ContactPage() {
  const t = useTranslations()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      trackContactSubmission()
      setTimeout(() => setIsSuccess(false), 5000)
    }, 1000)
  }

  return (
    <div className="min-h-screen pt-32">
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Mail className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h1 className="text-5xl md:text-6xl font-bold mb-6">{t.contactPage.heroTitle}</h1>
            <p className="text-xl text-blue-100 leading-relaxed">{t.contactPage.heroSubtitle}</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200">{t.contactPage.formBadge}</Badge>
              <h2 className="text-3xl font-bold mb-6">{t.contactPage.formTitle}</h2>
              <p className="text-gray-600 mb-8">{t.contactPage.formSubtitle}</p>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">{t.contactPage.firstName}</Label>
                    <Input id="firstName" placeholder={t.contactPage.firstNamePlaceholder} className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">{t.contactPage.lastName}</Label>
                    <Input id="lastName" placeholder={t.contactPage.lastNamePlaceholder} className="mt-1" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">{t.contactPage.emailAddress}</Label>
                  <Input id="email" type="email" placeholder={t.contactPage.emailPlaceholder} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="phone">{t.contactPage.phoneNumber}</Label>
                  <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="subject">{t.contactPage.subject}</Label>
                  <Input id="subject" placeholder={t.contactPage.subjectPlaceholder} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="message">{t.common.message}</Label>
                  <Textarea id="message" placeholder={t.contactPage.messagePlaceholder} rows={6} className="mt-1" />
                </div>
                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting || isSuccess}>
                  <Send className="w-4 h-4 mr-2" />
                  {isSubmitting ? t.common.sending : isSuccess ? t.contactPage.messageSent : t.contactPage.sendMessage}
                </Button>
                {isSuccess && <p className="text-green-600 text-sm text-center">{t.contactPage.thankYou}</p>}
              </form>
            </div>

            <div>
              <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200">{t.contactPage.infoBadge}</Badge>
              <h2 className="text-3xl font-bold mb-6">{t.contactPage.infoTitle}</h2>

              <div className="space-y-6 mb-8">
                <Card className="border-2 border-blue-100">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Phone className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2">{t.contactPage.phoneWhatsApp}</h3>
                        <p className="text-gray-600 mb-2">{t.contactPage.phoneDesc}</p>
                        <a href="tel:+41766633924" className="text-blue-600 hover:underline font-medium">+41 76 663 39 24</a>
                        <p className="text-sm text-gray-500 mt-1">{t.contactPage.emergencySupport}</p>
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
                        <h3 className="font-bold text-lg mb-2">{t.contactPage.emailTitle}</h3>
                        <p className="text-gray-600 mb-2">{t.contactPage.emailDesc}</p>
                        <a href="mailto:info@exploringjordan.com" className="text-blue-600 hover:underline font-medium">info@exploringjordan.com</a>
                        <p className="text-sm text-gray-500 mt-1">{t.contactPage.responseTime}</p>
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
                        <h3 className="font-bold text-lg mb-2">{t.contactPage.officeTitle}</h3>
                        <p className="text-gray-600 mb-2">{t.contactPage.officeDesc}</p>
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
                        <h3 className="font-bold text-lg mb-2">{t.contactPage.businessHours}</h3>
                        <div className="space-y-1 text-gray-600">
                          <p>{t.contactPage.sundayThursday}</p>
                          <p>{t.contactPage.friday}</p>
                          <p>{t.contactPage.saturday}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-3">{t.contactPage.whyChooseTitle}</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">✓</span><span>{t.contactPage.whyChoose1}</span></li>
                  <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">✓</span><span>{t.contactPage.whyChoose2}</span></li>
                  <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">✓</span><span>{t.contactPage.whyChoose3}</span></li>
                  <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">✓</span><span>{t.contactPage.whyChoose4}</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl font-bold mb-6">{t.contactPage.faqTitle}</h2>
          <p className="text-gray-600 mb-8">{t.contactPage.faqSubtitle}</p>
          <Button asChild size="lg"><a href="/faq">{t.contactPage.viewFaq}</a></Button>
        </div>
      </section>
    </div>
  )
}

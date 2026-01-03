"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import WaveBackground from "@/components/wave-background"
import { useTranslations } from "@/lib/i18n/language-context"

export default function TestimonialsSection() {
  const t = useTranslations()
  const [activeIndex, setActiveIndex] = useState(0)

  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "United States",
      avatar: "/images/avatar-1.png",
      rating: 5,
      text: "Our Jordan Explorer tour was absolutely incredible! From the moment we arrived, everything was perfectly organized. The guides were knowledgeable and friendly, and the itinerary allowed us to see all the highlights while still having time to really experience each place. Petra was even more magnificent than I imagined!",
    },
    {
      name: "David Chen",
      location: "Canada",
      avatar: "/images/avatar-2.png",
      rating: 5,
      text: "The 7-day luxury tour exceeded all our expectations. The accommodations were superb, especially the desert camp in Wadi Rum. Our guide Mohammed was exceptional - his knowledge of Jordan's history and culture made the experience so much richer. I've already recommended Jordan Explorer to all my friends!",
    },
    {
      name: "Emma Wilson",
      location: "Australia",
      avatar: "/images/avatar-3.png",
      rating: 5,
      text: "As a solo female traveler, I was looking for a tour company that would provide both adventure and security. Jordan Explorer delivered on both counts! The hiking trails were spectacular, and I felt completely safe and well-cared for throughout my journey. The Dead Sea experience was a highlight I'll never forget.",
    },
    {
      name: "Carlos Mendez",
      location: "Spain",
      avatar: "/images/avatar-4.png",
      rating: 5,
      text: "We took the family adventure package with our two children (ages 8 and 11), and it was perfect! The itinerary was well-paced for kids, with plenty of exciting activities balanced with downtime. The children loved the camel rides and stargazing in Wadi Rum. A truly unforgettable family experience!",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [testimonials.length])

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <WaveBackground />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 md:mb-4 text-blue-800">
            {t.testimonials.title}
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">{t.testimonials.subtitle}</p>
        </div>

        <div className="relative h-[450px] sm:h-[400px] md:h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <Card className="border-none shadow-lg bg-white h-full blue-glow">
                <CardContent className="p-4 sm:p-6 md:p-8 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex mb-3 md:mb-4">
                      {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 md:h-5 md:w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-base md:text-lg italic mb-6 md:mb-8 line-clamp-6 md:line-clamp-none">
                      "{testimonials[activeIndex].text}"
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Avatar className="h-12 w-12 mr-4 border-2 border-blue-200">
                      <AvatarImage
                        src={testimonials[activeIndex].avatar || "/placeholder.svg"}
                        alt={testimonials[activeIndex].name}
                      />
                      <AvatarFallback>{testimonials[activeIndex].name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-blue-700">{testimonials[activeIndex].name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonials[activeIndex].location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center mt-8 gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === activeIndex ? "bg-blue-500 w-6" : "bg-blue-300"
              }`}
              aria-label={`View testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div
        className="absolute top-1/3 left-20 w-16 h-16 rounded-full bg-blue-400/10 floating-element"
        style={{ animationDelay: "0.7s" }}
      ></div>
    </section>
  )
}

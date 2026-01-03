"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Compass, Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react"
import { useTranslations } from "@/lib/i18n/language-context"


export default function Footer() {
  const t = useTranslations()

  return (
    <footer className="bg-slate-950 text-slate-200">
      <div className="container mx-auto px-4 py-10 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4 md:mb-6">
              <Compass className="h-6 w-6 md:h-8 md:w-8 text-primary" />
              <span className="font-bold text-lg md:text-xl text-white">Jordan Explorer</span>
            </Link>
            <p className="text-sm md:text-base text-slate-400 mb-4 md:mb-6">{t.footer.description}</p>
            <div className="flex gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-base md:text-lg mb-4 md:mb-6 text-white">{t.footer.quickLinks}</h3>
            <ul className="space-y-2 md:space-y-3">
              <li>
                <Link href="/tours" className="text-sm md:text-base text-slate-400 hover:text-white transition-colors">
                  {t.footer.toursPackages}
                </Link>
              </li>
              <li>
                <Link
                  href="/destinations"
                  className="text-sm md:text-base text-slate-400 hover:text-white transition-colors"
                >
                  {t.common.destinations}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm md:text-base text-slate-400 hover:text-white transition-colors">
                  {t.common.about}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm md:text-base text-slate-400 hover:text-white transition-colors">
                  {t.footer.travelBlog}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm md:text-base text-slate-400 hover:text-white transition-colors">
                  {t.footer.faqs}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6 text-white">{t.footer.contactUs}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <span className="text-slate-400">123 King Abdullah St, Amman, Jordan</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <a href="tel:+41766633924" className="text-slate-400 hover:text-white transition-colors">
                  +41 76 663 39 24
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <a href="mailto:info@jordanexplorer.com" className="text-slate-400 hover:text-white transition-colors">
                  info@exploringjordan.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6 text-white">{t.footer.newsletterTitle}</h3>
            <p className="text-slate-400 mb-4">{t.footer.newsletterDesc}</p>
            <div className="space-y-2 md:space-y-3">
              <Input
                type="email"
                placeholder={t.footer.emailPlaceholder}
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 h-10 md:h-auto"
              />
              <Button className="w-full">{t.common.subscribe}</Button>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 md:mt-12 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <p className="text-slate-400 text-xs md:text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} {t.footer.copyright}
            </p>

          </div>
          <div className="flex gap-4 md:gap-6 flex-wrap justify-center">
            <Link href="/terms" className="text-xs md:text-sm text-slate-400 hover:text-white transition-colors">
              {t.footer.terms}
            </Link>
            <Link href="/privacy" className="text-xs md:text-sm text-slate-400 hover:text-white transition-colors">
              {t.footer.privacy}
            </Link>
            <Link href="/cookies" className="text-xs md:text-sm text-slate-400 hover:text-white transition-colors">
              {t.footer.cookies}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

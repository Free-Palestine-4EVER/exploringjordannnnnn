"use client"

import { Gift, RefreshCw, Phone } from "lucide-react"
import { useTranslations } from "@/lib/i18n/language-context"

export default function AnnouncementBar() {
  const t = useTranslations()

  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-white text-amber-600 py-2 overflow-hidden border-b border-amber-100 flex items-center">
      <div className="animate-scroll whitespace-nowrap">
        <div className="inline-flex items-center gap-8 px-4">
          <div className="inline-flex items-center gap-2">
            <Gift className="h-4 w-4" />
            <span className="font-medium">{t.announcement.freeEsim}</span>
          </div>
          <span className="text-amber-600/40">•</span>
          <div className="inline-flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            <span className="font-medium">We are full service from airport to airport</span>
          </div>
          {/* Duplicate for seamless loop */}
          <span className="text-amber-600/40">•</span>
          <div className="inline-flex items-center gap-2">
            <Gift className="h-4 w-4" />
            <span className="font-medium">{t.announcement.freeEsim}</span>
          </div>
          <span className="text-amber-600/40">•</span>
          <div className="inline-flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            <span className="font-medium">We are full service from airport to airport</span>
          </div>
        </div>
      </div>
    </div>
  )
}

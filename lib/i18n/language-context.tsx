"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { translations, type Language, type TranslationKeys } from "./translations"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: TranslationKeys
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Map country codes to language codes
const countryToLanguage: Record<string, string> = {
  DE: "de", AT: "de", CH: "de", LI: "de",
  FR: "fr", MC: "fr", BE: "fr",
  ES: "es", MX: "es", AR: "es", CO: "es", CL: "es", PE: "es",
  IT: "it", SM: "it", VA: "it",
  NL: "nl",
  PT: "pt", BR: "pt", AO: "pt", MZ: "pt",
  PL: "pl",
  SE: "sv",
  DK: "da",
  NO: "no",
  FI: "fi",
  CZ: "cs",
  HU: "hu",
  RO: "ro", MD: "ro",
  GR: "el", CY: "el",
  HR: "hr",
  BG: "bg",
  SK: "sk",
  SI: "sl",
  EE: "et",
  LV: "lv",
  LT: "lt",
  TR: "tr",
  RU: "ru",
  UA: "uk",
}

// Map browser language prefixes to our supported languages
const browserLangToLanguage: Record<string, string> = {
  de: "de", fr: "fr", es: "es", it: "it", nl: "nl", pt: "pt", pl: "pl",
  sv: "sv", da: "da", no: "no", nb: "no", nn: "no", fi: "fi", cs: "cs",
  hu: "hu", ro: "ro", el: "el", hr: "hr", bg: "bg", sk: "sk", sl: "sl",
  et: "et", lv: "lv", lt: "lt", tr: "tr", ru: "ru", uk: "uk",
}

function detectLanguageFromBrowser(): string | null {
  if (typeof navigator === "undefined") return null
  const lang = navigator.language || (navigator as any).userLanguage
  if (!lang) return null
  const prefix = lang.split("-")[0].toLowerCase()
  return browserLangToLanguage[prefix] || null
}

async function detectLanguageFromIP(): Promise<string | null> {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 3000) // 3s timeout
    const res = await fetch("https://ipapi.co/json/", { signal: controller.signal })
    clearTimeout(timeout)
    if (!res.ok) return null
    const data = await res.json()
    const country = data.country_code?.toUpperCase()
    return country ? (countryToLanguage[country] || null) : null
  } catch {
    return null
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    async function initLanguage() {
      // 1. Check localStorage first — user's manual choice takes priority
      const savedLang = localStorage.getItem("language")
      if (savedLang && translations[savedLang]) {
        setLanguageState(savedLang as Language)
        setIsReady(true)
        return
      }

      // 2. Check if we've already auto-detected before (avoid repeated API calls)
      const autoDetected = localStorage.getItem("language_auto_detected")
      if (autoDetected && translations[autoDetected]) {
        setLanguageState(autoDetected as Language)
        setIsReady(true)
        return
      }

      // 3. Try IP-based detection
      const ipLang = await detectLanguageFromIP()
      if (ipLang && translations[ipLang]) {
        setLanguageState(ipLang as Language)
        localStorage.setItem("language_auto_detected", ipLang)
        document.documentElement.lang = ipLang
        setIsReady(true)
        return
      }

      // 4. Fallback to browser language
      const browserLang = detectLanguageFromBrowser()
      if (browserLang && translations[browserLang]) {
        setLanguageState(browserLang as Language)
        localStorage.setItem("language_auto_detected", browserLang)
        document.documentElement.lang = browserLang
        setIsReady(true)
        return
      }

      // 5. Default to English
      setIsReady(true)
    }

    initLanguage()
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    // When user manually picks a language, save to localStorage (overrides auto-detection)
    localStorage.setItem("language", lang)
    // Clear auto-detected flag so manual choice is always respected
    localStorage.removeItem("language_auto_detected")
    document.documentElement.lang = lang
  }

  const t = translations[language] || translations.en

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

export function useTranslations() {
  const { t } = useLanguage()
  return t
}

export type { Language }

"use client"

import { useLanguage, type Language } from "@/lib/i18n/language-context"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

const languages: { code: Language; name: string; flag: string }[] = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "nl", name: "Nederlands", flag: "🇳🇱" },
  { code: "pt", name: "Português", flag: "🇵🇹" },
  { code: "pl", name: "Polski", flag: "🇵🇱" },
  { code: "sv", name: "Svenska", flag: "🇸🇪" },
  { code: "da", name: "Dansk", flag: "🇩🇰" },
  { code: "no", name: "Norsk", flag: "🇳🇴" },
  { code: "fi", name: "Suomi", flag: "🇫🇮" },
  { code: "cs", name: "Čeština", flag: "🇨🇿" },
  { code: "hu", name: "Magyar", flag: "🇭🇺" },
  { code: "ro", name: "Română", flag: "🇷🇴" },
  { code: "el", name: "Ελληνικά", flag: "🇬🇷" },
  { code: "hr", name: "Hrvatski", flag: "🇭🇷" },
  { code: "bg", name: "Български", flag: "🇧🇬" },
  { code: "sk", name: "Slovenčina", flag: "🇸🇰" },
  { code: "sl", name: "Slovenščina", flag: "🇸🇮" },
  { code: "et", name: "Eesti", flag: "🇪🇪" },
  { code: "lv", name: "Latviešu", flag: "🇱🇻" },
  { code: "lt", name: "Lietuvių", flag: "🇱🇹" },
  { code: "tr", name: "Türkçe", flag: "🇹🇷" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "uk", name: "Українська", flag: "🇺🇦" },
]

interface LanguageSwitcherProps {
  variant?: "default" | "header" | "footer"
}

export default function LanguageSwitcher({ variant = "default" }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage()

  const currentLang = languages.find((l) => l.code === language) || languages[0]

  const menuItems = (
    <ScrollArea className="h-[400px]">
      {languages.map((lang) => (
        <DropdownMenuItem
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className={language === lang.code ? "bg-blue-50" : ""}
        >
          <span className="mr-2">{lang.flag}</span>
          {lang.name}
        </DropdownMenuItem>
      ))}
    </ScrollArea>
  )

  if (variant === "header") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 hover:text-white gap-1.5 px-2">
            <Globe className="h-4 w-4" />
            <span>{currentLang.flag}</span>
            <span className="text-xs font-medium uppercase">{currentLang.code}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {menuItems}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  if (variant === "footer") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white gap-2">
            <Globe className="h-4 w-4" />
            {currentLang.flag} {currentLang.name}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          {menuItems}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <Globe className="h-4 w-4" />
          {currentLang.flag} {currentLang.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        {menuItems}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

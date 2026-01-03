"use client"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Compass, Menu, X, Sparkles, ChevronDown } from "lucide-react"
import toursData from "@/data/tours.json"
import { useState } from "react"
import { useTranslations } from "@/lib/i18n/language-context"


const jordanTours = toursData.filter(
  (tour) =>
    !tour.id.includes("egypt") &&
    !tour.id.includes("nile") &&
    !tour.id.includes("cultural-grand") &&
    !tour.id.includes("saudi") &&
    !tour.id.includes("alula") &&
    !tour.id.includes("arabia"),
)

const destinations = [
  {
    title: "Petra",
    href: "/destinations/petra",
    description: "The ancient rose-red city",
    image: "/petra-treasury-jordan.jpg",
    category: "Jordan",
  },
  {
    title: "Wadi Rum",
    href: "/destinations/wadi-rum",
    description: "The Valley of the Moon",
    image: "/wadi-rum-desert-red-sand-dunes-dramatic-rock-forma.jpg",
    category: "Jordan",
  },
  {
    title: "Dead Sea",
    href: "/destinations/dead-sea",
    description: "The lowest point on Earth",
    image: "/dead-sea-floating-jordan.jpg",
    category: "Jordan",
  },
  {
    title: "Amman",
    href: "/destinations/amman",
    description: "Jordan's vibrant capital",
    image: "/amman-city-jordan-citadel.jpg",
    category: "Jordan",
  },
  {
    title: "Aqaba",
    href: "/destinations/aqaba",
    description: "Red Sea resort city",
    image: "/aqaba-red-sea-beach.jpg",
    category: "Jordan",
  },
]

const jordanDestinations = destinations.filter((d) => d.category === "Jordan")

export default function Header() {
  const t = useTranslations()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [toursOpen, setToursOpen] = useState(false)
  const [destinationsOpen, setDestinationsOpen] = useState(false)

  return (
    <>
      <div className={mobileMenuOpen ? "hidden" : "block"}>
        {/* Announcement bar will be rendered here by layout */}
      </div>

      <header
        className={`fixed ${mobileMenuOpen ? "hidden" : "top-8"} left-0 right-0 z-50 transition-all duration-300 bg-gradient-to-r from-amber-600 to-amber-500 backdrop-blur-md shadow-md py-2 md:py-3`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1 md:gap-2">
            <Compass className="h-6 w-6 md:h-8 md:w-8 text-white" />
            <span className="font-bold text-lg md:text-xl text-white">Jordan Explorer</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-white">{t.common.tours}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[600px] max-h-[600px] overflow-y-auto p-6">
                      <div className="space-y-8">
                        <div>
                          <h3 className="text-base font-bold text-amber-600 mb-4 pb-2 border-b-2 border-amber-100">
                            {t.header.jordanTours}
                          </h3>
                          <div className="grid grid-cols-3 gap-4">
                            {jordanTours.map((tour) => (
                              <NavigationMenuLink key={tour.slug} asChild>
                                <a
                                  href={`/tours/${tour.slug}`}
                                  className="group flex flex-col gap-3 select-none rounded-lg p-3 leading-none no-underline outline-none transition-all hover:bg-amber-50 hover:shadow-md border border-transparent hover:border-amber-200"
                                >
                                  <div className="relative h-32 w-full rounded-md overflow-hidden">
                                    <Image
                                      src={tour.heroImage || "/placeholder.svg"}
                                      alt={tour.title}
                                      fill
                                      className="object-cover transition-transform group-hover:scale-105"
                                    />
                                  </div>
                                  <div>
                                    <div className="text-sm font-semibold leading-tight mb-1">{tour.title}</div>
                                    <div className="text-xs text-amber-600 font-medium">{tour.tagline}</div>
                                  </div>
                                </a>
                              </NavigationMenuLink>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-white">
                    {t.common.destinations}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[500px] max-h-[600px] overflow-y-auto p-6">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-base font-bold text-amber-600 mb-4 pb-2 border-b-2 border-amber-100">
                            {t.header.jordanDestinations}
                          </h3>
                          <div className="grid grid-cols-3 gap-4">
                            {jordanDestinations.map((destination) => (
                              <a
                                key={destination.href}
                                href={destination.href}
                                className="group flex flex-col gap-2 select-none rounded-lg p-3 leading-none no-underline outline-none transition-all hover:bg-amber-50 hover:shadow-md border border-transparent hover:border-amber-200"
                              >
                                <div className="relative h-24 w-full rounded-md overflow-hidden">
                                  <Image
                                    src={destination.image || "/placeholder.svg"}
                                    alt={destination.title}
                                    fill
                                    className="object-cover transition-transform group-hover:scale-105"
                                  />
                                </div>
                                <div>
                                  <div className="text-sm font-semibold leading-tight mb-1">{destination.title}</div>
                                  <div className="text-xs text-muted-foreground">{destination.description}</div>
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild className="bg-transparent text-white">
                    <Link href="/about">{t.common.about}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>



                <NavigationMenuItem>
                  <NavigationMenuLink asChild className="bg-transparent text-white">
                    <Link href="/faq">{t.common.faq}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <div className="flex items-center gap-4">

              <Button
                asChild
                variant="outline"
                size="sm"
                className="border-white/30 text-white hover:bg-white/10 hover:text-white bg-transparent"
              >
                <Link href="/contact">{t.common.contactUs}</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/book-now">{t.common.bookNow}</Link>
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4 md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="p-0 w-full fixed inset-0 border-0 z-[100] bg-white overflow-hidden min-h-screen [&>button]:hidden"
                style={{
                  height: "100dvh",
                  minHeight: "100vh",
                  paddingTop: "max(env(safe-area-inset-top), 20px)",
                  paddingBottom: "max(env(safe-area-inset-bottom), 20px)",
                }}
              >
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute rounded-full bg-amber-500/10 animate-float"
                      style={{
                        width: `${20 + Math.random() * 40}px`,
                        height: `${20 + Math.random() * 40}px`,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDuration: `${20 + Math.random() * 40}s`,
                        animationDelay: `${Math.random() * 5}s`,
                      }}
                    />
                  ))}
                </div>

                <div className="relative h-full flex flex-col">
                  <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-amber-100">
                    <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2">
                      <Compass className="h-8 w-8 text-amber-600" />
                      <span className="font-bold text-xl text-amber-600">Jordan Explorer</span>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-amber-600 hover:bg-amber-50"
                    >
                      <X className="h-6 w-6" />
                    </Button>
                  </div>

                  <div className="flex-1 overflow-y-auto px-6 pt-6 pb-8">
                    <nav className="space-y-6">
                      <Link
                        href="/"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-xl font-medium text-amber-600 hover:text-amber-700 transition-colors"
                      >
                        {t.common.home}
                      </Link>

                      <div className="space-y-2">
                        <button
                          onClick={() => setToursOpen(!toursOpen)}
                          className="flex items-center justify-between w-full text-xl font-medium text-amber-600 hover:text-amber-700 transition-colors"
                        >
                          <span>{t.common.tours}</span>
                          <ChevronDown className={`h-5 w-5 transition-transform ${toursOpen ? "rotate-180" : ""}`} />
                        </button>

                        {toursOpen && (
                          <div className="relative">
                            <div className="pl-4 space-y-4 pr-2">
                              <div>
                                <h4 className="text-sm font-semibold text-amber-700 mb-2">{t.header.jordanTours}</h4>
                                <div className="space-y-2">
                                  {jordanTours.map((tour) => (
                                    <Link
                                      key={tour.slug}
                                      href={`/tours/${tour.slug}`}
                                      onClick={() => setMobileMenuOpen(false)}
                                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-amber-50 transition-colors"
                                    >
                                      <div className="relative w-20 h-14 rounded overflow-hidden flex-shrink-0">
                                        <Image
                                          src={tour.heroImage || "/placeholder.svg"}
                                          alt={tour.title}
                                          fill
                                          className="object-cover"
                                        />
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <div className="text-sm font-medium text-amber-900 truncate">{tour.title}</div>
                                        <div className="text-xs text-amber-600 truncate">{tour.tagline}</div>
                                      </div>
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <button
                          onClick={() => setDestinationsOpen(!destinationsOpen)}
                          className="flex items-center justify-between w-full text-xl font-medium text-amber-600 hover:text-amber-700 transition-colors"
                        >
                          <span>{t.common.destinations}</span>
                          <ChevronDown
                            className={`h-5 w-5 transition-transform ${destinationsOpen ? "rotate-180" : ""}`}
                          />
                        </button>

                        {destinationsOpen && (
                          <div className="relative">
                            <div className="pl-4 space-y-4 pr-2">
                              <div>
                                <h4 className="text-sm font-semibold text-amber-700 mb-2">
                                  {t.header.jordanDestinations}
                                </h4>
                                <div className="space-y-2">
                                  {jordanDestinations.map((dest) => (
                                    <Link
                                      key={dest.href}
                                      href={dest.href}
                                      onClick={() => setMobileMenuOpen(false)}
                                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                                    >
                                      <div className="relative w-20 h-14 rounded overflow-hidden flex-shrink-0">
                                        <Image
                                          src={dest.image || "/placeholder.svg"}
                                          alt={dest.title}
                                          fill
                                          className="object-cover"
                                        />
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <div className="text-sm font-medium text-amber-900 truncate">{dest.title}</div>
                                        <div className="text-xs text-amber-600 truncate">{dest.description}</div>
                                      </div>
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>



                      <Link
                        href="/about"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-2xl font-light text-amber-600 hover:text-amber-700 transition-colors"
                      >
                        {t.common.about}
                      </Link>

                      <Link
                        href="/faq"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-2xl font-light text-amber-600 hover:text-amber-700 transition-colors"
                      >
                        {t.common.faq}
                      </Link>

                      <Link
                        href="/contact"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-2xl font-light text-amber-600 hover:text-amber-700 transition-colors"
                      >
                        {t.common.contact}
                      </Link>

                      <div className="pt-4 border-t border-amber-100">

                      </div>
                    </nav>

                    <div className="mt-8 pt-6 border-t border-amber-100">
                      <Link
                        href="/book-now"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block w-full py-4 px-6 bg-gradient-to-r from-amber-600 to-amber-500 text-white text-center text-lg font-semibold rounded-full hover:from-amber-700 hover:to-amber-600 transition-all shadow-lg"
                      >
                        {t.common.bookNow}
                      </Link>

                      <a
                        href="https://wa.me/41766633924"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full py-4 px-6 mt-4 bg-[#25D366] text-white text-center text-lg font-semibold rounded-full hover:bg-[#128C7E] transition-all shadow-lg flex items-center justify-center gap-2"
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                        </svg>
                        WhatsApp Us
                      </a>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  )
}

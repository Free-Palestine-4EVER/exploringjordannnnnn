"use client"

import {
    MapPin,
    Calendar,
    Users,
    Check,
    X,
    Star,
    Plane,
    Building2,
    Mountain,
    Sunrise,
    Sun,
    Compass,
    ChevronDown,
    Tent,
    Waves,
    Landmark,
    Castle,
    Church,
} from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { useTranslations } from "@/lib/i18n/language-context"

/* ------------------------------------------------------------------ */
/*  COLOUR UTILITIES                                                   */
/* ------------------------------------------------------------------ */

const colorMap: Record<string, { border: string; bg: string; text: string; dot: string; badge: string; badgeText: string }> = {
    blue: { border: "border-blue-500", bg: "bg-blue-500", text: "text-blue-600", dot: "bg-blue-500", badge: "bg-blue-50", badgeText: "text-blue-700" },
    amber: { border: "border-amber-500", bg: "bg-amber-500", text: "text-amber-600", dot: "bg-amber-500", badge: "bg-amber-50", badgeText: "text-amber-700" },
    emerald: { border: "border-emerald-500", bg: "bg-emerald-500", text: "text-emerald-600", dot: "bg-emerald-500", badge: "bg-emerald-50", badgeText: "text-emerald-700" },
    purple: { border: "border-purple-500", bg: "bg-purple-500", text: "text-purple-600", dot: "bg-purple-500", badge: "bg-purple-50", badgeText: "text-purple-700" },
    rose: { border: "border-rose-500", bg: "bg-rose-500", text: "text-rose-600", dot: "bg-rose-500", badge: "bg-rose-50", badgeText: "text-rose-700" },
    orange: { border: "border-orange-500", bg: "bg-orange-500", text: "text-orange-600", dot: "bg-orange-500", badge: "bg-orange-50", badgeText: "text-orange-700" },
    cyan: { border: "border-cyan-500", bg: "bg-cyan-500", text: "text-cyan-600", dot: "bg-cyan-500", badge: "bg-cyan-50", badgeText: "text-cyan-700" },
    slate: { border: "border-slate-400", bg: "bg-slate-400", text: "text-slate-500", dot: "bg-slate-400", badge: "bg-slate-50", badgeText: "text-slate-600" },
}

const dayIcons = [Plane, Castle, Landmark, Church, Mountain, Compass, Waves, Plane]
const dayColors = ["blue", "amber", "emerald", "purple", "rose", "orange", "cyan", "slate"]
const dayImages = [
    "/amman-city-jordan-citadel.jpg",
    "/amman-citadel-roman-columns.jpg",
    "/jerash-roman-ruins-columns.jpg",
    "/petra-treasury-jordan-sunset-golden-hour.jpg",
    "/petra-treasury-ancient-ruins.jpg",
    "/wadi-rum-desert-red-sand-dunes-dramatic-rock-forma.jpg",
    "/dead-sea-floating-jordan.jpg",
    null,
]

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

export default function ProgramClientPage() {
    const [activeTab, setActiveTab] = useState<"4star" | "5star">("4star")
    const t = useTranslations()
    const p = t.programPage

    const itinerary = [
        { title: p.day1Title, route: p.day1Route, description: p.day1Description, overnight: p.overnightAmman, meals: [p.mealDinner] },
        { title: p.day2Title, route: p.day2Route, description: p.day2Description, overnight: p.overnightAmman, meals: [p.mealBreakfast, p.mealDinner] },
        { title: p.day3Title, route: p.day3Route, description: p.day3Description, overnight: p.overnightAmman, meals: [p.mealBreakfast, p.mealDinner] },
        { title: p.day4Title, route: p.day4Route, description: p.day4Description, overnight: p.overnightPetra, meals: [p.mealBreakfast, p.mealDinner] },
        { title: p.day5Title, route: p.day5Route, description: p.day5Description, overnight: p.overnightPetra, meals: [p.mealBreakfast, p.mealDinner] },
        { title: p.day6Title, route: p.day6Route, description: p.day6Description, overnight: p.overnightWadiRum, meals: [p.mealBreakfast, p.mealDinner] },
        { title: p.day7Title, route: p.day7Route, description: p.day7Description, overnight: p.overnightAmman, meals: [p.mealBreakfast, p.mealDinner] },
        { title: p.day8Title, route: p.day8Route, description: p.day8Description, overnight: null, meals: [p.mealBreakfast] },
    ]

    const hotels4Star = [
        { location: p.overnightAmman, name: p.hotel4Amman, nights: 4, meal: "HB" },
        { location: p.overnightPetra, name: p.hotel4Petra, nights: 2, meal: "HB" },
        { location: p.overnightWadiRum, name: p.hotel4WadiRum, nights: 1, meal: "HB" },
    ]

    const hotels5Star = [
        { location: p.overnightAmman, name: p.hotel5Amman, nights: 4, meal: "HB" },
        { location: p.overnightPetra, name: p.hotel5Petra, nights: 2, meal: "HB" },
        { location: p.overnightWadiRum, name: p.hotel5WadiRum, nights: 1, meal: "HB" },
    ]

    const included = [p.included1, p.included2, p.included3, p.included4, p.included5, p.included6, p.included7, p.included8]
    const excluded = [p.excluded1, p.excluded2, p.excluded3, p.excluded4, p.excluded5, p.excluded6]

    return (
        <div className="bg-gradient-to-br from-slate-50 via-white to-amber-50/30">
            {/* HERO */}
            <section className="relative pt-32 pb-24 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-600/5 via-transparent to-rose-600/5" />
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-full text-sm font-semibold mb-8 shadow-lg shadow-amber-600/20">
                        <Star className="w-4 h-4" />
                        {p.heroBadge}
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 leading-[1.1] tracking-tight">
                        {p.heroTitle1}
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-rose-500 to-blue-600">
                            {p.heroTitle2}
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
                        {p.heroSubtitle}
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-slate-700">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-amber-600" />
                            <span className="font-medium">{p.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-amber-600" />
                            <span className="font-medium">{p.destinations}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Users className="w-5 h-5 text-amber-600" />
                            <span className="font-medium">{p.travelers}</span>
                        </div>
                    </div>

                    <div className="mt-14 animate-bounce">
                        <ChevronDown className="w-6 h-6 text-amber-600/60 mx-auto" />
                    </div>
                </div>
            </section>

            {/* ITINERARY TIMELINE */}
            <section className="py-24 px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-20">
                        <p className="text-amber-600 font-semibold uppercase tracking-widest text-sm mb-3">{p.journeyLabel}</p>
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">{p.itineraryTitle}</h2>
                        <p className="text-lg text-slate-500 max-w-xl mx-auto">
                            {p.itinerarySubtitle}
                        </p>
                    </div>

                    <div className="space-y-0">
                        {itinerary.map((day, idx) => {
                            const c = colorMap[dayColors[idx]]
                            const Icon = dayIcons[idx]
                            const image = dayImages[idx]
                            const isLast = idx === itinerary.length - 1

                            return (
                                <div key={idx} className="relative flex gap-6 md:gap-10">
                                    <div className="flex flex-col items-center">
                                        <div
                                            className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl ${c.bg} text-white flex items-center justify-center shadow-lg shadow-${dayColors[idx]}-500/25 flex-shrink-0 z-10`}
                                        >
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        {!isLast && (
                                            <div className="w-0.5 flex-1 bg-gradient-to-b from-slate-300 to-slate-200 my-2" />
                                        )}
                                    </div>

                                    <div className={`flex-1 pb-12 ${isLast ? "pb-0" : ""}`}>
                                        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 group">
                                            {image && (
                                                <div className="relative h-48 md:h-56 overflow-hidden">
                                                    <Image
                                                        src={image}
                                                        alt={day.title}
                                                        fill
                                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                                    <div className="absolute bottom-4 left-6">
                                                        <span className="text-white/80 text-sm font-medium">{day.route}</span>
                                                    </div>
                                                </div>
                                            )}

                                            <div className="p-6 md:p-8">
                                                <div className="flex items-start justify-between mb-3">
                                                    <div>
                                                        <span className={`text-xs font-bold uppercase tracking-wider ${c.badgeText}`}>
                                                            {p.day} {idx + 1}
                                                        </span>
                                                        <h3 className="text-xl md:text-2xl font-bold text-slate-900 mt-1">
                                                            {day.title}
                                                        </h3>
                                                    </div>
                                                </div>

                                                <p className="text-slate-600 leading-relaxed mb-5">{day.description}</p>

                                                <div className="flex flex-wrap gap-3">
                                                    {day.overnight && (
                                                        <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 ${c.badge} ${c.badgeText} rounded-full text-xs font-semibold`}>
                                                            <Building2 className="w-3.5 h-3.5" />
                                                            {p.overnight}: {day.overnight}
                                                        </div>
                                                    )}
                                                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-600 rounded-full text-xs font-semibold">
                                                        🍽️ {day.meals.join(", ")}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* HOTELS & PRICING */}
            <section className="py-24 px-4 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <p className="text-amber-400 font-semibold uppercase tracking-widest text-sm mb-3">{p.chooseStyleLabel}</p>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{p.hotelsTitle}</h2>
                        <p className="text-lg text-blue-200 max-w-xl mx-auto">
                            {p.hotelsSubtitle}
                        </p>
                    </div>

                    <div className="flex justify-center mb-12">
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-1.5 inline-flex gap-1">
                            <button
                                onClick={() => setActiveTab("4star")}
                                className={`px-8 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${activeTab === "4star"
                                    ? "bg-amber-500 text-white shadow-lg shadow-amber-500/30"
                                    : "text-white/70 hover:text-white hover:bg-white/10"
                                    }`}
                            >
                                ★★★★ {p.comfort}
                            </button>
                            <button
                                onClick={() => setActiveTab("5star")}
                                className={`px-8 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${activeTab === "5star"
                                    ? "bg-amber-500 text-white shadow-lg shadow-amber-500/30"
                                    : "text-white/70 hover:text-white hover:bg-white/10"
                                    }`}
                            >
                                ★★★★★ {p.premium}
                            </button>
                        </div>
                    </div>

                    <div className="max-w-3xl mx-auto">
                        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-amber-400/50">
                            <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 p-8 text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3" />
                                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/3" />
                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <h3 className="text-2xl md:text-3xl font-bold">
                                                {activeTab === "4star" ? p.comfortPackage : p.premiumPackage}
                                            </h3>
                                            <p className="text-amber-100 mt-1">{p.packageDuration}</p>
                                        </div>
                                        <div className="hidden md:block bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 text-center">
                                            <p className="text-xs text-amber-100">{p.perPersonLabel}</p>
                                            <p className="text-3xl font-extrabold">
                                                ${activeTab === "4star" ? "1,080" : "1,280"}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="md:hidden mt-4 bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 text-center">
                                        <p className="text-xs text-amber-100">{p.pricePerPersonSharing}</p>
                                        <p className="text-4xl font-extrabold mt-1">
                                            ${activeTab === "4star" ? "1,080" : "1,280"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 md:p-8">
                                <h4 className="font-bold text-slate-900 text-lg mb-5 flex items-center gap-2">
                                    <Building2 className="w-5 h-5 text-amber-600" />
                                    {p.yourAccommodations}
                                </h4>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b-2 border-slate-200">
                                                <th className="text-left py-3 px-2 text-slate-500 font-semibold uppercase tracking-wider text-xs">{p.locationHeader}</th>
                                                <th className="text-left py-3 px-2 text-slate-500 font-semibold uppercase tracking-wider text-xs">{p.hotelHeader}</th>
                                                <th className="text-center py-3 px-2 text-slate-500 font-semibold uppercase tracking-wider text-xs">{p.nightsHeader}</th>
                                                <th className="text-center py-3 px-2 text-slate-500 font-semibold uppercase tracking-wider text-xs">{p.mealsHeader}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {(activeTab === "4star" ? hotels4Star : hotels5Star).map((h, i) => (
                                                <tr key={i} className="border-b border-slate-100 last:border-0 hover:bg-amber-50/30 transition-colors">
                                                    <td className="py-3.5 px-2 font-bold text-slate-900 whitespace-nowrap">
                                                        <div className="flex items-center gap-2">
                                                            <MapPin className="w-4 h-4 text-amber-500" />
                                                            {h.location}
                                                        </div>
                                                    </td>
                                                    <td className="py-3.5 px-2 text-slate-700">{h.name}</td>
                                                    <td className="py-3.5 px-2 text-center text-slate-700 font-medium">{h.nights}</td>
                                                    <td className="py-3.5 px-2 text-center">
                                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-medium">
                                                            {h.meal}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <p className="text-xs text-slate-400 mt-4 italic">{p.hotelsDisclaimer}</p>

                                <div className="mt-8 p-5 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-slate-500 font-medium">{p.pricePerPersonSharingShort}</p>
                                            <p className="text-sm text-slate-400">{p.forTwoPassengers}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-3xl md:text-4xl font-extrabold text-slate-900">
                                                ${activeTab === "4star" ? "1,080" : "1,280"}
                                            </p>
                                            <p className="text-xs text-slate-500">{p.usdPerPerson}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* INCLUDED / EXCLUDED */}
            <section className="py-24 px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <p className="text-amber-600 font-semibold uppercase tracking-widest text-sm mb-3">{p.packageDetailsLabel}</p>
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">{p.whatsIncludedTitle}</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-3xl p-8 shadow-lg border border-emerald-100">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-600/20">
                                    <Check className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900">{p.includedTitle}</h3>
                            </div>
                            <ul className="space-y-4">
                                {included.map((item, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <Check className="w-3 h-3 text-emerald-600" />
                                        </div>
                                        <span className="text-slate-700 text-sm leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl p-8 shadow-lg border border-slate-200">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-12 h-12 bg-slate-600 rounded-2xl flex items-center justify-center shadow-lg shadow-slate-600/20">
                                    <X className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900">{p.notIncludedTitle}</h3>
                            </div>
                            <ul className="space-y-4">
                                {excluded.map((item, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <X className="w-3 h-3 text-slate-500" />
                                        </div>
                                        <span className="text-slate-500 text-sm leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="py-20 px-4 bg-gradient-to-r from-amber-600 via-amber-500 to-orange-500 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/3" />
                <div className="absolute bottom-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl translate-y-1/2 translate-x-1/3" />
                <div className="max-w-3xl mx-auto text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{p.readyToBook}</h2>
                    <p className="text-xl text-white/90 mb-10 leading-relaxed">
                        {p.readyToBookSubtitle}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild size="lg" className="text-lg px-10 py-7 bg-white text-amber-700 hover:bg-amber-50 font-bold shadow-xl shadow-black/10 rounded-xl">
                            <Link href="/contact">{p.contactToBook}</Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="text-lg px-10 py-7 border-2 border-white/40 text-white hover:bg-white/10 bg-transparent font-bold rounded-xl">
                            <Link href="https://wa.me/962776615785" target="_blank">{t.common.whatsappUs}</Link>
                        </Button>
                    </div>
                    <p className="text-sm text-white/70 mt-8">{p.available247}</p>
                </div>
            </section>
        </div>
    )
}

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

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const itinerary = [
    {
        day: 1,
        title: "Arrival — Welcome to Jordan",
        route: "QAIA → Amman",
        icon: Plane,
        color: "blue",
        image: "/amman-city-jordan-citadel.jpg",
        description:
            "Upon arrival at Queen Alia International Airport, you will be welcomed by our representative who will assist with arrival formalities. Transfer to your hotel in Amman for check-in. Enjoy the rest of the day at leisure to relax or explore the capital at your own pace.",
        overnight: "Amman",
        meals: ["Dinner"],
    },
    {
        day: 2,
        title: "Amman City Tour & Desert Castles",
        route: "Amman → Desert Castles → Amman",
        icon: Castle,
        color: "amber",
        image: "/amman-citadel-roman-columns.jpg",
        description:
            "After breakfast, begin your city tour of Amman, visiting highlights such as the Citadel, the Roman Theater, and the bustling downtown area. Later, drive east to explore Jordan's famous Desert Castles including Qasr Amra (UNESCO site), Qasr Al Kharana, and Qasr Al Azraq.",
        overnight: "Amman",
        meals: ["Breakfast", "Dinner"],
    },
    {
        day: 3,
        title: "Ancient Jerash & Ajloun Castle",
        route: "Amman → Jerash → Ajloun → Amman",
        icon: Landmark,
        color: "emerald",
        image: "/jerash-roman-ruins-columns.jpg",
        description:
            "Drive north to Jerash, one of the best-preserved Roman cities in the world. Explore Hadrian's Arch, Oval Plaza, Roman Theater, Cardo Street, and temples. Continue to Ajloun to visit Ajloun Castle, a 12th-century Islamic fortress built by Saladin's forces, offering panoramic views over the Jordan Valley.",
        overnight: "Amman",
        meals: ["Breakfast", "Dinner"],
    },
    {
        day: 4,
        title: "Madaba Mosaics & Mount Nebo",
        route: "Amman → Madaba → Mount Nebo → Petra",
        icon: Church,
        color: "purple",
        image: "/petra-treasury-jordan-sunset-golden-hour.jpg",
        description:
            "Head south toward Madaba, known for its stunning Byzantine mosaics including the famous 6th-century Holy Land Map. Continue to Mount Nebo, the memorial site of Prophet Moses, where you can admire sweeping views of the Jordan Valley. Drive to Petra for check-in.",
        overnight: "Petra",
        meals: ["Breakfast", "Dinner"],
    },
    {
        day: 5,
        title: "Petra — Full Day Exploration",
        route: "Petra",
        icon: Mountain,
        color: "rose",
        image: "/petra-treasury-ancient-ruins.jpg",
        description:
            "Spend the entire day exploring Petra, Jordan's crown jewel and one of the New Seven Wonders of the World. Walk through the narrow Siq leading to the breathtaking Treasury, then continue discovering the Street of Facades, Royal Tombs, and the Theater. Climb to the Monastery for panoramic views.",
        overnight: "Petra",
        meals: ["Breakfast", "Dinner"],
    },
    {
        day: 6,
        title: "Little Petra & Wadi Rum Jeep Safari",
        route: "Petra → Little Petra → Wadi Rum",
        icon: Compass,
        color: "orange",
        image: "/wadi-rum-desert-red-sand-dunes-dramatic-rock-forma.jpg",
        description:
            "Visit Little Petra, a Nabatean suburb with carved facades and an atmospheric canyon. Then proceed to Wadi Rum, the Valley of the Moon. Enjoy a thrilling 2-hour 4×4 jeep tour through the desert, exploring dunes, canyons, and iconic rock bridges. Dinner and overnight in a desert camp.",
        overnight: "Wadi Rum",
        meals: ["Breakfast", "Dinner"],
    },
    {
        day: 7,
        title: "Dead Sea & Return to Amman",
        route: "Wadi Rum → Dead Sea → Amman",
        icon: Waves,
        color: "cyan",
        image: "/dead-sea-floating-jordan.jpg",
        description:
            "Wake up in the peaceful desert before departing toward the Dead Sea, the lowest point on Earth. Upon arrival, enjoy the renowned healing waters with time to swim and relax. The rest of the day is at leisure to enjoy resort facilities, spa treatments, or rest by the pool. Afterwards, drive back to Amman for dinner and overnight.",
        overnight: "Amman",
        meals: ["Breakfast", "Dinner"],
    },
    {
        day: 8,
        title: "Departure",
        route: "Amman → QAIA",
        icon: Plane,
        color: "slate",
        image: null,
        description:
            "Breakfast at hotel. Transfer to Queen Alia International Airport for your departure flight. We hope you carry home unforgettable memories of Jordan!",
        overnight: null,
        meals: ["Breakfast"],
    },
]

const hotels4Star = [
    { location: "Amman", name: "Mena Tyche or similar", nights: 4, meal: "HB" },
    { location: "Petra", name: "Petra Legacy or similar", nights: 2, meal: "HB" },
    { location: "Wadi Rum", name: "Rum Oasis Camp (Deluxe Tent)", nights: 1, meal: "HB" },
]

const hotels5Star = [
    { location: "Amman", name: "Bristol or similar", nights: 4, meal: "HB" },
    { location: "Petra", name: "Hayat Zaman or similar", nights: 2, meal: "HB" },
    { location: "Wadi Rum", name: "Rum Oasis Camp (Deluxe Tent)", nights: 1, meal: "HB" },
]

const included = [
    "Meet and assist upon arrival and departure",
    "All transfers by AC modern vehicles",
    "English speaking local guide in Jerash for 1 hour",
    "English speaking local guide in Petra for 2 hours",
    "7 nights hotel accommodation on HB basis (Dinner & Breakfast)",
    "Entrance fees to all mentioned tourist sites",
    "2-hour Jeep tour 4×4 in Wadi Rum",
    "Entrance to Dead Sea through Holiday Inn Resort or similar",
]

const excluded = [
    "Accompanied guide supplement for 6 days — $370 per person",
    "International flights",
    "Lunches",
    "Tips and porterage",
    "Beverages in general",
    "Any other services not mentioned above",
]

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

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

export default function ProgramClientPage() {
    const [activeTab, setActiveTab] = useState<"4star" | "5star">("4star")

    return (
        <div className="bg-gradient-to-br from-slate-50 via-white to-amber-50/30">
            {/* ============================================================ */}
            {/*  HERO                                                        */}
            {/* ============================================================ */}
            <section className="relative pt-32 pb-24 px-4 overflow-hidden">
                {/* decorative bg */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-600/5 via-transparent to-rose-600/5" />
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-full text-sm font-semibold mb-8 shadow-lg shadow-amber-600/20">
                        <Star className="w-4 h-4" />
                        Exclusive Offer • 8-Day Program
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 leading-[1.1] tracking-tight">
                        Discover the
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-rose-500 to-blue-600">
                            Heart of Jordan
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
                        An expertly crafted 8-day journey through ancient wonders, desert landscapes, and the healing waters of the Dead Sea.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-slate-700">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-amber-600" />
                            <span className="font-medium">8 Days / 7 Nights</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-amber-600" />
                            <span className="font-medium">Amman • Petra • Wadi Rum • Dead Sea</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Users className="w-5 h-5 text-amber-600" />
                            <span className="font-medium">2 Travelers</span>
                        </div>
                    </div>

                    {/* scroll cue */}
                    <div className="mt-14 animate-bounce">
                        <ChevronDown className="w-6 h-6 text-amber-600/60 mx-auto" />
                    </div>
                </div>
            </section>

            {/* ============================================================ */}
            {/*  ITINERARY TIMELINE                                          */}
            {/* ============================================================ */}
            <section className="py-24 px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-20">
                        <p className="text-amber-600 font-semibold uppercase tracking-widest text-sm mb-3">Your Journey</p>
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Day-by-Day Itinerary</h2>
                        <p className="text-lg text-slate-500 max-w-xl mx-auto">
                            Every moment carefully planned for an unforgettable experience
                        </p>
                    </div>

                    <div className="space-y-0">
                        {itinerary.map((day, idx) => {
                            const c = colorMap[day.color]
                            const Icon = day.icon
                            const isLast = idx === itinerary.length - 1

                            return (
                                <div key={day.day} className="relative flex gap-6 md:gap-10">
                                    {/* timeline spine */}
                                    <div className="flex flex-col items-center">
                                        <div
                                            className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl ${c.bg} text-white flex items-center justify-center shadow-lg shadow-${day.color}-500/25 flex-shrink-0 z-10`}
                                        >
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        {!isLast && (
                                            <div className="w-0.5 flex-1 bg-gradient-to-b from-slate-300 to-slate-200 my-2" />
                                        )}
                                    </div>

                                    {/* card */}
                                    <div className={`flex-1 pb-12 ${isLast ? "pb-0" : ""}`}>
                                        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 group">
                                            {/* image banner */}
                                            {day.image && (
                                                <div className="relative h-48 md:h-56 overflow-hidden">
                                                    <Image
                                                        src={day.image}
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
                                                            Day {day.day}
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
                                                            Overnight: {day.overnight}
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

            {/* ============================================================ */}
            {/*  HOTELS & PRICING                                            */}
            {/* ============================================================ */}
            <section className="py-24 px-4 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <p className="text-amber-400 font-semibold uppercase tracking-widest text-sm mb-3">Choose Your Style</p>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Hotels & Pricing</h2>
                        <p className="text-lg text-blue-200 max-w-xl mx-auto">
                            Select between comfortable 4-star or premium 5-star accommodations
                        </p>
                    </div>

                    {/* Tabs */}
                    <div className="flex justify-center mb-12">
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-1.5 inline-flex gap-1">
                            <button
                                onClick={() => setActiveTab("4star")}
                                className={`px-8 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${activeTab === "4star"
                                    ? "bg-amber-500 text-white shadow-lg shadow-amber-500/30"
                                    : "text-white/70 hover:text-white hover:bg-white/10"
                                    }`}
                            >
                                ★★★★ Comfort
                            </button>
                            <button
                                onClick={() => setActiveTab("5star")}
                                className={`px-8 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${activeTab === "5star"
                                    ? "bg-amber-500 text-white shadow-lg shadow-amber-500/30"
                                    : "text-white/70 hover:text-white hover:bg-white/10"
                                    }`}
                            >
                                ★★★★★ Premium
                            </button>
                        </div>
                    </div>

                    {/* Pricing Card */}
                    <div className="max-w-3xl mx-auto">
                        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-amber-400/50">
                            {/* header */}
                            <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 p-8 text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3" />
                                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/3" />
                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <h3 className="text-2xl md:text-3xl font-bold">
                                                {activeTab === "4star" ? "4-Star Comfort Package" : "5-Star Premium Package"}
                                            </h3>
                                            <p className="text-amber-100 mt-1">8 Days / 7 Nights • 2 Travelers</p>
                                        </div>
                                        <div className="hidden md:block bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 text-center">
                                            <p className="text-xs text-amber-100">Per Person</p>
                                            <p className="text-3xl font-extrabold">
                                                ${activeTab === "4star" ? "1,080" : "1,280"}
                                            </p>
                                        </div>
                                    </div>
                                    {/* mobile price */}
                                    <div className="md:hidden mt-4 bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 text-center">
                                        <p className="text-xs text-amber-100">Price Per Person (sharing DBL/TWN)</p>
                                        <p className="text-4xl font-extrabold mt-1">
                                            ${activeTab === "4star" ? "1,080" : "1,280"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* hotels table */}
                            <div className="p-6 md:p-8">
                                <h4 className="font-bold text-slate-900 text-lg mb-5 flex items-center gap-2">
                                    <Building2 className="w-5 h-5 text-amber-600" />
                                    Your Accommodations
                                </h4>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b-2 border-slate-200">
                                                <th className="text-left py-3 px-2 text-slate-500 font-semibold uppercase tracking-wider text-xs">Location</th>
                                                <th className="text-left py-3 px-2 text-slate-500 font-semibold uppercase tracking-wider text-xs">Hotel</th>
                                                <th className="text-center py-3 px-2 text-slate-500 font-semibold uppercase tracking-wider text-xs">Nights</th>
                                                <th className="text-center py-3 px-2 text-slate-500 font-semibold uppercase tracking-wider text-xs">Meals</th>
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

                                <p className="text-xs text-slate-400 mt-4 italic">* Hotels are subject to availability. Similar category alternatives may be provided.</p>

                                {/* Price summary */}
                                <div className="mt-8 p-5 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-slate-500 font-medium">Price per person (sharing DBL/TWN)</p>
                                            <p className="text-sm text-slate-400">For 2 passengers with private car</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-3xl md:text-4xl font-extrabold text-slate-900">
                                                ${activeTab === "4star" ? "1,080" : "1,280"}
                                            </p>
                                            <p className="text-xs text-slate-500">USD per person</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================================ */}
            {/*  INCLUDED / EXCLUDED                                         */}
            {/* ============================================================ */}
            <section className="py-24 px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <p className="text-amber-600 font-semibold uppercase tracking-widest text-sm mb-3">Package Details</p>
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">What's Included</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Included */}
                        <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-3xl p-8 shadow-lg border border-emerald-100">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-600/20">
                                    <Check className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900">Included</h3>
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

                        {/* Excluded */}
                        <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl p-8 shadow-lg border border-slate-200">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-12 h-12 bg-slate-600 rounded-2xl flex items-center justify-center shadow-lg shadow-slate-600/20">
                                    <X className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900">Not Included</h3>
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

            {/* ============================================================ */}
            {/*  CTA SECTION                                                 */}
            {/* ============================================================ */}
            <section className="py-20 px-4 bg-gradient-to-r from-amber-600 via-amber-500 to-orange-500 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/3" />
                <div className="absolute bottom-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl translate-y-1/2 translate-x-1/3" />
                <div className="max-w-3xl mx-auto text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Book This Journey?</h2>
                    <p className="text-xl text-white/90 mb-10 leading-relaxed">
                        Secure your spot on this incredible 8-day Jordan adventure. Contact us to finalize your reservation.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild size="lg" className="text-lg px-10 py-7 bg-white text-amber-700 hover:bg-amber-50 font-bold shadow-xl shadow-black/10 rounded-xl">
                            <Link href="/contact">Contact Us to Book</Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="text-lg px-10 py-7 border-2 border-white/40 text-white hover:bg-white/10 bg-transparent font-bold rounded-xl">
                            <Link href="https://wa.me/962776615785" target="_blank">WhatsApp Us</Link>
                        </Button>
                    </div>
                    <p className="text-sm text-white/70 mt-8">Available 24/7 via WhatsApp or email</p>
                </div>
            </section>
        </div>
    )
}

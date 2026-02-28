"use client"

import { Sparkles, ArrowRight, Shield, Clock, MapPin } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import BubbleButton from "@/components/bubble-button"
import { useTranslations } from "@/lib/i18n/language-context"

export default function SecondaryHero() {
    const t = useTranslations()
    return (
        <section className="py-16 md:py-24 relative overflow-hidden">
            {/* Background with amber gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-orange-50 -z-20" />

            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-30">
                <div className="absolute top-[-10%] left-[-5%] w-[30%] h-[30%] rounded-full bg-amber-200 blur-3xl animate-blob"></div>
                <div className="absolute bottom-[-10%] right-[-5%] w-[30%] h-[30%] rounded-full bg-orange-200 blur-3xl animate-blob animation-delay-2000"></div>
                <div className="absolute top-[40%] left-[60%] w-[20%] h-[20%] rounded-full bg-yellow-200 blur-3xl animate-blob animation-delay-4000"></div>
            </div>

            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-sm border border-amber-200 rounded-full px-4 py-1.5 mb-6 text-amber-800 text-sm font-medium shadow-sm"
                    >
                        <Sparkles className="w-4 h-4 text-amber-500" />
                        <span>{t.secondaryHero.badge}</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight"
                    >
                        {t.secondaryHero.title} <span className="text-amber-600">{t.secondaryHero.titleHighlight}</span>,
                        <br />
                        {t.secondaryHero.titleEnd}
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto"
                    >
                        {t.secondaryHero.subtitle}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mb-10"
                    >
                        <div className="bg-white p-6 rounded-xl shadow-lg border border-amber-100/50 hover:shadow-xl transition-shadow">
                            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4 text-amber-600">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-lg mb-2 text-gray-900">{t.secondaryHero.seamlessTransfers}</h3>
                            <p className="text-gray-600">{t.secondaryHero.seamlessTransfersDesc}</p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-lg border border-amber-100/50 hover:shadow-xl transition-shadow">
                            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4 text-amber-600">
                                <Shield className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-lg mb-2 text-gray-900">{t.secondaryHero.fullProtection}</h3>
                            <p className="text-gray-600">{t.secondaryHero.fullProtectionDesc}</p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-lg border border-amber-100/50 hover:shadow-xl transition-shadow">
                            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4 text-amber-600">
                                <Clock className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-lg mb-2 text-gray-900">{t.secondaryHero.support247}</h3>
                            <p className="text-gray-600">{t.secondaryHero.support247Desc}</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                    >
                        <Link href="/book-now">
                            <BubbleButton className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-6 text-lg shadow-lg shadow-amber-500/30">
                                {t.secondaryHero.startJourney} <ArrowRight className="ml-2 w-5 h-5" />
                            </BubbleButton>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

"use client"

import React, { useState, useEffect, useRef } from "react"
import { 
  ShieldCheck, 
  Lock, 
  Plane, 
  Calendar, 
  Users, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Download, 
  Sparkles,
  Info,
  LogOut,
  Languages,
  Wifi,
  Car,
  DollarSign,
  Check
} from "lucide-react"

const REQUIRED_PIN = "1210"

export default function FabiolaClientPage() {
  const [pin, setPin] = useState<string>("")
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [errorMsg, setErrorMsg] = useState<string>("")
  const [shake, setShake] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Check if session is already authenticated
    const saved = typeof window !== "undefined" ? sessionStorage.getItem("fabiola_heli_auth_1210") : null
    if (saved === "true") {
      setIsAuthenticated(true)
    } else {
      inputRef.current?.focus()
    }
  }, [])

  const handlePinDigit = (digit: string) => {
    if (pin.length < 4) {
      const nextPin = pin + digit
      setPin(nextPin)
      setErrorMsg("")

      if (nextPin.length === 4) {
        verifyPin(nextPin)
      }
    }
  }

  const handleBackspace = () => {
    setPin((prev) => prev.slice(0, -1))
    setErrorMsg("")
  }

  const handleClear = () => {
    setPin("")
    setErrorMsg("")
  }

  const verifyPin = (candidatePin: string) => {
    if (candidatePin === REQUIRED_PIN) {
      setIsAuthenticated(true)
      if (typeof window !== "undefined") {
        sessionStorage.setItem("fabiola_heli_auth_1210", "true")
      }
    } else {
      setShake(true)
      setErrorMsg("Incorrect PIN. Please try again.")
      setTimeout(() => {
        setShake(false)
        setPin("")
        inputRef.current?.focus()
      }, 700)
    }
  }

  const handleLock = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("fabiola_heli_auth_1210")
    }
    setIsAuthenticated(false)
    setPin("")
    setErrorMsg("")
    setTimeout(() => {
      inputRef.current?.focus()
    }, 100)
  }

  // If not authenticated, render PIN entry modal / screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#08120c] flex items-center justify-center p-4 relative overflow-hidden text-slate-100">
        {/* Subtle Luxury Ambient Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-600/15 rounded-full blur-[140px]" />
        </div>

        <div className={`relative z-10 w-full max-w-md bg-[#122219]/90 border border-[#d4b877]/30 rounded-3xl p-8 backdrop-blur-xl shadow-2xl transition-transform ${shake ? "animate-shake" : ""}`}>
          <div className="text-center space-y-3 mb-8">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#d4b877]/20 to-emerald-900/40 rounded-2xl border border-[#d4b877]/40 flex items-center justify-center shadow-inner">
              <Lock className="w-8 h-8 text-[#d4b877]" />
            </div>
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d4b877]/10 border border-[#d4b877]/30 text-[#d4b877] text-xs font-semibold tracking-wider uppercase">
              <ShieldCheck className="w-3.5 h-3.5" />
              VIP Access Portal
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-white font-serif">
              Helicopter Jordan
            </h1>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              Please enter your 4-digit security PIN to access the flight reservation and Apple Wallet passes for <span className="text-[#ddc98d] font-semibold">Fabiola Vazquez</span>.
            </p>
          </div>

          {/* Hidden real input for mobile keyboard / accessibility */}
          <input
            ref={inputRef}
            type="password"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={4}
            value={pin}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "")
              if (val.length <= 4) {
                setPin(val)
                setErrorMsg("")
                if (val.length === 4) verifyPin(val)
              }
            }}
            className="opacity-0 absolute inset-0 pointer-events-none"
            aria-label="4 digit PIN"
          />

          {/* 4 Digit Indicators */}
          <div 
            onClick={() => inputRef.current?.focus()} 
            className="flex justify-center items-center gap-4 mb-6 cursor-pointer"
          >
            {[0, 1, 2, 3].map((index) => {
              const filled = pin.length > index
              return (
                <div
                  key={index}
                  className={`w-13 h-14 rounded-2xl flex items-center justify-center text-xl font-bold transition-all duration-200 border ${
                    filled
                      ? "border-[#d4b877] bg-[#d4b877]/20 text-[#ddc98d] shadow-[0_0_15px_rgba(212,184,119,0.3)]"
                      : "border-emerald-800/60 bg-emerald-950/40 text-slate-500"
                  }`}
                >
                  {filled ? "●" : ""}
                </div>
              )
            })}
          </div>

          {/* Error message */}
          {errorMsg ? (
            <div className="text-rose-400 text-xs font-medium text-center mb-6 animate-fade-in bg-rose-950/40 border border-rose-800/50 py-2 rounded-xl">
              {errorMsg}
            </div>
          ) : (
            <div className="text-slate-500 text-xs text-center mb-6 h-8 flex items-center justify-center">
              Enter 4-digit PIN
            </div>
          )}

          {/* On-Screen Numeric Keypad */}
          <div className="grid grid-cols-3 gap-3 max-w-[280px] mx-auto">
            {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((digit) => (
              <button
                key={digit}
                type="button"
                onClick={() => handlePinDigit(digit)}
                className="h-14 rounded-2xl bg-white/5 hover:bg-white/10 active:scale-95 border border-white/10 text-lg font-semibold text-white transition-all duration-150 flex items-center justify-center"
              >
                {digit}
              </button>
            ))}
            <button
              type="button"
              onClick={handleClear}
              className="h-14 rounded-2xl bg-white/5 hover:bg-white/10 active:scale-95 border border-white/10 text-xs font-semibold text-slate-400 transition-all duration-150 flex items-center justify-center"
            >
              CLEAR
            </button>
            <button
              type="button"
              onClick={() => handlePinDigit("0")}
              className="h-14 rounded-2xl bg-white/5 hover:bg-white/10 active:scale-95 border border-white/10 text-lg font-semibold text-white transition-all duration-150 flex items-center justify-center"
            >
              0
            </button>
            <button
              type="button"
              onClick={handleBackspace}
              className="h-14 rounded-2xl bg-white/5 hover:bg-white/10 active:scale-95 border border-white/10 text-sm font-semibold text-slate-400 transition-all duration-150 flex items-center justify-center"
            >
              ⌫
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Authenticated State: Full VIP Helicopter Pass Portal
  return (
    <div className="min-h-screen bg-[#09140e] text-slate-100 font-sans pb-24 selection:bg-[#d4b877] selection:text-black">
      {/* Top VIP Bar */}
      <div className="border-b border-[#d4b877]/20 bg-[#0d1c14]/80 backdrop-blur-md sticky top-0 z-30 px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold tracking-wider text-[#d4b877] uppercase font-mono">
              Helicopter Jordan · VIP Flight Desk
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 hidden sm:inline">
              Guest: <strong className="text-white">Fabiola Vazquez</strong>
            </span>
            <button
              onClick={handleLock}
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Lock Pass
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 pt-10">
        {/* Main Flight Hero Header */}
        <div className="relative rounded-3xl overflow-hidden border border-[#d4b877]/30 bg-gradient-to-b from-[#162d22] to-[#0f1f17] p-8 md:p-12 shadow-2xl mb-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4b877]/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Confirmed Reservation
              </span>
              <span className="px-3 py-1 rounded-full bg-[#d4b877]/20 text-[#ddc98d] border border-[#d4b877]/30 text-xs font-mono font-medium">
                REF: HJ-AMM-PTR-20261012-FV3
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold">
                Flexible Date
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 text-slate-300 text-xs font-medium">
                3 Persons Reserved
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white font-serif leading-tight">
              Amman <span className="text-[#d4b877]">⇄</span> Petra
              <span className="block text-xl md:text-2xl font-light text-slate-300 mt-2 font-sans">
                Private Helicopter Return Flight for <strong className="text-white font-semibold">Fabiola Vazquez</strong>
              </span>
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed">
              Exclusive private return helicopter flight connecting Amman Heliport with the ancient wonder of Petra. Departing Amman at 13:00 PM with a 1-hour scenic aerial journey, 3 hours of ground leisure at Petra (14:00 – 17:00), and a 1-hour return flight to Amman at 17:00 PM. Includes complimentary Spanish translator and complimentary high-speed eSIMs.
            </p>
          </div>

          {/* Quick Stat Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-8 border-t border-[#d4b877]/20">
            <div className="bg-black/30 rounded-2xl p-4 border border-white/5">
              <div className="text-xs text-slate-400 uppercase font-mono flex items-center gap-1.5 mb-1">
                <Calendar className="w-3.5 h-3.5 text-[#d4b877]" />
                Date
              </div>
              <div className="text-sm font-bold text-white">12 OCT 2026</div>
              <div className="text-xs text-emerald-400 font-medium">Flexible Date</div>
            </div>

            <div className="bg-black/30 rounded-2xl p-4 border border-white/5">
              <div className="text-xs text-slate-400 uppercase font-mono flex items-center gap-1.5 mb-1">
                <DollarSign className="w-3.5 h-3.5 text-[#d4b877]" />
                Charter Price
              </div>
              <div className="text-sm font-bold text-[#faf8f2]">$4,400 USD</div>
              <div className="text-xs text-slate-400">Total for 3 Persons</div>
            </div>

            <div className="bg-black/30 rounded-2xl p-4 border border-white/5">
              <div className="text-xs text-slate-400 uppercase font-mono flex items-center gap-1.5 mb-1">
                <Clock className="w-3.5 h-3.5 text-[#d4b877]" />
                Flight Time
              </div>
              <div className="text-sm font-bold text-white">1 Hour / leg</div>
              <div className="text-xs text-slate-400">13:00 Dep · 17:00 Ret</div>
            </div>

            <div className="bg-black/30 rounded-2xl p-4 border border-white/5">
              <div className="text-xs text-slate-400 uppercase font-mono flex items-center gap-1.5 mb-1">
                <MapPin className="w-3.5 h-3.5 text-[#d4b877]" />
                Petra Ground Time
              </div>
              <div className="text-sm font-bold text-white">3 Hours Free Time</div>
              <div className="text-xs text-slate-400">Spanish Guide Included</div>
            </div>
          </div>
        </div>

        {/* Highlighted VIP Inclusions & Services Cards */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-[#d4b877]" />
            <h2 className="text-xl font-bold text-white font-serif">
              VIP Package Inclusions & Services
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Spanish Translator */}
            <div className="bg-[#122219] border border-[#d4b877]/30 rounded-2xl p-5 relative overflow-hidden group hover:border-[#d4b877]/60 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#d4b877]/15 border border-[#d4b877]/30 flex items-center justify-center text-[#d4b877]">
                  <Languages className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold uppercase tracking-wider">
                  Complimentary
                </span>
              </div>
              <h3 className="text-sm font-bold text-white mb-1">
                Spanish Translator in Petra
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Dedicated private Spanish-speaking translator and guide accompanying your party during your 3-hour exploration in Petra.
              </p>
            </div>

            {/* Complimentary eSIM */}
            <div className="bg-[#122219] border border-[#d4b877]/30 rounded-2xl p-5 relative overflow-hidden group hover:border-[#d4b877]/60 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#d4b877]/15 border border-[#d4b877]/30 flex items-center justify-center text-[#d4b877]">
                  <Wifi className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold uppercase tracking-wider">
                  Complimentary
                </span>
              </div>
              <h3 className="text-sm font-bold text-white mb-1">
                High-Speed Jordan eSIM
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Instant high-speed 5G/4G connectivity for all 3 passengers. QR codes provided for instant activation on iPhone or Android.
              </p>
            </div>

            {/* Golf Cart in Petra */}
            <div className="bg-[#122219] border border-[#d4b877]/30 rounded-2xl p-5 relative overflow-hidden group hover:border-[#d4b877]/60 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#d4b877]/15 border border-[#d4b877]/30 flex items-center justify-center text-[#d4b877]">
                  <Car className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#d4b877]/20 text-[#ddc98d] border border-[#d4b877]/30 text-[10px] font-bold uppercase tracking-wider font-mono">
                  25 JOD
                </span>
              </div>
              <h3 className="text-sm font-bold text-white mb-1">
                Petra Golf Cart Service
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Electric golf cart transit through the Siq directly to the Treasury and back for comfortable exploration (25 JOD on-site).
              </p>
            </div>
          </div>
        </div>

        {/* Apple Wallet Downloads & Interactive Pass Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Left Column: Download Actions & Sector Selectors */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-[#122219] border border-[#d4b877]/30 rounded-3xl p-6 sm:p-8 shadow-xl">
              <div className="flex items-center gap-2 mb-2 text-[#d4b877] text-xs font-semibold tracking-wider uppercase font-mono">
                <Sparkles className="w-4 h-4" />
                Apple Wallet Passes (.pkpass)
              </div>
              <h2 className="text-2xl font-bold text-white mb-3 font-serif">
                Add to Apple Wallet
              </h2>
              <p className="text-xs text-slate-300 mb-6 leading-relaxed">
                Tapping the buttons below on an iPhone will immediately open the official Apple Wallet confirmation sheet with live lock screen departure updates.
              </p>

              {/* Master Return Flight Pass CTA */}
              <a
                href="/passes/Fabiola-Vazquez-Helicopter-Amman-Petra-RoundTrip.pkpass"
                download="Fabiola-Vazquez-Helicopter-Amman-Petra-RoundTrip.pkpass"
                className="w-full flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#d4b877] via-[#c6a860] to-[#b8984e] text-slate-950 font-bold hover:brightness-105 active:scale-[0.99] transition-all shadow-lg shadow-amber-900/20 group mb-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-black/15 flex items-center justify-center">
                    <Download className="w-5 h-5 text-slate-950" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm sm:text-base font-extrabold tracking-tight">
                      Add Complete Return Pass to Apple Wallet
                    </div>
                    <div className="text-xs font-medium text-slate-800">
                      Amman ⇄ Petra · 13:00 Dep · $4,400 USD (3 Persons)
                    </div>
                  </div>
                </div>
                <span className="text-xl group-hover:translate-x-0.5 transition-transform"><b>+</b></span>
              </a>

              {/* Individual Leg Passes */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="text-xs font-semibold text-slate-400 uppercase font-mono">
                  Individual Sector Boarding Passes:
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href="/passes/Fabiola-Vazquez-Leg1-Amman-to-Petra.pkpass"
                    download="Fabiola-Vazquez-Leg1-Amman-to-Petra.pkpass"
                    className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-[#d4b877]/30 text-xs font-semibold text-slate-200 transition-colors group"
                  >
                    <div>
                      <div className="text-white font-bold flex items-center gap-1.5">
                        <Plane className="w-3.5 h-3.5 text-[#d4b877]" />
                        Leg 1: AMM → PTR
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Dep 13:00 · Arr 14:00 (1h)
                      </div>
                    </div>
                    <Download className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                  </a>

                  <a
                    href="/passes/Fabiola-Vazquez-Leg2-Petra-to-Amman.pkpass"
                    download="Fabiola-Vazquez-Leg2-Petra-to-Amman.pkpass"
                    className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-[#d4b877]/30 text-xs font-semibold text-slate-200 transition-colors group"
                  >
                    <div>
                      <div className="text-white font-bold flex items-center gap-1.5">
                        <Plane className="w-3.5 h-3.5 text-[#d4b877] rotate-180" />
                        Leg 2: PTR → AMM
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Dep 17:00 · Arr 18:00 (1h)
                      </div>
                    </div>
                    <Download className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                  </a>
                </div>
              </div>
            </div>

            {/* Flight Itinerary Timeline */}
            <div className="bg-[#122219]/70 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white font-serif">
                  Flight Schedule & Itinerary
                </h3>
                <span className="text-xs text-[#d4b877] font-mono">
                  12 OCTOBER 2026 (FLEXIBLE)
                </span>
              </div>

              <div className="space-y-6 relative before:absolute before:inset-y-0 before:left-3 before:w-0.5 before:bg-[#d4b877]/20">
                {/* 12:30 PM */}
                <div className="relative flex items-start gap-4 pl-8">
                  <div className="absolute left-1.5 top-1.5 w-3.5 h-3.5 rounded-full bg-[#d4b877] ring-4 ring-[#122219]" />
                  <div>
                    <div className="text-xs font-mono text-[#d4b877]">12:30 PM</div>
                    <div className="text-sm font-bold text-white">VIP Arrival & Heliport Lounge Check-in</div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      Amman Heliport VIP Terminal. Welcome refreshments, manifest verification, and pre-flight captain briefing.
                    </div>
                  </div>
                </div>

                {/* 13:00 PM – 14:00 PM */}
                <div className="relative flex items-start gap-4 pl-8">
                  <div className="absolute left-1.5 top-1.5 w-3.5 h-3.5 rounded-full bg-emerald-400 ring-4 ring-[#122219]" />
                  <div>
                    <div className="text-xs font-mono text-emerald-400">13:00 PM – 14:00 PM (1 Hour Flight)</div>
                    <div className="text-sm font-bold text-white">Outbound Flight: AMM → PTR (HJ 201)</div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      Low-altitude scenic routing over the Great Rift Valley, Dead Sea cliffs, and Dana Biosphere Reserve. Touchdown at Petra Helipad at 14:00 PM.
                    </div>
                  </div>
                </div>

                {/* 14:00 PM – 17:00 PM */}
                <div className="relative flex items-start gap-4 pl-8">
                  <div className="absolute left-1.5 top-1.5 w-3.5 h-3.5 rounded-full bg-amber-400 ring-4 ring-[#122219]" />
                  <div>
                    <div className="text-xs font-mono text-amber-400">14:00 PM – 17:00 PM (3 Hours Free Time)</div>
                    <div className="text-sm font-bold text-white">Petra Ancient City Leisure & Excursion</div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      3 full hours exploring Al-Khazneh (The Treasury) and the Siq. Accompanied by your <strong className="text-white">complimentary Spanish translator</strong>. Optional electric golf cart service available on-site for 25 JOD.
                    </div>
                  </div>
                </div>

                {/* 17:00 PM – 18:00 PM */}
                <div className="relative flex items-start gap-4 pl-8">
                  <div className="absolute left-1.5 top-1.5 w-3.5 h-3.5 rounded-full bg-emerald-400 ring-4 ring-[#122219]" />
                  <div>
                    <div className="text-xs font-mono text-emerald-400">17:00 PM – 18:00 PM (1 Hour Flight)</div>
                    <div className="text-sm font-bold text-white">Return Flight: PTR → AMM (HJ 202)</div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      Late afternoon return takeoff from Petra Helipad, arriving at Amman Heliport at 18:00 PM.
                    </div>
                  </div>
                </div>

                {/* 18:00 PM */}
                <div className="relative flex items-start gap-4 pl-8">
                  <div className="absolute left-1.5 top-1.5 w-3.5 h-3.5 rounded-full bg-[#d4b877] ring-4 ring-[#122219]" />
                  <div>
                    <div className="text-xs font-mono text-[#d4b877]">18:00 PM</div>
                    <div className="text-sm font-bold text-white">Sunset Touchdown in Amman & VIP Reception</div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      Arrival at Amman Heliport VIP Terminal. Ground transfer assistance.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Stylized Apple Pass Visual Preview Card */}
          <div className="lg:col-span-5">
            <div className="sticky top-20 space-y-4">
              <div className="text-xs font-semibold text-slate-400 uppercase font-mono tracking-wider flex items-center justify-between">
                <span>Pass Preview</span>
                <span className="text-[#d4b877]">Apple Wallet Ready</span>
              </div>

              {/* Realistic Pass Layout */}
              <div className="w-full bg-[#172c22] border border-[#d4b877]/40 rounded-3xl shadow-2xl overflow-hidden font-sans">
                {/* Pass Header */}
                <div className="bg-[#122219] p-4 px-6 border-b border-[#d4b877]/20 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#d4b877]/20 border border-[#d4b877]/40 flex items-center justify-center font-bold text-xs text-[#d4b877]">
                      HJ
                    </div>
                    <span className="text-[11px] font-bold tracking-widest text-[#f8f4ea] uppercase">
                      HELICOPTER JORDAN
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-[9px] uppercase tracking-wider text-[#d4b877] font-mono">CHARTER RATE</div>
                    <div className="text-xs font-bold text-white font-mono">$4,400 USD</div>
                  </div>
                </div>

                {/* Pass Banner Graphic */}
                <div className="h-32 bg-[#0c1712] relative overflow-hidden flex items-end p-5">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#172c22] via-[#172c22]/40 to-transparent z-10" />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-600/20 via-emerald-950/60 to-[#172c22]" />
                  <div className="relative z-20">
                    <div className="text-[10px] uppercase font-bold tracking-widest text-[#d4b877]">
                      PRIVATE ROUND TRIP
                    </div>
                    <div className="text-2xl font-black text-white tracking-tight">
                      AMM <span className="text-[#d4b877]">⇄</span> PTR
                    </div>
                  </div>
                </div>

                {/* Pass Primary & Secondary Details */}
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4 pb-4 border-b border-white/10">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-[#c6b275] font-semibold">
                        LEAD PASSENGER
                      </div>
                      <div className="text-sm font-bold text-[#faf8f2] mt-0.5 truncate">
                        Fabiola Vazquez
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-[#c6b275] font-semibold">
                        SEATS RESERVED
                      </div>
                      <div className="text-sm font-bold text-[#faf8f2] mt-0.5">
                        3 Persons
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pb-4 border-b border-white/10 text-xs">
                    <div>
                      <div className="text-[9px] uppercase tracking-wider text-[#c6b275] font-semibold">
                        DATE
                      </div>
                      <div className="font-bold text-white mt-0.5">12 OCT (Flex)</div>
                    </div>
                    <div>
                      <div className="text-[9px] uppercase tracking-wider text-[#c6b275] font-semibold">
                        DEPARTURE
                      </div>
                      <div className="font-bold text-white mt-0.5">13:00 PM</div>
                    </div>
                    <div>
                      <div className="text-[9px] uppercase tracking-wider text-[#c6b275] font-semibold">
                        RETURN
                      </div>
                      <div className="font-bold text-white mt-0.5">17:00 PM</div>
                    </div>
                  </div>

                  {/* Included Perks Summary */}
                  <div className="p-3 rounded-xl bg-black/25 border border-white/5 space-y-1.5 text-[11px]">
                    <div className="flex items-center gap-2 text-emerald-300 font-medium">
                      <Check className="w-3.5 h-3.5 text-[#d4b877]" />
                      <span>Spanish Translator in Petra (Complimentary)</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-300 font-medium">
                      <Check className="w-3.5 h-3.5 text-[#d4b877]" />
                      <span>High-Speed Jordan eSIM (Complimentary)</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300 font-medium">
                      <Check className="w-3.5 h-3.5 text-[#d4b877]" />
                      <span>Petra Golf Cart Service (25 JOD)</span>
                    </div>
                  </div>

                  {/* QR Code Barcode Representation */}
                  <div className="bg-white rounded-2xl p-4 text-center space-y-2">
                    <div className="flex justify-center">
                      <div className="w-40 h-40 border border-slate-200 rounded-xl p-2 flex flex-col items-center justify-center bg-white shadow-inner">
                        <img 
                          src="/images/fabiola-qr.svg" 
                          alt="VIP Flight QR Code" 
                          className="w-36 h-36 object-contain"
                        />
                      </div>
                    </div>
                    <div className="font-mono text-[10px] text-slate-700 font-bold tracking-wider">
                      HJ 204 · 13:00 DEP · 17:00 RET · $4,400
                    </div>
                    <div className="text-[9px] text-slate-400 font-medium">
                      Scan to view verified VIP flight reservation
                    </div>
                  </div>
                </div>

                {/* Pass Footer */}
                <div className="bg-[#122219] p-3 text-center border-t border-[#d4b877]/20">
                  <span className="text-[10px] text-slate-400 font-mono">
                    Signed & Verified by Apple PassKit · Helicopter Jordan
                  </span>
                </div>
              </div>

              {/* Passenger Manifest Notes */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-300 space-y-2">
                <div className="font-semibold text-white flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-[#d4b877]" />
                  Important Passenger Information
                </div>
                <ul className="space-y-1 text-slate-400 list-disc list-inside text-[11px]">
                  <li>Valid photo ID or passport is required for each passenger.</li>
                  <li>Complimentary baggage storage available at Amman Heliport.</li>
                  <li>Schedule is flexible; adjustments can be requested with your flight coordinator.</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

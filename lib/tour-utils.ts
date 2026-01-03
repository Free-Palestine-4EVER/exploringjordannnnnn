import type { Tour, SeasonPricing, PricingTiers } from "./types/tour"
import toursData from "@/data/tours.json"

export function getAllTours(): Tour[] {
  return toursData as Tour[]
}

export function getTourBySlug(slug: string): Tour | undefined {
  return getAllTours().find((tour) => tour.slug === slug)
}

export function getCurrentSeason(date: Date, seasonPricing: SeasonPricing[]): SeasonPricing | null {
  const dateStr = date.toISOString().split("T")[0]

  for (const season of seasonPricing) {
    for (const range of season.ranges) {
      const [start, end] = range.split("..")
      if (dateStr >= start && dateStr <= end) {
        return season
      }
    }
  }

  return null
}

export function getPaxTier(pax: number): keyof PricingTiers {
  if (pax === 2) return "2pax"
  if (pax >= 3 && pax <= 5) return "3to5"
  if (pax >= 6 && pax <= 7) return "6to7"
  if (pax >= 8 && pax <= 9) return "8to9"
  if (pax >= 10 && pax <= 14) return "10to14"
  return "10to14" // default for 15+
}

export function calculateTourPrice(
  tour: Tour,
  startDate: Date,
  pax: number,
  hotelClass: "5*" | "4*" | "3*",
  selectedAddons: string[] = [],
  needsSingleSupplement = false,
): {
  basePrice: number
  addonsPrice: number
  singleSupplement: number
  totalPrice: number
  pricePerPerson: number
  season: string
} {
  const season = getCurrentSeason(startDate, tour.seasonPricing)
  if (!season) {
    throw new Error("Date is outside available season ranges")
  }

  const paxTier = getPaxTier(pax)
  const basePricePerPerson = season.ppUsd[paxTier]
  const basePrice = basePricePerPerson * pax

  // Calculate addons
  let addonsPrice = 0
  for (const addonCode of selectedAddons) {
    const addon = tour.addons.find((a) => a.code === addonCode)
    if (addon) {
      addonsPrice += addon.per === "person" ? addon.priceUsd * pax : addon.priceUsd
    }
  }

  // Single supplement
  const singleSupplement = needsSingleSupplement ? season.ppUsd.singleSupp : 0

  const totalPrice = basePrice + addonsPrice + singleSupplement
  const pricePerPerson = totalPrice / pax

  return {
    basePrice,
    addonsPrice,
    singleSupplement,
    totalPrice,
    pricePerPerson,
    season: season.season,
  }
}

export function getMinPrice(tour: Tour, hotelClass: "5*" | "4*" | "3*" = "4*"): number {
  // Get the lowest price from all seasons for 6-7 pax (most common group size)
  const prices = tour.seasonPricing.map((season) => season.ppUsd["6to7"])
  const basePrice = Math.min(...prices)

  // Apply hotel class modifiers
  const modifiers = {
    "5*": 1.2, // 20% premium for 5-star
    "4*": 1.0, // Base price for 4-star
    "3*": 0.85, // 15% discount for 3-star
  }

  return Math.round(basePrice * modifiers[hotelClass])
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export function getTourReviews(slug: string): number {
  // Simple hash function to generate a consistent number based on the slug
  let hash = 0
  for (let i = 0; i < slug.length; i++) {
    const char = slug.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32bit integer
  }

  // Normalize to range 843 - 1238
  const min = 843
  const max = 1238
  const range = max - min

  const absHash = Math.abs(hash)
  return min + (absHash % range)
}

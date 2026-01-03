export interface Tour {
  id: string
  slug: string
  title: string
  tagline: string
  duration: {
    days: number
    nights: number
  }
  heroImage: string
  highlights: string[]
  route: string[]
  dailyPlan: DailyPlan[]
  inclusions: string[]
  exclusions: string[]
  hotelOptions: HotelOption[]
  seasonPricing: SeasonPricing[]
  addons: Addon[]
}

export interface DailyPlan {
  day: number
  title: string
  body: string
  activities?: string[]
  meals?: string[]
}

export interface HotelOption {
  class: "5*" | "4*" | "3*"
  am: string[] // Amman hotels
  pe: string[] // Petra hotels
  wr: string[] // Wadi Rum camps
  ds: string[] // Dead Sea hotels
}

export interface SeasonPricing {
  season: "Low" | "High"
  ranges: string[] // e.g., ["2026-01-08..2026-02-28"]
  ppUsd: PricingTiers
}

export interface PricingTiers {
  "2pax": number
  "3to5": number
  "6to7": number
  "8to9": number
  "10to14": number
  singleSupp: number
}

export interface Addon {
  code: string
  label: string
  priceUsd: number
  per: "person" | "group"
}

export interface TripCustomization {
  tourId: string
  startDate: string
  pax: {
    adults: number
    children: number
  }
  hotelClass: "5*" | "4*" | "3*"
  arrivalFlight?: string
  arrivalTime?: string
  pickupLocation: string
  dietary?: string
  roomingNotes?: string
  selectedAddons: string[]
  dailyEdits?: Record<number, string>
  contactInfo: {
    name: string
    email: string
    phone: string
    whatsapp?: string
    notes?: string
  }
}

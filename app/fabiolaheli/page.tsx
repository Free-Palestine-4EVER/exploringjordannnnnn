import type { Metadata } from "next"
import FabiolaClientPage from "./fabiolaClientPage"

export const metadata: Metadata = {
  title: "Helicopter Jordan · Fabiola Vazquez Flight Pass | Jordan Explorer",
  description: "Private Helicopter Flight Reservation & Apple Wallet Passes for Fabiola Vazquez (Amman ⇄ Petra Return Flight).",
  robots: "noindex, nofollow",
}

export default function FabiolaHeliPage() {
  return <FabiolaClientPage />
}

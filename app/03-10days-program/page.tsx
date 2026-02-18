import type { Metadata } from "next"
import ProgramClientPage from "./ProgramClientPage"

export const metadata: Metadata = {
  title: "8-Day Jordan Discovery Program | Exploring Jordan",
  description: "Experience an unforgettable 8-day journey through Jordan — Amman, Jerash, Petra, Wadi Rum & the Dead Sea.",
  robots: "noindex, nofollow",
}

export default function ProgramPage() {
  return <ProgramClientPage />
}

import type { Metadata } from "next"

import LeticiaClientPage from "./leticiaClientPage"

export const metadata: Metadata = {
  title: "Exclusive Jordan Offer | Jordan Explorer",
  description: "Your personalized 5-day Jordan adventure",
  robots: "noindex, nofollow",
}

export default function LeticiaPage() {
  return <LeticiaClientPage />
}

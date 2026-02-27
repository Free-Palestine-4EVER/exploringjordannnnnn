import type { Metadata } from "next"
import FaqClientPage from "./FaqClientPage"

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Jordan Explorer",
  description: "Find answers to common questions about tours, visas, booking, and travel to Jordan.",
}

export default function FAQPage() {
  return <FaqClientPage />
}

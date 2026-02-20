// Google Ads Conversion Tracking
// Your Google Ads ID: AW-17670467400

export const GA_ADS_ID = "AW-17670467400"

// Fire a conversion event
export const trackConversion = (conversionLabel: string, value?: number, currency?: string) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    ;(window as any).gtag("event", "conversion", {
      send_to: `${GA_ADS_ID}/${conversionLabel}`,
      ...(value && { value }),
      ...(currency && { currency }),
    })
  }
}

// Predefined conversion events
export const trackBookingSubmission = (totalPrice?: number) => {
  trackConversion("booking_submit", totalPrice, "USD")
  // Also fire a GA4 event for analytics
  if (typeof window !== "undefined" && (window as any).gtag) {
    ;(window as any).gtag("event", "generate_lead", {
      currency: "USD",
      value: totalPrice || 0,
    })
  }
}

export const trackContactSubmission = () => {
  trackConversion("contact_submit")
  if (typeof window !== "undefined" && (window as any).gtag) {
    ;(window as any).gtag("event", "generate_lead", {
      currency: "USD",
      value: 0,
    })
  }
}

export const trackPartnerInquiry = () => {
  trackConversion("partner_inquiry")
}

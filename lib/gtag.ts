// Google Ads Conversion Tracking
// Google Tag ID (installed on site): AW-17670467400
// Google Ads Conversion Account: AW-17966717422
// Conversion Label for "Submit lead form": AyujCMzAovwbEO6zmfdC

export const GA_TAG_ID = "AW-17670467400"
export const GA_ADS_CONVERSION_ID = "AW-17966717422"
export const CONVERSION_LABEL = "AyujCMzAovwbEO6zmfdC"

// Fire the Google Ads conversion event
export const trackConversion = (value?: number, currency?: string) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    ;(window as any).gtag("event", "conversion", {
      send_to: `${GA_ADS_CONVERSION_ID}/${CONVERSION_LABEL}`,
      value: value || 1.0,
      currency: currency || "USD",
    })
  }
}

// Predefined conversion events
export const trackBookingSubmission = (totalPrice?: number) => {
  trackConversion(totalPrice || 1.0, "USD")
  // Also fire a GA4 event for analytics
  if (typeof window !== "undefined" && (window as any).gtag) {
    ;(window as any).gtag("event", "generate_lead", {
      currency: "USD",
      value: totalPrice || 0,
    })
  }
}

export const trackContactSubmission = () => {
  trackConversion(1.0, "USD")
  if (typeof window !== "undefined" && (window as any).gtag) {
    ;(window as any).gtag("event", "generate_lead", {
      currency: "USD",
      value: 1.0,
    })
  }
}

export const trackPartnerInquiry = () => {
  trackConversion(1.0, "USD")
}

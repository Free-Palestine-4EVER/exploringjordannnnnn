import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import AnimatedBackgroundWrapper from "@/components/animated-background-wrapper"
import AnnouncementBar from "@/components/announcement-bar"
import Script from "next/script"
import { LanguageProvider } from "@/lib/i18n/language-context"
import WhatsAppButton from "@/components/whatsapp-button"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Jordan Explorer | Your Ultimate Jordan Travel Experience",
  description:
    "Discover the wonders of Jordan with our expertly crafted tour packages. From Petra to the Dead Sea, experience the best of Jordan with our all-inclusive travel services.",
  generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Script src="https://www.googletagmanager.com/gtag/js?id=AW-17670467400" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17670467400');
          `}
        </Script>
        <LanguageProvider>
          <AnimatedBackgroundWrapper />
          <AnnouncementBar />
          <Header />
          {children}
          <Footer />
          <WhatsAppButton />
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  )
}

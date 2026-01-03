"use client"

import dynamic from "next/dynamic"

// Dynamically import the AnimatedBackground component with no SSR
const AnimatedBackground = dynamic(() => import("@/components/animated-background"), { ssr: false })

export default function AnimatedBackgroundWrapper() {
  return <AnimatedBackground />
}

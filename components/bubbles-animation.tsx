"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface BubblesAnimationProps {
  isActive: boolean
  onComplete: () => void
}

interface Bubble {
  id: number
  size: number
  left: number
  delay: number
  duration: number
  swayAmount: number
}

export default function BubblesAnimation({ isActive, onComplete }: BubblesAnimationProps) {
  const [bubbles, setBubbles] = useState<Bubble[]>([])

  useEffect(() => {
    if (isActive) {
      // Reduced number of bubbles from 20 to 10
      const newBubbles = Array.from({ length: 10 }, (_, i) => ({
        id: i,
        size: Math.random() * 40 + 20, // Smaller size range: 20-60px (was 20-80px)
        left: Math.random() * 100, // 0-100%
        delay: Math.random() * 1, // Shorter delay: 0-1s (was 0-2s)
        duration: Math.random() * 2 + 3, // Shorter duration: 3-5s (was 4-8s)
        swayAmount: Math.random() * 60 - 30, // Less sway: -30 to 30px (was -50 to 50px)
      }))
      setBubbles(newBubbles)

      // Reset after the longest bubble animation completes
      const maxDuration = Math.max(...newBubbles.map((b) => b.duration + b.delay)) * 1000
      const timer = setTimeout(() => {
        if (onComplete) {
          onComplete()
        }
        setBubbles([])
      }, maxDuration + 300) // Reduced buffer time

      return () => clearTimeout(timer)
    }
  }, [isActive, onComplete]) // Added onComplete to dependencies to avoid lint warnings

  if (!isActive) return null

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="bubble"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: `${bubble.left}%`,
            bottom: -bubble.size,
            // Simplified bubble gradient
            background: "radial-gradient(circle at 70% 30%, white 5px, #60a5fa 8%, #3b82f6 60%)",
            boxShadow: "inset 0 0 10px 3px rgba(255, 255, 255, 0.3)",
            opacity: 0.7,
            position: "absolute",
            borderRadius: "50%",
            zIndex: 50,
          }}
          initial={{ y: 0, x: 0 }}
          animate={{
            y: `-100vh`,
            x: bubble.swayAmount,
          }}
          transition={{
            y: {
              duration: bubble.duration,
              delay: bubble.delay,
              ease: "easeOut",
            },
            x: {
              duration: bubble.duration * 0.8,
              delay: bubble.delay,
              type: "spring",
              stiffness: 8, // Reduced stiffness (was 10)
              damping: 2, // Reduced damping (was 3)
            },
          }}
        />
      ))}
    </div>
  )
}

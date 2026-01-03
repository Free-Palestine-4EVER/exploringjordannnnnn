"use client"

import { useEffect, useRef, useState } from "react"

interface AnimatedBackgroundProps {
  className?: string
}

export default function AnimatedBackground({ className = "" }: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isInitialized, setIsInitialized] = useState(false)
  const animationRef = useRef<number>()
  const lastTimeRef = useRef<number>(0)
  const fpsInterval = 1000 / 30 // Target 30 FPS instead of 60

  useEffect(() => {
    // Prevent multiple initializations
    if (isInitialized) return
    setIsInitialized(true)

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()

    // Throttle resize events
    let resizeTimeout: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(setCanvasDimensions, 200)
    }

    window.addEventListener("resize", handleResize)

    // Create particles - significantly reduced count
    const particles: Particle[] = []
    const particleCount = Math.min(Math.floor(window.innerWidth / 40), 25) // Even fewer particles

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5, // Smaller particles
        color: `rgba(59, 130, 246, ${Math.random() * 0.4 + 0.1})`, // More transparent
        speedX: Math.random() * 0.2 - 0.1, // Slower movement
        speedY: Math.random() * 0.2 - 0.1, // Slower movement
        directionChangeTimer: 0,
        directionChangeInterval: Math.random() * 300 + 100, // Less frequent direction changes
      })
    }

    // Animation loop with throttling
    let isAnimating = true

    const animate = (timestamp: number) => {
      if (!isAnimating || !canvas || !ctx) return

      // Throttle to target FPS
      const elapsed = timestamp - lastTimeRef.current

      if (elapsed > fpsInterval) {
        // Save the current time for next frame calculation
        lastTimeRef.current = timestamp - (elapsed % fpsInterval)

        // Only draw when tab is visible
        if (!document.hidden) {
          ctx.clearRect(0, 0, canvas.width, canvas.height)

          // Draw and update particles
          particles.forEach((particle) => {
            ctx.beginPath()
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
            ctx.fillStyle = particle.color
            ctx.fill()

            // Update position
            particle.x += particle.speedX
            particle.y += particle.speedY

            // Wrap around edges
            if (particle.x < 0) particle.x = canvas.width
            if (particle.x > canvas.width) particle.x = 0
            if (particle.y < 0) particle.y = canvas.height
            if (particle.y > canvas.height) particle.y = 0

            // Randomly change direction less frequently
            particle.directionChangeTimer++
            if (particle.directionChangeTimer >= particle.directionChangeInterval) {
              particle.speedX = Math.random() * 0.2 - 0.1
              particle.speedY = Math.random() * 0.2 - 0.1
              particle.directionChangeTimer = 0
              particle.directionChangeInterval = Math.random() * 300 + 100
            }
          })

          // Draw connections between nearby particles (reduced connection distance and frequency)
          // Only connect every other particle to reduce calculations
          for (let i = 0; i < particles.length; i += 2) {
            for (let j = i + 2; j < particles.length; j += 2) {
              const dx = particles[i].x - particles[j].x
              const dy = particles[i].y - particles[j].y
              const distance = Math.sqrt(dx * dx + dy * dy)

              if (distance < 60) {
                // Even shorter connection distance
                ctx.beginPath()
                ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 * (1 - distance / 60)})`
                ctx.lineWidth = 0.3 // Thinner lines
                ctx.moveTo(particles[i].x, particles[i].y)
                ctx.lineTo(particles[j].x, particles[j].y)
                ctx.stroke()
              }
            }
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    // Handle visibility change to pause animation when tab is not visible
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Pause animation when tab is not visible
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
          animationRef.current = undefined
        }
      } else {
        // Resume animation when tab becomes visible again
        if (!animationRef.current) {
          lastTimeRef.current = performance.now()
          animationRef.current = requestAnimationFrame(animate)
        }
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)

    // Start animation
    lastTimeRef.current = performance.now()
    animationRef.current = requestAnimationFrame(animate)

    return () => {
      isAnimating = false
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener("resize", handleResize)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      clearTimeout(resizeTimeout)
    }
  }, [isInitialized])

  return <canvas ref={canvasRef} className={`fixed inset-0 -z-10 ${className}`} />
}

interface Particle {
  x: number
  y: number
  radius: number
  color: string
  speedX: number
  speedY: number
  directionChangeTimer: number
  directionChangeInterval: number
}

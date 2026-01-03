"use client"

import type React from "react"

import { useState, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import BubblesAnimation from "@/components/bubbles-animation"
import type { ButtonProps } from "@/components/ui/button"

interface BubbleButtonProps extends ButtonProps {
  children: React.ReactNode
}

export default function BubbleButton({ children, ...props }: BubbleButtonProps) {
  const [showBubbles, setShowBubbles] = useState(false)
  const isAnimatingRef = useRef(false)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isAnimatingRef.current) return

    isAnimatingRef.current = true
    setShowBubbles(true)

    if (props.onClick) {
      props.onClick(e)
    }
  }

  // Use useCallback to memoize the onComplete function
  const handleAnimationComplete = useCallback(() => {
    setShowBubbles(false)
    isAnimatingRef.current = false
  }, [])

  return (
    <>
      <Button {...props} onClick={handleClick}>
        {children}
      </Button>
      <BubblesAnimation isActive={showBubbles} onComplete={handleAnimationComplete} />
    </>
  )
}

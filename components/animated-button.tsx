"use client"

import type React from "react"
import { useRef, useEffect } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface AnimatedButtonProps {
  href: string
  children: React.ReactNode
  className?: string
  size?: "sm" | "md" | "lg"
}

export function AnimatedButton({ href, children, className, size = "lg" }: AnimatedButtonProps) {
  const buttonRef = useRef<HTMLAnchorElement>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    audioRef.current = new Audio("/sounds/click.mp3")
    audioRef.current.volume = 0.3
  }, [])

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(() => {})
    }
  }

  const sizeClasses = {
    sm: "px-6 py-3 text-sm",
    md: "px-8 py-4 text-base",
    lg: "px-12 py-6 text-lg",
  }

  return (
    <Link
      ref={buttonRef}
      href={href}
      onClick={playSound}
      className={cn(
        "relative inline-flex items-center justify-center font-semibold rounded-full",
        "bg-gradient-to-r from-[#5A4FFF] via-[#6B5FFF] to-[#7A6FFF]",
        "text-white transition-all duration-300 group overflow-hidden",
        "hover:scale-105 hover:shadow-2xl",
        sizeClasses[size],
        className,
      )}
    >
      {/* Rotating neon glow */}
      <div className="absolute inset-0 rounded-full">
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.8) 60deg, transparent 120deg)`,
            animation: "rotate 2s linear infinite",
          }}
        />
        <div className="absolute inset-[2px] rounded-full bg-gradient-to-r from-[#5A4FFF] via-[#6B5FFF] to-[#7A6FFF]" />
      </div>

      {/* Button content */}
      <span className="relative z-10 flex items-center gap-2">{children}</span>

      <style jsx>{`
        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </Link>
  )
}

"use client"

import { useEffect, useState } from "react"

export function LoadingAnimation() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Animation de progression
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setTimeout(() => setLoading(false), 500)
          return 100
        }
        return prev + Math.random() * 15 + 5
      })
    }, 150)

    return () => clearInterval(progressInterval)
  }, [])

  useEffect(() => {
    if (!loading) {
      const overlay = document.getElementById("loading-overlay")
      if (overlay) {
        overlay.classList.add("fade-out")
        setTimeout(() => {
          overlay.style.display = "none"
        }, 800)
      }
    }
  }, [loading])

  if (!loading) return null

  return (
    <div id="loading-overlay" className="fixed inset-0 z-[100] flex items-center justify-center bg-black">
      <div className="text-center">
        {/* Logo animé */}
        <div className="mb-8">
          <div className="text-6xl font-bold bg-gradient-to-r from-white via-[#5A4FFF] to-white bg-clip-text text-transparent animate-pulse">
            W
          </div>
          <div className="text-2xl font-light text-white/70 mt-2 tracking-widest">EBZY</div>
        </div>

        {/* Barre de progression */}
        <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#5A4FFF] to-[#7A6FFF] transition-all duration-300 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>

        {/* Pourcentage */}
        <div className="text-white/50 text-sm mt-4 font-mono">{Math.floor(Math.min(progress, 100))}%</div>

        {/* Particules flottantes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[#5A4FFF] rounded-full opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 3 + 2}s infinite ease-in-out`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

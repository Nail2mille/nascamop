"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Clock, Globe, MessageSquare, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

const benefits = [
  {
    icon: <TrendingUp className="h-8 w-8 md:h-12 md:w-12" />,
    title: "Renforce votre crédibilité",
    description: "Un site web professionnel inspire confiance et montre votre sérieux à vos clients potentiels.",
    gradient: "from-[#667eea] to-[#764ba2]",
    hoverGradient: "from-[#764ba2] to-[#667eea]",
    iconBg: "bg-gradient-to-br from-blue-400 to-purple-600",
    glowColor: "rgba(102, 126, 234, 0.6)",
  },
  {
    icon: <Clock className="h-8 w-8 md:h-12 md:w-12" />,
    title: "Disponible 24h/24",
    description: "Sur téléphone et ordinateur, votre site travaille pour vous même quand vous dormez.",
    gradient: "from-[#f093fb] to-[#f5576c]",
    hoverGradient: "from-[#f5576c] to-[#f093fb]",
    iconBg: "bg-gradient-to-br from-pink-400 to-red-500",
    glowColor: "rgba(240, 147, 251, 0.6)",
  },
  {
    icon: <MessageSquare className="h-8 w-8 md:h-12 md:w-12" />,
    title: "Facilite le contact",
    description: "Offrez à vos clients un moyen simple et rapide de vous contacter et de découvrir vos services.",
    gradient: "from-[#4facfe] to-[#00f2fe]",
    hoverGradient: "from-[#00f2fe] to-[#4facfe]",
    iconBg: "bg-gradient-to-br from-blue-400 to-cyan-400",
    glowColor: "rgba(79, 172, 254, 0.6)",
  },
  {
    icon: <Globe className="h-8 w-8 md:h-12 md:w-12" />,
    title: "Apparaît sur Google",
    description: "Attirez de nouveaux clients grâce à une présence optimisée sur les moteurs de recherche.",
    gradient: "from-[#43e97b] to-[#38f9d7]",
    hoverGradient: "from-[#38f9d7] to-[#43e97b]",
    iconBg: "bg-gradient-to-br from-green-400 to-teal-400",
    glowColor: "rgba(67, 233, 123, 0.6)",
  },
]

export function EnhancedBenefitsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    audioRef.current = new Audio("/sounds/hover.mp3")
    audioRef.current.volume = 0.2

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("animate-slide-up")
            }, index * 150)
          }
        })
      },
      { threshold: 0.1 },
    )

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card)
    })

    return () => {
      cardsRef.current.forEach((card) => {
        if (card) observer.unobserve(card)
      })
    }
  }, [])

  const playHoverSound = () => {
    if (audioRef.current && window.innerWidth > 768) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(() => {})
    }
  }

  return (
    <section id="benefits" ref={sectionRef} className="py-16 md:py-24 relative overflow-hidden">
      {/* Particules flottantes subtiles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/10 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
            Un site web, c'est bien plus qu'une vitrine.
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto px-4">
            Découvrez tous les avantages d'une présence en ligne professionnelle
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className={cn(
                "group relative cursor-pointer mobile-glow",
                "transform transition-all duration-700 opacity-0 translate-y-20",
                "hover:scale-105 hover:-translate-y-2",
              )}
              style={
                {
                  "--glow-color": benefit.glowColor,
                } as React.CSSProperties
              }
              onMouseEnter={() => {
                setHoveredIndex(index)
                playHoverSound()
              }}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Outer glow */}
              <div
                className={cn(
                  "absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500",
                  `bg-gradient-to-r ${benefit.gradient}`,
                )}
              />

              {/* Main card */}
              <div
                className={cn(
                  "relative h-full rounded-3xl p-6 md:p-8 transition-all duration-500",
                  "bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl",
                  "border border-white/10 group-hover:border-white/30",
                  "overflow-hidden",
                )}
              >
                {/* Background gradient overlay on hover */}
                <div
                  className={cn(
                    "absolute inset-0 opacity-0 group-hover:opacity-20 transition-all duration-500 rounded-3xl",
                    `bg-gradient-to-br ${benefit.hoverGradient}`,
                  )}
                />

                {/* Floating particles on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full animate-bounce"
                      style={{
                        left: `${20 + Math.random() * 60}%`,
                        top: `${20 + Math.random() * 60}%`,
                        animationDelay: `${Math.random() * 1}s`,
                        animationDuration: `${1 + Math.random()}s`,
                      }}
                    />
                  ))}
                </div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div
                    className={cn(
                      "inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl mb-4 md:mb-6 benefit-icon",
                      "transition-all duration-500 group-hover:scale-110 group-hover:rotate-12",
                      benefit.iconBg,
                      "shadow-lg group-hover:shadow-2xl",
                    )}
                  >
                    <div className="text-white">{benefit.icon}</div>
                  </div>

                  {/* Text content */}
                  <div
                    className={cn(
                      "transition-all duration-500",
                      hoveredIndex === index ? "text-white" : "text-white/90",
                    )}
                  >
                    <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 group-hover:text-white transition-colors duration-300">
                      {benefit.title}
                    </h3>
                    <p
                      className={cn(
                        "text-sm md:text-base leading-relaxed transition-all duration-300",
                        hoveredIndex === index ? "text-white/90" : "text-white/70",
                      )}
                    >
                      {benefit.description}
                    </p>
                  </div>
                </div>

                {/* Shine effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl overflow-hidden">
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent shine-effect"
                    style={{
                      transform: "translateX(-100%)",
                      animation: "shine 2s ease-in-out infinite",
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes shine {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-slide-up {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </section>
  )
}

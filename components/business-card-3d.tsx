"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Mail, Phone, Globe, MapPin, Star } from "lucide-react"

export function BusinessCard3D() {
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    // Effet 3D plus prononcé
    setRotation({
      x: y * 35,
      y: x * 35,
    })
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 })
    setIsHovered(false)
  }

  return (
    <div ref={containerRef} className="flex justify-center items-center py-8 md:py-12 overflow-hidden">
      <div
        className={`transform transition-all duration-1000 ease-out ${
          isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
      >
        <div
          ref={cardRef}
          className="w-80 h-52 md:w-96 md:h-60 cursor-pointer"
          style={{ perspective: "2000px" }}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="relative w-full h-full transition-all duration-300 card-3d-enhanced"
            style={{
              transformStyle: "preserve-3d",
              transform: `
                rotateX(${rotation.x}deg) 
                rotateY(${rotation.y}deg) 
                translateZ(${isHovered ? 30 : 0}px)
                scale(${isHovered ? 1.05 : 1})
              `,
            }}
          >
            {/* Carte principale avec couleurs AMÉLIORÉES */}
            <div
              className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 via-white/5 to-black/20 border border-white/30 shadow-2xl overflow-hidden backdrop-blur-xl"
              style={{
                boxShadow: `
                  0 ${20 + Math.abs(rotation.x)}px ${40 + Math.abs(rotation.x)}px rgba(0, 0, 0, 0.6),
                  0 ${10 + Math.abs(rotation.y)}px ${20 + Math.abs(rotation.y)}px rgba(90, 79, 255, 0.4),
                  inset 0 1px 0 rgba(255, 255, 255, 0.2)
                `,
              }}
            >
              {/* Effet holographique animé RENFORCÉ */}
              <div
                className="absolute inset-0 opacity-90 pointer-events-none"
                style={{
                  background: `
                    radial-gradient(circle at ${50 + rotation.y * 1.5}% ${50 + rotation.x * 1.5}%, 
                      rgba(90, 79, 255, 0.6) 0%, 
                      rgba(122, 111, 255, 0.4) 20%, 
                      rgba(154, 143, 255, 0.3) 40%,
                      transparent 70%
                    )
                  `,
                }}
              />

              {/* Reflets animés PLUS INTENSES */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `
                    linear-gradient(
                      ${135 + rotation.y * 3}deg,
                      transparent 0%,
                      rgba(255, 255, 255, 0.1) ${30 + rotation.x * 1.5}%,
                      rgba(255, 255, 255, 0.6) ${45 + rotation.x * 1.5}%,
                      rgba(255, 255, 255, 0.8) ${50 + rotation.x * 1.5}%,
                      rgba(255, 255, 255, 0.6) ${55 + rotation.x * 1.5}%,
                      rgba(255, 255, 255, 0.1) ${70 + rotation.x * 1.5}%,
                      transparent 100%
                    )
                  `,
                }}
              />

              {/* Effet de profondeur avec plusieurs couches */}
              <div
                className="absolute inset-2 rounded-2xl bg-gradient-to-br from-white/10 to-transparent pointer-events-none border border-white/20"
                style={{
                  transform: `translateZ(${isHovered ? 10 : 5}px)`,
                }}
              />

              {/* Particules flottantes PLUS NOMBREUSES */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {Array.from({ length: 30 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-white/60 rounded-full opacity-80"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animation: `float ${Math.random() * 4 + 3}s infinite ease-in-out`,
                      animationDelay: `${Math.random() * 2}s`,
                      transform: `translate(${rotation.y * 1.2}px, ${rotation.x * 1.2}px) translateZ(${Math.random() * 20}px)`,
                      filter: `blur(${Math.random() * 0.5}px)`,
                    }}
                  />
                ))}
              </div>

              {/* Contenu de la carte avec effet de profondeur */}
              <div
                className="relative z-10 h-full p-6 md:p-8 flex flex-col justify-between"
                style={{
                  transform: `translateZ(${isHovered ? 15 : 8}px)`,
                  transition: "transform 0.3s ease-out",
                }}
              >
                {/* Header avec logo */}
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">Naïl Hachème</div>
                    <div className="text-xs md:text-sm text-white/90 mt-1 font-medium">Webdesigner & Développeur</div>
                    <div className="flex items-center mt-2">
                      <div className="text-xs text-white/80 font-medium mr-2">Fondateur de Webzy</div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-2 w-2 md:h-3 md:w-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <div
                      className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-white/20 to-white/10 border border-white/30 flex items-center justify-center shadow-lg backdrop-blur-sm"
                      style={{
                        transform: `translateZ(${isHovered ? 20 : 10}px) rotateY(${rotation.y * 0.5}deg)`,
                        transition: "transform 0.3s ease-out",
                      }}
                    >
                      <span className="text-white font-bold text-xl md:text-2xl drop-shadow-lg">W</span>
                    </div>
                    {/* Glow effect RENFORCÉ */}
                    <div
                      className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/30 to-white/10 blur-md opacity-60 -z-10"
                      style={{
                        transform: `scale(${isHovered ? 1.3 : 1.1})`,
                        transition: "transform 0.3s ease-out",
                      }}
                    />
                  </div>
                </div>

                {/* Informations de contact avec effet de profondeur */}
                <div className="space-y-2 md:space-y-3">
                  {[
                    { icon: Mail, text: "nail2mille@gmail.com" },
                    { icon: Phone, text: "06 95 65 63 78" },
                    { icon: MapPin, text: "France" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center text-xs md:text-sm text-white/90 group">
                      <div
                        className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-white/20 border border-white/30 flex items-center justify-center mr-2 md:mr-3 group-hover:bg-white/30 transition-all duration-300 backdrop-blur-sm"
                        style={{
                          transform: `translateZ(${isHovered ? 8 : 4}px)`,
                          transition: "transform 0.3s ease-out",
                        }}
                      >
                        <item.icon className="h-3 w-3 md:h-4 md:w-4 text-white" />
                      </div>
                      <span className="font-medium">{item.text}</span>
                    </div>
                  ))}
                </div>

                {/* Footer avec site web */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-xs text-white/80">
                    <Globe className="h-3 w-3 mr-1 text-white" />
                    <span className="font-medium">webzy.fr</span>
                  </div>
                  <div className="text-xs text-white/70 italic">"Des sites qui marquent"</div>
                </div>
              </div>

              {/* Bordure lumineuse PLUS INTENSE */}
              <div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{
                  background: `
                    linear-gradient(
                      ${rotation.y * 3}deg,
                      transparent 20%,
                      rgba(255, 255, 255, 0.8) 50%,
                      transparent 80%
                    )
                  `,
                  padding: "2px",
                  WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "exclude",
                  opacity: isHovered ? 1 : 0.7,
                  transition: "opacity 0.3s ease-out",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

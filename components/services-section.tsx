"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Monitor, PenTool, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"

const services = [
  {
    icon: <Monitor className="h-8 w-8 md:h-12 md:w-12" />,
    title: "Vitri'zy",
    subtitle: "Sites web professionnels",
    description: "Un site pro clair et rapide, de 1 à 5 pages, adapté à vos besoins.",
    features: [
      "Design responsive (mobile et PC)",
      "Formulaire de contact intégré",
      "Optimisation SEO basique",
      "Mise en ligne incluse",
      "Formation à la gestion",
    ],
    badge: "Le plus populaire",
    color: "from-[#5A4FFF] to-[#7A6FFF]",
    borderColor: "border-[#5A4FFF]/30",
    glowColor: "rgba(90, 79, 255, 0.6)",
  },
  {
    icon: <PenTool className="h-8 w-8 md:h-12 md:w-12" />,
    title: "Identi'zy",
    subtitle: "Identité visuelle complète",
    description: "Un logo moderne, percutant, qui vous démarque de la concurrence.",
    features: [
      "Logo 100% personnalisé",
      "3 propositions graphiques",
      "Formats HD inclus (PNG, SVG)",
      "Versions fond clair/foncé",
      "Charte graphique basique",
    ],
    badge: "Création sur-mesure",
    color: "from-[#FF6B6B] to-[#FF8E8E]",
    borderColor: "border-[#FF6B6B]/30",
    glowColor: "rgba(255, 107, 107, 0.6)",
  },
  {
    icon: <Smartphone className="h-8 w-8 md:h-12 md:w-12" />,
    title: "Social'zy",
    subtitle: "Visuels réseaux sociaux",
    description: "Des visuels stylés pour vos réseaux sans dépendre de personne.",
    features: [
      "Kit de 15 visuels personnalisés",
      "Posts, stories et bannières",
      "Adaptés à votre identité",
      "Formats optimisés par plateforme",
      "Templates modifiables",
    ],
    badge: "Pack complet",
    color: "from-[#4ECDC4] to-[#6EE7DE]",
    borderColor: "border-[#4ECDC4]/30",
    glowColor: "rgba(78, 205, 196, 0.6)",
  },
]

export function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in")
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

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-16 md:py-24 bg-gradient-to-b from-[#0A0A20] to-black relative overflow-hidden"
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(90, 79, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(90, 79, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6">Nos Services</h2>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto px-4">
            Voici les 3 options qui s'offrent à toi pour développer ta présence en ligne :
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className={cn(
                "relative group mobile-glow",
                "transform transition-all duration-500 opacity-0 translate-y-10",
              )}
              style={
                {
                  animationDelay: `${index * 150}ms`,
                  "--glow-color": service.glowColor,
                } as React.CSSProperties
              }
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Glow effect */}
              <div
                className={cn(
                  "absolute -inset-0.5 bg-gradient-to-r opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500 rounded-3xl",
                  service.color,
                )}
              />

              {/* Main card */}
              <div
                className={cn(
                  "relative bg-black/40 backdrop-blur-xl rounded-3xl p-6 md:p-8 border transition-all duration-300",
                  service.borderColor,
                  "group-hover:border-opacity-60 group-hover:bg-black/60",
                )}
              >
                {/* Badge */}
                <div
                  className={cn(
                    "inline-flex items-center px-3 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm font-medium mb-4 md:mb-6",
                    "bg-gradient-to-r text-white",
                    service.color,
                  )}
                >
                  {service.badge}
                </div>

                {/* Icon */}
                <div
                  className={cn(
                    "inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl mb-4 md:mb-6 service-icon",
                    "bg-gradient-to-r",
                    service.color,
                  )}
                >
                  {service.icon}
                </div>

                {/* Content */}
                <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                  <h3 className="text-xl md:text-2xl font-bold">{service.title}</h3>
                  <p className="text-white/60 font-medium text-sm md:text-base">{service.subtitle}</p>
                  <p className="text-white/80 leading-relaxed text-sm md:text-base">{service.description}</p>
                </div>

                {/* Features */}
                <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <div
                        className={cn(
                          "flex-shrink-0 w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center mr-2 md:mr-3 mt-0.5",
                          "bg-gradient-to-r",
                          service.color,
                        )}
                      >
                        <svg
                          className="w-2 h-2 md:w-3 md:h-3 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-white/80 text-sm md:text-base">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  asChild
                  className={cn(
                    "w-full rounded-xl text-white font-semibold py-4 md:py-6 text-base md:text-lg",
                    "bg-gradient-to-r transition-all duration-300",
                    service.color,
                    "hover:shadow-lg hover:scale-[1.02]",
                  )}
                >
                  <Link href="#contact">Demander un devis</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom message */}
        <div className="mt-16 md:mt-20 text-center">
          <div className="inline-flex items-center bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl px-6 md:px-8 py-3 md:py-4">
            <span className="text-base md:text-lg font-medium text-center">
              📌 Aucun abonnement. Vous payez <span className="text-[#5A4FFF] font-bold">une seule fois</span>, et c'est{" "}
              <span className="text-[#5A4FFF] font-bold">vous qui possédez tout</span>.
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

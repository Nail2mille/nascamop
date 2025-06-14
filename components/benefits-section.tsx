"use client"

import { useEffect, useRef } from "react"
import { Clock, Globe, MessageSquare, TrendingUp, Shield, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

const benefits = [
  {
    icon: <TrendingUp className="h-10 w-10" />,
    title: "Renforce votre crédibilité",
    description: "Un site web professionnel inspire confiance et montre votre sérieux à vos clients potentiels.",
    color: "from-[#5A4FFF] to-[#7A6FFF]",
  },
  {
    icon: <Clock className="h-10 w-10" />,
    title: "Disponible 24h/24",
    description: "Sur téléphone et ordinateur, votre site travaille pour vous même quand vous dormez.",
    color: "from-[#FF6B6B] to-[#FF8E8E]",
  },
  {
    icon: <MessageSquare className="h-10 w-10" />,
    title: "Facilite le contact",
    description: "Offrez à vos clients un moyen simple et rapide de vous contacter et de découvrir vos services.",
    color: "from-[#4ECDC4] to-[#6EE7DE]",
  },
  {
    icon: <Globe className="h-10 w-10" />,
    title: "Apparaît sur Google",
    description: "Attirez de nouveaux clients grâce à une présence optimisée sur les moteurs de recherche.",
    color: "from-[#45B7D1] to-[#96CEB4]",
  },
  {
    icon: <Shield className="h-10 w-10" />,
    title: "Sécurisé et fiable",
    description: "Hébergement sécurisé, sauvegardes automatiques et maintenance incluse pour votre tranquillité.",
    color: "from-[#A8E6CF] to-[#88D8A3]",
  },
  {
    icon: <Zap className="h-10 w-10" />,
    title: "Performance optimale",
    description: "Sites ultra-rapides optimisés pour le référencement et l'expérience utilisateur.",
    color: "from-[#FFD93D] to-[#FF6B6B]",
  },
]

export function BenefitsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

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
      id="benefits"
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-black via-[#0A0A20] to-black relative overflow-hidden"
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
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Un site web, c'est bien plus qu'une vitrine.</h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Découvrez tous les avantages d'une présence en ligne professionnelle
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className={cn("group relative", "transform transition-all duration-500 opacity-0 translate-y-10")}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Glow effect */}
              <div
                className={cn(
                  "absolute -inset-0.5 bg-gradient-to-r opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500 rounded-3xl",
                  benefit.color,
                )}
              />

              {/* Main card */}
              <div className="relative bg-black/40 backdrop-blur-xl rounded-3xl p-8 border border-white/10 group-hover:border-white/20 transition-all duration-300 h-full">
                {/* Icon */}
                <div
                  className={cn(
                    "inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6",
                    "bg-gradient-to-r",
                    benefit.color,
                  )}
                >
                  {benefit.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-4">{benefit.title}</h3>
                <p className="text-white/70 leading-relaxed">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Phone, FileText, Paintbrush, Rocket, Wrench, CheckCircle, Sparkles } from "lucide-react"
import { AnimatedButton } from "@/components/animated-button"

const steps = [
  {
    icon: <Phone className="h-6 w-6 md:h-8 md:w-8" />,
    title: "Prise de contact",
    emoji: "📞",
    description: "On échange ensemble sur votre activité et vos besoins.",
    color: "from-[#5A4FFF] to-[#7A6FFF]",
    delay: 0,
  },
  {
    icon: <FileText className="h-6 w-6 md:h-8 md:w-8" />,
    title: "Proposition personnalisée",
    emoji: "📄",
    description: "Je vous propose une maquette ou un plan adapté, sans engagement.",
    color: "from-[#FF6B6B] to-[#FF8E8E]",
    delay: 200,
  },
  {
    icon: <Paintbrush className="h-6 w-6 md:h-8 md:w-8" />,
    title: "Création & design",
    emoji: "🖌️",
    description: "Conception du site sur mesure (et du logo si besoin).",
    color: "from-[#4ECDC4] to-[#6EE7DE]",
    delay: 400,
  },
  {
    icon: <Rocket className="h-6 w-6 md:h-8 md:w-8" />,
    title: "Mise en ligne",
    emoji: "🚀",
    description: "Votre site est publié, optimisé pour mobile et bien référencé.",
    color: "from-[#FFD93D] to-[#FFC53D]",
    delay: 600,
  },
  {
    icon: <Wrench className="h-6 w-6 md:h-8 md:w-8" />,
    title: "Suivi & modifications",
    emoji: "🔧",
    description: "Des ajustements possibles, un rendu final à votre image.",
    color: "from-[#A8E6CF] to-[#88D8A3]",
    delay: 800,
  },
]

export function ProcessTimeline() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<(HTMLDivElement | null)[]>([])
  const ctaRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(-1)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return

      const timelineRect = timelineRef.current.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const middleOfScreen = viewportHeight / 2

      // Calculer la progression avec un offset pour que ça commence plus tôt
      const timelineStart = timelineRect.top + 200 // Offset pour commencer plus tôt
      const timelineHeight = timelineRect.height - 400 // Ajuster la hauteur
      const scrollProgress = Math.max(0, Math.min(1, (middleOfScreen - timelineStart) / timelineHeight))

      // Déterminer l'étape active
      const newActiveStep = Math.floor(scrollProgress * steps.length)
      const clampedActiveStep = Math.max(-1, Math.min(steps.length - 1, newActiveStep))

      if (clampedActiveStep !== activeStep) {
        const isScrollingDown = clampedActiveStep > activeStep
        setActiveStep(clampedActiveStep)

        // Animation progressive des étapes
        stepsRef.current.forEach((step, index) => {
          if (step) {
            if (index <= clampedActiveStep) {
              step.classList.add("animate-fade-in")
            }
            // Ne pas retirer les animations lors du scroll vers le haut
          }
        })

        // Mettre à jour les étapes complétées PROGRESSIVEMENT
        if (isScrollingDown) {
          setCompletedSteps((prev) => {
            const newCompleted = [...prev]
            for (let i = 0; i <= clampedActiveStep; i++) {
              if (!newCompleted.includes(i)) {
                newCompleted.push(i)
              }
            }
            return newCompleted
          })
        } else {
          // Retirer UNE SEULE étape à la fois lors du scroll vers le haut
          setCompletedSteps((prev) => {
            if (prev.length > clampedActiveStep + 1) {
              return prev.slice(0, clampedActiveStep + 1)
            }
            return prev
          })
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Appel initial

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [activeStep])

  return (
    <section id="process" ref={timelineRef} className="py-16 md:py-24 relative overflow-hidden">
      {/* Fond animé avec particules */}
      <div className="absolute inset-0">
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

        {/* Particules flottantes */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#5A4FFF] rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-[#5A4FFF] to-white bg-clip-text text-transparent">
            Comment ça marche ?
          </h2>
          <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto px-4">
            Un processus simple et efficace pour donner vie à votre projet web
          </p>
        </div>

        {/* Timeline interactive */}
        <div className="max-w-4xl mx-auto relative">
          {/* Ligne de connexion animée - RESPONSIVE */}
          <div
            className="absolute left-8 md:left-1/2 top-0 w-1 md:transform md:-translate-x-1/2"
            style={{ height: "calc(100% - 150px)" }}
          >
            <div className="w-full h-full bg-gradient-to-b from-transparent via-[#5A4FFF]/30 to-transparent rounded-full" />

            {/* Progression animée */}
            <div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#5A4FFF] to-[#7A6FFF] rounded-full transition-all duration-1000 ease-out"
              style={{
                height: `${(completedSteps.length / steps.length) * 100}%`,
                boxShadow: "0 0 20px rgba(90, 79, 255, 0.6)",
              }}
            />
          </div>

          {/* Point de progression RELATIF à la timeline au lieu de fixe */}
          <div
            className="absolute left-8 md:left-1/2 md:transform md:-translate-x-1/2 transition-all duration-300 ease-out"
            style={{
              top: `${Math.max(0, Math.min(100, (completedSteps.length / steps.length) * 100))}%`,
              opacity: activeStep >= 0 ? 1 : 0,
            }}
          >
            <div className="relative">
              <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-r from-[#5A4FFF] to-[#7A6FFF] animate-pulse border-2 border-white/30" />
              <div className="absolute inset-0 w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-r from-[#5A4FFF] to-[#7A6FFF] blur-md opacity-60" />

              {/* Cercles concentriques animés - CORRIGÉ */}
              <div className="absolute -inset-1 w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-[#5A4FFF]/30 animate-ping" />

              {/* Particules qui s'échappent */}
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-[#5A4FFF] rounded-full animate-bounce opacity-80"
                  style={{
                    left: `${Math.cos((i * 60 * Math.PI) / 180) * 15 + 12}px`,
                    top: `${Math.sin((i * 60 * Math.PI) / 180) * 15 + 12}px`,
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: `${1 + Math.random()}s`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Étapes - LAYOUT MOBILE AMÉLIORÉ */}
          {steps.map((step, index) => (
            <div
              key={index}
              ref={(el) => (stepsRef.current[index] = el)}
              data-step={index}
              className={cn(
                "relative mb-12 md:mb-20 opacity-0 transform translate-y-10",
                "transition-all duration-700 ease-out",
              )}
              style={{ transitionDelay: `${step.delay}ms` }}
            >
              <div className="flex flex-row md:flex-row items-start md:items-center gap-6 md:gap-8">
                {/* Point de connexion mobile */}
                <div className="flex-shrink-0 relative">
                  <div
                    className={cn(
                      "w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center transition-all duration-500",
                      "bg-gradient-to-r shadow-lg border-2",
                      completedSteps.includes(index)
                        ? step.color + " border-transparent shadow-2xl scale-110"
                        : "bg-black border-white/20",
                    )}
                  >
                    {completedSteps.includes(index) ? (
                      <CheckCircle className="h-6 w-6 md:h-8 md:w-8 text-white" />
                    ) : (
                      step.icon
                    )}
                  </div>

                  {/* Numéro de l'étape */}
                  <div
                    className={cn(
                      "absolute -top-2 -right-2 w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs md:text-sm font-bold",
                      "bg-gradient-to-r border-2 border-white/20",
                      completedSteps.includes(index)
                        ? "bg-green-500 text-white border-transparent"
                        : "bg-black text-white/60",
                    )}
                  >
                    {index + 1}
                  </div>
                </div>

                {/* Contenu de l'étape - MOBILE FIRST */}
                <div className="flex-1 min-w-0">
                  <div
                    className={cn(
                      "relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl md:rounded-3xl p-4 md:p-8 border border-white/10",
                      "transform transition-all duration-500 hover:scale-105 hover:-translate-y-2",
                      "hover:border-white/30 hover:shadow-2xl",
                      activeStep >= index ? "border-[#5A4FFF]/50 shadow-lg shadow-[#5A4FFF]/20" : "",
                    )}
                  >
                    {/* Titre et emoji */}
                    <div className="flex items-center mb-3 md:mb-6">
                      <div>
                        <h3 className="text-lg md:text-2xl font-bold flex items-center">
                          {step.title} <span className="ml-2 text-xl md:text-3xl">{step.emoji}</span>
                        </h3>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-white/70 text-sm md:text-lg leading-relaxed">{step.description}</p>

                    {/* Effet de brillance animé */}
                    <div className="absolute inset-0 rounded-2xl md:rounded-3xl overflow-hidden pointer-events-none">
                      <div
                        className={cn(
                          "absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent",
                          "transform -translate-x-full transition-transform duration-1000",
                          activeStep >= index ? "translate-x-full" : "",
                        )}
                      />
                    </div>

                    {/* Particules sur l'étape active */}
                    {activeStep === index && (
                      <div className="absolute inset-0 pointer-events-none">
                        {Array.from({ length: 6 }).map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-1 h-1 md:w-2 md:h-2 bg-[#5A4FFF] rounded-full animate-bounce opacity-60"
                            style={{
                              left: `${20 + Math.random() * 60}%`,
                              top: `${20 + Math.random() * 60}%`,
                              animationDelay: `${Math.random() * 1}s`,
                              animationDuration: `${1 + Math.random()}s`,
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* CTA final */}
          <div
            ref={ctaRef}
            className="text-center mt-16 md:mt-32 opacity-0 transform translate-y-10 transition-all duration-700"
          >
            {/* Badge de fin de timeline */}
            <div className="flex justify-center mb-6 md:mb-8">
              <div className="relative">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-[#5A4FFF] to-[#7A6FFF] flex items-center justify-center shadow-2xl">
                  <Sparkles className="h-6 w-6 md:h-8 md:w-8 text-white" />
                </div>
                <div className="absolute inset-0 w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-[#5A4FFF] to-[#7A6FFF] blur-xl opacity-60 animate-pulse" />

                {/* Cercles concentriques */}
                <div className="absolute inset-0 w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-[#5A4FFF]/30 animate-ping" />
              </div>
            </div>

            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-[#5A4FFF] to-[#7A6FFF] rounded-2xl md:rounded-3xl blur-xl opacity-30 animate-pulse" />
              <div className="relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl md:rounded-3xl p-6 md:p-8 border border-[#5A4FFF]/30">
                <h3 className="text-xl md:text-3xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-white to-[#5A4FFF] bg-clip-text text-transparent">
                  Prêt à créer une présence en ligne professionnelle ?
                </h3>
                <AnimatedButton href="#contact" size="lg">
                  Demandez un devis gratuit
                </AnimatedButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

const codeSnippets = [
  {
    title: "Animation fluide avec Framer Motion",
    language: "tsx",
    code: `const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
}

<motion.div
  variants={variants}
  initial="hidden"
  animate="visible"
  className="hero-section"
>
  <h1>Bienvenue sur Webzy</h1>
</motion.div>`,
  },
  {
    title: "Hook personnalisé pour les animations",
    language: "ts",
    code: `export function useScrollAnimation() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    )
    
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return { ref, isVisible }
}`,
  },
  {
    title: "Composant responsive optimisé",
    language: "tsx",
    code: `interface CardProps {
  title: string
  description: string
  gradient: string
}

export function Card({ title, description, gradient }: CardProps) {
  return (
    <div className={cn(
      "group relative overflow-hidden rounded-2xl p-6",
      "bg-white/5 backdrop-blur-sm border border-white/10",
      "hover:border-white/20 transition-all duration-300",
      "transform hover:scale-105 hover:-translate-y-1"
    )}>
      <div className={cn(
        "absolute inset-0 opacity-0 group-hover:opacity-20",
        "bg-gradient-to-br transition-opacity duration-500",
        gradient
      )} />
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-white/70">{description}</p>
    </div>
  )
}`,
  },
]

export function CodeShowcase() {
  const [currentSnippet, setCurrentSnippet] = useState(0)
  const [displayedCode, setDisplayedCode] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Nettoyer l'intervalle de frappe lors du démontage du composant
  useEffect(() => {
    return () => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          startTyping()
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.disconnect()
      }
    }
  }, [])

  const startTyping = () => {
    if (isTyping) return

    // Nettoyer tout intervalle existant
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current)
    }

    setIsTyping(true)
    setDisplayedCode("")

    const code = codeSnippets[currentSnippet].code
    let index = 0

    typingIntervalRef.current = setInterval(() => {
      if (index < code.length) {
        setDisplayedCode((prev) => prev + code.charAt(index))
        index++
      } else {
        if (typingIntervalRef.current) {
          clearInterval(typingIntervalRef.current)
        }
        setIsTyping(false)

        // Passer au snippet suivant après 3 secondes
        const timeout = setTimeout(() => {
          setCurrentSnippet((prev) => (prev + 1) % codeSnippets.length)
          startTyping()
        }, 3000)

        // Nettoyer le timeout si le composant est démonté
        return () => clearTimeout(timeout)
      }
    }, 30)
  }

  const handleSnippetClick = (index: number) => {
    if (index !== currentSnippet && !isTyping) {
      setCurrentSnippet(index)
      startTyping()
    }
  }

  // Fonction pour formater le code avec coloration syntaxique basique
  const formatCode = (code: string) => {
    // Remplacer les caractères spéciaux pour éviter les problèmes d'affichage
    return code.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\{/g, "&#123;").replace(/\}/g, "&#125;")
  }

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Particules subtiles */}
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
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Code de{" "}
            <span className="bg-gradient-to-r from-[#5A4FFF] to-[#7A6FFF] bg-clip-text text-transparent">qualité</span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Découvrez la qualité et la propreté du code qui alimente vos projets web
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sélecteur de snippets */}
            <div className="space-y-4">
              {codeSnippets.map((snippet, index) => (
                <button
                  key={index}
                  onClick={() => handleSnippetClick(index)}
                  className={cn(
                    "w-full text-left p-4 rounded-xl transition-all duration-300",
                    "border border-white/10 hover:border-white/20",
                    index === currentSnippet ? "bg-[#5A4FFF]/20 border-[#5A4FFF]/50" : "bg-white/5 hover:bg-white/10",
                  )}
                >
                  <div className="text-sm font-medium text-white">{snippet.title}</div>
                  <div className="text-xs text-white/60 mt-1">{snippet.language.toUpperCase()}</div>
                </button>
              ))}
            </div>

            {/* Éditeur de code */}
            <div className="lg:col-span-2">
              <div className="bg-[#0D1117] rounded-xl border border-white/10 overflow-hidden shadow-2xl">
                {/* Barre de titre */}
                <div className="flex items-center justify-between px-4 py-3 bg-[#161B22] border-b border-white/10">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                    <div className="w-3 h-3 rounded-full bg-[#27CA3F]" />
                  </div>
                  <div className="text-xs text-white/60 font-mono">
                    {codeSnippets[currentSnippet].title.toLowerCase().replace(/\s+/g, "-")}.
                    {codeSnippets[currentSnippet].language}
                  </div>
                  <div className="text-xs text-white/40">Webzy</div>
                </div>

                {/* Code */}
                <div className="p-6 font-mono text-sm leading-relaxed min-h-[400px] overflow-auto">
                  <pre className="text-white/90 whitespace-pre-wrap">
                    <code dangerouslySetInnerHTML={{ __html: formatCode(displayedCode) }} />
                    {isTyping && <span className="animate-pulse bg-[#5A4FFF] text-[#5A4FFF]">|</span>}
                  </pre>
                </div>
              </div>

              {/* Indicateurs */}
              <div className="flex justify-center mt-6 space-x-2">
                {codeSnippets.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleSnippetClick(index)}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all duration-300",
                      index === currentSnippet ? "bg-[#5A4FFF] w-6" : "bg-white/30 hover:bg-white/50",
                    )}
                    aria-label={`Snippet ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {[
              { label: "Lignes de code", value: "10K+" },
              { label: "Projets livrés", value: "50+" },
              { label: "Technologies", value: "15+" },
              { label: "Satisfaction", value: "100%" },
            ].map((stat, index) => (
              <div
                key={index}
                className={cn(
                  "text-center p-4 rounded-xl bg-white/5 border border-white/10",
                  "transform transition-all duration-500",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-2xl font-bold text-[#5A4FFF]">{stat.value}</div>
                <div className="text-sm text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import { useEffect, useRef } from "react"

export function MobileScrollEffects() {
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    // Détecter si on est sur mobile
    const isMobile = window.innerWidth <= 768

    if (!isMobile) return

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement

            // Ajouter l'effet d'illumination sophistiqué
            element.classList.add("mobile-illuminate")

            // Ajouter des particules flottantes
            createFloatingParticles(element)

            // Effet de pulsation des icônes
            const icon = element.querySelector(".service-icon, .benefit-icon")
            if (icon) {
              icon.classList.add("mobile-icon-pulse")
            }

            // Retirer les effets après l'animation
            setTimeout(() => {
              element.classList.remove("mobile-illuminate")
              if (icon) {
                icon.classList.remove("mobile-icon-pulse")
              }
              // Nettoyer les particules
              const particles = element.querySelectorAll(".floating-particle")
              particles.forEach((particle) => particle.remove())
            }, 3000)
          }
        })
      },
      {
        threshold: 0.3,
        rootMargin: "-50px 0px -50px 0px",
      },
    )

    // Observer tous les éléments avec la classe mobile-glow
    const elements = document.querySelectorAll(".mobile-glow")
    elements.forEach((el) => {
      if (observerRef.current) {
        observerRef.current.observe(el)
      }
    })

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  const createFloatingParticles = (element: HTMLElement) => {
    const rect = element.getBoundingClientRect()
    const particleCount = 6

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div")
      particle.className = "floating-particle"
      particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: linear-gradient(45deg, #5A4FFF, #7A6FFF);
        border-radius: 50%;
        pointer-events: none;
        z-index: 100;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: floatUp 2s ease-out forwards;
        opacity: 0;
      `

      element.style.position = "relative"
      element.appendChild(particle)
    }
  }

  return null
}

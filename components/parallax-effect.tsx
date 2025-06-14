"use client"

import { useEffect, useRef } from "react"

export function ParallaxEffect() {
  const elementsRef = useRef<HTMLElement[]>([])

  useEffect(() => {
    // Ne pas appliquer sur mobile
    if (window.innerWidth <= 768) return

    // Sélectionner les éléments avec l'attribut data-parallax
    const parallaxElements = document.querySelectorAll("[data-parallax]")
    elementsRef.current = Array.from(parallaxElements) as HTMLElement[]

    const handleScroll = () => {
      const scrollY = window.scrollY

      elementsRef.current.forEach((element) => {
        const speed = Number.parseFloat(element.dataset.parallax || "0.1")
        const direction = element.dataset.parallaxDirection || "up"
        const limit = Number.parseFloat(element.dataset.parallaxLimit || "100")

        let yPos = 0

        if (direction === "up") {
          yPos = -scrollY * speed
          // Limiter le déplacement
          yPos = Math.max(yPos, -limit)
        } else {
          yPos = scrollY * speed
          // Limiter le déplacement
          yPos = Math.min(yPos, limit)
        }

        element.style.transform = `translate3d(0, ${yPos}px, 0)`
      })
    }

    window.addEventListener("scroll", handleScroll)

    // Appliquer immédiatement pour éviter un saut au premier scroll
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return null
}

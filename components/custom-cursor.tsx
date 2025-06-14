"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [hidden, setHidden] = useState(true)
  const [clicked, setClicked] = useState(false)
  const [linkHovered, setLinkHovered] = useState(false)
  const [buttonHovered, setButtonHovered] = useState(false)

  useEffect(() => {
    // Détection plus précise des appareils tactiles
    const isTouchDevice = () => {
      return (
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        (navigator as any).msMaxTouchPoints > 0 ||
        window.matchMedia("(pointer: coarse)").matches
      )
    }

    // Si c'est un appareil tactile, ne pas initialiser le curseur personnalisé
    if (isTouchDevice()) {
      return
    }

    setHidden(false)

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseDown = () => setClicked(true)
    const handleMouseUp = () => setClicked(false)

    const handleLinkHover = () => setLinkHovered(true)
    const handleLinkLeave = () => setLinkHovered(false)

    const handleButtonHover = () => setButtonHovered(true)
    const handleButtonLeave = () => setButtonHovered(false)

    window.addEventListener("mousemove", updatePosition)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)

    // Détecter quand le curseur est sur un lien ou un bouton
    const links = document.querySelectorAll("a, button")
    links.forEach((link) => {
      link.addEventListener("mouseenter", handleLinkHover)
      link.addEventListener("mouseleave", handleLinkLeave)
    })

    // Détecter spécifiquement les boutons avec des classes contenant "button"
    const buttons = document.querySelectorAll('[class*="button"]')
    buttons.forEach((button) => {
      button.addEventListener("mouseenter", handleButtonHover)
      button.addEventListener("mouseleave", handleButtonLeave)
    })

    return () => {
      window.removeEventListener("mousemove", updatePosition)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)

      links.forEach((link) => {
        link.removeEventListener("mouseenter", handleLinkHover)
        link.removeEventListener("mouseleave", handleLinkLeave)
      })

      buttons.forEach((button) => {
        button.removeEventListener("mouseenter", handleButtonHover)
        button.removeEventListener("mouseleave", handleButtonLeave)
      })
    }
  }, [])

  if (hidden) return null

  return (
    <>
      {/* Curseur principal */}
      <div
        className={cn(
          "fixed pointer-events-none z-[9999] rounded-full mix-blend-difference",
          "transition-transform duration-150 ease-out",
          clicked ? "scale-75" : "scale-100",
        )}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${clicked ? 0.75 : 1})`,
        }}
      >
        {/* Cercle extérieur */}
        <div
          className={cn(
            "relative w-8 h-8 rounded-full",
            "transition-all duration-300 ease-out",
            linkHovered ? "bg-white scale-150" : buttonHovered ? "bg-[#5A4FFF] scale-[2]" : "bg-white",
          )}
        />
      </div>

      {/* Cercle de traînée */}
      <div
        className="fixed pointer-events-none z-[9998] w-12 h-12 rounded-full bg-[#5A4FFF]/20 blur-sm"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: "translate(-50%, -50%)",
          transition: "transform 0.2s, opacity 0.2s, left 0.5s ease-out, top 0.5s ease-out",
        }}
      />

      {/* Particules qui suivent le curseur */}
      <div
        className="fixed pointer-events-none z-[9997] w-4 h-4 rounded-full bg-[#5A4FFF]/30 blur-md"
        style={{
          left: `${position.x + 10}px`,
          top: `${position.y - 10}px`,
          transform: "translate(-50%, -50%)",
          transition: "left 0.8s ease-out, top 0.8s ease-out",
        }}
      />
      <div
        className="fixed pointer-events-none z-[9997] w-3 h-3 rounded-full bg-[#7A6FFF]/30 blur-md"
        style={{
          left: `${position.x - 15}px`,
          top: `${position.y + 15}px`,
          transform: "translate(-50%, -50%)",
          transition: "left 1s ease-out, top 1s ease-out",
        }}
      />
    </>
  )
}

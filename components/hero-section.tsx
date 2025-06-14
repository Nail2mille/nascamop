"use client"

import { useEffect, useRef } from "react"
import { AnimatedButton } from "@/components/animated-button"
import { ScrollingBanner } from "@/components/scrolling-banner"

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Create floating geometric elements
    const elements: {
      x: number
      y: number
      size: number
      rotation: number
      rotationSpeed: number
      speedX: number
      speedY: number
      alpha: number
      shape: "circle" | "square" | "triangle"
    }[] = []

    // Reduce number of elements on mobile
    const elementCount = window.innerWidth <= 768 ? 4 : 8

    for (let i = 0; i < elementCount; i++) {
      elements.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 60 + 40,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.3 + 0.1,
        shape: ["circle", "square", "triangle"][Math.floor(Math.random() * 3)] as "circle" | "square" | "triangle",
      })
    }

    const animate = () => {
      requestAnimationFrame(animate)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      elements.forEach((element) => {
        ctx.save()
        ctx.translate(element.x, element.y)
        ctx.rotate(element.rotation)

        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, element.size)
        gradient.addColorStop(0, `rgba(90, 79, 255, ${element.alpha})`)
        gradient.addColorStop(0.7, `rgba(90, 79, 255, ${element.alpha * 0.3})`)
        gradient.addColorStop(1, "rgba(90, 79, 255, 0)")

        ctx.fillStyle = gradient
        ctx.strokeStyle = `rgba(90, 79, 255, ${element.alpha * 0.8})`
        ctx.lineWidth = 1

        if (element.shape === "circle") {
          ctx.beginPath()
          ctx.arc(0, 0, element.size / 2, 0, Math.PI * 2)
          ctx.fill()
          ctx.stroke()
        } else if (element.shape === "square") {
          ctx.fillRect(-element.size / 2, -element.size / 2, element.size, element.size)
          ctx.strokeRect(-element.size / 2, -element.size / 2, element.size, element.size)
        } else if (element.shape === "triangle") {
          ctx.beginPath()
          ctx.moveTo(0, -element.size / 2)
          ctx.lineTo(-element.size / 2, element.size / 2)
          ctx.lineTo(element.size / 2, element.size / 2)
          ctx.closePath()
          ctx.fill()
          ctx.stroke()
        }

        ctx.restore()

        // Update position and rotation
        element.x += element.speedX
        element.y += element.speedY
        element.rotation += element.rotationSpeed

        // Wrap around edges
        if (element.x < -element.size) element.x = canvas.width + element.size
        if (element.x > canvas.width + element.size) element.x = -element.size
        if (element.y < -element.size) element.y = canvas.height + element.size
        if (element.y > canvas.height + element.size) element.y = -element.size
      })
    }

    animate()

    // Animation d'entrée des éléments
    const animateElements = () => {
      if (titleRef.current) {
        titleRef.current.classList.add("animate-fade-in")
      }

      if (subtitleRef.current) {
        setTimeout(() => {
          subtitleRef.current?.classList.add("animate-fade-in")
        }, 300)
      }

      if (badgeRef.current) {
        setTimeout(() => {
          badgeRef.current?.classList.add("animate-fade-in")
        }, 100)
      }

      if (buttonRef.current) {
        setTimeout(() => {
          buttonRef.current?.classList.add("animate-fade-in")
        }, 500)
      }
    }

    // Lancer l'animation après un court délai
    setTimeout(animateElements, 100)

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-24">
        <canvas ref={canvasRef} className="absolute inset-0 z-0" />

        {/* Gradient overlay subtil */}
        <div className="absolute inset-0 z-15 bg-gradient-to-b from-transparent via-black/10 to-black/20" />

        <div className="container mx-auto px-4 z-20 text-center">
          {/* Stats badge */}
          <div
            ref={badgeRef}
            className="inline-flex items-center bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-4 md:px-6 py-2 mb-6 md:mb-8 opacity-0 transform translate-y-4"
            data-parallax="0.1"
            data-parallax-direction="up"
          >
            <span className="text-xs md:text-sm text-white/80">+ 50 Entreprises déjà conquises</span>
          </div>

          <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
            <h1
              ref={titleRef}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl font-bold leading-tight px-4 opacity-0 transform translate-y-8"
            >
              Votre entreprise mérite une présence en ligne à la hauteur de son{" "}
              <span className="bg-gradient-to-r from-[#5A4FFF] via-[#7A6FFF] to-[#9A8FFF] bg-clip-text text-transparent">
                potentiel
              </span>
            </h1>

            <p
              ref={subtitleRef}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed px-4 opacity-0 transform translate-y-6"
              data-parallax="0.05"
              data-parallax-direction="up"
            >
              Webzy transforme vos idées en sites qui marquent et en identités visuelles qui font la différence.
            </p>

            <div
              ref={buttonRef}
              className="pt-4 opacity-0 transform translate-y-4"
              data-parallax="0.02"
              data-parallax-direction="up"
            >
              <AnimatedButton href="#contact">Demander un devis gratuit</AnimatedButton>
            </div>
          </div>
        </div>
      </section>

      {/* Scrolling Banner */}
      <ScrollingBanner />
    </>
  )
}

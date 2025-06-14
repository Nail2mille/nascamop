"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { BusinessCard3D } from "@/components/business-card-3d"

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

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

    if (textRef.current) observer.observe(textRef.current)
    if (imageRef.current) observer.observe(imageRef.current)

    return () => {
      if (textRef.current) observer.unobserve(textRef.current)
      if (imageRef.current) observer.unobserve(imageRef.current)
    }
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-[#0A0A20] via-[#0F0F30] to-[#0A0A20] relative overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div
            ref={imageRef}
            className={cn(
              "relative h-[400px] rounded-2xl overflow-hidden",
              "transform transition-all duration-500 opacity-0 translate-x-10",
            )}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#5A4FFF]/30 to-transparent z-10" />
            <div className="absolute inset-0 backdrop-blur-sm z-0" />
            <Image
              src="/placeholder.svg?height=400&width=500"
              alt="Fondateur de Webzy"
              fill
              className="object-cover z-0 opacity-80"
            />
            <div className="absolute inset-0 bg-[#0A0A20]/30 z-20" />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent z-30">
              <h3 className="text-xl font-bold">Webzy</h3>
              <p className="text-white/70">Passion & Expertise</p>
            </div>
          </div>

          <div
            ref={textRef}
            className={cn("space-y-6", "transform transition-all duration-500 opacity-0 translate-x-[-10px]")}
          >
            <h2 className="text-4xl font-bold">À propos de Webzy</h2>
            <div className="w-20 h-1 bg-[#5A4FFF]" />
            <p className="text-lg text-white/80 leading-relaxed">
              Webzy, c'est l'initiative d'un passionné du web qui souhaite aider les commerces locaux à gagner en
              visibilité.
            </p>
            <p className="text-lg text-white/80 leading-relaxed">
              Mon objectif ? Créer des sites professionnels, modernes et efficaces, même pour ceux qui n'y connaissent
              rien.
            </p>
            <p className="text-lg text-white/80 leading-relaxed">Chaque projet est unique, comme vous.</p>
            <div className="pt-4">
              <span className="inline-block bg-white/10 rounded-full px-4 py-2 text-sm mr-2 mb-2">Design Web</span>
              <span className="inline-block bg-white/10 rounded-full px-4 py-2 text-sm mr-2 mb-2">
                Identité Visuelle
              </span>
              <span className="inline-block bg-white/10 rounded-full px-4 py-2 text-sm mr-2 mb-2">Réseaux Sociaux</span>
              <span className="inline-block bg-white/10 rounded-full px-4 py-2 text-sm mr-2 mb-2">SEO</span>
            </div>
          </div>
        </div>

        {/* Carte de visite 3D */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2">Rencontrez le créateur</h3>
          <p className="text-white/70 mb-8">Cliquez sur la carte pour la retourner</p>
          <BusinessCard3D />
        </div>
      </div>
    </section>
  )
}

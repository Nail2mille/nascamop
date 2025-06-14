"use client"

import { useEffect, useRef } from "react"

export function ScrollAnimations() {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    audioRef.current = new Audio("/sounds/scroll.mp3")
    audioRef.current.volume = 0.1

    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Play scroll sound
          if (audioRef.current) {
            audioRef.current.currentTime = 0
            audioRef.current.play().catch(() => {})
          }

          // Add animation classes
          entry.target.classList.add("animate-fade-in-up")

          // Add stagger effect for child elements
          const children = entry.target.querySelectorAll(".stagger-child")
          children.forEach((child, index) => {
            setTimeout(() => {
              child.classList.add("animate-fade-in-up")
            }, index * 100)
          })
        }
      })
    }, observerOptions)

    // Observe all sections
    const sections = document.querySelectorAll("section")
    sections.forEach((section) => observer.observe(section))

    // Observe elements with animation classes
    const animatedElements = document.querySelectorAll(".animate-on-scroll")
    animatedElements.forEach((element) => observer.observe(element))

    return () => {
      sections.forEach((section) => observer.unobserve(section))
      animatedElements.forEach((element) => observer.unobserve(element))
    }
  }, [])

  return null
}

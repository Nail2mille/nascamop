"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Fermer le menu quand on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen])

  // Empêcher le scroll quand le menu est ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("menu-open")
      document.body.style.overflow = "hidden"
    } else {
      document.body.classList.remove("menu-open")
      document.body.style.overflow = ""
    }

    return () => {
      document.body.classList.remove("menu-open")
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const closeMenu = () => setIsOpen(false)

  const menuItems = [
    { href: "#services", label: "Services", icon: "🚀" },
    { href: "#about", label: "À propos", icon: "👋" },
    { href: "#contact", label: "Contact", icon: "💬" },
  ]

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-black/95 backdrop-blur-md border-b border-white/20 shadow-lg"
          : "bg-black/80 backdrop-blur-md border-b border-white/10",
      )}
    >
      <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center z-50 relative">
          <Image src="/images/webzy-logo.png" alt="Webzy" width={120} height={40} className="h-8 md:h-10 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="#services" className="text-sm text-white/80 hover:text-white transition-colors">
            Services
          </Link>
          <Link href="#about" className="text-sm text-white/80 hover:text-white transition-colors">
            À propos
          </Link>
          <Link href="#contact" className="text-sm text-white/80 hover:text-white transition-colors">
            Contact
          </Link>
          <Button asChild className="bg-[#5A4FFF] hover:bg-[#4A3FEF] text-white rounded-full px-6">
            <Link href="#contact">Demander un devis</Link>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          ref={buttonRef}
          className="md:hidden text-white z-50 relative menu-button p-3 rounded-xl hover:bg-white/10 transition-all duration-300"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menu"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          <div className="relative w-6 h-6">
            {/* Animated burger lines */}
            <span
              className={cn(
                "absolute block w-6 h-0.5 bg-white transition-all duration-300 ease-in-out",
                isOpen ? "top-3 rotate-45 bg-[#5A4FFF]" : "top-1.5",
              )}
            />
            <span
              className={cn(
                "absolute block w-6 h-0.5 bg-white transition-all duration-300 ease-in-out top-3",
                isOpen ? "opacity-0 scale-0" : "opacity-100 scale-100",
              )}
            />
            <span
              className={cn(
                "absolute block w-6 h-0.5 bg-white transition-all duration-300 ease-in-out",
                isOpen ? "top-3 -rotate-45 bg-[#5A4FFF]" : "top-4.5",
              )}
            />
          </div>
        </button>
      </div>

      {/* Mobile Navigation - AVEC FOND SOLIDE */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className={cn(
          "fixed top-0 right-0 h-screen w-80 max-w-[85vw] z-40 md:hidden transition-all duration-500 ease-out mobile-menu-container",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        {/* Background SOLIDE avec dégradé */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0A0A20] to-black border-l border-[#5A4FFF]/30" />

        {/* Overlay glassmorphism subtil */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-xl" />

        {/* Particules décoratives */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[#5A4FFF]/60 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Orbes lumineux */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-20 h-20 bg-[#5A4FFF]/20 rounded-full blur-xl animate-pulse" />
          <div className="absolute top-40 left-8 w-16 h-16 bg-[#7A6FFF]/15 rounded-full blur-lg animate-bounce" />
          <div className="absolute bottom-32 right-6 w-24 h-24 bg-[#5A4FFF]/15 rounded-full blur-2xl animate-pulse" />
        </div>

        {/* Menu content */}
        <div className="relative h-full flex flex-col justify-center px-8 z-10">
          {/* Logo section */}
          <div className="absolute top-8 left-8">
            <span className="text-xl font-bold bg-gradient-to-r from-white to-[#5A4FFF] bg-clip-text text-transparent">
              Menu
            </span>
          </div>

          {/* Navigation items */}
          <nav className="space-y-6">
            {menuItems.map((item, index) => (
              <div
                key={item.href}
                className={cn(
                  "transform transition-all duration-700 ease-out",
                  isOpen ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0",
                )}
                style={{ transitionDelay: `${index * 100 + 200}ms` }}
              >
                <Link
                  href={item.href}
                  onClick={closeMenu}
                  className="group flex items-center space-x-4 p-4 rounded-2xl hover:bg-white/10 transition-all duration-300"
                >
                  {/* Icon with glow effect */}
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#5A4FFF]/30 to-[#7A6FFF]/30 border border-[#5A4FFF]/50 group-hover:border-[#5A4FFF]/80 group-hover:shadow-lg group-hover:shadow-[#5A4FFF]/25 transition-all duration-300">
                    <span className="text-xl">{item.icon}</span>
                  </div>

                  {/* Text with hover effect */}
                  <div className="flex-1">
                    <span className="text-xl font-semibold text-white group-hover:text-[#5A4FFF] transition-colors duration-300">
                      {item.label}
                    </span>
                    <div className="h-0.5 w-0 bg-gradient-to-r from-[#5A4FFF] to-[#7A6FFF] group-hover:w-full transition-all duration-500 mt-1" />
                  </div>

                  {/* Arrow indicator */}
                  <div className="opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                    <svg className="w-5 h-5 text-[#5A4FFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <div
            className={cn(
              "mt-8 transform transition-all duration-700 ease-out",
              isOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
            )}
            style={{ transitionDelay: "500ms" }}
          >
            <Button
              asChild
              onClick={closeMenu}
              className="w-full bg-gradient-to-r from-[#5A4FFF] to-[#7A6FFF] hover:from-[#4A3FEF] hover:to-[#6A5FEF] text-white rounded-2xl py-4 text-lg font-semibold shadow-lg hover:shadow-xl hover:shadow-[#5A4FFF]/25 transition-all duration-300 transform hover:scale-[1.02]"
            >
              <Link href="#contact" className="flex items-center justify-center space-x-2">
                <span>Demander un devis</span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </Button>
          </div>

          {/* Footer info */}
          <div
            className={cn(
              "absolute bottom-8 left-8 right-8 text-center transform transition-all duration-700 ease-out",
              isOpen ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
            )}
            style={{ transitionDelay: "600ms" }}
          >
            <p className="text-sm text-white/70">Webzy • Design & Développement</p>
            <div className="flex justify-center space-x-4 mt-3">
              <div className="w-2 h-2 bg-[#5A4FFF] rounded-full animate-pulse" />
              <div className="w-2 h-2 bg-[#7A6FFF] rounded-full animate-pulse" style={{ animationDelay: "0.5s" }} />
              <div className="w-2 h-2 bg-[#9A8FFF] rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
            </div>
          </div>
        </div>

        {/* Border glow effect */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-[#5A4FFF] to-transparent opacity-80" />
      </div>

      {/* Backdrop overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden transition-all duration-500",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none",
        )}
        onClick={closeMenu}
        aria-hidden="true"
      />
    </header>
  )
}

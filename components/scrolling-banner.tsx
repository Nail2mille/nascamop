"use client"

import { Palette, Headphones, Zap, CheckCircle } from "lucide-react"

const messages = [
  {
    icon: <Palette className="h-5 w-5" />,
    text: "Design 100% personnalisé",
  },
  {
    icon: <Headphones className="h-5 w-5" />,
    text: "Support technique réactif",
  },
  {
    icon: <Zap className="h-5 w-5" />,
    text: "Livraison rapide & accompagnement humain",
  },
  {
    icon: <CheckCircle className="h-5 w-5" />,
    text: "Zéro prise de tête, Webzy s'occupe de tout",
  },
]

export function ScrollingBanner() {
  return (
    <div className="relative w-full py-4 overflow-hidden">
      {/* Gradient masks pour effet de fondu du texte uniquement - SANS FOND NOIR */}
      <div
        className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-transparent via-transparent to-transparent z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 40%, transparent 100%)",
          WebkitMask: "linear-gradient(to right, transparent 0%, black 100%)",
          mask: "linear-gradient(to right, transparent 0%, black 100%)",
        }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-transparent via-transparent to-transparent z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to left, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 40%, transparent 100%)",
          WebkitMask: "linear-gradient(to left, transparent 0%, black 100%)",
          mask: "linear-gradient(to left, transparent 0%, black 100%)",
        }}
      />

      {/* Contenu défilant avec interaction molette */}
      <div
        className="flex animate-scroll-continuous"
        onWheel={(e) => {
          e.preventDefault()
          const scrollContainer = e.currentTarget
          const scrollSpeed = e.deltaY > 0 ? 2 : -2
          scrollContainer.style.animationPlayState = "paused"
          scrollContainer.style.transform = `translateX(${scrollSpeed}px)`
          setTimeout(() => {
            scrollContainer.style.animationPlayState = "running"
            scrollContainer.style.transform = "translateX(0)"
          }, 100)
        }}
      >
        {/* Premier ensemble */}
        {messages.map((message, index) => (
          <div
            key={`first-${index}`}
            className="flex items-center gap-3 mx-8 whitespace-nowrap text-white/80 hover:text-white transition-colors duration-300"
          >
            <div className="text-[#5A4FFF]">{message.icon}</div>
            <span className="text-sm md:text-base font-medium">{message.text}</span>
          </div>
        ))}

        {/* Deuxième ensemble pour continuité */}
        {messages.map((message, index) => (
          <div
            key={`second-${index}`}
            className="flex items-center gap-3 mx-8 whitespace-nowrap text-white/80 hover:text-white transition-colors duration-300"
          >
            <div className="text-[#5A4FFF]">{message.icon}</div>
            <span className="text-sm md:text-base font-medium">{message.text}</span>
          </div>
        ))}

        {/* Troisième ensemble pour fluidité parfaite */}
        {messages.map((message, index) => (
          <div
            key={`third-${index}`}
            className="flex items-center gap-3 mx-8 whitespace-nowrap text-white/80 hover:text-white transition-colors duration-300"
          >
            <div className="text-[#5A4FFF]">{message.icon}</div>
            <span className="text-sm md:text-base font-medium">{message.text}</span>
          </div>
        ))}

        {/* Quatrième ensemble pour continuité parfaite */}
        {messages.map((message, index) => (
          <div
            key={`fourth-${index}`}
            className="flex items-center gap-3 mx-8 whitespace-nowrap text-white/80 hover:text-white transition-colors duration-300"
          >
            <div className="text-[#5A4FFF]">{message.icon}</div>
            <span className="text-sm md:text-base font-medium">{message.text}</span>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes scroll-continuous {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-25%);
          }
        }
        
        .animate-scroll-continuous {
          animation: scroll-continuous 30s linear infinite;
          will-change: transform;
        }
        
        .animate-scroll-continuous:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}

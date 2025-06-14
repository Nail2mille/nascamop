"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

const testimonials = [
  {
    name: "Marie L.",
    business: "Fleuriste",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "Webzy a créé un site qui reflète parfaitement l'ambiance de ma boutique. Mes clients peuvent maintenant voir mes créations en ligne avant de venir en magasin.",
    rating: 5,
  },
  {
    name: "Thomas D.",
    business: "Consultant indépendant",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "Un travail professionnel et rapide. Mon site est élégant et me permet de présenter mes services de façon claire. Je recommande !",
    rating: 5,
  },
  {
    name: "Sophie M.",
    business: "Restaurant",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "Grâce à Webzy, nous avons un site qui donne envie de venir manger chez nous. Le formulaire de réservation nous fait gagner un temps précieux.",
    rating: 5,
  },
]

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial()
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-black via-[#0A0A20] to-black relative overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Ce qu'en disent nos clients</h2>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10">
            <button
              onClick={prevTestimonial}
              className="bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
              aria-label="Témoignage précédent"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          </div>

          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="min-w-full px-4">
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                    <div className="flex items-center mb-6">
                      <div className="relative h-16 w-16 rounded-full overflow-hidden mr-4">
                        <Image
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{testimonial.name}</h3>
                        <p className="text-white/70">{testimonial.business}</p>
                        <div className="flex mt-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-[#5A4FFF] text-[#5A4FFF]" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-lg text-white/80 italic">"{testimonial.content}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-4 md:translate-x-12 z-10">
            <button
              onClick={nextTestimonial}
              className="bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
              aria-label="Témoignage suivant"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "h-2 w-2 rounded-full transition-all",
                  index === currentIndex ? "bg-[#5A4FFF] w-6" : "bg-white/30",
                )}
                aria-label={`Aller au témoignage ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

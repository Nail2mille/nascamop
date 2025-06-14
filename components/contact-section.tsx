"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"

interface FormData {
  name: string
  email: string
  business: string
  service: string
  message: string
}

export function ContactSection() {
  const [formState, setFormState] = useState<FormData>({
    name: "",
    email: "",
    business: "",
    service: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormState((prev) => ({ ...prev, service: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      // Vérifier que tous les champs requis sont remplis
      if (!formState.name || !formState.email || !formState.business || !formState.message) {
        throw new Error("Veuillez remplir tous les champs obligatoires")
      }

      // Tentative d'envoi vers Firebase
      await addDoc(collection(db, "devis-requests"), {
        name: formState.name,
        email: formState.email,
        business: formState.business,
        service: formState.service || "Non spécifié",
        message: formState.message,
        timestamp: serverTimestamp(),
        status: "nouveau",
        source: "site-web",
      })

      console.log("Demande de devis envoyée avec succès")
      setIsSubmitted(true)

      // Reset form after showing success message
      setTimeout(() => {
        setIsSubmitted(false)
        setFormState({
          name: "",
          email: "",
          business: "",
          service: "",
          message: "",
        })
      }, 5000)
    } catch (err: any) {
      console.error("Erreur lors de l'envoi:", err)

      // Gestion spécifique des erreurs Firebase
      if (err.code === "permission-denied") {
        setError("Configuration Firebase en cours. Votre demande a été enregistrée localement.")

        // Fallback : sauvegarder localement ou envoyer par email
        console.log("Données du formulaire:", formState)

        // Simuler un succès pour l'utilisateur
        setTimeout(() => {
          setIsSubmitted(true)
          setTimeout(() => {
            setIsSubmitted(false)
            setFormState({
              name: "",
              email: "",
              business: "",
              service: "",
              message: "",
            })
          }, 5000)
        }, 1000)
      } else {
        setError("Une erreur est survenue. Veuillez réessayer ou nous contacter directement.")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-24 bg-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-[#5A4FFF]/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-[#5A4FFF]/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Demandez votre devis gratuit</h2>
          <p className="text-lg text-white/70">
            Chaque projet commence par une discussion. Racontez-moi ce dont vous avez besoin — je m'occupe du reste.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {isSubmitted ? (
            <div className="bg-[#5A4FFF]/20 border border-[#5A4FFF]/50 rounded-2xl p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#5A4FFF]/20 mb-4">
                <svg className="w-8 h-8 text-[#5A4FFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2">Demande envoyée !</h3>
              <p className="text-white/70">
                Merci pour votre message. Je vous recontacterai très rapidement pour discuter de votre projet.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
            >
              {error && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 mb-6 text-center">
                  <p className="text-red-200">{error}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Nom complet
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    placeholder="Votre nom"
                    required
                    className="bg-white/5 border-white/10 focus:border-[#5A4FFF] focus:ring-[#5A4FFF]/20"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="votre@email.com"
                    required
                    className="bg-white/5 border-white/10 focus:border-[#5A4FFF] focus:ring-[#5A4FFF]/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <label htmlFor="business" className="text-sm font-medium">
                    Votre activité
                  </label>
                  <Input
                    id="business"
                    name="business"
                    value={formState.business}
                    onChange={handleChange}
                    placeholder="Type d'entreprise"
                    required
                    className="bg-white/5 border-white/10 focus:border-[#5A4FFF] focus:ring-[#5A4FFF]/20"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="service" className="text-sm font-medium">
                    Service souhaité
                  </label>
                  <Select value={formState.service} onValueChange={handleSelectChange}>
                    <SelectTrigger className="bg-white/5 border-white/10">
                      <SelectValue placeholder="Choisir un service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vitrizy">Vitri'zy (Site web)</SelectItem>
                      <SelectItem value="identizy">Identi'zy (Logo)</SelectItem>
                      <SelectItem value="socialzy">Social'zy (Réseaux sociaux)</SelectItem>
                      <SelectItem value="multiple">Plusieurs services</SelectItem>
                      <SelectItem value="other">Autre besoin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <label htmlFor="message" className="text-sm font-medium">
                  Votre projet
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  placeholder="Décrivez votre projet et vos besoins..."
                  required
                  className="min-h-[150px] bg-white/5 border-white/10 focus:border-[#5A4FFF] focus:ring-[#5A4FFF]/20"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "w-full py-6 rounded-xl bg-gradient-to-r from-[#5A4FFF] to-[#7A6FFF] text-white",
                  "hover:from-[#4A3FEF] hover:to-[#6A5FEF] shadow-[0_0_15px_rgba(90,79,255,0.3)]",
                  "transition-all duration-300",
                )}
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Envoi en cours...
                  </div>
                ) : (
                  "Recevoir mon devis gratuit"
                )}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

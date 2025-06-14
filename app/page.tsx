import { EnhancedBenefitsSection } from "@/components/enhanced-benefits-section"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { AboutSection } from "@/components/about-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { ContactSection } from "@/components/contact-section-fixed"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { ScrollAnimations } from "@/components/scroll-animations"
import { MobileScrollEffects } from "@/components/mobile-scroll-effects"
import { CustomCursor } from "@/components/custom-cursor"
import { ParallaxEffect } from "@/components/parallax-effect"
import { AnimatedBackground } from "@/components/animated-background"
import { ScrollProgress } from "@/components/scroll-progress"
import { LoadingAnimation } from "@/components/loading-animation"
import { ProcessTimeline } from "@/components/process-timeline"
import { CodeShowcase } from "@/components/code-showcase"

export default function Home() {
  return (
    <div className="min-h-screen text-white">
      <LoadingAnimation />
      <Navbar />
      <ScrollProgress />
      <div className="section-seamless">
        <HeroSection />
        <EnhancedBenefitsSection />
        <AboutSection />
        <ServicesSection />
        <ProcessTimeline />
        <CodeShowcase />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
      </div>
      <ScrollAnimations />
      <MobileScrollEffects />
      <CustomCursor />
      <ParallaxEffect />
      <AnimatedBackground />
    </div>
  )
}

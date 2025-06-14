import Link from "next/link"
import { Mail, MapPin, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#0A0A20] to-black border-t border-white/5 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-[#5A4FFF] bg-clip-text text-transparent">
                Webzy
              </span>
            </Link>
            <p className="text-white/70 mb-4">
              Des sites web professionnels et des identités visuelles qui font briller votre entreprise.
            </p>
            <div className="flex space-x-4 mt-4">
              <div className="w-3 h-3 bg-[#5A4FFF] rounded-full animate-pulse" />
              <div className="w-3 h-3 bg-[#7A6FFF] rounded-full animate-pulse" style={{ animationDelay: "0.5s" }} />
              <div className="w-3 h-3 bg-[#9A8FFF] rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-[#5A4FFF] mr-2 mt-0.5 flex-shrink-0" />
                <a href="mailto:nail2mille@gmail.com" className="text-white/70 hover:text-white transition-colors">
                  nail2mille@gmail.com
                </a>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-[#5A4FFF] mr-2 mt-0.5 flex-shrink-0" />
                <a href="tel:0695656378" className="text-white/70 hover:text-white transition-colors">
                  06 95 65 63 78
                </a>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-[#5A4FFF] mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-white/70">France</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center">
          <p className="text-white/50 text-sm">&copy; {new Date().getFullYear()} Webzy. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}

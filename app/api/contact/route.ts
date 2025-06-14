import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Log des données reçues
    console.log("📧 Nouvelle demande de devis:", {
      name: data.name,
      email: data.email,
      business: data.business,
      service: data.service,
      message: data.message,
      timestamp: data.timestamp,
    })

    // Ici vous pouvez ajouter l'envoi d'email
    // Par exemple avec Resend, SendGrid, ou Nodemailer

    return NextResponse.json({ success: true, message: "Demande reçue" })
  } catch (error) {
    console.error("Erreur API contact:", error)
    return NextResponse.json({ success: false, error: "Erreur serveur" }, { status: 500 })
  }
}

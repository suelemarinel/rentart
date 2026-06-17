import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import "./globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Rentart — Location d'œuvres d'art",
  description: "Louez des œuvres d'art originales pour votre établissement.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}

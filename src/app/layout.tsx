import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import "./globals.css"
import type { Metadata } from "next"
import { Cormorant_Garamond } from "next/font/google"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
})

export const metadata: Metadata = {
  title: {
    default: "Rentart — Location d'œuvres d'art",
    template: '%s — Rentart',
  },
  description: "Louez des œuvres d'art originales pour votre restaurant, hôtel ou espace professionnel. Service tout compris par Galerie Sept, Bruxelles & Knokke.",
  openGraph: {
    siteName: 'Rentart',
    locale: 'fr_BE',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={cormorant.variable}>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}

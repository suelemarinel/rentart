'use client'

import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: { url: string; parentElement: HTMLElement; prefill?: object }) => void
    }
  }
}

const CALENDLY_URL = 'https://calendly.com/sue-lemarinel/30min?hide_event_type_details=1&hide_gdpr_banner=1'
const SCRIPT_ID = 'calendly-widget-script'
const SCRIPT_SRC = 'https://assets.calendly.com/assets/external/widget.js'

export default function CalendlyWidget() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    function renderWidget() {
      // On vide le conteneur avant de réinitialiser, pour éviter les doublons
      // si le composant est remonté (navigation interne, retour arrière...)
      if (container) container.innerHTML = ''
      window.Calendly?.initInlineWidget({
        url: CALENDLY_URL,
        parentElement: container!,
      })
    }

    const existingScript = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null

    if (window.Calendly) {
      // Le script est déjà chargé (navigation précédente) — on initialise directement
      renderWidget()
    } else if (existingScript) {
      // Le script est en cours de chargement — on attend qu'il finisse
      existingScript.addEventListener('load', renderWidget)
      return () => existingScript.removeEventListener('load', renderWidget)
    } else {
      // Premier chargement du script sur cette session
      const script = document.createElement('script')
      script.id = SCRIPT_ID
      script.src = SCRIPT_SRC
      script.async = true
      script.addEventListener('load', renderWidget)
      document.body.appendChild(script)
    }
  }, [])

  return (
    <div ref={containerRef} style={{ minWidth: '280px', height: '700px' }} />
  )
}
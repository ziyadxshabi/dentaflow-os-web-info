const ITEMS = [
  '12 500 MAD PERDUS PAR MOIS AVEC 1 ABSENCE PAR JOUR',
  '40 À 60% DES DEVIS JAMAIS PLANIFIÉS',
  '98% DE TAUX D\'OUVERTURE SUR WHATSAPP',
  '4 HEURES POUR COMBLER UNE ANNULATION',
  '1 IMPLANT RÉCUPÉRÉ REMBOURSE L\'ANNÉE',
  '15 MIN DE RELANCE MANUELLE PAR PATIENT',
]

export function StatsTicker() {
  const row = [...ITEMS, ...ITEMS]
  return (
    <div className="edge-fade-x relative overflow-hidden border-y border-white/[0.07] py-5">
      <div
        className="flex w-max animate-[ticker-scroll_36s_linear_infinite] items-center gap-10 whitespace-nowrap pr-10"
        aria-hidden
      >
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="font-mono-df text-[0.66rem] tracking-[0.24em] text-[#f2f2f2]/50">
              {item}
            </span>
            <span className="text-[#e8e8e8]/60">◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}

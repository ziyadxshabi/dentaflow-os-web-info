import type { ReactNode } from 'react'
import { Reveal } from '@/components/Reveal'

function Card({
  label,
  title,
  body,
  className = '',
  children,
  delay = 0,
}: {
  label: string
  title: string
  body: string
  className?: string
  children?: ReactNode
  delay?: number
}) {
  return (
    <Reveal delay={delay} y={36} className={className}>
      <div
        data-cursor="hover"
        className="glass-surface group relative h-full overflow-hidden rounded-[22px] p-7 transition-colors duration-500 hover:border-white/25 md:p-8"
      >
        <div
          className="pointer-events-none absolute -top-20 left-1/2 h-40 w-72 -translate-x-1/2 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
          style={{ background: 'rgba(255,255,255,0.12)' }}
        />
        <p className="font-mono-df text-[0.6rem] tracking-[0.28em] text-[#e8e8e8]/80">{label}</p>
        <h3 className="font-display mt-3 text-xl font-semibold tracking-tight text-[#f2f2f2]">
          {title}
        </h3>
        <p className="mt-2.5 text-sm leading-relaxed text-[#f2f2f2]/55">{body}</p>
        {children}
      </div>
    </Reveal>
  )
}

export function Capabilities() {
  return (
    <section className="mx-auto max-w-[1600px] px-5 py-[10vh] md:px-[2.03vw] md:py-[14vh]">
      <Reveal>
        <p className="mono-label">[ CE QUE VOUS Y GAGNEZ ]</p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="font-display mt-5 max-w-2xl text-[clamp(1.9rem,3.6vw,3rem)] font-semibold leading-[1.05] tracking-[-0.025em] text-[#f2f2f2]">
          Pensé pour votre cabinet. Pas pour vos informaticiens.
        </h2>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        <Card
          label="CANAL Nº1 AU MAROC"
          title="Vos patients répondent sur WhatsApp"
          body="Confirmations, rappels et relances arrivent là où vos patients lisent vraiment. Ouvert en quelques minutes, répondu dans la foulée."
          className="lg:col-span-2"
          delay={0}
        >
          <div className="mt-6 flex flex-wrap gap-2">
            {['CONFIRMATION J-2', 'RAPPEL J-1', 'RELANCE DEVIS', 'LISTE D\'ATTENTE'].map((tag) => (
              <span
                key={tag}
                className="glass-chip rounded-full px-3.5 py-1.5 font-mono-df text-[0.6rem] tracking-[0.18em] text-[#f2f2f2]/65"
              >
                {tag}
              </span>
            ))}
          </div>
        </Card>

        <Card
          label="DEVIS"
          title="Chaque devis est relancé"
          body="Un devis accepté reste rarement dans la tête du patient. DentaFlow le suit et le relance jusqu'à ce qu'il soit planifié."
          delay={0.08}
        />

        <Card
          label="ANNULATIONS"
          title="Les trous se comblent seuls"
          body="Votre liste d'attente travaille pour vous. Le bon patient est contacté dans les minutes qui suivent une annulation."
          delay={0.16}
        />

        <Card
          label="VISIBILITÉ"
          title="Votre argent, enfin visible"
          body="Chaque dirham récupéré est attribué: par praticien, par acte, par relance. Vous savez ce que le système vous rapporte."
          delay={0.24}
        />

        <Card
          label="SIMPLICITÉ"
          title="Zéro changement d'habitudes"
          body="DentaFlow se pose sur votre façon de travailler actuelle. Pas de migration de dossiers, pas de formation interminable."
          delay={0.32}
        />
      </div>

      <Reveal delay={0.1} className="mt-5">
        <div className="rounded-[22px] border border-dashed border-white/[0.12] p-6 md:p-7">
          <p className="font-mono-df text-[0.62rem] leading-relaxed tracking-[0.2em] text-[#f2f2f2]/40">
            VOS DONNÉES PATIENTS RESTENT CHIFFRÉES ET SOUS VOTRE CONTRÔLE. POINT.
          </p>
        </div>
      </Reveal>
    </section>
  )
}

import { Reveal, LineReveal } from '@/components/Reveal'
import { CountUp } from '@/components/CountUp'

const STATS = [
  { value: 12500, suffix: ' MAD', label: 'PERDUS CHAQUE MOIS AVEC UNE SEULE ABSENCE PAR JOUR' },
  { value: 60, prefix: '≤', suffix: '%', label: 'DES DEVIS ACCEPTÉS NE SONT JAMAIS PLANIFIÉS' },
  { value: 98, suffix: '%', label: 'DE TAUX D\'OUVERTURE MOYEN SUR WHATSAPP' },
  { value: 15, suffix: ' min', label: 'DE TRAVAIL ADMINISTRATIF PAR PATIENT RELANCÉ À LA MAIN' },
]

export function Manifesto() {
  return (
    <section id="leak" className="relative mx-auto max-w-[1600px] px-5 py-[16vh] md:px-[2.03vw] md:py-[22vh]">
      <Reveal>
        <p className="mono-label mb-14 md:mb-20">[ 01 · LA FUITE ]</p>
      </Reveal>

      <div className="font-display max-w-6xl text-[clamp(1.9rem,4.6vw,4.1rem)] font-medium leading-[1.12] tracking-[-0.02em]">
        <LineReveal text="Un patient absent n'est pas un trou dans l'agenda." className="text-[#f2f2f2]" />
        <LineReveal
          text="Ce sont 500 à 1 500 MAD de production qui s'envolent avec lui."
          className="mt-5 text-[#f2f2f2]/45"
          delay={0.15}
        />
        <LineReveal
          text="Un devis signé puis oublié coûte encore plus cher."
          className="mt-5 text-[#f2f2f2]/45"
          delay={0.3}
        />
        <LineReveal
          text="La plupart des cabinets ne le voient jamais partir."
          className="mt-5 font-semibold text-white text-glow-mint"
          delay={0.45}
        />
      </div>

      {/* Evidence grid */}
      <div className="mt-24 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-4 md:mt-36">
        {STATS.map((stat, i) => (
          <div key={i} className="bg-[#0b0b0b] p-8 md:p-10">
            <Reveal delay={i * 0.08} y={24}>
              <div className="font-display text-4xl font-semibold tracking-tight text-[#f2f2f2] md:text-[2.6rem]">
                <CountUp
                  value={stat.value}
                  prefix={stat.prefix ?? ''}
                  suffix={stat.suffix ?? ''}
                />
              </div>
              <p className="font-mono-df mt-4 text-[0.62rem] leading-relaxed tracking-[0.18em] text-[#f2f2f2]/40">
                {stat.label}
              </p>
            </Reveal>
          </div>
        ))}
      </div>

      <Reveal delay={0.2} className="mt-10">
        <p className="font-mono-df text-[0.62rem] tracking-[0.22em] text-[#f2f2f2]/30">
          HYPOTHÈSES · CABINET TYPE · 25 JOURS OUVRÉS · BENCHMARKS SECTEUR 2024–2026
        </p>
      </Reveal>
    </section>
  )
}

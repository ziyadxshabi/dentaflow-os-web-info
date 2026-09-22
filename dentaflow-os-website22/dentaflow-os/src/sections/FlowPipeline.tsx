import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { Reveal } from '@/components/Reveal'

const STATES = [
  { id: 'NOUVEAU', note: 'Premier contact capturé' },
  { id: 'PLANIFIÉ', note: 'Créneau réservé' },
  { id: 'CONFIRMÉ', note: 'Patient verrouillé' },
  { id: 'AU FAUTEUIL', note: 'Production en cours' },
  { id: 'TRAITÉ', note: 'Soins terminés' },
  { id: 'RAPPELÉ', note: 'Contrôle à 6 mois planifié' },
]

function StateNode({
  index,
  progress,
}: {
  index: number
  progress: MotionValue<number>
}) {
  const start = 0.12 + index * 0.13
  const opacity = useTransform(progress, [start, start + 0.09], [0.22, 1])
  const scale = useTransform(progress, [start, start + 0.09], [0.8, 1])
  const glowOpacity = useTransform(progress, [start, start + 0.09], [0, 1])
  const dotColor = useTransform(progress, (p) =>
    p >= start + 0.09 ? '#ffffff' : 'rgba(255,255,255,0.14)',
  )

  return (
    <div className="relative flex flex-col items-center gap-3">
      <motion.div
        style={{ scale, opacity }}
        className="glass-chip relative flex h-12 w-12 items-center justify-center rounded-full md:h-14 md:w-14"
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            opacity: glowOpacity,
            boxShadow: '0 0 24px rgba(255,255,255,0.4), inset 0 0 12px rgba(255,255,255,0.18)',
          }}
        />
        <motion.span
          style={{ backgroundColor: dotColor }}
          className="h-2 w-2 rounded-full"
        />
      </motion.div>
      <motion.div style={{ opacity }} className="text-center">
        <p className="font-mono-df text-[0.6rem] tracking-[0.18em] text-[#f2f2f2]/85 md:text-[0.64rem]">
          {STATES[index].id}
        </p>
        <p className="mt-1 hidden max-w-[110px] text-[0.66rem] leading-snug text-[#f2f2f2]/35 md:block">
          {STATES[index].note}
        </p>
      </motion.div>
    </div>
  )
}

export function FlowPipeline() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end 0.35'],
  })

  const lineScale = useTransform(scrollYProgress, [0.12, 0.87], ['0%', '100%'])

  return (
    <section ref={ref} className="relative mx-auto max-w-[1600px] px-5 py-[14vh] md:px-[2.03vw] md:py-[20vh]">
      <Reveal>
        <p className="mono-label">[ 03 · LE FLUX ]</p>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="font-display mt-5 max-w-3xl text-[clamp(2rem,4.2vw,3.6rem)] font-semibold leading-[1.04] tracking-[-0.025em] text-[#f2f2f2]">
          Chaque patient, dans un état précis.
          <span className="block text-[#f2f2f2]/40">Personne ne passe à travers.</span>
        </h2>
      </Reveal>

      <div className="relative mt-20 md:mt-28">
        {/* track */}
        <div className="absolute left-6 right-6 top-6 h-px bg-white/[0.09] md:top-7" />
        <motion.div
          className="absolute left-6 right-6 top-6 h-px origin-left md:top-7"
          style={{
            width: lineScale,
            background:
              'linear-gradient(90deg, rgba(255,255,255,0.15), rgba(255,255,255,0.9))',
            boxShadow: '0 0 14px rgba(255,255,255,0.45)',
          }}
        />
        <div className="relative grid grid-cols-3 gap-y-14 md:grid-cols-6 md:gap-y-0">
          {STATES.map((_, i) => (
            <StateNode key={i} index={i} progress={scrollYProgress} />
          ))}
        </div>
      </div>

      <Reveal delay={0.15} className="mt-20 md:mt-24">
        <p className="max-w-lg text-sm leading-relaxed text-[#f2f2f2]/45">
          La plupart des logiciels enregistrent ce qui s'est passé. DentaFlow suit
          ce qui est <em className="not-italic text-[#f2f2f2]/75">sur le point</em> de se
          passer et agit avant que le créneau ne soit perdu.
        </p>
      </Reveal>
    </section>
  )
}

import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'

const LAYERS = [
  {
    id: '01',
    name: 'RÉCUPÉRATION DE PATIENTS',
    title: 'Il retrouve l\'argent que vous avez déjà gagné.',
    body: 'Les devis acceptés puis jamais planifiés sont le trésor caché de votre cabinet. DentaFlow les retrouve, les classe par valeur et par ancienneté, puis relance chaque patient sur WhatsApp jusqu\'à la prise de rendez-vous.',
    stat: '30 À 40% DES TRAITEMENTS NON PLANIFIÉS SE RÉCUPÈRENT EN 90 JOURS',
  },
  {
    id: '02',
    name: 'PLANNING INTELLIGENT',
    title: 'L\'agenda se défend tout seul.',
    body: 'Confirmations et rappels automatiques sur WhatsApp. Une annulation détectée à 14h est comblée à 14h02 avec le bon patient. Pas le lundi suivant.',
    stat: 'LA PLUPART DES CRÉNEAUX ANNULÉS SE COMBLENT DANS LES 4 HEURES',
  },
  {
    id: '03',
    name: 'SUIVI DU FLUX PATIENTS',
    title: 'Chaque dossier sait où il en est.',
    body: 'Chaque patient existe dans un état précis: nouveau, planifié, confirmé, au fauteuil, traité, rappelé. Personne ne tombe entre deux visites. Personne n\'est oublié.',
    stat: 'UN HISTORIQUE COMPLET POUR CHAQUE PATIENT, DU PREMIER APPEL AU RAPPEL',
  },
]

function LayerCard({
  index,
  progress,
}: {
  index: number
  progress: MotionValue<number>
}) {
  const n = LAYERS.length
  const enterStart = index * (0.75 / n) + 0.04
  const enterEnd = enterStart + 0.16
  const nextEnter = index < n - 1 ? enterStart + 0.25 : 1.2

  const opacity = useTransform(progress, [enterStart, enterEnd], [0, 1])
  const y = useTransform(
    progress,
    [enterStart, enterEnd, nextEnter, nextEnter + 0.14],
    [110, 0, 0, -26],
  )
  const scale = useTransform(
    progress,
    [enterStart, enterEnd, nextEnter, nextEnter + 0.14],
    [0.93, 1, 1, 0.95],
  )
  const brightness = useTransform(
    progress,
    [nextEnter, nextEnter + 0.14],
    [1, 0.45],
  )
  const filter = useTransform(brightness, (b) => `brightness(${b})`)

  return (
    <div className="absolute inset-x-0 top-1/2 mx-auto w-full max-w-xl -translate-y-1/2">
      <motion.article
        style={{ opacity, y, scale, filter, willChange: 'transform, opacity, filter' }}
        className="glass-surface overflow-hidden rounded-[22px]"
      >
      {/* glowing top edge */}
      <div
        className="h-px w-full"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(255,255,255,0.85) 50%, transparent)',
        }}
      />
      <div className="p-7 md:p-9">
        <div className="flex items-center justify-between">
          <span className="mono-label">SYSTÈME {LAYERS[index].id}</span>
          <span className="font-mono-df text-[0.6rem] tracking-[0.2em] text-[#e8e8e8]/60">
            ● ACTIF
          </span>
        </div>
        <h3 className="font-display mt-4 text-2xl font-semibold tracking-tight text-[#f2f2f2] md:text-[1.7rem]">
          {LAYERS[index].name}
        </h3>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-[#f2f2f2]/60">
          {LAYERS[index].body}
        </p>

        {/* code-drawn mini visual per layer */}
        <div className="mt-6 rounded-xl border border-white/[0.06] bg-black/30 p-4">
          {index === 0 && (
            <div className="space-y-2.5">
              {[
                { name: 'Couronne · Pat. 2841', days: 'DEVIS DEPUIS 63 J', val: '4 800 MAD', hot: true },
                { name: 'Implant · Pat. 1092', days: 'DEVIS DEPUIS 41 J', val: '9 200 MAD', hot: true },
                { name: 'Paro · Pat. 3307', days: 'RELANCE ENVOYÉE', val: '1 600 MAD', hot: false },
              ].map((row) => (
                <div key={row.name} className="flex items-center justify-between gap-2 text-xs">
                  <span className="text-[#f2f2f2]/75">{row.name}</span>
                  <span
                    className={`font-mono-df text-[0.58rem] tracking-[0.14em] ${
                      row.hot ? 'text-white' : 'text-white/50'
                    }`}
                  >
                    {row.days}
                  </span>
                  <span className="font-mono-df text-[#f2f2f2]/85">{row.val}</span>
                </div>
              ))}
              <div className="border-t border-white/[0.07] pt-2.5 text-right">
                <span className="font-mono-df text-[0.62rem] tracking-[0.18em] text-white">
                  RÉCUPÉRABLE · 15 600 MAD
                </span>
              </div>
            </div>
          )}
          {index === 1 && (
            <div className="grid grid-cols-4 gap-1.5 text-center">
              {['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'].map(
                (t, i) => (
                  <div
                    key={t}
                    className={`rounded-md px-1 py-2.5 font-mono-df text-[0.58rem] tracking-wider ${
                      i === 2
                        ? 'border border-[#8fdcb0]/45 bg-[#8fdcb0]/10 text-[#8fdcb0]'
                        : i === 5
                          ? 'border border-dashed border-white/15 text-white/25'
                          : 'bg-white/[0.05] text-[#f2f2f2]/55'
                    }`}
                  >
                    {t}
                    {i === 2 && <div className="mt-1 text-[0.5rem]">COMBLÉ ◆</div>}
                    {i === 5 && <div className="mt-1 text-[0.5rem]">LIBRE</div>}
                  </div>
                ),
              )}
            </div>
          )}
          {index === 2 && (
            <div>
              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="text-[#f2f2f2]/80">Patiente 2841 · M. Alaoui</span>
                <span className="font-mono-df whitespace-nowrap rounded-full border border-white/40 bg-white/10 px-2 py-0.5 text-[0.55rem] tracking-[0.16em] text-white">
                  CONFIRMÉE
                </span>
              </div>
              <div className="mt-3.5 flex items-center gap-1">
                {['NOUV', 'PLANIF', 'CONF', 'FAUTEUIL', 'TRAITÉ', 'RAPPEL'].map((s, i) => (
                  <div key={s} className="flex flex-1 items-center gap-1">
                    <div
                      className={`h-1.5 flex-1 rounded-full ${
                        i <= 2 ? 'bg-white' : 'bg-white/10'
                      }`}
                      style={i <= 2 ? { opacity: 0.35 + i * 0.32 } : undefined}
                    />
                  </div>
                ))}
              </div>
              <div className="font-mono-df mt-2 flex justify-between text-[0.5rem] tracking-[0.12em] text-[#f2f2f2]/35">
                <span>NOUVEAU</span>
                <span>RAPPELÉ</span>
              </div>
            </div>
          )}
        </div>

        <p className="font-mono-df mt-5 text-[0.62rem] leading-relaxed tracking-[0.16em] text-[#f2f2f2]/40">
          {LAYERS[index].stat}
        </p>
      </div>
      </motion.article>
    </div>
  )
}

export function StackSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  const railFill = useTransform(scrollYProgress, [0.04, 0.92], ['0%', '100%'])
  const headerOpacity = useTransform(scrollYProgress, [0, 0.06], [0, 1])
  const headerY = useTransform(scrollYProgress, [0, 0.06], [30, 0])

  return (
    <section ref={ref} className="relative" style={{ height: '380vh' }}>
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        {/* ambient glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 45% at 72% 50%, rgba(255,255,255,0.04) 0%, rgba(10,10,10,0) 65%)',
          }}
        />

        <div className="mx-auto grid w-full max-w-[1600px] flex-1 grid-cols-1 items-center gap-10 px-5 pt-24 md:px-[2.03vw] lg:grid-cols-[1fr_1.1fr] lg:gap-6 lg:pt-0">
          {/* Left: heading + progress rail */}
          <div className="relative z-10">
            <motion.p style={{ opacity: headerOpacity, y: headerY }} className="mono-label">
              [ 02 · LA RÉPONSE ]
            </motion.p>
            <motion.h2
              style={{ opacity: headerOpacity, y: headerY }}
              className="font-display mt-5 text-[clamp(2.1rem,4.5vw,3.9rem)] font-semibold leading-[1.02] tracking-[-0.025em] text-[#f2f2f2]"
            >
              Trois systèmes.
              <span className="block text-[#f2f2f2]/40">Un seul flux.</span>
            </motion.h2>

            <div className="mt-10 hidden gap-5 lg:flex">
              {/* progress rail */}
              <div className="relative w-px self-stretch bg-white/10">
                <motion.div
                  className="absolute left-0 top-0 w-px bg-white"
                  style={{ height: railFill }}
                />
              </div>
              <div className="flex flex-col justify-between gap-8 py-1">
                {LAYERS.map((layer, i) => (
                  <RailItem key={layer.id} index={i} progress={scrollYProgress} name={layer.name} title={layer.title} />
                ))}
              </div>
            </div>
          </div>

          {/* Right: the scroll-driven card stack */}
          <div className="relative h-[62vh] min-h-[420px] lg:h-screen">
            {LAYERS.map((_, i) => (
              <LayerCard key={i} index={i} progress={scrollYProgress} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function RailItem({
  index,
  progress,
  name,
  title,
}: {
  index: number
  progress: MotionValue<number>
  name: string
  title: string
}) {
  const n = LAYERS.length
  const center = index * (0.75 / n) + 0.12
  const opacity = useTransform(
    progress,
    [center - 0.1, center, center + 0.22, center + 0.3],
    index === n - 1 ? [0.3, 1, 1, 1] : [0.3, 1, 1, 0.3],
  )

  return (
    <motion.div style={{ opacity }} className="max-w-sm">
      <p className="font-mono-df text-[0.62rem] tracking-[0.28em] text-[#e8e8e8]">
        {name}
      </p>
      <p className="font-display mt-1.5 text-lg font-medium tracking-tight text-[#f2f2f2]">
        {title}
      </p>
    </motion.div>
  )
}

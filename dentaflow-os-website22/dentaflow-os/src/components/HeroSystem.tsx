import { useEffect } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from 'framer-motion'

const SCHEDULE = [
  { time: '09:00', patient: 'Y. El Amrani', treatment: 'Couronne céramique', status: 'CONFIRMÉ' },
  { time: '10:00', patient: 'S. Benali', treatment: 'Détartrage', status: 'CONFIRMÉ' },
  { time: '11:00', patient: 'Libre', treatment: 'Créneau libéré il y a 14 min', status: 'RELANCE' },
  { time: '12:00', patient: 'K. Tazi', treatment: 'Consultation implant', status: 'DEVIS' },
]

const PIPELINE = [
  { state: 'NOUVEAU', count: 4 },
  { state: 'PLANIFIÉ', count: 12 },
  { state: 'CONFIRMÉ', count: 9 },
  { state: 'FAUTEUIL', count: 2 },
  { state: 'TRAITÉ', count: 7 },
  { state: 'RAPPELÉ', count: 18 },
]

function StatusChip({ status }: { status: string }) {
  if (status === 'CONFIRMÉ') {
    return (
      <span className="whitespace-nowrap rounded-full bg-[#8fdcb0] px-2 py-0.5 font-mono-df text-[0.5rem] tracking-[0.14em] text-[#07130c]">
        CONFIRMÉ
      </span>
    )
  }
  if (status === 'RELANCE') {
    return (
      <span className="flex animate-pulse items-center gap-1 whitespace-nowrap rounded-full border border-[#f2cd88]/50 px-2 py-0.5 font-mono-df text-[0.5rem] tracking-[0.14em] text-[#f2cd88]">
        <span className="h-1 w-1 rounded-full bg-[#f2cd88]" />
        RELANCE
      </span>
    )
  }
  return (
    <span className="whitespace-nowrap rounded-full border border-[#f2cd88]/25 px-2 py-0.5 font-mono-df text-[0.5rem] tracking-[0.14em] text-[#f2cd88]/70">
      {status}
    </span>
  )
}

function SatelliteChip({
  children,
  className,
  delay,
}: {
  children: React.ReactNode
  className: string
  delay: string
}) {
  return (
    <div
      className={`glass-chip absolute z-20 hidden items-center gap-2 rounded-full px-4 py-2.5 lg:flex ${className}`}
      style={{ animation: `float-slow 7s ease-in-out infinite`, animationDelay: delay }}
    >
      {children}
    </div>
  )
}

/** Hero centerpiece: a floating practice-management console · makes the product obvious. */
export function HeroSystem() {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), { stiffness: 55, damping: 16 })
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), { stiffness: 55, damping: 16 })

  const { scrollY } = useScroll()
  const driftY = useTransform(scrollY, [0, 900], [0, -110])
  const fade = useTransform(scrollY, [0, 700], [1, 0.25])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5)
      my.set(e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [mx, my])

  return (
    <motion.div
      style={{ y: driftY, opacity: fade }}
      className="relative flex h-full items-center justify-center [perspective:1600px]"
    >
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.3, delay: 0.35, ease: [0.19, 1, 0.22, 1] }}
        className="relative"
      >
        <motion.div
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d', willChange: 'transform' }}
          className="relative w-[min(600px,92vw)]"
        >
          {/* Main console panel */}
          <div
            className="glass-surface relative overflow-hidden rounded-[22px]"
            style={{ boxShadow: '0 40px 90px rgba(0,0,0,0.75), 0 4px 18px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07)' }}
          >
            {/* top edge glint */}
            <div
              className="h-px w-full"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.7) 50%, transparent)' }}
            />
            {/* window chrome */}
            <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-3">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-white/20" />
                <span className="h-2 w-2 rounded-full bg-white/20" />
                <span className="h-2 w-2 rounded-full bg-white/60" />
              </div>
              <span className="font-mono-df text-[0.56rem] tracking-[0.24em] text-white/45">
                DENTAFLOW OS · EN DIRECT
              </span>
              <span className="font-mono-df hidden text-[0.56rem] tracking-[0.18em] text-white/30 sm:block">
                MAR 09:41
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-[1.35fr_1fr]">
              {/* schedule column */}
              <div className="p-4 sm:border-r sm:border-white/[0.07]">
                <p className="font-mono-df mb-3 text-[0.54rem] tracking-[0.26em] text-white/35">
                  PLANNING DU JOUR
                </p>
                <div className="space-y-2">
                  {SCHEDULE.map((row, i) => (
                    <div
                      key={row.time}
                      className={`items-center justify-between gap-2 rounded-lg border border-white/[0.05] bg-white/[0.03] px-3 py-2.5 ${
                        i === 3 ? 'hidden sm:flex' : 'flex'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono-df text-[0.6rem] text-white/40">{row.time}</span>
                        <div>
                          <p className="text-[0.7rem] font-medium leading-tight text-white/85">
                            {row.patient}
                          </p>
                          <p className="text-[0.58rem] leading-tight text-white/35">
                            {row.treatment}
                          </p>
                        </div>
                      </div>
                      <StatusChip status={row.status} />
                    </div>
                  ))}
                </div>
              </div>

              {/* recovery + pipeline column */}
              <div className="hidden flex-col p-4 sm:flex">
                <p className="font-mono-df text-[0.54rem] tracking-[0.26em] text-white/35">
                  RÉCUPÉRÉ CE MOIS-CI
                </p>
                <p className="font-display mt-1.5 text-[1.6rem] font-semibold leading-none tracking-tight text-white">
                  18 400 <span className="text-[0.85rem] font-medium text-white/60">MAD</span>
                </p>
                <div className="mt-2 flex items-end justify-between gap-2">
                  <svg viewBox="0 0 72 28" className="h-7 w-24" aria-hidden>
                    <polyline
                      points="0,26 12,23 24,24 36,17 48,19 60,10 72,4"
                      fill="none"
                      stroke="rgba(255,255,255,0.75)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="font-mono-df whitespace-nowrap text-[0.54rem] tracking-[0.12em] text-white/50">
                    +3 500 AUJOURD'HUI
                  </span>
                </div>

                <div className="mt-4 border-t border-white/[0.07] pt-3">
                  <p className="font-mono-df mb-2 text-[0.54rem] tracking-[0.26em] text-white/35">
                    FLUX PATIENTS
                  </p>
                  <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
                    {PIPELINE.map((p) => (
                      <div key={p.state} className="flex items-center justify-between">
                        <span className="font-mono-df text-[0.52rem] tracking-[0.14em] text-white/40">
                          {p.state}
                        </span>
                        <span
                          className={`font-mono-df text-[0.6rem] ${
                            p.state === 'CONFIRMÉ'
                              ? 'text-[#8fdcb0]'
                              : p.state === 'RAPPELÉ'
                                ? 'text-[#f2cd88]'
                                : 'text-white/85'
                          }`}
                        >
                          {p.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* mobile recovery strip */}
            <div className="flex items-center justify-between border-t border-white/[0.07] px-5 py-3 sm:hidden">
              <span className="font-mono-df text-[0.54rem] tracking-[0.18em] text-white/45">
                RÉCUPÉRÉ CE MOIS-CI
              </span>
              <span className="font-display text-sm font-semibold text-white">
                18 400 MAD
                <span className="font-mono-df ml-2 text-[0.54rem] font-normal tracking-[0.12em] text-white/50">
                  +3 500 AUJ.
                </span>
              </span>
            </div>

            {/* bottom status bar */}
            <div className="flex items-center gap-4 border-t border-white/[0.07] px-5 py-3">
              <span className="font-mono-df whitespace-nowrap text-[0.54rem] tracking-[0.2em] text-white/45">
                PLANNING REMPLI À 87%
              </span>
              <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: '87%' }}
                  transition={{ duration: 1.6, delay: 1.2, ease: [0.19, 1, 0.22, 1] }}
                  className="h-full rounded-full bg-white/85"
                />
              </div>
              <span className="font-mono-df hidden whitespace-nowrap text-[0.54rem] tracking-[0.16em] text-[#8fdcb0]/90 sm:block">
                2 ANNULATIONS COMBLÉES
              </span>
            </div>
          </div>

          {/* floating satellite chips */}
          <SatelliteChip className="-left-16 top-8" delay="0.6s">
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            <span className="font-mono-df whitespace-nowrap text-[0.58rem] tracking-[0.14em] text-white/75">
              ANNULATION 14:32 → COMBLÉE 14:34
            </span>
          </SatelliteChip>
          <SatelliteChip className="-right-12 top-1/3" delay="2.2s">
            <span className="font-mono-df whitespace-nowrap text-[0.58rem] tracking-[0.14em] text-white/75">
              PATIENTE 2841 · <span className="text-white">CONFIRMÉE ✓</span>
            </span>
          </SatelliteChip>
          <SatelliteChip className="-bottom-5 -left-10" delay="4s">
            <span className="font-mono-df whitespace-nowrap text-[0.58rem] tracking-[0.14em] text-white/75">
              DEVIS OUBLIÉ → <span className="text-white">3 500 MAD RÉCUPÉRÉS</span>
            </span>
          </SatelliteChip>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

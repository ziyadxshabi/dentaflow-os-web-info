import { motion, useReducedMotion } from 'framer-motion'
import { ParticleField } from '@/components/ParticleField'
import { HeroSystem } from '@/components/HeroSystem'
import { ToothMark } from '@/components/ToothMark'
import { EASE } from '@/components/Reveal'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.25 } },
}

const item = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE } },
}

export function Hero() {
  const reduced = useReducedMotion()

  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden">
      {/* Ambient layers */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 55% at 50% 40%, rgba(255,255,255,0.055) 0%, rgba(10,10,10,0) 62%), radial-gradient(ellipse 55% 40% at 50% 110%, rgba(255,255,255,0.04) 0%, rgba(10,10,10,0) 70%)',
        }}
      />
      <ParticleField density={80} />
      <div
        className="pointer-events-none absolute right-[-4%] top-[14%] hidden md:block"
        style={{ animation: 'float-slow 11s ease-in-out infinite' }}
        aria-hidden
      >
        <ToothMark className="w-[400px] text-white/[0.045]" strokeWidth={0.55} />
      </div>

      {/* System console centerpiece */}
      <div className="pointer-events-none absolute inset-x-0 top-[6%] mx-auto h-[46vh] max-h-[500px] min-h-[330px] w-full max-w-[980px]">
        <HeroSystem />
      </div>

      {/* Copy */}
      <motion.div
        variants={reduced ? undefined : container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-1 flex-col items-center justify-end px-5 pb-[8vh] pt-[56vh] text-center md:px-[2.03vw] md:pt-[52vh]"
      >
        <motion.p variants={item} className="mono-label mb-6">
          [ PLANNING · RÉCUPÉRATION · SUIVI DES PATIENTS ]
        </motion.p>

        <motion.h1
          variants={item}
          className="font-display max-w-5xl text-[clamp(2.4rem,6.6vw,5.6rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-[#f2f2f2]"
        >
          Votre cabinet perd des patients.
          <span className="mt-1 block font-light italic text-white text-glow-mint">
            Nous les faisons revenir.
          </span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-7 max-w-xl text-base leading-relaxed text-[#f2f2f2]/62 md:text-lg"
        >
          DentaFlow OS gère votre planning, relance vos patients sur WhatsApp
          et suit chaque dossier, du premier appel au rappel de contrôle.
          Pendant ce temps, vous travaillez.
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <a
            href="#access"
            data-cursor="hover"
            className="btn-shimmer rounded-full bg-white px-8 py-3.5 text-[0.95rem] font-semibold text-black transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
          >
            Réserver une démo privée
          </a>
          <a
            href="#leak"
            data-cursor="hover"
            className="glass-chip rounded-full px-8 py-3.5 text-[0.95rem] font-medium text-[#f2f2f2]/85 transition-colors duration-300 hover:border-white/40 hover:text-white"
          >
            Voir la fuite ↓
          </a>
        </motion.div>
      </motion.div>

      {/* Bottom status row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1.2 }}
        className="relative z-10 mx-auto flex w-full max-w-[1600px] items-center justify-between px-5 pb-6 md:px-[2.03vw]"
      >
        <span className="font-mono-df text-[0.62rem] tracking-[0.28em] text-[#f2f2f2]/35">
          FAITES DÉFILER
        </span>
        <motion.span
          animate={reduced ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="text-white/60"
          aria-hidden
        >
          ↓
        </motion.span>
        <span className="font-mono-df text-[0.62rem] tracking-[0.28em] text-[#f2f2f2]/35">
          SYSTÈMES NOMINAUX ● 04 SECTIONS
        </span>
      </motion.div>
    </section>
  )
}

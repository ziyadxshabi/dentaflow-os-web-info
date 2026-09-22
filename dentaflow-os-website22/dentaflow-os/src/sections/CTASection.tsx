import { useState } from 'react'
import { Reveal, LineReveal } from '@/components/Reveal'
import { ParticleField } from '@/components/ParticleField'
import { ToothMark } from '@/components/ToothMark'

export function CTASection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  return (
    <section id="access" className="relative overflow-hidden py-[16vh] md:py-[24vh]">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 100%, rgba(255,255,255,0.05) 0%, rgba(10,10,10,0) 68%)',
        }}
      />
      <ParticleField density={45} />

      <div className="relative mx-auto max-w-4xl px-5 text-center md:px-[2.03vw]">
        <Reveal>
          <ToothMark className="mx-auto mb-6 h-8 w-8 text-white/50" strokeWidth={1.4} />
          <p className="mono-label">[ 04 · ACCÈS ]</p>
        </Reveal>

        <div className="font-display mt-8 text-[clamp(2.3rem,5.6vw,4.6rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
          <LineReveal text="Voyez ce que vos fauteuils" className="text-[#f2f2f2]" />
          <LineReveal text="cachent vraiment." className="text-white text-glow-mint" delay={0.2} />
        </div>

        <Reveal delay={0.25}>
          <p className="mx-auto mt-7 max-w-lg text-base leading-relaxed text-[#f2f2f2]/60">
            La bêta privée ouvre pour quelques cabinets ce trimestre. Réservez une
            démo de 15 minutes ou laissez votre email, nous venons à vous.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="glass-surface mx-auto mt-10 max-w-md rounded-2xl px-6 py-6">
            <p className="font-mono-df text-[0.58rem] tracking-[0.26em] text-[#f2cd88]">
              OFFRE FONDATEUR · 25 PREMIERS CABINETS
            </p>
            <p className="mt-3.5 text-[0.92rem] leading-relaxed text-[#f2f2f2]/80">
              Les 25 premiers cabinets bénéficient de l'accès Premium et d'un tarif préférentiel.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.35}>
          {submitted ? (
            <div className="glass-surface mx-auto mt-10 max-w-md rounded-2xl p-6">
              <p className="font-mono-df text-[0.68rem] tracking-[0.22em] text-[#8fdcb0]">
                ● DEMANDE ENREGISTRÉE
              </p>
              <p className="mt-2 text-sm text-[#f2f2f2]/70">
                Nous vous contactons sous 48h. Surveillez votre boîte.
              </p>
            </div>
          ) : (
            <form
              className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault()
                if (email.trim()) setSubmitted(true)
              }}
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vous@votrecabinet.ma"
                className="glass-chip flex-1 rounded-full px-5 py-3.5 text-sm text-[#f2f2f2] placeholder:text-[#f2f2f2]/30 focus:border-white/50 focus:outline-none"
              />
              <button
                type="submit"
                data-cursor="hover"
                className="btn-shimmer rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
              >
                Demander l'accès
              </button>
            </form>
          )}
        </Reveal>

        <Reveal delay={0.45}>
          <p className="font-mono-df mt-12 text-[0.6rem] tracking-[0.26em] text-[#f2f2f2]/30">
            BÊTA PRIVÉE · PLACES FONDATEUR LIMITÉES
          </p>
          <a
            href="mailto:ziyadxshabi@gmail.com"
            data-cursor="hover"
            className="font-mono-df mt-4 inline-block text-[0.6rem] tracking-[0.26em] text-[#f2f2f2]/45 underline decoration-white/20 underline-offset-4 transition-colors duration-300 hover:text-[#8fdcb0]"
          >
            CONTACT DIRECT · ZIYADXSHABI@GMAIL.COM
          </a>
        </Reveal>
      </div>
    </section>
  )
}

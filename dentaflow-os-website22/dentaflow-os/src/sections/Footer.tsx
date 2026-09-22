import { ToothMark } from '@/components/ToothMark'

export function Footer() {
  return (
    <footer className="border-t border-white/[0.07]">
      <div className="mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-8 px-5 py-12 md:flex-row md:items-center md:px-[2.03vw]">
        <div>
          <div className="flex items-center gap-2.5">
            <ToothMark className="h-[22px] w-[22px] text-white/70" strokeWidth={1.8} />
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-xl font-semibold tracking-tight text-[#f2f2f2]">
                DentaFlow
              </span>
              <span className="font-mono-df text-[0.65rem] tracking-[0.22em] text-[#e8e8e8]">OS</span>
            </div>
          </div>
          <p className="mt-2 text-sm text-[#f2f2f2]/40">
            Récupération de patients, planning et suivi de flux pour cabinets dentaires.
          </p>
        </div>

        <div className="flex flex-col gap-2 md:items-end">
          <a
            href="mailto:ziyadxshabi@gmail.com"
            className="font-mono-df text-[0.6rem] tracking-[0.26em] text-[#f2f2f2]/55 transition-colors duration-300 hover:text-[#8fdcb0]"
          >
            ZIYADXSHABI@GMAIL.COM
          </a>
          <span className="font-mono-df text-[0.6rem] tracking-[0.26em] text-[#f2f2f2]/35">
            © 2026 DENTAFLOW OS · CONÇU POUR LES CABINETS DU MAROC
          </span>
          <span className="font-mono-df text-[0.6rem] tracking-[0.26em] text-[#e8e8e8]/50">
            SYSTÈMES NOMINAUX ●
          </span>
        </div>
      </div>
    </footer>
  )
}

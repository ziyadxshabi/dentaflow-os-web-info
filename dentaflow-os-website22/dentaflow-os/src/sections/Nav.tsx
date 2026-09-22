import { useEffect, useState } from 'react'
import { ToothMark } from '@/components/ToothMark'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-white/[0.07] bg-[#0a0a0a]/70 backdrop-blur-2xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-5 md:px-[2.03vw]">
        <a href="#top" className="flex items-center gap-2.5" data-cursor="hover">
          <ToothMark className="h-[19px] w-[19px] text-white/85" strokeWidth={1.8} />
          <span className="flex items-baseline gap-1.5">
            <span className="font-display text-lg font-semibold tracking-tight text-[#f2f2f2]">
              DentaFlow
            </span>
            <span className="font-mono-df text-[0.65rem] tracking-[0.22em] text-[#e8e8e8]">OS</span>
          </span>
        </a>

        <div className="mono-label hidden text-[#f2f2f2]/50 md:block">
          [ BÊTA PRIVÉE · V0.9 ]
        </div>

        <a
          href="#access"
          data-cursor="hover"
          className="glass-chip group rounded-full px-4 py-2 text-sm font-medium text-[#f2f2f2] transition-colors duration-300 hover:border-white/40 hover:text-white"
        >
          Demander une démo
          <span className="ml-1.5 inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            ↗
          </span>
        </a>
      </div>
    </header>
  )
}

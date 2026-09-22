import { useEffect, useRef } from 'react'

/**
 * Mix-blend-difference cursor dot with lerped follow.
 * Desktop (fine pointer) only; the native cursor stays visible.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    const dot = dotRef.current
    if (!dot) return

    let targetX = -100
    let targetY = -100
    let x = -100
    let y = -100
    let scale = 1
    let targetScale = 1
    let raf = 0
    let visible = false

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX
      targetY = e.clientY
      if (!visible) {
        visible = true
        dot.style.opacity = '1'
      }
      const el = e.target as HTMLElement | null
      targetScale = el?.closest('a, button, input, [data-cursor="hover"]') ? 2.6 : 1
    }

    const onLeave = () => {
      visible = false
      dot.style.opacity = '0'
    }

    const loop = () => {
      x += (targetX - x) * 0.18
      y += (targetY - y) * 0.18
      scale += (targetScale - scale) * 0.16
      dot.style.transform = `translate3d(${x - 8}px, ${y - 8}px, 0) scale(${scale})`
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    raf = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={dotRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-4 w-4 rounded-full bg-white opacity-0 mix-blend-difference transition-opacity duration-500 md:block"
    />
  )
}

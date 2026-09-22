import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  size: number
  minOpacity: number
  maxOpacity: number
  duration: number
  phase: number
  drift: number
}

/**
 * Code-drawn starfield: twinkling particles of varying size with
 * randomized duration/delay, slow upward drift, rendered on canvas 2D.
 */
export function ParticleField({ density = 90, className }: { density?: number; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let particles: Particle[] = []
    let raf = 0
    let width = 0
    let height = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const seed = () => {
      particles = Array.from({ length: density }, () => {
        const minOpacity = 0.05 + Math.random() * 0.2
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          size: [1, 1.5, 2.25][Math.floor(Math.random() * 3)],
          minOpacity,
          maxOpacity: Math.min(minOpacity + 0.15 + Math.random() * 0.6, 0.94),
          duration: 2400 + Math.random() * 5200,
          phase: Math.random() * Math.PI * 2,
          drift: 0.02 + Math.random() * 0.08,
        }
      })
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      seed()
    }

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height)
      for (const p of particles) {
        const cycle = ((time + p.phase * p.duration) % p.duration) / p.duration
        const twinkle = 0.5 - 0.5 * Math.cos(cycle * Math.PI * 2)
        const opacity = p.minOpacity + (p.maxOpacity - p.minOpacity) * twinkle
        const scale = 1 + 0.25 * twinkle

        if (!reduced) {
          p.y -= p.drift
          if (p.y < -4) {
            p.y = height + 4
            p.x = Math.random() * width
          }
        }

        const bright = p.size > 2
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * scale, 0, Math.PI * 2)
        ctx.fillStyle = bright
          ? `rgba(255, 255, 255, ${opacity * 0.95})`
          : `rgba(235, 235, 235, ${opacity * 0.8})`
        if (bright) {
          ctx.shadowColor = 'rgba(255, 255, 255, 0.8)'
          ctx.shadowBlur = 6
        } else {
          ctx.shadowBlur = 0
        }
        ctx.fill()
      }
      ctx.shadowBlur = 0
      if (!reduced) raf = requestAnimationFrame(draw)
    }

    resize()
    if (reduced) {
      draw(0)
    } else {
      raf = requestAnimationFrame(draw)
    }
    const observer = new ResizeObserver(resize)
    observer.observe(canvas)

    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
    }
  }, [density])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    />
  )
}

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

const EASE = [0.19, 1, 0.22, 1] as const

interface RevealProps {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  once?: boolean
}

/** Spring-physics entrance reveal: fade + translate as the element enters the viewport. */
export function Reveal({ children, delay = 0, y = 48, className, once = true }: RevealProps) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y, scale: 0.985 }}
      whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once, margin: '-12% 0px' }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  )
}

/** Word-by-word masked line reveal for manifesto-style typography. */
export function LineReveal({
  text,
  className,
  delay = 0,
}: {
  text: string
  className?: string
  delay?: number
}) {
  const reduced = useReducedMotion()
  const words = text.split(' ')
  return (
    <motion.span
      className={className}
      style={{ display: 'block' }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-10% 0px' }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.045, delayChildren: delay } },
      }}
    >
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            overflow: 'hidden',
            verticalAlign: 'bottom',
            paddingBottom: '0.08em',
            marginBottom: '-0.08em',
          }}
        >
          <motion.span
            style={{ display: 'inline-block', willChange: 'transform, opacity' }}
            variants={{
              hidden: reduced ? { opacity: 0 } : { y: '110%', opacity: 0, rotate: 2 },
              show: reduced
                ? { opacity: 1, transition: { duration: 0.6 } }
                : { y: '0%', opacity: 1, rotate: 0, transition: { duration: 0.85, ease: EASE } },
            }}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}

export { EASE }

import { useLenis } from '@/hooks/useLenis'
import { Cursor } from '@/components/Cursor'
import { Nav } from '@/sections/Nav'
import { Hero } from '@/sections/Hero'
import { Manifesto } from '@/sections/Manifesto'
import { StackSection } from '@/sections/StackSection'
import { FlowPipeline } from '@/sections/FlowPipeline'
import { Capabilities } from '@/sections/Capabilities'
import { StatsTicker } from '@/sections/StatsTicker'
import { CTASection } from '@/sections/CTASection'
import { Footer } from '@/sections/Footer'

export default function Home() {
  useLenis()

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-[#f2f2f2]">
      <div className="grain-overlay" aria-hidden />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Manifesto />
        <StatsTicker />
        <StackSection />
        <FlowPipeline />
        <Capabilities />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}

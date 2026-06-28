import { Seo } from '../components/site/seo'
import { Hero } from '../components/site/hero'
import { ProblemSection } from '../components/site/problem-section'
import { HowItWorks } from '../components/site/how-it-works'
import { MetricsSection } from '../components/site/metrics-section'
import { ProgressSection } from '../components/site/progress-section'
import { AppPreviewSection } from '../components/site/app-preview-section'
import { PricingSection } from '../components/site/pricing-section'
import { FaqSection } from '../components/site/faq-section'
import { FinalCta } from '../components/site/final-cta'

export function Home() {
  return (
    <>
      <Seo
        title="Ballista Tracking | Baseball Swing Analysis from Your iPhone"
        description="Ballista helps baseball players track swing movement, review key metrics, and measure progress over time using only an iPhone."
        path="/"
      />
      <main>
        <Hero />
        <ProblemSection />
        <HowItWorks />
        <MetricsSection />
        <ProgressSection />
        <AppPreviewSection />
        <PricingSection />
        <FaqSection />
        <FinalCta />
      </main>
    </>
  )
}

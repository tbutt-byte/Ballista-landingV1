import { SectionShell } from './section-shell'
import { Reveal } from './reveal'
import { DemoShell } from './demo-shell'

export function DemoSection() {
  return (
    <SectionShell
      id="demo"
      eyebrow="demo"
      title="Try the swing analysis flow."
      intro="Use the preset swing clip to explore how Ballista moves from video capture to motion feedback. This is a real recorded swing and its real measured output, replayed here as a web recreation of the flow — not a live in-browser analysis."
    >
      <Reveal>
        <DemoShell />
      </Reveal>
    </SectionShell>
  )
}

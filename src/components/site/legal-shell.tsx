import { type ReactNode } from 'react'

type LegalShellProps = {
  title: string
  updated: string
  children: ReactNode
}

export function LegalShell({ title, updated, children }: LegalShellProps) {
  return (
    <main className="mx-auto max-w-3xl px-6 pb-24 pt-32">
      <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">{title}</h1>
      <p className="mt-3 text-sm text-white/45">Last updated {updated}</p>
      <div className="mt-10 space-y-8 text-white/70 [&_a]:text-white [&_a]:underline [&_a]:underline-offset-4 [&_h2]:mt-2 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-white [&_li]:leading-relaxed [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
        {children}
      </div>
    </main>
  )
}

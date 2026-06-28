import { Seo } from '../components/site/seo'
import { LegalShell } from '../components/site/legal-shell'
import { SITE } from '../lib/content'

export function Terms() {
  return (
    <>
      <Seo
        title="Terms of Service | Ballista Tracking"
        description="The terms that govern your use of the Ballista Tracking website and early-access program."
        path="/terms"
      />
      <LegalShell title="Terms of Service" updated="June 2026">
        <p>
          These terms govern your use of the Ballista Tracking website and early-access program. By
          using the site or requesting early access, you agree to these terms.
        </p>

        <div>
          <h2>Early access &amp; development</h2>
          <p>
            Ballista is in active development. Features, metrics, availability, and pricing described
            on this site may change as the product evolves. Early access is offered at our discretion.
          </p>
        </div>

        <div>
          <h2>Nature of the product</h2>
          <p>
            Ballista measures swing movement from video and is intended for player development and
            progress tracking. It is not a professional measurement system and is not a replacement
            for dedicated tracking hardware. Metrics are estimates and should not be treated as
            lab-grade or exact.
          </p>
        </div>

        <div>
          <h2>Acceptable use</h2>
          <ul>
            <li>Don't misuse the site, interfere with its operation, or attempt to break security.</li>
            <li>Don't submit information you are not authorized to share.</li>
            <li>Use the site and any content in line with applicable laws.</li>
          </ul>
        </div>

        <div>
          <h2>Intellectual property</h2>
          <p>
            The Ballista name, branding, site content, and software are owned by Ballista Tracking and
            may not be copied or reused without permission.
          </p>
        </div>

        <div>
          <h2>Disclaimers &amp; liability</h2>
          <p>
            The site and early-access materials are provided "as is" without warranties of any kind.
            To the fullest extent permitted by law, Ballista is not liable for indirect or
            consequential damages arising from your use of the site.
          </p>
        </div>

        <div>
          <h2>Contact</h2>
          <p>
            Questions about these terms can be sent to{' '}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
          </p>
        </div>
      </LegalShell>
    </>
  )
}

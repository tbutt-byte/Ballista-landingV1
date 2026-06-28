import { Seo } from '../components/site/seo'
import { LegalShell } from '../components/site/legal-shell'
import { SITE } from '../lib/content'

export function Privacy() {
  return (
    <>
      <Seo
        title="Privacy Policy | Ballista Tracking"
        description="How Ballista Tracking collects, uses, and protects personal information from website visitors and early-access requests."
        path="/privacy"
      />
      <LegalShell title="Privacy Policy" updated="June 2026">
        <p>
          This policy explains how Ballista Tracking ("Ballista", "we") collects and manages personal
          information from website visitors, early-access subscribers, and people who contact us. It
          applies to the Ballista website and its current contact and early-access features.
        </p>

        <div>
          <h2>Information we collect</h2>
          <ul>
            <li>Early-access requests: your name, email, role, and any message you submit.</li>
            <li>Contact submissions: the details you choose to share when you reach out.</li>
            <li>
              Limited technical information such as IP address, browser type, and device data, used
              to keep the site secure and reliable.
            </li>
          </ul>
        </div>

        <div>
          <h2>How we use it</h2>
          <p>
            We use your information to respond to you, manage early access, improve the site, and keep
            it secure. <strong>We do not sell or rent personal information.</strong>
          </p>
        </div>

        <div>
          <h2>Service providers</h2>
          <p>
            We rely on trusted providers to operate the site and store submissions, which may include
            hosting, database, and email infrastructure such as Supabase, Google Workspace, and
            Cloudflare. These providers process data on our behalf.
          </p>
        </div>

        <div>
          <h2>Retention</h2>
          <p>
            We keep early-access details for as long as you remain on the list, and contact
            submissions for a limited period, after which they are deleted or anonymized.
          </p>
        </div>

        <div>
          <h2>Your choices</h2>
          <p>
            You can request access to, correction of, or deletion of your personal information, or ask
            us to stop sending you messages, by emailing{' '}
            <a href={`mailto:${SITE.privacyEmail}`}>{SITE.privacyEmail}</a>.
          </p>
        </div>

        <div>
          <h2>Children</h2>
          <p>
            The website is not directed to children under 13. If a parent or guardian submits
            information on behalf of a young player, they are responsible for that submission.
          </p>
        </div>

        <div>
          <h2>Contact</h2>
          <p>
            Questions about this policy can be sent to{' '}
            <a href={`mailto:${SITE.privacyEmail}`}>{SITE.privacyEmail}</a>, or by mail to:
          </p>
          <p className="text-white/55">
            {SITE.address.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
        </div>
      </LegalShell>
    </>
  )
}

"use client"

import PageShell from "@/components/page-shell"
import PageHero from "@/components/page-hero"
import { AlertTriangle } from "lucide-react"

export default function TermsPage() {
  return (
    <PageShell>
      <PageHero eyebrow="Legal Terms" title="Terms of Service & Advisory Notice" breadcrumbs={[{ label: "Terms of Service" }]} />

      <div className="container mx-auto px-4 py-12 max-w-4xl space-y-8 text-foreground/85 leading-relaxed text-sm">
        <div className="border border-amber-200 bg-amber-50 p-4 text-xs leading-relaxed text-amber-900">
          This draft requires review against the company&apos;s actual services and applicable law before publication. It is not a substitute for legal advice.
        </div>
        <div className="bg-muted/40 p-4 rounded-lg border border-border flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground">
            Please read these terms carefully before utilizing our real estate advisory, listing, or recommendation features. By accessing this platform, you agree to these operating standards.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-serif font-semibold text-espresso mb-2">1. Nature of Advisory Services</h2>
          <p>
            Pruthviraj Realty operates as a premium real estate consultancy, facilitator, and property marketing advisor in Nashik and surrounding regions. We provide informational insights, market analyses, and facilitation services between prospective buyers, sellers, and landowners.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-serif font-semibold text-espresso mb-2">2. Independent Legal & Title Verification</h2>
          <p>
            While Pruthviraj Realty facilitates due diligence assistance through qualified legal counsel, all property purchasers and investors are strongly advised to conduct independent search reports, revenue title inspections, and municipal Town Planning verification prior to executing binding agreements or financial disbursements.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-serif font-semibold text-espresso mb-2">3. Demonstration Data Notice</h2>
          <p>
            Certain property listings, pricing estimates, area dimensions, project renderings, and client milestones presented on this website are demonstration showcases. Actual property availability, registry costs, stamp duty, and government charges are subject to official confirmation at our Nashik office.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-serif font-semibold text-espresso mb-2">4. Property Owner Representations</h2>
          <p>
            Individuals and entities submitting properties through our &quot;List Your Property&quot; portal represent that they possess legitimate ownership rights or documented authorization to market said properties. Submissions found to have unresolved litigation or false claims will be promptly removed.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-serif font-semibold text-espresso mb-2">5. Governing Law & Jurisdiction</h2>
          <p>
            Any disputes arising from advisory engagements or agreements executed with Pruthviraj Realty shall be subject to the exclusive jurisdiction of the competent civil courts at Nashik, Maharashtra, India.
          </p>
        </div>
      </div>
    </PageShell>
  )
}

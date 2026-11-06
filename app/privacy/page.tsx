"use client"

import PageShell from "@/components/page-shell"
import PageHero from "@/components/page-hero"
import { ShieldCheck } from "lucide-react"

export default function PrivacyPage() {
  return (
    <PageShell>
      <PageHero eyebrow="Legal & Trust" title="Privacy Policy" breadcrumbs={[{ label: "Privacy Policy" }]} />

      <div className="container mx-auto px-4 py-12 max-w-4xl space-y-8 text-foreground/85 leading-relaxed text-sm">
        <div className="border border-amber-200 bg-amber-50 p-4 text-xs leading-relaxed text-amber-900">
          Review this draft against the company&apos;s actual data collection, storage, sharing and retention practices, and obtain legal review before publication.
        </div>
        <div className="bg-muted/40 p-4 rounded-lg border border-border flex items-start gap-3">
          <ShieldCheck className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground">
            Pruthviraj Realty is committed to protecting the privacy and confidentiality of property buyers, sellers, investors, and website visitors. We collect only information essential to servicing your property inquiries.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-serif font-semibold text-espresso mb-2">1. Information We Collect</h2>
          <p>
            When you interact with our website, submit property enquiry forms, register buyer requirements, list properties, or communicate via WhatsApp, we may collect:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-xs">
            <li>Contact details: Full name, phone number, email address.</li>
            <li>Property search preferences: Desired location, budget range, property category, intended use.</li>
            <li>Property listing submissions: Land or home dimensions, survey numbers, ownership documentation declarations, and pricing expectations.</li>
            <li>Technical usage data: Anonymous browser and device details used solely for site optimization.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-serif font-semibold text-espresso mb-2">2. Purpose of Processing</h2>
          <p>
            We process your personal details strictly to:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-xs">
            <li>Respond to specific property requests and coordinate site inspections.</li>
            <li>Present matching property inventories curated according to your buyer mandate.</li>
            <li>Coordinate legal title due diligence checks with your explicit authorization.</li>
            <li>Maintain communication via telephone, WhatsApp, or email regarding relevant real estate developments.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-serif font-semibold text-espresso mb-2">3. Non-Disclosure & Third Parties</h2>
          <p>
            Pruthviraj Realty never sells, leases, or trades client information to external telemarketing databases. Personal information is disclosed only to verified title holders, legal counsels, or banking financial institutions with your prior informed consent for transaction completion.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-serif font-semibold text-espresso mb-2">4. Demonstration Data Disclaimer</h2>
          <p className="text-xs text-muted-foreground">
            This digital platform contains demonstration listings and sample pricing models for showcase and technical evaluation purposes. Inquiries submitted through demo channels will be routed to Pruthviraj Realty&apos;s active property advisory desk in Nashik.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-serif font-semibold text-espresso mb-2">5. Contact Our Privacy Desk</h2>
          <p className="text-xs">
            For questions concerning this Privacy Policy or to request deletion of your stored lead information, please contact <a href="mailto:contact@pruthvirajrealty.in" className="text-gold underline">contact@pruthvirajrealty.in</a> or write to Pruthviraj Realty, Gangapur Road, Nashik, Maharashtra.
          </p>
        </div>
      </div>
    </PageShell>
  )
}

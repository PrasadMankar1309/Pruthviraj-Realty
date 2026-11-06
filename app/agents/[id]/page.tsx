"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import PageHero from "@/components/page-hero"
import PageShell from "@/components/page-shell"
import { Button } from "@/components/ui/button"

export default function AgentDetailPage() {
  return (
    <PageShell>
      <PageHero eyebrow="Our Property Consultants" title="Consultant information" breadcrumbs={[{ label: "Our Consultants", href: "/agents" }, { label: "Profile" }]} />
      <section className="container mx-auto max-w-2xl px-4 py-16 text-center">
        <h2 className="font-serif text-2xl font-semibold text-espresso">No verified profile is available</h2>
        <p className="mt-3 text-sm text-muted-foreground">Consultant names, credentials and contact details will be published when approved for public display.</p>
        <Button asChild variant="outline" className="mt-6"><Link href="/agents"><ArrowLeft className="mr-2 h-4 w-4" />Back to consultants</Link></Button>
      </section>
    </PageShell>
  )
}

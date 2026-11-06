"use client"

import Link from "next/link"
import { ArrowRight, UsersRound } from "lucide-react"
import PageHero from "@/components/page-hero"
import PageShell from "@/components/page-shell"
import { Button } from "@/components/ui/button"

export default function AgentsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Our Property Consultants"
        title="Speak with the Pruthviraj Realty team"
        description="Our property desk can help direct your questions about buying, selling, investing or arranging a visit."
        breadcrumbs={[{ label: "Our Consultants" }]}
        align="center"
      />
      <section className="container mx-auto max-w-3xl px-4 py-16 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold/15 text-gold"><UsersRound className="h-7 w-7" /></div>
        <h2 className="mt-5 font-serif text-2xl font-semibold text-espresso">Consultant profiles are not published yet</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
          We do not display unverified names, photographs, experience or credentials. Contact the property desk and the team will route your enquiry to an appropriate representative.
        </p>
        <Button asChild className="mt-6 bg-espresso text-white hover:bg-espresso/90">
          <Link href="/contact">Contact the team <ArrowRight className="ml-2 h-4 w-4" /></Link>
        </Button>
      </section>
    </PageShell>
  )
}

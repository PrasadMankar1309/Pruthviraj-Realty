import Link from "next/link"
import { ArrowRight, BriefcaseBusiness } from "lucide-react"
import PageHero from "@/components/page-hero"
import PageShell from "@/components/page-shell"
import { Button } from "@/components/ui/button"

export default function CareersPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Careers"
        title="Explore opportunities with Pruthviraj Realty"
        description="We welcome professional enquiries from people interested in real estate and property advisory."
        breadcrumbs={[{ label: "Careers" }]}
        align="center"
      />
      <section className="container mx-auto max-w-3xl px-4 py-16 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold/15 text-gold"><BriefcaseBusiness className="h-7 w-7" /></div>
        <h2 className="mt-5 font-serif text-2xl font-semibold text-espresso">No verified openings are listed at this time</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
          To avoid publishing unconfirmed roles or office details, current vacancies will appear here only after they are approved. For general enquiries, please contact our team.
        </p>
        <Button asChild className="mt-6 bg-espresso text-white hover:bg-espresso/90"><Link href="/contact">Contact us <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
      </section>
    </PageShell>
  )
}

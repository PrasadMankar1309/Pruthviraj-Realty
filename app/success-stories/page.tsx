import Link from "next/link"
import { ArrowRight, ShieldCheck } from "lucide-react"
import PageHero from "@/components/page-hero"
import PageShell from "@/components/page-shell"
import { Button } from "@/components/ui/button"

export default function SuccessStoriesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Client Experiences"
        title="Success Stories & Reviews"
        description="We publish client stories only when the experience and permission to share it have been verified."
        breadcrumbs={[{ label: "Success Stories" }]}
        align="center"
      />
      <section className="container mx-auto max-w-3xl px-4 py-16">
        <div className="border border-gold/40 bg-white p-8 text-center sm:p-12">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold/15 text-gold"><ShieldCheck className="h-7 w-7" /></div>
          <h2 className="mt-5 font-serif text-2xl font-semibold text-espresso">Verified stories will be shared here</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            No client testimonials or transaction milestones are currently published. We will not present invented or unverified experiences as customer feedback.
          </p>
          <Button asChild className="mt-6 bg-espresso text-white hover:bg-espresso/90"><Link href="/contact">Contact our team <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
        </div>
      </section>
    </PageShell>
  )
}

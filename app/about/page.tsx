"use client"

import Image from "next/image"
import Link from "next/link"
import { Sparkles, Users, ShieldCheck, MapPin } from "lucide-react"
import PageShell from "@/components/page-shell"
import PageHero from "@/components/page-hero"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  const pillars = [
    {
      title: "Local Property Context",
      desc: "Property searches can be shaped around preferred locations, access, intended use and other details relevant to each enquiry.",
      icon: MapPin,
    },
    {
      title: "Independent Due Diligence",
      desc: "Property information and documents should be independently reviewed with qualified legal and technical professionals before commitment.",
      icon: ShieldCheck,
    },
    {
      title: "Property Enquiry Support",
      desc: "Buyers, owners and investors can share their requirements so the team can understand the type of assistance they are seeking.",
      icon: Users,
    },
    {
      title: "Clear Communication",
      desc: "Availability, pricing, approvals and other property details should be confirmed directly before making a decision.",
      icon: Sparkles,
    },
  ]

  return (
    <PageShell>
      <PageHero
        eyebrow="About Pruthviraj Realty"
        title="Property guidance shaped around your goals"
        description="Explore property categories and connect with the team to discuss your requirements across Nashik and surrounding areas."
        breadcrumbs={[{ label: "About Us" }]}
        align="center"
      />

      {/* Story Section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-gold mb-2">Our Approach</p>
            <h2 className="text-2xl md:text-4xl font-serif font-semibold text-espresso mb-6">
              A clearer way to explore property opportunities
            </h2>
            <div className="space-y-4 text-sm md:text-base text-foreground/80 leading-relaxed">
              <p>
                Choosing a property involves weighing location, intended use, budget and documentation. Pruthviraj Realty provides a place to explore property categories and submit questions for follow-up.
              </p>
              <p>
                The website presents residential, commercial, agricultural and industrial property examples. Listing and project information may be illustrative and must be confirmed with the team and relevant authorities.
              </p>
              <p>
                Before proceeding with any transaction, independently verify ownership, title, approvals, measurements, pricing and availability with qualified professionals.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <Link href="/properties">
                <Button className="bg-espresso hover:bg-espresso/90 text-white text-xs px-6">
                  Explore Curated Portfolio
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="border-border text-xs">
                  Contact the Team
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative h-[420px] sm:h-[480px] rounded-xl overflow-hidden shadow-lg border border-border">
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"
              alt="Illustrative residential architecture"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <p className="font-serif font-semibold text-lg text-gold">Explore property with clarity</p>
              <p className="text-xs text-ivory/80 mt-1">Illustrative architectural photography.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Advisory Pillars */}
      <div className="bg-muted/40 py-16 md:py-24 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-gold mb-2">Our Foundation</p>
            <h2 className="text-2xl md:text-3xl font-serif font-semibold text-espresso">
              Principles for Exploring Property
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, i) => {
              const IconComp = pillar.icon
              return (
                <div key={i} className="bg-card border border-border p-6 rounded-xl flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-lg bg-gold/15 flex items-center justify-center text-gold mb-4">
                      <IconComp className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-serif font-semibold text-espresso mb-2">{pillar.title}</h3>
                    <p className="text-xs text-foreground/75 leading-relaxed">{pillar.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Location Coverage Note */}
      <div className="container mx-auto px-4 py-16 max-w-4xl text-center">
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-gold mb-2">Areas Referenced on This Website</p>
        <h2 className="text-2xl md:text-3xl font-serif font-semibold text-espresso mb-4">
          Property Locations
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-2.5 mt-6 mb-8">
          {[
            "Gangapur Road",
            "College Road",
            "Trimbakeshwar",
            "Sinnar MIDC",
            "Dindori Agri-Belt",
            "Niphad",
            "Indira Nagar",
            "Nashik City Center",
            "Igatpuri Corridor",
          ].map((loc, idx) => (
            <span key={idx} className="px-3.5 py-1.5 bg-secondary text-espresso text-xs font-medium rounded-full border border-border">
              {loc}
            </span>
          ))}
        </div>
        <p className="mx-auto mb-6 max-w-2xl text-xs text-muted-foreground">These place names appear in demonstration property content and do not confirm active inventory or service coverage.</p>
        <p className="text-xs text-muted-foreground italic">
          ⚠️ Note: All property listings, pricing models, and project brochures on this website are demonstration showcases prepared for Pruthviraj Realty.
        </p>
      </div>
    </PageShell>
  )
}

"use client"

import Link from "next/link"
import PageShell from "@/components/page-shell"
import PageHero from "@/components/page-hero"
import { Button } from "@/components/ui/button"
import {
  Compass,
  FileCheck2,
  Megaphone,
  Briefcase,
  Users2,
  Building,
  ArrowRight,
  ShieldAlert,
  PhoneCall,
  CheckCircle2,
} from "lucide-react"
import { useI18n } from "@/lib/i18n"

const WHATSAPP_NUMBER = "917507716161"

export default function ServicesPage() {
  const { t } = useI18n()

  const services = [
    {
      icon: <Compass className="h-7 w-7 text-gold" />,
      title: "Property Acquisition & Advisory",
      category: "Buyers & Investors",
      description:
        "Comprehensive guidance for buyers looking for residential plots, luxury homes, agricultural land, and commercial properties. We assess market valuations, evaluate road access, and negotiate optimal transaction terms.",
      deliverables: [
        "Requirement-aligned property curation",
        "Comparative market price valuation",
        "Site inspection & demarcation verification",
        "Closing negotiation representation",
      ],
      ctaText: "Explore Properties",
      ctaHref: "/properties",
    },
    {
      icon: <Megaphone className="h-7 w-7 text-gold" />,
      title: "Exclusive Property Marketing & Sales",
      category: "Property Owners & Landlords",
      description:
        "High-impact marketing campaigns for landowners, villa owners, and commercial asset holders. We connect your asset directly to vetted buyers through architectural photography, direct outreach, and local investor circles.",
      deliverables: [
        "Architectural presentation & visual marketing",
        "Curated buyer database matching",
        "Managed on-site property walkthroughs",
        "Transparent closing facilitation",
      ],
      ctaText: "List Your Property",
      ctaHref: "/list-property",
    },
    {
      icon: <FileCheck2 className="h-7 w-7 text-gold" />,
      title: "Legal & Title Due Diligence Assistance",
      category: "Risk Mitigation",
      description:
        "Facilitating thorough documentation checks before any commitment is made. We work alongside experienced legal counsels to examine title chains, 7/12 extracts, Town Planning sanctions, and zone reservation clearances.",
      deliverables: [
        "30-year revenue search report assistance",
        "7/12 extract & mutation entry examination",
        "NA conversion & Town Planning layout validation",
        "Drafting sale agreements & registration guidance",
      ],
      ctaText: "Speak with Our Team",
      ctaHref: "/contact",
    },
    {
      icon: <Briefcase className="h-7 w-7 text-gold" />,
      title: "Strategic Land Banking & Assembly",
      category: "Institutions & Developers",
      description:
        "Identifying and assembling contiguous land parcels for township developments, agro-tourism projects, industrial warehousing, and plotted subdivisions in emerging Nashik growth belts.",
      deliverables: [
        "Contiguous parcel aggregation & landowner negotiations",
        "Feasibility and road connectivity assessment",
        "Development potential & FSI feasibility checks",
        "Joint development & structuring support",
      ],
      ctaText: "Investor Mandate",
      ctaHref: "/investment-opportunities",
    },
    {
      icon: <Building className="h-7 w-7 text-gold" />,
      title: "Commercial & Retail Space Solutions",
      category: "Businesses & Corporates",
      description:
        "Connecting retail brands, medical centers, IT firms, and corporate tenants with high-visibility showrooms, boutique office floors, and pre-leased commercial real estate.",
      deliverables: [
        "Footfall & arterial connectivity analysis",
        "Commercial lease structuring & lock-in terms",
        "Fit-out readiness & utility validation",
        "Pre-leased asset yield evaluation",
      ],
      ctaText: "Commercial Listings",
      ctaHref: "/properties/commercial-properties",
    },
    {
      icon: <Users2 className="h-7 w-7 text-gold" />,
      title: "Landowner & Investor Networking",
      category: "Collaborative Ventures",
      description:
        "Acting as a trusted bridge between ancestral landowners looking to unlock land value and credible builders seeking development land or joint-venture partners.",
      deliverables: [
        "Discreet landowner-builder introductions",
        "Fair profit-sharing / area-sharing advisory",
        "Structured milestone agreements",
        "Transparent stakeholder communication",
      ],
      ctaText: "Connect with Us",
      ctaHref: "/contact",
    },
  ]

  return (
    <PageShell>
      <PageHero
        eyebrow="Comprehensive Real Estate Services"
        title="Property services for buyers, owners and investors"
        description="Explore the advisory and property-related services described by Pruthviraj Realty. Confirm scope, availability and any professional requirements directly with the team."
        breadcrumbs={[{ label: "Services" }]}
        align="center"
      />

      {/* Services Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((svc, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-xl p-6 sm:p-8 flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="mb-4">{svc.icon}</div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-gold block mb-1">
                  {svc.category}
                </span>
                <h3 className="text-xl font-serif font-semibold text-espresso mb-3">{svc.title}</h3>
                <p className="text-sm text-foreground/80 leading-relaxed mb-6">
                  {svc.description}
                </p>

                <div className="mb-6 pt-4 border-t border-border">
                  <p className="text-xs font-semibold uppercase tracking-wider text-espresso mb-3">Key Inclusions</p>
                  <ul className="space-y-2">
                    {svc.deliverables.map((d, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-foreground/75">
                        <CheckCircle2 className="h-3.5 w-3.5 text-gold flex-shrink-0 mt-0.5" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Link href={svc.ctaHref}>
                <Button variant="outline" className="w-full justify-between text-xs font-medium border-border hover:bg-espresso hover:text-white group">
                  <span>{svc.ctaText}</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Trust & Service Principles */}
      <div className="bg-muted/40 py-16 border-y border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-gold mb-2">Our Operating Standards</p>
            <h2 className="text-2xl md:text-3xl font-serif font-semibold text-espresso">Ethical, Accountable, Transparent</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-card p-5 rounded-lg border border-border">
              <h4 className="font-semibold text-espresso text-sm mb-1.5">No Misleading Commitments</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                We clearly communicate property status, existing reservations, access road approvals, and verification timelines upfront without exaggerated promises.
              </p>
            </div>
            <div className="bg-card p-5 rounded-lg border border-border">
              <h4 className="font-semibold text-espresso text-sm mb-1.5">Zero Hidden Intermediaries</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                We facilitate direct interactions between legitimate buyers and verified title-holders to eliminate unnecessary brokerage layers.
              </p>
            </div>
            <div className="bg-card p-5 rounded-lg border border-border">
              <h4 className="font-semibold text-espresso text-sm mb-1.5">Localized Micro-Market Intelligence</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Our team monitors circle rates, ready-reckoner values, ongoing infrastructure plans, and municipal zoning nuances across Nashik talukas.
              </p>
            </div>
            <div className="bg-card p-5 rounded-lg border border-border">
              <h4 className="font-semibold text-espresso text-sm mb-1.5">Post-Transaction Assistance</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Our responsibility continues through revenue record updates, physical demarcation, fencing guidance, and boundary protection support.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 text-center container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-serif font-semibold text-espresso mb-3">Discuss Your Property Goals Today</h2>
        <p className="text-sm text-muted-foreground max-w-xl mx-auto mb-6">
          Schedule an in-person consultation at our Nashik office or connect with an experienced real estate advisor over phone or WhatsApp.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/contact">
            <Button className="bg-espresso hover:bg-espresso/90 text-white px-6">
              Contact Our Consultants
            </Button>
          </Link>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="border-border gap-2">
              <PhoneCall className="h-4 w-4 text-gold" />
              Chat on WhatsApp
            </Button>
          </a>
        </div>
      </div>
    </PageShell>
  )
}

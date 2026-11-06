"use client"

import { useState } from "react"
import Link from "next/link"
import PageShell from "@/components/page-shell"
import PageHero from "@/components/page-hero"
import SafeImage from "@/components/safe-image"
import { projects, type Project } from "@/data/projects"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Building2, CheckCircle2, FileText, MessageCircle, Phone, ArrowRight } from "lucide-react"
import { useI18n } from "@/lib/i18n"

const WHATSAPP_NUMBER = "917507716161"

export default function ProjectsPage() {
  const { t } = useI18n()
  const [selectedType, setSelectedType] = useState<string>("All")

  const types = ["All", "Plotted Development", "Luxury Residences", "Commercial Hub", "Township"]

  const filteredProjects = selectedType === "All"
    ? projects
    : projects.filter(p => p.type === selectedType)

  return (
    <PageShell>
      <PageHero
        eyebrow="Developments & Enclaves"
        title="Featured Projects"
        description="Explore project demonstration showcases for plotted, residential, commercial and industrial opportunities."
        breadcrumbs={[{ label: "Projects" }]}
      />

      <div className="container mx-auto px-4 py-12">
        {/* Filter pills */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-border">
          <div className="flex flex-wrap gap-2">
            {types.map(t => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                aria-pressed={selectedType === t}
                className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all ${
                  selectedType === t
                    ? "bg-espresso text-white shadow-sm"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-espresso"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground italic">Demonstration project data only; verify all details independently.</p>
        </div>

        {/* Project cards list */}
        <div className="mt-10 space-y-12">
          {filteredProjects.map((project, idx) => {
            const whatsappMsg = `Hello Pruthviraj Realty, I would like to know more about the project: ${project.title} (${project.location}).`
            const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMsg)}`

            return (
              <div
                key={project.id}
                className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow grid grid-cols-1 lg:grid-cols-12 gap-0"
              >
                {/* Image side */}
                <div className="lg:col-span-5 relative h-72 sm:h-96 lg:h-auto min-h-[300px]">
                  <SafeImage
                    src={project.coverImage}
                    alt={`Illustrative project image for ${project.title}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <Badge className="bg-gold text-espresso font-semibold uppercase tracking-wider text-[10px]">
                      {project.status}
                    </Badge>
                    <Badge variant="outline" className="bg-espresso/80 text-white backdrop-blur-sm border-white/20 text-[10px]">
                      {project.type}
                    </Badge>
                  </div>
                </div>

                {/* Content side */}
                <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-gold font-medium tracking-wider uppercase mb-1">
                      <Building2 className="h-3.5 w-3.5" />
                      <span>{project.developer}</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-espresso">{project.title}</h2>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-2 mb-4">
                      <MapPin className="h-3.5 w-3.5 text-gold flex-shrink-0" />
                      <span>{project.location}</span>
                      <span className="mx-2">•</span>
                      <span>RERA: {project.reraId}</span>
                    </div>

                    <p className="text-sm text-foreground/80 leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Configurations & Starting Price */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-muted/40 rounded-lg mb-6">
                      <div>
                        <span className="text-[11px] uppercase tracking-wider text-muted-foreground block mb-1">Investment Starting</span>
                        <span className="text-lg font-serif font-semibold text-espresso">{project.priceStarting}</span>
                      </div>
                      <div>
                        <span className="text-[11px] uppercase tracking-wider text-muted-foreground block mb-1">Possession Timeline</span>
                        <span className="text-sm font-medium text-foreground">{project.possessionDate}</span>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="mb-6">
                      <p className="text-xs font-semibold uppercase tracking-wider text-espresso mb-3">Project Highlights</p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {project.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-foreground/80">
                            <CheckCircle2 className="h-3.5 w-3.5 text-gold flex-shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Amenities pills */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.amenities.map((a, i) => (
                        <span key={i} className="px-2.5 py-1 bg-secondary text-[11px] text-espresso rounded-md">
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border">
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex"
                    >
                      <Button className="bg-[#25D366] hover:bg-[#20ba59] text-white gap-2 text-xs">
                        <MessageCircle className="h-3.5 w-3.5" />
                        Enquire on WhatsApp
                      </Button>
                    </a>
                    <a href="tel:+917507716161" className="inline-flex">
                      <Button variant="outline" className="border-border gap-2 text-xs">
                        <Phone className="h-3.5 w-3.5 text-gold" />
                        Call Consultant
                      </Button>
                    </a>
                    <Link href="/contact" className="inline-flex">
                      <Button variant="ghost" className="text-espresso hover:text-gold gap-1 text-xs">
                        Book Site Visit <ArrowRight className="h-3.5 w-3.5 ml-1" />
                      </Button>
                    </Link>
                    <Link href={`/projects/${project.id}`} className="inline-flex">
                      <Button variant="outline" className="gap-1 text-xs">
                        Project details <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </PageShell>
  )
}

import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, Check, MapPin } from "lucide-react"
import PageHero from "@/components/page-hero"
import PageShell from "@/components/page-shell"
import SafeImage from "@/components/safe-image"
import SiteVisitRequestForm from "@/components/site-visit-request-form"
import { Button } from "@/components/ui/button"
import { projects } from "@/data/projects"

const WHATSAPP_NUMBER = "917507716161"

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const project = projects.find((item) => item.id === params.id)
  if (!project) notFound()

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hello, I would like to know more about ${project.title}.`)}`

  return (
    <PageShell>
      <PageHero
        eyebrow={`${project.type} · ${project.status}`}
        title={project.title}
        description={`${project.location} · Demonstration project information, subject to verification.`}
        breadcrumbs={[{ label: "Projects", href: "/projects" }, { label: project.title }]}
      />
      <section className="container mx-auto px-4 py-8 md:py-12">
        <p className="mb-6 border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-900">
          Demonstration showcase only. Project details, availability, pricing, approvals, RERA references, specifications, amenities and timelines have not been independently verified. Confirm all information before relying on it.
        </p>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="min-w-0 space-y-10">
            <section aria-label="Project gallery">
              <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                <SafeImage src={project.coverImage} alt={`Illustrative project image for ${project.title}`} fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 70vw" />
              </div>
              {project.galleryImages.length > 1 && (
                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {project.galleryImages.slice(1).map((image, index) => (
                    <div className="relative aspect-[4/3] overflow-hidden bg-muted" key={`${image}-${index}`}>
                      <SafeImage src={image} alt={`Illustrative gallery view ${index + 2} of ${project.title}`} fill className="object-cover" sizes="(max-width: 640px) 50vw, 25vw" />
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Project overview</p>
              <h2 className="mt-2 font-serif text-2xl font-semibold text-espresso">An overview of the showcase</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-foreground/75">{project.description}</p>
              <dl className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="border border-border bg-white p-4"><dt className="text-xs text-muted-foreground">Developer</dt><dd className="mt-1 text-sm font-medium text-espresso">{project.developer}</dd></div>
                <div className="border border-border bg-white p-4"><dt className="text-xs text-muted-foreground">Configurations</dt><dd className="mt-1 text-sm font-medium text-espresso">{project.configurations.join(", ")}</dd></div>
                <div className="border border-border bg-white p-4"><dt className="text-xs text-muted-foreground">Indicative starting price</dt><dd className="mt-1 text-sm font-medium text-espresso">{project.priceStarting}</dd></div>
                <div className="border border-border bg-white p-4"><dt className="text-xs text-muted-foreground">Timeline (demo data)</dt><dd className="mt-1 text-sm font-medium text-espresso">{project.possessionDate}</dd></div>
              </dl>
            </section>

            <section className="grid gap-8 md:grid-cols-2">
              <div>
                <h2 className="font-serif text-xl font-semibold text-espresso">Highlights</h2>
                <ul className="mt-4 space-y-3">
                  {project.highlights.map((item) => <li key={item} className="flex gap-2 text-sm text-foreground/75"><Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />{item}</li>)}
                </ul>
              </div>
              <div>
                <h2 className="font-serif text-xl font-semibold text-espresso">Amenities</h2>
                <ul className="mt-4 space-y-3">
                  {project.amenities.map((item) => <li key={item} className="flex gap-2 text-sm text-foreground/75"><Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />{item}</li>)}
                </ul>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-xl font-semibold text-espresso">Floor plans & walkthrough</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="border border-dashed border-border bg-white p-5">
                  <h3 className="text-sm font-semibold text-espresso">Floor plans</h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">No floor plan assets or verified plan details are available in this demonstration project data.</p>
                </div>
                <div className="border border-dashed border-border bg-white p-5">
                  <h3 className="text-sm font-semibold text-espresso">Video walkthrough</h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">A video walkthrough has not been supplied for this project.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-xl font-semibold text-espresso">Location advantages</h2>
              <p className="mt-2 flex items-center gap-2 text-sm text-foreground/75"><MapPin className="h-4 w-4 text-gold" />{project.location}</p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {project.connectivity.map((item) => <li key={item} className="border border-border bg-white p-3 text-xs text-foreground/75">{item}</li>)}
              </ul>
              <p className="mt-3 text-[11px] text-muted-foreground">Distances and connectivity statements shown are demonstration content and require verification.</p>
            </section>
          </div>

          <aside className="h-fit border border-border bg-white p-5 lg:sticky lg:top-28">
            <p className="text-xs uppercase tracking-[0.15em] text-gold">Enquire about this project</p>
            <p className="mt-2 font-serif text-xl font-semibold text-espresso">{project.priceStarting}</p>
            <p className="mt-1 text-xs text-muted-foreground">Indicative demonstration pricing only</p>
            <div className="mt-5 space-y-3">
              <SiteVisitRequestForm propertyId={project.id} propertyTitle={project.title} trigger={<button className="w-full bg-espresso px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-espresso/90">Request a site visit</button>} />
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="block border border-[#25D366] px-4 py-3 text-center text-sm font-medium text-[#168a41] transition-colors hover:bg-[#25D366]/10">Enquire on WhatsApp</a>
              <a href="tel:+917507716161" className="block border border-border px-4 py-3 text-center text-sm font-medium text-espresso transition-colors hover:border-gold">Call our team</a>
            </div>
            <Link href="/contact" className="mt-5 flex items-center justify-between border-t border-border pt-4 text-xs font-medium text-espresso hover:text-bronze">General enquiry <ArrowRight className="h-4 w-4" /></Link>
          </aside>
        </div>
      </section>
      <section className="border-t border-border bg-white py-10">
        <div className="container mx-auto flex flex-col gap-4 px-4 sm:flex-row sm:items-center sm:justify-between">
          <div><h2 className="font-serif text-xl font-semibold text-espresso">Explore other project showcases</h2><p className="mt-1 text-xs text-muted-foreground">All project entries are demonstration data.</p></div>
          <Button asChild variant="outline"><Link href="/projects">View all projects</Link></Button>
        </div>
      </section>
    </PageShell>
  )
}

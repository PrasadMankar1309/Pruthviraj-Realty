import Link from "next/link"
import { projects } from "@/data/projects"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Building, MapPin, ExternalLink } from "lucide-react"

export default function AdminProjectsPage() {
  return (
    <div className="p-6 md:p-8 space-y-6 max-w-6xl">
      <div>
        <h1 className="text-2xl font-serif font-semibold text-espresso">Projects</h1>
        <p className="text-sm text-muted-foreground mt-0.5">{projects.length} projects in portfolio</p>
      </div>

      <div className="space-y-4">
        {projects.map((proj) => (
          <div key={proj.id} className="bg-white border border-border rounded-xl p-5 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <Badge variant="outline" className="text-[10px] text-gold border-gold/40">{proj.type}</Badge>
                  <Badge variant="secondary" className="text-[10px]">{proj.status}</Badge>
                  {proj.reraId && (
                    <span className="text-[10px] text-muted-foreground font-mono">RERA: {proj.reraId}</span>
                  )}
                </div>
                <h3 className="font-serif font-semibold text-lg text-espresso">{proj.title}</h3>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                  <MapPin className="h-3 w-3 text-gold" /> {proj.location}
                </p>
                {proj.developer && (
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Developer: <span className="font-medium text-espresso">{proj.developer}</span>
                  </p>
                )}
                <p className="text-xs font-semibold text-espresso mt-1">
                  Starting from: {proj.priceStarting}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Link href="/projects" target="_blank">
                  <Button variant="outline" size="sm" className="text-xs gap-1.5">
                    <ExternalLink className="h-3.5 w-3.5" />
                    View Listing
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-amber-800 mb-1">📋 Project Management Note</h3>
        <p className="text-xs text-amber-700 leading-relaxed">
          Project data is currently stored in <code className="bg-amber-100 px-1 rounded">data/projects.ts</code>.
          To enable full CRUD (create, edit, delete projects), connect a PostgreSQL database and use the Prisma ORM.
          The project data model is compatible with the existing TypeScript interface.
        </p>
      </div>
    </div>
  )
}

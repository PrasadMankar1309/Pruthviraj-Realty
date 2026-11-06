"use client"

import { useState } from "react"
import Link from "next/link"
import PageShell from "@/components/page-shell"
import PageHero from "@/components/page-hero"
import SafeImage from "@/components/safe-image"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, ArrowRight } from "lucide-react"

interface GalleryItem {
  id: string
  title: string
  category: "Architectural Enclaves" | "Land & Countryside" | "Interiors & Villas" | "Commercial"
  location: string
  image: string
  aspectRatio: string
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g-1",
    title: "Gangapur Dam Lakeside Vistas",
    category: "Land & Countryside",
    location: "Gangapur Road, Nashik",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1332&auto=format&fit=crop",
    aspectRatio: "aspect-[4/3]",
  },
  {
    id: "g-2",
    title: "Serene Vistas Architectural Facade",
    category: "Architectural Enclaves",
    location: "Mahatmanagar, Nashik",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    aspectRatio: "aspect-[16/10]",
  },
  {
    id: "g-3",
    title: "Trimbakeshwar Valley Countryside Plots",
    category: "Land & Countryside",
    location: "Trimbakeshwar Foothills",
    image: "https://images.unsplash.com/photo-1500076656116-558758c991c1?q=80&w=1200&auto=format&fit=crop",
    aspectRatio: "aspect-[4/3]",
  },
  {
    id: "g-4",
    title: "Contemporary Villa Living Spaces",
    category: "Interiors & Villas",
    location: "Gangapur Road",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop",
    aspectRatio: "aspect-[16/10]",
  },
  {
    id: "g-5",
    title: "The Capital Corporate Atrium",
    category: "Commercial",
    location: "Mumbai Naka, Central Nashik",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
    aspectRatio: "aspect-[4/3]",
  },
  {
    id: "g-6",
    title: "Plotted Development Gated Enclave",
    category: "Architectural Enclaves",
    location: "Gangapur Greens Corridor",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop",
    aspectRatio: "aspect-[16/10]",
  },
  {
    id: "g-7",
    title: "Private Courtyard & Pool Villa",
    category: "Interiors & Villas",
    location: "Savargaon Belt, Nashik",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1200&auto=format&fit=crop",
    aspectRatio: "aspect-[4/3]",
  },
  {
    id: "g-8",
    title: "Agricultural Acreage & Vineyards",
    category: "Land & Countryside",
    location: "Dindori Agri-Belt",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
    aspectRatio: "aspect-[16/10]",
  },
]

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState<string>("All")
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null)

  const categories = ["All", "Architectural Enclaves", "Land & Countryside", "Interiors & Villas", "Commercial"]

  const filteredItems = activeFilter === "All"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeFilter)

  return (
    <PageShell>
      <PageHero
        eyebrow="Architectural Perspectives"
        title="Visual Gallery"
        description="A selection of illustrative landscape, interior and architectural photography."
        breadcrumbs={[{ label: "Gallery" }]}
        align="center"
      />

      <div className="container mx-auto px-4 py-12">
        <p className="mx-auto mb-8 max-w-3xl border border-amber-200 bg-amber-50 px-4 py-3 text-center text-xs leading-relaxed text-amber-900">
          The images on this page are illustrative stock photography. They are not verified photos of a specific Pruthviraj Realty property, development or project.
        </p>
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              aria-pressed={activeFilter === cat}
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all ${
                activeFilter === cat
                  ? "bg-espresso text-white shadow-sm"
                  : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-espresso"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveImage(item)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault()
                  setActiveImage(item)
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`View illustrative image: ${item.title}`}
              className="group relative overflow-hidden rounded-sm border border-border bg-card shadow-sm transition-all hover:shadow-md"
            >
              <div className={`relative w-full overflow-hidden ${item.aspectRatio}`}>
                <SafeImage
                  src={item.image}
                  alt={`Illustrative stock photograph: ${item.title}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                <div className="absolute top-3 left-3">
                  <Badge variant="outline" className="bg-espresso/70 text-white backdrop-blur-sm border-white/20 text-[10px]">
                    {item.category}
                  </Badge>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-serif font-semibold text-lg leading-tight group-hover:text-gold transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-ivory/70 mt-1">
                    <MapPin className="h-3 w-3 text-gold" />
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center bg-muted/30 border border-border rounded-xl p-8 max-w-3xl mx-auto">
          <h3 className="mb-2 font-serif text-xl font-semibold text-espresso">Explore Property Listings</h3>
          <p className="text-xs text-muted-foreground mb-6">
            Listings on this site include demonstration data. Confirm all property details with the team before relying on them.
          </p>
          <Link href="/properties">
            <Button className="bg-espresso hover:bg-espresso/90 text-white text-xs px-6">
              View Active Property Listings <ArrowRight className="h-3.5 w-3.5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
      <Dialog open={activeImage !== null} onOpenChange={(open) => { if (!open) setActiveImage(null) }}>
        <DialogContent className="max-w-4xl border-border bg-ivory p-4 sm:p-6">
          <DialogTitle className="pr-8 font-serif text-espresso">{activeImage?.title}</DialogTitle>
          <DialogDescription>Illustrative stock photography, not a verified property image.</DialogDescription>
          {activeImage && (
            <div className={`relative w-full overflow-hidden ${activeImage.aspectRatio}`}>
              <SafeImage src={activeImage.image} alt={`Illustrative stock photograph: ${activeImage.title}`} fill className="object-cover" sizes="90vw" />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </PageShell>
  )
}

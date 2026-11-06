"use client"

import Link from "next/link"
import { MapPin, Bed, Bath, MessageCircle, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/lib/i18n"
import type { Property } from "@/data/properties"
import SafeImage from "@/components/safe-image"

const WHATSAPP_NUMBER = "917507716161"

interface PropertyCardProps {
  property: Property
  variant?: "default" | "compact" | "horizontal"
}

export default function PropertyCard({ property, variant = "default" }: PropertyCardProps) {
  const { t } = useI18n()
  const waMsg = `Hi! I'm interested in "${property.title}" (${property.location}). Please share more details.`
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMsg)}`

  const statusColour =
    property.status === "Available" ? "bg-green-100 text-green-800 border-green-200" :
    property.status === "Sold" ? "bg-red-100 text-red-700 border-red-200" :
    property.status === "Coming Soon" ? "bg-blue-100 text-blue-800 border-blue-200" :
    "bg-amber-100 text-amber-800 border-amber-200"

  if (variant === "horizontal") {
    return (
      <div className="card-premium group flex bg-white overflow-hidden">
        <div className="relative w-48 flex-shrink-0 overflow-hidden">
          <SafeImage
            src={property.image || "/placeholder.jpg"}
            alt={`Illustrative photo for demo listing: ${property.title}`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="192px"
          />
          {property.isDemo && (
            <span className="absolute top-2 left-2 text-[9px] tracking-wide uppercase px-1.5 py-0.5 bg-amber-100/90 text-amber-800">Demo</span>
          )}
        </div>
        <div className="flex flex-col flex-1 p-4">
          <div className="flex items-start justify-between gap-2 mb-1">
            <p className="text-[10px] font-medium tracking-[0.1em] uppercase text-gold">{property.category}</p>
            <span className={`text-[9px] font-semibold tracking-wide uppercase px-2 py-0.5 border ${statusColour}`}>
              {property.status}
            </span>
          </div>
          <h3 className="font-serif text-sm font-semibold text-espresso leading-snug mb-1 line-clamp-1">
            {property.title}
          </h3>
          <div className="flex items-center gap-1 text-muted-foreground mb-2">
            <MapPin className="h-3 w-3 flex-shrink-0" />
            <span className="text-xs truncate">{property.location}</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-espresso/60 mb-3">
            <span>{property.area}</span>
            {property.beds !== undefined && <span>{property.beds} {t.property.beds}</span>}
          </div>
          <div className="flex items-center justify-between mt-auto">
            <span className="text-sm font-serif font-semibold text-espresso">
              {property.priceOnRequest ? t.property.priceOnRequest : property.priceDisplay}
            </span>
            <Link href={`/properties/${property.id}`} className="text-xs text-gold hover:text-bronze font-medium flex items-center gap-1">
              {t.property.viewDetails} <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="card-premium group flex flex-col bg-white overflow-hidden">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <SafeImage
          src={property.image || "/placeholder.jpg"}
          alt={`Illustrative photo for demo listing: ${property.title}`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Status */}
        <span className={`absolute top-3 left-3 text-[10px] font-semibold tracking-wide uppercase px-2.5 py-1 border ${statusColour}`}>
          {property.status}
        </span>
        {/* Transaction */}
        <span className="absolute top-3 right-3 text-[10px] font-semibold tracking-wide uppercase px-2.5 py-1 bg-espresso/90 text-ivory">
          {property.transaction}
        </span>
        {/* New badge */}
        {property.isNew && (
          <span className="absolute bottom-3 left-3 text-[10px] font-semibold tracking-wide uppercase px-2.5 py-1 bg-gold text-espresso">
            New
          </span>
        )}
        {/* Demo badge */}
        {property.isDemo && (
          <span className="absolute bottom-3 right-3 text-[9px] tracking-wide uppercase px-2 py-0.5 bg-amber-100/90 text-amber-800">
            Demo
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <p className="text-[11px] font-medium tracking-[0.1em] uppercase text-gold mb-1.5">
          {property.category}
        </p>
        <h3 className="font-serif text-base font-semibold text-espresso leading-snug mb-2 line-clamp-2">
          {property.title}
        </h3>
        <div className="flex items-center gap-1 text-muted-foreground mb-3">
          <MapPin className="h-3 w-3 flex-shrink-0" />
          <span className="text-xs truncate">{property.location}</span>
        </div>

        {/* Specs */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-espresso/60 mb-4">
          <span>{property.area}</span>
          {property.beds !== undefined && (
            <span className="flex items-center gap-1">
              <Bed className="h-3 w-3" />{property.beds} {t.property.beds}
            </span>
          )}
          {property.baths !== undefined && (
            <span className="flex items-center gap-1">
              <Bath className="h-3 w-3" />{property.baths} {t.property.baths}
            </span>
          )}
        </div>

        {/* Price */}
        <div className="mb-5">
          {property.priceOnRequest ? (
            <span className="text-sm font-medium text-bronze italic">{t.property.priceOnRequest}</span>
          ) : (
            <span className="text-lg font-serif font-semibold text-espresso">
              {property.priceDisplay}
            </span>
          )}
        </div>

        {/* CTAs */}
        <div className="flex gap-2 mt-auto">
          <Button
            asChild
            size="sm"
            className="flex-1 bg-espresso text-ivory hover:bg-espresso/90 rounded-none text-xs font-medium tracking-wide"
          >
            <Link href={`/properties/${property.id}`}>{t.property.viewDetails}</Link>
          </Button>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Enquire on WhatsApp"
            className="flex items-center justify-center gap-1.5 px-3 py-2 border border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors text-xs font-medium"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            <span className="hidden sm:inline sr-only md:not-sr-only">WA</span>
          </a>
        </div>
      </div>
    </div>
  )
}

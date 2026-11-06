"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Search } from "lucide-react"
import PageShell from "@/components/page-shell"
import PageHero from "@/components/page-hero"
import PropertyCard from "@/components/property-card"
import PropertyFilter, { type FilterValues } from "@/components/property-filter"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { searchProperties } from "@/data/properties"
import type { Property, PropertyCategory } from "@/data/properties"
import { useI18n } from "@/lib/i18n"

const PAGE_SIZE = 9

function sortProperties(list: Property[], sortBy: string) {
  const sorted = [...list]
  switch (sortBy) {
    case "price-low":
      return sorted.sort((a, b) => {
        if (a.priceOnRequest) return 1
        if (b.priceOnRequest) return -1
        return a.price - b.price
      })
    case "price-high":
      return sorted.sort((a, b) => {
        if (a.priceOnRequest) return 1
        if (b.priceOnRequest) return -1
        return b.price - a.price
      })
    case "area-small":
      return sorted.sort((a, b) => (a.areaSqFt || 0) - (b.areaSqFt || 0))
    case "area-large":
      return sorted.sort((a, b) => (b.areaSqFt || 0) - (a.areaSqFt || 0))
    default:
      return sorted
  }
}

interface PropertyListingPageProps {
  title: string
  subtitle: string
  category?: PropertyCategory
  transaction?: string
  initialFilters?: Partial<FilterValues>
}

export default function PropertyListingPage({
  title,
  subtitle,
  category,
  transaction,
  initialFilters,
}: PropertyListingPageProps) {
  const { t } = useI18n()
  const [query, setQuery] = useState("")
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState<FilterValues>({
    location: initialFilters?.location || "",
    category: category || initialFilters?.category || "",
    transaction: transaction || initialFilters?.transaction || "",
    minPrice: initialFilters?.minPrice || "",
    maxPrice: initialFilters?.maxPrice || "",
    sortBy: initialFilters?.sortBy || "newest",
  })

  const results = useMemo(() => {
    const filtered = searchProperties({
      location: filters.location || undefined,
      category: category || filters.category || undefined,
      transaction: transaction || filters.transaction || undefined,
      minPrice: filters.minPrice ? Number(filters.minPrice) : undefined,
      maxPrice: filters.maxPrice ? Number(filters.maxPrice) : undefined,
    }).filter((property) => {
      const needle = query.trim().toLowerCase()
      return !needle || [property.title, property.location, property.category].some((value) => value.toLowerCase().includes(needle))
    })
    return sortProperties(filtered, filters.sortBy)
  }, [category, filters, query, transaction])

  const pageCount = Math.max(1, Math.ceil(results.length / PAGE_SIZE))
  const visibleProperties = results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handleFilters = (nextFilters: FilterValues) => {
    setFilters({ ...nextFilters, ...(category ? { category } : {}), ...(transaction ? { transaction } : {}) })
    setPage(1)
  }

  return (
    <PageShell>
      <PageHero
        eyebrow={category ? "Property Collection" : transaction || "Property Portfolio"}
        title={title}
        description={subtitle}
        breadcrumbs={[
          { label: "Properties", href: "/properties" },
          ...(category ? [{ label: title }] : transaction ? [{ label: transaction }] : [{ label: "All Properties" }]),
        ]}
      />
      <section className="container mx-auto px-4 py-9 md:py-14">
        <div className="mb-6 max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-gold">Find the right fit</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Refine by location, property type, transaction, budget or area.</p>
        </div>
        <PropertyFilter
          key={`${category || "all"}-${transaction || "any"}`}
          initialFilters={{ ...initialFilters, category: category || initialFilters?.category, transaction: transaction || initialFilters?.transaction }}
          lockedCategory={Boolean(category)}
          lockedTransaction={Boolean(transaction)}
          onFilterChange={handleFilters}
        />
        <div className="my-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <label className="relative block w-full sm:max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input
              type="search"
              value={query}
              onChange={(event) => { setQuery(event.target.value); setPage(1) }}
              placeholder="Search by property, location or type"
              aria-label="Search properties"
              className="h-11 border-border bg-white pl-9"
            />
          </label>
          <p aria-live="polite" className="text-sm text-muted-foreground">
            {t.filters.showing} <span className="font-semibold text-espresso">{results.length}</span> {t.filters.results}
          </p>
        </div>
        <p className="mb-5 text-xs italic text-muted-foreground">Illustrative listings; availability, imagery, and pricing require confirmation.</p>

        {visibleProperties.length === 0 ? (
          <div className="rounded-sm border border-dashed border-border bg-white px-5 py-16 text-center">
            <h2 className="font-serif text-xl font-semibold text-espresso">No properties match those filters</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">{t.filters.noResults}</p>
            <Link href="/buyer-requirements" className="mt-5 inline-flex">
              <Button className="bg-espresso text-white hover:bg-espresso/90">Share your requirements</Button>
            </Link>
          </div>
        ) : (
          <div className="animate-stagger grid property-card-grid items-stretch gap-5">
            {visibleProperties.map((property) => <div key={property.id} className="animate-stagger-item"><PropertyCard property={property} /></div>)}
          </div>
        )}

        {results.length > PAGE_SIZE && (
          <nav aria-label="Property results pages" className="mt-9 flex items-center justify-center gap-2">
            <Button variant="outline" size="sm" aria-label="Previous page" disabled={page === 1} onClick={() => setPage((current) => current - 1)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => (
              <Button
                key={pageNumber}
                variant={page === pageNumber ? "default" : "outline"}
                size="sm"
                aria-current={page === pageNumber ? "page" : undefined}
                onClick={() => setPage(pageNumber)}
                className={page === pageNumber ? "bg-espresso text-white" : ""}
              >
                {pageNumber}
              </Button>
            ))}
            <Button variant="outline" size="sm" aria-label="Next page" disabled={page === pageCount} onClick={() => setPage((current) => current + 1)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </nav>
        )}
      </section>
    </PageShell>
  )
}

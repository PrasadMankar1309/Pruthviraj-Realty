"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, SlidersHorizontal } from "lucide-react"
import { useI18n } from "@/lib/i18n"
import { nashikLocations, propertyCategories } from "@/data/properties"

export interface FilterValues {
  location: string
  category: string
  transaction: string
  minPrice: string
  maxPrice: string
  sortBy: string
}

const DEFAULT_FILTERS: FilterValues = {
  location: "",
  category: "",
  transaction: "",
  minPrice: "",
  maxPrice: "",
  sortBy: "newest",
}

const PRICE_RANGES_SALE = [
  { label: "Under ₹10 Lakh", min: "0", max: "1000000" },
  { label: "₹10L – ₹25L", min: "1000000", max: "2500000" },
  { label: "₹25L – ₹50L", min: "2500000", max: "5000000" },
  { label: "₹50L – ₹1 Crore", min: "5000000", max: "10000000" },
  { label: "₹1Cr – ₹3 Crore", min: "10000000", max: "30000000" },
  { label: "Above ₹3 Crore", min: "30000000", max: "" },
]

const PRICE_RANGES_RENT = [
  { label: "Under ₹10,000/mo", min: "0", max: "10000" },
  { label: "₹10K – ₹20K/mo", min: "10000", max: "20000" },
  { label: "₹20K – ₹50K/mo", min: "20000", max: "50000" },
  { label: "Above ₹50K/mo", min: "50000", max: "" },
]

interface PropertyFilterProps {
  onFilterChange?: (filters: FilterValues) => void
  initialFilters?: Partial<FilterValues>
  compact?: boolean
  lockedCategory?: boolean
  lockedTransaction?: boolean
}

export default function PropertyFilter({
  onFilterChange,
  initialFilters = {},
  compact = false,
  lockedCategory = false,
  lockedTransaction = false,
}: PropertyFilterProps) {
  const { t } = useI18n()
  const [filters, setFilters] = useState<FilterValues>({ ...DEFAULT_FILTERS, ...initialFilters })
  const [isExpanded, setIsExpanded] = useState(!compact)

  const isRent = filters.transaction === "For Rent"
  const priceRanges = isRent ? PRICE_RANGES_RENT : PRICE_RANGES_SALE

  const hasActiveFilters = Object.entries(filters).some(
    ([key, val]) => key !== "sortBy" && val !== ""
  )

  const update = (key: keyof FilterValues, value: string) => {
    const updated = { ...filters, [key]: value }
    setFilters(updated)
    onFilterChange?.(updated)
  }

  const clearAll = () => {
    const cleared = {
      ...DEFAULT_FILTERS,
      ...(lockedCategory ? { category: initialFilters.category || "" } : {}),
      ...(lockedTransaction ? { transaction: initialFilters.transaction || "" } : {}),
    }
    setFilters(cleared)
    onFilterChange?.(cleared)
  }

  const setPriceRange = (min: string, max: string) => {
    const updated = { ...filters, minPrice: min, maxPrice: max }
    setFilters(updated)
    onFilterChange?.(updated)
  }

  return (
    <div className="bg-white border border-border">
      {/* Filter header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-gold" />
          <span className="text-sm font-medium text-espresso">Filter Properties</span>
          {hasActiveFilters && (
            <span className="text-[10px] bg-gold text-espresso px-1.5 py-0.5 rounded-sm font-semibold">
              Active
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          {hasActiveFilters && (
            <button
              onClick={clearAll}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-espresso transition-colors"
            >
              <X className="h-3 w-3" />
              {t.filters.clearAll}
            </button>
          )}
          {compact && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs text-gold hover:text-bronze font-medium"
            >
              {isExpanded ? "Collapse" : "Expand"}
            </button>
          )}
        </div>
      </div>

      {/* Filter controls */}
      {isExpanded && (
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
          {/* Location */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-espresso/70 tracking-wide">{t.filters.location}</label>
            <Select value={filters.location} onValueChange={(v) => update("location", v === "all" ? "" : v)}>
              <SelectTrigger className="rounded-none h-9 text-sm border-border">
                <SelectValue placeholder={t.filters.locationPlaceholder} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.filters.any}</SelectItem>
                {nashikLocations.slice(1).map((loc) => (
                  <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-espresso/70 tracking-wide">{t.filters.propertyType}</label>
            <Select value={filters.category} onValueChange={(v) => update("category", v === "all" ? "" : v)} disabled={lockedCategory}>
              <SelectTrigger className="rounded-none h-9 text-sm border-border">
                <SelectValue placeholder={t.filters.any} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.filters.any}</SelectItem>
                {propertyCategories.map((c) => (
                  <SelectItem key={c.id} value={c.category}>{c.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Transaction */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-espresso/70 tracking-wide">Transaction</label>
            <Select value={filters.transaction} onValueChange={(v) => update("transaction", v === "all" ? "" : v)} disabled={lockedTransaction}>
              <SelectTrigger className="rounded-none h-9 text-sm border-border">
                <SelectValue placeholder={t.filters.any} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.filters.any}</SelectItem>
                <SelectItem value="For Sale">{t.property.forSale}</SelectItem>
                <SelectItem value="For Rent">{t.property.forRent}</SelectItem>
                <SelectItem value="For Lease">{t.property.forLease}</SelectItem>
                <SelectItem value="New Project">{t.property.newProject}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Price Range */}
          <div className="space-y-1.5 sm:col-span-2 lg:col-span-1">
            <label className="text-xs font-medium text-espresso/70 tracking-wide">{t.filters.priceRange}</label>
            <Select
              value={`${filters.minPrice}_${filters.maxPrice}`}
              onValueChange={(v) => {
                const [min, max] = v.split("_")
                setPriceRange(min, max)
              }}
            >
              <SelectTrigger className="rounded-none h-9 text-sm border-border">
                <SelectValue placeholder={t.filters.any} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="_">{t.filters.any}</SelectItem>
                {priceRanges.map((r) => (
                  <SelectItem key={r.label} value={`${r.min}_${r.max}`}>{r.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sort */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-espresso/70 tracking-wide">{t.filters.sortBy}</label>
            <Select value={filters.sortBy} onValueChange={(v) => update("sortBy", v)}>
              <SelectTrigger className="rounded-none h-9 text-sm border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">{t.filters.newest}</SelectItem>
                <SelectItem value="price-low">{t.filters.priceLow}</SelectItem>
                <SelectItem value="price-high">{t.filters.priceHigh}</SelectItem>
                <SelectItem value="area-small">{t.filters.areaSmall}</SelectItem>
                <SelectItem value="area-large">{t.filters.areaLarge}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Search button */}
          <div className="flex items-end">
            <Button
              className="w-full bg-espresso text-white hover:bg-espresso/90 rounded-none h-9 text-xs font-medium tracking-wide"
              onClick={() => onFilterChange?.(filters)}
            >
              {t.filters.search}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

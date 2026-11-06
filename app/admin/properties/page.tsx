"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { properties, type Property, type PropertyStatus } from "@/data/properties"
import { Search, Eye, Star, StarOff, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const STATUS_COLORS: Record<PropertyStatus, string> = {
  Available: "bg-emerald-100 text-emerald-700",
  Sold: "bg-rose-100 text-rose-700",
  "Under Negotiation": "bg-amber-100 text-amber-700",
  "Coming Soon": "bg-blue-100 text-blue-700",
}

export default function AdminPropertiesPage() {
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("All")
  const [statusFilter, setStatusFilter] = useState("All")
  // Local status overrides (in-memory — resets on refresh as no DB)
  const [statusOverrides, setStatusOverrides] = useState<Record<string, PropertyStatus>>({})
  const [featuredOverrides, setFeaturedOverrides] = useState<Record<string, boolean>>({})

  const filtered = properties.filter((p) => {
    const q = search.toLowerCase()
    const matchSearch = !q ||
      p.title.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    const matchCategory = categoryFilter === "All" || p.category === categoryFilter
    const currentStatus = statusOverrides[p.id] || p.status
    const matchStatus = statusFilter === "All" || currentStatus === statusFilter
    return matchSearch && matchCategory && matchStatus
  })

  const uniqueCategories = Array.from(new Set(properties.map((p) => p.category))).sort()

  const handleStatusChange = (id: string, status: PropertyStatus) => {
    setStatusOverrides((prev) => ({ ...prev, [id]: status }))
  }

  const handleFeaturedToggle = (id: string, currentFeatured: boolean) => {
    setFeaturedOverrides((prev) => ({ ...prev, [id]: !currentFeatured }))
  }

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-serif font-semibold text-espresso">Property Listings</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {filtered.length} of {properties.length} properties
          </p>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-3 py-1.5">
            ⚠️ Status changes are demo-only and reset on refresh. Connect a database for persistence.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-border rounded-xl p-4 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search title, location, category..."
            className="pl-8 text-xs h-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="h-9 text-xs w-48">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Categories</SelectItem>
            {uniqueCategories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="h-9 text-xs w-40">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Statuses</SelectItem>
            <SelectItem value="Available">Available</SelectItem>
            <SelectItem value="Under Negotiation">Under Negotiation</SelectItem>
            <SelectItem value="Sold">Sold</SelectItem>
            <SelectItem value="Coming Soon">Coming Soon</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((prop) => {
          const currentStatus = statusOverrides[prop.id] || prop.status
          const isFeatured = featuredOverrides[prop.id] !== undefined
            ? featuredOverrides[prop.id]
            : (prop.isFeatured || false)

          return (
            <div key={prop.id} className="bg-white border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
              {/* Image */}
              <div className="relative h-40 bg-muted">
                {prop.image && (
                  <Image
                    src={prop.image}
                    alt={prop.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute top-2 right-2 flex gap-1.5">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${STATUS_COLORS[currentStatus]}`}>
                    {currentStatus}
                  </span>
                  {isFeatured && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gold/90 text-white">
                      ⭐ Featured
                    </span>
                  )}
                </div>
                <div className="absolute bottom-2 left-2">
                  <span className="text-[10px] text-white/80 bg-black/30 px-1.5 py-0.5 rounded">
                    {prop.id}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 flex-1 flex flex-col">
                <div className="mb-2">
                  <span className="text-[10px] font-medium text-gold uppercase tracking-wide">{prop.category}</span>
                  <h3 className="font-serif font-semibold text-sm text-espresso leading-tight mt-0.5 line-clamp-1">
                    {prop.title}
                  </h3>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{prop.location} · {prop.area}</p>
                  <p className="text-xs font-semibold text-espresso mt-1">
                    {prop.priceOnRequest ? "Price on Request" : prop.priceDisplay}
                  </p>
                </div>

                {/* Actions */}
                <div className="mt-auto pt-3 border-t border-border space-y-2">
                  <Select
                    value={currentStatus}
                    onValueChange={(val) => handleStatusChange(prop.id, val as PropertyStatus)}
                  >
                    <SelectTrigger className="h-7 text-[11px] w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Available">✅ Available</SelectItem>
                      <SelectItem value="Under Negotiation">🟡 Under Negotiation</SelectItem>
                      <SelectItem value="Sold">🔴 Sold</SelectItem>
                      <SelectItem value="Coming Soon">🔵 Coming Soon</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleFeaturedToggle(prop.id, isFeatured)}
                      className={`flex-1 flex items-center justify-center gap-1.5 h-7 text-[11px] rounded-md border transition-all ${
                        isFeatured
                          ? "border-gold/40 bg-gold/10 text-amber-700"
                          : "border-border text-muted-foreground hover:border-gold/30"
                      }`}
                    >
                      {isFeatured ? <Star className="h-3 w-3 fill-current" /> : <StarOff className="h-3 w-3" />}
                      {isFeatured ? "Featured" : "Set Featured"}
                    </button>

                    <Link href={`/properties/${prop.id}`} target="_blank">
                      <Button variant="ghost" size="sm" className="h-7 text-[11px] gap-1">
                        <Eye className="h-3 w-3" /> View
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="bg-white border border-border rounded-xl p-12 text-center">
          <p className="text-sm text-muted-foreground">No properties match your current filters.</p>
        </div>
      )}

      {/* Database note */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-amber-800 mb-1">📋 Production Database Note</h3>
        <p className="text-xs text-amber-700 leading-relaxed">
          Property data is currently stored as static TypeScript data in <code className="bg-amber-100 px-1 rounded">data/properties.ts</code>.
          Status changes shown above are in-memory overrides and will reset when the server restarts.
          To enable persistent CRUD, connect a PostgreSQL database (via Supabase or Neon) and run Prisma migrations.
          See <code className="bg-amber-100 px-1 rounded">.env.local.example</code> for required environment variables.
        </p>
      </div>
    </div>
  )
}

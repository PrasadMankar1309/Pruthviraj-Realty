"use client"

import { useState, useEffect, useCallback } from "react"
import { Phone, Mail, CalendarCheck, RefreshCw, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { SiteVisitRequest, SiteVisitStatus } from "@/lib/leads"

const STATUS_COLORS: Record<SiteVisitStatus, string> = {
  Requested: "bg-amber-100 text-amber-700 border-amber-200",
  Confirmed: "bg-green-100 text-green-700 border-green-200",
  Rescheduled: "bg-blue-100 text-blue-700 border-blue-200",
  Completed: "bg-gray-100 text-gray-600 border-gray-200",
  Cancelled: "bg-red-100 text-red-600 border-red-200",
}

const ALL_STATUSES: SiteVisitStatus[] = ["Requested", "Confirmed", "Rescheduled", "Completed", "Cancelled"]

export default function AdminSiteVisitsPage() {
  const [visits, setVisits] = useState<SiteVisitRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState("All")

  const fetchVisits = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/site-visits")
      if (!res.ok) return
      const data = await res.json()
      if (data.success) setVisits(data.visits)
    } catch {}
    setLoading(false)
  }, [])

  useEffect(() => { fetchVisits() }, [fetchVisits])

  const updateStatus = async (id: string, status: SiteVisitStatus) => {
    try {
      const res = await fetch("/api/site-visits", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      })
      const data = await res.json()
      if (data.success) {
        setVisits((prev) => prev.map((v) => v.id === id ? data.visit : v))
      }
    } catch {}
  }

  const filtered = visits.filter((v) =>
    filterStatus === "All" || v.status === filterStatus
  )

  const isUpcoming = (dateStr: string) => new Date(dateStr) >= new Date()

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-serif font-semibold text-espresso">Site Visit Requests</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {filtered.length} requests
            {" · "}
            {visits.filter((v) => v.status === "Requested").length} pending confirmation
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="h-9 text-xs w-40">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Statuses</SelectItem>
              {ALL_STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
          <Button
            onClick={fetchVisits}
            variant="outline"
            size="sm"
            className="gap-2 text-xs"
            disabled={loading}
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Visit Cards */}
      {loading ? (
        <div className="bg-white border border-border rounded-xl p-12 text-center text-sm text-muted-foreground">
          Loading site visits...
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white border border-border rounded-xl p-12 text-center">
          <CalendarCheck className="h-10 w-10 mx-auto text-muted-foreground/40 mb-3" />
          <p className="text-sm text-muted-foreground">No site visit requests match the selected filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((visit) => {
            const upcoming = isUpcoming(visit.preferredDate)
            const visitDate = new Date(visit.preferredDate).toLocaleDateString("en-IN", {
              weekday: "short", day: "numeric", month: "long", year: "numeric"
            })

            return (
              <div key={visit.id} className="bg-white border border-border rounded-xl p-5 shadow-sm">
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-semibold text-espresso">{visit.name}</h3>
                    <a href={`tel:${visit.phone}`} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-gold mt-0.5">
                      <Phone className="h-3 w-3 text-gold" /> {visit.phone}
                    </a>
                    {visit.email && (
                      <a href={`mailto:${visit.email}`} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-gold">
                        <Mail className="h-3 w-3 text-gold" /> {visit.email}
                      </a>
                    )}
                  </div>
                  <span className={`text-[11px] font-semibold px-2 py-1 rounded-full border shrink-0 ${STATUS_COLORS[visit.status]}`}>
                    {visit.status}
                  </span>
                </div>

                {/* Property */}
                <div className="flex items-start gap-2 p-3 bg-muted/30 rounded-lg mb-3">
                  <MapPin className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-espresso">{visit.propertyTitle}</p>
                    <p className="text-[11px] text-muted-foreground">Property ID: {visit.propertyId}</p>
                  </div>
                </div>

                {/* Date & Time */}
                <div className={`flex items-center gap-2 text-xs mb-3 ${upcoming ? "text-espresso" : "text-muted-foreground"}`}>
                  <Clock className="h-3.5 w-3.5 text-gold" />
                  <span>
                    {visitDate} · {visit.preferredTime}
                    {!upcoming && " (past)"}
                    {upcoming && visit.status === "Confirmed" && " ✅"}
                  </span>
                </div>

                {/* Message */}
                {visit.message && (
                  <p className="text-[11px] text-foreground/70 italic bg-muted/20 rounded p-2 mb-3">
                    "{visit.message}"
                  </p>
                )}

                {/* Status Update */}
                <div className="pt-3 border-t border-border">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">Update Status</p>
                  <Select value={visit.status} onValueChange={(val) => updateStatus(visit.id, val as SiteVisitStatus)}>
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ALL_STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

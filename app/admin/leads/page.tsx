"use client"

import { useState, useEffect, useCallback } from "react"
import { Phone, Mail, Filter, RefreshCw, Search, ChevronDown, Plus, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import type { Lead, LeadStatus, LeadType } from "@/lib/leads"

const STATUS_COLORS: Record<string, string> = {
  New: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Contacted: "bg-blue-100 text-blue-700 border-blue-200",
  Qualified: "bg-purple-100 text-purple-700 border-purple-200",
  "Site Visit Requested": "bg-amber-100 text-amber-700 border-amber-200",
  "Follow-up Required": "bg-orange-100 text-orange-700 border-orange-200",
  Converted: "bg-green-100 text-green-700 border-green-200",
  Closed: "bg-gray-100 text-gray-600 border-gray-200",
  "Not Interested": "bg-red-100 text-red-600 border-red-200",
}

const ALL_STATUSES: LeadStatus[] = [
  "New", "Contacted", "Qualified", "Site Visit Requested",
  "Follow-up Required", "Converted", "Closed", "Not Interested",
]

const ALL_TYPES: LeadType[] = [
  "Property Enquiry", "Buyer Requirement", "Seller / Landowner Submission",
  "Investor Enquiry", "Contact Inquiry", "Site Visit Request", "Large Land / Developer Enquiry",
]

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [filterType, setFilterType] = useState("All")
  const [filterStatus, setFilterStatus] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [noteInputs, setNoteInputs] = useState<Record<string, string>>({})
  const [addingNote, setAddingNote] = useState<string | null>(null)
  const [expandedLead, setExpandedLead] = useState<string | null>(null)

  const fetchLeads = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/leads")
      if (!res.ok) throw new Error("Unauthorized")
      const data = await res.json()
      if (data.success) setLeads(data.leads)
    } catch {
      // Session expired — handled by layout redirect
    }
    setLoading(false)
  }, [])

  useEffect(() => { fetchLeads() }, [fetchLeads])

  const updateStatus = async (id: string, status: LeadStatus) => {
    try {
      await fetch("/api/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      })
      setLeads((prev) => prev.map((l) => l.id === id ? { ...l, status } : l))
    } catch {}
  }

  const submitNote = async (id: string) => {
    const note = noteInputs[id]?.trim()
    if (!note) return
    setAddingNote(id)
    try {
      const res = await fetch("/api/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, note }),
      })
      const data = await res.json()
      if (data.success) {
        setLeads((prev) => prev.map((l) => l.id === id ? data.lead : l))
        setNoteInputs((prev) => ({ ...prev, [id]: "" }))
      }
    } catch {}
    setAddingNote(null)
  }

  const filtered = leads.filter((l) => {
    const matchType = filterType === "All" || l.type === filterType
    const matchStatus = filterStatus === "All" || l.status === filterStatus
    const q = searchQuery.toLowerCase()
    const matchSearch = !q ||
      l.name.toLowerCase().includes(q) ||
      l.phone.includes(q) ||
      (l.email || "").toLowerCase().includes(q) ||
      (l.propertyTitle || "").toLowerCase().includes(q) ||
      (l.location || "").toLowerCase().includes(q)
    return matchType && matchStatus && matchSearch
  })

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-serif font-semibold text-espresso">Leads & Enquiries</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {filtered.length} of {leads.length} leads
          </p>
        </div>
        <Button
          onClick={fetchLeads}
          variant="outline"
          size="sm"
          className="gap-2 text-xs"
          disabled={loading}
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white border border-border rounded-xl p-4 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search name, phone, property..."
            className="pl-8 text-xs h-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="h-9 text-xs w-48">
            <SelectValue placeholder="All Lead Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Lead Types</SelectItem>
            {ALL_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="h-9 text-xs w-40">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Statuses</SelectItem>
            {ALL_STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* Leads Table */}
      {loading ? (
        <div className="bg-white border border-border rounded-xl p-12 text-center text-sm text-muted-foreground">
          Loading leads...
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white border border-border rounded-xl p-12 text-center">
          <p className="text-sm text-muted-foreground">No leads match your filters.</p>
        </div>
      ) : (
        <div className="bg-white border border-border rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-muted/40 border-b border-border text-[11px] font-semibold uppercase tracking-wider text-espresso">
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">Type / Source</th>
                  <th className="py-3 px-4">Interest</th>
                  <th className="py-3 px-4">Budget / Area</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((lead) => (
                  <>
                    <tr key={lead.id} className="hover:bg-muted/20 transition-colors">
                      <td className="py-3.5 px-4">
                        <p className="font-semibold text-espresso text-sm">{lead.name}</p>
                        <a href={`tel:${lead.phone}`} className="flex items-center gap-1 text-muted-foreground hover:text-gold mt-0.5">
                          <Phone className="h-3 w-3 text-gold" /> {lead.phone}
                        </a>
                        {lead.email && (
                          <a href={`mailto:${lead.email}`} className="flex items-center gap-1 text-muted-foreground hover:text-gold">
                            <Mail className="h-3 w-3 text-gold" /> {lead.email}
                          </a>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-block px-2 py-0.5 bg-muted rounded text-[10px] font-medium text-espresso">
                          {lead.type}
                        </span>
                        <p className="text-[10px] text-muted-foreground mt-0.5">{lead.source}</p>
                      </td>
                      <td className="py-3.5 px-4 max-w-[200px]">
                        {lead.propertyTitle && <p className="font-medium text-espresso truncate">{lead.propertyTitle}</p>}
                        {lead.propertyCategory && <p className="text-[11px] text-gold">{lead.propertyCategory}</p>}
                        {lead.location && <p className="text-[11px] text-muted-foreground">{lead.location}</p>}
                        {lead.notes && (
                          <p className="text-[11px] text-foreground/65 italic line-clamp-1 mt-0.5">"{lead.notes}"</p>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-espresso">{lead.budget || lead.area || "—"}</span>
                        {lead.purpose && <p className="text-[10px] text-muted-foreground">{lead.purpose}</p>}
                      </td>
                      <td className="py-3.5 px-4 text-muted-foreground">
                        {new Date(lead.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric", month: "short", year: "2-digit"
                        })}
                      </td>
                      <td className="py-3.5 px-4">
                        <Select value={lead.status} onValueChange={(val) => updateStatus(lead.id, val as LeadStatus)}>
                          <SelectTrigger className={`h-7 text-[11px] w-36 border ${STATUS_COLORS[lead.status] || ""}`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {ALL_STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="py-3.5 px-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-[11px] gap-1"
                          onClick={() => setExpandedLead(expandedLead === lead.id ? null : lead.id)}
                        >
                          <MessageSquare className="h-3 w-3" />
                          Notes {lead.internalNotes?.length > 0 ? `(${lead.internalNotes.length})` : ""}
                        </Button>
                      </td>
                    </tr>

                    {/* Notes expansion row */}
                    {expandedLead === lead.id && (
                      <tr key={`${lead.id}-notes`}>
                        <td colSpan={7} className="px-4 py-3 bg-muted/30 border-b border-border">
                          <div className="space-y-2">
                            {/* Existing notes */}
                            {lead.internalNotes?.length > 0 ? (
                              <div className="space-y-2 mb-3">
                                {lead.internalNotes.map((note) => (
                                  <div key={note.id} className="bg-white border border-border rounded-lg p-3">
                                    <p className="text-xs text-espresso">{note.text}</p>
                                    <p className="text-[10px] text-muted-foreground mt-1">
                                      {note.addedBy} · {new Date(note.createdAt).toLocaleString("en-IN")}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-[11px] text-muted-foreground italic mb-2">No internal notes yet.</p>
                            )}
                            {/* Add note */}
                            <div className="flex gap-2">
                              <Textarea
                                rows={2}
                                placeholder="Add an internal note (not visible to clients)..."
                                className="text-xs resize-none"
                                value={noteInputs[lead.id] || ""}
                                onChange={(e) => setNoteInputs((prev) => ({ ...prev, [lead.id]: e.target.value }))}
                              />
                              <Button
                                size="sm"
                                className="shrink-0 bg-espresso text-white text-xs"
                                disabled={addingNote === lead.id || !noteInputs[lead.id]?.trim()}
                                onClick={() => submitNote(lead.id)}
                              >
                                <Plus className="h-3.5 w-3.5 mr-1" />
                                Add
                              </Button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

import Link from "next/link"
import {
  Users,
  Building,
  CalendarCheck,
  FolderOpen,
  TrendingUp,
  Clock,
  CheckCircle,
  Phone,
  Mail,
  ArrowRight,
  AlertCircle,
} from "lucide-react"
import { getAllLeads, getLeadStats, getAllSiteVisits, getSiteVisitStats } from "@/lib/leads"
import { properties } from "@/data/properties"
import { projects } from "@/data/projects"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

function StatCard({
  label,
  value,
  sublabel,
  icon: Icon,
  iconBg,
  href,
}: {
  label: string
  value: number | string
  sublabel?: string
  icon: React.ElementType
  iconBg: string
  href?: string
}) {
  const content = (
    <div className="bg-white border border-border p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow h-full">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
        <span className={`p-2 rounded-lg ${iconBg}`}>
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <p className="text-3xl font-serif font-bold text-espresso">{value}</p>
      {sublabel && <p className="text-[11px] text-muted-foreground mt-1">{sublabel}</p>}
    </div>
  )

  if (href) {
    return <Link href={href} className="block">{content}</Link>
  }
  return content
}

export default function AdminOverviewPage() {
  const leadStats = getLeadStats()
  const visitStats = getSiteVisitStats()
  const recentLeads = getAllLeads().slice(0, 8)
  const upcomingVisits = getAllSiteVisits()
    .filter((v) => v.status === "Requested" || v.status === "Confirmed")
    .slice(0, 5)

  const availableProperties = properties.filter((p) => p.status === "Available").length
  const soldProperties = properties.filter((p) => p.status === "Sold").length
  const featuredProperties = properties.filter((p) => p.isFeatured).length

  const statusColor: Record<string, string> = {
    New: "bg-emerald-100 text-emerald-700",
    Contacted: "bg-blue-100 text-blue-700",
    Qualified: "bg-purple-100 text-purple-700",
    "Site Visit Requested": "bg-amber-100 text-amber-700",
    "Follow-up Required": "bg-orange-100 text-orange-700",
    Converted: "bg-green-100 text-green-700",
    Closed: "bg-gray-100 text-gray-600",
    "Not Interested": "bg-red-100 text-red-600",
  }

  const typeShort: Record<string, string> = {
    "Property Enquiry": "Enquiry",
    "Buyer Requirement": "Buyer",
    "Seller / Landowner Submission": "Seller",
    "Investor Enquiry": "Investor",
    "Contact Inquiry": "Contact",
    "Site Visit Request": "Site Visit",
    "Large Land / Developer Enquiry": "Developer",
  }

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-serif font-semibold text-espresso">Dashboard Overview</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Pruthviraj Realty — Operations Summary
        </p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="New Leads"
          value={leadStats.newCount}
          sublabel="Awaiting first contact"
          icon={Clock}
          iconBg="bg-emerald-50 text-emerald-600"
          href="/admin/leads"
        />
        <StatCard
          label="Total Leads"
          value={leadStats.total}
          sublabel={`${leadStats.convertedCount} converted`}
          icon={Users}
          iconBg="bg-gold/10 text-amber-600"
          href="/admin/leads"
        />
        <StatCard
          label="Active Properties"
          value={availableProperties}
          sublabel={`${featuredProperties} featured · ${soldProperties} sold`}
          icon={Building}
          iconBg="bg-blue-50 text-blue-600"
          href="/admin/properties"
        />
        <StatCard
          label="Site Visit Requests"
          value={visitStats.requested}
          sublabel={`${visitStats.confirmed} confirmed`}
          icon={CalendarCheck}
          iconBg="bg-purple-50 text-purple-600"
          href="/admin/site-visits"
        />
      </div>

      {/* Lead type breakdown */}
      <div className="bg-white border border-border rounded-xl p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-espresso mb-4">Lead Breakdown by Source</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { label: "Property Enquiries", count: leadStats.byType.propertyEnquiry, color: "bg-blue-500" },
            { label: "Buyer Requirements", count: leadStats.byType.buyerRequirement, color: "bg-amber-500" },
            { label: "Seller Submissions", count: leadStats.byType.sellerSubmission, color: "bg-green-500" },
            { label: "Investor Enquiries", count: leadStats.byType.investorEnquiry, color: "bg-purple-500" },
            { label: "Site Visit Requests", count: leadStats.byType.siteVisitRequest, color: "bg-rose-500" },
            { label: "Contact Inquiries", count: leadStats.byType.contactInquiry, color: "bg-gray-400" },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <div className={`text-2xl font-serif font-bold text-espresso`}>{item.count}</div>
              <div className="text-[10px] text-muted-foreground mt-0.5 leading-tight">{item.label}</div>
              <div className={`h-1 rounded-full mt-2 ${item.color} opacity-60`} />
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Leads */}
        <div className="lg:col-span-2 bg-white border border-border rounded-xl shadow-sm overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-border">
            <h2 className="text-sm font-semibold text-espresso">Recent Leads</h2>
            <Link href="/admin/leads">
              <Button variant="ghost" size="sm" className="text-xs gap-1 text-gold hover:text-espresso">
                View All <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </div>

          {recentLeads.length === 0 ? (
            <div className="p-8 text-center text-sm text-muted-foreground">
              <AlertCircle className="h-8 w-8 mx-auto mb-2 text-muted-foreground/50" />
              No leads yet. They will appear here as enquiries come in.
            </div>
          ) : (
            <div className="divide-y divide-border">
              {recentLeads.map((lead) => (
                <div key={lead.id} className="flex items-start justify-between p-4 hover:bg-muted/20 transition-colors">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-sm text-espresso">{lead.name}</span>
                      <span className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                        {typeShort[lead.type] || lead.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-0.5 text-xs text-muted-foreground">
                      <a href={`tel:${lead.phone}`} className="flex items-center gap-1 hover:text-gold">
                        <Phone className="h-3 w-3" /> {lead.phone}
                      </a>
                      {lead.email && (
                        <a href={`mailto:${lead.email}`} className="hover:text-gold">
                          <Mail className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                    {lead.propertyTitle && (
                      <p className="text-[11px] text-gold mt-0.5 truncate">{lead.propertyTitle}</p>
                    )}
                    {lead.budget && (
                      <p className="text-[11px] text-muted-foreground">{lead.budget}</p>
                    )}
                  </div>
                  <div className="ml-4 flex flex-col items-end gap-1.5 shrink-0">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusColor[lead.status] || "bg-muted text-muted-foreground"}`}>
                      {lead.status}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {new Date(lead.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upcoming Site Visits */}
        <div className="bg-white border border-border rounded-xl shadow-sm overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-border">
            <h2 className="text-sm font-semibold text-espresso">Site Visit Requests</h2>
            <Link href="/admin/site-visits">
              <Button variant="ghost" size="sm" className="text-xs gap-1 text-gold hover:text-espresso">
                View All <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </div>

          {upcomingVisits.length === 0 ? (
            <div className="p-8 text-center text-sm text-muted-foreground">
              <CalendarCheck className="h-8 w-8 mx-auto mb-2 text-muted-foreground/50" />
              No pending site visits.
            </div>
          ) : (
            <div className="divide-y divide-border">
              {upcomingVisits.map((visit) => (
                <div key={visit.id} className="p-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-sm text-espresso">{visit.name}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                      visit.status === "Confirmed" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                    }`}>
                      {visit.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-gold truncate">{visit.propertyTitle}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    📅 {new Date(visit.preferredDate).toLocaleDateString("en-IN", {
                      day: "numeric", month: "short", year: "numeric"
                    })} · {visit.preferredTime}
                  </p>
                  <a href={`tel:${visit.phone}`} className="text-[11px] text-muted-foreground hover:text-gold flex items-center gap-1 mt-0.5">
                    <Phone className="h-3 w-3" /> {visit.phone}
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Property quick stats */}
      <div className="bg-white border border-border rounded-xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-espresso">Property Inventory</h2>
          <Link href="/admin/properties">
            <Button variant="ghost" size="sm" className="text-xs gap-1 text-gold hover:text-espresso">
              Manage <ArrowRight className="h-3 w-3" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-emerald-50 rounded-lg">
            <div className="text-2xl font-serif font-bold text-emerald-700">{availableProperties}</div>
            <div className="text-[11px] text-emerald-600 mt-0.5">Available</div>
          </div>
          <div className="text-center p-3 bg-amber-50 rounded-lg">
            <div className="text-2xl font-serif font-bold text-amber-700">
              {properties.filter((p) => p.status === "Under Negotiation").length}
            </div>
            <div className="text-[11px] text-amber-600 mt-0.5">Under Negotiation</div>
          </div>
          <div className="text-center p-3 bg-rose-50 rounded-lg">
            <div className="text-2xl font-serif font-bold text-rose-700">{soldProperties}</div>
            <div className="text-[11px] text-rose-600 mt-0.5">Sold</div>
          </div>
          <div className="text-center p-3 bg-gold/10 rounded-lg">
            <div className="text-2xl font-serif font-bold text-amber-700">{featuredProperties}</div>
            <div className="text-[11px] text-amber-600 mt-0.5">Featured</div>
          </div>
        </div>
      </div>
    </div>
  )
}

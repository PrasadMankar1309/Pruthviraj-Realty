// ============================================================
// Lead Management — In-memory store with extended features
// ⚠️  For production, replace with Prisma + PostgreSQL/Supabase.
// ============================================================

export type LeadType =
  | "Property Enquiry"
  | "Buyer Requirement"
  | "Seller / Landowner Submission"
  | "Investor Enquiry"
  | "Contact Inquiry"
  | "Site Visit Request"
  | "Large Land / Developer Enquiry"

export type LeadStatus =
  | "New"
  | "Contacted"
  | "Qualified"
  | "Site Visit Requested"
  | "Follow-up Required"
  | "Converted"
  | "Closed"
  | "Not Interested"

export interface LeadNote {
  id: string
  text: string
  addedBy: string
  createdAt: string
}

export interface Lead {
  id: string
  type: LeadType
  name: string
  phone: string
  email?: string
  propertyId?: string
  propertyTitle?: string
  propertyCategory?: string
  transactionType?: string
  location?: string
  budget?: string
  area?: string
  purpose?: string
  status: LeadStatus
  notes?: string             // Original user message
  internalNotes: LeadNote[]  // Staff-only notes
  source?: string
  consent: boolean
  createdAt: string
  updatedAt: string
}

// ── Site Visit Requests ─────────────────────────────────────

export type SiteVisitStatus =
  | "Requested"
  | "Confirmed"
  | "Rescheduled"
  | "Completed"
  | "Cancelled"

export interface SiteVisitRequest {
  id: string
  leadId?: string
  name: string
  phone: string
  email?: string
  propertyId: string
  propertyTitle: string
  preferredDate: string    // ISO date string
  preferredTime: string    // e.g. "10:00 AM"
  message?: string
  consent: boolean
  status: SiteVisitStatus
  adminNotes?: string
  createdAt: string
  updatedAt: string
}

// ── In-memory demo stores ───────────────────────────────────

let leadsStore: Lead[] = [
  {
    id: "lead-101",
    type: "Property Enquiry",
    name: "Ramesh Deshmukh",
    phone: "+91 98221 44552",
    email: "ramesh.deshmukh@gmail.com",
    propertyId: "fp-001",
    propertyTitle: "Scenic Farmhouse Plot near Gangapur Dam",
    propertyCategory: "Farmhouse Plot",
    location: "Gangapur Road, Nashik",
    budget: "₹40 Lakh – ₹60 Lakh",
    status: "New",
    notes: "Interested in arranging a site visit this coming Saturday afternoon.",
    internalNotes: [],
    source: "Property Detail Page",
    consent: true,
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: "lead-102",
    type: "Seller / Landowner Submission",
    name: "Sanjay Shirode",
    phone: "+91 94230 88712",
    email: "sanjay.shirode@yahoo.co.in",
    propertyCategory: "Agricultural Land",
    location: "Dindori Road, Nashik",
    area: "3.5 Acres",
    budget: "₹1.8 Crore",
    status: "Contacted",
    notes: "Direct owner, clear 7/12 extract, canal water touch, looking for serious buyer.",
    internalNotes: [
      {
        id: "note-001",
        text: "Verified ownership via phone call. Documents available. Follow up this week.",
        addedBy: "admin@pruthvirajrealty.com",
        createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
      },
    ],
    source: "List Property Page",
    consent: true,
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: "lead-103",
    type: "Investor Enquiry",
    name: "Dr. Aniruddha Kulkarni",
    phone: "+91 98812 33490",
    email: "a.kulkarni@healthplus.org",
    propertyCategory: "Commercial Plot",
    location: "Mumbai Naka / CBS Corridor",
    budget: "₹3 Crore – ₹5 Crore",
    status: "Qualified",
    notes: "Planning healthcare clinic setup with frontage parking.",
    internalNotes: [],
    source: "Investment Opportunities Page",
    consent: true,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
  {
    id: "lead-104",
    type: "Site Visit Request",
    name: "Pooja & Vivek Jadhav",
    phone: "+91 97654 22109",
    email: "vivek.jadhav@tcs.com",
    propertyId: "rp-001",
    propertyTitle: "Residential Plot in Gangapur Road Layout",
    location: "Trimbak Road, Nashik",
    status: "New",
    notes: "Requested pickup from Nashik CBS or direct map pin for Sunday 11 AM.",
    internalNotes: [],
    source: "Property Detail Page",
    consent: true,
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: "lead-105",
    type: "Buyer Requirement",
    name: "Priya Mahajan",
    phone: "+91 99020 55331",
    email: "priya.mahajan@gmail.com",
    propertyCategory: "Flat / Apartment",
    location: "Gangapur Road",
    budget: "₹50 Lakh – ₹1 Crore",
    area: "1000+ sq ft",
    purpose: "Self-Use",
    status: "New",
    notes: "Looking for 2 BHK or 3 BHK ready-to-move flat. Budget flexible for right property.",
    internalNotes: [],
    source: "Buyer Requirements Page",
    consent: true,
    createdAt: new Date(Date.now() - 3600000 * 6).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 6).toISOString(),
  },
]

let siteVisitsStore: SiteVisitRequest[] = [
  {
    id: "sv-001",
    leadId: "lead-104",
    name: "Pooja & Vivek Jadhav",
    phone: "+91 97654 22109",
    email: "vivek.jadhav@tcs.com",
    propertyId: "rp-001",
    propertyTitle: "Residential Plot in Gangapur Road Layout",
    preferredDate: new Date(Date.now() + 86400000 * 3).toISOString().split("T")[0],
    preferredTime: "11:00 AM",
    message: "Would like to bring family. Please arrange from CBS if possible.",
    consent: true,
    status: "Requested",
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
]

// ── Lead CRUD ───────────────────────────────────────────────

export function getAllLeads(): Lead[] {
  return [...leadsStore].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
}

export function getLeadById(id: string): Lead | undefined {
  return leadsStore.find((l) => l.id === id)
}

export function createLead(
  data: Omit<Lead, "id" | "status" | "internalNotes" | "createdAt" | "updatedAt">
): Lead {
  const newLead: Lead = {
    id: `lead-${Date.now().toString(36)}`,
    ...data,
    status: "New",
    internalNotes: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  leadsStore.unshift(newLead)
  return newLead
}

export function updateLeadStatus(id: string, status: LeadStatus): Lead | null {
  const idx = leadsStore.findIndex((l) => l.id === id)
  if (idx === -1) return null
  leadsStore[idx] = {
    ...leadsStore[idx],
    status,
    updatedAt: new Date().toISOString(),
  }
  return leadsStore[idx]
}

export function addLeadNote(id: string, text: string, addedBy: string): Lead | null {
  const idx = leadsStore.findIndex((l) => l.id === id)
  if (idx === -1) return null
  const note: LeadNote = {
    id: `note-${Date.now().toString(36)}`,
    text,
    addedBy,
    createdAt: new Date().toISOString(),
  }
  leadsStore[idx] = {
    ...leadsStore[idx],
    internalNotes: [...(leadsStore[idx].internalNotes || []), note],
    updatedAt: new Date().toISOString(),
  }
  return leadsStore[idx]
}

// ── Lead Statistics ─────────────────────────────────────────

export function getLeadStats() {
  const all = leadsStore
  return {
    total: all.length,
    newCount: all.filter((l) => l.status === "New").length,
    contactedCount: all.filter((l) => l.status === "Contacted").length,
    qualifiedCount: all.filter((l) => l.status === "Qualified").length,
    convertedCount: all.filter((l) => l.status === "Converted").length,
    byType: {
      propertyEnquiry: all.filter((l) => l.type === "Property Enquiry").length,
      buyerRequirement: all.filter((l) => l.type === "Buyer Requirement").length,
      sellerSubmission: all.filter((l) => l.type === "Seller / Landowner Submission").length,
      investorEnquiry: all.filter((l) => l.type === "Investor Enquiry").length,
      siteVisitRequest: all.filter((l) => l.type === "Site Visit Request").length,
      contactInquiry: all.filter((l) => l.type === "Contact Inquiry").length,
    },
  }
}

// ── Site Visit CRUD ─────────────────────────────────────────

export function getAllSiteVisits(): SiteVisitRequest[] {
  return [...siteVisitsStore].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
}

export function createSiteVisit(
  data: Omit<SiteVisitRequest, "id" | "status" | "createdAt" | "updatedAt">
): SiteVisitRequest {
  const sv: SiteVisitRequest = {
    id: `sv-${Date.now().toString(36)}`,
    ...data,
    status: "Requested",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  siteVisitsStore.unshift(sv)
  return sv
}

export function updateSiteVisitStatus(
  id: string,
  status: SiteVisitStatus,
  adminNotes?: string
): SiteVisitRequest | null {
  const idx = siteVisitsStore.findIndex((sv) => sv.id === id)
  if (idx === -1) return null
  siteVisitsStore[idx] = {
    ...siteVisitsStore[idx],
    status,
    adminNotes: adminNotes || siteVisitsStore[idx].adminNotes,
    updatedAt: new Date().toISOString(),
  }
  return siteVisitsStore[idx]
}

export function getSiteVisitStats() {
  return {
    total: siteVisitsStore.length,
    requested: siteVisitsStore.filter((sv) => sv.status === "Requested").length,
    confirmed: siteVisitsStore.filter((sv) => sv.status === "Confirmed").length,
    completed: siteVisitsStore.filter((sv) => sv.status === "Completed").length,
    upcoming: siteVisitsStore.filter(
      (sv) =>
        sv.status === "Confirmed" &&
        new Date(sv.preferredDate) >= new Date()
    ).length,
  }
}

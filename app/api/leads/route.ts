import { NextResponse } from "next/server"
import { getAllLeads, createLead, updateLeadStatus, addLeadNote, type LeadStatus } from "@/lib/leads"
import { getAdminSession } from "@/lib/auth"

/**
 * GET /api/leads — Admin-only: returns all leads
 */
export async function GET() {
  const session = await getAdminSession()
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
  }

  const leads = getAllLeads()
  return NextResponse.json({ success: true, count: leads.length, leads })
}

/**
 * POST /api/leads — Public: create a new lead from a form submission.
 * Input is server-side validated before storing.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Server-side validation
    const name = typeof body.name === "string" ? body.name.trim().slice(0, 200) : ""
    const phone = typeof body.phone === "string" ? body.phone.trim().slice(0, 30) : ""

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, error: "Name and Phone number are required." },
        { status: 400 }
      )
    }

    // Sanitize all string inputs (trim + length cap)
    const sanitize = (val: unknown, max = 500): string | undefined => {
      if (typeof val !== "string") return undefined
      const trimmed = val.trim().slice(0, max)
      return trimmed || undefined
    }

    const lead = createLead({
      type: sanitize(body.type) as any || "Property Enquiry",
      name,
      phone,
      email: sanitize(body.email, 200),
      propertyId: sanitize(body.propertyId, 50),
      propertyTitle: sanitize(body.propertyTitle, 300),
      propertyCategory: sanitize(body.propertyCategory, 100),
      transactionType: sanitize(body.transactionType, 50),
      location: sanitize(body.location, 200),
      budget: sanitize(body.budget, 100),
      area: sanitize(body.area, 100),
      notes: sanitize(body.notes || body.message, 2000),
      source: sanitize(body.source) || "Website Form",
      consent: typeof body.consent === "boolean" ? body.consent : true,
    })

    return NextResponse.json({ success: true, leadId: lead.id }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Invalid request payload." },
      { status: 400 }
    )
  }
}

/**
 * PATCH /api/leads — Admin-only: update lead status or add a note
 */
export async function PATCH(request: Request) {
  const session = await getAdminSession()
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { id, status, note } = body

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Lead ID is required." },
        { status: 400 }
      )
    }

    if (note && typeof note === "string") {
      const updated = addLeadNote(id, note.trim().slice(0, 2000), session.user.email)
      if (!updated) {
        return NextResponse.json({ success: false, error: "Lead not found." }, { status: 404 })
      }
      return NextResponse.json({ success: true, lead: updated })
    }

    if (!status) {
      return NextResponse.json(
        { success: false, error: "Status or note is required." },
        { status: 400 }
      )
    }

    const updated = updateLeadStatus(id, status as LeadStatus)
    if (!updated) {
      return NextResponse.json({ success: false, error: "Lead not found." }, { status: 404 })
    }

    return NextResponse.json({ success: true, lead: updated })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Internal server error." }, { status: 500 })
  }
}

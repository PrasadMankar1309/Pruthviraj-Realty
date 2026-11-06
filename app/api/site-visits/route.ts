import { NextResponse } from "next/server"
import { getAllSiteVisits, createSiteVisit, updateSiteVisitStatus, type SiteVisitStatus } from "@/lib/leads"
import { createLead } from "@/lib/leads"
import { getAdminSession } from "@/lib/auth"

/**
 * GET /api/site-visits — Admin-only
 */
export async function GET() {
  const session = await getAdminSession()
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
  }
  const visits = getAllSiteVisits()
  return NextResponse.json({ success: true, count: visits.length, visits })
}

/**
 * POST /api/site-visits — Public: submit a site visit request
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()

    const name = typeof body.name === "string" ? body.name.trim().slice(0, 200) : ""
    const phone = typeof body.phone === "string" ? body.phone.trim().slice(0, 30) : ""
    const propertyId = typeof body.propertyId === "string" ? body.propertyId.trim() : ""
    const propertyTitle = typeof body.propertyTitle === "string" ? body.propertyTitle.trim().slice(0, 300) : ""
    const preferredDate = typeof body.preferredDate === "string" ? body.preferredDate.trim() : ""
    const preferredTime = typeof body.preferredTime === "string" ? body.preferredTime.trim().slice(0, 20) : ""

    if (!name || !phone || !propertyId || !preferredDate) {
      return NextResponse.json(
        { success: false, error: "Name, phone, property and preferred date are required." },
        { status: 400 }
      )
    }

    // Validate that the date is not in the past
    const requestedDate = new Date(preferredDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (requestedDate < today) {
      return NextResponse.json(
        { success: false, error: "Please select a future date for your visit." },
        { status: 400 }
      )
    }

    const sv = createSiteVisit({
      name,
      phone,
      email: typeof body.email === "string" ? body.email.trim().slice(0, 200) : undefined,
      propertyId,
      propertyTitle,
      preferredDate,
      preferredTime: preferredTime || "To be confirmed",
      message: typeof body.message === "string" ? body.message.trim().slice(0, 500) : undefined,
      consent: typeof body.consent === "boolean" ? body.consent : true,
    })

    // Also create a corresponding lead for CRM tracking
    createLead({
      type: "Site Visit Request",
      name,
      phone,
      email: typeof body.email === "string" ? body.email.trim().slice(0, 200) : undefined,
      propertyId,
      propertyTitle,
      notes: `Preferred date: ${preferredDate} at ${preferredTime}. ${body.message || ""}`.trim(),
      source: "Site Visit Request Form",
      consent: typeof body.consent === "boolean" ? body.consent : true,
    })

    return NextResponse.json({ success: true, visitId: sv.id }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Invalid request." }, { status: 400 })
  }
}

/**
 * PATCH /api/site-visits — Admin-only: update visit status
 */
export async function PATCH(request: Request) {
  const session = await getAdminSession()
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { id, status, adminNotes } = body

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: "ID and status are required." },
        { status: 400 }
      )
    }

    const updated = updateSiteVisitStatus(id, status as SiteVisitStatus, adminNotes)
    if (!updated) {
      return NextResponse.json({ success: false, error: "Visit not found." }, { status: 404 })
    }

    return NextResponse.json({ success: true, visit: updated })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Internal server error." }, { status: 500 })
  }
}

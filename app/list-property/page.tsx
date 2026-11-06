"use client"

import { useState } from "react"
import PageShell from "@/components/page-shell"
import PageHero from "@/components/page-hero"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { CheckCircle2, Building, MapPin, Upload, MessageCircle, ShieldCheck } from "lucide-react"
import { useI18n } from "@/lib/i18n"

const WHATSAPP_NUMBER = "917507716161"

export default function ListPropertyPage() {
  const { t } = useI18n()
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [formData, setFormData] = useState({
    ownerName: "",
    phone: "",
    email: "",
    propertyCategory: "Residential Plot",
    transactionType: "For Sale",
    location: "Gangapur Road",
    specificAddress: "",
    area: "",
    areaUnit: "Guntha",
    expectedPrice: "",
    negotiable: "Yes",
    roadWidth: "",
    titleStatus: "Clear Title / Single Owner",
    description: "",
    consent: true,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSubmitError("")
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "Seller / Landowner Submission",
          name: formData.ownerName,
          phone: formData.phone,
          email: formData.email,
          propertyCategory: formData.propertyCategory,
          transactionType: formData.transactionType,
          location: formData.location,
          address: formData.specificAddress,
          area: `${formData.area} ${formData.areaUnit}`,
          expectedPrice: formData.expectedPrice,
          negotiable: formData.negotiable,
          titleStatus: formData.titleStatus,
          notes: formData.description,
          source: "List Property Page",
        }),
      })
      if (!response.ok) throw new Error("Your property details could not be submitted. Please try again or contact us directly.")
      setSubmitted(true)
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Your property details could not be submitted. Please try again or contact us directly.")
    } finally {
      setLoading(false)
    }
  }

  const directWaMsg = `Hello Pruthviraj Realty, I am a property owner looking to market my property in Nashik.`
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(directWaMsg)}`

  return (
    <PageShell>
      <PageHero
        eyebrow="Owners & Landowners Desk"
        title="List Your Property with Pruthviraj Realty"
        description="Share property information for the team to review. A submission does not verify ownership, title, approvals or availability."
        breadcrumbs={[{ label: "List Your Property" }]}
        align="center"
      />

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {submitted ? (
          <div className="bg-card border border-gold/40 p-10 rounded-xl text-center shadow-sm">
            <CheckCircle2 className="h-14 w-14 text-gold mx-auto mb-4" />
            <h2 className="text-2xl font-serif font-semibold text-espresso mb-2">
              Property Details Submitted Successfully
            </h2>
            <p className="text-sm text-foreground/80 max-w-lg mx-auto mb-6">
              Thank you, <span className="font-semibold text-espresso">{formData.ownerName}</span>. Your submission has been received. The team may contact you to discuss the information and any next steps.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                onClick={() => setSubmitted(false)}
                variant="outline"
                className="border-border text-xs"
              >
                Submit Another Listing
              </Button>
              <a href={waLink} target="_blank" rel="noopener noreferrer">
                <Button className="bg-[#25D366] hover:bg-[#20ba59] text-white text-xs gap-1.5">
                  <MessageCircle className="h-4 w-4" />
                  Connect on WhatsApp Directly
                </Button>
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-card border border-border p-6 sm:p-10 rounded-xl shadow-sm space-y-8">
            {submitError && <p role="alert" className="border border-red-200 bg-red-50 p-3 text-xs text-red-800">{submitError}</p>}
            {/* Section 1: Contact Details */}
            <div>
              <h3 className="text-base font-serif font-semibold text-espresso border-b border-border pb-2 mb-4">
                1. Owner & Contact Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider block mb-1 text-espresso">Your Name *</label>
                  <Input
                    required
                    placeholder="Full Name"
                    value={formData.ownerName}
                    onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider block mb-1 text-espresso">Phone Number *</label>
                  <Input
                    required
                    type="tel"
                    placeholder="+91 98220 00000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider block mb-1 text-espresso">Email Address</label>
                  <Input
                    type="email"
                    placeholder="name@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Property Type & Location */}
            <div>
              <h3 className="text-base font-serif font-semibold text-espresso border-b border-border pb-2 mb-4">
                2. Property Category & Locality
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider block mb-1 text-espresso">Category *</label>
                  <Select
                    value={formData.propertyCategory}
                    onValueChange={(val) => setFormData({ ...formData, propertyCategory: val })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Farmhouse Plot">Farmhouse Plot</SelectItem>
                      <SelectItem value="Residential Plot">Residential Plot</SelectItem>
                      <SelectItem value="Commercial Plot">Commercial Plot</SelectItem>
                      <SelectItem value="Flat / Apartment">Flat / Apartment</SelectItem>
                      <SelectItem value="Row House / Villa">Row House / Villa</SelectItem>
                      <SelectItem value="Commercial Property">Commercial Property</SelectItem>
                      <SelectItem value="Agricultural Land">Agricultural Land</SelectItem>
                      <SelectItem value="NA Land">NA Land</SelectItem>
                      <SelectItem value="Industrial Property">Industrial Property</SelectItem>
                      <SelectItem value="Large Land Parcel">Large Land Parcel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider block mb-1 text-espresso">Transaction Intent *</label>
                  <Select
                    value={formData.transactionType}
                    onValueChange={(val) => setFormData({ ...formData, transactionType: val })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="For Sale">For Sale (Outright)</SelectItem>
                      <SelectItem value="For Rent">For Rent</SelectItem>
                      <SelectItem value="For Lease">Commercial Lease</SelectItem>
                      <SelectItem value="Joint Development">Joint Development / JV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider block mb-1 text-espresso">Primary Location *</label>
                  <Select
                    value={formData.location}
                    onValueChange={(val) => setFormData({ ...formData, location: val })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Gangapur Road">Gangapur Road</SelectItem>
                      <SelectItem value="College Road">College Road</SelectItem>
                      <SelectItem value="Trimbakeshwar / Trimbak Road">Trimbakeshwar</SelectItem>
                      <SelectItem value="Sinnar / MIDC">Sinnar</SelectItem>
                      <SelectItem value="Dindori Road">Dindori Road</SelectItem>
                      <SelectItem value="Niphad">Niphad</SelectItem>
                      <SelectItem value="Indira Nagar / Pathardi">Indira Nagar</SelectItem>
                      <SelectItem value="Nashik City Central">Nashik City</SelectItem>
                      <SelectItem value="Other Maharashtra Location">Other Maharashtra</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mt-4">
                <label className="text-xs font-semibold uppercase tracking-wider block mb-1 text-espresso">Specific Landmark / Address</label>
                <Input
                  placeholder="e.g. Near Sula Vineyards, Savargaon Road or Survey No."
                  value={formData.specificAddress}
                  onChange={(e) => setFormData({ ...formData, specificAddress: e.target.value })}
                />
              </div>
            </div>

            {/* Section 3: Dimensions & Pricing */}
            <div>
              <h3 className="text-base font-serif font-semibold text-espresso border-b border-border pb-2 mb-4">
                3. Measurements, Title & Expected Price
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="sm:col-span-2 flex gap-2">
                  <div className="flex-1">
                    <label className="text-xs font-semibold uppercase tracking-wider block mb-1 text-espresso">Area Size *</label>
                    <Input
                      required
                      placeholder="e.g. 5, 2400, 2"
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    />
                  </div>
                  <div className="w-32">
                    <label className="text-xs font-semibold uppercase tracking-wider block mb-1 text-espresso">Unit</label>
                    <Select
                      value={formData.areaUnit}
                      onValueChange={(val) => setFormData({ ...formData, areaUnit: val })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Guntha">Gunthas</SelectItem>
                        <SelectItem value="Acre">Acres</SelectItem>
                        <SelectItem value="Sq Ft">Sq Ft</SelectItem>
                        <SelectItem value="Sq Metre">Sq Metres</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider block mb-1 text-espresso">Expected Price (INR) *</label>
                  <Input
                    required
                    placeholder="e.g. ₹45 Lakh / ₹1.2 Cr"
                    value={formData.expectedPrice}
                    onChange={(e) => setFormData({ ...formData, expectedPrice: e.target.value })}
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider block mb-1 text-espresso">Title Status</label>
                  <Select
                    value={formData.titleStatus}
                    onValueChange={(val) => setFormData({ ...formData, titleStatus: val })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Clear Title / Single Owner">Clear Title / Single Owner</SelectItem>
                      <SelectItem value="Ancestral / Joint Family">Ancestral / Joint Family</SelectItem>
                      <SelectItem value="Town Planning Sanctioned">TP Sanctioned Layout</SelectItem>
                      <SelectItem value="Under Mutation / Legal Process">Under Mutation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Section 4: Details & Notes */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider block mb-1 text-espresso">Property Description & Highlights</label>
              <Textarea
                rows={3}
                placeholder="Mention key features (road width, water availability, fencing, electricity connection, existing plantation or building specifications)."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            {/* Consent Notice */}
            <div className="flex items-start gap-3 p-4 bg-muted/40 rounded-lg">
              <ShieldCheck className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground leading-normal">
                By clicking Submit, you declare that you are the legal owner or authorized representative for this property. Pruthviraj Realty conducts mandatory title verification prior to presenting any asset to buyers.
              </p>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-espresso hover:bg-espresso/90 text-white font-medium py-3 text-sm"
            >
              {loading ? "Submitting Listing..." : "Submit Property Listing for Review"}
            </Button>
          </form>
        )}
      </div>
    </PageShell>
  )
}

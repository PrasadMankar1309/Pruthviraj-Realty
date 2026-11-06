"use client"

import { useState } from "react"
import Link from "next/link"
import PageShell from "@/components/page-shell"
import PageHero from "@/components/page-hero"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle2, Search, SlidersHorizontal, MessageCircle, Phone } from "lucide-react"
import { useI18n } from "@/lib/i18n"

const WHATSAPP_NUMBER = "917507716161"

export default function BuyerRequirementsPage() {
  const { t } = useI18n()
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    category: "Farmhouse Plot",
    preferredLocation: "Gangapur Road",
    budgetRange: "₹25 Lakh – ₹50 Lakh",
    minArea: "",
    purpose: "Self-Use / Weekend Home",
    timeframe: "Within 30 Days",
    additionalNotes: "",
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
          type: "Buyer Requirement",
          ...formData,
          source: "Buyer Requirements Page",
        }),
      })
      if (!response.ok) throw new Error("Your requirements could not be submitted. Please try again or contact us directly.")
      setSubmitted(true)
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Your requirements could not be submitted. Please try again or contact us directly.")
    } finally {
      setLoading(false)
    }
  }

  const directWaMsg = `Hello Pruthviraj Realty, I have a specific property requirement in Nashik and would like assistance.`
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(directWaMsg)}`

  return (
    <PageShell>
      <PageHero
        eyebrow="Custom Property Search"
        title="Submit Your Buyer Requirements"
        description="Share your preferred property type, location and budget so the team can understand your enquiry."
        breadcrumbs={[{ label: "Buyer Requirements" }]}
        align="center"
      />

      <div className="container mx-auto px-4 py-16 max-w-3xl">
        {submitted ? (
          <div className="bg-card border border-gold/40 p-10 rounded-xl text-center shadow-sm">
            <CheckCircle2 className="h-14 w-14 text-gold mx-auto mb-4" />
            <h2 className="text-2xl font-serif font-semibold text-espresso mb-2">
              Buyer Requirement Registered
            </h2>
            <p className="text-sm text-foreground/80 max-w-md mx-auto mb-6">
              Thank you, <span className="font-semibold text-espresso">{formData.name}</span>. Your requirements have been submitted. The team can follow up using the contact details provided.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                onClick={() => setSubmitted(false)}
                variant="outline"
                className="border-border text-xs"
              >
                Submit Another Requirement
              </Button>
              <Link href="/properties">
                <Button className="bg-espresso text-white text-xs">
                  Browse Active Listings
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-card border border-border p-6 sm:p-10 rounded-xl shadow-sm space-y-6">
            {submitError && <p role="alert" className="border border-red-200 bg-red-50 p-3 text-xs text-red-800">{submitError}</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider block mb-1 text-espresso">Your Full Name *</label>
                <Input
                  required
                  placeholder="e.g. Anand Shinde"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider block mb-1 text-espresso">Email Address</label>
              <Input
                type="email"
                placeholder="name@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider block mb-1 text-espresso">Property Category Desired</label>
                <Select
                  value={formData.category}
                  onValueChange={(val) => setFormData({ ...formData, category: val })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Farmhouse Plot">Farmhouse / Weekend Plot</SelectItem>
                    <SelectItem value="Residential Plot">Residential Plot</SelectItem>
                    <SelectItem value="Flat / Apartment">Flat / Apartment (2/3/4 BHK)</SelectItem>
                    <SelectItem value="Row House / Villa">Row House / Villa</SelectItem>
                    <SelectItem value="Commercial Plot / Property">Commercial Plot / Space</SelectItem>
                    <SelectItem value="Agricultural Land">Agricultural Land</SelectItem>
                    <SelectItem value="Industrial Property">Industrial Property</SelectItem>
                    <SelectItem value="Large Land Parcel">Large Land Parcel</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider block mb-1 text-espresso">Preferred Location in Nashik</label>
                <Select
                  value={formData.preferredLocation}
                  onValueChange={(val) => setFormData({ ...formData, preferredLocation: val })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Gangapur Road">Gangapur Road</SelectItem>
                    <SelectItem value="College Road">College Road</SelectItem>
                    <SelectItem value="Trimbakeshwar">Trimbakeshwar</SelectItem>
                    <SelectItem value="Sinnar">Sinnar</SelectItem>
                    <SelectItem value="Dindori Road">Dindori Road</SelectItem>
                    <SelectItem value="Niphad">Niphad</SelectItem>
                    <SelectItem value="Indira Nagar">Indira Nagar</SelectItem>
                    <SelectItem value="Nashik Road">Nashik Road</SelectItem>
                    <SelectItem value="Any Good Growth Belt">Any Good Growth Belt</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider block mb-1 text-espresso">Target Budget Range</label>
                <Select
                  value={formData.budgetRange}
                  onValueChange={(val) => setFormData({ ...formData, budgetRange: val })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Under ₹25 Lakh">Under ₹25 Lakh</SelectItem>
                    <SelectItem value="₹25 Lakh – ₹50 Lakh">₹25 Lakh – ₹50 Lakh</SelectItem>
                    <SelectItem value="₹50 Lakh – ₹1 Crore">₹50 Lakh – ₹1 Crore</SelectItem>
                    <SelectItem value="₹1 Crore – ₹2.5 Crore">₹1 Crore – ₹2.5 Crore</SelectItem>
                    <SelectItem value="₹2.5 Crore+">₹2.5 Crore+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider block mb-1 text-espresso">Intended Purchase Purpose</label>
                <Select
                  value={formData.purpose}
                  onValueChange={(val) => setFormData({ ...formData, purpose: val })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Self-Use / Weekend Home">Self-Use / Weekend Home</SelectItem>
                    <SelectItem value="Long-term Capital Growth">Long-term Capital Growth</SelectItem>
                    <SelectItem value="Rental Yield / Commercial Income">Rental Yield / Commercial Income</SelectItem>
                    <SelectItem value="Immediate Construction">Immediate Construction</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider block mb-1 text-espresso">Specific Requirements & Notes</label>
              <Textarea
                rows={3}
                placeholder="Mention specific area (e.g. 5 Gunthas or 3 BHK), road width preference, facing, or any amenities needed."
                value={formData.additionalNotes}
                onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-espresso hover:bg-espresso/90 text-white font-medium py-3 text-sm"
            >
              {loading ? "Registering Requirement..." : "Register Requirement with Property Desk"}
            </Button>
          </form>
        )}
      </div>
    </PageShell>
  )
}

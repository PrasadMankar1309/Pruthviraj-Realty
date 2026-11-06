"use client"

import { useState } from "react"
import Link from "next/link"
import PageShell from "@/components/page-shell"
import PageHero from "@/components/page-hero"
import PropertyCard from "@/components/property-card"
import { properties } from "@/data/properties"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, ShieldCheck, MapPin, Building, ArrowUpRight, CheckCircle2, MessageCircle } from "lucide-react"
import { useI18n } from "@/lib/i18n"

const WHATSAPP_NUMBER = "917507716161"

export default function InvestmentOpportunitiesPage() {
  const { t } = useI18n()
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    budget: "",
    propertyInterest: "Agricultural / NA Land",
    timeframe: "Immediate (0-30 days)",
    notes: "",
  })

  // Filter high-yield investment suitable properties (Land, Commercial, Large parcels, Farmhouse)
  const investmentProperties = properties.filter(
    (p) =>
      p.category === "Agricultural Land" ||
      p.category === "Commercial Plot" ||
      p.category === "Large Land Parcel" ||
      p.category === "Industrial Property" ||
      p.category === "Farmhouse Plot"
  ).slice(0, 6)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSubmitError("")
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "Investor Enquiry",
          ...formData,
          source: "Investment Opportunities Page",
        }),
      })
      if (!response.ok) throw new Error("Your investor enquiry could not be submitted. Please try again or contact us directly.")
      setFormSubmitted(true)
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Your investor enquiry could not be submitted. Please try again or contact us directly.")
    } finally {
      setLoading(false)
    }
  }

  const whatsappInvestorMsg = `Hello Pruthviraj Realty, I would like to discuss high-ticket land and property investment opportunities in Nashik.`
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappInvestorMsg)}`

  return (
    <PageShell>
      <PageHero
        eyebrow="Strategic Property Advisory"
        title="Investment Opportunities"
        description="Review illustrative land, commercial and industrial property examples. This page does not represent an investment recommendation or guarantee of availability or returns."
        breadcrumbs={[{ label: "Investment Opportunities" }]}
      />
      <div className="container mx-auto flex flex-wrap gap-3 px-4 pt-6">
        <a href="#investor-form"><Button className="bg-espresso text-white hover:bg-espresso/90">Submit Investor Enquiry</Button></a>
        <a href={waLink} target="_blank" rel="noopener noreferrer"><Button variant="outline" className="gap-2 border-border"><MessageCircle className="h-4 w-4 text-gold" />Contact via WhatsApp</Button></a>
      </div>

      {/* Investment Pillars */}
      <div className="py-16 bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-gold mb-2">Our Advisory Ethos</p>
            <h2 className="text-2xl md:text-3xl font-serif font-semibold text-espresso">Why Invest in the Nashik Growth Corridor?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card border border-border p-6 rounded-xl">
              <div className="w-12 h-12 rounded-lg bg-gold/15 flex items-center justify-center text-gold mb-4">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-serif font-semibold text-espresso mb-2">Infrastructural Momentum</h3>
              <p className="text-sm text-foreground/75 leading-relaxed">
                Infrastructure and planning information can change. Independently confirm the status, alignment and relevance of proposed or completed projects before making an investment decision.
              </p>
            </div>

            <div className="bg-card border border-border p-6 rounded-xl">
              <div className="w-12 h-12 rounded-lg bg-gold/15 flex items-center justify-center text-gold mb-4">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-serif font-semibold text-espresso mb-2">Rigorous Title Verification</h3>
              <p className="text-sm text-foreground/75 leading-relaxed">
                Arrange independent legal and technical review of title records, approvals, boundaries and encumbrances for each property under consideration.
              </p>
            </div>

            <div className="bg-card border border-border p-6 rounded-xl">
              <div className="w-12 h-12 rounded-lg bg-gold/15 flex items-center justify-center text-gold mb-4">
                <Building className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-serif font-semibold text-espresso mb-2">Discreet Off-Market Mandates</h3>
              <p className="text-sm text-foreground/75 leading-relaxed">
                Availability of any off-market parcel or joint venture opportunity must be confirmed directly; no inventory is implied by this overview.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Curated Opportunities Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-gold mb-2">Handpicked Portfolio</p>
            <h2 className="text-2xl md:text-3xl font-serif font-semibold text-espresso">Curated High-Value Opportunities</h2>
            <p className="text-sm text-muted-foreground mt-1">Prime land parcels, agro-farmhouse zones, and highway-touch assets.</p>
          </div>
          <p className="text-xs text-muted-foreground italic mt-3 md:mt-0">⚠️ Demonstration investment listings</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {investmentProperties.map((prop) => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
        </div>
      </div>

      {/* Dedicated Investor Mandate Form */}
      <div id="investor-form" className="bg-espresso text-white py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-gold mb-2">Confidential Consultation</p>
            <h2 className="text-2xl md:text-4xl font-serif font-semibold">Submit Your Investor Mandate</h2>
            <p className="mt-2 text-ivory/70 text-sm">
              Share your ticket size, preferred asset classes, and investment objectives. Our senior team will connect with a curated memorandum.
            </p>
          </div>

          {formSubmitted ? (
            <div className="bg-card/10 border border-gold/30 p-8 rounded-xl text-center">
              <CheckCircle2 className="h-12 w-12 text-gold mx-auto mb-4" />
              <h3 className="text-xl font-serif font-semibold mb-2">Mandate Received</h3>
              <p className="text-sm text-ivory/80 max-w-md mx-auto mb-6">
                Thank you for entrusting Pruthviraj Realty with your requirements. A senior partner will contact you shortly under strict confidentiality.
              </p>
              <Button
                onClick={() => setFormSubmitted(false)}
                variant="outline"
                className="border-gold text-gold hover:bg-gold hover:text-espresso"
              >
                Submit Another Mandate
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white text-espresso p-6 sm:p-10 rounded-xl shadow-lg space-y-6">
              {submitError && <p role="alert" className="border border-red-200 bg-red-50 p-3 text-xs text-red-800">{submitError}</p>}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider block mb-1 text-espresso">Full Name *</label>
                  <Input
                    required
                    placeholder="e.g. Rahul Patil"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider block mb-1 text-espresso">Phone Number *</label>
                  <Input
                    required
                    type="tel"
                    placeholder="e.g. +91 98220 00000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider block mb-1 text-espresso">Email Address *</label>
                  <Input
                    required
                    type="email"
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider block mb-1 text-espresso">Target Investment Ticket</label>
                  <Select
                    value={formData.budget}
                    onValueChange={(val) => setFormData({ ...formData, budget: val })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select ticket size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="₹50 Lakh – ₹1 Crore">₹50 Lakh – ₹1 Crore</SelectItem>
                      <SelectItem value="₹1 Crore – ₹3 Crore">₹1 Crore – ₹3 Crore</SelectItem>
                      <SelectItem value="₹3 Crore – ₹10 Crore">₹3 Crore – ₹10 Crore</SelectItem>
                      <SelectItem value="₹10 Crore+ Institutional">₹10 Crore+ Institutional</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider block mb-1 text-espresso">Primary Asset Class Interest</label>
                  <Select
                    value={formData.propertyInterest}
                    onValueChange={(val) => setFormData({ ...formData, propertyInterest: val })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Agricultural / NA Land">Agricultural / NA Land</SelectItem>
                      <SelectItem value="Commercial Plots / Office Spaces">Commercial Plots / Office Spaces</SelectItem>
                      <SelectItem value="MIDC / Industrial Corridors">MIDC / Industrial Corridors</SelectItem>
                      <SelectItem value="Farmhouse & Agro-Tourism Tracts">Farmhouse & Agro-Tourism Tracts</SelectItem>
                      <SelectItem value="Large Township Acreage">Large Township Acreage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider block mb-1 text-espresso">Deployment Horizon</label>
                  <Select
                    value={formData.timeframe}
                    onValueChange={(val) => setFormData({ ...formData, timeframe: val })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Immediate (0-30 days)">Immediate (0-30 days)</SelectItem>
                      <SelectItem value="1 to 3 Months">1 to 3 Months</SelectItem>
                      <SelectItem value="Within 6 Months">Within 6 Months</SelectItem>
                      <SelectItem value="Flexible / Strategic">Flexible / Strategic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider block mb-1 text-espresso">Specific Mandate Details & Preferences</label>
                <Textarea
                  rows={3}
                  placeholder="Detail preferred locations (e.g., Gangapur Road, Trimbakeshwar, Sinnar), yield expectations, or land requirements."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>

              <p className="text-[11px] text-muted-foreground leading-normal">
                By submitting this form, you consent to receive direct contact from Pruthviraj Realty regarding matching investment opportunities. Your information is treated under non-disclosure obligations.
              </p>

              <Button type="submit" disabled={loading} className="w-full bg-espresso hover:bg-espresso/90 text-white font-medium py-3 text-sm">
                {loading ? "Submitting…" : "Submit Investor Enquiry"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </PageShell>
  )
}

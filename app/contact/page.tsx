"use client"

import { useState } from "react"
import { Mail, MapPin, Phone, MessageCircle, Clock, CheckCircle2 } from "lucide-react"
import PageShell from "@/components/page-shell"
import PageHero from "@/components/page-hero"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useI18n } from "@/lib/i18n"

const WHATSAPP_NUMBER = "917507716161"

export default function ContactPage() {
  const { t } = useI18n()
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    inquiryType: "Property Purchase Advisory",
    message: "",
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
          type: "Contact Inquiry",
          ...formData,
          source: "Contact Us Page",
        }),
      })
      if (!response.ok) throw new Error("We could not send your message. Please try again or contact us directly.")
      setSubmitted(true)
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "We could not send your message. Please try again or contact us directly.")
    } finally {
      setLoading(false)
    }
  }

  const whatsappMsg = "Hello Pruthviraj Realty, I would like to enquire about properties in Nashik."
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMsg)}`

  return (
    <PageShell>
      <PageHero
        eyebrow="Connect With Us"
        title="Contact Pruthviraj Realty"
        description="Send a question about properties, listing an asset or arranging a visit. Contact details and office information should be confirmed before use."
        breadcrumbs={[{ label: "Contact" }]}
        align="center"
      />
      <div className="container mx-auto px-4 pt-5">
        <p className="mx-auto max-w-6xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-900">
          This website contains demonstration contact details and listings. Please verify phone numbers, office address and service availability independently before relying on them.
        </p>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
          {/* Left: Contact Info */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <p className="text-xs font-medium tracking-[0.2em] uppercase text-gold mb-2">Nashik Headquarters</p>
              <h2 className="text-2xl font-serif font-semibold text-espresso">Reach Our Property Desk</h2>
              <p className="text-sm text-foreground/75 mt-2 leading-relaxed">
                Visit our office or get in touch via phone, email, or direct WhatsApp for swift property queries.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border">
                <div className="p-2.5 rounded-lg bg-gold/10 text-gold flex-shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-espresso">Principal Office</h4>
                  <p className="text-xs text-foreground/80 mt-1 leading-relaxed">
                    Pruthviraj Realty, Gangapur Road Business Center, Near College Road, Nashik – 422005, Maharashtra, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border">
                <div className="p-2.5 rounded-lg bg-gold/10 text-gold flex-shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-espresso">Phone & Direct Lines</h4>
                  <p className="text-xs text-foreground/80 mt-1">
                    <a href="tel:+917507716161" className="hover:text-gold transition-colors font-medium">
                      +91 75077 16161
                    </a>
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">Mon to Sat, 9:30 AM to 7:00 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border">
                <div className="p-2.5 rounded-lg bg-gold/10 text-gold flex-shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-espresso">Email Communication</h4>
                  <p className="text-xs text-foreground/80 mt-1">
                    <a href="mailto:contact@pruthvirajrealty.in" className="hover:text-gold transition-colors">
                      contact@pruthvirajrealty.in
                    </a>
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">We typically respond within 4 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border">
                <div className="p-2.5 rounded-lg bg-[#25D366]/10 text-[#25D366] flex-shrink-0">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-espresso">Instant WhatsApp Desk</h4>
                  <p className="text-xs text-foreground/80 mt-1 mb-2">
                    Connect directly with an on-duty property specialist for site photos and live status.
                  </p>
                  <a href={waLink} target="_blank" rel="noopener noreferrer">
                    <Button size="sm" className="bg-[#25D366] hover:bg-[#20ba59] text-white text-xs gap-1.5 h-8">
                      <MessageCircle className="h-3.5 w-3.5" />
                      Chat on WhatsApp
                    </Button>
                  </a>
                </div>
              </div>
            </div>

            {/* Map Reference placeholder */}
            <div className="p-4 rounded-xl border border-dashed border-border bg-muted/30 text-center">
              <p className="text-xs font-semibold text-espresso mb-1">Nashik Geographic Coverage</p>
              <p className="text-[11px] text-muted-foreground">
                Centrally located on Gangapur Road corridor with active field teams deployed in Trimbakeshwar, Sinnar MIDC, and Dindori agro belts.
              </p>
            </div>
          </div>

          {/* Right: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-card border border-border rounded-xl p-6 sm:p-10 shadow-sm">
              <h3 className="text-xl font-serif font-semibold text-espresso mb-1">Send Us a Direct Message</h3>
              <p className="text-xs text-muted-foreground mb-6">
                Tell us how we can help you find, sell, or assess a property.
              </p>

              {submitted ? (
                <div className="text-center py-12">
                  <CheckCircle2 className="h-12 w-12 text-gold mx-auto mb-3" />
                  <h4 className="text-lg font-serif font-semibold text-espresso mb-1">Message Transmitted</h4>
                  <p className="text-xs text-muted-foreground max-w-sm mx-auto mb-6">
                    Thank you, {formData.name}. Our Nashik client team will reach out via phone or email shortly.
                  </p>
                  <Button
                    onClick={() => setSubmitted(false)}
                    variant="outline"
                    className="border-border text-xs"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {submitError && <p role="alert" className="border border-red-200 bg-red-50 p-3 text-xs text-red-800">{submitError}</p>}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider block mb-1 text-espresso">Your Name *</label>
                      <Input
                        required
                        placeholder="e.g. Vikram Patil"
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
                      placeholder="vikram@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider block mb-1 text-espresso">Purpose of Inquiry</label>
                    <Select
                      value={formData.inquiryType}
                      onValueChange={(val) => setFormData({ ...formData, inquiryType: val })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Property Purchase Advisory">Property Purchase Advisory</SelectItem>
                        <SelectItem value="Farmhouse / Plot Inquiries">Farmhouse / Plot Inquiries</SelectItem>
                        <SelectItem value="Listing / Selling My Property">Listing / Selling My Property</SelectItem>
                        <SelectItem value="Commercial & Retail Spaces">Commercial & Retail Spaces</SelectItem>
                        <SelectItem value="Institutional Land Investment">Institutional Land Investment</SelectItem>
                        <SelectItem value="Schedule a Site Visit">Schedule a Site Visit</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider block mb-1 text-espresso">Your Message / Requirements</label>
                    <Textarea
                      rows={4}
                      placeholder="Please specify location preferences, budget, or property questions..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <p className="text-[11px] text-muted-foreground leading-normal">
                    We respect your privacy. Your information is only used to respond to your specific property inquiry.
                  </p>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-espresso hover:bg-espresso/90 text-white font-medium py-2.5 text-xs"
                  >
                    {loading ? "Sending Message..." : "Submit Inquiry to Pruthviraj Realty"}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  )
}

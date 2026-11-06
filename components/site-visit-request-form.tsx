"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CalendarCheck, CheckCircle2, AlertTriangle } from "lucide-react"

interface SiteVisitRequestFormProps {
  propertyId: string
  propertyTitle: string
  trigger?: React.ReactNode
}

export default function SiteVisitRequestForm({
  propertyId,
  propertyTitle,
  trigger,
}: SiteVisitRequestFormProps) {
  const [open, setOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const today = new Date().toISOString().split("T")[0]

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    preferredDate: "",
    preferredTime: "10:00 AM",
    message: "",
    consent: true,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await fetch("/api/site-visits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          propertyId,
          propertyTitle,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setSubmitted(true)
      } else {
        setError(data.error || "Something went wrong. Please try again.")
      }
    } catch {
      setError("Network error. Please check your connection and try again.")
    }
    setLoading(false)
  }

  const handleClose = () => {
    setOpen(false)
    // Reset form after close animation
    setTimeout(() => {
      setSubmitted(false)
      setError("")
      setForm({
        name: "", phone: "", email: "",
        preferredDate: "", preferredTime: "10:00 AM",
        message: "", consent: true,
      })
    }, 300)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="w-full bg-espresso hover:bg-espresso/90 text-white gap-2">
            <CalendarCheck className="h-4 w-4" />
            Request a Site Visit
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif text-espresso flex items-center gap-2">
            <CalendarCheck className="h-5 w-5 text-gold" />
            Request a Site Visit
          </DialogTitle>
        </DialogHeader>

        {submitted ? (
          <div className="text-center py-8">
            <CheckCircle2 className="h-14 w-14 text-gold mx-auto mb-4" />
            <h3 className="text-lg font-serif font-semibold text-espresso mb-2">Request Received</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Thank you, <span className="font-semibold text-espresso">{form.name}</span>.
            </p>
            <p className="text-xs text-muted-foreground mb-6 max-w-xs mx-auto">
              Our team will contact you to confirm your site visit for{" "}
              <span className="font-medium text-espresso">{propertyTitle}</span>.
              Please note — this is a request, not an automatic confirmation.
            </p>
            <Button onClick={handleClose} variant="outline" className="text-xs border-border">
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 pt-2">
            <div>
              <p className="text-xs text-muted-foreground mb-4 p-3 bg-muted/40 rounded-lg">
                📍 <span className="font-medium text-espresso">{propertyTitle}</span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="site-visit-name" className="text-xs font-semibold uppercase tracking-wider block mb-1 text-espresso">
                  Your Name *
                </label>
                <Input
                  id="site-visit-name"
                  required
                  placeholder="Full name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="text-sm"
                />
              </div>
              <div>
                <label htmlFor="site-visit-phone" className="text-xs font-semibold uppercase tracking-wider block mb-1 text-espresso">
                  Phone *
                </label>
                <Input
                  id="site-visit-phone"
                  required
                  type="tel"
                  placeholder="+91 98200 00000"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="site-visit-email" className="text-xs font-semibold uppercase tracking-wider block mb-1 text-espresso">
                Email (optional)
              </label>
              <Input
                id="site-visit-email"
                type="email"
                placeholder="name@email.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="site-visit-date" className="text-xs font-semibold uppercase tracking-wider block mb-1 text-espresso">
                  Preferred Date *
                </label>
                <Input
                  id="site-visit-date"
                  required
                  type="date"
                  min={today}
                  value={form.preferredDate}
                  onChange={(e) => setForm({ ...form, preferredDate: e.target.value })}
                  className="text-sm"
                />
              </div>
              <div>
                <label htmlFor="site-visit-time" className="text-xs font-semibold uppercase tracking-wider block mb-1 text-espresso">
                  Preferred Time
                </label>
                <select
                  id="site-visit-time"
                  value={form.preferredTime}
                  onChange={(e) => setForm({ ...form, preferredTime: e.target.value })}
                  className="w-full h-9 px-3 py-1 text-sm border border-input rounded-md bg-background focus:outline-none focus:ring-1 focus:ring-ring"
                >
                  {["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM"].map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="site-visit-message" className="text-xs font-semibold uppercase tracking-wider block mb-1 text-espresso">
                Additional Message
              </label>
              <Textarea
                id="site-visit-message"
                rows={2}
                placeholder="Any specific requirements or questions for the visit..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="text-sm resize-none"
              />
            </div>

            {error && (
              <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-600">
                <AlertTriangle className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <p className="text-[11px] text-muted-foreground">
              By submitting, you consent to being contacted by Pruthviraj Realty to confirm your visit.
              This is a request — visits are confirmed by our team within 24 hours.
            </p>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-espresso hover:bg-espresso/90 text-white font-medium"
            >
              {loading ? "Submitting..." : "Submit Visit Request"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}

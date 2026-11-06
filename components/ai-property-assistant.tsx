"use client"

import { useState } from "react"
import Link from "next/link"
import { Sparkles, MapPin, ArrowRight, CheckCircle2, MessageCircle, AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { recommendProperties, type RecommendationMatch } from "@/lib/ai-recommender"
import { nashikLocations, propertyCategories } from "@/data/properties"
import { useI18n } from "@/lib/i18n"
import SafeImage from "@/components/safe-image"

const WHATSAPP_NUMBER = "917507716161"

export default function AIPropertyAssistant() {
  const { t } = useI18n()
  const [location, setLocation] = useState("")
  const [category, setCategory] = useState("")
  const [budget, setBudget] = useState("")
  const [purpose, setPurpose] = useState<"Self-Use" | "Weekend Home" | "Investment" | "Commercial" | "Agriculture">("Weekend Home")
  const [matches, setMatches] = useState<RecommendationMatch[]>([])
  const [hasSearched, setHasSearched] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [summary, setSummary] = useState("")

  const handleRecommend = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    setIsAnalyzing(true)

    let budgetNum: number | undefined = undefined
    if (budget === "25L") budgetNum = 2500000
    else if (budget === "50L") budgetNum = 5000000
    else if (budget === "1Cr") budgetNum = 10000000
    else if (budget === "3Cr") budgetNum = 30000000

    setTimeout(() => {
      const result = recommendProperties({
        location: location === "All Locations" ? "" : location,
        category: category || undefined,
        budget: budgetNum,
        purpose: purpose,
      })
      setMatches(result.matches)
      setSummary(result.summary)
      setIsAnalyzing(false)
      setHasSearched(true)
    }, 400)
  }

  return (
    <div className="animate-fade-up bg-espresso text-white rounded-2xl p-5 sm:p-8 lg:p-10 border border-gold/40 shadow-2xl relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 text-gold text-xs font-semibold uppercase tracking-wider mb-3 border border-gold/30">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Intelligent Property Matcher</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold leading-tight text-white">
            Tell Us What You&apos;re Looking For.
          </h2>
          <p className="text-ivory/70 text-sm max-w-xl mt-2">
            Configure your parameters below. Our recommendation engine queries our active Nashik inventory, enforces hard constraints, and explains the reasoning behind each match.
          </p>
        </div>
        <p className="text-[11px] text-ivory/50 italic shrink-0">
          ✓ Verified catalog • 0% synthetic listings
        </p>
      </div>

      {/* Interactive Questionnaire Controls */}
      <div className="animate-scale-in bg-white/5 border border-white/10 rounded-xl p-4 sm:p-5 mb-8 backdrop-blur-sm relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-5 mb-5">
          {/* Location */}
          <div>
            <label htmlFor="matcher-location" className="text-[11px] font-semibold uppercase tracking-wider text-gold block mb-2">
              Preferred Locality
            </label>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger id="matcher-location" className="w-full bg-espresso/90 border-white/20 text-white text-xs h-11">
                <SelectValue placeholder="Any Location in Nashik" />
              </SelectTrigger>
              <SelectContent>
                {nashikLocations.map((loc) => (
                  <SelectItem key={loc} value={loc === "All Locations" ? "" : loc}>
                    {loc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Category */}
          <div>
            <label htmlFor="matcher-category" className="text-[11px] font-semibold uppercase tracking-wider text-gold block mb-2">
              Property Category
            </label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="matcher-category" className="w-full bg-espresso/90 border-white/20 text-white text-xs h-11">
                <SelectValue placeholder="Any Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Categories</SelectItem>
                {propertyCategories.map((c) => (
                  <SelectItem key={c.id} value={c.category}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Budget */}
          <div>
            <label htmlFor="matcher-budget" className="text-[11px] font-semibold uppercase tracking-wider text-gold block mb-2">
              Max Budget Ceiling
            </label>
            <Select value={budget} onValueChange={setBudget}>
              <SelectTrigger id="matcher-budget" className="w-full bg-espresso/90 border-white/20 text-white text-xs h-11">
                <SelectValue placeholder="Flexible Budget" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="25L">Up to ₹25 Lakh</SelectItem>
                <SelectItem value="50L">Up to ₹50 Lakh</SelectItem>
                <SelectItem value="1Cr">Up to ₹1 Crore</SelectItem>
                <SelectItem value="3Cr">Up to ₹3 Crore</SelectItem>
                <SelectItem value="Flexible">Flexible / On Request</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Primary Purpose */}
          <div>
            <label htmlFor="matcher-purpose" className="text-[11px] font-semibold uppercase tracking-wider text-gold block mb-2">
              Intended Purpose
            </label>
            <Select value={purpose} onValueChange={(val: any) => setPurpose(val)}>
              <SelectTrigger id="matcher-purpose" className="w-full bg-espresso/90 border-white/20 text-white text-xs h-11">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Weekend Home">Weekend Retreat / Farmhouse</SelectItem>
                <SelectItem value="Self-Use">Family Residence / Self-Use</SelectItem>
                <SelectItem value="Investment">Long-term Capital Appreciation</SelectItem>
                <SelectItem value="Commercial">Retail / Business Income</SelectItem>
                <SelectItem value="Agriculture">Agriculture & Agro-Tourism</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          onClick={() => handleRecommend()}
          disabled={isAnalyzing}
          className="w-full h-12 bg-gold hover:bg-gold/90 text-espresso font-semibold text-xs tracking-wider uppercase gap-2 transition-all duration-300 hover:shadow-lg"
        >
          {isAnalyzing ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              Analyzing Nashik Inventory...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              Generate Intelligent Recommendations
            </>
          )}
        </Button>
      </div>

      {/* Results Presentation */}
      {hasSearched && (
        <div className="animate-fade-in space-y-6 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-white/10 pb-3">
            <p className="text-xs text-gold font-medium">{summary}</p>
            <span className="text-[10px] text-ivory/60">Showing top matches by confidence score</span>
          </div>

          {matches.length === 0 ? (
            <div className="text-center py-10 bg-white/5 rounded-xl border border-white/10">
              <AlertCircle className="h-10 w-10 text-gold mx-auto mb-2 opacity-80" />
              <p className="text-sm font-serif text-white mb-1">No direct active match found.</p>
              <p className="text-xs text-ivory/70 max-w-md mx-auto mb-4">
                We couldn&apos;t find an exact match under these constraints. Would you like our advisory team to scout upcoming off-market inventory?
              </p>
              <Link href="/buyer-requirements">
                <Button variant="outline" className="border-gold text-gold hover:bg-gold hover:text-espresso text-xs">
                  Submit Custom Buyer Mandate
                </Button>
              </Link>
            </div>
          ) : (
            <div className="animate-stagger grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
              {matches.map(({ property, score, matchReasons, cautionNotes }) => {
                const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  `Hello Pruthviraj Realty, I was recommended "${property.title}" (${property.id}) by your AI Assistant.`
                )}`

                return (
                  <div
                    key={property.id}
                    className="animate-stagger-item group bg-card text-foreground rounded-xl overflow-hidden border border-border flex flex-col justify-between shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div>
                      {/* Image header */}
                      <div className="relative h-44 w-full">
                        <SafeImage
                          src={property.image}
                          alt={`Illustrative photo for demo listing: ${property.title}`}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute top-2.5 left-2.5">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-gold text-espresso shadow">
                            {score}% Match Score
                          </span>
                          <div className="match-score-track mt-1.5 w-20 rounded-full">
                            <span className="match-score-fill block rounded-full" style={{ width: `${score}%` }} />
                          </div>
                        </div>
                        <div className="absolute top-2.5 right-2.5">
                          <span className="px-2 py-0.5 rounded text-[10px] bg-espresso/80 text-white backdrop-blur-sm">
                            {property.category}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <h4 className="font-serif font-semibold text-base text-espresso line-clamp-1 mb-1">
                          {property.title}
                        </h4>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                          <MapPin className="h-3 w-3 text-gold" />
                          <span>{property.location}</span>
                          <span className="mx-1">•</span>
                          <span>{property.area}</span>
                        </div>

                        <div className="p-2.5 bg-muted/60 rounded-lg text-xs mb-3">
                          <span className="text-[10px] uppercase font-semibold text-muted-foreground block mb-1">
                            Price
                          </span>
                          <span className="font-serif font-bold text-espresso text-sm">
                            {property.priceOnRequest ? "Price on Request" : property.priceDisplay}
                          </span>
                        </div>

                        {/* Match Reasons */}
                        <div className="space-y-1 mb-3">
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-gold">Why this matches:</p>
                          {matchReasons.map((r, i) => (
                            <div key={i} className="flex items-start gap-1.5 text-[11px] text-foreground/85">
                              <CheckCircle2 className="h-3 w-3 text-emerald-600 flex-shrink-0 mt-0.5" />
                              <span>{r}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom CTA */}
                    <div className="p-3 bg-muted/30 border-t border-border flex items-center justify-between gap-2">
                      <Link href={`/properties/${property.id}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full text-[11px] border-border text-espresso h-8">
                          View Details
                        </Button>
                      </Link>
                      <a href={waUrl} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" className="bg-[#25D366] hover:bg-[#20ba59] text-white h-8 text-[11px] gap-1 px-3">
                          <MessageCircle className="h-3.5 w-3.5" />
                          Enquire
                        </Button>
                      </a>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

"use client"

import Link from "next/link"
import { Fragment, useState, useCallback } from "react"
import {
  Search, MapPin, ArrowRight, MessageCircle, Phone,
  ChevronRight, Star, Users, Handshake, Shield, Home,
  Building2, TreePine, Landmark, Factory, Mountain, CheckCircle,
  ChevronDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import AppHeader from "@/components/app-header"
import AppFooter from "@/components/app-footer"
import AIPropertyAssistant from "@/components/ai-property-assistant"
import AIChatbot from "@/components/ai-chatbot"
import { useI18n } from "@/lib/i18n"
import { getFeaturedProperties, propertyCategories, nashikLocations } from "@/data/properties"
import type { Property } from "@/data/properties"
import SafeImage from "@/components/safe-image"

const WHATSAPP_NUMBER = "917507716161"
const HERO_IMAGE = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop"

// ─── Property Card ────────────────────────────────────────────────────────────
function PropertyCard({ property }: { property: Property }) {
  const { t } = useI18n()
  const WHATSAPP_MSG = `Hi! I'm interested in "${property.title}" (${property.location}). Please share more details.`
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MSG)}`

  const statusColour =
    property.status === "Available" ? "bg-emerald-50 text-emerald-800 border border-emerald-200" :
    property.status === "Sold"      ? "bg-red-50 text-red-700 border border-red-200" :
    property.status === "Coming Soon" ? "bg-sky-50 text-sky-800 border border-sky-200" :
    "bg-amber-50 text-amber-800 border border-amber-200"

  return (
    <div className="animate-stagger-item card-premium group flex h-full flex-col bg-white overflow-hidden">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <SafeImage
          src={property.image || "/placeholder.jpg"}
          alt={`Illustrative photo for demo listing: ${property.title}`}
          fill
          className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {/* Status badge */}
        <span className={`absolute top-3 left-3 text-[10px] font-semibold tracking-wide uppercase px-2.5 py-1 ${statusColour}`}>
          {property.status}
        </span>
        {/* Transaction badge */}
        <span className="absolute top-3 right-3 text-[10px] font-semibold tracking-wide uppercase px-2.5 py-1 bg-espresso/90 text-ivory">
          {property.transaction}
        </span>
        {/* Demo badge */}
        {property.isDemo && (
          <span className="absolute bottom-3 left-3 text-[9px] tracking-wide uppercase px-2 py-0.5 bg-amber-100/90 text-amber-800">
            Demo
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <p className="text-[11px] font-medium tracking-[0.1em] uppercase text-gold mb-1.5">
          {property.category}
        </p>
        <h3 className="font-serif text-base font-semibold text-espresso leading-snug mb-2 line-clamp-2">
          {property.title}
        </h3>
        <div className="flex items-center gap-1 text-muted-foreground mb-3">
          <MapPin className="h-3 w-3 flex-shrink-0 text-gold" />
          <span className="text-xs truncate">{property.location}</span>
        </div>

        {/* Specs row */}
        <div className="flex items-center gap-4 text-xs text-espresso/60 mb-4">
          <span>{property.area}</span>
          {property.beds !== undefined && (
            <>
              <span>·</span>
              <span>{property.beds} {t.property.beds}</span>
            </>
          )}
          {property.baths !== undefined && (
            <>
              <span>·</span>
              <span>{property.baths} {t.property.baths}</span>
            </>
          )}
        </div>

        {/* Price */}
        <div className="mb-5">
          {property.priceOnRequest ? (
            <span className="text-sm font-medium text-bronze">{t.property.priceOnRequest}</span>
          ) : (
            <span className="text-lg font-serif font-semibold text-espresso">
              {property.priceDisplay}
            </span>
          )}
        </div>

        {/* CTAs */}
        <div className="flex gap-2 mt-auto">
          <Button asChild size="sm" className="flex-1 bg-espresso text-ivory hover:bg-espresso/90 rounded-none text-xs font-medium tracking-wide transition-colors duration-200">
            <Link href={`/properties/${property.id}`}>{t.property.viewDetails}</Link>
          </Button>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 px-3 py-2 border border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors duration-200 text-xs font-medium"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{t.property.whatsapp}</span>
          </a>
        </div>
      </div>
    </div>
  )
}

// ─── Category Card ────────────────────────────────────────────────────────────
function CategoryCard({ cat }: { cat: typeof propertyCategories[0] }) {
  return (
    <Link
      href={cat.route}
      className="animate-stagger-item group relative block overflow-hidden bg-espresso"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <SafeImage
          src={cat.image}
          alt={cat.label}
          fill
          className="object-cover opacity-70 transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/95 via-espresso/40 to-espresso/5 transition-colors duration-500 group-hover:from-espresso/90" />
      </div>
      <div className="absolute inset-0 flex flex-col justify-end p-4">
        <h3 className="text-sm font-serif font-semibold text-white leading-snug drop-shadow-sm">{cat.label}</h3>
        <p className="text-[11px] text-white/80 mt-1 line-clamp-2">{cat.description}</p>
        <div className="flex items-center gap-1 mt-2.5 text-gold text-[11px] font-medium translate-y-1 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          Explore <ArrowRight className="h-3 w-3" />
        </div>
      </div>
    </Link>
  )
}

// ─── Section Heading ──────────────────────────────────────────────────────────
function SectionHeading({ title, subtitle, center = true, eyebrow }: {
  title: string
  subtitle?: string
  center?: boolean
  eyebrow?: string
}) {
  return (
    <div className={`animate-fade-up mb-10 md:mb-14 ${center ? "text-center" : ""}`}>
      <div className={`flex items-center gap-3 mb-3 ${center ? "justify-center" : ""}`}>
        <div className="h-px w-8 bg-gold" />
        <span className="text-xs font-medium tracking-[0.2em] uppercase text-gold">
          {eyebrow || "Pruthviraj Realty"}
        </span>
        <div className="h-px w-8 bg-gold" />
      </div>
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-semibold text-espresso text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-base text-muted-foreground max-w-2xl leading-relaxed ${center ? "mx-auto" : ""}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}

// ─── Value Card ───────────────────────────────────────────────────────────────
function ValueCard({ icon: Icon, title, text }: { icon: React.FC<{ className?: string }>; title: string; text: string }) {
  return (
    <div className="animate-stagger-item flex gap-4 p-5 border border-border hover:border-gold/60 transition-all duration-300 hover:shadow-sm group">
      <div className="flex-shrink-0">
        <div className="w-10 h-10 flex items-center justify-center bg-gold/10 group-hover:bg-gold/20 transition-colors duration-300">
          <Icon className="h-5 w-5 text-gold" />
        </div>
      </div>
      <div>
        <h3 className="font-serif text-base font-semibold text-espresso mb-1.5">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
      </div>
    </div>
  )
}

// ─── Location Card ────────────────────────────────────────────────────────────
const nashikAreas = [
  { name: "Gangapur Road", detail: "Premium residential & commercial belt", active: true, Icon: Home },
  { name: "Nashik City", detail: "Central city properties & flats", active: true, Icon: Building2 },
  { name: "Trimbakeshwar", detail: "Farmhouse plots & holiday properties", active: true, Icon: TreePine },
  { name: "Sinnar", detail: "Industrial & commercial opportunities", active: true, Icon: Factory },
  { name: "Dindori Road", detail: "Large land parcels & development zones", active: true, Icon: Mountain },
  { name: "Niphad", detail: "Agricultural land & farmland", active: true, Icon: Landmark },
  { name: "Pune / Mumbai", detail: "Expansion coming soon", active: false, Icon: MapPin },
]

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function HomePage() {
  const { t } = useI18n()
  const featuredProperties = getFeaturedProperties()
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello! I'd like to discuss a property with Pruthviraj Realty.")}`

  const [searchLocation, setSearchLocation] = useState("")
  const [searchCategory, setSearchCategory] = useState("")
  const [searchBudget, setSearchBudget] = useState("")

  const handleSearch = useCallback(() => {
    const params = new URLSearchParams()
    if (searchLocation) params.set("location", searchLocation)
    if (searchCategory) params.set("category", searchCategory)
    if (searchBudget) params.set("budget", searchBudget)
    window.location.href = `/properties?${params.toString()}`
  }, [searchLocation, searchCategory, searchBudget])

  return (
    <div className="flex flex-col min-h-screen bg-ivory">
      <AppHeader />

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 1 — HERO
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="hero"
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Background image with Ken Burns */}
        <div className="absolute inset-0 overflow-hidden">
          <SafeImage
            src={HERO_IMAGE}
            alt=""
            fill
            priority
            aria-hidden="true"
            className="hero-background-image object-cover"
            sizes="100vw"
          />
          <div className="hero-overlay absolute inset-0" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 container mx-auto px-4 pt-32 pb-20 flex flex-col items-center text-center">

          {/* Brand signature */}
          <div className="hero-eyebrow mb-6">
            <div className="inline-flex items-center gap-3">
              <div className="h-px w-8 bg-gold/80" />
              <span className="text-xs font-medium tracking-[0.28em] uppercase text-gold/90">
                Nashik&apos;s Property Specialists
              </span>
              <div className="h-px w-8 bg-gold/80" />
            </div>
          </div>

          {/* Logo mark in hero */}
          <div className="hero-eyebrow mb-7" style={{ animationDelay: "0.55s" }}>
            <div className="relative w-16 h-16 mx-auto opacity-90">
              <SafeImage
                src="/logo-pruthviraj.jpeg"
                alt="Pruthviraj Realty"
                fill
                className="object-contain rounded"
                priority
                sizes="64px"
              />
            </div>
          </div>

          {/* Headline */}
          <h1
            aria-label="Find a Property That Fits Your Vision."
            className="hero-heading w-full text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-white leading-[1.12] text-balance mb-6"
          >
            <span aria-hidden="true">
              {["Find", "a", "Property", "That", "Fits", "Your", "Vision."].map((word, index) => (
                <Fragment key={word}>
                  <span className="hero-word" style={{ animationDelay: `${1.05 + index * 0.09}s` }}>
                    {word}
                  </span>
                  {index < 6 ? " " : null}
                </Fragment>
              ))}
            </span>
          </h1>

          {/* Subtext */}
          <p className="hero-subtext text-base md:text-lg text-white/75 max-w-2xl leading-relaxed mb-10">
            Discover thoughtfully selected properties, explore new opportunities and find the right space for your next investment with Pruthviraj Realty.
          </p>

          {/* CTA row */}
          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <Button
              asChild
              className="hero-cta-primary bg-gold text-espresso hover:bg-bronze hover:text-white font-medium tracking-wide rounded-none px-8 py-6 text-sm transition-all duration-300"
            >
              <Link href="/properties">{t.home.heroCta1}</Link>
            </Button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta-secondary flex items-center justify-center gap-2 px-8 py-3 border border-white/40 text-white hover:bg-white/10 hover:border-white/60 transition-all duration-300 text-sm font-medium tracking-wide"
            >
              <MessageCircle className="h-4 w-4" />
              {t.home.heroCta2}
            </a>
          </div>

          {/* Search panel */}
          <div className="hero-search w-full max-w-3xl bg-white/98 backdrop-blur-sm p-5 shadow-2xl border-t-2 border-t-gold">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Location */}
              <Select onValueChange={setSearchLocation}>
                <SelectTrigger className="rounded-none border-border text-sm h-11 focus:ring-gold">
                  <SelectValue placeholder={t.home.searchLocation} />
                </SelectTrigger>
                <SelectContent>
                  {nashikLocations.map((loc) => (
                    <SelectItem key={loc} value={loc === "All Locations" ? "" : loc}>{loc}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Category */}
              <Select onValueChange={setSearchCategory}>
                <SelectTrigger className="rounded-none border-border text-sm h-11 focus:ring-gold">
                  <SelectValue placeholder={t.home.searchCategory} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">{t.filters.any}</SelectItem>
                  {propertyCategories.map((c) => (
                    <SelectItem key={c.id} value={c.category}>{c.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Budget */}
              <Select onValueChange={setSearchBudget}>
                <SelectTrigger className="rounded-none border-border text-sm h-11 focus:ring-gold">
                  <SelectValue placeholder={t.home.searchBudget} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">{t.filters.any}</SelectItem>
                  <SelectItem value="0-1000000">Under ₹10 Lakh</SelectItem>
                  <SelectItem value="1000000-5000000">₹10L – ₹50L</SelectItem>
                  <SelectItem value="5000000-10000000">₹50L – ₹1 Crore</SelectItem>
                  <SelectItem value="10000000-50000000">₹1Cr – ₹5 Crore</SelectItem>
                  <SelectItem value="50000000-0">Above ₹5 Crore</SelectItem>
                </SelectContent>
              </Select>

              <Button
                onClick={handleSearch}
                className="bg-espresso hover:bg-espresso/90 text-white rounded-none h-11 text-sm font-medium tracking-wide gap-2 transition-colors duration-200"
              >
                <Search className="h-4 w-4" />
                {t.home.searchBtn}
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="w-px h-10 bg-white/30" style={{ animation: "scrollPulse 2s ease-in-out infinite" }} />
          <span className="text-[9px] tracking-[0.25em] uppercase text-white/50">Scroll</span>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 2 — PROPERTY CATEGORIES
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="categories" className="section-py bg-white">
        <div className="container mx-auto section-px">
          <SectionHeading title={t.home.categoriesTitle} subtitle={t.home.categoriesSubtitle} />
          <div className="animate-stagger grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {propertyCategories.slice(0, 9).map((cat) => (
              <CategoryCard key={cat.id} cat={cat} />
            ))}
            {/* View All card */}
            <Link
              href="/properties"
              className="animate-stagger-item flex aspect-[4/3] flex-col items-center justify-center gap-3 border border-gold/40 bg-ivory/50 text-espresso transition-all duration-300 hover:border-gold hover:bg-gold/10 group"
            >
              <div className="w-10 h-10 rounded-full border border-gold/50 text-gold group-hover:border-gold flex items-center justify-center transition-all duration-300">
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-300" />
              </div>
              <span className="text-xs font-semibold tracking-wide uppercase">View All Properties</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 3 — FEATURED PROPERTIES
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="featured-properties" className="section-py bg-ivory">
        <div className="container mx-auto section-px">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-10">
            <SectionHeading
              title={t.home.featuredTitle}
              subtitle={t.home.featuredSubtitle}
              center={false}
            />
            <Button asChild variant="outline" className="border-espresso text-espresso hover:bg-espresso hover:text-white rounded-none text-xs tracking-wide shrink-0 mb-10 md:mb-14">
              <Link href="/properties" className="flex items-center gap-2">
                {t.home.featuredViewAll} <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>

          {featuredProperties.length > 0 ? (
            <div className="animate-stagger grid property-card-grid items-stretch gap-5">
              {featuredProperties.slice(0, 6).map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-muted-foreground">
              <p>Featured listings will appear here. Add properties to your database to get started.</p>
            </div>
          )}

          {/* Demo disclaimer */}
          <p className="mt-6 text-xs text-center text-muted-foreground/60 italic">
            ⚠️ All listings shown are for demonstration purposes only. Actual properties and prices must be verified with Pruthviraj Realty.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 4 — AI PROPERTY ASSISTANT
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="ai-assistant" className="section-py bg-muted/40">
        <div className="container mx-auto section-px">
          <AIPropertyAssistant />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 5 — WHY PRUTHVIRAJ REALTY
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="why-us" className="section-py bg-white overflow-hidden">
        <div className="container mx-auto section-px">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading title={t.home.whyTitle} subtitle={t.home.whySubtitle} center={false} />
              <div className="animate-stagger grid gap-4">
                {[
                  { icon: Users, title: t.home.personalizedTitle, text: t.home.personalizedText },
                  { icon: Shield, title: t.home.transparentTitle, text: t.home.transparentText },
                  { icon: Building2, title: t.home.diverseTitle, text: t.home.diverseText },
                  { icon: Handshake, title: t.home.buyerSellerTitle, text: t.home.buyerSellerText },
                  { icon: Star, title: t.home.investorTitle, text: t.home.investorText },
                ].map((v) => (
                  <ValueCard key={v.title} icon={v.icon} title={v.title} text={v.text} />
                ))}
              </div>
            </div>

            {/* Right — architectural image */}
            <div className="relative hidden lg:block">
              <div className="animate-image-reveal relative aspect-[4/5] overflow-hidden">
                <SafeImage
                  src="https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=800&auto=format&fit=crop"
                  alt="Illustrative modern office development"
                  fill
                  className="object-cover object-center"
                  sizes="50vw"
                />
                {/* Gold frame accent */}
                <div className="absolute inset-0 ring-1 ring-inset ring-gold/20" />
              </div>
              {/* Offset accent box */}
              <div className="absolute -bottom-5 -left-5 w-44 h-44 bg-gold/8 border border-gold/20 -z-10" />
              {/* Small overlay stat */}
              <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-sm p-4 shadow-lg border-l-2 border-l-gold">
                <p className="text-xs font-medium tracking-[0.1em] uppercase text-gold mb-0.5">Est.</p>
                <p className="text-2xl font-serif font-semibold text-espresso">2010</p>
                <p className="text-xs text-muted-foreground">Serving Nashik</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 6 — HOW IT WORKS (Horizontal Timeline)
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="how-it-works" className="section-py bg-espresso text-white overflow-hidden">
        <div className="container mx-auto section-px">
          <div className="text-center mb-14">
            <div className="flex items-center gap-3 justify-center mb-3">
              <div className="h-px w-8 bg-gold" />
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-gold/90">Process</span>
              <div className="h-px w-8 bg-gold" />
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-semibold text-white">
              {t.home.howTitle}
            </h2>
          </div>

          {/* Desktop — horizontal connected timeline */}
          <div className="animate-stagger hidden lg:grid lg:grid-cols-4 gap-0 relative">
            {/* Connecting line */}
            <div className="timeline-connector absolute top-6 left-[12.5%] right-[12.5%] h-px bg-gold/25" aria-hidden="true" />

            {[
              { n: "01", title: t.home.howStep1Title, text: t.home.howStep1Text },
              { n: "02", title: t.home.howStep2Title, text: t.home.howStep2Text },
              { n: "03", title: t.home.howStep3Title, text: t.home.howStep3Text },
              { n: "04", title: t.home.howStep4Title, text: t.home.howStep4Text },
            ].map((s, i) => (
              <div key={s.n} className="animate-stagger-item flex flex-col items-center text-center px-6 relative">
                {/* Number circle */}
                <div className="timeline-number relative z-10 w-12 h-12 flex items-center justify-center rounded-full border border-gold mb-6">
                  <span className="text-base font-serif font-semibold text-gold">{s.n}</span>
                </div>
                <h3 className="font-serif text-base font-semibold text-white mb-2">{s.title}</h3>
                <p className="text-sm text-ivory/60 leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>

          {/* Mobile — vertical timeline */}
          <div className="timeline-mobile animate-stagger lg:hidden grid grid-cols-1 gap-6">
            {[
              { n: "01", title: t.home.howStep1Title, text: t.home.howStep1Text },
              { n: "02", title: t.home.howStep2Title, text: t.home.howStep2Text },
              { n: "03", title: t.home.howStep3Title, text: t.home.howStep3Text },
              { n: "04", title: t.home.howStep4Title, text: t.home.howStep4Text },
            ].map((s) => (
              <div key={s.n} className="animate-stagger-item relative z-10 flex gap-5">
                <div className="timeline-number flex-shrink-0 w-11 h-11 flex items-center justify-center rounded-full border border-gold">
                  <span className="text-sm font-serif font-semibold text-gold">{s.n}</span>
                </div>
                <div>
                  <h3 className="font-serif text-base font-semibold text-white mb-1.5">{s.title}</h3>
                  <p className="text-sm text-ivory/60 leading-relaxed">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 7 — INVESTMENT OPPORTUNITIES
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="investment" className="section-py bg-ivory overflow-hidden">
        <div className="container mx-auto section-px">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="animate-image-reveal relative aspect-video lg:aspect-[4/5] overflow-hidden">
                <SafeImage
                  src="https://images.unsplash.com/photo-1565008447742-97f6f38c985c?q=80&w=800&auto=format&fit=crop"
                  alt="Illustrative industrial investment property"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-espresso/15" />
              </div>
              {/* Legal disclaimer overlay */}
              <div className="absolute bottom-5 left-5 right-5 bg-white/97 backdrop-blur-sm p-4 border-l-2 border-l-gold">
                <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-gold mb-1">Important</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Investment in real estate involves risk. Please conduct proper legal and financial due diligence.
                  Pruthviraj Realty does not guarantee returns or approvals.
                </p>
              </div>
            </div>

            <div>
              <SectionHeading title={t.home.investmentTitle} subtitle={t.home.investmentSubtitle} center={false} />
              <div className="space-y-3 mb-8">
                {[
                  "Industrial MIDC plots in Sinnar and surrounding areas",
                  "Large land parcels for township and plotted development",
                  "NA-approved plots in high-growth zones around Nashik",
                  "Agricultural land near river belts in Niphad and Dindori",
                  "Commercial plots on key highway corridors",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-gold flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-espresso/80">{item}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild className="bg-gold text-espresso hover:bg-bronze hover:text-white rounded-none font-medium tracking-wide transition-all duration-300">
                  <Link href="/investment-opportunities">{t.home.enquiryCta}</Link>
                </Button>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 border border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors duration-200 text-sm font-medium"
                >
                  <MessageCircle className="h-4 w-4" />
                  {t.home.enquiryWhatsapp}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 8 — SUCCESS STORIES (Empty State)
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="testimonials" className="section-py bg-white">
        <div className="container mx-auto section-px text-center">
          <SectionHeading title={t.home.testimonialsTitle} subtitle={t.home.testimonialsSubtitle} />
          <div className="max-w-2xl mx-auto">
            {/* Elegant empty state */}
            <div className="relative border border-border p-10 bg-ivory/50">
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-gold" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-gold" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-gold" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-gold" />

              <div className="flex justify-center gap-1 mb-5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="h-5 w-5 text-gold/40" />
                ))}
              </div>
              <p className="font-serif text-lg font-medium text-espresso mb-2">Your Story Matters</p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-md mx-auto">
                {t.home.testimonialsPlaceholder}
              </p>
              <div className="flex items-center justify-center">
                <div className="h-px flex-1 bg-border max-w-16" />
                <span className="px-4 text-xs text-muted-foreground/60 tracking-wider uppercase">Share Your Experience</span>
                <div className="h-px flex-1 bg-border max-w-16" />
              </div>
              <div className="mt-5">
                <Button asChild variant="outline" className="border-gold text-gold hover:bg-gold hover:text-espresso rounded-none text-xs tracking-wide transition-all duration-300">
                  <Link href="/contact">Write a Review</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 9 — COVERAGE AREAS
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="locations" className="section-py bg-ivory">
        <div className="container mx-auto section-px">
          <SectionHeading title={t.home.locationsTitle} subtitle={t.home.locationsSubtitle} />
          <div className="animate-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {nashikAreas.map((area) => (
              <div
                key={area.name}
                className={`animate-stagger-item flex min-h-32 flex-col p-5 border transition-all duration-300 ${
                  area.active
                    ? "border-border hover:border-gold/70 hover:shadow-sm cursor-pointer hover:bg-white group"
                    : "border-dashed border-border/70 bg-white/40"
                }`}
                aria-label={!area.active ? `${area.name}, expansion coming soon` : undefined}
              >
                <div className="flex items-center gap-2 mb-2">
                  <area.Icon className={`h-4 w-4 flex-shrink-0 ${area.active ? "text-gold" : "text-muted-foreground"}`} aria-hidden="true" />
                  <span className={`text-sm font-medium ${area.active ? "text-espresso group-hover:text-gold transition-colors" : "text-muted-foreground"}`}>
                    {area.name}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{area.detail}</p>
                {!area.active && (
                  <span className="text-[10px] tracking-wide uppercase text-bronze mt-2 block">Coming soon</span>
                )}
                {area.active && (
                  <div className="flex items-center gap-1 mt-auto pt-3 text-gold text-[11px] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <MapPin className="h-3 w-3" />
                    <span>View properties</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 10 — FINAL CTA
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="enquiry-cta"
        className="section-py relative overflow-hidden bg-espresso"
      >
        {/* Background architectural image */}
        <div className="animate-image-reveal absolute inset-0">
          <SafeImage
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1400&auto=format&fit=crop"
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
            aria-hidden="true"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(48,35,31,0.8) 0%, rgba(30,21,18,0.72) 100%)" }} />
        </div>

        <div className="relative z-10 container mx-auto section-px text-center">
          <div className="flex items-center gap-3 justify-center mb-4">
            <div className="h-px w-12 bg-gold/40" />
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-gold/70">Get in Touch</span>
            <div className="h-px w-12 bg-gold/40" />
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-semibold text-white mb-5 max-w-2xl mx-auto text-balance">
            {t.home.enquiryTitle}
          </h2>
          <p className="text-base text-ivory/60 max-w-lg mx-auto mb-10">
            {t.home.enquirySubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-gold text-espresso hover:bg-bronze hover:text-white rounded-none font-medium tracking-wide px-8 py-6 text-sm gap-2 transition-all duration-300">
              <Link href="/contact">
                <Phone className="h-4 w-4" />
                {t.home.enquiryCta}
              </Link>
            </Button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-8 py-3 border border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300 text-sm font-medium tracking-wide"
            >
              <MessageCircle className="h-4 w-4" />
              {t.home.enquiryWhatsapp}
            </a>
          </div>
        </div>
      </section>

      <AppFooter />

      {/* ── Floating WhatsApp — bottom-left ── */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Pruthviraj Realty on WhatsApp"
        className="floating-whatsapp fixed z-40 flex items-center gap-2 bg-[#25D366] text-white px-3.5 py-2.5 rounded-full shadow-lg hover:bg-[#1ebe5d] hover:shadow-xl transition-all duration-300 hover:scale-105"
      >
        <MessageCircle className="h-5 w-5 flex-shrink-0" />
        <span className="text-xs font-semibold hidden md:inline">WhatsApp Us</span>
      </a>

      {/* ── Floating AI Chatbot — bottom-right ── */}
      <AIChatbot />
    </div>
  )
}

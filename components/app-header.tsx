"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ChevronDown, Phone, MessageCircle, Home, Building2, TreePine, Landmark, Factory, Mountain } from "lucide-react"
import { useI18n, type Locale } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

const WHATSAPP_NUMBER = "917507716161"
const WHATSAPP_DEFAULT_MSG = "Hello! I'm interested in learning more about properties at Pruthviraj Realty."

interface PropertyMenuCategory {
  icon: React.ReactNode
  label: string
  route: string
}

export default function AppHeader() {
  const { t, locale, setLocale } = useI18n()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [mobilePropertiesOpen, setMobilePropertiesOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const propertyCategories: PropertyMenuCategory[] = [
    { icon: <TreePine className="h-3.5 w-3.5" />, label: t.nav.farmhousePlots, route: "/properties/farmhouse-plots" },
    { icon: <Home className="h-3.5 w-3.5" />, label: t.nav.residentialPlots, route: "/properties/residential-plots" },
    { icon: <Building2 className="h-3.5 w-3.5" />, label: t.nav.commercialPlots, route: "/properties/commercial-plots" },
    { icon: <Home className="h-3.5 w-3.5" />, label: t.nav.flatsApartments, route: "/properties/flats-apartments" },
    { icon: <Home className="h-3.5 w-3.5" />, label: t.nav.rowHousesVillas, route: "/properties/row-houses-villas" },
    { icon: <Landmark className="h-3.5 w-3.5" />, label: t.nav.commercialProperties, route: "/properties/commercial-properties" },
    { icon: <Mountain className="h-3.5 w-3.5" />, label: t.nav.agriculturalLand, route: "/properties/agricultural-land" },
    { icon: <Factory className="h-3.5 w-3.5" />, label: t.nav.industrialProperties, route: "/properties/industrial-properties" },
    { icon: <Mountain className="h-3.5 w-3.5" />, label: t.nav.largeLand, route: "/properties/large-land" },
  ]

  const mainNavLinks = [
    { label: t.nav.home, href: "/" },
    { label: t.nav.about, href: "/about" },
    { label: t.nav.projects, href: "/projects" },
    { label: t.nav.services, href: "/services" },
    { label: t.nav.investment, href: "/investment-opportunities" },
    { label: t.nav.contact, href: "/contact" },
  ]

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_DEFAULT_MSG)}`

  const headerClass = `
    fixed top-0 left-0 right-0 z-50 transition-all duration-300
    ${isScrolled
      ? "bg-white/98 backdrop-blur-md shadow-sm border-b border-border"
      : "bg-transparent"
    }
  `

  const navLinkClass = `text-sm font-medium tracking-wide transition-colors duration-200 hover:text-gold ${isScrolled ? "text-espresso/80" : "text-white/90"}`

  return (
    <>
      <header className={headerClass}>
        {/* Top bar — visible only on desktop when not scrolled */}
        {!isScrolled && (
          <div className="hidden lg:block border-b border-white/10">
            <div className="container mx-auto flex items-center justify-between px-4 py-2">
              <p className="text-xs text-white/60 tracking-wide">
                {t.brand.tagline}
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="tel:+917507716161"
                  className="flex items-center gap-1.5 text-xs text-white/70 hover:text-gold transition-colors"
                >
                  <Phone className="h-3 w-3" />
                  <span>+91 75077 16161</span>
                </a>
                <LanguageSwitcher locale={locale} setLocale={setLocale} t={t} isScrolled={isScrolled} />
              </div>
            </div>
          </div>
        )}

        {/* Main navigation */}
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <Link href="/" className="logo-entrance flex items-center gap-3 group" aria-label="Pruthviraj Realty — Home">
            {/* Approved company mark; source artwork and colors are preserved. */}
            <div className={`relative flex-shrink-0 transition-all duration-300 ${isScrolled ? "w-10 h-10" : "w-11 h-11"}`}>
              <Image
                src="/logo-pruthviraj.jpeg"
                alt="Pruthviraj Realty logo"
                fill
                className="object-contain rounded-sm"
                priority
                sizes="(max-width: 640px) 40px, 44px"
              />
            </div>
            {/* Brand text alongside logo */}
            <div className="flex flex-col leading-none">
              <span className={`text-lg font-serif font-semibold tracking-tight transition-colors duration-200 group-hover:text-gold ${isScrolled ? "text-espresso" : "text-white"}`}>
                Pruthviraj Realty
              </span>
              <span className={`text-[9px] tracking-[0.18em] uppercase transition-colors duration-200 ${isScrolled ? "text-gold" : "text-gold/90"}`}>
                Nashik
              </span>
            </div>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {mainNavLinks.slice(0, 2).map((link) => (
              <Link key={link.href} href={link.href} className={navLinkClass}>
                {link.label}
              </Link>
            ))}

            {/* Properties dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className={`flex items-center gap-1 ${navLinkClass}`}>
                {t.nav.properties}
                <ChevronDown className="h-3.5 w-3.5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64 p-2 bg-white border border-border shadow-lg">
                <DropdownMenuItem asChild>
                  <Link href="/properties" className="flex items-center gap-2 text-sm font-medium text-espresso hover:text-gold px-2 py-1.5">
                    {t.nav.allProperties}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {propertyCategories.map((cat) => (
                  <DropdownMenuItem key={cat.route} asChild>
                    <Link
                      href={cat.route}
                      className="flex items-center gap-2 text-sm text-espresso/80 hover:text-gold px-2 py-1.5"
                    >
                      <span className="text-gold">{cat.icon}</span>
                      {cat.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {mainNavLinks.slice(2).map((link) => (
              <Link key={link.href} href={link.href} className={navLinkClass}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop right actions */}
          <div className="hidden lg:flex items-center gap-3">
            {isScrolled && (
              <LanguageSwitcher locale={locale} setLocale={setLocale} t={t} isScrolled={isScrolled} />
            )}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded bg-[#25D366] text-white hover:bg-[#1ebe5d] transition-colors"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              {t.nav.whatsapp}
            </a>
            <Button
              asChild
              size="sm"
              className="bg-gold text-espresso hover:bg-bronze hover:text-white text-xs font-medium tracking-wide rounded-none px-4"
            >
              <Link href="/list-property">{t.nav.listProperty}</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className={`lg:hidden p-2 rounded transition-colors ${isScrolled ? "text-espresso hover:bg-muted" : "text-white hover:bg-white/10"}`}
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label={isMobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileOpen}
            aria-controls="mobile-primary-navigation"
          >
            {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileOpen && (
          <div id="mobile-primary-navigation" className="lg:hidden bg-white border-t border-border shadow-lg">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {mainNavLinks.slice(0, 2).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-espresso hover:text-gold py-2.5 border-b border-border/50"
                  onClick={() => setIsMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile Properties submenu */}
              <div>
                <button
                  className="flex items-center justify-between w-full text-sm font-medium text-espresso hover:text-gold py-2.5 border-b border-border/50"
                  onClick={() => setMobilePropertiesOpen(!mobilePropertiesOpen)}
                >
                  {t.nav.properties}
                  <ChevronDown className={`h-4 w-4 transition-transform ${mobilePropertiesOpen ? "rotate-180" : ""}`} />
                </button>
                {mobilePropertiesOpen && (
                  <div className="pl-4 py-2 flex flex-col gap-1">
                    <Link
                      href="/properties"
                      className="text-sm text-espresso/80 hover:text-gold py-1.5"
                      onClick={() => setIsMobileOpen(false)}
                    >
                      {t.nav.allProperties}
                    </Link>
                    {propertyCategories.map((cat) => (
                      <Link
                        key={cat.route}
                        href={cat.route}
                        className="flex items-center gap-2 text-sm text-espresso/70 hover:text-gold py-1.5"
                        onClick={() => setIsMobileOpen(false)}
                      >
                        <span className="text-gold">{cat.icon}</span>
                        {cat.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {mainNavLinks.slice(2).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-espresso hover:text-gold py-2.5 border-b border-border/50"
                  onClick={() => setIsMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              <div className="flex flex-col gap-3 pt-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 bg-[#25D366] text-white text-sm font-medium rounded"
                >
                  <MessageCircle className="h-4 w-4" />
                  {t.nav.whatsapp}
                </a>
                <Link
                  href="/list-property"
                  className="flex items-center justify-center py-2.5 bg-gold text-espresso text-sm font-medium"
                  onClick={() => setIsMobileOpen(false)}
                >
                  {t.nav.listProperty}
                </Link>
                <div className="flex justify-center pt-2">
                  <LanguageSwitcher locale={locale} setLocale={setLocale} t={t} isScrolled={true} />
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  )
}

function LanguageSwitcher({
  locale,
  setLocale,
  t,
  isScrolled,
}: {
  locale: Locale
  setLocale: (l: Locale) => void
  t: { language: { label: string; en: string; mr: string; hi: string } }
  isScrolled: boolean
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={`flex items-center gap-1 text-xs font-medium tracking-wide hover:text-gold transition-colors ${
          isScrolled ? "text-espresso/70" : "text-white/80"
        }`}
      >
        {locale === "en" ? "EN" : locale === "mr" ? "मर" : "हि"}
        <ChevronDown className="h-3 w-3" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[120px] bg-white border border-border shadow-lg">
        <DropdownMenuItem
          onClick={() => setLocale("en")}
          className={`text-sm ${locale === "en" ? "text-gold font-medium" : "text-espresso"}`}
        >
          {t.language.en}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLocale("mr")}
          className={`text-sm ${locale === "mr" ? "text-gold font-medium" : "text-espresso"}`}
        >
          {t.language.mr}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLocale("hi")}
          className={`text-sm ${locale === "hi" ? "text-gold font-medium" : "text-espresso"}`}
        >
          {t.language.hi}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

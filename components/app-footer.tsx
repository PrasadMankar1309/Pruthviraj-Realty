"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail, MessageCircle } from "lucide-react"
import { useI18n } from "@/lib/i18n"

const WHATSAPP_NUMBER = "917507716161"
const WHATSAPP_MSG = "Hello! I'd like to enquire about properties at Pruthviraj Realty."

export default function AppFooter() {
  const { t } = useI18n()
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MSG)}`

  return (
    <footer className="bg-espresso text-ivory/80">
      {/* Main footer */}
      <div className="container mx-auto px-4 py-14 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
        {/* Brand column */}
        <div className="lg:col-span-1">
          <Link href="/" className="group inline-flex items-center gap-3 mb-5" aria-label="Pruthviraj Realty">
            {/* Approved company mark; source artwork and colors are preserved. */}
            <div className="relative w-14 h-12 flex-shrink-0">
              <Image
                src="/logo-pruthviraj.jpeg"
                alt="Pruthviraj Realty logo"
                fill
                className="object-contain rounded-sm"
                sizes="56px"
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-xl font-serif font-semibold text-white group-hover:text-gold transition-colors">
                Pruthviraj Realty
              </span>
              <span className="text-[9px] tracking-[0.2em] uppercase text-gold mt-0.5">Nashik</span>
            </div>
          </Link>

          <p className="text-sm leading-relaxed text-ivory/60 mb-6">
            {t.footer.tagline}
          </p>
          <div className="flex flex-col gap-2.5">
            <a href="tel:+917507716161" className="flex items-center gap-2 text-sm text-ivory/60 hover:text-gold transition-colors">
              <Phone className="h-3.5 w-3.5 text-gold flex-shrink-0" />
              +91 75077 16161
            </a>
            <a href="mailto:contact@pruthvirajrealty.in" className="flex items-center gap-2 text-sm text-ivory/60 hover:text-gold transition-colors">
              <Mail className="h-3.5 w-3.5 text-gold flex-shrink-0" />
              contact@pruthvirajrealty.in
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-ivory/60 hover:text-gold transition-colors"
            >
              <MessageCircle className="h-3.5 w-3.5 text-gold flex-shrink-0" />
              {t.nav.whatsapp}
            </a>
            <div className="flex items-start gap-2 text-sm text-ivory/60">
              <MapPin className="h-3.5 w-3.5 text-gold flex-shrink-0 mt-0.5" />
              <span>Nashik, Maharashtra, India</span>
            </div>
          </div>
        </div>

        {/* Properties */}
        <div>
          <h4 className="text-xs font-semibold tracking-[0.15em] uppercase text-gold mb-5">
            {t.footer.propertiesMenu}
          </h4>
          <ul className="space-y-2.5">
            {[
              { href: "/properties", label: t.footer.allProperties },
              { href: "/properties/farmhouse-plots", label: t.nav.farmhousePlots },
              { href: "/properties/residential-plots", label: t.nav.residentialPlots },
              { href: "/properties/flats-apartments", label: t.nav.flatsApartments },
              { href: "/properties/commercial-properties", label: t.nav.commercialProperties },
              { href: "/properties/agricultural-land", label: t.nav.agriculturalLand },
              { href: "/properties/industrial-properties", label: t.nav.industrialProperties },
              { href: "/investment-opportunities", label: t.nav.investment },
            ].map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-ivory/60 hover:text-gold transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-xs font-semibold tracking-[0.15em] uppercase text-gold mb-5">
            {t.footer.company}
          </h4>
          <ul className="space-y-2.5">
            {[
              { href: "/about", label: t.nav.about },
              { href: "/services", label: t.nav.services },
              { href: "/projects", label: t.nav.projects },
              { href: "/success-stories", label: t.nav.successStories },
              { href: "/agents", label: t.pages.agentsTitle },
              { href: "/list-property", label: t.nav.listProperty },
              { href: "/careers", label: t.footer.careers },
              { href: "/contact", label: t.nav.contact },
            ].map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-ivory/60 hover:text-gold transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal + Social */}
        <div>
          <h4 className="text-xs font-semibold tracking-[0.15em] uppercase text-gold mb-5">
            {t.footer.legal}
          </h4>
          <ul className="space-y-2.5 mb-8">
            {[
              { href: "/gallery", label: "Gallery" },
              { href: "/buyer-requirements", label: "Buyer Requirements" },
              { href: "/privacy", label: t.footer.privacy },
              { href: "/terms", label: t.footer.terms },
              { href: "/admin", label: "Admin Operations" },
            ].map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-ivory/60 hover:text-gold transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <h4 className="text-xs font-semibold tracking-[0.15em] uppercase text-gold mb-4">
            Follow Us
          </h4>
          <div className="flex items-center gap-3">
            {[
              { Icon: Facebook, href: "#", label: "Facebook" },
              { Icon: Instagram, href: "#", label: "Instagram" },
              { Icon: Youtube, href: "#", label: "YouTube" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 flex items-center justify-center border border-ivory/20 text-ivory/50 hover:border-gold hover:text-gold hover:bg-gold/10 transition-all duration-200 rounded-sm"
              >
                <Icon className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-ivory/10">
        <div className="container mx-auto px-4 py-6 pb-20 sm:pb-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-ivory/40">{t.footer.rights}</p>
          <p className="text-xs text-ivory/30 text-center md:text-right max-w-md">
            {t.footer.disclaimer}
          </p>
        </div>
      </div>
    </footer>
  )
}

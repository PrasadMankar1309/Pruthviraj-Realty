import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface PageHeroProps {
  eyebrow: string
  title: string
  description?: string
  breadcrumbs?: { label: string; href?: string }[]
  align?: "left" | "center"
}

export default function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs = [],
  align = "left",
}: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-espresso text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_10%,rgba(197,164,109,0.16),transparent_48%)]" aria-hidden="true" />
      <div className="absolute right-[-8rem] top-[-12rem] h-[28rem] w-[28rem] rounded-full border border-gold/10" aria-hidden="true" />
      <div className={`relative container mx-auto px-4 py-14 md:py-20 lg:py-24 ${align === "center" ? "text-center" : ""}`}>
        {breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className={`mb-7 flex flex-wrap items-center gap-2 text-xs text-ivory/60 ${align === "center" ? "justify-center" : ""}`}>
            <Link href="/" className="transition-colors hover:text-gold">Home</Link>
            {breadcrumbs.map((item, index) => (
              <span className="inline-flex items-center gap-2" key={`${item.label}-${index}`}>
                <ChevronRight className="h-3 w-3 text-gold/70" aria-hidden="true" />
                {item.href && index < breadcrumbs.length - 1
                  ? <Link href={item.href} className="transition-colors hover:text-gold">{item.label}</Link>
                  : <span aria-current="page" className="text-ivory/90">{item.label}</span>}
              </span>
            ))}
          </nav>
        )}
        <div className={`${align === "center" ? "mx-auto" : ""} max-w-4xl`}>
          <p className="animate-fade-up mb-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">{eyebrow}</p>
          <h1 className="animate-fade-up text-balance font-serif text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
            {title}
          </h1>
          {description && <p className={`${align === "center" ? "mx-auto" : ""} mt-4 max-w-2xl text-sm leading-relaxed text-ivory/70 sm:text-base`}>{description}</p>}
        </div>
      </div>
    </section>
  )
}

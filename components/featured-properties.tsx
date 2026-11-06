"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import PropertyCard from "@/components/property-card"
import { properties } from "@/data/properties"
import { useI18n } from "@/lib/i18n"

export default function FeaturedProperties() {
  const { t } = useI18n()
  const featuredProperties = properties.filter((p) => p.isFeatured).slice(0, 6)

  return (
    <section className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold font-serif text-espresso tracking-tight md:text-4xl">
              {t.home.featuredTitle}
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-base">
              {t.home.featuredSubtitle}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Button asChild className="bg-espresso hover:bg-espresso/90 text-white">
            <Link href="/properties">{t.home.featuredViewAll}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

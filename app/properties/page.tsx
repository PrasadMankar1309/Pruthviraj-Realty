"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import PropertyListingPage from "@/components/property-listing-page"
import { useI18n } from "@/lib/i18n"

function PropertiesPageContent() {
  const { t } = useI18n()
  const searchParams = useSearchParams()
  const initialFilters = {
    location: searchParams.get("location") || "",
    category: searchParams.get("category") || "",
    transaction: searchParams.get("transaction") || "",
  }

  return (
    <PropertyListingPage
      title={t.pages.propertiesTitle}
      subtitle={t.pages.propertiesSubtitle}
      initialFilters={initialFilters}
    />
  )
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={<div className="flex min-h-[50vh] items-center justify-center bg-ivory text-sm text-muted-foreground" role="status">Loading properties…</div>}>
      <PropertiesPageContent />
    </Suspense>
  )
}

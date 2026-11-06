"use client"

import PropertyListingPage from "@/components/property-listing-page"
import { useI18n } from "@/lib/i18n"

export default function ForRentPage() {
  const { t } = useI18n()
  return <PropertyListingPage title={t.pages.forRentTitle} subtitle={t.pages.forRentSubtitle} transaction="For Rent" />
}

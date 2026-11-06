"use client"

import PropertyListingPage from "@/components/property-listing-page"
import { useI18n } from "@/lib/i18n"

export default function ForSalePage() {
  const { t } = useI18n()
  return <PropertyListingPage title={t.pages.forSaleTitle} subtitle={t.pages.forSaleSubtitle} transaction="For Sale" />
}

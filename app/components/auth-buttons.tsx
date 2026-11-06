"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"
import { useI18n } from "@/lib/i18n"

export default function AuthButtons() {
  const { t } = useI18n()

  return (
    <div className="flex items-center gap-4">
      <Button variant="outline" size="sm" asChild>
        <Link href="/auth/signin">{t.nav.signIn}</Link>
      </Button>
      <Button size="sm" asChild>
        <Link href="/auth/signup">{t.nav.signUp}</Link>
      </Button>
    </div>
  )
}

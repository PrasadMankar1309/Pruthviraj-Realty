"use client"

import { Languages, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useI18n, type Locale } from "@/lib/i18n"

export default function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1.5 text-xs h-8">
          <Languages className="h-3.5 w-3.5" />
          <span>{locale === "en" ? "EN" : locale === "mr" ? "मराठी" : "हिंदी"}</span>
          <ChevronDown className="h-3 w-3 opacity-60" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-32 bg-card border border-border">
        <DropdownMenuItem
          onClick={() => setLocale("en")}
          className={`text-xs ${locale === "en" ? "font-bold text-gold" : ""}`}
        >
          {t.language.en}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLocale("mr")}
          className={`text-xs ${locale === "mr" ? "font-bold text-gold" : ""}`}
        >
          {t.language.mr}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLocale("hi")}
          className={`text-xs ${locale === "hi" ? "font-bold text-gold" : ""}`}
        >
          {t.language.hi}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

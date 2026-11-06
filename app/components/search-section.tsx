"use client"

import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useI18n } from "@/lib/i18n"
import { propertyCategories } from "@/data/properties"

export default function SearchSection() {
  const { direction, t } = useI18n()

  return (
    <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-4 border border-border">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2">
          <div className="relative">
            <Search className={`absolute top-2.5 h-4 w-4 text-muted-foreground ${direction === "rtl" ? "right-2.5" : "left-2.5"}`} />
            <Input type="text" placeholder={t.home.searchLocation} className={direction === "rtl" ? "pr-8 text-xs" : "pl-8 text-xs"} />
          </div>
        </div>
        <Select>
          <SelectTrigger className="text-xs">
            <SelectValue placeholder={t.home.searchCategory} />
          </SelectTrigger>
          <SelectContent>
            {propertyCategories.map((c) => (
              <SelectItem key={c.id} value={c.category}>{c.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button className="w-full bg-espresso text-white hover:bg-espresso/90 text-xs">
          {t.home.searchBtn}
        </Button>
      </div>
    </div>
  )
}

"use client"

import { useI18n } from "@/lib/i18n"
import { ShieldCheck } from "lucide-react"

export default function Testimonials() {
  const { t } = useI18n()

  return (
    <section className="w-full py-12 md:py-24 bg-muted/40 border-y border-border">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-serif font-bold text-espresso tracking-tight md:text-4xl">
              {t.home.testimonialsTitle}
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-base">
              {t.home.testimonialsSubtitle}
            </p>
          </div>
        </div>

        <div className="mt-8 max-w-2xl mx-auto p-8 rounded-xl bg-card border border-border text-center">
          <ShieldCheck className="h-10 w-10 text-gold mx-auto mb-3" />
          <p className="text-sm text-foreground/80 leading-relaxed italic mb-4">
            &quot;{t.home.testimonialsPlaceholder}&quot;
          </p>
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
            Pruthviraj Realty • Transparency Policy
          </p>
        </div>
      </div>
    </section>
  )
}

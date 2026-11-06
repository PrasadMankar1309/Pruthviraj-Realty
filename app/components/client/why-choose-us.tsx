"use client"

import { ShieldCheck, Sparkles, Users, Building2, Handshake } from "lucide-react"
import { useI18n } from "@/lib/i18n"

export default function WhyChooseUs() {
  const { t } = useI18n()
  const items = [
    { title: t.home.personalizedTitle, text: t.home.personalizedText, Icon: Sparkles },
    { title: t.home.transparentTitle, text: t.home.transparentText, Icon: ShieldCheck },
    { title: t.home.diverseTitle, text: t.home.diverseText, Icon: Building2 },
    { title: t.home.buyerSellerTitle, text: t.home.buyerSellerText, Icon: Handshake },
  ]

  return (
    <section className="w-full py-12 md:py-24 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-serif font-bold text-espresso tracking-tight md:text-4xl">{t.home.whyTitle}</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-base">{t.home.whySubtitle}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {items.map(({ title, text, Icon }) => (
              <div key={title} className="flex flex-col items-center space-y-2 border border-border rounded-xl p-6 bg-card">
                <div className="p-2.5 bg-gold/15 rounded-full text-gold">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-base font-serif font-bold text-espresso">{title}</h3>
                <p className="text-xs text-muted-foreground text-center leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

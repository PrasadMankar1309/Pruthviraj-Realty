"use client"

import type React from "react"
import AppFooter from "@/components/app-footer"
import AppHeader from "@/components/app-header"
import AIChatbot from "@/components/ai-chatbot"
import { MessageCircle } from "lucide-react"

const WHATSAPP_NUMBER = "917507716161"

export default function PageShell({ children }: { children: React.ReactNode }) {
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello! I'd like to enquire about properties at Pruthviraj Realty.")}`

  return (
    <div className="flex min-h-screen flex-col bg-ivory">
      <AppHeader />
      {/* Top spacer for non-hero pages */}
      <div className="pt-20" />
      <main className="flex-1">{children}</main>
      <AppFooter />

      {/* WhatsApp quick contact on bottom-left */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 left-6 z-40 flex items-center gap-2 bg-[#25D366] text-white px-3.5 py-2 rounded-full shadow-lg hover:bg-[#1ebe5d] hover:shadow-xl transition-all duration-300 hover:scale-105"
      >
        <MessageCircle className="h-5 w-5" />
        <span className="text-xs font-semibold hidden md:inline">WhatsApp Us</span>
      </a>

      {/* Floating AI Chatbot on bottom-right */}
      <AIChatbot />
    </div>
  )
}

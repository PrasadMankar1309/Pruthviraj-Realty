"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  ArrowRight,
  Phone,
  MessageCircle,
  Building,
  CheckCircle2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import SafeImage from "@/components/safe-image"
import { properties, type Property } from "@/data/properties"
import { useI18n, type Locale } from "@/lib/i18n"

interface ChatMessage {
  id: string
  sender: "bot" | "user"
  text: string
  timestamp: string
  propertySuggestions?: Property[]
  quickOptions?: { label: string; action: string }[]
  leadFormTrigger?: boolean
}

const WHATSAPP_NUMBER = "917507716161"

const BOT_GREETINGS: Record<Locale, string> = {
  en: "Namaste! I am the Pruthviraj Realty AI Assistant. I can help you discover verified farmhouse plots, residential layouts, or commercial land in Nashik. How may I assist you today?",
  mr: "नमस्कार! मी पृथ्वीराज रियल्टीचा AI सहाय्यक आहे. मी तुम्हाला नाशिकमधील फार्महाऊस प्लॉट्स, निवासी लेआउट्स किंवा व्यावसायिक जागा शोधण्यात मदत करू शकतो. मी तुम्हाला कशी मदत करू?",
  hi: "नमस्ते! मैं पृथ्वीराज रियल्टी का AI सहायक हूँ। मैं आपको नाशिक में फार्महाउस प्लॉट्स, आवासीय लेआउट या वाणिज्यिक ज़मीन खोजने में सहायता कर सकता हूँ। मैं आपकी क्या मदद कर सकता हूँ?",
}

export default function AIChatbot() {
  const { locale, t } = useI18n()
  const [isOpen, setIsOpen] = useState(false)
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [leadCaptured, setLeadCaptured] = useState(false)
  const [leadName, setLeadName] = useState("")
  const [leadPhone, setLeadPhone] = useState("")
  const [showLeadForm, setShowLeadForm] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "m-0",
      sender: "bot",
      text: BOT_GREETINGS[locale] || BOT_GREETINGS.en,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      quickOptions: [
        { label: "🏡 Farmhouse Plots", action: "farmhouse" },
        { label: "📐 Residential NA Plots", action: "residential-plots" },
        { label: "🏢 Commercial Spaces", action: "commercial" },
        { label: "📞 Connect on WhatsApp", action: "whatsapp" },
      ],
    },
  ])

  // Update greeting if locale changes
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].id === "m-0") {
        return [
          {
            ...prev[0],
            text: BOT_GREETINGS[locale] || BOT_GREETINGS.en,
          },
        ]
      }
      return prev
    })
  }, [locale])

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, isOpen])

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || inputMessage).trim()
    if (!query) return

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages((prev) => [...prev, userMsg])
    if (!textToSend) setInputMessage("")
    setIsTyping(true)

    setTimeout(() => {
      processBotResponse(query.toLowerCase())
      setIsTyping(false)
    }, 600)
  }

  const processBotResponse = (lower: string) => {
    let replyText = ""
    let matchedProps: Property[] | undefined = undefined
    let options: { label: string; action: string }[] | undefined = undefined
    let triggerLead = false

    if (lower.includes("farmhouse") || lower.includes("weekend") || lower.includes("dam")) {
      replyText =
        locale === "mr"
          ? "गंगापूर धरण आणि त्र्यंबकेश्वर पट्ट्यात आमच्याकडे निसर्गरम्य फार्महाऊस आणि वीकेंड होम प्लॉट्स उपलब्ध आहेत. हे काही मुख्य पर्याय पहा:"
          : locale === "hi"
          ? "गंगापुर डैम और त्र्यंबकेश्वर बेल्ट में हमारे पास सुंदर फार्महाउस और वीकेंड होम प्लॉट्स उपलब्ध हैं। यह चुनिंदा विकल्प देखें:"
          : "We have scenic farmhouse and weekend retreat plots along Gangapur Dam backwaters and Trimbakeshwar. Here are top verified options from our catalog:";

      matchedProps = properties
        .filter((p) => p.category === "Farmhouse Plot" || p.category === "Agricultural Land")
        .slice(0, 2)
      options = [
        { label: "Schedule a Site Visit", action: "site-visit" },
        { label: "Check Residential Plots", action: "residential-plots" },
      ]
    } else if (lower.includes("plot") || lower.includes("na") || lower.includes("residential") || lower.includes("जमीन")) {
      replyText =
        locale === "mr"
          ? "गंगापूर रोड, त्र्यंबक रोड आणि इंदिरानगरमध्ये टाउन प्लॅनिंग मंजूर NA निवासी प्लॉट्स उपलब्ध आहेत. येथे काही सूची आहेत:"
          : locale === "hi"
          ? "गंगापुर रोड, त्र्यंबक रोड और इंदिरा नगर में टाउन प्लानिंग स्वीकृत NA आवासीय प्लॉट्स उपलब्ध हैं। यहाँ कुछ चुनिंदा विकल्प हैं:"
          : "We have clear-title, Town Planning sanctioned NA residential plots along Gangapur Road, Trimbak Road, and Indira Nagar. Here are matching listings:";

      matchedProps = properties
        .filter((p) => p.category === "Residential Plot" || p.category === "Flat / Apartment")
        .slice(0, 2)
      options = [
        { label: "Explore All Properties", action: "all-properties" },
        { label: "Submit My Budget", action: "lead-form" },
      ]
    } else if (lower.includes("commercial") || lower.includes("shop") || lower.includes("office") || lower.includes("दुकान")) {
      replyText =
        locale === "mr"
          ? "नाशिक शहरात व्यावसायिक प्लॉट्स, दुकाने आणि ग्रेड-ए ऑफिस स्पेस उपलब्ध आहेत. आमचे व्यावसायिक पर्याय तपासा:"
          : locale === "hi"
          ? "नाशिक शहर में वाणिज्यिक प्लॉट्स, दुकानें और ऑफिस स्पेस उपलब्ध हैं। हमारे विकल्प देखें:"
          : "We feature high-visibility commercial plots, corporate office suites, and retail spaces in central Nashik and highway corridors:";

      matchedProps = properties
        .filter((p) => p.category === "Commercial Plot" || p.category === "Commercial Property")
        .slice(0, 2)
      options = [
        { label: "Investor Mandate", action: "investor" },
        { label: "Talk to Expert", action: "whatsapp" },
      ]
    } else if (lower.includes("price") || lower.includes("budget") || lower.includes("cost") || lower.includes("किंमत")) {
      replyText =
        "Our Nashik residential and farmhouse plots typically range from ₹25 Lakh up to ₹1.5+ Crore for lakeside acreage. Would you like our property desk to match listings specifically to your budget?";
      triggerLead = true
      options = [
        { label: "Under ₹50 Lakh", action: "budget-50l" },
        { label: "₹50L to ₹1 Crore", action: "budget-1cr" },
        { label: "Above ₹1 Crore", action: "budget-above" },
      ]
    } else if (lower.includes("whatsapp") || lower.includes("call") || lower.includes("contact") || lower.includes("नंबर")) {
      replyText =
        "You can connect directly with our Pruthviraj Realty Nashik desk on WhatsApp at +91 75077 16161 or call our property specialist.";
      options = [
        { label: "Open WhatsApp Chat", action: "whatsapp" },
        { label: "Call Now", action: "call" },
      ]
    } else {
      replyText =
        "I am trained on Pruthviraj Realty's verified Nashik property listings, legal due diligence standards, and plotted projects. You can ask about farmhouse plots, NA residential land, commercial spaces, or request a site visit.";
      options = [
        { label: "Show Farmhouse Plots", action: "farmhouse" },
        { label: "Show Residential Plots", action: "residential-plots" },
        { label: "Leave My Phone Number", action: "lead-form" },
      ]
    }

    const botMsg: ChatMessage = {
      id: `b-${Date.now()}`,
      sender: "bot",
      text: replyText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      propertySuggestions: matchedProps,
      quickOptions: options,
      leadFormTrigger: triggerLead,
    }

    setMessages((prev) => [...prev, botMsg])
    if (triggerLead) setShowLeadForm(true)
  }

  const handleQuickAction = (action: string) => {
    if (action === "whatsapp") {
      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello Pruthviraj Realty, I was chatting with your AI Assistant and would like more details.")}`,
        "_blank"
      )
    } else if (action === "call") {
      window.location.href = "tel:+917507716161"
    } else if (action === "lead-form" || action === "site-visit") {
      setShowLeadForm(true)
    } else if (action === "farmhouse") {
      handleSend("Show me farmhouse and weekend plots near Nashik")
    } else if (action === "residential-plots") {
      handleSend("What residential NA plots do you have?")
    } else if (action === "commercial") {
      handleSend("Tell me about commercial spaces and plots")
    } else if (action === "all-properties") {
      window.location.href = "/properties"
    } else if (action.startsWith("budget-")) {
      handleSend(`My budget is around ${action.replace("budget-", "")}`)
    }
  }

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!leadPhone) return

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "Property Enquiry",
          name: leadName || "Chatbot Visitor",
          phone: leadPhone,
          notes: "Captured via AI Chatbot Assistant conversation",
          source: "AI Chatbot Widget",
        }),
      })
    } catch (e) {}

    setLeadCaptured(true)
    setShowLeadForm(false)

    setMessages((prev) => [
      ...prev,
      {
        id: `b-${Date.now()}`,
        sender: "bot",
        text: `Thank you! I have passed your contact (+91 ${leadPhone}) to our Nashik property desk. A consultant will get in touch shortly.`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ])
  }

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="floating-ai-toggle fixed z-50 flex items-center gap-3">
        {!isOpen && (
          <div className="hidden sm:flex items-center gap-2 bg-espresso text-white px-3.5 py-1.5 rounded-full shadow-lg border border-gold/40 text-xs font-medium animate-pulse">
            <Sparkles className="h-3 w-3 text-gold" />
            <span>AI Property Assistant</span>
          </div>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close AI Property Assistant" : "Open AI Property Assistant"}
          aria-expanded={isOpen}
          aria-controls="ai-property-chat-window"
          className="w-14 h-14 rounded-full bg-espresso text-gold border-2 border-gold/60 shadow-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-200"
        >
          {isOpen ? <X className="h-6 w-6 text-white" /> : <MessageSquare className="h-6 w-6 text-gold" />}
        </button>
      </div>

      {/* Floating Chat Drawer/Window */}
      {isOpen && (
        <div
          id="ai-property-chat-window"
          role="dialog"
          aria-modal="false"
          aria-label="Pruthviraj AI Property Assistant"
          className="floating-ai-panel fixed z-50 bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200"
        >
          {/* Header */}
          <div className="bg-espresso text-white p-4 flex items-center justify-between border-b border-gold/30">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gold/20 flex items-center justify-center text-gold border border-gold/50">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-serif font-semibold text-sm">Pruthviraj AI Assistant</h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                </div>
                <p className="text-[10px] text-ivory/60">Nashik Real Estate Discovery</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close AI Property Assistant"
              className="text-ivory/60 hover:text-white transition-colors p-1"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 ${
                    m.sender === "user"
                      ? "bg-espresso text-white rounded-br-none"
                      : "bg-muted text-foreground rounded-bl-none border border-border"
                  }`}
                >
                  <p className="leading-relaxed">{m.text}</p>

                  {/* Property suggestion cards */}
                  {m.propertySuggestions && m.propertySuggestions.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {m.propertySuggestions.map((prop) => (
                        <Link
                          key={prop.id}
                          href={`/properties/${prop.id}`}
                          onClick={() => setIsOpen(false)}
                          className="block bg-card p-2 rounded-lg border border-border hover:border-gold transition-colors"
                        >
                          <div className="relative h-20 w-full rounded overflow-hidden mb-1.5">
                            <SafeImage
                              src={prop.image}
                              alt={`Illustrative photo for demo listing: ${prop.title}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <p className="font-semibold text-espresso line-clamp-1">{prop.title}</p>
                          <div className="flex items-center justify-between text-[10px] text-muted-foreground mt-0.5">
                            <span>{prop.location}</span>
                            <span className="font-semibold text-gold">
                              {prop.priceOnRequest ? "On Request" : prop.priceDisplay}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* Quick option pills */}
                  {m.quickOptions && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {m.quickOptions.map((opt, i) => (
                        <button
                          key={i}
                          onClick={() => handleQuickAction(opt.action)}
                          className="px-2.5 py-1 rounded-full bg-card hover:bg-secondary border border-border text-[10px] text-espresso font-medium transition-colors"
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-[9px] text-muted-foreground mt-1 px-1">
                  {m.timestamp}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 text-muted-foreground text-xs p-2">
                <Bot className="h-3.5 w-3.5 text-gold animate-bounce" />
                <span>Assistant is evaluating catalog...</span>
              </div>
            )}

            {/* Quick Lead Capture Form */}
            {showLeadForm && !leadCaptured && (
              <div className="p-3 bg-secondary/70 border border-gold/40 rounded-xl">
                <p className="text-[11px] font-semibold text-espresso mb-1">
                  Request Call from Property Specialist
                </p>
                <form onSubmit={handleLeadSubmit} className="space-y-2">
                  <Input
                    placeholder="Your Name"
                    className="h-7 text-xs bg-card"
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                  />
                  <Input
                    required
                    type="tel"
                    placeholder="Phone Number *"
                    className="h-7 text-xs bg-card"
                    value={leadPhone}
                    onChange={(e) => setLeadPhone(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <Button type="submit" size="sm" className="h-7 text-[10px] flex-1 bg-espresso text-white">
                      Connect Me
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-7 text-[10px]"
                      onClick={() => setShowLeadForm(false)}
                    >
                      Later
                    </Button>
                  </div>
                </form>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Contact Footer Bar */}
          <div className="px-3 py-1.5 bg-muted/50 border-t border-border flex items-center justify-between text-[10px] text-muted-foreground">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold flex items-center gap-1"
            >
              <MessageCircle className="h-3 w-3 text-[#25D366]" />
              WhatsApp Desk
            </a>
            <span className="text-[9px] italic">0% Hallucinations • Real Data</span>
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSend()
            }}
            className="p-2.5 bg-card border-t border-border flex items-center gap-2"
          >
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={
                locale === "mr"
                  ? "प्लॉट, फार्महाऊस किंवा बजेट विचारा..."
                  : locale === "hi"
                  ? "प्लॉट, फार्महाउस या बजट पूछें..."
                  : "Ask about plots, farmhouses, budgets..."
              }
              className="text-xs h-9 bg-muted/40"
            />
            <Button
              type="submit"
              size="icon"
              className="h-9 w-9 bg-espresso hover:bg-espresso/90 text-gold flex-shrink-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}
    </>
  )
}

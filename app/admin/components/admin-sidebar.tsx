"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import {
  LayoutDashboard,
  Building,
  Users,
  CalendarCheck,
  FolderOpen,
  LogOut,
  ChevronRight,
  ShieldAlert,
  Settings,
  Home,
} from "lucide-react"

const navItems = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/admin/leads", label: "Leads & Enquiries", icon: Users },
  { href: "/admin/properties", label: "Properties", icon: Building },
  { href: "/admin/site-visits", label: "Site Visits", icon: CalendarCheck },
  { href: "/admin/projects", label: "Projects", icon: FolderOpen },
]

interface AdminSidebarProps {
  userEmail: string
}

export default function AdminSidebar({ userEmail }: AdminSidebarProps) {
  const pathname = usePathname()

  const isActive = (item: { href: string; exact?: boolean }) => {
    if (item.exact) return pathname === item.href
    return pathname.startsWith(item.href)
  }

  return (
    <aside className="w-64 min-h-screen bg-espresso text-white flex flex-col shrink-0 border-r border-white/10">
      {/* Brand */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-2 mb-1">
          <ShieldAlert className="h-4 w-4 text-gold" />
          <span className="text-[10px] font-semibold uppercase tracking-widest text-gold">Admin Portal</span>
        </div>
        <p className="font-serif font-semibold text-base text-white leading-tight">Pruthviraj Realty</p>
        <p className="text-[10px] text-ivory/50 mt-0.5 truncate">{userEmail}</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const active = isActive(item)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group ${
                active
                  ? "bg-gold/20 text-gold border border-gold/30"
                  : "text-ivory/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className={`h-4 w-4 ${active ? "text-gold" : "text-ivory/50 group-hover:text-white/80"}`} />
                <span>{item.label}</span>
              </div>
              {active && <ChevronRight className="h-3.5 w-3.5 text-gold/70" />}
            </Link>
          )
        })}
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t border-white/10 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-ivory/50 hover:text-ivory/80 hover:bg-white/5 transition-all"
        >
          <Home className="h-3.5 w-3.5" />
          <span>View Website</span>
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-red-400/70 hover:text-red-400 hover:bg-red-500/10 transition-all"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  )
}

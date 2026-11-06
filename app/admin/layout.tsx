import { redirect } from "next/navigation"
import { getAdminSession } from "@/lib/auth"
import AdminSidebar from "./components/admin-sidebar"

export const metadata = {
  title: "Admin Dashboard — Pruthviraj Realty",
  robots: { index: false, follow: false },
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getAdminSession()

  if (!session) {
    redirect("/admin/login")
  }

  return (
    <div className="min-h-screen bg-muted/30 flex">
      <AdminSidebar userEmail={session.user.email} />
      <main className="flex-1 min-w-0 overflow-auto">
        {children}
      </main>
    </div>
  )
}

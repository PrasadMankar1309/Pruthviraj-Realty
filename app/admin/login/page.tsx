"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Lock, AlertTriangle, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    if (result?.ok) {
      router.push("/admin")
      router.refresh()
    } else {
      setError("Incorrect email or password. Please check your credentials.")
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-espresso flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo Area */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gold/20 border border-gold/30 flex items-center justify-center mx-auto mb-4">
            <Lock className="h-8 w-8 text-gold" />
          </div>
          <h1 className="text-2xl font-serif font-semibold text-white">Pruthviraj Realty</h1>
          <p className="text-sm text-ivory/60 mt-1">Administrative Portal</p>
        </div>

        {/* Login Card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-white mb-6">Sign In to Admin Dashboard</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-ivory/70 block mb-1.5">
                Admin Email
              </label>
              <Input
                type="email"
                required
                autoComplete="email"
                placeholder="admin@pruthvirajrealty.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/30 focus:border-gold focus:ring-gold/30"
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-ivory/70 block mb-1.5">
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/30 focus:border-gold focus:ring-gold/30 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-xs text-red-400">
                <AlertTriangle className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gold hover:bg-gold/90 text-espresso font-semibold py-2.5 mt-2"
            >
              {loading ? "Signing In..." : "Access Admin Dashboard"}
            </Button>
          </form>

          <p className="text-[11px] text-white/30 text-center mt-6">
            Secure session. Access is monitored and restricted to authorized administrators only.
          </p>
        </div>

        <p className="text-center text-xs text-white/30 mt-6">
          © {new Date().getFullYear()} Pruthviraj Realty. All rights reserved.
        </p>
      </div>
    </div>
  )
}

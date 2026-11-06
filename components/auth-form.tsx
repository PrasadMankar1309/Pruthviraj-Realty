"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"
import { useI18n } from "@/lib/i18n"

interface AuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  type: "signin" | "signup" | "forgotPassword"
}

export function AuthForm({ className, type, ...props }: AuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const { t } = useI18n()

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-4">
          {type !== "forgotPassword" && (
            <div className="grid gap-2">
              <Label htmlFor="email">{t.auth.email}</Label>
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
              />
            </div>
          )}
          {type === "forgotPassword" && (
            <div className="grid gap-2">
              <Label htmlFor="email">{t.auth.email}</Label>
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
              />
            </div>
          )}
          {type !== "forgotPassword" && (
            <div className="grid gap-2">
              <Label htmlFor="password">{t.auth.password}</Label>
              <Input
                id="password"
                type="password"
                autoCapitalize="none"
                autoComplete="current-password"
                disabled={isLoading}
              />
            </div>
          )}
          {type === "signup" && (
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">{t.auth.confirmPassword}</Label>
              <Input
                id="confirm-password"
                type="password"
                autoCapitalize="none"
                autoComplete="new-password"
                disabled={isLoading}
              />
            </div>
          )}
          <Button disabled={isLoading}>
            {isLoading && <Icons.spinner className="me-2 h-4 w-4 animate-spin" />}
            {type === "signin" && t.nav.signIn}
            {type === "signup" && t.nav.signUp}
            {type === "forgotPassword" && t.auth.resetPassword}
          </Button>
        </div>
      </form>
    </div>
  )
}

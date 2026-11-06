"use client"

import Link from "next/link"

import LanguageSwitcher from "@/components/language-switcher"
import { AuthForm } from "@/components/auth-form"
import { useI18n } from "@/lib/i18n"

export default function SignInPage() {
  const { t } = useI18n()

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="absolute inset-x-4 top-4 flex items-center justify-between md:inset-x-8 md:top-8">
        <Link href="/" className="flex items-center">
          <span className="text-xl font-serif font-bold text-espresso">Pruthviraj Realty</span>
        </Link>
        <LanguageSwitcher />
      </div>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">{t.auth.welcomeBack}</h1>
          <p className="text-sm text-muted-foreground">{t.auth.signInSubtitle}</p>
        </div>
        <AuthForm type="signin" />
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link href="/auth/signup" className="hover:text-brand underline underline-offset-4">{t.auth.noAccount}</Link>
        </p>
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link href="/auth/forgot-password" className="hover:text-brand underline underline-offset-4">{t.auth.forgotPassword}</Link>
        </p>
      </div>
    </div>
  )
}

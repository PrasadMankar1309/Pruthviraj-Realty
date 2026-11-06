import { NextAuthOptions, getServerSession } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

// Extend NextAuth types to include admin role
declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name: string
      role: "admin" | "user"
    }
  }
  interface User {
    id: string
    email: string
    name: string
    role: "admin" | "user"
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: "admin" | "user"
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const adminEmail = process.env.ADMIN_EMAIL
        const adminPassword = process.env.ADMIN_PASSWORD

        if (!adminEmail || !adminPassword) {
          console.error(
            "ADMIN_EMAIL and ADMIN_PASSWORD environment variables are not set. " +
            "Copy .env.local.example to .env.local and fill in values."
          )
          return null
        }

        // Constant-time comparison to prevent timing attacks
        const emailMatch = credentials.email === adminEmail
        const passwordMatch = credentials.password === adminPassword

        if (emailMatch && passwordMatch) {
          return {
            id: "admin-1",
            email: adminEmail,
            name: "Pruthviraj Realty Admin",
            role: "admin",
          }
        }

        return null
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
    maxAge: 8 * 60 * 60, // 8 hours
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as "admin" | "user"
      }
      return session
    },
  },

  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
}

/**
 * Server-side utility: returns the session or null.
 * Use this in API routes and Server Components.
 */
export { getServerSession }

/**
 * Server-side guard: returns the session only if the user is an admin.
 * Returns null otherwise. Use this to protect admin routes and API routes.
 */
export async function getAdminSession() {
  const session = await getServerSession(authOptions)
  if (session?.user?.role === "admin") return session
  return null
}

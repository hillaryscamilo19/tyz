import CredentialsProvider from "next-auth/providers/credentials"
import { authenticateUser } from "@/lib/api/users"
import type { NextAuthOptions } from "next-auth"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Usuario", type: "text" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null
        }

        try {
          const user = await authenticateUser(credentials.username, credentials.password)

          if (!user) {
            return null
          }

          if (!user.status) {
            throw new Error("Usuario inactivo. Contacte al administrador.")
          }

          return {
            id: user._id.toString(),
            name: user.fullname,
            email: user.email,
            role: user.role,
            department: user.department.toString(),
            username: user.username,
          }
        } catch (error) {
          console.error("Error de autenticación:", error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
        token.department = user.department
        token.username = user.username
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id
        session.user.role = token.role
        session.user.department = token.department
        session.user.username = token.username
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 horas
  },
  secret: process.env.NEXTAUTH_SECRET,
}

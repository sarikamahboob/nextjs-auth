import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import {db} from "@/lib/db"
import { getUserById } from "./data/user"
import { UserRole } from "@prisma/client"

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages : {
    signIn: "/auth/login",
    error: "/auth/error"
  },
  events: {
    async linkAccount({user}) {
      await db.user.update({
        where: {id: user.id},
        data: {emailVerified: new Date()}
      })
    }
  },
  callbacks: {
    // if user email is not verified
    // async signIn({user}) {
    //   console.log({user})
    //   const existingUser = await getUserById(user?.id)
    //   if(!existingUser || !existingUser.emailVerified) {
    //     return false
    //   }
    //   return true;
    // },
    async session({token, session}) {
      if(token.sub && session.user) {
        session.user.id = token.sub
      }
      // session.user.customField = "anything"
      if(token.role && session.user) {
        // session.user.role = token.role as "ADMIN" | "USER"
        session.user.role = token.role as UserRole
      }
      return session;
    },
    async jwt({token}) {
      if(!token.sub) return token;
      const existingUser = await getUserById(token.sub)
      if(!existingUser) return token;
      token.role = existingUser.role
      return token;
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
})
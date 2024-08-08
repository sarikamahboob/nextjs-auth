import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { LoginSchema } from "./schemas"
import { getUserByEmail } from "@/data/user"
import bcrypt from "bcryptjs"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"

export default {
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    Credentials({
      async authorize(credentials) {
        // validate the data of login info
        const validatedFields = LoginSchema.safeParse(credentials)

        // if the data is validated successfully 
        if( validatedFields.success ){
          const {email, password} = validatedFields.data

          // checking that the given email is in the database or not
          const user:any = await getUserByEmail(email);

          // if no matching email user or the matching email user does not hae any password
          if(!user || !user.password) return null;

          // match the given password and the found user password
          const passwordMatch:any = bcrypt.compare(
            password,
            user.password
          )

          // if password matches return the user
          if(passwordMatch) return user;
        }

        return null
      }
    })
  ],
} satisfies NextAuthConfig
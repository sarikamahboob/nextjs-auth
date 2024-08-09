"use server"

import { RegisterSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcryptjs";
import {db} from "@/lib/db"
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

interface RegisterResponse {
  success?: string;
  error?: string;
}

export const register = async (values:z.infer<typeof RegisterSchema>): Promise<RegisterResponse> => {

  // validate fields using zod
  const validatedFields = RegisterSchema.safeParse(values)
  if(!validatedFields.success) {
    return {error: "Invalid fields!"}
  }

  const {email, password, name} = validatedFields.data;

  // hashed the password
  const hashedPassword = await bcrypt.hash(password, 10)

  // checking the given email is unique
  const existingUser = await getUserByEmail(email)
  if( existingUser ){
    return {error: "Email already taken!"}
  }

  // creating the data 
  await db.user.create({
    data : {
      name, 
      email,
      password: hashedPassword,
    }
  })

  const verificationToken = await generateVerificationToken(email)
  await sendVerificationEmail(verificationToken.email, verificationToken.token)

  // send verification token
  return {success: "Confirmation email sent!"}
}
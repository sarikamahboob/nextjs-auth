"use server"

import { RegisterSchema } from "@/schemas";
import * as z from "zod";

interface LoginResponse {
  success?: string;
  error?: string;
}

export const register = async (values:z.infer<typeof RegisterSchema>): Promise<LoginResponse> => {
  const validatedFields = RegisterSchema.safeParse(values)
  if(!validatedFields.success) {
    return {error: "Invalid fields!"}
  }
  return {success: "Email sent!"}
}
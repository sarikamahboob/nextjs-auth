"use server"

import { LoginSchema } from "@/schemas";
import * as z from "zod";

interface LoginResponse {
  success?: string;
  error?: string;
}

export const login = async (values:z.infer<typeof LoginSchema>): Promise<LoginResponse> => {
  const validatedFields = LoginSchema.safeParse(values)
  if(!validatedFields.success) {
    return {error: "Invalid fields!"}
  }
  return {success: "Email sent!"}
}
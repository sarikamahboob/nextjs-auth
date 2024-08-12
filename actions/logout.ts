"use server"

import { signOut } from "@/auth"

export const logout = async () => {
  // if someone want to do some server stuffs
  await signOut()
}
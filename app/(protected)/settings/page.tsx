"use client"

import { logout } from "@/actions/logout"
import { Button } from "@/components/ui/button"
import { useCurrentUser } from "@/hooks/use-current-user"
import { signOut, useSession } from "next-auth/react"
import { useEffect, useState } from "react"

const SettingsPage =  () => {
  const user = useCurrentUser()
  // const session = useSession()

  const onClick = () => signOut()
  // const onClick = () => logout()

  return (
    <div className="bg-white p-10 rounded-xl">
      <form>
        <Button onClick={onClick} type="submit">
          Sign Out
        </Button>
      </form>
    </div>
  )
}

export default SettingsPage
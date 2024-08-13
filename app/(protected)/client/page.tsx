"use client"

import { UserInfo } from '@/components/user-info'
import { useCurrentUser } from '@/hooks/use-current-user'
import { currentUser } from '@/lib/auth'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

const ClientPage =  () => {
  const user = useCurrentUser()

  return (
    <UserInfo 
      label='💻 Client Component'
      user={user}
    />
  )
}

export default ClientPage
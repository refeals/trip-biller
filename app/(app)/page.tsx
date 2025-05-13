"use client"

import { useCurrentUser } from "@/store/useCurrentUser"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Home() {
  const { currentUser } = useCurrentUser()
  const router = useRouter()

  useEffect(() => {
    if (currentUser) {
      router.replace("/groups")
    } else {
      router.replace("/login")
    }
  }, [currentUser, router])

  return null
}

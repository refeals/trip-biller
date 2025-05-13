"use client"

import { useCurrentUserStore } from "@/store/currentUser"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Home() {
  const { currentUser } = useCurrentUserStore()
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

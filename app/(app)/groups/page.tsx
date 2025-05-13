"use client"

import { db } from "@/db"
import { Card } from "@/components/ui/card"
import { useCurrentUserStore } from "@/store/currentUser"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Groups() {
  const { currentUser } = useCurrentUserStore()
  const router = useRouter()

  const groups = db.groups.filter((group) =>
    group.memberIds.includes(currentUser ? currentUser.id : "")
  )

  useEffect(() => {
    if (!currentUser) {
      router.replace("/login")
    }
  }, [currentUser, router])

  return (
    <div className="grid grid-cols-1 gap-4">
      <h2 className="text-2xl">Grupos</h2>
      {groups.length === 0 && <p>No groups found</p>}
      {groups.map((group) => (
        <Link key={group.id} href={`/groups/${group.id}`}>
          <Card>{group.name}</Card>
        </Link>
      ))}
    </div>
  )
}

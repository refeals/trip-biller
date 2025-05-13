"use client"

import { Button } from "@/components/ui/button"
import { db } from "@/db"
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

      <div className="flex flex-col items-center gap-3">
        {groups.map((group) => (
          <Button key={group.id} asChild className="w-fit">
            <Link href={`/groups/${group.id}`}>{group.name}</Link>
          </Button>
        ))}
      </div>
    </div>
  )
}

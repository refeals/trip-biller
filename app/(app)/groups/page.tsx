"use client"

import { CreateGroupDialog } from "@/app/(app)/groups/_components/CreateGroupDialog"
import { Button } from "@/components/ui/button"
import { useCurrentUser } from "@/store/useCurrentUser"
import { useDb } from "@/store/useDb"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Groups() {
  const { currentUser } = useCurrentUser()
  const router = useRouter()
  const { groups: dbGroups } = useDb()
  const [dialogOpen, setDialogOpen] = useState(false)

  const groups = dbGroups.filter((group) =>
    group.memberIds.includes(currentUser ? currentUser.id : "")
  )

  useEffect(() => {
    if (!currentUser) {
      router.replace("/login")
    }
  }, [currentUser, router])

  return (
    <div className="grid grid-cols-1 gap-4 relative">
      <h2 className="text-2xl">Grupos</h2>

      <CreateGroupDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <Button className="absolute top-4 right-4" asChild>
          <div>Novo grupo</div>
        </Button>
      </CreateGroupDialog>

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

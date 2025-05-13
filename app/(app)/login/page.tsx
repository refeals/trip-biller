"use client"

import { db } from "@/app/db"
import { Button } from "@/components/ui/button"
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useCurrentUserStore } from "@/store/currentUser"
import { useRouter } from "next/navigation"

export default function Login() {
  const router = useRouter()
  const { setUser } = useCurrentUserStore()

  const handleLogin = (id: string) => {
    setUser(id)
    router.replace("/groups")
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {db.users.map((user) => (
        <Card key={user.id}>
          <CardHeader>
            <CardTitle>{user.username}</CardTitle>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => handleLogin(user.id)}>
              Login with {user.username}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

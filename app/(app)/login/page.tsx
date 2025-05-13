"use client"

import { Button } from "@/components/ui/button"
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useCurrentUser } from "@/store/useCurrentUser"
import { useDb } from "@/store/useDb"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Login() {
  const router = useRouter()
  const { currentUser, setUser } = useCurrentUser()
  const { users } = useDb()

  const handleLogin = (id: string) => {
    setUser(id)
    router.replace("/groups")
  }

  useEffect(() => {
    if (currentUser) {
      router.replace("/groups")
    }
  }, [currentUser, router])

  return (
    <div className="grid grid-cols-5 gap-4">
      {users.map((user) => (
        <Card key={user.id}>
          <CardHeader>
            <CardTitle>{user.username}</CardTitle>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <Button onClick={() => handleLogin(user.id)}>
              Login with {user.username}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

"use client"

import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { useCurrentUser } from "@/store/useCurrentUser"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { currentUser, clearUser } = useCurrentUser()

  const handleClearUser = () => {
    clearUser()
    router.replace("/login")
  }

  return (
    <main className="h-full flex flex-col">
      <header className="border-b py-4 px-8 flex justify-between items-center">
        <span className="font-bold">
          <Link href="/">Trip Biller</Link>
        </span>

        <p>Current user: {currentUser?.username}</p>

        <div className="flex gap-2 items-center">
          <ModeToggle />
          {currentUser && <Button onClick={handleClearUser}>Logout</Button>}
        </div>
      </header>
      <section className="p-8 flex-1 text-center space-y-8">{children}</section>
    </main>
  )
}

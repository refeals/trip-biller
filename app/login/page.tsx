import { LoginForm } from "@/app/login/_components/LoginForm"
import { cookies } from "next/headers"

export default async function LoginPage() {
  const c = await cookies()
  console.log(c.get("userId"))

  return (
    <>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </div>
    </>
  )
}

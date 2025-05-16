// "use server"

// import { PrismaClient } from "@/generated/prisma"
// import { cookies } from "next/headers"

// const prisma = new PrismaClient()

// export const login = async (formData: FormData) => {
//   const c = await cookies()
//   const email = formData.get("email") as string

//   const user = await prisma.user.findUnique({
//     where: {
//       email,
//     },
//   })

//   if (user) {
//     c.set({
//       name: "userId",
//       value: user.id,
//     })

//     return { success: true, user }
//   }

//   const newUser = await prisma.user.create({
//     data: {
//       email,
//       name: email.split("@")[0],
//     },
//   })

//   c.set({
//     name: "userId",
//     value: newUser.id,
//   })

//   return { success: true, user: newUser }
// }

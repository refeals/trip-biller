import { initialDb } from "@/db"
import { Group, Transaction, User } from "@/db/types"
import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"

type DbStore = {
  users: User[]
  groups: Group[]
  transactions: Transaction[]
  getUserFromId: (id: string) => User
  getUsersFromList: (ids: string[]) => User[]
}

export const useDb = create<DbStore>()(
  devtools(
    persist(
      (set, get) => ({
        users: initialDb.users,
        groups: initialDb.groups,
        transactions: initialDb.transactions,
        getUserFromId: (id) => get().users.find((user) => user.id === id)!,
        getUsersFromList: (ids) =>
          get().users.filter((user) => ids.includes(user.id)),
      }),
      {
        name: "database",
      }
    ),
    {
      enabled: process.env.NODE_ENV === "development",
    }
  )
)

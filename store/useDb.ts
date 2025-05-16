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
  addTransaction: (transaction: Omit<Transaction, "id">) => void
  addGroup: (name: Group["name"], userId: User["id"]) => void
  addMemberToGroup: (groupId: Group["id"], username: User["username"]) => void
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
        addTransaction: (transaction) =>
          set({
            transactions: [
              ...get().transactions,
              { id: crypto.randomUUID(), ...transaction },
            ],
          }),
        addGroup: (name, userId) =>
          set({
            groups: [
              ...get().groups,
              {
                id: crypto.randomUUID(),
                name,
                memberIds: [userId],
                creatorId: userId,
              },
            ],
          }),
        addMemberToGroup: (groupId, username) => {
          const user = get().users.find((user) => user.username === username)

          if (!user) {
            return
          }

          set({
            groups: get().groups.map((group) => {
              if (group.id === groupId) {
                return {
                  ...group,
                  memberIds: [...group.memberIds, user.id],
                }
              }
              return group
            }),
          })
        },
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

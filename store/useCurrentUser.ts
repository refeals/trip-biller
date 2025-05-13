import { User } from "@/db/types"
import { useDb } from "@/store/useDb"
import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"

type CurrentUserState = {
  currentUser: User | null
  setUser: (id: string) => void
  clearUser: () => void
}

export const useCurrentUser = create<CurrentUserState>()(
  devtools(
    persist(
      (set) => ({
        currentUser: null,
        setUser: (id: string) =>
          set({ currentUser: useDb.getState().getUserFromId(id) }),
        clearUser: () => set({ currentUser: null }),
      }),
      {
        name: "current-user",
      }
    ),
    {
      enabled: process.env.NODE_ENV === "development",
    }
  )
)

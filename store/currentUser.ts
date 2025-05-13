import { getUserFromId } from "@/db/helpers"
import { User } from "@/db/types"
import { create } from "zustand"

interface CurrentUserState {
  currentUser: User | null
  setUser: (id: string) => void
  clearUser: () => void
}

export const useCurrentUserStore = create<CurrentUserState>((set) => ({
  currentUser: null,
  setUser: (id) => set({ currentUser: getUserFromId(id) }),
  clearUser: () => set({ currentUser: null }),
}))

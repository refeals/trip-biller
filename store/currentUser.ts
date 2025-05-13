import { getUserFromId, type User } from "@/app/db"
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

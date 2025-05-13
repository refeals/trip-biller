export type User = {
  id: string
  username: string
}

export type Group = {
  id: string
  name: string
  memberIds: string[]
  creatorId: string
}

export type Transaction = {
  id: string
  groupId: string
  amount: number
  payerId: string
  payeeId: string
  description: string
}

export type DB = {
  users: User[]
  groups: Group[]
  transactions: Transaction[]
}

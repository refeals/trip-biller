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

type SimplifiedTransfer = {
  from: string
  to: string
  amount: number
}

export const db: DB = {
  users: [
    {
      id: "1",
      username: "johndoe",
    },
    {
      id: "2",
      username: "janedoe",
    },
    {
      id: "3",
      username: "bobsmith",
    },
  ],
  groups: [
    {
      id: "1",
      name: "Viagem de férias",
      memberIds: ["1", "2"],
      creatorId: "1",
    },
    {
      id: "2",
      name: "Grupo de amigos",
      memberIds: ["1"],
      creatorId: "1",
    },
  ],
  transactions: [
    {
      id: "1",
      groupId: "1",
      amount: 100,
      payerId: "1",
      payeeId: "2",
      description: "Split the bill",
    },
    {
      id: "2",
      groupId: "1",
      amount: 50,
      payerId: "2",
      payeeId: "1",
      description: "Split the bill",
    },
    {
      id: "3",
      groupId: "2",
      amount: 200,
      payerId: "1",
      payeeId: "3",
      description: "Split the bill",
    },
  ],
}

export function getUserFromId(id: string): User {
  return db.users.find((user) => user.id === id)!
}

export function getUsersFromList(ids: string[]): User[] {
  return db.users.filter((user) => ids.includes(user.id))
}

export function simplifyExpenses(
  transactions: Transaction[],
  group: Group
): SimplifiedTransfer[] {
  const balances: Record<string, number> = {}

  // Inicializa saldos zerados
  for (const userId of group.memberIds) {
    balances[userId] = 0
  }

  // Soma o quanto cada pessoa pagou e deve
  for (const tx of transactions) {
    if (!balances[tx.payerId]) balances[tx.payerId] = 0
    if (!balances[tx.payeeId]) balances[tx.payeeId] = 0

    balances[tx.payerId] += tx.amount
    balances[tx.payeeId] -= tx.amount
  }

  // Separa devedores e credores
  const creditors: { id: string; amount: number }[] = []
  const debtors: { id: string; amount: number }[] = []

  for (const [userId, amount] of Object.entries(balances)) {
    if (amount > 0) {
      creditors.push({ id: userId, amount })
    } else if (amount < 0) {
      debtors.push({ id: userId, amount: -amount })
    }
  }

  // Ordena por maior valor
  creditors.sort((a, b) => b.amount - a.amount)
  debtors.sort((a, b) => b.amount - a.amount)

  const result: SimplifiedTransfer[] = []

  // Algoritmo guloso
  while (creditors.length && debtors.length) {
    const creditor = creditors[0]
    const debtor = debtors[0]

    const transferAmount = Math.min(creditor.amount, debtor.amount)

    result.push({
      from: getUserFromId(debtor.id).username,
      to: getUserFromId(creditor.id).username,
      amount: transferAmount,
    })

    creditor.amount -= transferAmount
    debtor.amount -= transferAmount

    if (creditor.amount === 0) creditors.shift()
    if (debtor.amount === 0) debtors.shift()
  }

  return result
}

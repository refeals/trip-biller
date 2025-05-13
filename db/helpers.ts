import type { Group, Transaction } from "@/db/types"

type SimplifiedTransfer = {
  from: string
  to: string
  amount: number
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
      from: debtor.id,
      to: creditor.id,
      amount: transferAmount,
    })

    creditor.amount -= transferAmount
    debtor.amount -= transferAmount

    if (creditor.amount === 0) creditors.shift()
    if (debtor.amount === 0) debtors.shift()
  }

  return result
}

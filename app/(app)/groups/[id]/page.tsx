"use client"

import { AddTransactionDialog } from "@/app/(app)/groups/[id]/_components/AddTransactionDialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { simplifyExpenses } from "@/db/helpers"
import { useDb } from "@/store/useDb"
import { useParams, useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Group() {
  const router = useRouter()
  const params = useParams()
  const {
    groups: dbGroups,
    transactions: dbTransactions,
    getUserFromId,
    getUsersFromList,
  } = useDb()
  const group = dbGroups.find((group) => group.id === params.id)

  useEffect(() => {
    if (!group) {
      router.replace("/groups")
    }
  })

  if (!group) {
    return null
  }

  const members = getUsersFromList(group.memberIds)
  const transactions = dbTransactions.filter(
    (transaction) => transaction.groupId === group.id
  )

  const simplifiedExpenses = simplifyExpenses(transactions, group)

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">{group.name}</h2>

      <div className="flex gap-4">
        <div className="flex-1 space-y-4">
          <Card>
            <CardContent className="space-y-2">
              <h3 className="font-semibold text-xl">Membros</h3>
              <ul>
                {members.map((member) => (
                  <li key={member.id}>{member.username}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-2">
              <h3 className="font-semibold text-xl">Despesas Simplificadas</h3>
              <ul>
                {simplifiedExpenses.map((expense, i) => (
                  <li key={i}>
                    <span className="font-bold">{expense.from}</span> deve{" "}
                    <span className="font-bold">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(expense.amount)}
                    </span>{" "}
                    para <span className="font-bold">{expense.to}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="flex-[2] h-fit">
          <CardContent className="space-y-2">
            <h3 className="font-semibold text-xl">Transações</h3>

            <ul>
              {transactions.map((transaction) => (
                <li key={transaction.id}>
                  <span className="font-bold">
                    {getUserFromId(transaction.payerId).username}
                  </span>{" "}
                  pagou{" "}
                  <span className="font-bold">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(transaction.amount)}
                  </span>{" "}
                  para{" "}
                  <span className="font-bold">
                    {getUserFromId(transaction.payeeId).username}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <AddTransactionDialog>
          <Button className="fixed bottom-4 right-4" asChild>
            <div>Adicionar transação</div>
          </Button>
        </AddTransactionDialog>
      </div>
    </div>
  )
}

"use client"

import { db, getUserFromId, getUsersFromList, simplifyExpenses } from "@/app/db"
import { useParams, useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Group() {
  const router = useRouter()
  const params = useParams()
  const group = db.groups.find((group) => group.id === params.id)

  useEffect(() => {
    if (!group) {
      router.replace("/groups")
    }
  })

  if (!group) {
    return null
  }

  const members = getUsersFromList(group.memberIds)
  const transactions = db.transactions.filter(
    (transaction) => transaction.groupId === group.id
  )

  const simplifiedExpenses = simplifyExpenses(transactions, group)

  return (
    <div className="space-y-4">
      <h2 className="text-2xl">Grupo: {group.name}</h2>

      <div className="flex">
        <div className="flex-1 space-y-4">
          <div>
            <h3>Membros</h3>
            <ul>
              {members.map((member) => (
                <li key={member.id}>{member.username}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3>Despesas Simplificadas</h3>
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
          </div>
        </div>

        <div className="flex-[2] space-y-4">
          <h3>Transações</h3>

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
        </div>
      </div>
    </div>
  )
}

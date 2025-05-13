import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useDb } from "@/store/useDb"
import { useParams } from "next/navigation"

export function AddTransactionDialog({
  children,
}: {
  children: React.ReactNode
}) {
  const { groups, getUsersFromList } = useDb()
  const params = useParams()

  const group = groups.find((group) => group.id === params.id)
  const members = getUsersFromList(group!.memberIds)

  console.log(members)

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader className="space-y-3">
          <DialogTitle>Adicionar transação</DialogTitle>
          <DialogDescription className="space-y-2">
            <div className="grid grid-cols-3 gap-4">
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Quem pagou" />
                </SelectTrigger>
                <SelectContent>
                  {members.map((member) => (
                    <SelectItem key={member.id} value={member.id}>
                      {member.username}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Quem recebeu" />
                </SelectTrigger>
                <SelectContent>
                  {members.map((member) => (
                    <SelectItem key={member.id} value={member.id}>
                      {member.username}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Input placeholder="Valor em centavos (R$)" />
            </div>

            <Input placeholder="Descrição" />

            <div className="mt-4 flex justify-end">
              <Button>Salvar</Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

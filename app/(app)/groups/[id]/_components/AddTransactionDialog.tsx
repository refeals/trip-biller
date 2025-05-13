"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useDb } from "@/store/useDb"
import { zodResolver } from "@hookform/resolvers/zod"
import { useParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  payerId: z.string(),
  payeeId: z.string(),
  amount: z.coerce.number(),
  description: z.string(),
})

export function AddTransactionDialog({
  children,
  open,
  onOpenChange,
}: {
  children: React.ReactNode
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const { groups, getUsersFromList, addTransaction } = useDb()
  const params = useParams()

  const group = groups.find((group) => group.id === params.id)
  const members = getUsersFromList(group!.memberIds)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      payerId: "",
      payeeId: "",
      amount: 0,
      description: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    addTransaction({
      id: crypto.randomUUID(),
      groupId: group!.id,
      payerId: values.payerId,
      payeeId: values.payeeId,
      amount: values.amount,
      description: values.description,
    })
    form.reset()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader className="space-y-3">
          <DialogTitle>Adicionar transação</DialogTitle>
          <DialogDescription className="space-y-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="grid grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="payerId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quem pagou</FormLabel>
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {members.map((member) => (
                                <SelectItem key={member.id} value={member.id}>
                                  {member.username}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="payeeId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quem recebeu</FormLabel>
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {members.map((member) => (
                                <SelectItem key={member.id} value={member.id}>
                                  {member.username}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Valor</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Valor em centavos (R$)"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descrição</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="mt-4 flex justify-end">
                  <Button type="submit">Salvar</Button>
                </div>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

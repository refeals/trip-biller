import { ModeToggle } from "@/components/mode-toggle"

export default function Home() {
  return (
    <main className="h-full flex flex-col">
      <header className="border-b py-4 px-8 flex justify-between items-center">
        <h1 className="font-bold">Trip Biller</h1>
        <ModeToggle />
      </header>
      <section className="p-8 flex-1">Home</section>
    </main>
  )
}

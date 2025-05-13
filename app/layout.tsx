import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Trip Biller",
  description: "Share your trip bills with your friends",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <html lang="pt-BR" suppressHydrationWarning>
        <body className="min-h-[100svh] grid">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}

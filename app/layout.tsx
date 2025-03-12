import type React from "react"
import type { Metadata } from "next"
import { GeistSans, GeistMono } from 'geist/font'
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@vercel/analytics/react"
// Configura las fuentes Geist
// No necesitamos Inter si vamos a usar GeistSans como fuente principal

export const metadata: Metadata = {
  title: "Alpenmode - Moda Suiza Exclusiva",
  description: "Tu destino para moda suiza exclusiva y de calidad",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html 
      lang="en" 
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className={GeistSans.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
 
        </ThemeProvider>
        <Analytics/>
      </body>
    </html>
  )
}


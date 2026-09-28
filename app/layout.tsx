import { Geist_Mono, Inter } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import TestComponent from "@/components/layout/testComponent"
import { cn } from "@/lib/utils";
import Header from "@/components/layout/guest/Header";

const inter = Inter({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", inter.variable)}
    >
      <body>
        <ThemeProvider><Header></Header>
          {children}</ThemeProvider>
        <TestComponent nama="budi" age={20} />
      </body>
    </html>
  )
}

import type { Metadata } from "next"
import { League_Spartan } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"

const spartan = League_Spartan({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://invoice-tracker.adamrichardturner.dev"),
  title: "Invoice Tracker | Adam Richard Turner",
  description: "Invoice Tracking app built with Next & Express",
  openGraph: {
    title: "Invoice Tracker | Adam Richard Turner",
    description: "Invoice Tracking app built with Next & Express",
    images: [
      {
        url: `https://invoice-tracker.adamrichardturner.dev/opengraph-image.png`,
        secureUrl: `https://invoice-tracker.adamrichardturner.dev/opengraph-image.png`,
        width: 2400,
        height: 1200,
        alt: `Preview image for Invoice Tracker by Adam Richard Turner`,
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={spartan.className}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}

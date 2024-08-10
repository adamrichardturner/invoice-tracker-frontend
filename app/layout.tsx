import type { Metadata } from "next";
import { League_Spartan } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const spartan = League_Spartan({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL ||
  "https://invoice-tracker.adamrichardturner.dev";

export const metadata: Metadata = {
  title: "Invoice Tracker | Adam Richard Turner",
  description: "Invoice Tracking app built with Next & Express",
  openGraph: {
    title: "Invoice Tracker | Adam Richard Turner",
    description: "Invoice Tracking app built with Next & Express",
    url: `${baseUrl}`,
    siteName: "Invoice Tracker",
    images: [
      {
        url: `${baseUrl}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: `Preview image for Invoice Tracker by Adam Richard Turner`,
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Invoice Tracker | Adam Richard Turner",
    description: "Invoice Tracking app built with Next & Express",
    images: [
      {
        url: `${baseUrl}/opengraph-image.png`,
        alt: `Preview image for Invoice Tracker by Adam Richard Turner`,
      },
    ],
    creator: "@devadam88",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={spartan.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}

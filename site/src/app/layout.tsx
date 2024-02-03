import { ThemeProvider } from "@/components/Theme";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import Script from "next/script";
import { z } from "zod";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const schema = z.object({
  ANALYTICS_ID: z.string(),
  ANALYTICS_SCRIPT_URL: z.string(),
  ANALYTICS_DOMAINS: z.string().optional(),
});
const env = schema.parse(process.env);

export const metadata: Metadata = {
  title: "CS471 Project",
  description:
    "A project to demonstrate the principles of Software Engineering",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src={env.ANALYTICS_SCRIPT_URL}
          data-website-id={env.ANALYTICS_ID}
          data-domains={env.ANALYTICS_DOMAINS}
        />
      </head>
      <ThemeProvider>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable,
          )}
        >
          {children}
        </body>
      </ThemeProvider>
    </html>
  );
}

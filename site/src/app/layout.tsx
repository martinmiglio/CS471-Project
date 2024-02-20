import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import GlobalProvider from "@/components/providers/GlobalProvider";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Gabarito as FontSans } from "next/font/google";
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
  title: "Biddr.pro",
  description: "Bid More. Be Happy. Biddr.pro",
  metadataBase: new URL("https://biddr.pro"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans antialiased", fontSans.variable)}>
      <head>
        <Script
          async
          src={env.ANALYTICS_SCRIPT_URL}
          data-website-id={env.ANALYTICS_ID}
          data-domains={env.ANALYTICS_DOMAINS}
        />
      </head>
      <GlobalProvider>
        <body className="min-h-screen bg-background">
          <div className="mx-auto flex w-11/12 max-w-screen-md flex-col">
            <div className="flex min-h-screen flex-col">
              <NavBar />
              {children}
            </div>
            <Footer />
          </div>
        </body>
      </GlobalProvider>
    </html>
  );
}

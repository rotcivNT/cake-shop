import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import DefaultLayout from "@/layouts/DefaultLayout";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NGOCTHANG BAKERY - Bánh ngọt",
  description: "Shop bán bánh ngọt online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <DefaultLayout>{children}</DefaultLayout>
        </body>
      </html>
    </ClerkProvider>
  );
}

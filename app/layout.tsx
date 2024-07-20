import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import DefaultLayout from "@/layouts/DefaultLayout";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://tcake.vercel.app"),
  title: {
    default: "TCAKE | Bánh Ngọt Tươi Ngon Giao Tận Nơi",
    template: "%s - TCAKE | Bánh Ngọt Tươi Ngon Giao Tận Nơi",
  },
  description:
    "TCAKE - Tiệm bánh ngọt online hàng đầu với đa dạng bánh tươi ngon, từ bánh sinh nhật đến bánh ăn vặt. Đặt hàng dễ dàng, giao nhanh 2h, món nào cũng ngon. Khám phá hương vị tuyệt hảo ngay!",
  openGraph: {
    images: "./opengraph-image.png",
  },
  twitter: {
    card: "summary_large_image",
  },
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
          <Analytics />
        </body>
        <Toaster />
      </html>
    </ClerkProvider>
  );
}

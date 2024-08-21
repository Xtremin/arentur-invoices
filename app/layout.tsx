import type { Metadata } from "next";
import Inter from "next/font/local";
import "./globals.css";
import { ThemeModeScript } from "flowbite-react";
import next from "next";
import path from "path";

const inter = Inter({
  src: [
    { path: "./Inter-VariableFont_opsz,wght.ttf", style: "normal" },
    { path: "./Inter-Italic-VariableFont_opsz,wght.ttf", style: "italic" },
  ],
});

export const metadata: Metadata = {
  title: "Arentur Invoices",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeModeScript />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}

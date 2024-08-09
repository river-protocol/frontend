import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";
import AppProvider from "@/context";


const kanit = Kanit({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] });

export const metadata: Metadata = {
  title: "River Protocol",
  description: "A Grants Distribution Platform Built for the OP Ecosystem",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={kanit.className + " dark"}>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}

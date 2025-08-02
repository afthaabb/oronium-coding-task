import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/lib/queryProvider";
import { SearchProvider } from "@/contexts/SearchContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Beyond UI | A Modern Blog",
  description: "A modern blog application built with Next.js, Tailwind CSS, and Server-Side Rendering.",
  keywords: ["blog", "Next.js", "Tailwind CSS", "SSR", "React"],
  authors: [{ name: "Your Name" }],
  creator: "Your Name",
  publisher: "Your Name",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-zinc-900`}>
        <QueryProvider>
          <SearchProvider>
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 bg-white text-black">
              {children}
            </main>
          </SearchProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
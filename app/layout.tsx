import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Recipe Haven",
  description:
    "Your go-to kitchen companion for discovering, cooking, and savoring delicious meals effortlessly",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/favicon.ico" sizes="any" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${inter.className} antialiased bg-backgroundColor h-screen`}
      >
        <div className="flex h-full">
          <div className="flex-[2] bg-white h-full overflow-hidden">
            <Navbar />
          </div>
          <div className="flex-[10] h-full overflow-y-auto">{children}</div>
        </div>
      </body>
    </html>
  );
}

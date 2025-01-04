"use client";

import { useState, useEffect } from "react";
import { SessionProvider, useSession } from "next-auth/react";
import Link from "next/link";
import { Inter, Lobster } from "next/font/google";
import { FaBars } from "react-icons/fa";

import Navbar from "@/components/Navbar";
import Loading from "@/components/Loading";
import CustomToastContainer from "@/components/CustomToastContainer";
import WelcomePopup from "@/components/HomeContent/WelcomePopup";
import { FavoritesProvider } from "@/contexts/FavoritesContext";

import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

const lobsterFont = Lobster({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-lobster",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

function SessionWrapper({ children }: { children: React.ReactNode }) {
  const { status } = useSession();

  if (status === "loading") {
    return <Loading />;
  }

  return <>{children}</>;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/favicon.ico" sizes="any" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${inter.className} antialiased bg-backgroundColor min-h-screen lg:h-screen`}
      >
        <SessionProvider>
          <FavoritesProvider>
            {/* Toast Notifications */}
            <CustomToastContainer />
            <SessionWrapper>
              <div className="flex flex-col lg:flex-row lg:h-full">
                {/* Navbar */}
                <div
                  className={`fixed lg:relative z-50 bg-white h-dvh lg:h-full w-64 transform  ${
                    isMenuOpen ? "translate-x-0" : "-translate-x-full"
                  } lg:translate-x-0 transition-transform duration-300 overflow-y-auto`}
                >
                  <Navbar setIsMenuOpen={setIsMenuOpen} />
                </div>

                {/* Overlay for small screens */}
                {isMenuOpen && (
                  <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setIsMenuOpen(false)}
                  ></div>
                )}

                {/* Main Content */}
                <div className={`flex-1 flex flex-col relative`}>
                  {/* Menu Button for smaller screens */}
                  <div className="sticky top-0 flex items-center justify-between p-4 lg:hidden bg-white shadow-md z-30 overflow-auto">
                    <button
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                      className="text-primaryColor text-xl"
                    >
                      <FaBars />
                    </button>
                    <Link
                      href="/"
                      className={`text-2xl font-bold text-primaryColor tracking-wide ${lobsterFont.className}`}
                    >
                      {isMenuOpen ? "" : "Recipe Haven"}
                    </Link>
                  </div>
                  <div
                    className={`${
                      isMenuOpen ? "overflow-hidden" : "lg:overflow-auto"
                    } `}
                  >
                    <WelcomePopup />
                    <div className="flex-1 min-h-screen">{children}</div>
                  </div>
                </div>
              </div>
            </SessionWrapper>
          </FavoritesProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

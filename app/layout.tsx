"use client";

import { useState, useEffect } from "react";
import { SessionProvider, useSession } from "next-auth/react";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import { Inter, Lobster } from "next/font/google";
import { FaBars } from "react-icons/fa";

import Navbar from "@/components/Navbar";
import Loading from "@/components/Loading";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import { showErrorToast } from "@/utils/toastHelpers";
import CustomToastContainer from "@/components/CustomToastContainer";
import WelcomePopup from "@/components/HomeContent/WelcomePopup";

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
        className={`${inter.className} antialiased bg-backgroundColor h-screen`}
      >
        <SessionProvider>
          {/* Toast Notifications */}
          <CustomToastContainer />

          <SessionWrapper>
            <div className="flex flex-col lg:flex-row h-full">
              {/* Navbar */}
              <div
                className={`fixed lg:relative z-50 bg-white h-screen lg:h-full w-64 transform  ${
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
              <div
                className={`flex-1 flex flex-col ${
                  isMenuOpen ? "overflow-hidden" : "overflow-auto"
                }`}
              >
                {/* Menu Button for smaller screens */}
                <div className="flex items-center justify-between p-4 lg:hidden bg-white shadow-md sticky top-0 z-30">
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
                    Recipe Haven
                  </Link>
                </div>
                <WelcomePopup />
                <div className="flex-1">{children}</div>
              </div>
            </div>
          </SessionWrapper>
        </SessionProvider>
      </body>
    </html>
  );
}

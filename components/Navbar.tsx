"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  FaUtensils,
  FaHeart,
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt,
} from "react-icons/fa";
import { Lobster } from "next/font/google";

const lobsterFont = Lobster({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-lobster",
});

const Navbar = () => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const navItems = [
    { href: "/", icon: <FaUtensils size={20} />, label: "Recipes" },
    { href: "/favorites", icon: <FaHeart size={20} />, label: "Favorites" },
    { href: "/signin", icon: <FaSignInAlt size={20} />, label: "Sign In" },
    { href: "/register", icon: <FaUserPlus size={20} />, label: "Register" },
  ];

  return (
    <nav className="bg-white min-h-full flex flex-col items-center shadow-lg pt-8">
      {/* Logo */}
      <Link
        href="/"
        className={`text-4xl font-bold mb-10 text-primaryColor tracking-wide ${lobsterFont.className}`}
      >
        Recipe Haven
      </Link>

      {/* Buttons */}
      <div className="flex flex-col w-full flex-grow gap-4 px-6 pb-4">
        {navItems.map(({ href, icon, label }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center w-full gap-4 py-3 px-4 rounded-lg font-medium ${
              isActive(href)
                ? "bg-secondaryColorDark text-white"
                : "bg-white text-gray-800 border hover:bg-gray-100"
            }`}
          >
            {icon}
            {label}
          </Link>
        ))}
        <button
          onClick={() => console.log("Sign Out logic goes here")}
          className="flex items-center w-full gap-4 bg-white text-gray-800 border py-3 px-4 rounded-lg font-medium hover:bg-gray-100"
        >
          <FaSignOutAlt size={20} />
          Sign Out
        </button>
      </div>

      {/* Illustration */}
      <div className="w-full px-6 flex-shrink-0">
        <Image
          src="/images/cooking.svg"
          alt="Cooking Illustration"
          width={200}
          height={200}
          className="mx-auto"
        />
      </div>
    </nav>
  );
};

export default Navbar;

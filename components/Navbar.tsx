"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  FaUtensils,
  FaHeart,
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt,
} from "react-icons/fa";
import { Lobster } from "next/font/google";
import NavLink from "./NavLink";
import { showErrorToast, showSuccessToast } from "@/utils/toastHelpers";
import { useFavorites } from "@/contexts/FavoritesContext";

const lobsterFont = Lobster({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-lobster",
});

const Navbar: React.FC<{
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setIsMenuOpen }) => {
  const { clearFavorites } = useFavorites();
  const { data: session } = useSession();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false });
      clearFavorites();
      showSuccessToast("See you soon!");
    } catch (error) {
      showErrorToast("Failed to sign out. Please try again.");
    }
  };

  return (
    <nav className="bg-white min-h-full flex flex-col items-center shadow-lg pt-8">
      {/* Logo */}
      <Link
        href="/"
        className={`text-4xl font-bold mb-10 text-primaryColor tracking-wide ${lobsterFont.className}`}
        onClick={handleLinkClick}
      >
        Recipe Haven
      </Link>

      {/* Navigation Items */}

      <div className="flex flex-col w-full flex-grow gap-4 px-6 pb-4">
        <NavLink
          href="/"
          label="Recipes"
          icon={<FaUtensils size={20} />}
          isActive={isActive("/")}
          onClick={handleLinkClick}
        />
        <NavLink
          href="/favorites"
          label="Favorites"
          icon={<FaHeart size={20} />}
          isActive={isActive("/favorites")}
          onClick={handleLinkClick}
        />
        {session ? (
          <>
            <button
              onClick={handleSignOut}
              className="flex items-center w-full gap-4 bg-white text-gray-800 border py-3 px-4 rounded-lg font-medium hover:bg-gray-100"
            >
              <FaSignOutAlt size={20} />
              Sign Out
            </button>
          </>
        ) : (
          <>
            <NavLink
              href="/signin"
              label="Sign In"
              icon={<FaSignInAlt size={20} />}
              isActive={isActive("/signin")}
              onClick={handleLinkClick}
            />
            <NavLink
              href="/register"
              label="Register"
              icon={<FaUserPlus size={20} />}
              isActive={isActive("/register")}
              onClick={handleLinkClick}
            />
          </>
        )}
      </div>

      {/* Illustration */}
      <div className="w-full px-6 flex-shrink-0">
        <Image
          src="/images/cooking.svg"
          alt="Cooking Illustration"
          width="0"
          height="0"
          sizes="100vw"
          className="w-full h-auto"
        />
      </div>
    </nav>
  );
};

export default Navbar;

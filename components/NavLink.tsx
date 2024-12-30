"use client";

import Link from "next/link";

const NavLink: React.FC<{
  href: string;
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick?: () => void;
}> = ({ href, label, icon, isActive, onClick }) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center w-full gap-4 py-3 px-4 rounded-lg font-medium ${
        isActive
          ? "bg-secondaryColorDark text-white"
          : "bg-white text-gray-800 border hover:bg-gray-100"
      }`}
    >
      {icon}
      {label}
    </Link>
  );
};

export default NavLink;

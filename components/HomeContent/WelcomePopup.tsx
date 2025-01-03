"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

const WelcomePopup = () => {
  const { data: session, update } = useSession();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (session?.user?.isNewUser) {
      setShowPopup(true);
    }
  }, [session]);

  const handleClose = async () => {
    setShowPopup(false);

    try {
      const res = await fetch("/api/user/update-is-new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: session?.user?.id }),
      });

      if (!res.ok) {
        throw new Error("Failed to update user status");
      }

      const data = await res.json();

      // Update the session with new user data
      await update({
        ...session,
        user: {
          ...session?.user,
          isNewUser: data.user.isNewUser,
        },
      });
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="max-w-xs md:max-w-sm bg-white p-6 rounded-lg shadow-lg text-center relative">
        <div className="flex justify-center">
          <Image
            src="/images/welcome.svg"
            alt="Welcome Illustration"
            width={200}
            height={200}
            priority
          />
        </div>
        <h2 className="my-2 text-2xl font-bold">Welcome to Recipe Haven!</h2>
        <p className="text-secondary text-sm font-light mb-4">
          Explore a world of delicious recipes, save your favorites, and access
          them anytime, anywhere.
        </p>
        <button
          onClick={handleClose}
          className="bg-primaryColor text-white py-2 px-4 rounded-lg mb-4 hover:bg-primaryColorLight hover:cursor-pointer"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default WelcomePopup;

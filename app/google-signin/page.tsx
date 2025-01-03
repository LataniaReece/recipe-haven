"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const GoogleSignInPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const signInWithGoogle = async () => {
      if (status === "unauthenticated") {
        await signIn("google");
      }
    };

    if (!session) {
      signInWithGoogle();
    } else {
      // Close the popup and redirect in the parent window
      window.opener?.location.replace("/");
      window.close();
    }
  }, [session, status, router]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "absolute",
        left: 0,
        top: 0,
        background: "white",
      }}
    />
  );
};

export default GoogleSignInPage;

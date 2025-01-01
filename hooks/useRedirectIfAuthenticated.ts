"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { showSuccessToast } from "@/utils/toastHelpers";

const useRedirectIfAuthenticated = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      if (session?.user?.favorites?.length > 0) {
        showSuccessToast("Welcome back!");
        router.push("/favorites");
      } else {
        if (!session?.user?.isNewUser) {
          // Show toast for returning users only since new user will see welcome popup
          showSuccessToast("Welcome back!");
        }
        router.push("/");
      }
    }
  }, [status, router, session]);
};

export default useRedirectIfAuthenticated;

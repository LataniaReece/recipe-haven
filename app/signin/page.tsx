"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { showSuccessToast } from "@/utils/toastHelpers";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.ok) {
        showSuccessToast("You have successfully signed in!");
        router.push("/favorites");
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await signIn("google", { redirect: false });

      if (res?.ok) {
        showSuccessToast("You have signed in successfully with Google!");
        router.push("/favorites");
      } else {
        setError("Failed to sign in with Google. Please try again.");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-backgroundColor px-4 sm:px-6">
      <div className="w-full max-w-md bg-white p-4 sm:p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-primaryColor text-center mb-1">
          Sign In to Recipe Haven
        </h2>
        <p className="text-sm text-slate-400 text-center mb-6">
          Sign in to view your saved favorite recipes or continue exploring.
        </p>
        {error && (
          <div className="text-red-500 text-sm mb-4 text-center">{error}</div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-secondaryColor focus:border-secondaryColor"
              disabled={loading}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-secondaryColor focus:border-secondaryColor"
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            className={`bg-primaryColor text-white py-2 px-4 rounded-lg transition ${
              loading
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-primaryColorLight"
            }`}
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
          <button
            type="button"
            className="flex justify-center items-center border border-googleColor text-textColor py-2 px-4 rounded-lg hover:bg-googleColor transition"
            onClick={handleGoogleSignIn}
            disabled={loading}
          >
            <FcGoogle className="mr-2" size={20} />
            Continue with Google
          </button>
          <p className="text-sm text-gray-600 text-center mt-4">
            Don’t have an account?&nbsp;
            <Link
              href="/register"
              className="text-secondaryColorDarker underline hover:no-underline"
            >
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;

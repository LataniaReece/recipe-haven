"use client";

import { useState } from "react";
// import { signIn } from "next-auth/react";
import Link from "next/link";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Send username and password to your API for registration
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        throw new Error("Failed to register. Please try again.");
      }

      // Automatically sign in after successful registration
      //   await signIn("credentials", { username, password });
    } catch (err) {
      setError(err.message || "Something went wrong.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-backgroundColor">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-primaryColor text-center mb-1">
          Register for Recipe Haven
        </h2>
        <p className="text-sm text-slate-400 italic text-center mb-6">
          Create an account to save your favorite recipes and access them
          anytime!
        </p>
        {error && (
          <div className="text-red-500 text-sm mb-4 text-center">{error}</div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-secondaryColor focus:border-secondaryColor"
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
            />
          </div>
          <button
            type="submit"
            className="bg-primaryColor text-white py-2 px-4 rounded-lg hover:bg-primaryColorLight transition"
          >
            Register
          </button>
          <button
            type="button"
            // onClick={() => signIn("google")}
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
          >
            Continue with Google
          </button>
          <p className="text-sm text-gray-600 text-center mt-4">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="text-secondaryColor hover:underline"
            >
              Sign in here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;

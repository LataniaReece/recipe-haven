"use client";

import { useState } from "react";
// import { signIn } from "next-auth/react";
import Link from "next/link";

const SignInPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // const res = await signIn("credentials", {
    //   username,
    //   password,
    //   redirect: false,
    // });

    // if (!res?.ok) {
    //   setError("Invalid username or password");
    // }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-backgroundColor">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-primaryColor text-center mb-1">
          Sign In to Recipe Haven
        </h2>
        <p className="text-sm text-slate-400 italic text-center mb-6">
          Sign in to view your saved favorite recipes or continue exploring.
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
            Sign In
          </button>
          <button
            type="button"
            // onClick={() => signIn("google")}
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
          >
            Sign In with Google
          </button>
          <p className="text-sm text-gray-600 text-center mt-4">
            Don’t have an account?{" "}
            <Link
              href="/register"
              className="text-secondaryColor hover:underline"
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

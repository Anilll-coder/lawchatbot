"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import React from "react";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "", isLawyer: false });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get error from URL query if redirected back from NextAuth
  const errorFromUrl = searchParams.get("error");

  // Show toast for errorFromUrl once when component mounts
  React.useEffect(() => {
    if (errorFromUrl) {
      toast.error(errorFromUrl);
    }
  }, [errorFromUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
      isLawyer: form.isLawyer ? "true" : "false", 
    });

    if (res.ok) {
      toast.success("Login successful");
      router.push(form.isLawyer ? "/dashboard/lawyer" : "/dashboard");
    } else {
      toast.error("Invalid email or password");
    }

    setLoading(false);
  };



  const handleGoogleLogin = async () => {
    setLoading(true);

    // This will redirect automatically, so no toast needed here
    await signIn("google", { callbackUrl: "/dashboard" });

    setLoading(false);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white text-center">
          Sign in to your account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="name@example.com"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isLawyer"
              checked={form.isLawyer || false}
              onChange={(e) =>
                setForm({ ...form, isLawyer: e.target.checked })
              }
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <label
              htmlFor="isLawyer"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Sign in as Lawyer
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="my-6 flex items-center justify-center space-x-3">
          <span className="border-t border-gray-300 flex-grow dark:border-gray-600"></span>
          <span className="text-gray-500 dark:text-gray-400">or</span>
          <span className="border-t border-gray-300 flex-grow dark:border-gray-600"></span>
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full py-2 rounded-md bg-red-600 text-white font-semibold hover:bg-red-700 transition disabled:opacity-60 flex items-center justify-center space-x-2"
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            focusable="false"
            data-prefix="fab"
            data-icon="google"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 488 512"
            fill="currentColor"
          >
            <path d="M488 261.8c0-17.8-1.5-35-4.3-51.8H249v98.1h134.9c-5.8 31.3-23.4 57.8-50.1 75.8l81 62.8c47.3-43.7 74.2-107.7 74.2-184.9z" />
            <path d="M249 492c67.7 0 124.7-22.4 166.3-60.8l-81-62.8c-22.5 15.2-51.4 24.2-85.3 24.2-65.5 0-121-44.3-141-103.8H22v65.4c41.7 82.4 127.3 137.8 227 137.8z" />
            <path d="M108 299.6c-9.8-29.5-9.8-61.6 0-91.1V143H22c-41.8 82.6-41.8 181.4 0 264l86-65.4z" />
            <path d="M249 97.9c35.7-.5 69.8 13.6 95.7 39.1l71.7-71.7C371 24.3 312.2 0 249 0 149.3 0 63.6 55.4 22 137.8l86 65.4c20-59.5 75.5-103.9 141-103.8z" />
          </svg>
          <span>Sign in with Google</span>
        </button>

        <p className="mt-6 text-center text-gray-600 dark:text-gray-400 text-sm">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Sign up here
          </a>
        </p>
      </div>
    </section>
  );
}

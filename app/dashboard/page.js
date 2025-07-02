"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const isAdmin = session?.user?.role;
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login"); // redirect if not logged in
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen text-indigo-600 text-xl font-semibold">
        Loading...
      </div>
    );
  }
  if (!session) return <p>Please login to access this page.</p>;


  return (
    <div>
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-indigo-50 to-white px-6 py-12">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="flex items-center justify-center space-x-4 mb-4">
          <h1 className="text-3xl font-bold text-indigo-700">
            Welcome back,{" "}
            <span className="text-indigo-900">
              {isAdmin==="admin"?"Admin":session?.user?.name || session?.user?.email || "User"}
            </span>
            !
          </h1>
        </div>

        <p className="mb-6 text-gray-600">
          You have successfully logged in. Start asking your legal questions or explore your account.
        </p>

        <button
          onClick={() => router.push("/chat-bot")}
          className="mb-4 w-full py-3 rounded-md bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
        >
          Go to Chatbot
        </button>
      </div>
    </div>
    </div>
  );
}

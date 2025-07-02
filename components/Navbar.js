"use client";

import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import toast from "react-hot-toast";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const [loadingLogout, setLoadingLogout] = useState(false);
  const router = useRouter();
  const handleLogout = async () => {
    setLoadingLogout(true);
    await signOut({ redirect: false });
    toast.success("Logged out successfully.");
    setLoadingLogout(false);
    router.push("/");
  };

  const isLawyer = session?.user?.role === "lawyer";
  const isAdmin = session?.user?.role === "admin";

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Image src="/balance.gif" alt="logo" className="w-7" width={20} height={20}/>
          <h1 className="text-2xl font-bold text-gray-900 select-none">LawBot</h1>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8 text-gray-700 font-medium">
          <Link href="/" className="hover:text-blue-600 transition">Home</Link>
          <Link href="/about" className="hover:text-blue-600 transition">About</Link>
          <Link href="/contact" className="hover:text-blue-600 transition">Contact</Link>
           {session ? (
        <>
          <Link href="/chat-bot" className=" hover:text-blue-600 font-medium">
            Chat
          </Link>

          {isLawyer ? (
            <Link href="/dashboard/lawyer" className=" hover:text-blue-600 font-medium">
              Lawyer Dashboard
            </Link>
          ) : (
            <>
            <Link href="/lawyer/contact" className=" hover:text-blue-600 font-medium">
              Contact Lawyer
            </Link>
            {isAdmin?<Link href="/dashboard/admin" className=" hover:text-blue-600 font-medium">
              Admin Dashboard
            </Link> : <></>}
            </>
          )}
          <button
            onClick={handleLogout}
            className="bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200 transition"
          >
            {loadingLogout ? "Logging out..." : "Logout"}
          </button>
        </>
      ) : (
        <Link href="/login">
          <button className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition">
            Login
          </button>
        </Link>
      )}
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex items-center focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-inner">
          <div className="px-6 py-4 space-y-3 flex flex-col text-gray-700 font-medium">
            <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-blue-600">Home</Link>
            <Link href="/about" onClick={() => setIsOpen(false)} className="hover:text-blue-600">About</Link>
            <Link href="/contact" onClick={() => setIsOpen(false)} className="hover:text-blue-600">Contact</Link>
               {session ? (
        <>
          <Link href="/chat-bot"  onClick={() => setIsOpen(false)} className=" hover:text-blue-600 font-medium">
            Chat
          </Link>
         {isLawyer ? (
            <Link href="/dashboard/lawyer" className=" hover:text-blue-600 font-medium">
              Lawyer Dashboard
            </Link>
          ) : (
            <>
            <Link href="/lawyer/contact" className=" hover:text-blue-600 font-medium">
              Contact Lawyer
            </Link>
            {isAdmin?<Link href="/dashboard/admin" className=" hover:text-blue-600 font-medium">
              Admin Dashboard
            </Link> : <></>}
            </>
          )}
          <button
            onClick={handleLogout}
            className="bg-red-100 w-40 text-red-600 px-3 py-1 rounded hover:bg-red-200 transition "
          >
            {loadingLogout ? "Logging out..." : "Logout"}
          </button>
        </>
      ) : (
        <Link href="/login"  onClick={() => setIsOpen(false)}>
          <button className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition">
            Login
          </button>
        </Link>
      )}
          </div>
        </div>
      )}
    </nav>
  );
}

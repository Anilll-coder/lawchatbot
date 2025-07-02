'use client'
import Link from 'next/link'
import { ShieldCheck, Gavel, MessageCircle, Briefcase, ChevronDown } from 'lucide-react'
import { useSession } from 'next-auth/react'

export default function Home() {
  const { data: session } = useSession();
  const role = session?.user?.role;

  return (
    <main className="flex flex-col min-h-screen font-sans text-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-blue-100 py-32 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-gray-900 drop-shadow-lg">
            Your Personal AI Legal Assistant
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-2xl mx-auto">
            Get instant legal help, simplify legal jargon, and solve your queries with our smart AI-powered chatbot.
          </p>

          <Link
            href="/chat-bot"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-10 py-4 rounded-full shadow-xl transition-transform hover:scale-105"
          >
            Start Chatting Now
          </Link>

          {/* Conditional Lawyer Section */}
          {role !== "lawyer" ? (
            <div className="mt-16 bg-white rounded-2xl shadow-xl p-10 max-w-2xl mx-auto text-center border border-blue-200">
              <Briefcase size={40} className="mx-auto mb-4 text-blue-700" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Are you a lawyer?</h3>
              <p className="text-gray-600 mb-6">Join LawBot and connect with users who need real legal advice.</p>
              <Link
                href="/lawyer/signup"
                className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-full shadow transition-transform hover:scale-105"
              >
                Create Lawyer Profile
              </Link>
            </div>
          ) : (
            <div className="mt-16 bg-white rounded-2xl shadow-xl p-10 max-w-2xl mx-auto text-center border border-green-200">
              <Briefcase size={40} className="mx-auto mb-4 text-green-700" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Welcome back, Lawyer!</h3>
              <p className="text-gray-600 mb-6">Manage your profile and connect with clients.</p>
              <Link
                href="/dashboard/lawyer"
                className="inline-block bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-3 rounded-full shadow transition-transform hover:scale-105"
              >
                Go to Dashboard
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-gray-800">Why Use LawBot?</h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="p-8 bg-gray-100 rounded-2xl shadow-md hover:shadow-xl transition-transform hover:-translate-y-2 duration-300">
              <Gavel className="mx-auto mb-4 text-blue-600" size={40} />
              <h4 className="text-xl md:text-2xl font-semibold mb-3">Understand Legal Jargon</h4>
              <p className="text-gray-600">Break down complicated legal terms into simple language anyone can understand.</p>
            </div>
            <div className="p-8 bg-gray-100 rounded-2xl shadow-md hover:shadow-xl transition-transform hover:-translate-y-2 duration-300">
              <ShieldCheck className="mx-auto mb-4 text-blue-600" size={40} />
              <h4 className="text-xl md:text-2xl font-semibold mb-3">Confidential & Secure</h4>
              <p className="text-gray-600">Your privacy is protected. Conversations are encrypted and never stored.</p>
            </div>
            <div className="p-8 bg-gray-100 rounded-2xl shadow-md hover:shadow-xl transition-transform hover:-translate-y-2 duration-300">
              <MessageCircle className="mx-auto mb-4 text-blue-600" size={40} />
              <h4 className="text-xl md:text-2xl font-semibold mb-3">24/7 Instant Help</h4>
              <p className="text-gray-600">Get answers anytime, anywhere. LawBot is always available to help you.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Lawyer CTA Section */}
      {role !== "lawyer" && (
        <section className="py-24 bg-gradient-to-br from-blue-50 to-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
              Need Legal Help from a Real Lawyer?
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              {session
                ? "You're logged in. Connect directly with verified lawyers through our chat feature."
                : "Log in to connect directly with verified lawyers for professional legal support."}
            </p>

            <Link
              href={session ? "/lawyer/contact" : "/login"}
              className={`inline-block ${
                session ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
              } text-white font-semibold px-8 py-4 rounded-full shadow-lg transition-transform hover:scale-105`}
            >
              {session ? "Contact Lawyer Now" : "Login to Contact Lawyer"}
            </Link>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <section className="bg-white py-24">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">Frequently Asked Questions</h2>
          <div className="space-y-8">
            {[
              {
                question: "Is LawBot a replacement for a lawyer?",
                answer: "No. LawBot is an AI tool to help you understand legal terms and get general guidance. For personalized legal advice, please contact a licensed lawyer."
              },
              {
                question: "Is my data secure with LawBot?",
                answer: "Absolutely. All conversations are encrypted and not stored. Your privacy is our top priority."
              },
              {
                question: "Can I contact a real lawyer through LawBot?",
                answer: "Yes! You can connect with verified lawyers through the platform once you log in."
              },
              {
                question: "What areas of law can LawBot help with?",
                answer: "LawBot covers a broad range including family law, contracts, property law, and more."
              }
            ].map((faq, index) => (
              <details key={index} className="group border-b pb-4 cursor-pointer">
                <summary className="flex justify-between items-center text-lg font-medium text-gray-800 group-hover:text-blue-600">
                  {faq.question}
                  <ChevronDown className="group-open:rotate-180 transition-transform duration-300" />
                </summary>
                <p className="mt-2 text-gray-600 text-base leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm">&copy; {new Date().getFullYear()} LawBot. All rights reserved.</p>
          <div className="flex space-x-6 text-sm">
            <Link href="/privacy" className="hover:text-gray-400 transition">Privacy</Link>
            <Link href="/terms" className="hover:text-gray-400 transition">Terms</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

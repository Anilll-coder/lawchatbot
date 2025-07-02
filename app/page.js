import Link from 'next/link'
import { ShieldCheck, Gavel, MessageCircle, Briefcase } from 'lucide-react'

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen font-sans text-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-white to-blue-100 py-32 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-gray-900 drop-shadow-lg">
            Your Personal AI Legal Assistant
          </h2>
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Instantly get legal help, understand complex law terms, and solve your queries with AI-powered support.
          </p>
          <Link href="/chat" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg transition-transform hover:-translate-y-1">
            Start Chatting Now
          </Link>

          {/* Are You a Lawyer Section */}
          <div className="mt-12 bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto text-center border border-blue-200">
            <Briefcase size={40} className="mx-auto mb-4 text-blue-700" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Are you a lawyer?</h3>
            <p className="text-gray-600 mb-4">Join LawBot and connect with users who need real legal advice.</p>
            <Link href="/lawyer/signup" className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition-transform hover:-translate-y-1">
              Create Lawyer Profile
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-16 text-gray-800">Why Use LawBot?</h3>
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {/* Card 1 */}
            <div className="p-8 bg-gray-100 rounded-xl shadow hover:shadow-xl transition-transform hover:-translate-y-2 duration-300">
              <Gavel className="mx-auto mb-4 text-blue-600" size={40} />
              <h4 className="text-xl md:text-2xl font-semibold mb-4">Understand Legal Jargon</h4>
              <p className="text-gray-600 text-base md:text-lg">
                Break down complicated legal terms into simple language anyone can understand.
              </p>
            </div>
            {/* Card 2 */}
            <div className="p-8 bg-gray-100 rounded-xl shadow hover:shadow-xl transition-transform hover:-translate-y-2 duration-300">
              <ShieldCheck className="mx-auto mb-4 text-blue-600" size={40} />
              <h4 className="text-xl md:text-2xl font-semibold mb-4">Confidential & Secure</h4>
              <p className="text-gray-600 text-base md:text-lg">
                Your privacy is protected. Conversations are secure and never stored.
              </p>
            </div>
            {/* Card 3 */}
            <div className="p-8 bg-gray-100 rounded-xl shadow hover:shadow-xl transition-transform hover:-translate-y-2 duration-300">
              <MessageCircle className="mx-auto mb-4 text-blue-600" size={40} />
              <h4 className="text-xl md:text-2xl font-semibold mb-4">24/7 Instant Help</h4>
              <p className="text-gray-600 text-base md:text-lg">
                Get answers anytime, anywhere. LawBot is always available when you need help.
              </p>
            </div>
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
  )
}

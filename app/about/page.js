"use client";

import { Info } from "lucide-react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <main className="max-w-5xl mx-auto mt-20 px-8 py-16 bg-white rounded-2xl shadow-2xl border border-gray-200 font-sans transition-all">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-8">
          <Info className="text-blue-700 w-8 h-8" />
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            About LawBot
          </h1>
        </div>

        <section className="space-y-6 text-gray-700 text-lg leading-relaxed">
          <p>
            <strong>LawBot</strong> is your intelligent, AI-powered legal companion designed to simplify
            the way you interact with the law. Whether you&apos;re a student exploring legal concepts,
            an individual seeking clarity on your rights, or someone navigating contracts and disputes—
            LawBot is here to guide you.
          </p>

          <p>
            Our system leverages cutting-edge natural language processing (NLP) technology to provide
            instant answers to your legal questions, 24/7. LawBot doesn&apos;t just search databases—it
            understands context, simplifies complex language, and responds in a conversational tone.
          </p>

          <p>
            <strong>What Can You Do with LawBot?</strong>
          </p>
          <ul className="list-disc list-inside ml-4 space-y-3">
            <li>
              <span className="font-medium">Chat with the AI Legal Assistant:</span> Ask questions about
              contracts, employment laws, consumer rights, and more.
            </li>
            <li>
              <span className="font-medium">Request Real Lawyer Support:</span> Submit a request to speak
              with a verified lawyer. If your request is accepted, you&apos;ll be able to chat with them directly
              through the platform.
            </li>
            <li>
              <span className="font-medium">Confidential & Secure:</span> Conversations are private, encrypted,
              and never stored—ensuring your information stays safe.
            </li>
            <li>
              <span className="font-medium">Free to Start:</span> Use the AI assistant without any charges.
              Lawyer consultations may require approval and optional fees depending on the lawyer&apos;s discretion.
            </li>
          </ul>

          <p>
            <strong>Why LawBot?</strong> Because legal access shouldn&apos;t be expensive or intimidating. We&apos;re
            building a future where everyone—regardless of background—can get the support they need
            to understand their legal standing and take action confidently.
          </p>
        </section>
      </motion.div>
    </main>
  );
}

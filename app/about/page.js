"use client";

import { Info } from "lucide-react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <main className="max-w-4xl mx-auto mt-20 px-8 py-14 bg-white rounded-2xl shadow-xl border border-gray-300 font-sans transition-all">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <Info className="text-neutral-700 w-8 h-8" />
          <h1 className="text-4xl font-bold text-neutral-800 select-none tracking-tight">
            About LawBot
          </h1>
        </div>

        <section className="space-y-5 text-neutral-700 text-lg leading-relaxed">
          <p>
            <strong>LawBot</strong> is an AI-powered legal assistant created to make legal guidance
            more accessible, accurate, and user-friendly. Whether you&apos;re a student, professional, or
            just curious, LawBot empowers you to get quick, informed answers.
          </p>

          <p>
            Our platform uses advanced natural language processing to provide real-time assistance
            on various legal topics, from contracts and employment laws to privacy regulations.
          </p>

          <p>
            <span className="font-semibold">Why LawBot?</span> Because legal help should be
            accessible to everyone—no jargon, no wait times, just clarity and confidence.
          </p>
        </section>
      </motion.div>
    </main>
  );
}

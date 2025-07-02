"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Here you can handle form submission (e.g., send to email or API)
    setSubmitted(true);
  }

  return (
    <>
    {/* <Navbar/> */}
    <main className="max-w-3xl mx-auto mt-16 px-6 py-12 bg-white rounded-xl shadow-lg border border-gray-200 font-sans">
      <h1 className="text-4xl font-extrabold text-indigo-700 mb-6 select-none">Contact Us</h1>

      {submitted ? (
        <p className="text-green-600 font-semibold text-lg">
          Thank you for reaching out! We will get back to you soon.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              placeholder="Write your message here..."
            />
          </div>

          <button
            type="submit"
            className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-300"
          >
            Send Message
          </button>
        </form>
      )}
    </main>
    </>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [thinking, setThinking] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: input, time: new Date() },
    ]);
    setLoading(true);
    setThinking(true);
    setInput("");

    try {
      const res = await fetch("/api/ask-lawbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessages((prev) => [
          ...prev,
          { sender: "ai", text: data.reply, time: new Date() },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { sender: "ai", text: "Error: " + (data.error || "Unknown error"), time: new Date() },
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Request failed: " + err.message, time: new Date() },
      ]);
    }

    setLoading(false);
    setThinking(false);
  }

  return (
    <div className="max-w-3xl mx-auto mt-8 flex flex-col h-[650px] bg-white rounded-xl shadow-xl border border-gray-200 font-sans">
      <header className="px-6 py-4 border-b border-gray-300 bg-gray-50 flex items-center justify-center text-xl font-semibold text-gray-800 select-none">
        ⚖️ Legal AI Chatbot
      </header>

      <main className="flex-1 p-6 overflow-y-auto space-y-6 bg-gray-50">
        {messages.length === 0 && (
          <p className="text-center text-gray-400 italic select-none mt-28">
            Ask your legal questions below...
          </p>
        )}
        <AnimatePresence>
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className={`flex items-end max-w-[75%] ${
                msg.sender === "user" ? "justify-end ml-auto" : "justify-start"
              }`}
            >
              <div
                className={`relative px-5 py-3 rounded-2xl shadow-md whitespace-pre-wrap break-words
                  ${
                    msg.sender === "user"
                      ? "bg-indigo-600 text-white rounded-br-none"
                      : "bg-white border border-gray-300 text-gray-900 rounded-bl-none"
                  }
                  transition-colors duration-300 ease-in-out`}
              >
                {msg.text}
                <span
                  className={`absolute bottom-[-18px] text-[10px] font-mono select-none opacity-60 ${
                    msg.sender === "user" ? "right-3 text-indigo-200" : "left-3 text-gray-500"
                  }`}
                >
                  {formatTime(msg.time)}
                </span>
              </div>
            </motion.div>
          ))}

          {thinking && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-start max-w-[75%]"
            >
              <div className="px-4 py-2 rounded-2xl bg-white border border-gray-300 text-gray-700 text-sm shadow-sm animate-pulse">
                AI is thinking...
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </main>

      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-4 p-4 border-t border-gray-300 bg-white"
      >
        <textarea
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question here..."
          disabled={loading}
          className="flex-1 resize-none border border-gray-300 rounded-lg p-3 text-gray-900
            focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow duration-300
            placeholder:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className={`flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-white transition-colors duration-300
            ${
              loading || !input.trim()
                ? "bg-indigo-300 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 mr-2 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          ) : null}
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
}

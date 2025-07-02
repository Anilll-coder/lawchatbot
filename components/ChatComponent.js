"use client";

import { useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function ChatComponent({ chatId, userType }) {
  const { data: session } = useSession();
  const [chat, setChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!chatId || !session?.user?.email) return;
    fetchChat();
    const interval = setInterval(fetchChat, 3000);
    return () => clearInterval(interval);
  }, [chatId, session?.user?.email]);

  const fetchChat = async () => {
    try {
      const res = await axios.get(`/api/chat/${chatId}`);
      setChat(res.data);
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.error("Failed to fetch chat:", error);
    }
  };

  const handleSend = async () => {
    if (!newMessage.trim()) return;
    try {
      await axios.post(`/api/chat/${chatId}`, {
        sender: session.user.email,
        message: newMessage,
      });
      setNewMessage("");
      fetchChat();
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col items-center px-4 py-6">
      <div className="w-full max-w-3xl flex flex-col h-[80vh] bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden">

        {/* Header */}
        <div className="bg-blue-600 dark:bg-blue-700 text-white text-center py-4 text-lg font-semibold">
          {userType === "lawyer" ? "Chat with Client" : "Chat with Lawyer"}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {chat?.messages?.map((msg, index) => {
            const isOwn = msg.sender === session?.user?.email;
            return (
              <div
                key={index}
                className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] px-4 py-2 rounded-lg shadow-sm text-sm relative ${isOwn
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 dark:bg-gray-700 dark:text-white"
                    }`}
                >
                  {msg.message}
                  <span className="absolute -bottom-4 right-1 text-xs text-gray-400 dark:text-gray-300">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>

                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-3 flex items-center gap-2 bg-gray-100 dark:bg-gray-900">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSend}
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Send
          </button>
        </div>
      </div>
    </section>
  );
}

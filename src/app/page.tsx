"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ChatUI() {
  // Current messages
  const [messages, setMessages] = useState<
    { role: "user" | "bot"; text: string }[]
  >([{ role: "bot", text: "Hi! I’m your AI assistant. Ask me anything." }]);

  // Current input
  const [input, setInput] = useState("");

  const fakeResponses = [
    "That’s interesting! Tell me more.",
    "I think you’re onto something 👀",
    "Here’s a simple way to think about it...",
    "Great question! Let me explain.",
    "Hmm, I’d approach it like this...",
    "Explain, more about it....",
  ];

  // Send message
  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { role: "user" as const, text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Add temporary typing message
    const typingMessage = { role: "bot" as const, text: "Typing..." };
    setMessages((prev) => [...prev, typingMessage]);

    setTimeout(() => {
      const botMessage = {
        role: "bot" as const,
        text: fakeResponses[Math.floor(Math.random() * fakeResponses.length)],
      };

      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = botMessage; // replace "Typing..."
        return updated;
      });
    }, 1200);
  };

  // New chat resets messages
  const handleNewChat = () => {
    setMessages([
      { role: "bot", text: "Hi! I’m your AI assistant. Ask me anything." },
    ]);
  };

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-4 flex flex-col">
        <button
          onClick={handleNewChat}
          className="w-full bg-gray-700 p-2 rounded mb-4"
        >
          + New Chat
        </button>

        <div className="space-y-2 flex-1 overflow-y-auto">
          <div className="p-2 bg-gray-800 rounded">Chat 1</div>
          <div className="p-2 bg-gray-800 rounded">Chat 2</div>
        </div>
      </div>

      {/* Main Chat */}
      <div className="flex-1 flex flex-col bg-gray-100">
        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs p-3 rounded-2xl shadow ${
                  msg.role === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-white text-black"
                }`}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Input box */}
        <div className="p-4 border-t flex gap-2">
          <input
            value={input}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInput(e.target.value)
            }
            placeholder="Type a message..."
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") handleSend();
            }}
            className="flex-1 border rounded-xl p-2 outline-none"
          />

          <button
            onClick={handleSend}
            className="bg-blue-500 text-white px-4 rounded-xl"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

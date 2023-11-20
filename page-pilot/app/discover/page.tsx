"use client";

import React, { useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

interface Message {
  text: string;
  type: "user" | "chatbot";
}

const Discover: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSendMessage = () => {
    if (input.trim() === "") {
      return;
    }

    // Add the user's message to the conversation
    setMessages([...messages, { text: input, type: "user" }]);

    // TODO: Call a function to send the user's message to ChatGPT and get the response

    // Clear the input field
    setInput("");
  };

  return (
    <div className="border-2 border-ocean-surf rounded-lg flex flex-col w-3/4 mx-auto h-3/4 px-8 my-8">
      <div style={{ flex: 1, overflowY: "auto", marginBottom: "10px" }}>
        {/* Display the conversation history */}
        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              padding: "5px",
              textAlign: message.type === "user" ? "right" : "left",
            }}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="flex items-center">
        {/* Input field for typing messages */}
        <input
          className="flex-1 mr-3 border border-ocean-blue rounded-md p-2 my-2"
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Type your message..."
        />

        {/* Button to send the message */}
        <button
          onClick={handleSendMessage}
          className="p-2 bg-ocean-blue text-white rounded-full w-10 h-10 flex items-center justify-center">
          {/* Rotate the PaperAirplaneIcon left 90 degrees */}
          <PaperAirplaneIcon className="transform -rotate-90" />
        </button>
      </div>
    </div>
  );
};

export default Discover;

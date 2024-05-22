"use client";

import { useState, useEffect, useRef, MutableRefObject } from "react";
import { io, Socket } from "socket.io-client";

interface Message {
  text: string;
  createdAt: string;
  senderSocketId: string;
}

export default function Home() {
  const [message, setMessage] = useState("");
  const [messageHistory, setMessageHistory] = useState<Message[]>([]);

  let socketRef: MutableRefObject<Socket | null> = useRef(null);

  const newMessageReceived = (message: Message) => {
    console.log(`Received message: `, message);
    setMessageHistory((oldMessageHistory) => [...oldMessageHistory, message]);
  };

  useEffect(() => {
    const url = `http://localhost:4000`;

    async function fetchMessageHistory() {
      const responseData = await fetch(`${url}/messages`);
      const response = await responseData.json();
      setMessageHistory(response);
    }
    fetchMessageHistory();

    socketRef.current = io(url);
    socketRef.current.on("chat-message", newMessageReceived);

    return () => {
      socketRef.current?.off("chat-message", newMessageReceived);
    };
  }, []);

  const sendMessage = async (e: any) => {
    e.preventDefault();
    const newMessage = { text: message, createdAt: new Date().toISOString(), senderSocketId: 'You' };
    setMessage(``);
    console.log(`Send message`, newMessage);
    socketRef.current?.emit(`chat-message`, newMessage);
    setMessageHistory((oldMessageHistory) => [...oldMessageHistory, newMessage]);
  };

  const formatTime = (isoString: string): string => {
    const date = new Date(isoString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const renderDateSeparator = (currentTimestamp: string, previousTimestamp?: string) => {
    const currentDate = new Date(currentTimestamp).toDateString();
    const previousDate = previousTimestamp ? new Date(previousTimestamp).toDateString() : '';

    if (currentDate !== previousDate) {
      return <div className="text-center my-4 text-sm text-gray-500 font-semibold">{currentDate}</div>;
    }
    return null;
  };

  return (
    <main className="flex flex-col h-screen items-center justify-center bg-gray-100">
      <div className="flex flex-col w-full max-w-xl mx-auto bg-white rounded-lg shadow-md p-6 overflow-y-auto flex-grow">
        {messageHistory.map((message, i) => (
          <div key={i}>
            {renderDateSeparator(message.createdAt, messageHistory[i - 1]?.createdAt)}
            <div className="mb-4 p-4 bg-gray-200 rounded-lg">
              <div className="flex justify-between mb-2">
                <span className="font-bold text-gray-700">{message.senderSocketId}</span>
                <span className="text-xs text-gray-500">{formatTime(message.createdAt)}</span>
              </div>
              <div className="text-gray-800">{message.text}</div>
            </div>
          </div>
        ))}
      </div>

      <form
        id="text-input-container"
        className="w-full max-w-xl mx-auto py-4 px-2 flex items-center justify-center"
        onSubmit={sendMessage}
      >
        <div className="text-center bg-white w-full px-3 py-2 flex gap-3 rounded-lg shadow-md">
          <input
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            id="message"
            className="focus:outline-none px-3 py-2 flex-1 rounded-lg bg-gray-200"
            type="text"
            placeholder="What do you want to say?"
          />
          <button type="submit" className="rounded-lg px-4 py-2 bg-blue-600 text-white text-sm">
            Send
          </button>
        </div>
      </form>
    </main>
  );
}

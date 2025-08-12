'use client';

import { useChat } from '@ai-sdk/react';
import { useState, useEffect } from 'react';

export default function Chat() {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  const { messages, sendMessage, setMessages } = useChat();

  useEffect(() => {
    fetch('/api/messages')
      .then(res => res.json())
      .then(data => {
        if (data.messages && data.messages.length > 0) {
          setMessages(data.messages);
        }
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [setMessages]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {messages.map(message => (
        <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
          <div className={`max-w-[80%] rounded-lg px-4 py-3 ${
            message.role === 'user' 
              ? 'bg-neutral-600 text-white' 
              : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100'
          }`}>
            <div className="whitespace-pre-wrap">
              <p className="text-xs font-extralight mb-1 opacity-70">{message.role === 'user' ? 'YOU ' : 'AI '}</p>
              {message.parts.map((part, i) => {
                switch (part.type) {
                  case 'text':
                    return <div key={`${message.id}-${i}`}>{part.text}</div>;
                }
              })}
            </div>
          </div>
        </div>
      ))}

      <form
        onSubmit={e => {
          e.preventDefault();
          sendMessage({ text: input });
          setInput('');
        }}
      >
        <input
          className="fixed dark:bg-zinc-900 bottom-0 w-full max-w-md p-2 mb-8 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={e => setInput(e.currentTarget.value)}
        />
      </form>
    </div>
  );
}
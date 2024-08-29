import { useEffect, useRef } from 'react';
import Markdown from 'react-markdown';
import type { Message } from '../Chat';

export default function ChatMessages({ messages }: { messages: Message[] }) {
  let lastMessageRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    const {current} = lastMessageRef
    if (current !== null){
      current.scrollIntoView({behavior: "smooth", block: "end"})
    }
    return () => {
      lastMessageRef.current = null;
    }
  }, [messages]);
  return (
    <>
      {/* Área de Chat */}
      <main className="flex-grow overflow-y-auto p-4 bg-botticelli">
        {messages.map((message, index) => {
          const markdown = message.content;
          return (
            message.role == "user"
            ? <div key={index} className="mb-4 text-right" ref={lastMessageRef}>
              <div className="bg-paradiso text-white p-3 rounded-lg shadow-md max-w-md ml-auto">
                <Markdown>{markdown}</Markdown>
              </div>
            </div>
            : <div key={index} className="mb-4" ref={lastMessageRef}>
              <div className="bg-viking text-white p-3 rounded-lg shadow-md max-w-md">
                <Markdown>{markdown}</Markdown>
              </div>
            </div>
          )
        })}
      </main>
    </>
  );
}

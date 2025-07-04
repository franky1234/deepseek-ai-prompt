// src/components/Chat.tsx
import { useState, useRef, useEffect } from 'preact/hooks';
import type { FunctionalComponent } from 'preact';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
}

export const Chat: FunctionalComponent = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! How can I help you today?", isUser: false }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const botResponses = [
    "Interesting, tell me more about that.",
    "I understand. What else would you like to know?",
    "I have that information. How else can I assist you?",
    "That's something I can elaborate on if you'd like.",
    "Fascinating! That sounds important."
  ];

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    // Add user message
    const newMessage: Message = {
      id: Date.now(),
      text: inputValue,
      isUser: true
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    
    // Simulate bot response after delay
    setTimeout(() => {
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      const botMessage: Message = {
        id: Date.now() + 1,
        text: randomResponse,
        isUser: false
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div class="max-w-md mx-auto h-screen flex flex-col p-4">
      {/* Header */}
      <header class="text-center py-6">
        <h1 class="text-xl font-semibold text-gray-900">Astro + xAI Chatbot</h1>
        <p class="text-sm text-gray-500 mt-1">
          This starter project uses AI with the AI SDK via Astro.
        </p>
      </header>

      {/* Messages container */}
      <div class="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.map((message) => (
          <Message 
            key={message.id}
            text={message.text}
            isUser={message.isUser}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <form class="relative" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Say something..."
          class="w-full p-3 pr-16 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-400"
          value={inputValue}
          onInput={(e) => setInputValue((e.target as HTMLInputElement).value)}
          aria-label="Type your message"
        />
        <div class="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded">
          gcok3.mini
        </div>
      </form>
    </div>
  );
};

const Message: FunctionalComponent<{ text: string; isUser: boolean }> = ({ text, isUser }) => {
  return (
    <div class={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div 
        class={`max-w-[80%] p-3 rounded-lg ${
          isUser 
            ? 'bg-black text-white rounded-br-none' 
            : 'bg-gray-100 text-gray-800 rounded-bl-none'
        } animate-fadeIn`}
      >
        {text}
      </div>
    </div>
  );
};
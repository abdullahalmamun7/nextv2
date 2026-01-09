import React, { useState, useRef, useEffect } from 'react';
import { Send, RefreshCw, Info, Sparkles } from 'lucide-react';
import { Message, BotStatus } from './types';
import { sendMessageToGemini, resetChat } from './services/genai';
import MessageBubble from './components/MessageBubble';
import TypingIndicator from './components/TypingIndicator';
import RobotSVG from './components/RobotSVG';
import FloatingMascot from './components/FloatingMascot';
import { BOT_NAME, WELCOME_MESSAGE } from './constants';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      text: WELCOME_MESSAGE,
      timestamp: Date.now(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [status, setStatus] = useState<BotStatus>(BotStatus.IDLE);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, status]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || status === BotStatus.THINKING) return;

    const userText = inputValue.trim();
    setInputValue('');
    setStatus(BotStatus.THINKING);

    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: userText,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, newUserMessage]);

    try {
      const responseText = await sendMessageToGemini(userText);
      
      const newBotMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: Date.now(),
      };
      
      setMessages((prev) => [...prev, newBotMessage]);
      setStatus(BotStatus.IDLE);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "I'm having trouble connecting right now. Please try again.",
        timestamp: Date.now(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
      setStatus(BotStatus.ERROR);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleReset = () => {
    resetChat();
    setMessages([
        {
          id: 'welcome-' + Date.now(),
          role: 'model',
          text: WELCOME_MESSAGE,
          timestamp: Date.now(),
        },
    ]);
    setStatus(BotStatus.IDLE);
    inputRef.current?.focus();
  };

  return (
    <div className="flex flex-col h-screen bg-[#f8fafc] text-slate-800 overflow-hidden relative">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-blue-50 to-transparent pointer-events-none z-0" />

      {/* Header */}
      <header className="flex-shrink-0 z-10 px-4 py-4 md:px-6 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
            <div className="relative">
                 <RobotSVG className="w-12 h-12 drop-shadow-sm" />
                 <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 border-2 border-white"></span>
                  </span>
            </div>
            <div>
                 <h1 className="text-xl font-bold tracking-tight gradient-text">{BOT_NAME}</h1>
                 <p className="text-xs text-gray-500 font-medium">Your AI Companion</p>
            </div>
        </div>
        
        <button 
            onClick={handleReset}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200"
            title="Start New Chat"
        >
            <RefreshCw size={20} />
        </button>
      </header>

      {/* Main Chat Area */}
      <main className="flex-1 overflow-y-auto z-10 p-4 md:p-6 scroll-smooth">
        <div className="max-w-3xl mx-auto flex flex-col min-h-full">
            
            {/* Messages */}
            <div className="flex-1">
                {messages.map((msg) => (
                    <MessageBubble key={msg.id} message={msg} />
                ))}

                {status === BotStatus.THINKING && (
                    <div className="flex w-full mb-6 justify-start">
                        <div className="flex flex-row items-end gap-3">
                             <div className="flex-shrink-0 w-8 h-8 rounded-full border border-blue-100 bg-white flex items-center justify-center shadow-sm p-1">
                                <RobotSVG className="w-full h-full" />
                             </div>
                             <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm">
                                <TypingIndicator />
                             </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

        </div>
      </main>

      {/* Input Area */}
      <footer className="flex-shrink-0 z-20 bg-white border-t border-gray-100 p-4 md:p-6">
        <div className="max-w-3xl mx-auto">
            <div className="relative flex items-center bg-gray-50 border border-gray-200 rounded-full shadow-inner focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-300 transition-all duration-300">
                <div className="pl-4 text-gray-400">
                    <Sparkles size={20} className={status === BotStatus.THINKING ? "animate-pulse text-blue-400" : ""} />
                </div>
                
                <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Message Nexto..."
                    className="flex-1 bg-transparent py-4 px-3 text-gray-700 placeholder-gray-400 focus:outline-none"
                    disabled={status === BotStatus.THINKING}
                />
                
                <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || status === BotStatus.THINKING}
                    className={`mr-2 p-2.5 rounded-full flex items-center justify-center transition-all duration-200 
                        ${inputValue.trim() && status !== BotStatus.THINKING
                            ? 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 shadow-md' 
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                >
                    <Send size={18} className={inputValue.trim() ? "translate-x-0.5" : ""} />
                </button>
            </div>
            <div className="text-center mt-3">
                 <p className="text-[10px] text-gray-400">Nexto can make mistakes. Verify important information.</p>
            </div>
        </div>
      </footer>
      
      {/* Floating Elements */}
      <FloatingMascot />
    </div>
  );
};

export default App;
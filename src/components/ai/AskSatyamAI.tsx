import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, User } from 'lucide-react';
import { personalData } from '../../data/personal';

type Message = {
  id: string;
  sender: 'ai' | 'user';
  text: string;
};

const suggestedQuestions = [
  "Who is Satyam?",
  "What are his best projects?",
  "What technologies does he use?",
  "What is his AI experience?",
  "What are his business goals?",
  "How can I contact him?"
];

// Simple local knowledge base matching
const getAIResponse = (query: string): string => {
  const q = query.toLowerCase();
  
  if (q.includes('who') || q.includes('about')) {
    return personalData.headline + " " + personalData.shortBio;
  }
  if (q.includes('project')) {
    return "Satyam's key projects include HealthNet (Java Hospital Management), an Intelligent Navigation System, COVID-19 Data Analysis using Python, and CourseReg Ultra using React. You can explore them in the Projects section.";
  }
  if (q.includes('tech') || q.includes('skills')) {
    return "He works with Java, Python, JavaScript/TypeScript, React, Tailwind CSS, Spring Boot, Node.js, and databases like PostgreSQL and MongoDB. He is also deeply interested in AI and Machine Learning.";
  }
  if (q.includes('ai') || q.includes('machine learning')) {
    return "Satyam explores Artificial Intelligence, Machine Learning, search algorithms (BFS, DFS, A*), and data analysis using Python and tools like Hugging Face.";
  }
  if (q.includes('business') || q.includes('goal') || q.includes('mba')) {
    return "Satyam's long-term goal is to pursue an MBA, combine his engineering background with business strategy, and build technology-driven ventures that create meaningful impact.";
  }
  if (q.includes('contact') || q.includes('email') || q.includes('reach')) {
    return `You can reach Satyam via email at ${personalData.email} or connect with him on LinkedIn.`;
  }
  if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
    return "Hello! I'm Satyam AI. How can I help you learn more about Satyam Kumar Kapri?";
  }
  
  return "I'm designed to help you explore Satyam's profile, projects, skills, and vision. Could you please ask something specific about his professional background?";
};

const AskSatyamAI: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-0',
      sender: 'ai',
      text: "Hi. I'm Satyam AI — the digital guide to Satyam Kumar Kapri's work, skills, projects, and vision. What would you like to know?"
    }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSend = (text: string = input) => {
    if (!text.trim()) return;

    const userMsg: Message = { id: `msg-${Date.now()}`, sender: 'user', text: text.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const responseText = getAIResponse(text);
      const aiMsg: Message = { id: `msg-${Date.now() + 1}`, sender: 'ai', text: responseText };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-accent-blue flex items-center justify-center text-primary shadow-[0_0_20px_rgba(0,82,255,0.4)] hover:bg-primary hover:text-background hover:shadow-[0_0_30px_rgba(255,255,255,0.6)] transition-all duration-300 group"
        onClick={() => setIsOpen(true)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 4, type: "spring", bounce: 0.5 }}
      >
        <Bot size={24} className="group-hover:scale-110 transition-transform" />
        
        {/* Pulsing ring */}
        <div className="absolute inset-0 rounded-full border border-primary opacity-50 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-x-4 bottom-4 md:inset-auto md:bottom-24 md:right-6 md:w-[400px] h-[550px] max-h-[80vh] z-[100] glass-panel border border-border rounded-2xl overflow-hidden flex flex-col shadow-2xl shadow-black"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-background/80 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent-blue/20 flex items-center justify-center text-accent-cyan">
                  <Bot size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-display font-bold text-primary tracking-widest">ASK SATYAM AI</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-mono text-primary-dim uppercase">Online</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 text-primary-dim hover:text-primary rounded-full hover:bg-surface transition-colors">
                <X size={16} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 hide-scrollbar bg-gradient-to-b from-transparent to-background/50">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.sender === 'user' ? 'bg-primary text-background' : 'bg-surface border border-border text-accent-cyan'}`}>
                    {msg.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
                  </div>
                  <div className={`p-3 rounded-2xl text-sm leading-relaxed ${
                    msg.sender === 'user' 
                      ? 'bg-primary text-background rounded-tr-sm' 
                      : 'bg-surface border border-border text-primary-dim rounded-tl-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-3 max-w-[85%]">
                  <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center bg-surface border border-border text-accent-cyan">
                    <Bot size={14} />
                  </div>
                  <div className="p-4 rounded-2xl rounded-tl-sm bg-surface border border-border flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-primary-dim rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-primary-dim rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                    <span className="w-1.5 h-1.5 bg-primary-dim rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                  </div>
                </div>
              )}
              
              {/* Suggested Questions */}
              {messages.length === 1 && !isTyping && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {suggestedQuestions.map(q => (
                    <button 
                      key={q}
                      onClick={() => handleSend(q)}
                      className="px-3 py-1.5 bg-surface border border-border rounded-full text-xs text-primary-dim hover:text-accent-cyan hover:border-accent-cyan transition-colors text-left"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-background border-t border-border">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="relative flex items-center"
              >
                <input 
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question..."
                  className="w-full bg-surface border border-border rounded-full py-3 pl-4 pr-12 text-sm text-primary placeholder:text-primary-dim focus:outline-none focus:border-accent-blue transition-colors"
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="absolute right-2 p-2 rounded-full bg-accent-blue text-primary disabled:opacity-50 disabled:bg-surface disabled:text-primary-dim transition-colors"
                >
                  <Send size={14} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </>
  );
};

export default AskSatyamAI;

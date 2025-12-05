import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Property } from '../types';
import { Send, Sparkles, Loader2, Bot } from 'lucide-react';

interface AIAssistantProps {
  property: Property;
}

interface Message {
  role: 'user' | 'model';
  text: string;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ property }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: `Hello! I'm your virtual real estate assistant. Ask me anything about ${property.title}.` }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !import.meta.env.VITE_GEMINI_API_KEY) return;

    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
      
      const systemPrompt = `
        You are a highly knowledgeable and professional real estate agent assistant for "PrimeEstates".
        You are currently assisting a user with a specific property listing in India.
        Always use Indian Rupees (₹) for all price discussions and calculations.
        
        Property Details:
        Title: ${property.title}
        Type: ${property.type}
        Price: ₹${property.price.toLocaleString('en-IN')}
        Address: ${property.address}
        Beds: ${property.beds}
        Baths: ${property.baths}
        Square Footage: ${property.sqft}
        Description: ${property.description}
        Features: ${property.features.join(', ')}
        Agent Name: ${property.agent.name}
        
        Your goal is to be helpful, enthusiastic, and informative. 
        When discussing prices, always use ₹ (Indian Rupees) symbol.
        For EMI/loan calculations, assume 20% down payment and 20-year tenure at ~7% interest rate (typical in India).
        When suggesting property styles, consider Indian architecture and preferences (e.g., Modern Villas, Contemporary Apartments).
        Keep answers concise (under 3 sentences unless asked for detail).
      `;

      const chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: systemPrompt,
        },
      });

      const response = await chat.sendMessage({ message: userMsg });
      
      setMessages(prev => [...prev, { role: 'model', text: response.text || "I'm having trouble thinking right now." }]);

    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "I apologize, but I'm having trouble connecting to the service at the moment." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modern-card glass backdrop-blur-xl bg-white/90 rounded-2xl shadow-2xl border border-white/30 overflow-hidden flex flex-col h-[600px]">
      <div className="vibrant-gradient-bg p-5 flex items-center gap-3 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-2xl"></div>
        <div className="p-2.5 glass bg-white/20 rounded-full backdrop-blur-sm relative z-10">
           <Sparkles className="text-white h-5 w-5" />
        </div>
        <div className="relative z-10">
            <h3 className="text-white font-extrabold text-lg neon-glow">Virtual Property Agent</h3>
            <p className="text-white/80 text-xs font-medium">Powered by PrimeStates AI</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gradient-to-br from-gray-50 to-red-50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} slide-up`} style={{animationDelay: `${idx * 0.05}s`}}>
            <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg ${msg.role === 'user' ? 'bg-gradient-to-br from-red-600 to-cyan-600' : 'bg-gradient-to-br from-green-500 to-emerald-600'}`}>
                {msg.role === 'user' ? <span className="text-white text-xs font-bold">You</span> : <Bot className="text-white w-5 h-5"/>}
              </div>
              <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-md ${
                msg.role === 'user' 
                  ? 'bg-gradient-to-br from-red-600 to-cyan-600 text-white rounded-br-none' 
                  : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
             <div className="flex gap-3 items-center text-gray-400 text-sm ml-12">
                <Loader2 className="animate-spin h-5 w-5 text-red-600" />
                <span className="font-medium">AI is thinking...</span>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-5 glass bg-white/80 backdrop-blur-lg border-t border-white/30">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about this property..."
            className="modern-input flex-1 border-2 border-gray-200 rounded-full px-5 py-3 focus:ring-4 focus:ring-red-100 focus:border-red-500 outline-none text-sm bg-white/50 backdrop-blur-sm"
            disabled={loading}
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="ripple bg-gradient-to-r from-red-600 to-cyan-600 hover:from-red-700 hover:to-cyan-700 disabled:from-gray-300 disabled:to-gray-400 text-white rounded-full p-3 transition-all shadow-lg hover-glow hover:scale-105 active:scale-95"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
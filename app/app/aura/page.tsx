'use client';

import { useState } from 'react';
import { Sparkles, Send, User, Bot, Brain, RefreshCw } from 'lucide-react';
import { safeFetch } from '@/lib/api-response';

export default function AuraPage() {
  const [messages, setMessages] = useState<Array<{ sender: string; content: string }>>([
    { sender: 'AURA', content: "Hello! I'm Aura, your AI Career Intelligence & Learning Mentor. Ask me anything about your Knowledge Graph prerequisites, competency gaps, code debugging, or study plan!" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const suggestedPrompts = [
    "Explain my competency gap",
    "What should I study today?",
    "Why is this prerequisite required?",
    "Create a study plan",
    "Explain V8 event loop microtasks"
  ];

  const handleSend = async (textToSend?: string) => {
    const messageText = textToSend || input;
    if (!messageText.trim() || loading) return;

    setInput('');
    setMessages(prev => [...prev, { sender: 'USER', content: messageText }]);
    setLoading(true);

    try {
      const stored = typeof window !== 'undefined' ? localStorage.getItem('competency_user_session') : null;
      let userId = 'usr-demo-01';
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed && parsed.id) userId = parsed.id;
        } catch (e) {}
      }

      const res = await safeFetch('/api/ai/aura', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageText, userId, history: messages })
      });

      if (res.ok && res.data?.reply) {
        setMessages(prev => [...prev, { sender: 'AURA', content: res.data.reply }]);
      } else {
        const errorMsg = res.data?.error || res.data?.message || 'Aura AI is evaluating your request...';
        setMessages(prev => [...prev, { sender: 'AURA', content: errorMsg }]);
      }
    } catch (err: any) {
      setMessages(prev => [...prev, { sender: 'AURA', content: 'Connection issue contacting Aura AI service.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 h-[calc(100vh-140px)] flex flex-col justify-between font-sans">
      {/* HEADER CARD */}
      <div className="bg-[#11182B] border border-[#26314A] p-5 rounded-2xl flex items-center justify-between shadow-xl shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#050A19] border border-[#5B3DF5] flex items-center justify-center text-[#22D3EE] shadow-md shadow-[#5B3DF5]/20">
            <Sparkles className="w-5 h-5 text-[#22D3EE]" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-extrabold text-white tracking-tight">AI MENTOR — AURA</h1>
            <p className="text-xs text-[#94A3B8]">Personalized AI Learning & Career Intelligence Assistant</p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full bg-[#050A19] border border-[#26314A] text-[10px] font-bold text-[#22D3EE] uppercase tracking-wider hidden sm:inline-block">
          FULL-STACK VECTOR ACTIVE
        </span>
      </div>

      {/* CHAT MESSAGES STREAM */}
      <div className="flex-1 bg-[#11182B] border border-[#26314A] rounded-2xl p-6 overflow-y-auto space-y-4 shadow-xl custom-scrollbar min-h-0">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-2xl space-y-1.5 transition-all text-xs leading-relaxed ${
              m.sender === 'AURA'
                ? 'bg-[#050A19] border border-[#26314A] text-[#F8FAFC] mr-6 sm:mr-12 shadow-md'
                : 'bg-[#5B3DF5]/15 border border-[#5B3DF5]/40 text-white ml-6 sm:ml-12 shadow-md'
            }`}
          >
            <div className="flex items-center gap-2 font-bold text-[11px] text-[#94A3B8]">
              {m.sender === 'AURA' ? (
                <div className="w-5 h-5 rounded-full bg-[#5B3DF5] text-white flex items-center justify-center text-[10px]">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
              ) : (
                <div className="w-5 h-5 rounded-full bg-[#3B82F6] text-white flex items-center justify-center text-[10px]">
                  <User className="w-3 h-3 text-white" />
                </div>
              )}
              <span className={m.sender === 'AURA' ? 'text-[#22D3EE]' : 'text-white'}>
                {m.sender === 'AURA' ? 'Aura AI Mentor' : 'You'}
              </span>
            </div>
            <div className="whitespace-pre-wrap">{m.content}</div>
          </div>
        ))}

        {loading && (
          <div className="p-4 bg-[#050A19] border border-[#26314A] rounded-2xl text-xs text-[#22D3EE] flex items-center gap-2 animate-pulse mr-12">
            <RefreshCw className="w-4 h-4 animate-spin text-[#5B3DF5]" />
            <span>Aura is analyzing your Knowledge Graph vector & generating response...</span>
          </div>
        )}
      </div>

      {/* SUGGESTED PROMPT CHIPS & INPUT FORM */}
      <div className="space-y-3 shrink-0">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs custom-scrollbar">
          <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider shrink-0">SUGGESTED:</span>
          {suggestedPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="px-3 py-1.5 rounded-xl bg-[#11182B] border border-[#26314A] hover:border-[#5B3DF5] text-[#94A3B8] hover:text-white text-xs whitespace-nowrap transition-all"
            >
              {prompt}
            </button>
          ))}
        </div>

        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about your learning journey..."
            className="flex-1 bg-[#050A19] border border-[#26314A] rounded-xl px-4 py-3 text-xs text-white placeholder-[#64748B] focus:outline-none focus:border-[#5B3DF5]"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-[#5B3DF5] hover:bg-[#633BFF] text-white font-semibold text-xs rounded-xl shadow-lg shadow-[#5B3DF5]/30 transition-all flex items-center gap-2 disabled:opacity-50 shrink-0"
          >
            <Send className="w-4 h-4" /> <span>Send</span>
          </button>
        </form>
      </div>
    </div>
  );
}


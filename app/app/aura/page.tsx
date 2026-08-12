'use client';

import { useState } from 'react';
import { Sparkles, Send, Bot, User, Brain } from 'lucide-react';

export default function AuraPage() {
  const [messages, setMessages] = useState<Array<{ sender: string; content: string }>>([
    { sender: 'AURA', content: "Hello! I'm Aura, your AI Career Intelligence Mentor. How can I help you master your current skill vector today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { sender: 'USER', content: userText }]);
    setLoading(true);

    try {
      const res = await fetch('/api/ai/aura', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { sender: 'AURA', content: data.reply || 'Aura AI is evaluating...' }]);
    } catch (err) {
      setMessages(prev => [...prev, { sender: 'AURA', content: 'Connection issue contacting Aura.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 h-[calc(100vh-140px)] flex flex-col justify-between">
      <div className="bg-surface border border-surfaceBorder p-4 rounded-xl flex items-center justify-between glow-cyan">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-cyan-400" />
          <span className="font-mono text-sm font-bold text-white">AURA AI CONTEXTUAL MENTOR</span>
        </div>
        <span className="font-mono text-xs text-cyan-400 border border-cyan-800 bg-cyan-950 px-2.5 py-0.5 rounded">
          CONTEXT: FULL-STACK VECTOR
        </span>
      </div>

      <div className="flex-1 bg-surface border border-surfaceBorder rounded-2xl p-6 overflow-y-auto space-y-4 font-mono text-xs">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-xl space-y-1 ${
              m.sender === 'AURA'
                ? 'bg-cyan-950/40 border border-cyan-800/60 text-slate-200 ml-0 mr-8'
                : 'bg-slate-900 border border-slate-800 text-white ml-8 mr-0'
            }`}
          >
            <div className="flex items-center gap-2 font-bold text-slate-400">
              {m.sender === 'AURA' ? <Sparkles className="w-4 h-4 text-cyan-400" /> : <User className="w-4 h-4 text-indigo-400" />}
              <span className={m.sender === 'AURA' ? 'text-cyan-400' : 'text-indigo-400'}>{m.sender}</span>
            </div>
            <div className="leading-relaxed whitespace-pre-wrap">{m.content}</div>
          </div>
        ))}
        {loading && (
          <div className="p-3 font-mono text-xs text-cyan-400 animate-pulse">AURA IS COMPUTING RESPONSE...</div>
        )}
      </div>

      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Aura about async JS, code debugging, system design, or interview prep..."
          className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 font-mono"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-cyan-500 text-slate-950 font-bold font-mono text-xs rounded-xl hover:brightness-110 flex items-center gap-2"
        >
          <Send className="w-4 h-4" /> SEND
        </button>
      </form>
    </div>
  );
}

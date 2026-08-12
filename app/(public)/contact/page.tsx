'use client';

import { useState } from 'react';
import PublicNavbar from '@/components/PublicNavbar';
import PublicFooter from '@/components/PublicFooter';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ fullName: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.message) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background text-slate-100 flex flex-col">
      <PublicNavbar />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="font-mono text-xs text-cyan-400 uppercase tracking-widest">GET IN TOUCH</div>
          <h1 className="text-4xl font-extrabold text-white">Contact CompetencyAI Team</h1>
          <p className="text-slate-300 text-lg">
            Have questions about enterprise deployment, partnership, or technical features? Send us a message.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="bg-surface border border-surfaceBorder rounded-2xl p-8 space-y-6">
            <h3 className="text-xl font-bold text-white font-mono">Send Message</h3>

            {submitted ? (
              <div className="p-6 bg-emerald-950/60 border border-emerald-500/50 rounded-xl text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-white">Message Transmitted</h4>
                <p className="text-sm text-slate-300">Thank you for reaching out. Our engineering team will respond shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
                    placeholder="name@domain.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
                    placeholder="Inquiry topic"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Message</label>
                  <textarea
                    rows={4}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
                    placeholder="Detailed message..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 font-bold rounded-md hover:brightness-110 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  SUBMIT INQUIRY
                </button>
              </form>
            )}
          </div>

          <div className="space-y-6 flex flex-col justify-center">
            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-cyan-400 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-white">Email Communications</h4>
                <p className="text-sm text-slate-400">contact@competencyai.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="w-6 h-6 text-indigo-400 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-white">Engineering Support</h4>
                <p className="text-sm text-slate-400">+1 (800) 555-0199</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-emerald-400 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-white">Headquarters</h4>
                <p className="text-sm text-slate-400">100 Tech Plaza, Suite 400, San Francisco, CA</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}

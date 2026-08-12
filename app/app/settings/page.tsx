'use client';

import { useState } from 'react';
import { Settings, Lock, Bell, Shield } from 'lucide-react';

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-surface border border-surfaceBorder p-6 rounded-2xl flex items-center justify-between glow-cyan">
        <div>
          <div className="font-mono text-xs text-cyan-400 mb-1">PREFERENCES</div>
          <h1 className="text-2xl font-bold text-white">Account & System Settings</h1>
        </div>
      </div>

      <div className="bg-surface border border-surfaceBorder rounded-2xl p-6 space-y-4 font-mono text-xs">
        <h3 className="font-bold text-white text-sm">SECURITY & PRIVACY</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-slate-400 mb-1">CHANGE PASSWORD</label>
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <button
            onClick={() => setSaved(true)}
            className="px-5 py-2 bg-cyan-500 text-slate-950 font-bold rounded-lg hover:brightness-110"
          >
            SAVE PREFERENCES
          </button>

          {saved && <div className="text-emerald-400">Settings updated successfully.</div>}
        </div>
      </div>
    </div>
  );
}

'use client';

import React from 'react';

interface CompetencyLogoProps {
  variant?: 'full' | 'mark' | 'icon';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

export default function CompetencyLogo({
  variant = 'full',
  size = 'md',
  showText = true,
  className = ''
}: CompetencyLogoProps) {
  // Dimensions per size
  const sizes = {
    sm: { icon: 24, markWidth: 28, text: 'text-sm' },
    md: { icon: 32, markWidth: 36, text: 'text-base' },
    lg: { icon: 40, markWidth: 44, text: 'text-xl' },
    xl: { icon: 52, markWidth: 56, text: 'text-2xl' }
  };

  const currentSize = sizes[size] || sizes.md;

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* 
        ORIGINAL BRANDING SYMBOL: "Competency Path Network"
        A custom geometric 'C' constructed from connected knowledge graph nodes
        with an upward growth trajectory vector path flowing through it.
      */}
      <div 
        style={{ width: currentSize.markWidth, height: currentSize.markWidth }}
        className="relative shrink-0 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#0F172A] via-[#0A0F1D] to-[#050917] border border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.15)] group hover:border-cyan-400/60 transition-all"
      >
        <svg
          viewBox="0 0 100 100"
          className="w-4/5 h-4/5 fill-none overflow-visible"
        >
          <defs>
            {/* Gradient definition for the node connections */}
            <linearGradient id="comp-path-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="50%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#22D3EE" />
            </linearGradient>

            <linearGradient id="comp-glow-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#5B3DF5" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {/* Background Node Connector Lines forming geometric C */}
          <path
            d="M 75 25 C 50 10, 20 25, 20 50 C 20 75, 50 90, 75 75"
            stroke="url(#comp-path-gradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-90"
          />

          {/* Upward Growth / Mastery Vector Arrow through the C */}
          <path
            d="M 35 65 L 65 35 M 65 35 H 48 M 65 35 V 52"
            stroke="url(#comp-path-gradient)"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Knowledge Graph Nodes */}
          {/* Node 1: Prerequisite Top */}
          <circle cx="75" cy="25" r="7" fill="#22D3EE" className="animate-pulse" />
          {/* Node 2: Core Base */}
          <circle cx="20" cy="50" r="7" fill="#6366F1" />
          {/* Node 3: Mastery Bottom */}
          <circle cx="75" cy="75" r="7" fill="#3B82F6" />
          {/* Central Target Vector Node */}
          <circle cx="65" cy="35" r="5" fill="#10B981" />
        </svg>
      </div>

      {/* WORDMARK */}
      {(showText && variant !== 'mark') && (
        <div className="flex flex-col leading-none">
          <span className={`font-extrabold tracking-tight text-white ${currentSize.text}`}>
            Competency<span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">AI</span>
          </span>
          {size !== 'sm' && (
            <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase mt-0.5 font-medium">
              Career Intelligence Engine
            </span>
          )}
        </div>
      )}
    </div>
  );
}

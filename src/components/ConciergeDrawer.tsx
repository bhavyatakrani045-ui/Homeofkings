import React, { useEffect, useRef, useState } from 'react';
import { Loader2, RotateCcw, Send, X } from 'lucide-react';
import { PlatinumEmblemSvg } from './PlatinumLogo';
import { WatchReference } from '../data/watches';

export type ConciergeMode = 'concierge' | 'quick' | 'deep';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  modelUsed?: string;
}

interface ConciergeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  messages: ChatMessage[];
  onSendMessage: (text: string, mode: ConciergeMode) => Promise<void>;
  onResetChat: () => void;
  loading: boolean;
  error: string | null;
  activeWatch: WatchReference | null;
}

const STARTER_PROMPTS = [
  'Compare Sovereign Automatic I vs. Atelier Ultrathin 38mm',
  'Why does Home of King’s forge cases in 950 platinum?',
  'Which automatic reference pairs best with black-tie evening wear?',
];

const MODES: { id: ConciergeMode; label: string }[] = [
  { id: 'concierge', label: 'Concierge' },
  { id: 'quick', label: 'Quick Spec' },
  { id: 'deep', label: 'Caliber Deep Dive' },
];

export const ConciergeDrawer: React.FC<ConciergeDrawerProps> = ({
  isOpen,
  onClose,
  messages,
  onSendMessage,
  onResetChat,
  loading,
  error,
  activeWatch,
}) => {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<ConciergeMode>('concierge');
  const threadEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      threadEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      const timer = setTimeout(() => inputRef.current?.focus(), 120);
      return () => clearTimeout(timer);
    }
  }, [isOpen, messages.length, loading]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || loading) return;
    setInput('');
    await onSendMessage(trimmed, mode);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label="Home of King's Horology Concierge"
      onClick={onClose}
    >
      <aside
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg h-full bg-[#0E1014] border-l border-white/15 flex flex-col shadow-2xl"
      >
        {/* Drawer Header */}
        <div className="px-6 py-4 border-b border-white/[0.08] bg-[#131519] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <PlatinumEmblemSvg className="w-8 h-8 shrink-0" />
            <div className="min-w-0">
              <h2 className="font-display text-xl text-white truncate">
                Horology Concierge
              </h2>
              <p className="text-[11px] font-mono text-[#C4B5A0] truncate">
                Master Watchmaker · Nothing better than king&apos;s
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={onResetChat}
              title="New consultation"
              aria-label="Start new consultation"
              className="p-2 rounded-lg text-[#9DA5B4] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close Horology Concierge"
              className="p-2 rounded-lg text-[#9DA5B4] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Consultation Mode Switcher */}
        <div className="px-6 py-3 border-b border-white/[0.06] bg-[#101217] flex items-center justify-between gap-3">
          <div className="flex items-center gap-1 p-1 rounded-lg bg-[#0B0C0E] border border-white/[0.08] w-full">
            {MODES.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setMode(m.id)}
                className={`flex-1 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  mode === m.id
                    ? 'bg-[#21252D] text-white'
                    : 'text-[#8A919E] hover:text-[#D4D8E0]'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {activeWatch && (
          <div className="px-6 py-2.5 bg-[#15181E] border-b border-white/[0.06] flex items-center justify-between gap-3 text-xs">
            <span className="text-[#9DA5B4] truncate">
              Active Reference:{' '}
              <strong className="text-[#F1F3F6] font-medium">{activeWatch.name}</strong>
            </span>
            <span className="font-mono text-[#C4B5A0] shrink-0">
              {activeWatch.reference}
            </span>
          </div>
        )}

        {/* Scrollable Multi-Turn Conversation Thread */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.role === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <span className="text-[11px] font-mono text-[#8A919E] mb-1.5">
                {msg.role === 'user' ? 'You' : "Home of King's Concierge"}
              </span>
              <div
                className={`max-w-[88%] rounded-xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'user'
                    ? 'bg-[#C4B5A0] text-[#0B0C0E] font-medium'
                    : 'bg-[#15181E] border border-white/10 text-[#E6E8EC]'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {messages.length <= 1 && (
            <div className="pt-2 space-y-2">
              <p className="text-xs font-mono text-[#8A919E]">
                SUGGESTED INQUIRIES
              </p>
              <div className="flex flex-col gap-2">
                {STARTER_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    disabled={loading}
                    onClick={() => onSendMessage(prompt, mode)}
                    className="text-left px-3.5 py-2.5 rounded-lg bg-[#131519] hover:bg-[#1B1F27] border border-white/10 text-xs text-[#D4D8E0] transition-colors cursor-pointer"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {loading && (
            <div className="flex items-start flex-col">
              <span className="text-[11px] font-mono text-[#8A919E] mb-1.5">
                Home of King&apos;s Concierge
              </span>
              <div className="inline-flex items-center gap-2.5 px-4 py-3 rounded-xl bg-[#15181E] border border-white/10 text-xs text-[#C4B5A0]">
                <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />
                <span>Consulting horology dossier...</span>
              </div>
            </div>
          )}

          {error && (
            <div
              role="alert"
              className="p-3.5 rounded-lg bg-red-950/40 border border-red-500/40 text-xs text-red-200"
            >
              {error}
            </div>
          )}

          <div ref={threadEndRef} />
        </div>

        {/* Message Input Bar */}
        <form
          onSubmit={handleSubmit}
          className="p-4 border-t border-white/[0.08] bg-[#131519]"
        >
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about calibers, 950 platinum, or sizing..."
              className="flex-1 px-4 py-3 rounded-lg bg-[#0B0C0E] border border-white/15 text-sm text-[#F1F3F6] placeholder-[#6B7280] focus:outline-none focus:border-[#C4B5A0]"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send message"
              className="p-3 rounded-lg bg-[#C4B5A0] hover:bg-[#D5C7B3] disabled:opacity-45 disabled:cursor-not-allowed text-[#0B0C0E] transition-colors cursor-pointer shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </aside>
    </div>
  );
};

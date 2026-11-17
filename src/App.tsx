import React, { useState } from 'react';
import { BagDrawer, BagItem } from './components/BagDrawer';
import { CaliberShowcase } from './components/CaliberShowcase';
import { CollectionSection } from './components/CollectionSection';
import { ChatMessage, ConciergeDrawer, ConciergeMode } from './components/ConciergeDrawer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MaisonFooter } from './components/MaisonFooter';
import { WatchAnalyzerSection } from './components/WatchAnalyzerSection';
import { WatchDetailModal } from './components/WatchDetailModal';
import { WATCH_CATALOG, WatchReference } from './data/watches';

const INITIAL_CONCIERGE_MESSAGES: ChatMessage[] = [
  {
    id: 'welcome-msg',
    role: 'model',
    text: "Welcome to Home of King's. Nothing better than king's. I am your Master Horologist Concierge—ask me about our solid 950 platinum cases, automatic twin-barrel calibers, or selecting the finest timepiece for your wrist.",
  },
];

export default function App() {
  const [selectedWatch, setSelectedWatch] = useState<WatchReference | null>(null);
  const [conciergeOpen, setConciergeOpen] = useState(false);
  const [conciergeWatchContext, setConciergeWatchContext] = useState<WatchReference | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CONCIERGE_MESSAGES);
  const [chatLoading, setChatLoading] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);

  const [bagOpen, setBagOpen] = useState(false);
  const [bagItems, setBagItems] = useState<BagItem[]>([]);
  const [toastText, setToastText] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastText(msg);
    setTimeout(() => {
      setToastText((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  const handleAddToBag = (watch: WatchReference, strap?: string) => {
    const chosenStrap = strap || watch.strapOptions[0];
    setBagItems((prev) => {
      const existing = prev.find(
        (item) => item.watch.id === watch.id && item.strap === chosenStrap
      );
      if (existing) {
        return prev.map((item) =>
          item.watch.id === watch.id && item.strap === chosenStrap
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { watch, strap: chosenStrap, quantity: 1 }];
    });
    showToast(`${watch.name} added to your Acquisition Bag.`);
  };

  const handleUpdateQty = (watchId: string, strap: string, delta: number) => {
    setBagItems((prev) =>
      prev
        .map((item) =>
          item.watch.id === watchId && item.strap === strap
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (watchId: string, strap: string) => {
    setBagItems((prev) =>
      prev.filter((item) => !(item.watch.id === watchId && item.strap === strap))
    );
  };

  const handleSendMessage = async (text: string, mode: ConciergeMode) => {
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text,
    };

    const historyPayload = messages
      .filter((m) => m.id !== 'welcome-msg')
      .map((m) => ({ role: m.role, text: m.text }));

    setMessages((prev) => [...prev, userMsg]);
    setChatLoading(true);
    setChatError(null);

    try {
      const res = await fetch('/api/concierge/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          history: historyPayload,
          message: text,
          mode,
          activeWatchId: conciergeWatchContext?.id,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Unable to reach the concierge.');
      }

      const modelMsg: ChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        text: data.reply,
        modelUsed: data.model,
      };
      setMessages((prev) => [...prev, modelMsg]);
    } catch (err: unknown) {
      setChatError(
        err instanceof Error ? err.message : 'Unable to reach the Horology Concierge.'
      );
    } finally {
      setChatLoading(false);
    }
  };

  const handleConsultWatch = (watch: WatchReference) => {
    setConciergeWatchContext(watch);
    setConciergeOpen(true);
    handleSendMessage(
      `Tell me what makes the ${watch.name} (${watch.reference}) and its ${watch.caliber} special in 950 platinum.`,
      'concierge'
    );
  };

  const handleAskCaliber = (pillarTitle: string) => {
    setConciergeOpen(true);
    handleSendMessage(
      `Explain the horological engineering behind Home of King's "${pillarTitle}" in detail.`,
      'deep'
    );
  };

  const totalBagCount = bagItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0B0C0E] text-[#F1F3F6] flex flex-col">
      <Header onOpenConcierge={() => setConciergeOpen(true)} />

      <main className="flex-1">
        <Hero
          onOpenConcierge={() => setConciergeOpen(true)}
          onInspectFlagship={() => setSelectedWatch(WATCH_CATALOG[0])}
        />

        <CollectionSection
          onSelectWatch={setSelectedWatch}
          onQuickAdd={(watch) => handleAddToBag(watch)}
          bagCount={totalBagCount}
          onOpenBag={() => setBagOpen(true)}
        />

        <CaliberShowcase onAskCaliber={handleAskCaliber} />

        <WatchAnalyzerSection onSelectWatch={setSelectedWatch} />
      </main>

      <MaisonFooter onOpenConcierge={() => setConciergeOpen(true)} />

      <WatchDetailModal
        watch={selectedWatch}
        onClose={() => setSelectedWatch(null)}
        onAddToBag={handleAddToBag}
        onConsultConcierge={handleConsultWatch}
      />

      <ConciergeDrawer
        isOpen={conciergeOpen}
        onClose={() => setConciergeOpen(false)}
        messages={messages}
        onSendMessage={handleSendMessage}
        onResetChat={() => {
          setMessages(INITIAL_CONCIERGE_MESSAGES);
          setConciergeWatchContext(null);
          setChatError(null);
        }}
        loading={chatLoading}
        error={chatError}
        activeWatch={conciergeWatchContext}
      />

      <BagDrawer
        isOpen={bagOpen}
        onClose={() => setBagOpen(false)}
        items={bagItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearBag={() => setBagItems([])}
      />

      {toastText && (
        <div
          role="status"
          className="fixed bottom-6 right-6 z-40 px-5 py-3.5 rounded-xl bg-[#1A1D24] border border-[#C4B5A0]/50 shadow-2xl flex items-center gap-4 text-xs text-[#F5F7FA]"
        >
          <span>{toastText}</span>
          <button
            type="button"
            onClick={() => {
              setToastText(null);
              setBagOpen(true);
            }}
            className="font-semibold text-[#C4B5A0] hover:text-white underline underline-offset-4 cursor-pointer whitespace-nowrap"
          >
            View Bag
          </button>
        </div>
      )}
    </div>
  );
}

import React, { useRef, useState } from 'react';
import { ArrowUpRight, Camera, Loader2, RotateCcw, Upload } from 'lucide-react';
import { WATCH_CATALOG, WatchReference } from '../data/watches';
import { WatchImage } from './WatchImage';

interface WatchAnalysisResult {
  subjectType: string;
  headline: string;
  caseAndDialAnalysis: string;
  movementAndCraftCues: string;
  stylingAndProportionNote: string;
  recommendedWatchIds: string[];
  recommendationRationale: string;
}

interface WatchAnalyzerSectionProps {
  onSelectWatch: (watch: WatchReference) => void;
}

const QUICK_INSPECT_SAMPLES = [
  { label: 'Inspect Sovereign Dress', watch: WATCH_CATALOG[0] },
  { label: 'Inspect Skeleton Rotor', watch: WATCH_CATALOG[2] },
];

export const WatchAnalyzerSection: React.FC<WatchAnalyzerSectionProps> = ({ onSelectWatch }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('image/jpeg');
  const [note, setNote] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<WatchAnalysisResult | null>(null);
  const [dragActive, setDragActive] = useState<boolean>(false);

  const handleFile = (file: File) => {
    setError(null);
    if (!file.type.startsWith('image/')) {
      setError('Please upload a JPEG, PNG, or WebP photograph.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('Image size must be under 10 MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = typeof reader.result === 'string' ? reader.result : '';
      setPreviewUrl(dataUrl);
      setImageBase64(dataUrl);
      setMimeType(file.type);
      setResult(null);
    };
    reader.readAsDataURL(file);
  };

  const handleLoadSample = async (watch: WatchReference) => {
    setError(null);
    setResult(null);
    try {
      const res = await fetch(watch.image);
      const blob = await res.blob();
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = typeof reader.result === 'string' ? reader.result : '';
        setPreviewUrl(dataUrl);
        setImageBase64(dataUrl);
        setMimeType(blob.type || 'image/jpeg');
        setNote(`Evaluate the dial, case architecture, and wrist pairing of this timepiece.`);
      };
      reader.readAsDataURL(blob);
    } catch {
      setError('Unable to load reference image. Please upload a photo from your device.');
    }
  };

  const handleAnalyze = async () => {
    if (!imageBase64) {
      setError('Please select or drop a watch or wrist photograph first.');
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/analyzer/inspect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64,
          mimeType,
          note: note.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Analysis failed. Please try again.');
      }
      setResult(data.analysis);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Unable to analyze photograph.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setPreviewUrl(null);
    setImageBase64(null);
    setNote('');
    setResult(null);
    setError(null);
  };

  const recommendedWatches = (result?.recommendedWatchIds ?? [])
    .map((id) => WATCH_CATALOG.find((w) => w.id === id))
    .filter((w): w is WatchReference => Boolean(w));

  return (
    <section id="analyzer" className="py-20 lg:py-24 border-b border-white/[0.08]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-white/[0.08]">
          <div className="max-w-2xl">
            <p className="text-xs font-mono tracking-[0.22em] text-[#C4B5A0]">
              ATELIER VISUAL APPRAISAL
            </p>
            <h2
              className="mt-2 font-display text-3xl sm:text-4xl lg:text-[42px] font-medium text-[#F5F7FA] leading-[1.1]"
              style={{ textWrap: 'balance' }}
            >
              Horological Photo Analyzer
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#9DA5B4] leading-relaxed">
              Upload a photograph of any wristwatch, wrist shot, or evening attire. Our visual horology engine appraises dial proportions, craftsmanship cues, and matches you with ideal 950 platinum automatic references.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {QUICK_INSPECT_SAMPLES.map((sample) => (
              <button
                key={sample.watch.id}
                type="button"
                onClick={() => handleLoadSample(sample.watch)}
                className="px-3.5 py-2 rounded-md bg-[#131519] hover:bg-[#1A1D24] border border-white/10 text-xs text-[#C7CDD8] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C4B5A0]"
              >
                {sample.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Upload & Prompt Controls */}
          <div className="lg:col-span-5 bg-[#131519] border border-white/[0.08] rounded-xl p-6">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFile(file);
              }}
            />

            {!previewUrl ? (
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragActive(true);
                }}
                onDragLeave={() => setDragActive(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragActive(false);
                  const file = e.dataTransfer.files?.[0];
                  if (file) handleFile(file);
                }}
                onClick={() => fileInputRef.current?.click()}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    fileInputRef.current?.click();
                  }
                }}
                className={`h-64 rounded-lg border border-dashed flex flex-col items-center justify-center p-6 text-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C4B5A0] ${
                  dragActive
                    ? 'border-[#C4B5A0] bg-[#1A1D24]'
                    : 'border-white/20 bg-[#0E1014] hover:border-white/35'
                }`}
              >
                <Upload className="w-7 h-7 text-[#C4B5A0] mb-3" aria-hidden="true" />
                <p className="text-sm font-medium text-[#F1F3F6]">
                  Drop a watch or wrist photo here
                </p>
                <p className="mt-1 text-xs text-[#8A919E]">
                  JPEG, PNG, or WebP up to 10 MB
                </p>
                <span className="mt-4 px-4 py-2 rounded-md bg-[#1A1D24] border border-white/10 text-xs font-medium text-[#E6E8EC]">
                  Browse Files
                </span>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden border border-white/10 bg-[#0B0C0E]">
                  <img
                    src={previewUrl}
                    alt="Uploaded timepiece or wrist photo preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={handleReset}
                    aria-label="Clear selected photograph"
                    className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#0B0C0E]/85 hover:bg-[#0B0C0E] border border-white/15 text-xs text-[#E6E8EC] cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Replace</span>
                  </button>
                </div>
              </div>
            )}

            <div className="mt-5">
              <label
                htmlFor="analyzer-note"
                className="block text-xs font-medium text-[#B2B8C4] mb-2"
              >
                Appraisal Focus (Optional)
              </label>
              <input
                id="analyzer-note"
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="e.g., Assess cuff fit, dial finish, or black-tie pairing"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0C0E] border border-white/15 text-sm text-[#F1F3F6] placeholder-[#6B7280] focus:outline-none focus:border-[#C4B5A0]"
              />
            </div>

            {error && (
              <div
                role="alert"
                className="mt-4 p-3.5 rounded-lg bg-red-950/40 border border-red-500/40 text-xs text-red-200"
              >
                {error}
              </div>
            )}

            <button
              type="button"
              onClick={handleAnalyze}
              disabled={loading || !imageBase64}
              className="mt-5 w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#C4B5A0] hover:bg-[#D5C7B3] disabled:opacity-45 disabled:cursor-not-allowed text-[#0B0C0E] text-sm font-semibold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                  <span>Appraising Photograph...</span>
                </>
              ) : (
                <>
                  <Camera className="w-4 h-4" aria-hidden="true" />
                  <span>Analyze Timepiece Photo</span>
                </>
              )}
            </button>
          </div>

          {/* Right: Structured Appraisal Report */}
          <div className="lg:col-span-7 bg-[#131519] border border-white/[0.08] rounded-xl p-6 lg:p-8 min-h-[420px] flex flex-col justify-between">
            {!result && !loading && (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-12 px-4">
                <p className="text-xs font-mono tracking-[0.2em] text-[#C4B5A0]">
                  AWAITING VISUAL INPUT
                </p>
                <h3 className="mt-2 font-display text-2xl text-[#F5F7FA]">
                  Instant Horological Assessment
                </h3>
                <p className="mt-2 text-sm text-[#8A919E] max-w-md leading-relaxed">
                  Upload a watch dial, wrist profile, or tailored cuff on the left—or select a sample reference above—to receive structured case, movement, and platinum matching insights.
                </p>
              </div>
            )}

            {loading && (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
                <Loader2 className="w-7 h-7 text-[#C4B5A0] animate-spin mb-4" aria-hidden="true" />
                <p className="font-display text-2xl text-[#F5F7FA]">
                  Examining Proportions &amp; Metal Finishes
                </p>
                <p className="mt-1.5 text-sm text-[#8A919E]">
                  Evaluating dial geometry, mechanical cues, and 950 platinum matches...
                </p>
              </div>
            )}

            {result && !loading && (
              <div className="space-y-6">
                <div className="pb-5 border-b border-white/[0.08]">
                  <span className="text-xs font-mono tracking-wider text-[#C4B5A0]">
                    {result.subjectType}
                  </span>
                  <h3 className="mt-1.5 font-display text-2xl sm:text-3xl text-[#F5F7FA]">
                    {result.headline}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-xs font-mono tracking-wider text-[#8A919E]">
                      CASE &amp; DIAL OBSERVATIONS
                    </h4>
                    <p className="mt-2 text-sm text-[#D4D8E0] leading-relaxed">
                      {result.caseAndDialAnalysis}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono tracking-wider text-[#8A919E]">
                      MOVEMENT &amp; CRAFT CUES
                    </h4>
                    <p className="mt-2 text-sm text-[#D4D8E0] leading-relaxed">
                      {result.movementAndCraftCues}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/[0.06]">
                  <h4 className="text-xs font-mono tracking-wider text-[#8A919E]">
                    PROPORTION &amp; PAIRING GUIDANCE
                  </h4>
                  <p className="mt-2 text-sm text-[#D4D8E0] leading-relaxed">
                    {result.stylingAndProportionNote}
                  </p>
                </div>

                {recommendedWatches.length > 0 && (
                  <div className="pt-5 border-t border-white/[0.08]">
                    <h4 className="text-xs font-mono tracking-wider text-[#C4B5A0]">
                      MATCHING HOME OF KING&apos;S AUTOMATICS
                    </h4>
                    <p className="mt-1.5 text-sm text-[#9DA5B4]">
                      {result.recommendationRationale}
                    </p>

                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {recommendedWatches.map((watch) => (
                        <button
                          key={watch.id}
                          type="button"
                          onClick={() => onSelectWatch(watch)}
                          className="flex items-center gap-3.5 p-3 rounded-lg bg-[#0E1014] hover:bg-[#191C23] border border-white/10 hover:border-[#C4B5A0]/50 text-left transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C4B5A0]"
                        >
                          <div className="w-16 h-12 rounded-md overflow-hidden shrink-0 bg-[#131519]">
                            <WatchImage
                              src={watch.image}
                              alt={watch.name}
                              title={watch.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-mono text-[#C4B5A0]">
                              {watch.reference}
                            </p>
                            <p className="text-sm font-medium text-[#F5F7FA] truncate">
                              {watch.name}
                            </p>
                          </div>
                          <ArrowUpRight className="w-4 h-4 text-[#8A919E] shrink-0" aria-hidden="true" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

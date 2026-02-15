"use client";

import { useState } from 'react';
import { Sparkles, Send, Image as ImageIcon, Calendar, Loader2 } from 'lucide-react';

export default function Home() {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      });
      const json = await res.json();
      setResult(json.data[0]);
    } catch (e) {
      alert("哎呀，蝦妹累了 🦐");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white text-black font-sans">
      {/* Header */}
      <nav className="border-b sticky top-0 bg-white/80 backdrop-blur-md z-10">
        <div className="max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tighter">Shrimp Post 🦐</h1>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-gray-100 border flex items-center justify-center">💅</div>
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Input Area */}
        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 shadow-sm mb-8">
          <h2 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wider">你想聊什麼主題？</h2>
          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="輸入任何你想發在 Threads 的主題... 例如：肉桂捲、AI創業、深夜emo"
            className="w-full bg-transparent border-none focus:ring-0 text-xl placeholder-gray-300 resize-none h-24"
          />
          <div className="flex justify-between items-center mt-4 border-t pt-4">
            <div className="flex gap-4 text-gray-400">
              <ImageIcon size={20} className="cursor-pointer hover:text-black transition-colors" />
              <Calendar size={20} className="cursor-pointer hover:text-black transition-colors" />
            </div>
            <button
              onClick={handleGenerate}
              disabled={loading || !topic}
              className="bg-black text-white px-6 py-2 rounded-full font-bold flex items-center gap-2 hover:opacity-80 transition-opacity disabled:opacity-30"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
              蝦妹產文
            </button>
          </div>
        </div>

        {/* Result Preview (Threads Style) */}
        {result && (
          <div className="border rounded-2xl p-4 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white shrink-0">🦐</div>
              <div className="flex-1">
                <div className="flex items-center gap-1 mb-1">
                  <span className="font-bold">shrimp_post_ai</span>
                  <span className="text-gray-400 text-sm">30s</span>
                </div>
                <p className="text-[15px] leading-relaxed whitespace-pre-wrap mb-4">
                  {result.text}
                </p>
                {result.imageUrl && (
                  <div className="rounded-xl overflow-hidden border mb-4">
                    <img src={result.imageUrl} alt="AI Preview" className="w-full h-auto object-cover max-h-[400px]" />
                  </div>
                )}
                <div className="flex gap-4 text-gray-500 pt-2">
                  <span className="hover:text-black cursor-pointer">♥︎</span>
                  <span className="hover:text-black cursor-pointer">💬</span>
                  <span className="hover:text-black cursor-pointer">⇄</span>
                  <span className="hover:text-black cursor-pointer">✈︎</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <footer className="py-12 text-center text-gray-400 text-xs">
        © 2026 Shrimp Post AI • 精明的人都在用 💅
      </footer>
    </main>
  );
}

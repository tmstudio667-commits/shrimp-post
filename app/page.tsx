"use client";

import { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ImageIcon, 
  Calendar, 
  Loader2, 
  User, 
  Settings, 
  History, 
  LayoutDashboard,
  Zap,
  ChevronRight,
  Heart,
  MessageCircle,
  Repeat,
  Send,
  MoreHorizontal
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('create');
  const [userProfile, setUserProfile] = useState({
    username: "TommyBoss_AI",
    style: "專業、幽默、愛用龍蝦與蝦妹表情符號",
    avatar: "🦐"
  });

  const handleGenerate = async () => {
    if (!topic) return;
    setLoading(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, userStyle: userProfile.style }),
      });
      const json = await res.json();
      setResults(prev => [...json.data, ...prev]);
    } catch (e) {
      alert("蝦妹累了，請稍後再試 🦐");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#101010] text-black dark:text-white transition-colors duration-300">
      {/* Sidebar Navigation */}
      <nav className="fixed left-0 top-0 bottom-0 w-20 md:w-64 border-r bg-white dark:bg-black dark:border-zinc-800 hidden sm:flex flex-col py-8 px-4 z-20">
        <div className="flex items-center gap-3 px-3 mb-12">
          <div className="w-10 h-10 bg-black dark:bg-white rounded-xl flex items-center justify-center text-white dark:text-black font-bold text-xl shadow-lg">🦐</div>
          <span className="font-bold text-xl tracking-tighter hidden md:block">Shrimp Post</span>
        </div>
        
        <div className="space-y-2 flex-1">
          <NavItem icon={<LayoutDashboard size={22} />} label="控制面板" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
          <NavItem icon={<Sparkles size={22} />} label="AI 創作" active={activeTab === 'create'} onClick={() => setActiveTab('create')} />
          <NavItem icon={<History size={22} />} label="歷史紀錄" active={activeTab === 'history'} onClick={() => setActiveTab('history')} />
          <NavItem icon={<Calendar size={22} />} label="排程管理" active={activeTab === 'schedule'} onClick={() => setActiveTab('schedule')} />
        </div>

        <div className="pt-8 border-t dark:border-zinc-800 space-y-2">
          <NavItem icon={<Settings size={22} />} label="設定" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
          <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-500 to-orange-400 flex items-center justify-center text-white text-sm">💅</div>
            <div className="hidden md:block">
              <p className="text-xs font-bold leading-tight">{userProfile.username}</p>
              <p className="text-[10px] text-zinc-400">Pro Plan</p>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="sm:ml-20 md:ml-64 p-4 md:p-8 max-w-5xl mx-auto">
        
        {/* Header Section */}
        <header className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-black tracking-tighter mb-1">精明產文 💅</h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">讓 AI 模仿你的靈魂，在 Threads 上閃閃發光。</p>
          </div>
          <div className="flex gap-2">
            <button className="p-2 rounded-full border dark:border-zinc-800 hover:bg-white dark:hover:bg-zinc-900 transition-all shadow-sm">
              <Zap size={20} className="text-yellow-500" />
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Editor Section */}
          <section className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-zinc-900 border dark:border-zinc-800 rounded-3xl p-6 shadow-xl shadow-zinc-200/50 dark:shadow-none">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1.5 h-6 bg-black dark:bg-white rounded-full"></div>
                <h3 className="font-bold">靈感輸入</h3>
              </div>
              
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="今天想聊點什麼？輸入主題、產品連結或甚至是一句廢話..."
                className="w-full bg-transparent border-none focus:ring-0 text-lg placeholder-zinc-300 dark:placeholder-zinc-700 resize-none h-40"
              />
              
              <div className="flex flex-wrap gap-2 mb-6">
                <Tag label="風格：蝦妹模式 💅" />
                <Tag label="長度：適中" />
                <Tag label="帶圖：開啟 ✨" />
              </div>

              <button
                onClick={handleGenerate}
                disabled={loading || !topic}
                className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:scale-[0.98] active:scale-95 transition-all disabled:opacity-30 shadow-xl shadow-zinc-400/20"
              >
                {loading ? <Loader2 className="animate-spin" size={24} /> : <Sparkles size={24} />}
                {loading ? "正在調教文案..." : "一鍵生成脆味文案"}
              </button>
            </div>

            <div className="bg-gradient-to-br from-zinc-900 to-black rounded-3xl p-6 text-white overflow-hidden relative group">
              <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-700">
                <ImageIcon size={120} />
              </div>
              <h4 className="font-bold text-sm text-zinc-400 mb-1 uppercase tracking-widest">目前方案</h4>
              <p className="text-2xl font-black mb-4">龍蝦進階版 🦞</p>
              <button className="text-xs bg-white/20 backdrop-blur-md px-4 py-2 rounded-full font-bold hover:bg-white/30 transition-all flex items-center gap-1">
                查看更多特權 <ChevronRight size={14} />
              </button>
            </div>
          </section>

          {/* Feed Preview Section */}
          <section className="lg:col-span-7">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-black text-xl tracking-tighter">預覽生成的「脆」 🧵</h3>
              <span className="text-xs text-zinc-400 font-medium">基於 TommyBoss 風格分析</span>
            </div>

            <AnimatePresence initial={false}>
              <div className="space-y-6">
                {results.length === 0 ? (
                  <div className="h-64 border-2 border-dashed dark:border-zinc-800 rounded-3xl flex flex-col items-center justify-center text-zinc-300 dark:text-zinc-700">
                    <Send size={48} className="mb-4 opacity-20" />
                    <p className="font-bold">生成的內容會出現在這裡喔 💅</p>
                  </div>
                ) : (
                  results.map((item, index) => (
                    <ThreadsCard key={index} item={item} />
                  ))
                )}
              </div>
            </AnimatePresence>
          </section>
        </div>
      </main>

      {/* Mobile Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-t dark:border-zinc-800 flex justify-around py-4 sm:hidden z-30">
        <LayoutDashboard size={24} className="text-zinc-400" />
        <Sparkles size={24} className="text-black dark:text-white" />
        <History size={24} className="text-zinc-400" />
        <User size={24} className="text-zinc-400" />
      </nav>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-4 p-3 rounded-2xl transition-all duration-200 group ${
        active 
        ? 'bg-black text-white dark:bg-white dark:text-black shadow-lg shadow-black/10' 
        : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900'
      }`}
    >
      <div className={`${active ? 'scale-110' : 'group-hover:scale-110'} transition-transform`}>{icon}</div>
      <span className="font-bold text-sm hidden md:block">{label}</span>
    </button>
  );
}

function Tag({ label }: any) {
  return (
    <span className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-tighter">
      {label}
    </span>
  );
}

function ThreadsCard({ item }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="bg-white dark:bg-zinc-900 border dark:border-zinc-800 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all group"
    >
      <div className="flex gap-4">
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-rose-500 to-orange-400 flex items-center justify-center text-white text-xl shadow-inner">💅</div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-black dark:bg-white rounded-full border-4 border-white dark:border-zinc-900 flex items-center justify-center text-[10px]">🦐</div>
          <div className="absolute top-14 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-zinc-100 dark:bg-zinc-800 group-last:hidden"></div>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <span className="font-black text-[15px] hover:underline cursor-pointer">tommyboss_ai</span>
              <span className="text-blue-500">✓</span>
              <span className="text-zinc-400 text-xs ml-1 font-medium">剛才</span>
            </div>
            <MoreHorizontal size={18} className="text-zinc-400 hover:text-black dark:hover:text-white cursor-pointer" />
          </div>
          
          <p className="text-[15px] leading-[1.6] text-zinc-800 dark:text-zinc-200 mb-4 whitespace-pre-wrap font-medium">
            {item.text}
          </p>
          
          {item.imageUrl && (
            <div className="rounded-2xl overflow-hidden border dark:border-zinc-800 mb-4 bg-zinc-50 dark:bg-zinc-950 aspect-square sm:aspect-video relative group/img">
              <img src={item.imageUrl} alt="AI Art" className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105" />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                <button className="bg-white/90 backdrop-blur-md text-black px-4 py-2 rounded-full text-xs font-bold shadow-xl">
                  下載原圖
                </button>
              </div>
            </div>
          )}
          
          <div className="flex gap-5 text-zinc-400">
            <button className="hover:text-rose-500 transition-colors flex items-center gap-1.5"><Heart size={20} /><span className="text-xs">88</span></button>
            <button className="hover:text-blue-500 transition-colors flex items-center gap-1.5"><MessageCircle size={20} /><span className="text-xs">12</span></button>
            <button className="hover:text-emerald-500 transition-colors flex items-center gap-1.5"><Repeat size={20} /><span className="text-xs">5</span></button>
            <button className="hover:text-black dark:hover:text-white transition-colors"><Send size={20} /></button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

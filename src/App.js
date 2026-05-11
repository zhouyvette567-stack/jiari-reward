import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PraiseGenerator from './components/PraiseGenerator';
import DailyReward from './components/DailyReward';
import BadgeSystem from './components/BadgeSystem';
import SandBottle from './components/SandBottle';

const FEATURES = [
  { id: 'praise', title: 'AI 夸夸生成器', desc: '输入一件小事，收获专属文学赞美', icon: '✨', gradient: 'from-rose-400 to-pink-500' },
  { id: 'reward', title: '心情盲盒', desc: '抽一支命运之签，开启今日惊喜', icon: '🎋', gradient: 'from-amber-400 to-orange-500' },
  { id: 'badge', title: '成就博物馆', desc: '收集你的每一枚闪光勋章', icon: '🏅', gradient: 'from-purple-400 to-indigo-500' },
];

function getGreeting() {
  const h = new Date().getHours();
  if (h < 6) return '夜深了';
  if (h < 11) return '早上好';
  if (h < 14) return '中午好';
  if (h < 18) return '下午好';
  return '晚上好';
}

function getDateStr() {
  const d = new Date();
  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日 星期${weekDays[d.getDay()]}`;
}

export default function App() {
  const [activeView, setActiveView] = useState(null);
  const [sandCount, setSandCount] = useState(() => {
    try { return Number(localStorage.getItem('jr_sand') || 0); } catch { return 0; }
  });
  const [badges, setBadges] = useState(() => {
    try { return JSON.parse(localStorage.getItem('jr_badges') || '[]'); } catch { return []; }
  });

  useEffect(() => {
    try { localStorage.setItem('jr_sand', sandCount); } catch {}
  }, [sandCount]);

  useEffect(() => {
    try { localStorage.setItem('jr_badges', JSON.stringify(badges)); } catch {}
  }, [badges]);

  const addSand = () => setSandCount(c => c + 1);

  const addBadge = (badge) => {
    if (!badges.find(b => b.id === badge.id)) {
      setBadges(prev => [...prev, { ...badge, unlockedAt: Date.now() }]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      {/* Top Nav */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between px-6 py-4 sm:px-10"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">🎁</span>
          <span className="text-xl font-bold bg-gradient-to-r from-amber-600 via-rose-500 to-purple-500 bg-clip-text text-transparent">
            奖励站
          </span>
        </div>
        <div className="text-right">
          <div className="text-sm text-stone-500 font-medium">{getGreeting()}</div>
          <div className="text-xs text-stone-400">{getDateStr()}</div>
        </div>
      </motion.header>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {!activeView ? (
          <motion.main
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col px-6 sm:px-10 pb-6"
          >
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-6 mb-8 text-center sm:text-left"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-stone-700">
                今天做了什么
                <span className="bg-gradient-to-r from-rose-500 to-amber-500 bg-clip-text text-transparent"> 值得奖励 </span>
                的事？
              </h2>
              <p className="mt-3 text-sm text-stone-400 leading-relaxed max-w-lg">
                哪怕只是按时起床、喝了一杯水，都值得被认真嘉奖
              </p>

              {/* Quick Input */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto sm:mx-0">
                <input
                  type="text"
                  placeholder="记录今天的一件小事..."
                  className="flex-1 px-5 py-3.5 rounded-2xl bg-white/80 backdrop-blur-sm border border-stone-100 text-sm text-stone-700 placeholder-stone-300 focus:ring-2 focus:ring-rose-200 focus:border-transparent focus:outline-none shadow-sm"
                  onKeyDown={e => {
                    if (e.key === 'Enter' && e.target.value.trim()) {
                      setActiveView('praise');
                    }
                  }}
                />
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveView('praise')}
                  className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-rose-400 to-amber-400 text-white font-medium text-sm shadow-lg shadow-rose-200/50 whitespace-nowrap"
                >
                  领取奖励
                </motion.button>
              </div>
            </motion.div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-auto">
              {FEATURES.map((f, i) => (
                <motion.div
                  key={f.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveView(f.id)}
                  className="cursor-pointer bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-stone-100/50 border border-white/50 transition-shadow hover:shadow-xl group"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center text-white text-xl mb-4 shadow-md`}>
                    {f.icon}
                  </div>
                  <h3 className="text-base font-bold text-stone-700 group-hover:text-rose-500 transition-colors">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-xs text-stone-400 leading-relaxed">
                    {f.desc}
                  </p>
                  <div className="mt-4 text-xs text-rose-400 font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    进入 <span className="text-sm">→</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.main>
        ) : (
          <motion.main
            key={activeView}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="flex-1 flex flex-col px-6 sm:px-10 pb-6"
          >
            {/* Back Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveView(null)}
              className="flex items-center gap-2 text-sm text-stone-400 hover:text-stone-600 transition-colors mb-4 mt-2"
            >
              <span className="text-lg">←</span> 返回首页
            </motion.button>

            {/* Page Title */}
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl font-bold text-stone-700 mb-6"
            >
              {activeView === 'praise' && '✨ AI 夸夸生成器'}
              {activeView === 'reward' && '🎋 心情盲盒'}
              {activeView === 'badge' && '🏅 成就博物馆'}
            </motion.h2>

            {/* Content */}
            <div className="flex-1 max-w-2xl mx-auto w-full">
              {activeView === 'praise' && <PraiseGenerator addSand={addSand} addBadge={addBadge} />}
              {activeView === 'reward' && <DailyReward addSand={addSand} addBadge={addBadge} />}
              {activeView === 'badge' && (
                <>
                  <BadgeSystem badges={badges} />
                  <div className="mt-8">
                    <h3 className="text-lg font-bold text-stone-700 mb-4">⏳ 幸福流沙瓶</h3>
                    <SandBottle count={sandCount} />
                  </div>
                </>
              )}
            </div>
          </motion.main>
        )}
      </AnimatePresence>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex items-center justify-between px-6 sm:px-10 py-4 border-t border-stone-100/50"
      >
        <p className="text-xs text-stone-300">用爱构建 · 今日嘉奖</p>
        <div className="flex gap-4 text-xs text-stone-300">
          <span className="hover:text-stone-500 cursor-pointer transition-colors">关于</span>
          <span className="hover:text-stone-500 cursor-pointer transition-colors">分享</span>
        </div>
      </motion.footer>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PraiseGenerator from './components/PraiseGenerator';
import DailyReward from './components/DailyReward';
import BadgeSystem from './components/BadgeSystem';
import SandBottle from './components/SandBottle';

const TABS = [
  { id: 'praise', label: 'AI 夸夸', icon: '✨' },
  { id: 'reward', label: '每日抽签', icon: '🎋' },
  { id: 'badge', label: '我的勋章', icon: '🏅' },
  { id: 'sand', label: '幸福流沙', icon: '⏳' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('praise');
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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-8 pb-4 text-center"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 via-rose-500 to-purple-500 bg-clip-text text-transparent">
          今日嘉奖
        </h1>
        <p className="mt-2 text-sm text-stone-400 tracking-widest">每一天都值得被温柔以待</p>
      </motion.header>

      {/* Tab Nav */}
      <nav className="flex justify-center gap-2 px-4 mb-6">
        {TABS.map(tab => (
          <motion.button
            key={tab.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-white text-rose-500 shadow-md'
                : 'text-stone-400 hover:text-stone-600'
            }`}
          >
            <span className="mr-1">{tab.icon}</span>{tab.label}
          </motion.button>
        ))}
      </nav>

      {/* Content */}
      <main className="max-w-lg mx-auto px-4 pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'praise' && <PraiseGenerator addSand={addSand} addBadge={addBadge} />}
            {activeTab === 'reward' && <DailyReward addSand={addSand} addBadge={addBadge} />}
            {activeTab === 'badge' && <BadgeSystem badges={badges} />}
            {activeTab === 'sand' && <SandBottle count={sandCount} />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-xs text-stone-300">
        用爱构建 · 今日嘉奖
      </footer>
    </div>
  );
}

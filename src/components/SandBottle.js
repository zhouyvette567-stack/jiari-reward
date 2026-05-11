import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const SAND_COLORS = [
  '#fbbf24', '#f59e0b', '#ef4444', '#ec4899', '#a855f7',
  '#6366f1', '#3b82f6', '#14b8a6', '#22c55e', '#f97316',
];

function generateGrains(count) {
  const grains = [];
  for (let i = 0; i < Math.min(count, 200); i++) {
    grains.push({
      id: i,
      x: 40 + Math.random() * 20,
      y: 30 + (count / 200) * 40 + Math.random() * (1 - count / 200) * 40,
      color: SAND_COLORS[i % SAND_COLORS.length],
      size: 2 + Math.random() * 3,
      delay: Math.random() * 0.5,
    });
  }
  return grains;
}

const MILESTONES = [
  { count: 10, label: '积沙成塔', emoji: '🏔️' },
  { count: 25, label: '温暖初现', emoji: '🌅' },
  { count: 50, label: '幸福满溢', emoji: '🌈' },
  { count: 100, label: '人间值得', emoji: '👑' },
  { count: 200, label: '传说级', emoji: '🌟' },
];

export default function SandBottle({ count }) {
  const grains = useMemo(() => generateGrains(count), [count]);
  const fillLevel = Math.min(count / 200, 1);
  const currentMilestone = MILESTONES.filter(m => count >= m.count).pop();

  return (
    <div className="text-center space-y-6">
      {/* Milestone Banner */}
      {currentMilestone && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-amber-100 to-rose-100 text-sm text-rose-600"
        >
          {currentMilestone.emoji} {currentMilestone.label}
        </motion.div>
      )}

      {/* Bottle */}
      <div className="relative mx-auto" style={{ width: 200, height: 280 }}>
        {/* Bottle SVG */}
        <svg viewBox="0 0 200 280" className="w-full h-full">
          {/* Bottle Outline */}
          <defs>
            <linearGradient id="bottleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef3c7" />
              <stop offset="100%" stopColor="#fce7f3" />
            </linearGradient>
            <clipPath id="bottleClip">
              <path d="M60,40 L60,80 Q30,100 30,140 L30,240 Q30,270 60,270 L140,270 Q170,270 170,240 L170,140 Q170,100 140,80 L140,40 Z" />
            </clipPath>
          </defs>

          {/* Bottle Body */}
          <path
            d="M60,40 L60,80 Q30,100 30,140 L30,240 Q30,270 60,270 L140,270 Q170,270 170,240 L170,140 Q170,100 140,80 L140,40 Z"
            fill="url(#bottleGrad)"
            stroke="#e7e5e4"
            strokeWidth="1.5"
            opacity="0.5"
          />

          {/* Bottle Neck */}
          <rect x="65" y="20" width="70" height="25" rx="5" fill="#fef3c7" stroke="#e7e5e4" strokeWidth="1.5" opacity="0.5" />

          {/* Cork */}
          <rect x="75" y="10" width="50" height="15" rx="4" fill="#d6a57a" />
          <rect x="80" y="8" width="40" height="6" rx="3" fill="#c4956a" />

          {/* Sand Fill */}
          {grains.map(g => (
            <motion.circle
              key={g.id}
              cx={g.x}
              cy={g.y}
              r={g.size}
              fill={g.color}
              opacity="0.8"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.8, scale: 1 }}
              transition={{ delay: g.delay * 0.01, duration: 0.3 }}
              clipPath="url(#bottleClip)"
            />
          ))}
        </svg>

        {/* Glow Effect */}
        {count > 0 && (
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-16 rounded-full blur-xl"
            style={{
              background: `rgba(251, 191, 36, ${fillLevel * 0.3})`,
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        )}
      </div>

      {/* Counter */}
      <div>
        <p className="text-3xl font-bold bg-gradient-to-r from-amber-500 to-rose-500 bg-clip-text text-transparent">
          {count}
        </p>
        <p className="text-xs text-stone-400 mt-1">颗幸福沙粒</p>
      </div>

      {/* Progress to next milestone */}
      <div className="px-6">
        {MILESTONES.map(m => (
          <div key={m.count} className="mb-2">
            <div className="flex justify-between text-xs text-stone-400 mb-1">
              <span>{m.emoji} {m.label}</span>
              <span>{Math.min(count, m.count)}/{m.count}</span>
            </div>
            <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-400 to-rose-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((count / m.count) * 100, 100)}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-stone-300 italic">
        每一次正向反馈，都是一颗闪闪发光的沙粒
      </p>
    </div>
  );
}

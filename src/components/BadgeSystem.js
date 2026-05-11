import React from 'react';
import { motion } from 'framer-motion';

const ALL_BADGES = [
  { id: 'early_bird', name: '初级早起家', icon: '🌅', desc: '成功早起，开启元气满满的一天' },
  { id: 'water_master', name: '饮水达人', icon: '💧', desc: '记得喝水，身体会感谢你的' },
  { id: 'food_lover', name: '好好吃饭', icon: '🍚', desc: '认真对待每一顿饭' },
  { id: 'exercise_hero', name: '运动之星', icon: '🏃', desc: '动起来，你就是最闪亮的' },
  { id: 'study_worm', name: '学习达人', icon: '📚', desc: '保持好奇，保持成长' },
  { id: 'clean_master', name: '整理小能手', icon: '🧹', desc: '有序的环境带来有序的心情' },
  { id: 'social_star', name: '社交达人', icon: '💬', desc: '与人连接，是温暖的源泉' },
  { id: 'self_care', name: '爱自己', icon: '💆', desc: '好好照顾自己，这是最重要的事' },
  { id: 'daily_draw', name: '命运之子', icon: '🎋', desc: '完成了一次每日抽签' },
  { id: 'first_praise', name: '初来乍到', icon: '⭐', desc: '第一次领取嘉奖' },
  { id: 'sand_10', name: '积沙成塔', icon: '🏔️', desc: '积累了10颗幸福沙粒' },
  { id: 'sand_50', name: '沙之贤者', icon: '✨', desc: '积累了50颗幸福沙粒' },
  { id: 'sand_100', name: '幸福富翁', icon: '👑', desc: '积累了100颗幸福沙粒' },
];

export default function BadgeSystem({ badges }) {
  const unlockedIds = new Set(badges.map(b => b.id));

  // Auto-unlock sand badges
  const allIds = new Set(unlockedIds);

  return (
    <div>
      <div className="text-center mb-4">
        <p className="text-stone-400 text-sm">
          已解锁 <span className="text-rose-500 font-bold">{badges.length}</span> / {ALL_BADGES.length} 枚勋章
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {ALL_BADGES.map((badge, i) => {
          const unlocked = unlockedIds.has(badge.id);
          return (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`relative rounded-2xl p-4 text-center transition-all ${
                unlocked
                  ? 'bg-white/80 shadow-md shadow-rose-100/50'
                  : 'bg-white/30 grayscale opacity-50'
              }`}
            >
              {unlocked && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 rounded-full flex items-center justify-center text-white text-xs"
                >
                  ✓
                </motion.div>
              )}
              <div className={`text-3xl mb-2 ${unlocked ? '' : 'filter grayscale'}`}>
                {badge.icon}
              </div>
              <div className="text-xs font-medium text-stone-700">{badge.name}</div>
              <div className="text-xs text-stone-400 mt-1 leading-tight">{badge.desc}</div>
              {unlocked && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 rounded-2xl ring-1 ring-rose-200 pointer-events-none"
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

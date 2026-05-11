import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TASKS = [
  { text: '去公园发呆10分钟，看云朵变幻', category: '放空' },
  { text: '买一支没喝过的饮料', category: '探索' },
  { text: '给老同学发一个表情包', category: '社交' },
  { text: '用手机拍一张"今天的颜色"', category: '观察' },
  { text: '手写一张便签贴在镜子上', category: '仪式感' },
  { text: '闭眼听一首完整的歌', category: '感知' },
  { text: '换一条不常走的路回家', category: '冒险' },
  { text: '给未来的自己写一句话', category: '时光' },
  { text: '整理手机相册，删掉不要的截图', category: '清理' },
  { text: '尝试用左手刷牙', category: '挑战' },
  { text: '给植物浇水或对窗外说声你好', category: '生命' },
  { text: '打开窗，深呼吸三次', category: '呼吸' },
  { text: '找一首从未听过的歌循环播放', category: '音乐' },
  { text: '画一个笑脸在便利贴上贴在冰箱', category: '快乐' },
  { text: '对自己说一句"你辛苦了"', category: '温柔' },
  { text: '整理一下桌面或书架的一个角落', category: '秩序' },
];

const FORTUNE_RESULTS = ['大吉', '中吉', '小吉', '吉'];

export default function DailyReward({ addSand, addBadge }) {
  const [isDrawing, setIsDrawing] = useState(false);
  const [result, setResult] = useState(null);
  const [fortune, setFortune] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const draw = () => {
    if (isDrawing) return;
    setIsDrawing(true);
    setShowResult(false);

    setTimeout(() => {
      const task = TASKS[Math.floor(Math.random() * TASKS.length)];
      const f = FORTUNE_RESULTS[Math.floor(Math.random() * FORTUNE_RESULTS.length)];
      setResult(task);
      setFortune(f);
      setIsDrawing(false);
      setShowResult(true);
      addSand();
      addBadge({ id: 'daily_draw', name: '命运之子', icon: '🎋', desc: '完成一次每日抽签' });
    }, 2000);
  };

  return (
    <div className="space-y-4">
      {/* Drawing Area */}
      <motion.div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg shadow-amber-100/50 p-8 text-center">
        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Divination Animation */}
              <div className="relative w-32 h-32 mx-auto mb-6">
                {/* Outer Ring */}
                <motion.div
                  animate={isDrawing ? { rotate: 360 } : { rotate: 0 }}
                  transition={isDrawing ? { repeat: Infinity, duration: 0.8, ease: 'linear' } : {}}
                  className="absolute inset-0 rounded-full border-2 border-dashed border-amber-300"
                />
                {/* Inner Content */}
                <div className="absolute inset-3 rounded-full bg-gradient-to-br from-amber-100 to-rose-100 flex items-center justify-center">
                  <motion.span
                    animate={isDrawing ? {
                      y: [0, -10, 0, 10, 0],
                      rotate: [0, -10, 10, -5, 0],
                    } : {}}
                    transition={isDrawing ? { repeat: Infinity, duration: 0.6 } : {}}
                    className="text-4xl"
                  >
                    {isDrawing ? '🎋' : '🔮'}
                  </motion.span>
                </div>
              </div>

              <p className="text-stone-400 text-sm mb-4">
                {isDrawing ? '命运之签正在旋转中...' : '点击抽签，领取今日命运任务'}
              </p>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={draw}
                disabled={isDrawing}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-orange-400 text-white font-medium text-sm shadow-md shadow-amber-200/50 disabled:opacity-40"
              >
                {isDrawing ? '摇签中...' : '摇一摇抽签'}
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              {/* Fortune Tag */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
                className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-red-500 to-amber-500 text-white text-lg font-bold mb-4"
              >
                {fortune}
              </motion.div>

              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-5 mb-4">
                <p className="text-xs text-stone-400 mb-2">🏷️ {result.category}</p>
                <p className="text-stone-700 text-base leading-relaxed">{result.text}</p>
              </div>

              <p className="text-stone-400 text-xs mb-4">完成这个任务，又是闪闪发光的一天 ✨</p>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowResult(false)}
                className="px-6 py-2.5 rounded-xl bg-stone-100 text-stone-500 text-sm"
              >
                再抽一次
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

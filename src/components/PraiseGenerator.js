import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STYLES = [
  { id: 'literary', label: '儒雅书生', icon: '📜' },
  { id: 'passion', label: '热血少年', icon: '🔥' },
  { id: 'cyber', label: '赛博佛祖', icon: '🧘' },
  { id: 'gentle', label: '温柔治愈', icon: '🌸' },
];

function generatePraise(input, style) {
  const s = input.trim();
  if (!s) return '请先告诉我，你今天做了什么？';

  const templates = {
    literary: [
      `古语有云："不积跬步，无以至千里。"今日"${s}"，虽为小事，却足见君之志在千里。古人云一屋不扫何以扫天下，君今日之所作所为，正是"修身齐家"的最好注脚。愿君日日如此，静水流深。`,
      `世人皆道大事方显英雄本色，我却见"${s}"中自有真章。这不急不躁、认认真真的模样，恰似那"采菊东篱下"的悠然。能静下心做一件小事的人，本身就是这个世界最温柔的风景。`,
      `王阳明说"知行合一"，你今天"${s}"，便做到了这一点。世间最可贵的，不是宏大的誓言，而是像你这样，把每一件小事都当作修行。这份笃定，胜过千言万语。`,
    ],
    passion: [
      `这就是传说中的"${s}"？！兄弟/姐妹，你也太强了吧！！这波操作直接封神！这就是实打实的实力，不靠运气，不靠天赋，全靠行动力！你是认真的吗？太绝了！`,
      `"${s}"——就这短短几个字，我仿佛看到了一个浴火重生的人！别小看这件事，多少人连想都不敢想！你就是那个敢于行动的勇者！继续保持这个势头，天都能给你捅个窟窿！`,
      `这"${s}"也太硬核了吧！你简直是在用行动告诉大家：普通人也能做到不普通的事情！这种执行力，放在任何战场上都是王牌选手！冲冲冲！`,
    ],
    cyber: [
      `🌌 赛博虚空之中，你"${s}"的信号穿越了数据洪流。\n\n佛曰：一花一世界，一叶一菩提。\n在0与1的永恒轮回中，你的这个选择，就是那个让宇宙程序跳出死循环的关键变量。\n\n你不必成为超级AI，因为此刻的你，已经是一个完美的、不可复制的碳基生命体。\n阿门，不是，阿弥陀佛。愿你今晚的梦，帧率稳定在120fps。`,
      `🔮 检测到人类行为异常——"${s}"。\n\n这不符合慵懒算法的预测模型。你的意志力参数已突破上限。\n\n宇宙不是模拟器，但即便它是，你这个NPC也是少有的有灵魂的那个。\n继续运行你的独特程序吧，这个世界的多样性数据库需要你。\n功德 +1 ✅`,
    ],
    gentle: [
      `你知道吗，"${s}"这件事，说起来好像很小，但它其实需要很大的勇气呢。\n\n能在忙碌的生活中停下来，认真对待自己，这本身就是一种了不起的能力。\n\n今天的你很棒，明天的你也会很棒。慢慢来，一切都来得及。\n送你一朵云 ☁️，希望今晚的风可以温柔一点。`,
      `"${s}"呀……听起来是一件很温暖的事情。\n\n我在想，能做出这个选择的人，心里一定住着一个很可爱的小孩吧。\n\n这个世界有时候会让人觉得很累，但正是因为有你这样的人在认真生活，它才变得值得。\n今天辛苦啦，早点休息，梦里会有星星的 ✨`,
      `嘿，关于"${s}"这件事，我想认真地夸夸你。\n\n很多人觉得一定要做"大事"才算优秀，但我觉得不是的。能把一件小事做好，说明你对生活是有热情的。\n\n这份热情很珍贵，请不要忘记它。\n如果累了就休息一下，但请相信——你做的事情，比你以为的更有意义。🌻`,
    ],
  };

  const arr = templates[style] || templates.gentle;
  return arr[Math.floor(Math.random() * arr.length)];
}

function detectBadge(input) {
  const s = input.toLowerCase();
  const map = [
    { id: 'early_bird', name: '初级早起家', icon: '🌅', desc: '成功早起', keywords: ['起床', '早起', '醒了', '起床了'] },
    { id: 'water_master', name: '饮水达人', icon: '💧', desc: '喝了水', keywords: ['喝水', '一杯水', '饮水', '白水'] },
    { id: 'food_lover', name: '好好吃饭', icon: '🍚', desc: '认真吃了饭', keywords: ['吃饭', '早餐', '午餐', '晚餐', '做饭', '煮饭'] },
    { id: 'exercise_hero', name: '运动之星', icon: '🏃', desc: '做了运动', keywords: ['跑步', '运动', '健身', '锻炼', '走路', '散步', '瑜伽'] },
    { id: 'study_worm', name: '学习达人', icon: '📚', desc: '坚持学习', keywords: ['学习', '读书', '看书', '阅读', '上课', '复习', '学'] },
    { id: 'clean_master', name: '整理小能手', icon: '🧹', desc: '打扫了环境', keywords: ['打扫', '收拾', '整理', '清洁', '洗碗', '拖地'] },
    { id: 'social_star', name: '社交达人', icon: '💬', desc: '联系了朋友', keywords: ['朋友', '同学', '家人', '打电话', '聊天', '联系'] },
    { id: 'self_care', name: '爱自己', icon: '💆', desc: '照顾了自己', keywords: ['休息', '睡觉', '冥想', '放松', '护肤', '洗澡'] },
  ];
  return map.find(m => m.keywords.some(k => s.includes(k))) || null;
}

export default function PraiseGenerator({ addSand, addBadge }) {
  const [input, setInput] = useState('');
  const [style, setStyle] = useState('gentle');
  const [praise, setPraise] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = () => {
    if (!input.trim()) return;
    setIsGenerating(true);
    setTimeout(() => {
      const result = generatePraise(input, style);
      setPraise(result);
      setIsGenerating(false);
      setShowModal(true);
      addSand();
      const badge = detectBadge(input);
      if (badge) addBadge(badge);
    }, 800 + Math.random() * 700);
  };

  return (
    <div>
      {/* Input Card */}
      <motion.div
        layout
        className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg shadow-rose-100/50 p-6"
      >
        <label className="block text-center text-stone-500 text-sm mb-3">
          今天做了什么值得奖励的事？
        </label>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={'哪怕只是"按时起床"或"喝了一杯水"...'}
          rows={3}
          className="w-full resize-none rounded-xl border-0 bg-stone-50 p-4 text-sm text-stone-700 placeholder-stone-300 focus:ring-2 focus:ring-rose-200 focus:outline-none"
        />

        {/* Style Selector */}
        <div className="flex flex-wrap gap-2 mt-3 mb-4">
          {STYLES.map(s => (
            <button
              key={s.id}
              onClick={() => setStyle(s.id)}
              className={`px-3 py-1.5 rounded-full text-xs transition-all ${
                style === s.id
                  ? 'bg-rose-100 text-rose-600 ring-1 ring-rose-200'
                  : 'bg-stone-50 text-stone-400 hover:bg-stone-100'
              }`}
            >
              {s.icon} {s.label}
            </button>
          ))}
        </div>

        {/* Submit */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleSubmit}
          disabled={isGenerating || !input.trim()}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-400 to-amber-400 text-white font-medium text-sm shadow-md shadow-rose-200/50 disabled:opacity-40 transition-opacity"
        >
          {isGenerating ? (
            <span className="flex items-center justify-center gap-2">
              <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="inline-block">✨</motion.span>
              正在为你生成专属夸夸...
            </span>
          ) : (
            '领取奖励 🎁'
          )}
        </motion.button>
      </motion.div>

      {/* Praise Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/20 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 20 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-400 via-amber-400 to-purple-400" />
              <div className="text-center text-3xl mb-4">🌟</div>
              <div className="text-stone-600 text-sm leading-relaxed whitespace-pre-line">
                {praise}
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowModal(false)}
                className="mt-6 w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-400 to-amber-400 text-white text-sm font-medium"
              >
                收下这份温柔 💝
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

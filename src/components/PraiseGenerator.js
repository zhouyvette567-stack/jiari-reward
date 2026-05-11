import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STYLES = [
  { id: 'literary', label: '儒雅书生', icon: '📜' },
  { id: 'passion', label: '热血少年', icon: '🔥' },
  { id: 'cyber', label: '赛博佛祖', icon: '🧘' },
  { id: 'gentle', label: '温柔治愈', icon: '🌸' },
];

const STYLE_PROMPTS = {
  literary: '你是一位儒雅的书生，说话用词古风雅致，引用古诗词和名言。你的赞美有文学气息，用词考究。',
  passion: '你是一位热血少年，说话充满激情和能量。你的赞美充满力量，用感叹号，语气激动，像在为朋友打call。',
  cyber: '你是一位"赛博佛祖"，融合了佛教哲学和赛博朋克风格。你用宇宙、数据、算法等科技隐喻来解读人生。说话既有禅意又有趣味。偶尔用emoji。',
  gentle: '你是一位温柔治愈的朋友，说话温暖细腻，像在给朋友写一封信。你的赞美真诚不做作，让人感到被理解和接纳。',
};

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

// Fallback templates when API is unavailable (multiple per style for variety)
const FALLBACKS = {
  literary: [
    '古语有云："不积跬步，无以至千里。"你今日所为，虽为小事，却足见志在千里。古人云"千里之行始于足下"，你正在用每一天的小行动，丈量属于自己的山河。愿君日日如此，静水流深。',
    '王阳明有言："知行合一。"你今日之所作所为，正是将善意与自律化为行动的最佳诠释。世间最难得的不是宏大的誓言，而是日复一日的坚持。你的这份踏实，值得被看见。',
    '苏轼曾写道："古之立大事者，不惟有超世之才，亦必有坚忍不拔之志。"你今日虽行的是小事，却彰显了不凡的意志。请继续保持这份笃定，时光终将给你最好的回答。',
    '《论语》有言："德不孤，必有邻。"你用行动证明了，善良和自律从来不是孤独的事。今日的小小努力，如同播下一颗种子，终会在某个春天开出灿烂的花来。',
  ],
  passion: [
    '这也太强了吧！！这波操作直接封神！不靠运气，全靠行动力！你知道多少人光想想就放弃了吗？你直接就是做了！这种执行力真的是顶配！继续保持这个势头，冲冲冲！',
    '我直接给你跪了！！这也太厉害了吧！别看这件事好像很简单，但能做到的人真的不多！你就是那种说到做到的行动派！我宣布，今天的最佳玩家就是你！继续炸裂输出！',
    '天呐天呐天呐！！你做到了！你知道这背后需要多大的自律和决心吗？别人还在犹豫的时候，你已经把事情做完了！这种不废话、直接干的作风，我真的是服到五体投地！',
    '卧槽这也太猛了！！每次看到你这样做，都觉得你整个人在发光诶！不是夸张，能做到这种小事坚持的人，格局真的不一样！你就是未来的大佬，我说的！冲就完了！',
  ],
  cyber: [
    '📡 检测到碳基生命体执行了一次高难度操作。你的意志力参数已突破上限，自律指标飙升至99.7%。系统判定：你正在以量子级别的稳定度进化。宇宙已记录此次壮举。功德+1。🔋',
    '🧠 意识上传进度：今日份额已完成。检测到你的多巴胺回路正在优化，韧性参数持续攀升。你以为这只是小事？不，这是你的自我迭代程序在运行。版本号已更新。功德+1。✨',
    '⚡ 警告：检测到高能量个体。你的行动数据已被标记为"优秀模板"，将在下一个文明周期作为参考案例。这不是小事，这是你在改写自己的底层代码。功德+1。🔮',
    '🌐 量子纠缠报告：你今日的行为已与未来的自己产生共振。概率波函数坍缩结果显示——你正在走向一个很棒的方向。不要停下，宇宙正在为你铺路。功德+1。🌟',
  ],
  gentle: [
    '你知道吗，这件事说起来好像很小，但它其实需要很大的勇气和自律呢。很多人想做但一直没做，而你做到了——光是这一点，就已经非常了不起了。今天的你很棒，慢慢来，一切都来得及。',
    '我特别想告诉你：你值得被好好看见。这件事也许在你的计划里只是很小的一部分，但对我来说，你愿意去做本身就很珍贵。辛苦了，记得也好好犒劳自己一下哦。',
    '有时候我觉得，最动人的不是那些轰轰烈烈的大事，而是像今天这样，安安静静地做了一件对自己好的小事。这本身就是一种很了不起的能力——照顾好自己的能力。你做得很好，真的。',
    '嘿，谢谢你今天这么努力。我不知道你经历了什么才走到这一步，但我知道这并不容易。每一次小小的好习惯，都是你对自己温柔的方式。今天也辛苦了，晚安前记得给自己一个拥抱。',
  ],
};

function getFallback(style) {
  const list = FALLBACKS[style] || FALLBACKS.gentle;
  return list[Math.floor(Math.random() * list.length)];
}

async function callDeepSeek(input, style) {
  const systemPrompt = `${STYLE_PROMPTS[style] || STYLE_PROMPTS.gentle}

规则：
1. 用户会告诉你今天做的一件小事，你要认真夸奖这件事。
2. 不要泛泛地说"你真棒"，要针对用户具体做了什么事进行深入分析——这件事体现了什么品质（意志力、自律、善良、自我关怀等），为什么值得被肯定。
3. 回复至少3句话，控制在150-300字之间。要有层次感，从具体事件到品质分析再到温暖鼓励。
4. 直接输出夸奖内容，不要加引号、标题或多余格式。`;

  try {
    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer sk-c4ec8225108e4db9af2c5581bff8f7db',
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `今天我${input}` },
        ],
        max_tokens: 500,
        temperature: 0.9,
      }),
    });

    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || null;
  } catch (err) {
    console.error('DeepSeek API error:', err);
    return null; // null means use fallback
  }
}

export default function PraiseGenerator({ addSand, addBadge }) {
  const [input, setInput] = useState('');
  const [style, setStyle] = useState('gentle');
  const [praise, setPraise] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = async () => {
    if (!input.trim() || isGenerating) return;
    setIsGenerating(true);

    // Show loading for at least 1s for better UX
    const apiPromise = callDeepSeek(input, style);
    const minDelay = new Promise(resolve => setTimeout(resolve, 1000));

    const result = await apiPromise;
    await minDelay;

    const finalPraise = result || getFallback(style);
    setPraise(finalPraise);
    setIsGenerating(false);
    setShowModal(true);
    addSand();

    const badge = detectBadge(input);
    if (badge) addBadge(badge);
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
              AI 正在为你生成专属夸夸...
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

import fs from 'fs';
import path from 'path';

// Read N5 data
const n5Data = JSON.parse(
  fs.readFileSync('/Users/stuarttse/japanese-analyzer/data/n5_only.json', 'utf8')
);

console.log(`Total N5 words: ${n5Data.length}`);

// Category definitions with grouping logic
const categoryGroups = {
  greetings: {
    keywords: ['你好', '再见', '谢谢', '对不起', '请', '早上', '晚上', '是', '不', '好'],
    pos: []
  },
  numbers: {
    keywords: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '十', '百', '千', '万', '第', '次', '个', '岁', '号', '分', '元'],
    pos: []
  },
  time: {
    keywords: ['时间', '点', '分', '秒', '年', '月', '日', '星期', '今天', '明天', '昨天', '现在', '早上', '上午', '中午', '下午', '晚上', '夜', '时候', '前', '后', '每', '小时', '周', '曜日'],
    pos: []
  },
  people: {
    keywords: ['我', '你', '他', '她', '人', '朋友', '家人', '父', '母', '孩子', '男', '女', '先生', '小姐', '老师', '学生', '名字', '谁', '大家'],
    pos: []
  },
  body: {
    keywords: ['身体', '头', '手', '脚', '眼', '耳', '口', '鼻', '心', '病', '健康', '疼', '死'],
    pos: []
  },
  food: {
    keywords: ['吃', '喝', '饭', '菜', '肉', '鱼', '蛋', '水', '茶', '咖啡', '牛奶', '酒', '面包', '面', '米', '水果', '味道', '甜', '辣', '餐厅', '食堂'],
    pos: []
  },
  places: {
    keywords: ['地方', '国家', '日本', '中国', '东京', '城市', '家', '房间', '厕所', '门', '窗', '桌子', '椅子', '床', '学校', '公司', '医院', '店', '银行', '邮局', '车站', '机场', '公园', '图书馆', '上', '下', '里', '外', '前', '后', '左', '右', '旁边', '中间', '附近', '边'],
    pos: []
  },
  transport: {
    keywords: ['车', '电车', '汽车', '自行车', '飞机', '船', '路', '走', '去', '来', '回', '出', '到', '站'],
    pos: []
  },
  nature: {
    keywords: ['天气', '雨', '雪', '风', '云', '晴', '热', '冷', '暖', '凉', '山', '川', '海', '树', '花', '鸟', '猫', '狗', '动物', '虫'],
    pos: []
  },
  shopping: {
    keywords: ['买', '卖', '钱', '元', '高', '便宜', '价格', '多少'],
    pos: []
  },
  home: {
    keywords: ['东西', '物', '本', '纸', '笔', '包', '箱', '钥匙', '伞', '电话', '电视', '收音机', '照片', '钟', '衣服', '帽子', '鞋'],
    pos: []
  },
  school: {
    keywords: ['学', '教', '字', '汉字', '语', '英语', '数学', '考试', '问题', '答案', '课', '作业', '休息', '读', '写', '听', '说'],
    pos: []
  },
  actions: {
    keywords: [],
    pos: ['verb', 'v-irregular', 'v-godan', 'v-ichidan']
  },
  adjectives: {
    keywords: [],
    pos: ['adjective', 'adj-i', 'adj-na', 'adj-no']
  },
  adverbs: {
    keywords: [],
    pos: ['adverb']
  },
  particles: {
    keywords: [],
    pos: ['particle']
  },
  expressions: {
    keywords: ['什么', '怎么', '为什么', '哪', '这', '那', '很', '非常', '一点', '一起', '都', '也', '只', '才', '就', '还', '更', '最'],
    pos: ['pronoun', 'conjunction', 'interjection']
  }
};

// Helper function to check if word matches category
function matchesCategory(word, category) {
  const config = categoryGroups[category];
  const meaning = word.meaning_zh_CN || '';
  const pos = word.pos || '';

  // Check POS match
  if (config.pos.length > 0) {
    if (config.pos.some(p => pos.toLowerCase().includes(p.toLowerCase()))) {
      return true;
    }
  }

  // Check keyword match
  if (config.keywords.length > 0) {
    if (config.keywords.some(kw => meaning.includes(kw))) {
      return true;
    }
  }

  return false;
}

// Group words by category
const categorized = {};
const usedWords = new Set();

Object.keys(categoryGroups).forEach(category => {
  categorized[category] = [];
});

// First pass: categorize all words
n5Data.forEach(word => {
  for (const category of Object.keys(categoryGroups)) {
    if (matchesCategory(word, category)) {
      categorized[category].push(word);
      usedWords.add(word.word);
      break; // Each word goes to first matching category
    }
  }
});

// Check for uncategorized words
const uncategorized = n5Data.filter(w => !usedWords.has(w.word));
console.log(`\nCategorization stats:`);
Object.keys(categorized).forEach(cat => {
  console.log(`  ${cat}: ${categorized[cat].length} words`);
});
console.log(`  uncategorized: ${uncategorized.length} words`);

// Add uncategorized nouns to appropriate categories
uncategorized.forEach(word => {
  if (!usedWords.has(word.word)) {
    const pos = (word.pos || '').toLowerCase();

    // Distribute by POS
    if (pos.includes('verb')) {
      categorized.actions.push(word);
    } else if (pos.includes('adj')) {
      categorized.adjectives.push(word);
    } else if (pos.includes('adverb')) {
      categorized.adverbs.push(word);
    } else if (pos.includes('particle')) {
      categorized.particles.push(word);
    } else {
      // Default to expressions
      categorized.expressions.push(word);
    }
    usedWords.add(word.word);
  }
});

console.log(`\nAfter redistribution:`);
Object.keys(categorized).forEach(cat => {
  console.log(`  ${cat}: ${categorized[cat].length} words`);
});

// Create packs with smart merging
const packs = [];
let globalOrder = 1;

const categoryNames = {
  greetings: { zh: '问候表达', en: 'Greetings & Expressions' },
  numbers: { zh: '数字计数', en: 'Numbers & Counting' },
  time: { zh: '时间日期', en: 'Time & Date' },
  people: { zh: '人物称呼', en: 'People & Relationships' },
  body: { zh: '身体健康', en: 'Body & Health' },
  food: { zh: '饮食相关', en: 'Food & Dining' },
  places: { zh: '场所方位', en: 'Places & Locations' },
  transport: { zh: '交通出行', en: 'Transportation' },
  nature: { zh: '天气自然', en: 'Nature & Weather' },
  shopping: { zh: '购物消费', en: 'Shopping' },
  home: { zh: '居家物品', en: 'Home & Objects' },
  school: { zh: '学校教育', en: 'School & Education' },
  actions: { zh: '动作行为', en: 'Actions & Verbs' },
  adjectives: { zh: '形容词', en: 'Adjectives' },
  adverbs: { zh: '副词', en: 'Adverbs' },
  particles: { zh: '助词语法', en: 'Particles & Grammar' },
  expressions: { zh: '常用表达', en: 'Common Expressions' }
};

const categoryDescriptions = {
  greetings: '日常问候和寒暄用语',
  numbers: '数字表达和计数方式',
  time: '时间日期相关词汇',
  people: '人物关系和称呼',
  body: '身体部位和健康相关',
  food: '饮食和餐饮词汇',
  places: '地点场所和方位词',
  transport: '交通工具和出行',
  nature: '天气自然和动植物',
  shopping: '购物和消费场景',
  home: '家居物品和日常用品',
  school: '学习教育相关词汇',
  actions: '动词和动作表达',
  adjectives: '形容词和描述词',
  adverbs: '副词和程度表达',
  particles: '语法助词和功能词',
  expressions: '常用表达和疑问词'
};

// Merge small categories with related ones
const merged = { ...categorized };

// Merge transport into places (both location-related)
if (merged.transport.length < 15) {
  merged.places = [...merged.places, ...merged.transport];
  merged.transport = [];
}

// Merge shopping into food (both daily life)
if (merged.shopping.length < 15) {
  merged.food = [...merged.food, ...merged.shopping];
  merged.shopping = [];
}

// Merge school into expressions if small
if (merged.school.length < 15) {
  merged.expressions = [...merged.expressions, ...merged.school];
  merged.school = [];
}

// Merge home into places if small
if (merged.home.length < 15) {
  merged.places = [...merged.places, ...merged.home];
  merged.home = [];
}

Object.keys(categoryGroups).forEach(category => {
  const words = merged[category];
  if (!words || words.length === 0) return;

  const packSize = 15;
  const minPackSize = 10; // Minimum words per pack

  // Calculate number of packs needed
  const numPacks = Math.ceil(words.length / packSize);

  for (let i = 0; i < numPacks; i++) {
    const startIdx = i * packSize;
    let endIdx = Math.min(startIdx + packSize, words.length);

    // If last pack would be too small, merge with previous
    if (i === numPacks - 1 && (words.length - startIdx) < minPackSize && i > 0) {
      continue; // Skip, will be merged with previous pack
    }

    // If this is second-to-last pack and last would be small, take more words
    if (i === numPacks - 2 && (words.length - endIdx) < minPackSize) {
      endIdx = words.length; // Take all remaining words
    }

    const packWords = words.slice(startIdx, endIdx);

    if (packWords.length === 0) continue;

    const actualNumPacks = Math.ceil(words.length / packSize);
    const packNumber = actualNumPacks > 1 ? i + 1 : null;
    const packId = packNumber
      ? `${category}-${packNumber}`
      : category;

    const nameSuffix = packNumber ? ` ${packNumber}` : '';

    packs.push({
      packId,
      name_zh_CN: categoryNames[category].zh + nameSuffix,
      name_en: categoryNames[category].en + (packNumber ? ` ${packNumber}` : ''),
      description_zh_CN: categoryDescriptions[category],
      category,
      jlptLevel: 'N5',
      words: packWords.map(w => w.word),
      order: globalOrder++
    });
  }
});

// Verify total word count
const totalWords = packs.reduce((sum, pack) => sum + pack.words.length, 0);
console.log(`\nTotal packs created: ${packs.length}`);
console.log(`Total words in packs: ${totalWords}`);
console.log(`Expected: 681`);

if (totalWords !== 681) {
  console.error(`WARNING: Word count mismatch! Expected 681, got ${totalWords}`);
  process.exit(1);
}

// Write to file
const outputPath = '/Users/stuarttse/japanese-analyzer/japanese-analyzer-api/data/n5_packs_seed.json';
fs.writeFileSync(outputPath, JSON.stringify(packs, null, 2), 'utf8');

console.log(`\n✓ Successfully generated ${outputPath}`);
console.log(`\nPack summary:`);
packs.forEach(pack => {
  console.log(`  ${pack.packId}: ${pack.words.length} words`);
});

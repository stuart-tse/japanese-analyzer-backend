// Generate N5 vocabulary pack seed data
// Groups all 681 N5 words into ~45 themed packs of ~15 words

const fs = require('fs');
const path = require('path');

const data = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../../data/jlpt_vocabulary_all.json'), 'utf-8')
);
const n5 = data.filter(w => w.jlptLevel === 'N5');

// Track which words have been assigned
const assigned = new Set();
const packs = [];
let orderCounter = 1;

function addPack(packId, name_zh_CN, name_en, description_zh_CN, category, words) {
  words.forEach(w => assigned.add(w));
  packs.push({
    packId,
    name_zh_CN,
    name_en,
    description_zh_CN,
    category,
    jlptLevel: 'N5',
    words,
    order: orderCounter++,
  });
}

// Helper: find N5 words matching criteria
function findWords(filterFn) {
  return n5.filter(w => !assigned.has(w.word) && filterFn(w)).map(w => w.word);
}

// Helper: split array into chunks of ~size
function chunk(arr, size) {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

// ============================================================
// 1. Numbers & Counting
// ============================================================
const numberWords = findWords(w =>
  w.pos === 'noun' && /^\d+$|^[一二三四五六七八九十百千万]/.test(w.meaning_zh_CN) ||
  ['いち','に','さん','よん/し','ご','ろく','なな/しち','はち','きゅう/く','じゅう',
   'じゅういち','じゅうに','じゅうよん','にじゅう','さんじゅう','さんじゅういち','ひゃく'].includes(w.word)
);
addPack('numbers-1', '数字基础', 'Basic Numbers', '基本数字1-100', 'numbers', numberWords);

// ============================================================
// 2. Time & Calendar
// ============================================================
const dayOfWeek = findWords(w => w.word.includes('曜日'));
const timeRelative = findWords(w =>
  ['おととい','昨日','今日','明日','あさって','先週','今週','来週',
   '先月','今月','来月','去年','今年','来年','毎日','毎週','毎晩',
   '今朝','今晩','昨日の夜','誕生日'].includes(w.word)
);
const seasonWords = findWords(w => ['季節','春','夏','秋','冬'].includes(w.word));
addPack('time-1', '星期与日历', 'Days & Calendar', '星期和日历相关词汇', 'time', dayOfWeek);
addPack('time-2', '时间表达', 'Time Expressions', '日期和时间相关表达', 'time', [...timeRelative, ...seasonWords]);

// ============================================================
// 3. People & Family
// ============================================================
const familyWords = findWords(w =>
  ['家族','友達','兄弟','男/男性','女/女性','両親','子供','孫',
   '父','お父さん','母','お母さん','兄','お兄さん','姉','お姉さん'].includes(w.word)
);
const familyWords2 = findWords(w =>
  ['弟','弟さん','妹','妹さん','祖父','祖母','叔父／伯父','叔母／伯母',
   '夫','ご主人','妻','奧さん','息子','息子さん','娘','お嬢さん'].includes(w.word)
);
addPack('people-1', '家人称呼(一)', 'Family Part 1', '家庭成员的称呼', 'people', familyWords);
addPack('people-2', '家人称呼(二)', 'Family Part 2', '更多家庭成员称呼', 'people', familyWords2);

// Occupations
const jobWords = findWords(w =>
  ['銀行員','会社員','医者','先生','エンジニア','店員','歌手','警察官','学生','主婦'].includes(w.word)
);
addPack('people-3', '职业', 'Occupations', '常见职业词汇', 'people', jobWords);

// ============================================================
// 4. Places & Buildings
// ============================================================
const placeWords1 = findWords(w =>
  ['銀行','郵便局','薬屋/薬局','病院','会社','スーパー','喫茶店/ カフェ',
   'レストラン','デパート','映画館','本屋','花屋','ケーキ屋','ラーメン屋','コンビニ'].includes(w.word)
);
const placeWords2 = findWords(w =>
  ['うち','学校','大学','アパート','トイレ / お手洗い','博物館','公園',
   '大使館','町','北口','南口','東口','西口'].includes(w.word)
);
addPack('places-1', '商店与设施', 'Shops & Facilities', '常见商店和公共设施', 'places', placeWords1);
addPack('places-2', '场所与方位', 'Places & Directions', '学校、家和公共场所', 'places', placeWords2);

// ============================================================
// 5. Languages & Countries
// ============================================================
const langCountry = findWords(w =>
  ['日本語','韓国語','中国語','英語','国','日本','韓国','中国',
   'フィリピン','アメリカ','ドイツ','イギリス'].includes(w.word)
);
addPack('culture-1', '语言与国家', 'Languages & Countries', '语言和国家名称', 'culture', langCountry);

// ============================================================
// 6. Animals
// ============================================================
const animalWords = findWords(w =>
  ['動物','犬','猫','豚','牛','鶏','鳥'].includes(w.word)
);

// ============================================================
// 7. Nature & Weather
// ============================================================
const natureWords = findWords(w =>
  ['海','川','山','風','木','森','空','雲','池','花','草'].includes(w.word)
);
addPack('nature-1', '自然与动物', 'Nature & Animals', '自然景观和动物', 'nature', [...natureWords, ...animalWords]);

// ============================================================
// 8. Body
// ============================================================
const bodyWords = findWords(w =>
  ['体','頭','首','腕','指','口','耳','目','鼻','髪'].includes(w.word)
);
addPack('body-1', '身体部位', 'Body Parts', '人体部位名称', 'body', bodyWords);

// ============================================================
// 9. Clothing & Accessories
// ============================================================
const clothingWords1 = findWords(w =>
  ['服','着物','帽子','スーツ','ジャケット','セーター','コート','Tシャツ',
   'ドレス','下着','ズボン','スカート'].includes(w.word)
);
const clothingWords2 = findWords(w =>
  ['イヤリング','ベルト','ネクタイ','手袋','めがね','サングラス',
   '靴下','靴','サンダル'].includes(w.word)
);
addPack('clothing-1', '服装', 'Clothing', '常见服装词汇', 'clothing', clothingWords1);
addPack('clothing-2', '配饰与鞋', 'Accessories & Shoes', '配饰和鞋类', 'clothing', clothingWords2);

// ============================================================
// 10. Food & Drink
// ============================================================
const foodWords1 = findWords(w =>
  ['食べ物','料理','ご飯','パン','ラーメン','スパゲッティ','カレーライス',
   'ハンバーガー','サンドウィッチ','ドーナッツ','弁当','アイスクリーム','ケーキ',
   'おにぎり','ピザ'].includes(w.word)
);
const foodWords2 = findWords(w =>
  ['朝ご飯','昼ご飯','晩ご飯','スープ','うどん','味噌汁',
   '魚','牛肉','豚肉','鶏肉','卵'].includes(w.word)
);
const drinkFruit = findWords(w =>
  ['水','牛乳','ビール','お茶','コーヒー','ワイン','ジュース','お酒',
   'りんご','バナナ','みかん','いちご'].includes(w.word)
);
addPack('food-1', '食物(一)', 'Food Part 1', '常见食物和料理', 'food', foodWords1);
addPack('food-2', '食物(二)', 'Food Part 2', '肉类、餐食和汤', 'food', foodWords2);
addPack('food-3', '饮品与水果', 'Drinks & Fruits', '饮料和水果', 'food', drinkFruit);

// ============================================================
// 11. Transport
// ============================================================
const transportWords = findWords(w =>
  ['車','タクシー','バス','バイク','自転車','電車','地下鉄','飛行機','船'].includes(w.word)
);
addPack('transport-1', '交通工具', 'Transportation', '出行方式和交通工具', 'transport', transportWords);

// ============================================================
// 12. Sports & Hobbies
// ============================================================
const sportsWords = findWords(w =>
  ['テニス','サッカー','バスケットボール','ゴルフ','野球','卓球',
   '音楽','ピアノ','ギター','カラオケ','スポーツ'].includes(w.word)
);
addPack('hobbies-1', '运动与爱好', 'Sports & Hobbies', '体育运动和兴趣爱好', 'hobbies', sportsWords);

// ============================================================
// 13. Stationery & Tools
// ============================================================
const stationeryWords = findWords(w =>
  ['鉛筆','ペン','ボールペン','シャーペン','万年筆','消しゴム',
   'はさみ','紙','ノート','筆箱','計算機'].includes(w.word)
);
addPack('school-1', '文具用品', 'Stationery', '学习用品和文具', 'school', stationeryWords);

// ============================================================
// 14. Home & Furniture
// ============================================================
const homeWords1 = findWords(w =>
  ['いえ/うち','玄関','台所','部屋','ドア /扉','テーブル','イス','机',
   '押し入れ','本棚','窓','階段','ベッド','花瓶','屋根','キッチン','エアコン'].includes(w.word)
);
addPack('home-1', '家具与房间', 'Home & Furniture', '家中的房间和家具', 'home', homeWords1);

// ============================================================
// 15. Katakana daily items (remaining unassigned katakana)
// ============================================================
const kataRemaining = findWords(w => w.pos === 'katakana');
if (kataRemaining.length > 0) {
  const kataChunks = chunk(kataRemaining, 15);
  kataChunks.forEach((ch, i) => {
    addPack(`items-${i + 1}`, `日用物品${kataChunks.length > 1 ? '(' + (i+1) + ')' : ''}`, `Daily Items${kataChunks.length > 1 ? ' Part ' + (i+1) : ''}`, '日常使用的物品', 'items', ch);
  });
}

// ============================================================
// 16. Remaining nouns
// ============================================================
const remainingNouns = findWords(w => w.pos === 'noun');
if (remainingNouns.length > 0) {
  const nounChunks = chunk(remainingNouns, 15);
  nounChunks.forEach((ch, i) => {
    addPack(`nouns-${i + 1}`, `常用名词(${i + 1})`, `Common Nouns Part ${i + 1}`, '其他常用名词', 'nouns', ch);
  });
}

// ============================================================
// 17. Verbs - grouped by theme
// ============================================================
const verbMotion = findWords(w =>
  w.pos === 'verb' && ['あう','会う','あがる','上がる','あるく','歩く','いく','行く',
   'いれる','入れる','うごく','動く','おりる','降りる','かえる','帰る',
   'くる','来る','こむ','込む','さがる','下がる','すすむ','進む',
   'だす','出す','でかける','出かける','でる','出る','とおる','通る',
   'とまる','止まる','にげる','逃げる','のぼる','登る','のる','乗る',
   'はいる','入る','はしる','走る','ひっこす','引っ越す','もどる','戻る',
   'わたる','渡る'].includes(w.word)
);
const verbMotionChunks = chunk(verbMotion, 15);
verbMotionChunks.forEach((ch, i) => {
  addPack(`verbs-motion-${i + 1}`, `动词:移动${verbMotionChunks.length > 1 ? '(' + (i+1) + ')' : ''}`, `Verbs: Motion${verbMotionChunks.length > 1 ? ' Part ' + (i+1) : ''}`, '表示移动和方向的动词', 'verbs', ch);
});

const verbComm = findWords(w =>
  w.pos === 'verb' && ['いう','言う','おしえる','教える','きく','聞く',
   'こたえる','答える','しつもん','質問','たのむ','頼む','つたえる','伝える',
   'はなす','話す','よぶ','呼ぶ','よむ','読む','かく','書く',
   'しらべる','調べる','ならう','習う','べんきょうする','勉強する',
   'れんしゅう','練習'].includes(w.word)
);
if (verbComm.length > 0) {
  addPack('verbs-comm-1', '动词:交流学习', 'Verbs: Communication', '说话、学习和交流相关动词', 'verbs', verbComm);
}

const verbDaily = findWords(w =>
  w.pos === 'verb' && ['あける','開ける','あく','開く','あびる','浴びる','あらう','洗う',
   'おきる','起きる','おく','置く','おす','押す','おわる','終わる',
   'かける','きる','着る','きる','切る','けす','消す','しまる','閉まる',
   'しめる','閉める','すむ','住む','すわる','座る','たつ','立つ',
   'つかう','使う','つく','着く','つくる','作る','つける','ぬぐ','脱ぐ',
   'ねる','寝る','はく','はる','貼る','ひく','引く','みがく','磨く',
   'もつ','持つ'].includes(w.word)
);
const verbDailyChunks = chunk(verbDaily, 15);
verbDailyChunks.forEach((ch, i) => {
  addPack(`verbs-daily-${i + 1}`, `动词:日常动作${verbDailyChunks.length > 1 ? '(' + (i+1) + ')' : ''}`, `Verbs: Daily Actions${verbDailyChunks.length > 1 ? ' Part ' + (i+1) : ''}`, '日常生活中的常用动词', 'verbs', ch);
});

const verbFood = findWords(w =>
  w.pos === 'verb' && ['たべる','食べる','のむ','飲む','つくる','作る'].includes(w.word)
);

const verbExist = findWords(w =>
  w.pos === 'verb' && ['ある','いる','要る','できる','なる','する',
   'わかる','分かる','しる','知る'].includes(w.word)
);
if (verbExist.length > 0) {
  addPack('verbs-state-1', '动词:存在与状态', 'Verbs: Existence & State', '表示存在、变化和状态的动词', 'verbs', [...verbExist, ...verbFood]);
}

const verbGive = findWords(w =>
  w.pos === 'verb' && ['あげる','上げる','もらう','かす','貸す','かりる','借りる',
   'くれる','さげる','下げる','あつまる','集まる','あつめる','集める',
   'おくる','送る','とる','取る','もらう','貰う'].includes(w.word)
);
if (verbGive.length > 0) {
  addPack('verbs-give-1', '动词:授受与收集', 'Verbs: Giving & Receiving', '给予、借贷和收集相关动词', 'verbs', verbGive);
}

const verbSee = findWords(w =>
  w.pos === 'verb' && ['みる','見る','みせる','見せる','さがす','探す',
   'みつける','見つける','まつ','待つ','おもう','思う','かんがえる','考える',
   'きめる','決める','えらぶ','選ぶ','こまる','困る','なく','泣く',
   'わらう','笑う','あそぶ','遊ぶ','やすむ','休む','うたう','歌う',
   'おどる','踊る'].includes(w.word)
);
if (verbSee.length > 0) {
  const chunks = chunk(verbSee, 15);
  chunks.forEach((ch, i) => {
    addPack(`verbs-sense-${i + 1}`, `动词:感知活动${chunks.length > 1 ? '(' + (i+1) + ')' : ''}`, `Verbs: Perception & Activity${chunks.length > 1 ? ' Part ' + (i+1) : ''}`, '感知、思考和活动相关动词', 'verbs', ch);
  });
}

// Remaining verbs
const remainingVerbs = findWords(w => w.pos === 'verb');
if (remainingVerbs.length > 0) {
  const verbChunks = chunk(remainingVerbs, 15);
  verbChunks.forEach((ch, i) => {
    addPack(`verbs-other-${i + 1}`, `动词:其他(${i + 1})`, `Verbs: Other Part ${i + 1}`, '其他常用动词', 'verbs', ch);
  });
}

// ============================================================
// 18. I-Adjectives
// ============================================================
const adjPhysical = findWords(w =>
  w.pos === 'adj' && ['赤い','あかい','明るい','あかるい','新しい','あたらしい',
   '厚い','あつい','大きい','おおきい','重い','おもい','軽い','かるい',
   '黄色い','きいろい','汚い','きたない','暗い','くらい','黒い','くろい',
   '白い','しろい','狭い','せまい','高い','たかい','小さい','ちいさい',
   '近い','ちかい','遠い','とおい','長い','ながい','低い','ひくい',
   '広い','ひろい','太い','ふとい','古い','ふるい','細い','ほそい',
   '丸い／円い','まるい','短い','みじかい','若い','わかい'].includes(w.word)
);
const adjPhysChunks = chunk(adjPhysical, 15);
adjPhysChunks.forEach((ch, i) => {
  addPack(`adj-phys-${i + 1}`, `形容词:外观特征${adjPhysChunks.length > 1 ? '(' + (i+1) + ')' : ''}`, `Adjectives: Physical${adjPhysChunks.length > 1 ? ' Part ' + (i+1) : ''}`, '描述外观和物理特征的形容词', 'adjectives', ch);
});

const adjFeeling = findWords(w =>
  w.pos === 'adj' && ['危ない','あぶない','忙しい','いそがしい','痛い','いたい',
   '美味しい','おいしい','面白い','おもしろい','怖い','こわい',
   '楽しい','たのしい','つまらない','難しい','むずかしい','易しい','やさしい',
   '悪い','わるい','いい','うるさい'].includes(w.word)
);
if (adjFeeling.length > 0) {
  addPack('adj-feel-1', '形容词:感受评价', 'Adjectives: Feelings', '描述感受和评价的形容词', 'adjectives', adjFeeling);
}

const adjTemp = findWords(w =>
  w.pos === 'adj' && ['温かい','あたたかい','暖かい','暑い','熱い','寒い','さむい',
   '涼しい','すずしい','冷たい','つめたい','甘い','あまい','辛い','からい',
   '薄い','うすい','まずい','遅い','おそい','早い','はやい','速い',
   '強い','つよい','安い','やすい','多い','おおい'].includes(w.word)
);
const adjTempChunks = chunk(adjTemp, 15);
adjTempChunks.forEach((ch, i) => {
  addPack(`adj-temp-${i + 1}`, `形容词:温度味道${adjTempChunks.length > 1 ? '(' + (i+1) + ')' : ''}`, `Adjectives: Temperature & Taste${adjTempChunks.length > 1 ? ' Part ' + (i+1) : ''}`, '温度、味道和程度相关形容词', 'adjectives', ch);
});

// Na-adjectives
const naAdj = findWords(w =>
  w.pos === 'adj' && ['いろいろ','同じ','おなじ','嫌い','きらい','きれい','けっこう',
   'げんき','静か','しずか','じょうず','じょうぶ','好き','すき','大好き','だいすき',
   'たいせつ','たいへん','賑やか','にぎやか','ひま','へた','べんり','ゆうめい',
   'りっぱ','可愛い','かわいい'].includes(w.word)
);
const naChunks = chunk(naAdj, 15);
naChunks.forEach((ch, i) => {
  addPack(`adj-na-${i + 1}`, `形容词:品质性格${naChunks.length > 1 ? '(' + (i+1) + ')' : ''}`, `Adjectives: Quality${naChunks.length > 1 ? ' Part ' + (i+1) : ''}`, '表示品质和性格的形容词', 'adjectives', ch);
});

// Remaining adjectives
const remainingAdj = findWords(w => w.pos === 'adj');
if (remainingAdj.length > 0) {
  const adjChunks = chunk(remainingAdj, 15);
  adjChunks.forEach((ch, i) => {
    addPack(`adj-other-${i + 1}`, `形容词:其他(${i + 1})`, `Adjectives: Other Part ${i + 1}`, '其他常用形容词', 'adjectives', ch);
  });
}

// ============================================================
// 19. Adverbs
// ============================================================
const adverbs = findWords(w => w.pos === 'adverb');
if (adverbs.length > 0) {
  const advChunks = chunk(adverbs, 15);
  advChunks.forEach((ch, i) => {
    addPack(`adverbs-${i + 1}`, `副词${advChunks.length > 1 ? '(' + (i+1) + ')' : ''}`, `Adverbs${advChunks.length > 1 ? ' Part ' + (i+1) : ''}`, '常用副词', 'adverbs', ch);
  });
}

// ============================================================
// Catch-all: anything remaining
// ============================================================
const remaining = n5.filter(w => !assigned.has(w.word)).map(w => w.word);
if (remaining.length > 0) {
  const remChunks = chunk(remaining, 15);
  remChunks.forEach((ch, i) => {
    addPack(`misc-${i + 1}`, `综合词汇(${i + 1})`, `Miscellaneous Part ${i + 1}`, '其他常用词汇', 'misc', ch);
  });
}

// ============================================================
// Verify & Write
// ============================================================
const totalWords = packs.reduce((sum, p) => sum + p.words.length, 0);
const unassigned = n5.filter(w => !assigned.has(w.word));

console.log(`Packs: ${packs.length}`);
console.log(`Total words assigned: ${totalWords}`);
console.log(`Unassigned: ${unassigned.length}`);
if (unassigned.length > 0) {
  console.log('Unassigned words:', unassigned.map(w => w.word + '(' + w.pos + ')').join(', '));
}

// Print summary
packs.forEach(p => {
  console.log(`  ${p.order}. ${p.packId} (${p.words.length}) — ${p.name_zh_CN}`);
});

const outPath = path.resolve(__dirname, '../data/n5_packs_seed.json');
fs.writeFileSync(outPath, JSON.stringify(packs, null, 2), 'utf-8');
console.log(`\nWritten to ${outPath}`);

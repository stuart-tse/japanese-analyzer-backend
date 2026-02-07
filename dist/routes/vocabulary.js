import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { Vocabulary } from '../models/Vocabulary.js';
const router = Router();
// GET /vocabulary — list user's saved words
router.get('/', requireAuth, async (req, res) => {
    try {
        const userId = req.jwtUser.userId;
        const page = Math.max(1, parseInt(req.query.page) || 1);
        const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 50));
        const skip = (page - 1) * limit;
        const [items, total] = await Promise.all([
            Vocabulary.find({ userId })
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            Vocabulary.countDocuments({ userId }),
        ]);
        res.json({ items, page, limit, total, totalPages: Math.ceil(total / limit) });
    }
    catch (error) {
        console.error('Vocabulary list error:', error);
        res.status(500).json({ error: { message: '获取词汇列表失败' } });
    }
});
// POST /vocabulary — add a word
router.post('/', requireAuth, async (req, res) => {
    try {
        const userId = req.jwtUser.userId;
        const { word, furigana, romaji, meaning_zh_CN, jlptLevel, pos, notes } = req.body;
        if (!word) {
            res.status(400).json({ error: { message: '缺少单词' } });
            return;
        }
        // Upsert: update if already exists, auto-enroll in SRS for new words
        const vocab = await Vocabulary.findOneAndUpdate({ userId, word }, {
            $set: { furigana, romaji, meaning_zh_CN, jlptLevel, pos, notes },
            $setOnInsert: {
                userId, word, mastered: false, reviewCount: 0,
                srsStage: 'learning',
                srsInterval: 0,
                srsEaseFactor: 2.5,
                srsDueDate: new Date(),
                wrongCount: 0,
                sourcePackId: null,
            },
        }, { upsert: true, new: true });
        res.status(201).json(vocab);
    }
    catch (error) {
        console.error('Vocabulary add error:', error);
        res.status(500).json({ error: { message: '保存词汇失败' } });
    }
});
// DELETE /vocabulary/:id — remove a word
router.delete('/:id', requireAuth, async (req, res) => {
    try {
        const userId = req.jwtUser.userId;
        const result = await Vocabulary.findOneAndDelete({ _id: req.params.id, userId });
        if (!result) {
            res.status(404).json({ error: { message: '词汇不存在' } });
            return;
        }
        res.json({ success: true });
    }
    catch (error) {
        console.error('Vocabulary delete error:', error);
        res.status(500).json({ error: { message: '删除词汇失败' } });
    }
});
export default router;
//# sourceMappingURL=vocabulary.js.map
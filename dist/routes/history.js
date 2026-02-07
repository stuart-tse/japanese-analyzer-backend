import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { Analysis } from '../models/Analysis.js';
const router = Router();
// GET /history — list user's analyses (paginated)
router.get('/', requireAuth, async (req, res) => {
    try {
        const userId = req.jwtUser.userId;
        const page = Math.max(1, parseInt(req.query.page) || 1);
        const limit = Math.min(50, Math.max(1, parseInt(req.query.limit) || 20));
        const skip = (page - 1) * limit;
        const [items, total] = await Promise.all([
            Analysis.find({ userId })
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            Analysis.countDocuments({ userId }),
        ]);
        res.json({
            items,
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        });
    }
    catch (error) {
        console.error('History list error:', error);
        res.status(500).json({ error: { message: '获取历史记录失败' } });
    }
});
// POST /history — save an analysis
router.post('/', requireAuth, async (req, res) => {
    try {
        const userId = req.jwtUser.userId;
        const { sentence, tokens, translations, fullTranslation } = req.body;
        if (!sentence) {
            res.status(400).json({ error: { message: '缺少句子' } });
            return;
        }
        const analysis = await Analysis.create({
            userId,
            sentence,
            tokens: tokens || [],
            translations: translations || {},
            fullTranslation,
        });
        res.status(201).json(analysis);
    }
    catch (error) {
        console.error('History save error:', error);
        res.status(500).json({ error: { message: '保存历史记录失败' } });
    }
});
// DELETE /history/:id — delete a single entry
router.delete('/:id', requireAuth, async (req, res) => {
    try {
        const userId = req.jwtUser.userId;
        const result = await Analysis.findOneAndDelete({ _id: req.params.id, userId });
        if (!result) {
            res.status(404).json({ error: { message: '记录不存在' } });
            return;
        }
        res.json({ success: true });
    }
    catch (error) {
        console.error('History delete error:', error);
        res.status(500).json({ error: { message: '删除历史记录失败' } });
    }
});
export default router;
//# sourceMappingURL=history.js.map
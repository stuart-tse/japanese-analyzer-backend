import { Router } from 'express';
import { prisma } from '../config/prisma.js';
import { requireAuth } from '../middleware/auth.js';
const router = Router();
/**
 * POST /vocabulary/analyzed
 * Save analyzed vocabulary to database
 */
router.post('/', requireAuth, async (req, res) => {
    try {
        const userId = req.jwtUser.userId;
        const { words, sentence } = req.body;
        if (!words || !Array.isArray(words)) {
            res.status(400).json({
                error: 'words array required',
            });
            return;
        }
        // Save each word (or update if already exists)
        const savedWords = await Promise.all(words.map(async (wordData) => {
            // Check if this word already exists for this user
            const existing = await prisma.analyzedVocabulary.findFirst({
                where: {
                    userId,
                    word: wordData.word,
                },
            });
            if (existing) {
                // Update existing - increment review count
                return await prisma.analyzedVocabulary.update({
                    where: { id: existing.id },
                    data: {
                        reviewCount: { increment: 1 },
                        analyzedAt: new Date(), // Update last seen date
                        sentence: sentence || existing.sentence, // Update context if provided
                    },
                });
            }
            else {
                // Create new vocabulary entry
                return await prisma.analyzedVocabulary.create({
                    data: {
                        userId,
                        word: wordData.word || '',
                        reading: wordData.furigana || wordData.reading || null,
                        romaji: wordData.romaji || null,
                        partOfSpeech: wordData.pos || wordData.partOfSpeech || null,
                        translation: wordData.translation || null,
                        sentence: sentence || null,
                        reviewCount: 1,
                        masteryLevel: 0,
                    },
                });
            }
        }));
        res.json({
            success: true,
            message: `Saved ${savedWords.length} words`,
            count: savedWords.length,
        });
    }
    catch (error) {
        console.error('Error saving analyzed vocabulary:', error);
        res.status(500).json({
            error: 'Failed to save vocabulary',
        });
    }
});
/**
 * GET /vocabulary/analyzed
 * Get user's analyzed vocabulary history
 */
router.get('/', requireAuth, async (req, res) => {
    try {
        const userId = req.jwtUser.userId;
        const limit = parseInt(req.query.limit || '100', 10);
        // Fetch vocabulary with most recent first
        const vocabulary = await prisma.analyzedVocabulary.findMany({
            where: { userId },
            orderBy: { analyzedAt: 'desc' },
            take: limit,
        });
        res.json({
            success: true,
            vocabulary,
            count: vocabulary.length,
        });
    }
    catch (error) {
        console.error('Error fetching analyzed vocabulary:', error);
        res.status(500).json({
            error: 'Failed to fetch vocabulary',
        });
    }
});
export default router;
//# sourceMappingURL=analyzedVocabulary.js.map
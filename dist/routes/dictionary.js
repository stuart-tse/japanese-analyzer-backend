import { Router } from 'express';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
const DATA_PATH = resolve(process.cwd(), 'data/common_vocabulary.json');
const router = Router();
router.post('/', (req, res) => {
    try {
        const entries = req.body.entries;
        if (!Array.isArray(entries) || entries.length === 0) {
            res.json({ added: 0, total: 0 });
            return;
        }
        let existing = [];
        try {
            existing = JSON.parse(readFileSync(DATA_PATH, 'utf-8'));
        }
        catch {
            existing = [];
        }
        const existingWords = new Set(existing.map((e) => e.word));
        const newEntries = entries.filter((e) => e.word && !existingWords.has(e.word));
        if (newEntries.length === 0) {
            res.json({ added: 0, total: existing.length });
            return;
        }
        const merged = [...existing, ...newEntries];
        const json = JSON.stringify(merged, null, 2);
        // Ensure directory exists
        const dir = dirname(DATA_PATH);
        if (!existsSync(dir))
            mkdirSync(dir, { recursive: true });
        writeFileSync(DATA_PATH, json, 'utf-8');
        res.json({ added: newEntries.length, total: merged.length });
    }
    catch (error) {
        console.error('Dictionary API error:', error);
        res.status(500).json({ error: 'Failed to save dictionary entries' });
    }
});
export default router;
//# sourceMappingURL=dictionary.js.map
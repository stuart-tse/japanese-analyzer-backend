import { Router } from 'express';
import { rateLimit } from '../middleware/rateLimit.js';
import { config } from '../config/index.js';
const GEMINI_TTS_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-tts:generateContent';
const EDGE_TTS_URL = 'https://api.howen.ink/api/tts';
const EDGE_VOICES = {
    male: 'ja-JP-Masaru:DragonHDLatestNeural',
    female: 'ja-JP-Nanami:DragonHDLatestNeural',
};
const GEMINI_VOICES = ['Kore', 'Puck', 'Zephyr', 'Aoede', 'Leda', 'Charon'];
const router = Router();
router.post('/', rateLimit({ maxTokens: 10, refillRate: 1 }), async (req, res) => {
    try {
        const { text, provider = 'edge', gender = 'female', voice = 'Kore', model = 'gemini-2.5-flash-tts', rate = 0, } = req.body;
        if (!text) {
            res.status(400).json({ error: { message: '缺少必要的文本内容' } });
            return;
        }
        if (provider === 'edge') {
            if (!EDGE_VOICES[gender]) {
                res.status(400).json({ error: { message: '不支持的声音类型，请使用 male 或 female' } });
                return;
            }
            const payload = { text, voice: EDGE_VOICES[gender], rate, pitch: 0 };
            const upstreamRes = await fetch(EDGE_TTS_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            if (!upstreamRes.ok) {
                const data = await upstreamRes.json().catch(() => ({}));
                console.error('Edge TTS API error:', data);
                res.status(upstreamRes.status).json({
                    error: data.error || { message: 'Edge TTS 请求失败' },
                });
                return;
            }
            const audioBuffer = await upstreamRes.arrayBuffer();
            if (!audioBuffer || audioBuffer.byteLength === 0) {
                res.status(500).json({ error: { message: '无有效音频数据' } });
                return;
            }
            const base64Audio = Buffer.from(audioBuffer).toString('base64');
            res.json({ audio: base64Audio, mimeType: 'audio/mp3' });
        }
        else if (provider === 'gemini') {
            const headerKey = req.headers['x-gemini-key'];
            const effectiveApiKey = headerKey || config.apiKey;
            if (!effectiveApiKey) {
                res.status(500).json({
                    error: { message: '未提供API密钥，请在设置中配置API密钥或联系管理员配置服务器密钥' },
                });
                return;
            }
            if (!GEMINI_VOICES.includes(voice)) {
                res.status(400).json({ error: { message: '不支持的Gemini语音类型' } });
                return;
            }
            const payload = {
                contents: [{ parts: [{ text }] }],
                generationConfig: {
                    responseModalities: ['AUDIO'],
                    speechConfig: {
                        voiceConfig: { prebuiltVoiceConfig: { voiceName: voice } },
                    },
                },
                model,
            };
            const upstreamRes = await fetch(`${GEMINI_TTS_URL}?key=${effectiveApiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            if (!upstreamRes.ok) {
                const data = await upstreamRes.json();
                console.error('Gemini TTS API error:', data);
                res.status(upstreamRes.status).json({
                    error: data.error || { message: 'Gemini TTS 请求失败' },
                });
                return;
            }
            const result = (await upstreamRes.json());
            const candidates = result.candidates;
            const inlineData = candidates?.[0]?.content?.parts?.[0]?.inlineData;
            if (!inlineData) {
                res.status(500).json({ error: { message: '无有效音频数据' } });
                return;
            }
            res.json({ audio: inlineData.data, mimeType: inlineData.mimeType });
        }
        else {
            res.status(400).json({ error: { message: '不支持的TTS提供商' } });
        }
    }
    catch (error) {
        console.error('Server error (TTS):', error);
        res.status(500).json({
            error: { message: error instanceof Error ? error.message : '服务器错误' },
        });
    }
});
export default router;
//# sourceMappingURL=tts.js.map
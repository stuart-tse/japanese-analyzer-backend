import { Router, Request, Response } from 'express';
import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';
import { rateLimit } from '../middleware/rateLimit.js';
import { config } from '../config/index.js';

const GEMINI_TTS_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-tts:generateContent';

const EDGE_VOICES: Record<string, string> = {
  male: 'ja-JP-KeitaNeural',
  female: 'ja-JP-NanamiNeural',
};

const GEMINI_VOICES = ['Kore', 'Puck', 'Zephyr', 'Aoede', 'Leda', 'Charon'];

const router = Router();

router.post('/', rateLimit({ maxTokens: 10, refillRate: 1 }), async (req: Request, res: Response) => {
  try {
    const {
      text,
      provider = 'edge',
      gender = 'female',
      voice = 'Kore',
      model = 'gemini-2.5-flash-tts',
      rate = 0,
    } = req.body;

    if (!text) {
      res.status(400).json({ error: { message: '缺少必要的文本内容' } });
      return;
    }

    if (provider === 'edge') {
      if (!EDGE_VOICES[gender]) {
        res.status(400).json({ error: { message: '不支持的声音类型，请使用 male 或 female' } });
        return;
      }

      const ttsClient = new MsEdgeTTS();
      await ttsClient.setMetadata(
        EDGE_VOICES[gender],
        OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3,
      );

      const rateStr = rate >= 0 ? `+${rate}%` : `${rate}%`;
      const { audioStream } = ttsClient.toStream(text, { rate: rateStr });

      const chunks: Buffer[] = [];
      audioStream.on('data', (chunk: Buffer) => chunks.push(chunk));
      await new Promise<void>((resolve, reject) => {
        audioStream.on('end', resolve);
        audioStream.on('error', reject);
      });
      ttsClient.close();

      const audioBuffer = Buffer.concat(chunks);
      if (audioBuffer.byteLength === 0) {
        res.status(500).json({ error: { message: '无有效音频数据' } });
        return;
      }

      const base64Audio = audioBuffer.toString('base64');
      res.json({ audio: base64Audio, mimeType: 'audio/mp3' });
    } else if (provider === 'gemini') {
      const headerKey = req.headers['x-gemini-key'] as string | undefined;
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
          error: (data as Record<string, unknown>).error || { message: 'Gemini TTS 请求失败' },
        });
        return;
      }

      const result = (await upstreamRes.json()) as Record<string, unknown>;
      const candidates = result.candidates as Array<{
        content: { parts: Array<{ inlineData: { data: string; mimeType: string } }> };
      }>;
      const inlineData = candidates?.[0]?.content?.parts?.[0]?.inlineData;

      if (!inlineData) {
        res.status(500).json({ error: { message: '无有效音频数据' } });
        return;
      }

      res.json({ audio: inlineData.data, mimeType: inlineData.mimeType });
    } else {
      res.status(400).json({ error: { message: '不支持的TTS提供商' } });
    }
  } catch (error) {
    console.error('Server error (TTS):', error);
    res.status(500).json({
      error: { message: error instanceof Error ? error.message : '服务器错误' },
    });
  }
});

export default router;

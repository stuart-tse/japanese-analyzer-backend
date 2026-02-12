import { config } from '../config/index.js';

/**
 * Shared AI call helper used by contentAI and listeningAI.
 */
export async function callAI(prompt: string, maxTokens: number = 4000): Promise<string> {
  const apiKey = config.apiKey;
  if (!apiKey) {
    throw new Error('API key not configured');
  }

  const maxRetries = 4;
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    if (attempt > 0) {
      const delay = Math.min(10000 * Math.pow(3, attempt - 1), 60000);
      await new Promise((r) => setTimeout(r, delay));
    }

    const response = await fetch(config.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: config.modelName,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.3,
        max_tokens: maxTokens,
      }),
    });

    if (response.status === 429) {
      lastError = new Error(`AI API rate limited (attempt ${attempt + 1}/${maxRetries})`);
      continue;
    }

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'unknown');
      throw new Error(`AI API error (${response.status}): ${errorText}`);
    }

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };

    const content = data.choices?.[0]?.message?.content || '';
    if (!content) {
      throw new Error('AI returned empty response');
    }

    return content;
  }

  throw lastError || new Error('AI call failed after retries');
}

export function parseJsonFromResponse<T>(content: string, label: string): T {
  const codeBlockMatch = content.match(/```(?:json)?\s*\n?([\s\S]*?)\n?```/);
  const rawJson = codeBlockMatch ? codeBlockMatch[1] : content;

  // Try array
  const arrayMatch = rawJson.match(/\[[\s\S]*\]/);
  if (arrayMatch) {
    try {
      return JSON.parse(arrayMatch[0]) as T;
    } catch {
      // fall through
    }
  }

  // Try object
  const objMatch = rawJson.match(/\{[\s\S]*\}/);
  if (objMatch) {
    try {
      return JSON.parse(objMatch[0]) as T;
    } catch {
      // fall through
    }
  }

  throw new Error(`Failed to parse AI ${label} response as JSON`);
}

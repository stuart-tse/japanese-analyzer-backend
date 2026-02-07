const ALLOWED_HOSTS = [
  'generativelanguage.googleapis.com',
  'openrouter.ai',
  'api.openai.com',
  'aiplatform.googleapis.com', // Vertex AI
  'api.anthropic.com', // Claude
  'api.together.xyz', // Together AI
  'api.groq.com', // Groq
];

const PRIVATE_IP_PATTERNS = [
  /^127\./,
  /^10\./,
  /^172\.(1[6-9]|2\d|3[01])\./,
  /^192\.168\./,
  /^169\.254\./,
  /^0\./,
  /^\[::1\]/,
];

export function validateApiUrl(url: string): { valid: boolean; error?: string } {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return { valid: false, error: 'Invalid URL format' };
  }

  if (parsed.protocol !== 'https:') {
    return { valid: false, error: 'Only HTTPS URLs are allowed' };
  }

  if (parsed.username || parsed.password) {
    return { valid: false, error: 'URLs with credentials are not allowed' };
  }

  const hostname = parsed.hostname.toLowerCase();

  if (hostname === 'localhost' || hostname === '[::1]') {
    return { valid: false, error: 'Localhost URLs are not allowed' };
  }

  for (const pattern of PRIVATE_IP_PATTERNS) {
    if (pattern.test(hostname)) {
      return { valid: false, error: 'Private/reserved IP addresses are not allowed' };
    }
  }

  const isAllowed = ALLOWED_HOSTS.some(
    (allowed) => hostname === allowed || hostname.endsWith('.' + allowed),
  );
  if (!isAllowed) {
    return { valid: false, error: `Host "${hostname}" is not in the allowed list` };
  }

  return { valid: true };
}

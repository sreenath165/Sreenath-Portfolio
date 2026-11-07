import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(_req: VercelRequest, res: VercelResponse) {
  // Report offline when the Groq key is missing so the widget doesn't promise a working assistant.
  if (!process.env.GROQ_API_KEY) {
    return res.status(503).json({ status: 'unconfigured', message: 'GROQ_API_KEY is not set' });
  }
  return res.status(200).json({
    status: 'healthy',
    message: 'Portfolio AI Assistant is running',
  });
}

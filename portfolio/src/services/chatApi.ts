/**
 * Chat API Service
 * Handles communication with the Portfolio AI Assistant
 * Uses Vercel serverless API routes (same domain — no CORS issues)
 * Simulates typing effect client-side from JSON response
 */

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  sources?: SourceInfo[];
  timestamp: Date;
}

export interface SourceInfo {
  source: string;
  section: string;
  type: string;
}

export interface ChatResponse {
  answer: string;
  sources: SourceInfo[];
  relevant: boolean;
}

export interface HealthResponse {
  status: string;
  message?: string;
  documents_indexed?: number;
}

export interface StreamCallbacks {
  onContent: (content: string) => void;
  onSources: (sources: SourceInfo[]) => void;
  onDone: () => void;
  onError: (error: string) => void;
}

/**
 * Send a chat message and simulate streaming via client-side word-by-word rendering
 */
export async function sendChatMessageStream(
  message: string,
  callbacks: StreamCallbacks,
  history: Pick<ChatMessage, 'role' | 'content'>[] = []
): Promise<void> {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        history: history.map(({ role, content }) => ({ role, content })),
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      callbacks.onError(errorData.error || `HTTP error! status: ${response.status}`);
      return;
    }

    const data: ChatResponse = await response.json();

    // Simulate typing effect by sending words one at a time
    const words = data.answer.split(' ');
    for (let i = 0; i < words.length; i++) {
      const chunk = words[i] + (i < words.length - 1 ? ' ' : '');
      callbacks.onContent(chunk);
      // Small delay between words for typing effect
      await new Promise(resolve => setTimeout(resolve, 25));
    }

    callbacks.onSources(data.sources || []);
    callbacks.onDone();
  } catch (error) {
    callbacks.onError(error instanceof Error ? error.message : 'Connection failed. Please try again.');
  }
}

/**
 * Send a chat message (non-streaming)
 */
export async function sendChatMessage(message: string): Promise<ChatResponse> {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

/**
 * Check if the chat service is healthy
 */
export async function checkHealth(): Promise<HealthResponse> {
  try {
    const response = await fetch('/api/health', {
      method: 'GET',
    });

    if (!response.ok) {
      return { status: 'offline' };
    }

    return response.json();
  } catch {
    return { status: 'offline' };
  }
}

/**
 * Check connection status with timeout
 */
export async function checkConnection(timeoutMs: number = 5000): Promise<'online' | 'offline'> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    const response = await fetch('/api/health', {
      method: 'GET',
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      return data.status === 'healthy' ? 'online' : 'offline';
    }
    return 'offline';
  } catch {
    return 'offline';
  }
}

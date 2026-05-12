/**
 * Chat API Service
 * Handles communication with the Portfolio AI Assistant backend
 * Supports streaming responses for real-time typing effect
 */

// Backend URL - uses environment variable or defaults to local
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:10000';

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
 * Send a chat message with streaming response
 */
export async function sendChatMessageStream(
  message: string,
  callbacks: StreamCallbacks
): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/chat/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, stream: true }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
      callbacks.onError(error.detail || `HTTP error! status: ${response.status}`);
      return;
    }

    const reader = response.body?.getReader();
    if (!reader) {
      callbacks.onError('No response body');
      return;
    }

    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          try {
            const data = JSON.parse(line.slice(6));
            
            if (data.type === 'content') {
              callbacks.onContent(data.content);
            } else if (data.type === 'sources') {
              callbacks.onSources(data.sources || []);
            } else if (data.type === 'done') {
              callbacks.onDone();
            } else if (data.type === 'error') {
              callbacks.onError(data.content);
            }
          } catch (e) {
            // Skip invalid JSON
          }
        }
      }
    }
  } catch (error) {
    callbacks.onError(error instanceof Error ? error.message : 'Connection failed');
  }
}

/**
 * Send a chat message (non-streaming fallback)
 */
export async function sendChatMessage(message: string): Promise<ChatResponse> {
  const response = await fetch(`${API_BASE_URL}/api/chat/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message, stream: false }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
    throw new Error(error.detail || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

/**
 * Check if the chat service is healthy
 */
export async function checkHealth(): Promise<HealthResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
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

    const response = await fetch(`${API_BASE_URL}/health`, {
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

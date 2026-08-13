import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Loader2, Bot, User, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { sendChatMessageStream, checkConnection, ChatMessage, SourceInfo } from '@/services/chatApi';

type ChatbotStatus = 'online' | 'connecting' | 'offline';

const statusConfig = {
  online: {
    color: 'bg-green-500',
    pulseColor: 'bg-green-400',
    message: "Hey there! I'm Sree AI 🤖 Ask me anything about Sai Sreenath!",
  },
  connecting: {
    color: 'bg-yellow-500',
    pulseColor: 'bg-yellow-400',
    message: "Connecting to AI assistant...",
  },
  offline: {
    color: 'bg-red-500',
    pulseColor: 'bg-red-400',
    message: "Assistant is offline. Please try again later.",
  },
};

const thinkingMessage = "Hey! I'm Sree AI 🤖 Talk to me to know more about Sai!";

function TypewriterText({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[index]);
        setIndex(prev => prev + 1);
      }, 50);
      return () => clearTimeout(timeout);
    } else {
      const resetTimeout = setTimeout(() => {
        setDisplayText('');
        setIndex(0);
      }, 3000);
      return () => clearTimeout(resetTimeout);
    }
  }, [index, text]);

  return (
    <span>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${
        isUser ? 'bg-primary text-primary-foreground' : 'bg-muted'
      }`}>
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>
      <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
        isUser 
          ? 'bg-primary text-primary-foreground rounded-br-sm' 
          : 'bg-muted rounded-bl-sm'
      }`}>
        <p className="whitespace-pre-wrap break-words">{message.content}</p>
      </div>
    </motion.div>
  );
}

export function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(true);
  const [status, setStatus] = useState<ChatbotStatus>('connecting');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Clear chat for this session only
  const clearChat = useCallback(() => {
    setMessages([]);
    setStreamingContent('');
    setIsStreaming(false);
    setIsLoading(false);
  }, []);

  // Check connection status on mount and periodically
  useEffect(() => {
    let isFirst = true;
    const checkStatus = async () => {
      if (isFirst) {
        setStatus('connecting');
        isFirst = false;
      }
      const connectionStatus = await checkConnection();
      setStatus(connectionStatus);
    };

    checkStatus();
    const interval = setInterval(checkStatus, 60000); // Check every 60 seconds

    return () => clearInterval(interval);
  }, []);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && status === 'online') {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, status]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setShowBubble(true);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const [streamingContent, setStreamingContent] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);

  const handleSendMessage = useCallback(async () => {
    if (!inputValue.trim() || isLoading || status !== 'online') return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setIsStreaming(true);
    setStreamingContent('');

    let fullContent = '';
    let sources: SourceInfo[] = [];

    await sendChatMessageStream(userMessage.content, {
      onContent: (content) => {
        fullContent += content;
        setStreamingContent(fullContent);
      },
      onSources: (receivedSources) => {
        sources = receivedSources;
      },
      onDone: () => {
        const assistantMessage: ChatMessage = {
          role: 'assistant',
          content: fullContent,
          sources: sources,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, assistantMessage]);
        setStreamingContent('');
        setIsStreaming(false);
        setIsLoading(false);
      },
      onError: async (error) => {
        console.error('Chat error:', error);
        const errorMessage: ChatMessage = {
          role: 'assistant',
          content: "I'm sorry, I encountered an error. Please try again.",
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, errorMessage]);
        setStreamingContent('');
        setIsStreaming(false);
        setIsLoading(false);
        
        // Check if we went offline
        const connectionStatus = await checkConnection();
        setStatus(connectionStatus);
      }
    });
  }, [inputValue, isLoading, status]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const config = statusConfig[status];

  return (
    <div ref={containerRef} className="fixed bottom-24 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-16 right-0 w-80 sm:w-96"
          >
            <Card className="shadow-xl border-2 flex flex-col max-h-[70vh]">
              {/* Header */}
              <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between border-b flex-shrink-0">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <span className={`w-3 h-3 rounded-full ${config.color} block`} />
                    <span className={`absolute inset-0 w-3 h-3 rounded-full ${config.pulseColor} animate-ping opacity-75`} />
                  </div>
                  <div>
                    <span className="font-semibold text-sm block">Sree AI</span>
                    <span className="text-xs text-muted-foreground">
                      {status === 'online' ? 'Online' : status === 'connecting' ? 'Connecting...' : 'Offline'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {messages.length > 0 && (
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={clearChat} title="Clear chat">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setIsOpen(false); setShowBubble(true); }}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="p-4 flex-1 overflow-y-auto min-h-[200px] max-h-[400px]">
                {messages.length === 0 && !isStreaming ? (
                  <div className="bg-muted rounded-lg p-3 mb-3">
                    <p className="text-sm text-muted-foreground">
                      {config.message}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {messages.map((msg, idx) => (
                      <MessageBubble key={idx} message={msg} />
                    ))}
                    {/* Streaming message */}
                    {isStreaming && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex gap-2"
                      >
                        <div className="flex-shrink-0 w-7 h-7 rounded-full bg-muted flex items-center justify-center">
                          <Bot className="h-4 w-4" />
                        </div>
                        <div className="max-w-[80%] rounded-2xl rounded-bl-sm px-3 py-2 text-sm bg-muted">
                          {streamingContent ? (
                            <p className="whitespace-pre-wrap break-words">{streamingContent}<span className="animate-pulse">|</span></p>
                          ) : (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          )}
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}
                <div ref={messagesEndRef} />
              </CardContent>

              {/* Input */}
              {status === 'online' && (
                <div className="p-4 pt-2 border-t flex-shrink-0">
                  <div className="flex gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask about Sai's projects, skills..."
                      className="flex-1 px-3 py-2 text-sm rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      disabled={isLoading}
                    />
                    <Button
                      size="icon"
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || isLoading}
                      className="flex-shrink-0"
                    >
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating bubble and button */}
      <div className="flex items-end gap-2">
        <AnimatePresence>
          {showBubble && !isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: 20 }}
              className="relative"
            >
              <div className="bg-card/75 backdrop-blur-sm border border-border/50 rounded-2xl rounded-br-sm px-4 py-3 shadow-lg max-w-[200px]">
                <p className="text-xs font-medium text-foreground">
                  <TypewriterText text={thinkingMessage} />
                </p>
              </div>
              <div className="absolute -bottom-1 -right-1 flex gap-0.5">
                <span className="w-2 h-2 bg-card/75 backdrop-blur-sm border border-border/50 rounded-full" />
                <span className="w-1.5 h-1.5 bg-card/75 backdrop-blur-sm border border-border/50 rounded-full" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={() => {
              if (isOpen) {
                setIsOpen(false);
                setShowBubble(true);
              } else {
                setIsOpen(true);
                setShowBubble(false);
              }
            }}
            size="icon"
            className="rounded-full h-14 w-14 shadow-lg relative"
          >
            <MessageCircle className="h-6 w-6" />
            <span className={`absolute top-1 right-1 w-3 h-3 rounded-full ${config.color} border-2 border-background`} />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface MediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  mediaType: 'video' | 'pdf';
  mediaUrl: string;
  title: string;
}

export function MediaModal({ isOpen, onClose, mediaType, mediaUrl, title }: MediaModalProps) {
  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleEscape]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl max-h-[90vh] bg-card rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-card/95 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-foreground truncate pr-4">{title}</h3>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-muted hover:bg-destructive hover:text-destructive-foreground transition-colors duration-200"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </motion.button>
            </div>

            {/* Content */}
            <div className="relative bg-black">
              {mediaType === 'video' ? (
                <video
                  src={mediaUrl}
                  controls
                  autoPlay
                  className="w-full max-h-[calc(90vh-80px)] object-contain"
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <iframe
                  src={mediaUrl}
                  title={title}
                  className="w-full h-[calc(90vh-80px)]"
                  style={{ border: 'none' }}
                />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

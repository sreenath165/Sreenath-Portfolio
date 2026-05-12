import { useState, useRef, useEffect } from 'react';
import { Play, FileText } from 'lucide-react';

interface VideoThumbnailProps {
  mediaType: 'video' | 'pdf';
  mediaUrl: string;
  onClick?: () => void;
}

export function VideoThumbnail({ mediaType, mediaUrl, onClick }: VideoThumbnailProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (mediaType === 'video' && videoRef.current) {
      videoRef.current.currentTime = 1;
    }
  }, [mediaType]);

  if (mediaType === 'pdf') {
    return (
      <div 
        className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 to-blue-500/10 cursor-pointer group"
        onClick={onClick}
      >
        <div className="relative">
          <FileText className="h-16 w-16 text-primary/60 group-hover:text-primary transition-colors duration-300" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-10 h-10 rounded-full bg-primary/90 flex items-center justify-center shadow-lg">
              <Play className="h-5 w-5 text-primary-foreground ml-0.5" />
            </div>
          </div>
        </div>
        <span className="text-sm text-muted-foreground mt-3 group-hover:text-foreground transition-colors">
          View PDF Document
        </span>
      </div>
    );
  }

  return (
    <div 
      className="w-full h-full relative cursor-pointer group"
      onMouseEnter={() => {
        setIsHovering(true);
        if (videoRef.current) {
          videoRef.current.play().catch(() => {});
        }
      }}
      onMouseLeave={() => {
        setIsHovering(false);
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 1;
        }
      }}
      onClick={onClick}
    >
      <video
        ref={videoRef}
        src={mediaUrl}
        muted
        loop
        playsInline
        preload="metadata"
        className="w-full h-full object-cover"
              />
      
      {/* Play overlay */}
      <div className={`absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300 ${isHovering ? 'opacity-0' : 'opacity-100'}`}>
        <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
          <Play className="h-7 w-7 text-primary-foreground ml-1" />
        </div>
      </div>

      {/* Hover indicator */}
      <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`}>
        <span className="text-xs text-white font-medium">Click to play full video</span>
      </div>
    </div>
  );
}

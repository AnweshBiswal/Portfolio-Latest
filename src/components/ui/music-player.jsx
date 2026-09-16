import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef(null);
  
  useEffect(() => {
    // Fade in/out logic
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Audio play failed:", e));
        // Fade in
        let vol = 0;
        audioRef.current.volume = 0;
        const fadeInt = setInterval(() => {
          if (vol < volume) {
            vol += 0.05;
            audioRef.current.volume = Math.min(vol, volume);
          } else {
            clearInterval(fadeInt);
          }
        }, 50);
      } else {
        // Fade out
        let vol = audioRef.current.volume;
        const fadeInt = setInterval(() => {
          if (vol > 0.05) {
            vol -= 0.05;
            audioRef.current.volume = Math.max(vol, 0);
          } else {
            audioRef.current.volume = 0;
            audioRef.current.pause();
            clearInterval(fadeInt);
          }
        }, 50);
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    const handleInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        setIsPlaying(true);
      }
    };

    window.addEventListener('click', handleInteraction);
    window.addEventListener('keydown', handleInteraction);
    window.addEventListener('scroll', handleInteraction, { once: true });
    
    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
      window.removeEventListener('scroll', handleInteraction);
    };
  }, [hasInteracted]);

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[100] flex items-center gap-2 md:gap-3 bg-background/30 backdrop-blur-xl border border-foreground/10 rounded-full p-1.5 md:p-2 shadow-2xl transition-all duration-500 hover:bg-background/50 hover:border-foreground/30 group">
      <audio 
        ref={audioRef} 
        src="/music/song.mp3" 
        loop 
        preload="auto"
      />
      
      <button 
        onClick={() => setIsPlaying(!isPlaying)}
        className="relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-foreground/10 hover:bg-foreground/20 text-foreground transition-colors"
      >
        {isPlaying && (
          <span className="absolute inset-0 rounded-full border-2 border-[var(--text-primary)]/40 animate-ping opacity-60" />
        )}
        {isPlaying ? <Pause size={18} className="md:w-5 md:h-5" /> : <Play size={18} className="ml-1 md:w-5 md:h-5" />}
      </button>

      {/* Volume controls - hidden on mobile as they have hardware buttons */}
      <div className="hidden md:flex items-center gap-3 pr-4 w-0 overflow-hidden opacity-0 group-hover:w-36 group-hover:opacity-100 transition-all duration-500 ease-in-out">
        <button 
          onClick={() => setIsMuted(!isMuted)}
          className="text-foreground/70 hover:text-foreground transition-colors"
        >
          {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.01" 
          value={isMuted ? 0 : volume}
          onChange={(e) => {
            setVolume(parseFloat(e.target.value));
            if (isMuted && e.target.value > 0) setIsMuted(false);
          }}
          className="w-full h-1 bg-foreground/20 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-[var(--text-primary)] [&::-webkit-slider-thumb]:rounded-full"
        />
      </div>
    </div>
  );
}

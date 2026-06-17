import { useState, useRef, useEffect } from 'react';

export default function MusicPlayer({ src }) {
  const [playing, setPlaying] = useState(false);
  const baseUrl = import.meta.env.BASE_URL;
  
  const audioSrc = src?.startsWith('http') 
    ? src 
    : `${baseUrl}${src?.replace(/^\.\//, '').replace(/^\//, '') || ''}`;
  
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioSrc) {
      audioRef.current = new Audio(audioSrc);
      audioRef.current.volume = 0.4;
      audioRef.current.loop = true;
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [audioSrc]);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setPlaying(!playing);
  };

  if (!audioSrc) return null;

  return (
    <button
      onClick={toggle}
      className="fixed bottom-5 right-5 z-50 w-12 h-12 rounded-full flex items-center justify-center shadow-lg text-white text-xl hover:scale-110 transition-transform"
      style={{ backgroundColor: playing ? 'var(--primary-dark)' : 'var(--primary)' }}
      aria-label="Toggle music"
    >
      {playing ? '🎵' : '🔇'}
    </button>
  );
}
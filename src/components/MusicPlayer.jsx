import { useState, useEffect, useRef } from 'react';

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
      audioRef.current.volume = 0.5;
      audioRef.current.loop = true;
      
      // Coba autoplay (mungkin diblokir browser)
      audioRef.current.play().then(() => {
        setPlaying(true);
      }).catch(() => {
        console.log('🎵 Klik tombol untuk memutar musik');
      });
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
      className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg text-white text-2xl hover:scale-110 transition-transform animate-bounce-slow"
      style={{ backgroundColor: playing ? 'var(--primary-dark)' : 'var(--primary)' }}
      aria-label="Toggle music"
      title={playing ? 'Matikan musik' : 'Nyalakan musik'}
    >
      {playing ? '🎵' : '🔇'}
    </button>
  );
}
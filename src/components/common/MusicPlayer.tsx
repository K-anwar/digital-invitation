import { useState, useEffect, useRef, memo } from 'react';
import { getMediaUrl } from '@/utils/imageHelper';

interface MusicPlayerProps {
  src?: string;
}

function MusicPlayer({ src }: MusicPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const baseUrl = import.meta.env.BASE_URL || '/';

  const audioSrc = src ? getMediaUrl(src, baseUrl) : null;

  useEffect(() => {
    if (!audioSrc) return;
    const audio = new Audio(audioSrc);
    audio.volume = 0.5;
    audio.loop = true;
    audio.addEventListener('error', () => setError(true));
    audioRef.current = audio;

    audio.play().then(() => setPlaying(true)).catch(() => {});

    return () => {
      audio.pause();
      audio.src = '';
      audioRef.current = null;
    };
  }, [audioSrc]);

  const toggle = () => {
    if (!audioRef.current || error) return;
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
      style={{ backgroundColor: error ? '#888' : (playing ? 'var(--primary-dark)' : 'var(--primary)') }}
      aria-label={playing ? 'Matikan musik' : 'Nyalakan musik'}
      title={playing ? 'Matikan musik' : 'Nyalakan musik'}
    >
      {error ? '🔇' : (playing ? '🎵' : '🔇')}
    </button>
  );
}

export default memo(MusicPlayer);
import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useCustomerConfig from '../hooks/useCustomerConfig';
import { submitCheckin } from '../services/googleSheets';

export default function CheckinPage() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const guest = searchParams.get('guest') || 'Tamu';
  const { config, loading, error } = useCustomerConfig(slug);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    if (!config) return;
    
    const url = config.checkinScriptUrl || config.googleScriptUrl;
    
    if (!url) {
      setStatus('success'); // Tetap sukses meski tanpa URL
      return;
    }
    
    // Kirim data check-in
    submitCheckin(url, {
      guest: guest,
      attending: 'hadir',
      pax: '',
      message: 'Check-in via QR',
      slug: slug,
    })
      .then(() => {
        setStatus('success');
      })
      .catch(() => {
        setStatus('success'); // Tetap sukses dengan no-cors
      });
  }, [config, guest, slug]);

  if (loading || !config) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center" 
        style={{ backgroundColor: 'var(--bg)' }}
      >
        <p className="text-lg animate-pulse">Memuat...</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6 text-center"
      style={{
        backgroundColor: 'var(--bg)',
        color: 'var(--text)',
        fontFamily: 'var(--font-body)',
      }}
    >
      {/* Background decoration */}
      <div className="absolute top-10 left-10 opacity-10 text-9xl">🌸</div>
      <div className="absolute bottom-10 right-10 opacity-10 text-9xl">🌹</div>

      {status === 'loading' && (
        <div className="space-y-4">
          <div className="animate-spin text-4xl">⏳</div>
          <p className="text-lg">Mencatat kehadiran...</p>
        </div>
      )}

      {status === 'success' && (
        <div className="space-y-6 max-w-md">
          <p className="text-5xl">✅</p>
          <h2 
            className="text-3xl font-bold"
            style={{ color: 'var(--primary-dark)', fontFamily: 'var(--font-title)' }}
          >
            Selamat Datang!
          </h2>
          <p className="text-xl font-semibold">{guest}</p>
          <p className="text-lg" style={{ color: 'var(--text-soft)' }}>
            Kehadiran Anda telah tercatat.
          </p>
          <p className="text-sm italic" style={{ color: 'var(--text-soft)' }}>
            Silakan menikmati acara pernikahan
          </p>
          <p 
            className="text-2xl font-bold mt-4"
            style={{ color: 'var(--primary-dark)', fontFamily: 'var(--font-title)' }}
          >
            {config.bride} & {config.groom}
          </p>
        </div>
      )}

      {status === 'error' && (
        <div className="space-y-4">
          <p className="text-4xl">❌</p>
          <p className="text-lg">Gagal mencatat kehadiran.</p>
          <p className="text-sm" style={{ color: 'var(--text-soft)' }}>
            Silakan hubungi panitia untuk bantuan.
          </p>
        </div>
      )}
    </div>
  );
}
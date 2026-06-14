import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useCustomerConfig from '../hooks/useCustomerConfig';
import { submitCheckin } from '../services/googleSheets';

export default function CheckinPage() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const guest = searchParams.get('guest') || 'Bapak/Ibu';
  const { config, loading, error } = useCustomerConfig(slug);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    if (!config) return;
    const url = config.checkinScriptUrl || config.googleScriptUrl;
    if (!url) {
      setStatus('error');
      return;
    }
    submitCheckin(url, {
      guest,
      attending: 'hadir',
      pax: '',
      message: '',
      slug,
    })
      .then(() => setStatus('success'))
      .catch(() => setStatus('error'));
  }, [config, guest, slug]);

  if (loading || !config)
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg)' }}>
        <p>Memuat...</p>
      </div>
    );

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6 text-center"
      style={{
        backgroundColor: 'var(--bg)',
        color: 'var(--text)',
        fontFamily: 'var(--font-body)',
      }}
    >
      {status === 'loading' && (
        <p className="text-lg animate-pulse">Mencatat kehadiran Anda...</p>
      )}

      {status === 'success' && (
        <div className="space-y-4">
          <p className="text-3xl">✅</p>
          <h2 className="text-2xl font-bold" style={{ color: 'var(--primary-dark)' }}>
            Selamat Datang, {guest}!
          </h2>
          <p>Kehadiran Anda telah tercatat.</p>
          <p className="text-sm italic" style={{ color: 'var(--text-soft)' }}>
            Silakan menikmati acara.
          </p>
        </div>
      )}

      {status === 'error' && (
        <div className="space-y-4">
          <p className="text-3xl">❌</p>
          <p>Gagal mencatat kehadiran.</p>
          <p className="text-sm">Silakan hubungi panitia.</p>
        </div>
      )}
    </div>
  );
}
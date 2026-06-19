import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useCustomerConfig from '@/hooks/useCustomerConfig';
import { saveCheckin } from '@/api/firebase';
import Ornament from '@/components/common/Ornament';
import LoadingScreen from '@/components/common/LoadingScreen';

export default function CheckinPage() {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const guest = searchParams.get('guest') || 'Tamu';
  const { config, loading, error } = useCustomerConfig(slug || '');
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!config) return;

    const doCheckin = async () => {
      try {
        await saveCheckin({
          guestName: guest,
          slug: slug || '',
        });
        setStatus('success');
      } catch (err) {
        setStatus('error');
        setErrorMsg(err instanceof Error ? err.message : 'Gagal mencatat kehadiran');
      }
    };

    doCheckin();
  }, [config, guest, slug]);

  if (loading || !config) return <LoadingScreen />;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center" style={{ backgroundColor: 'var(--bg)' }}>
      <Ornament />
      <div className="relative z-10 max-w-md w-full">
        {status === 'loading' && (
          <div className="space-y-4">
            <div className="animate-spin text-4xl">⏳</div>
            <p className="text-lg">Mencatat kehadiran...</p>
          </div>
        )}
        {status === 'success' && (
          <div className="space-y-6">
            <p className="text-5xl">✅</p>
            <h2 className="text-3xl font-bold" style={{ color: 'var(--primary-dark)' }}>
              Selamat Datang!
            </h2>
            <p className="text-xl font-semibold">{guest}</p>
            <p className="text-lg" style={{ color: 'var(--text-soft)' }}>
              Kehadiran Anda telah tercatat di database.
            </p>
          </div>
        )}
        {status === 'error' && (
          <div className="space-y-4">
            <p className="text-4xl">❌</p>
            <p className="text-lg">Gagal mencatat kehadiran.</p>
            <p className="text-sm" style={{ color: 'var(--text-soft)' }}>{errorMsg}</p>
            <button onClick={() => window.location.reload()} className="px-6 py-2 bg-pink-500 text-white rounded-full">
              Coba Lagi
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
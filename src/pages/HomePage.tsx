import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
import useCustomerConfig from '@/hooks/useCustomerConfig';
import Envelope from '@/components/invitation/Envelope';
import LoadingScreen from '@/components/common/LoadingScreen';
import { getMediaUrl, getCloudinaryThumbnail } from '@/utils/imageHelper';

export default function HomePage() {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const guest = searchParams.get('guest') || 'Bapak/Ibu';
  const { config, loading, error, retry } = useCustomerConfig(slug || '');
  const navigate = useNavigate();
  const baseUrl = import.meta.env.BASE_URL || '/';

  const bridePhotoUrl = useMemo(() => {
    if (!config?.bridePhoto) return '';
    const url = getMediaUrl(config.bridePhoto, baseUrl);
    return getCloudinaryThumbnail(url, 200, 200);
  }, [config?.bridePhoto, baseUrl]);

  const groomPhotoUrl = useMemo(() => {
    if (!config?.groomPhoto) return '';
    const url = getMediaUrl(config.groomPhoto, baseUrl);
    return getCloudinaryThumbnail(url, 200, 200);
  }, [config?.groomPhoto, baseUrl]);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatTime = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return '';
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) return <LoadingScreen />;

  if (error || !config) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ backgroundColor: 'var(--bg)', color: 'red' }}>
        <p className="text-4xl">😔</p>
        <p className="text-lg">{error || 'Undangan tidak ditemukan'}</p>
        <div className="flex gap-4">
          <button 
            onClick={retry}
            className="px-6 py-2 rounded-full text-white"
            style={{ backgroundColor: 'var(--primary)' }}
          >
            🔄 Coba Lagi
          </button>
          <button 
            onClick={() => navigate('/')}
            className="px-6 py-2 rounded-full border"
            style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}
          >
            🏠 Kembali
          </button>
        </div>
      </div>
    );
  }

  const handleNavigateToInvitation = () => {
    navigate(`/${slug}/invitation?guest=${encodeURIComponent(guest)}`);
  };

  const envelopeContent = (
    <div className="text-center space-y-6">
      {(bridePhotoUrl || groomPhotoUrl) && (
        <div className="flex justify-center items-center gap-3">
          {bridePhotoUrl && (
            <div
              className="w-20 h-20 rounded-full overflow-hidden border-2 shadow-md"
              style={{ borderColor: 'var(--primary-light)' }}
            >
              <img src={bridePhotoUrl} alt={config.bride} className="w-full h-full object-cover" />
            </div>
          )}
          <div className="text-xl text-pink-400">&</div>
          {groomPhotoUrl && (
            <div
              className="w-20 h-20 rounded-full overflow-hidden border-2 shadow-md"
              style={{ borderColor: 'var(--primary-light)' }}
            >
              <img src={groomPhotoUrl} alt={config.groom} className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      )}

      <div className="space-y-2">
        <p className="text-sm tracking-widest uppercase" style={{ color: 'var(--accent)' }}>
          Wedding Invitation
        </p>
        <h2
          className="text-3xl md:text-4xl font-bold"
          style={{ fontFamily: 'var(--font-title)', color: 'var(--primary-dark)' }}
        >
          {config.bride} & {config.groom}
        </h2>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-xs uppercase tracking-wide mb-1" style={{ color: 'var(--accent)' }}>
            Hari & Tanggal
          </p>
          <p className="font-semibold">{formatDate(config.eventDate)}</p>
          <p className="text-sm" style={{ color: 'var(--text-soft)' }}>
            Pukul {formatTime(config.eventDate)}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide mb-1" style={{ color: 'var(--accent)' }}>
            Lokasi
          </p>
          <p className="font-semibold">{config.location}</p>
          <p className="text-sm" style={{ color: 'var(--text-soft)' }}>
            {config.address}
          </p>
        </div>
      </div>

      <p className="italic text-sm" style={{ color: 'var(--text-soft)' }}>
        Kepada Yth. <strong>{guest}</strong>
      </p>

      <a
        href={config.mapsUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-block text-sm underline underline-offset-2"
        style={{ color: 'var(--primary-dark)' }}
      >
        Buka di Google Maps
      </a>
    </div>
  );

  return (
    <Envelope config={config} onOpenInvitation={handleNavigateToInvitation}>
      {envelopeContent}
    </Envelope>
  );
}
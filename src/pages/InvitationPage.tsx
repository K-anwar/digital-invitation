import { useParams, useSearchParams, Link } from 'react-router-dom';
import { lazy, Suspense, useMemo } from 'react';
import useCustomerConfig from '@/hooks/useCustomerConfig';
import LayoutSelector from '@/layouts/LayoutSelector';
import InvitationCard from '@/components/invitation/InvitationCard';
import FlipCountdown from '@/components/common/FlipCountdown';
import Gallery from '@/components/invitation/Gallery';
import MusicPlayer from '@/components/common/MusicPlayer';
import QRCodeGenerator from '@/components/common/QRCodeGenerator';
import LoveStory from '@/components/invitation/LoveStory';
import ShareButton from '@/components/common/ShareButton';
import DressCode from '@/components/common/DressCode';
import SEO from '@/components/common/SEO';
import Ornament from '@/components/common/Ornament';
import LoadingScreen from '@/components/common/LoadingScreen';
import GuestBook from '@/components/common/GuestBook';

const WeddingGift = lazy(() => import('@/components/invitation/WeddingGift'));

export default function InvitationPage() {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const guest = searchParams.get('guest') || 'Bapak/Ibu';
  const { config, loading, error } = useCustomerConfig(slug || '');
  const baseUrl = import.meta.env.BASE_URL || '/';

  const seoImage = useMemo(() => {
    const firstImage = config?.gallery?.[0];
    if (!firstImage) return '';
    return firstImage.startsWith('http')
      ? firstImage
      : `${window.location.origin}${baseUrl}${firstImage.replace(/^\.\//, '').replace(/^\//, '')}`;
  }, [config?.gallery, baseUrl]);

  if (loading) return <LoadingScreen />;
  if (error || !config) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-gradient)' }}>
        <div className="text-center">
          <p className="text-4xl mb-4">😔</p>
          <p className="text-red-500">{error || 'Undangan tidak ditemukan'}</p>
          <Link to="/" className="mt-4 inline-block text-pink-500 underline">
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  const checkinUrl = `${window.location.origin}${baseUrl}#/${slug}/checkin?guest=${encodeURIComponent(guest)}`;

  return (
    <LayoutSelector config={config}>
      <SEO
        title={`Undangan Pernikahan ${config.bride} & ${config.groom}`}
        description={`Kepada Yth. ${guest}, kami mengundang Anda untuk hadir di acara pernikahan ${config.bride} & ${config.groom}`}
        image={seoImage}
      />
      <Ornament />
      <ShareButton config={config} guest={guest} />
      <MusicPlayer src={config.music} />

      <div className="space-y-12">
        {config.openingQuote && (
          <div data-aos="fade-down" className="text-center px-4 py-6 glass-card" style={{ borderRadius: 'var(--radius-lg)' }}>
            <p className="text-lg italic leading-relaxed" style={{ color: 'var(--text-soft)' }}>
              "{config.openingQuote}"
            </p>
          </div>
        )}

        <div data-aos="fade-up">
          <InvitationCard config={config} guest={guest} />
        </div>

        <div data-aos="fade-up" data-aos-delay="100">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-4 glass-card" style={{ borderRadius: 'var(--radius)' }}>
              <p className="text-xs uppercase tracking-wide" style={{ color: 'var(--accent)' }}>
                Orang Tua Mempelai Wanita
              </p>
              <p className="font-semibold mt-1">{config.brideParents}</p>
            </div>
            <div className="p-4 glass-card" style={{ borderRadius: 'var(--radius)' }}>
              <p className="text-xs uppercase tracking-wide" style={{ color: 'var(--accent)' }}>
                Orang Tua Mempelai Pria
              </p>
              <p className="font-semibold mt-1">{config.groomParents}</p>
            </div>
          </div>
        </div>

        <div data-aos="zoom-in" data-aos-delay="200">
          <FlipCountdown targetDate={config.eventDate} />
        </div>

        <div data-aos="fade-right">
          <LoveStory stories={config.loveStory} />
        </div>

        <div data-aos="fade-up">
          <Gallery images={config.gallery} />
        </div>

        {config.mapsEmbedUrl && (
          <div data-aos="fade-up" className="space-y-3">
            <h3 className="section-title">📍 Lokasi Acara</h3>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <iframe
                src={config.mapsEmbedUrl}
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        )}

        {config.dressCode && (
          <div data-aos="fade-up">
            <DressCode dressCode={config.dressCode} />
          </div>
        )}

        <Suspense fallback={<div className="text-center py-8">Memuat...</div>}>
          {config.weddingGift && <WeddingGift giftConfig={config.weddingGift} />}
        </Suspense>

        <div data-aos="zoom-in" className="flex flex-col items-center gap-4 glass-card p-6" style={{ borderRadius: 'var(--radius-lg)' }}>
          <h3 className="text-xl font-semibold gradient-text" style={{ fontFamily: 'var(--font-title)' }}>
            Scan QR Code Saat Hadir
          </h3>
          <div className="bg-white p-4 rounded-2xl shadow-lg">
            <QRCodeGenerator value={checkinUrl} size={180} />
          </div>
        </div>

        <div data-aos="fade-up" className="flex flex-col items-center gap-3">
          <Link to={`/${slug}/rsvp?guest=${encodeURIComponent(guest)}`} className="btn-premium text-lg">
            📝 Konfirmasi Kehadiran
          </Link>
        </div>

        <div data-aos="fade-up">
          <GuestBook slug={slug || ''} />
        </div>

        <div data-aos="fade-up" className="text-center py-8 space-y-3">
          <hr className="premium-divider" />
          <p className="text-2xl font-bold gradient-text" style={{ fontFamily: 'var(--font-title)' }}>
            {config.bride} & {config.groom}
          </p>
        </div>
      </div>
    </LayoutSelector>
  );
}
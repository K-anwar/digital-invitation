import { useMemo } from 'react';

export default function InvitationCard({ config, guest }) {
  const baseUrl = import.meta.env.BASE_URL;

  const bridePhotoUrl = useMemo(() => {
    if (!config.bridePhoto) return '';
    return config.bridePhoto.startsWith('http') 
      ? config.bridePhoto 
      : `${baseUrl}${config.bridePhoto.replace(/^\.\//, '').replace(/^\//, '')}`;
  }, [config.bridePhoto, baseUrl]);

  const groomPhotoUrl = useMemo(() => {
    if (!config.groomPhoto) return '';
    return config.groomPhoto.startsWith('http') 
      ? config.groomPhoto 
      : `${baseUrl}${config.groomPhoto.replace(/^\.\//, '').replace(/^\//, '')}`;
  }, [config.groomPhoto, baseUrl]);

  return (
    <div
      className="p-8 md:p-10 text-center relative overflow-hidden glass-card"
      style={{ 
        borderRadius: 'var(--radius-lg)',
      }}
    >
      <div 
        className="absolute top-0 left-0 w-full h-1.5" 
        style={{ background: 'var(--primary-gradient)' }}
      ></div>

      <p className="text-sm tracking-widest uppercase mb-6" style={{ color: 'var(--accent)', letterSpacing: '0.3em' }}>
        We Are Getting Married
      </p>
      
      {(bridePhotoUrl || groomPhotoUrl) && (
        <div className="flex justify-center items-center gap-4 my-8">
          {bridePhotoUrl && (
            <div 
              className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden animate-border-glow"
              style={{ 
                border: '3px var(--border-style) var(--border-color)',
                boxShadow: 'var(--shadow-lg)'
              }}
            >
              <img 
                src={bridePhotoUrl} 
                alt={config.bride} 
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
          )}
          <div className="text-3xl gradient-text font-bold">&</div>
          {groomPhotoUrl && (
            <div 
              className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden animate-border-glow"
              style={{ 
                border: '3px var(--border-style) var(--border-color)',
                boxShadow: 'var(--shadow-lg)'
              }}
            >
              <img 
                src={groomPhotoUrl} 
                alt={config.groom} 
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
          )}
        </div>
      )}

      <h1 
        className="text-5xl md:text-7xl font-bold my-6 gradient-text"
        style={{ fontFamily: 'var(--font-title)' }}
      >
        {config.bride} <span className="text-3xl md:text-4xl" style={{ color: 'var(--primary)' }}>&</span> {config.groom}
      </h1>
      
      <p className="italic text-lg mb-2" style={{ color: 'var(--text-soft)' }}>
        Kepada Yth.
      </p>
      <p className="text-xl font-semibold mb-8" style={{ color: 'var(--primary-dark)' }}>
        {guest}
      </p>

      <hr className="premium-divider" />

      <div className="mt-8 grid grid-cols-2 gap-6">
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--accent)' }}>
            Akad & Resepsi
          </p>
          <p className="font-bold text-lg" style={{ color: 'var(--text)' }}>
            {new Date(config.eventDate).toLocaleDateString('id-ID', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
          <p className="text-sm mt-1" style={{ color: 'var(--text-soft)' }}>
            Pukul{' '}
            {new Date(config.eventDate).toLocaleTimeString('id-ID', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--accent)' }}>
            Lokasi
          </p>
          <p className="font-bold text-lg" style={{ color: 'var(--text)' }}>
            {config.location}
          </p>
          <p className="text-sm mt-1" style={{ color: 'var(--text-soft)' }}>
            {config.address}
          </p>
        </div>
      </div>

      <a
        href={config.mapsUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-block mt-8 text-sm font-medium hover:opacity-70 transition"
        style={{ color: 'var(--primary)' }}
      >
        📍 Buka di Google Maps
      </a>
    </div>
  );
}
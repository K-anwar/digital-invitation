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
      className="p-8 md:p-10 rounded-3xl text-center backdrop-blur-sm relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-card)', boxShadow: 'var(--shadow)', borderRadius: 'var(--radius)' }}
    >
      <div className="absolute top-0 left-0 w-full h-1.5" style={{ backgroundColor: 'var(--primary)' }}></div>

      <p className="text-sm tracking-widest uppercase" style={{ color: 'var(--accent)' }}>We Are Getting Married</p>
      
      {/* Foto Pengantin */}
      {(bridePhotoUrl || groomPhotoUrl) && (
        <div className="flex justify-center items-center gap-4 my-6">
          {bridePhotoUrl && (
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 shadow-lg"
              style={{ borderColor: 'var(--primary-light)' }}
            >
              <img 
                src={bridePhotoUrl} 
                alt={config.bride} 
                className="w-full h-full object-cover"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
          )}
          <div className="text-2xl text-pink-400">&</div>
          {groomPhotoUrl && (
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 shadow-lg"
              style={{ borderColor: 'var(--primary-light)' }}
            >
              <img 
                src={groomPhotoUrl} 
                alt={config.groom} 
                className="w-full h-full object-cover"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
          )}
        </div>
      )}

      <h1 className="text-5xl md:text-6xl font-bold my-4" style={{ fontFamily: 'var(--font-title)', color: 'var(--primary-dark)' }}>
        {config.bride} <span className="text-3xl">&</span> {config.groom}
      </h1>
      <p className="italic opacity-80" style={{ color: 'var(--text-soft)' }}>Kepada Yth. <strong>{guest}</strong></p>

      <div className="mt-8 grid grid-cols-2 gap-4 text-left">
        <div>
          <p className="text-sm uppercase tracking-wide" style={{ color: 'var(--accent)' }}>Akad & Resepsi</p>
          <p className="font-semibold">
            {new Date(config.eventDate).toLocaleDateString('id-ID', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
          <p className="font-medium">
            {new Date(config.eventDate).toLocaleTimeString('id-ID', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
        <div>
          <p className="text-sm uppercase tracking-wide" style={{ color: 'var(--accent)' }}>Lokasi</p>
          <p className="font-semibold">{config.location}</p>
          <p className="text-sm" style={{ color: 'var(--text-soft)' }}>{config.address}</p>
        </div>
      </div>

      <a
        href={config.mapsUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-block mt-6 text-sm underline underline-offset-2"
        style={{ color: 'var(--primary-dark)' }}
      >
        Buka di Google Maps
      </a>
    </div>
  );
}
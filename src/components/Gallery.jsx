import { useMemo } from 'react';

export default function Gallery({ images }) {
  const baseUrl = import.meta.env.BASE_URL;

  const processedImages = useMemo(() => {
    if (!images || images.length === 0) return [];
    return images.map((src) => {
      if (src.startsWith('http')) return src;
      return `${baseUrl}${src.replace(/^\.\//, '').replace(/^\//, '')}`;
    });
  }, [images, baseUrl]);

  if (!images || images.length === 0) return null;

  return (
    <div>
      <h3 
        className="text-center text-2xl font-semibold mb-4" 
        style={{ fontFamily: 'var(--font-title)', color: 'var(--primary-dark)' }}
      >
        Galeri Cinta
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {processedImages.map((src, index) => (
          <div 
            key={index} 
            className="rounded-xl overflow-hidden shadow-md transition-transform hover:scale-105"
          >
            <img 
              src={src} 
              alt={`Moment ${index + 1}`} 
              className="w-full h-40 object-cover" 
              loading="lazy"
              onError={(e) => { 
                e.target.src = 'https://via.placeholder.com/400x300?text=No+Image'; 
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
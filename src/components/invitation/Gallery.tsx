import { useMemo, memo } from 'react';
import { getGalleryUrls, getCloudinaryThumbnail } from '@/utils/imageHelper';

interface GalleryProps {
  images?: string[];
}

function Gallery({ images }: GalleryProps) {
  const baseUrl = import.meta.env.BASE_URL || '/';

  const processedImages = useMemo(() => {
    if (!images || images.length === 0) return [];
    const urls = getGalleryUrls(images, baseUrl);
    // Optimasi thumbnail untuk gallery
    return urls.map((url) => getCloudinaryThumbnail(url, 400, 400));
  }, [images, baseUrl]);

  if (!images || images.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3
        className="text-center text-2xl md:text-3xl font-semibold"
        style={{ fontFamily: 'var(--font-title)', color: 'var(--primary-dark)' }}
      >
        Galeri Cinta
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
        {processedImages.map((src, index) => (
          <div
            key={index}
            className="rounded-xl overflow-hidden shadow-md transition-transform hover:scale-105 aspect-square"
          >
            <img
              src={src}
              alt={`Moment ${index + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
              onError={(e) => {
                e.currentTarget.src =
                  'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" fill="%23f0f0f0"><rect width="200" height="200"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23999">📷</text></svg>';
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(Gallery);
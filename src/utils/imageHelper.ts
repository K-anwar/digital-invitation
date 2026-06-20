/**
 * Utility untuk memproses URL media (foto, musik, logo)
 * - Jika URL sudah http/https, langsung return
 * - Jika tidak, tambahkan baseUrl
 */
export function getMediaUrl(url?: string, baseUrl?: string): string {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  const base = baseUrl || import.meta.env.BASE_URL || '/';
  // Hapus leading slash di url jika ada
  const cleanUrl = url.replace(/^\.\//, '').replace(/^\//, '');
  return `${base}${cleanUrl}`;
}

/**
 * Untuk gallery (array of string)
 */
export function getGalleryUrls(urls?: string[], baseUrl?: string): string[] {
  if (!urls || urls.length === 0) return [];
  return urls.map((url) => getMediaUrl(url, baseUrl));
}

/**
 * Mendapatkan thumbnail dari Cloudinary (tambah parameter transformasi)
 * Hanya berlaku untuk URL Cloudinary
 */
export function getCloudinaryThumbnail(url: string, width = 200, height = 200): string {
  if (!url) return '';
  // Hanya proses jika URL dari Cloudinary
  if (url.includes('cloudinary.com')) {
    return url.replace('/upload/', `/upload/w_${width},h_${height},c_fill,q_auto,f_auto/`);
  }
  return url;
}
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  keywords?: string;
  author?: string;
  favicon?: string;      // <-- Tambahkan
  brandLogo?: string;    // <-- Untuk og:image alternatif
}

export default function SEO({
  title = 'Undangan Pernikahan Digital Premium',
  description = 'Undangan pernikahan digital elegan dengan RSVP, QR check-in, galeri foto, dan musik. Tersedia multi tema.',
  image = '',
  url = '',
  keywords = 'undangan pernikahan, wedding invitation, undangan digital, pernikahan, wedding',
  author = 'Digital Wedding Invitation',
  favicon = '',
  brandLogo = '',
}: SEOProps) {
  const siteUrl = url || (typeof window !== 'undefined' ? window.location.href : '');

  // Gunakan brandLogo sebagai fallback image jika image kosong
  const ogImage = image || brandLogo;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      
      {/* Favicon - dinamis dari Cloudinary */}
      {favicon ? (
        <>
          <link rel="icon" type="image/x-icon" href={favicon} />
          <link rel="apple-touch-icon" href={favicon} />
        </>
      ) : (
        <link rel="icon" href="https://res.cloudinary.com/dsmj2ml0m/image/upload/v1781927186/favicon_yvmc3j.png" />
      )}

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta property="og:url" content={siteUrl} />
      <meta property="og:type" content="website" />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
      
      <meta name="theme-color" content="#d4a0a0" />
    </Helmet>
  );
}
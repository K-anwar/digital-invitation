import { useEffect } from 'react';

export default function SEO({ 
  title = 'Undangan Pernikahan Digital Premium',
  description = 'Undangan pernikahan digital elegan dengan RSVP, QR check-in, galeri foto, dan musik. Tersedia multi tema.',
  image = '',
  url = '',
  keywords = 'undangan pernikahan, wedding invitation, undangan digital, pernikahan, wedding',
  author = 'Digital Wedding Invitation'
}) {
  useEffect(() => {
    // Update title
    if (title) {
      document.title = title;
    }
    
    // Helper function to set or update meta tags
    const setMetaTag = (attr, value, attrName = 'name') => {
      if (!value) return;
      
      const selector = attrName === 'property' 
        ? `meta[property="${attr}"]` 
        : `meta[name="${attr}"]`;
      
      let element = document.querySelector(selector);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attr);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', value);
    };

    // Basic Meta
    setMetaTag('description', description);
    setMetaTag('keywords', keywords);
    setMetaTag('author', author);
    setMetaTag('robots', 'index, follow');
    setMetaTag('viewport', 'width=device-width, initial-scale=1.0');
    
    // Open Graph (Facebook, LinkedIn)
    setMetaTag('og:title', title, 'property');
    setMetaTag('og:description', description, 'property');
    setMetaTag('og:image', image, 'property');
    setMetaTag('og:url', url || window.location.href, 'property');
    setMetaTag('og:type', 'website', 'property');
    setMetaTag('og:site_name', 'Digital Wedding Invitation', 'property');
    setMetaTag('og:locale', 'id_ID', 'property');
    
    // Twitter Card
    setMetaTag('twitter:card', 'summary_large_image', 'property');
    setMetaTag('twitter:title', title, 'property');
    setMetaTag('twitter:description', description, 'property');
    setMetaTag('twitter:image', image, 'property');
    
    // Additional
    setMetaTag('theme-color', '#d4a0a0');

  }, [title, description, image, url, keywords, author]);

  return null;
}
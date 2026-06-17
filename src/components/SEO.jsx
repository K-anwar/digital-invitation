import { useEffect } from 'react';

export default function SEO({ 
  title = 'Undangan Pernikahan Digital',
  description = 'Undangan pernikahan digital elegan dengan RSVP dan QR check-in',
  image = '',
  url = ''
}) {
  useEffect(() => {
    // Update title
    if (title) {
      document.title = title;
    }
    
    // Helper function to set meta tags
    const setMetaTag = (property, content) => {
      if (!content) return;
      
      let element = document.querySelector(`meta[property="${property}"]`) || 
                    document.querySelector(`meta[name="${property}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        if (property.startsWith('og:') || property.startsWith('twitter:')) {
          element.setAttribute('property', property);
        } else {
          element.setAttribute('name', property);
        }
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Set meta tags
    setMetaTag('description', description);
    setMetaTag('og:title', title);
    setMetaTag('og:description', description);
    setMetaTag('og:image', image);
    setMetaTag('og:url', url || window.location.href);
    setMetaTag('og:type', 'website');
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', title);
    setMetaTag('twitter:description', description);
    setMetaTag('twitter:image', image);

  }, [title, description, image, url]);

  return null; // This component doesn't render anything
}